import {loadCreationRules,deriveCharacter,raceSubgroups} from "./rules.mjs";

const ATTRS=["Might","Prowess","Endurance","Intellect","Presence"];
const NAME_DEFAULTS=new Set(["","New Actor","New Character","New Hero"]);

function choices(values,selected,getValue=x=>x,getLabel=x=>x){
 return values.map(x=>({value:getValue(x),label:getLabel(x),selected:getValue(x)===selected}));
}

export class MezoriaCharacterSheet extends ActorSheet {
 constructor(...args){
  super(...args);
  this.creationStep=null; // New Actors open on their sheet, not in the creator.
  this.sheetTab="attributes";
 }
 static get defaultOptions(){
  return foundry.utils.mergeObject(super.defaultOptions,{
   classes:["mezoria","sheet","actor","character"],
   width:920,height:800,resizable:true,
   template:"systems/mezoria-foundry/templates/character-sheet.hbs",
   submitOnChange:false
  });
 }
 get title(){return this.actor.name+" — Mezoria Character";}
 async getData(options={}){
  const base=await super.getData(options);
  let rules;
  try{rules=await loadCreationRules();}
  catch(error){return {...base,error:error.message};}
  const system=this.actor.system;
  const derived=deriveCharacter(system,rules);
  const race=derived.race, background=derived.background, mark=derived.mark;
  const subgroups=raceSubgroups(race);
  const creatorOpen=!!this.creationStep;
  const stepKeys=["race","background","mark","free","attributes","name"];
  const selected=new Set(derived.talents.map(t=>t.name));
  const skillRows=rules.skills.filter(skill=>selected.has(skill.name)||skill.trainedOnly===false).map(skill=>{
   const trained=selected.has(skill.name);
   const target=derived.scores.find(a=>a.name===skill.governingAttribute)?.total??0;
   return {name:skill.name,attr:skill.governingAttribute,trained,tn:target+(trained?5:0),
     bonus:trained?5:0,trainedLabel:trained?"Talent (+5)":"Untrained"};
  }).sort((a,b)=>Number(b.trained)-Number(a.trained)||a.name.localeCompare(b.name));
  const raceTraits=[...(race?.traits||[]),...(race?.abilities||[]),
   ...(derived.subgroup?.innateAbility?[derived.subgroup.innateAbility]:[])].map(x=>({name:x.name,description:x.effect||x.description||x.condition||""}));
  const subgroupType=race?.subgroupType==="tribes"?"Tribe":race?.subgroupType==="clans"?"Clan":race?.subgroupType==="aspects"?"Aspect":"";
  const errors=[...derived.errors];
  if(NAME_DEFAULTS.has(this.actor.name.trim()))errors.push("Enter a character name on the final step.");
  const human=system.race==="Human";
  return {
   ...base,system,derived,creatorOpen,creationComplete:system.creationComplete,
   headerName:this.actor.name,headerRace:system.race,headerBackground:system.background,
   headerMark:system.mark,headerSubgroup:system.subgroup,showSubgroup:!!subgroupType,subgroupType,
   sheetAttributes:this.sheetTab==="attributes",sheetSkills:this.sheetTab==="skills",
   attrTabActive:this.sheetTab==="attributes",skillsTabActive:this.sheetTab==="skills",
   attributes:derived.scores,skillRows,trainedCount:skillRows.filter(s=>s.trained).length,
   untrainedCount:skillRows.filter(s=>!s.trained).length, 
   raceTraits,
   steps:stepKeys.map((key,i)=>({key,title:(i+1)+". "+({
    race:"Race",background:"Background",mark:"Mark",free:"Free Talents",
    attributes:"Attributes",name:"Character Name"}[key]),active:key===this.creationStep})),
   stepRace:this.creationStep==="race",stepBackground:this.creationStep==="background",
   stepMark:this.creationStep==="mark",stepFree:this.creationStep==="free",
   stepAttributes:this.creationStep==="attributes",stepName:this.creationStep==="name",
   raceOptions:choices(rules.races,system.race,r=>r.name,r=>r.name),
   subgroupOptions:choices(subgroups,system.subgroup,r=>r.name,r=>r.name),
   human,humanAttributes:ATTRS.map(name=>({name,checked:(system.humanAttributes||[]).includes(name)})),
   racialOptions:choices(["",...rules.skills.map(s=>s.name)],system.racialTalent),
   backgroundOptions:choices(Object.entries(rules.backgrounds).filter(([,b])=>b.status==="approved").map(([name])=>name),system.background),
   backgroundTalent:background?.skillTalent?.name||"Pending",
   backgroundAbility:background?.nonCombatAbility||null,
   markOptions:choices(rules.marks,system.mark,m=>m.id,m=>m.id.charAt(0).toUpperCase()+m.id.slice(1)),
   markChoices:[0,1].map(index=>({index,options:choices(["",...(mark?.startingSkillOptions||[])],system.markTalents?.[index]||"")})),
   freeChoices:[0,1,2].map(index=>({index,options:choices(["",...rules.skills.map(s=>s.name)],system.freeTalents?.[index]||"")})),
   spent:derived.spent,remaining:derived.remaining,
   errors,valid:!errors.length,
   note:system.notes
  };
 }
 activateListeners(html){
  super.activateListeners(html);
  if(!this.isEditable)return;
  html.find("[data-open-creator]").on("click",event=>{event.preventDefault();this.creationStep="race";this.render(false);});
  html.find("[data-close-creator]").on("click",event=>{event.preventDefault();this.creationStep=null;this.render(false);});
  html.find("[data-step]").on("click",event=>{event.preventDefault();this.creationStep=event.currentTarget.dataset.step;this.render(false);});
  html.find("[data-tab]").on("click",event=>{event.preventDefault();this.sheetTab=event.currentTarget.dataset.tab;this.render(false);});
  html.find("[data-finish-creator]").on("click",async event=>{
   event.preventDefault();
   const result=deriveCharacter(this.actor.system,await loadCreationRules());
   const missingName=NAME_DEFAULTS.has(this.actor.name.trim());
   if(result.errors.length||missingName){
    ui.notifications.warn("Complete every creator selection and enter a character name before finishing.");
    this.creationStep="name";this.render(false);return;
   }
   await this.actor.update({"system.creationComplete":true});
   this.creationStep=null;this.sheetTab="attributes";this.render(false);
  });
  html.find("[data-field]").on("change",async event=>{
   const el=event.currentTarget,path=el.dataset.field,value=el.value;
   if(path==="name"){await this.actor.update({name:value.trim()});return;}
   if(path==="race"){
    await this.actor.update({"system.race":value,"system.subgroup":"","system.humanAttributes":[],"system.racialTalent":"","system.creationComplete":false});return;
   }
   if(path==="mark"){
    await this.actor.update({"system.mark":value,"system.markTalents":["",""],"system.creationComplete":false});return;
   }
   if(path==="background"){
    const rules=await loadCreationRules(),fixed=rules.backgrounds[value]?.skillTalent?.name;
    await this.actor.update({
     "system.background":value,
     "system.markTalents":[...this.actor.system.markTalents].map(x=>x===fixed?"":x),
     "system.freeTalents":[...this.actor.system.freeTalents].map(x=>x===fixed?"":x),
     "system.racialTalent":this.actor.system.racialTalent===fixed?"":this.actor.system.racialTalent,
     "system.creationComplete":false
    });return;
   }
   await this.actor.update({["system."+path]:value,"system.creationComplete":false});
  });
  html.find("[data-allocation]").on("change",async event=>{
   const a=event.currentTarget.dataset.allocation,value=Number(event.currentTarget.value);
   if(!ATTRS.includes(a)||!Number.isInteger(value)||value<0||value>15){
    ui.notifications.warn("Each attribute receives 0–15 whole allocation points.");this.render(false);return;
   }
   await this.actor.update({["system.allocation."+a]:value,"system.creationComplete":false});
  });
  html.find("[data-human-attribute]").on("change",async event=>{
   const a=event.currentTarget.dataset.humanAttribute;
   const set=new Set(this.actor.system.humanAttributes);
   if(event.currentTarget.checked)set.add(a);else set.delete(a);
   if(set.size>3){ui.notifications.warn("Select only three Human bonus attributes.");this.render(false);return;}
   await this.actor.update({"system.humanAttributes":[...set],"system.creationComplete":false});
  });
  html.find("[data-talent-kind]").on("change",async event=>{
   const el=event.currentTarget,path=el.dataset.talentKind==="mark"?"markTalents":"freeTalents";
   const index=Number(el.dataset.index),list=[...this.actor.system[path]];
   if(index<0||index>=list.length)return;
   list[index]=el.value;
   await this.actor.update({["system."+path]:list,"system.creationComplete":false});
  });
  html.find("[data-roll-attr], [data-roll-skill]").on("click",async event=>{
   event.preventDefault();
   const el=event.currentTarget,derived=deriveCharacter(this.actor.system,await loadCreationRules());
   let label,tn;
   if(el.dataset.rollAttr){
    const a=derived.scores.find(x=>x.name===el.dataset.rollAttr);if(!a)return;
    label=a.name+" Save";tn=a.total;
   }else{
    const name=el.dataset.rollSkill;
    const rulebook=await loadCreationRules(),skill=rulebook.skills.find(x=>x.name===name);
    if(!skill)return;
    const trained=derived.talents.some(x=>x.name===name);
    if(skill.trainedOnly&&!trained)return ui.notifications.warn(name+" requires Talent training.");
    const attr=derived.scores.find(x=>x.name===skill.governingAttribute);if(!attr)return;
    tn=attr.total+(trained?5:0);label=name+(trained?" (Talent)":" (Untrained)");
   }
   const roll=await (new Roll("1d100")).evaluate();
   const value=roll.total,crit=value>=1&&value<=5,success=value<=tn||crit;
   const successes=success?1+Math.max(0,Math.floor((tn-value)/10))+(crit?3:0):0;
   const safe=foundry.utils.escapeHTML??(x=>String(x).replace(/</g,"&lt;").replace(/>/g,"&gt;"));
   await roll.toMessage({
    speaker:ChatMessage.getSpeaker({actor:this.actor}),
    flavor:"<strong>"+safe(label)+"</strong> — TN "+tn+"% — "+(success?"Success":"Failure")+
     (crit?" (Critical)":"")+(success?" · "+successes+" success"+(successes===1?"":"es"):"")
   });
  });
 }
}
