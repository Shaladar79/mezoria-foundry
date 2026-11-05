import {loadCreationRules,deriveCharacter,raceSubgroups} from "./rules.mjs";

const ATTRS=["Might","Prowess","Endurance","Intellect","Presence"];
const ATTR_ABBR={Might:"MGT",Prowess:"PRW",Endurance:"END",Intellect:"INT",Presence:"PRE"};
const NAME_DEFAULTS=new Set(["","New Actor","New Character","New Hero"]);
const NONE_OPTION={value:"",label:"— None Selected —",selected:true};
function withNone(options,selected){
 return [{...NONE_OPTION,selected:!selected},...options];
}
function bonusLabels(bonuses){
 return ATTRS.filter(name=>Number(bonuses?.[name])>0).map(name=>({name,points:bonuses[name]}));
}
function formatBonuses(bonuses){
 const values=bonusLabels(bonuses).map(({name,points})=>name+" +"+points+"%");
 return values.length?values.join(", "):"";
}
function raceChoiceBonus(r){
 if(r.name==="Human")return "choose three attributes (+2% each)";
 const raw=r.attributes?.bonuses;
 if(Array.isArray(raw))return raw.map(x=>x.attribute+" +"+x.percentagePoints+"%").join(", ");
 if(r.subgroupType)return "bonuses vary by "+({tribes:"tribe",clans:"clan",aspects:"aspect"}[r.subgroupType]);
 return "";
}

function choices(values,selected,getValue=x=>x,getLabel=x=>x){
 return values.map(x=>({value:getValue(x),label:getLabel(x),selected:getValue(x)===selected}));
}

export class MezoriaCharacterSheet extends ActorSheet {
 constructor(...args){
  super(...args);
  this.creationStep=null; // New Actors open on their sheet, not in the creator.
  this.sheetTab="attributes";
  this.skillAttributeTab="Might";
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
   return {name:skill.name,attr:skill.governingAttribute,attrAbbr:ATTR_ABBR[skill.governingAttribute]||skill.governingAttribute,
     trained,tn:target+(trained?5:0),bonus:trained?5:0,bonusLabel:trained?"Talent +5":"—",
     trainedLabel:trained?"Talent (+5)":"Untrained"};
  }).sort((a,b)=>Number(b.trained)-Number(a.trained)||a.name.localeCompare(b.name));
  // Trained skills remain in one permanent section; only untrained-usable skills
  // are filtered by the currently selected governing attribute sub-tab.
  const trainedSkills=skillRows.filter(row=>row.trained);
  const untrainedSkillRows=skillRows.filter(row=>!row.trained);
  const skillAttributeTabs=ATTRS.map(name=>({
   name,abbreviation:ATTR_ABBR[name],active:this.skillAttributeTab===name,
   count:untrainedSkillRows.filter(row=>row.attr===name).length
  }));
  const attributeSkills=untrainedSkillRows.filter(row=>row.attr===this.skillAttributeTab);
  const raceTraits=[...(race?.traits||[]),...(race?.abilities||[]),
   ...(derived.subgroup?.innateAbility?[derived.subgroup.innateAbility]:[])].map(x=>({name:x.name,description:x.effect||x.description||x.condition||""}));
  const subgroupType=race?.subgroupType==="tribes"?"Tribe":race?.subgroupType==="clans"?"Clan":race?.subgroupType==="aspects"?"Aspect":"";
  const errors=[...derived.errors];
  if(NAME_DEFAULTS.has(this.actor.name.trim()))errors.push("Enter a character name on the final step.");
  const human=system.race==="Human";
  return {
   ...base,system,derived,creatorOpen,creationComplete:system.creationComplete,
   currentEssence:system.currentEssence??0,spentEssence:system.spentEssence??0,
   headerName:this.actor.name,headerRace:system.race||"None Selected",headerBackground:system.background||"None Selected",
   headerMark:system.mark?(mark?.id?.charAt(0).toUpperCase()+mark?.id?.slice(1)||system.mark):"None Selected",headerSubgroup:system.subgroup,showSubgroup:!!subgroupType,subgroupType,
   sheetAttributes:this.sheetTab==="attributes",sheetSkills:this.sheetTab==="skills",
   attrTabActive:this.sheetTab==="attributes",skillsTabActive:this.sheetTab==="skills",
   attributes:derived.scores,status:derived.status,trainedSkills,skillAttributeTabs,attributeSkills,
   selectedSkillAttribute:this.skillAttributeTab,
   trainedCount:trainedSkills.length,untrainedCount:untrainedSkillRows.length, 
   raceTraits,
   steps:stepKeys.map((key,i)=>({key,title:(i+1)+". "+({
    race:"Race",background:"Background",mark:"Mark",free:"Free Talents",
    attributes:"Attributes",name:"Character Name"}[key]),active:key===this.creationStep})),
   stepRace:this.creationStep==="race",stepBackground:this.creationStep==="background",
   stepMark:this.creationStep==="mark",stepFree:this.creationStep==="free",
   stepAttributes:this.creationStep==="attributes",stepName:this.creationStep==="name",
   raceOptions:withNone(choices(rules.races,system.race,r=>r.name,r=>r.name+" — "+raceChoiceBonus(r)),system.race),
   raceBonusRows:bonusLabels(derived.bonuses.race),raceBonusPending:!race,
   subgroupOptions:choices(subgroups,system.subgroup,r=>r.name,r=>r.name),
   human,humanAttributes:ATTRS.map(name=>({name,checked:(system.humanAttributes||[]).includes(name)})),
   racialOptions:[{value:"",label:"— Choose a racial Skill Talent —",selected:!system.racialTalent},...choices(rules.skills.map(s=>s.name),system.racialTalent)],
   backgroundOptions:withNone(choices(Object.entries(rules.backgrounds).filter(([,b])=>b.status==="approved").map(([name])=>name),system.background,name=>name,name=>name+" — "+formatBonuses(rules.backgrounds[name]?.attributeBonus)),system.background),
   backgroundBonusRows:bonusLabels(derived.bonuses.background),backgroundBonusPending:!background,
   backgroundTalent:background?.skillTalent?.name||"Pending",
   backgroundAbility:background?.nonCombatAbility||null,
   markOptions:withNone(choices(rules.marks,system.mark,m=>m.id,m=>m.id.charAt(0).toUpperCase()+m.id.slice(1)),system.mark),
   markChosen:!!mark,
   markChoices:[0,1].map(index=>({index,number:index+1,options:[{value:"",label:mark?"— Choose a Mark Talent —":"— Select a Mark first —",selected:!(system.markTalents?.[index])},...choices(mark?.startingSkillOptions||[],system.markTalents?.[index]||"")]})),
   freeChoices:[0,1,2].map(index=>({index,number:index+1,options:[{value:"",label:"— Choose a free Skill Talent —",selected:!(system.freeTalents?.[index])},...choices(rules.skills.map(s=>s.name),system.freeTalents?.[index]||"")]})),
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
  html.find("[data-skill-attribute]").on("click",event=>{event.preventDefault();const attribute=event.currentTarget.dataset.skillAttribute;if(!ATTRS.includes(attribute))return;this.skillAttributeTab=attribute;this.render(false);});
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

  html.find("[data-essence-field]").on("change",async event=>{
   const field=event.currentTarget.dataset.essenceField;
   if(!["currentEssence","spentEssence"].includes(field))return;
   const raw=event.currentTarget.value.trim(),value=Number(raw);
   if(raw===""||!Number.isSafeInteger(value)||value<0){
    ui.notifications.warn("Essence must be a non-negative whole number.");this.render(false);return;
   }
   await this.actor.update({["system."+field]:value});
  });
  html.find("[data-status-field]").on("change",async event=>{
   const key=event.currentTarget.dataset.statusField;
   if(!["woundsTaken","actionScore"].includes(key))return;
   const num=Number(event.currentTarget.value);
   if(!Number.isInteger(num)||!Number.isFinite(num)||(key==="woundsTaken"&&num<0)){
    ui.notifications.warn("Enter a valid whole-number status value.");this.render(false);return;
   }
   if(key==="woundsTaken"&&this.actor.system.deathState!=="dead"){
    const cap=deriveCharacter(this.actor.system,await loadCreationRules()).status.woundCapacity;
    if(cap!==null&&num<cap){
     await this.actor.update({"system.woundsTaken":num,"system.deathSaveFailures":0,"system.deathState":"none"});
     return;
    }
   }
   await this.actor.update({["system."+key]:num});
  });
  html.find("[data-death-save]").on("click",async event=>{
   event.preventDefault();
   const data=deriveCharacter(this.actor.system,await loadCreationRules());
   if(!data.status.bleedingToDeath){ui.notifications.warn("Death saves are available only while Bleeding to Death.");return;}
   const target=data.status.deathSaveTN;
   const roll=await(new Roll("1d100")).evaluate();
   const success=roll.total<=target||roll.total<=5;
   const failures=success?data.status.deathSaveFailures:Math.min(3,data.status.deathSaveFailures+1);
   const nextState=success?"stabilized":failures>=3?"dead":"none";
   await this.actor.update({"system.deathSaveFailures":failures,"system.deathState":nextState});
   const label=success?"Stabilized":nextState==="dead"?"Death — third failed save":"Failed death save ("+failures+"/3)";
   await roll.toMessage({speaker:ChatMessage.getSpeaker({actor:this.actor}),
    flavor:"Endurance Death Save — TN "+target+"% — <strong>"+label+"</strong>"+
    (success?(data.status.currentLifeForce>0?" · Conscious":" · Unconscious at 0 LifeForce"):" · Next TN penalty: -"+(failures*5)+"%")});
  });
  html.find("[data-resource-recovery]").on("click",async event=>{
   event.preventDefault();
   const kind=event.currentTarget.dataset.resourceRecovery;
   if(!["turn","light","full"].includes(kind))return;
   const data=deriveCharacter(this.actor.system,await loadCreationRules());
   const lifeMax=data.status.lifeForce, manaMax=data.status.mana;
   if(lifeMax===null||manaMax===null){ui.notifications.warn("Resource recovery at this Rank is pending.");return;}
   const gain=max=>kind==="turn"?1:kind==="light"?Math.ceil(max/2):max;
   const lifeNext=Math.min(lifeMax,data.status.currentLifeForce+gain(lifeMax));
   const manaNext=Math.min(manaMax,data.status.currentMana+gain(manaMax));
   const updates={"system.currentLifeForce":lifeNext,"system.currentMana":manaNext};
   if(kind==="full"){
    const afterWounds=Math.max(0,data.status.woundsTaken-1);
    updates["system.woundsTaken"]=afterWounds;
    if(this.actor.system.deathState!=="dead"&&data.status.woundCapacity!==null&&afterWounds<data.status.woundCapacity){
     updates["system.deathSaveFailures"]=0;updates["system.deathState"]="none";
    }
   }
   await this.actor.update(updates);
  });
  html.find("[data-current-resource]").on("change",async event=>{
   const resource=event.currentTarget.dataset.currentResource;
   if(!["LifeForce","Mana"].includes(resource))return;
   const data=deriveCharacter(this.actor.system,await loadCreationRules());
   const max=resource==="LifeForce"?data.status.lifeForce:data.status.mana;
   const value=Number(event.currentTarget.value);
   if(max===null||event.currentTarget.value.trim()===""||!Number.isInteger(value)||value<0||value>max){
    ui.notifications.warn(resource+" must be a whole number from 0 to its maximum.");
    this.render(false);return;
   }
   await this.actor.update({["system.current"+resource]:value});
  });
  html.find("[data-roll-action-score]").on("click",async event=>{
   event.preventDefault();
   const data=deriveCharacter(this.actor.system,await loadCreationRules());
   const before=Number(this.actor.system.actionScore)||0;
   const modifier=data.status.initiativeBonus;
   const roll=await(new Roll("1d20")).evaluate();
   const newScore=before+roll.total+modifier;
   await this.actor.update({"system.actionScore":newScore});
   await roll.toMessage({
    speaker:ChatMessage.getSpeaker({actor:this.actor}),
    flavor:"New round Action Score: "+before+" carryover + "+roll.total+
     " (d20) + "+modifier+" (Prowess tens) = <strong>"+newScore+"</strong>"
   });
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
