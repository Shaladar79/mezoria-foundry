import {loadCreationRules,deriveCharacter,raceSubgroups} from "./rules.mjs";
const attributes=["Might","Prowess","Endurance","Intellect","Presence"];
function optionList(values,selected,getValue=x=>x,getLabel=x=>x){
 return values.map(x=>({value:getValue(x),label:getLabel(x),selected:getValue(x)===selected}));
}
export class MezoriaCharacterSheet extends ActorSheet {
 constructor(...args){super(...args);this.creationStep="race";}
 static get defaultOptions(){return foundry.utils.mergeObject(super.defaultOptions,{
  classes:["mezoria","sheet","actor","character"],width:850,height:750,resizable:true,
  template:"systems/mezoria-foundry/templates/character-sheet.hbs",submitOnChange:false
 });}
 get title(){return this.actor.name+" — Mezoria Character";}
 async getData(options={}){
  const base=await super.getData(options);
  let data;try{data=await loadCreationRules();}catch(e){return {...base,error:e.message,step:this.creationStep};}
  const s=this.actor.system, d=deriveCharacter(s,data);
  const race=d.race, bg=d.background,subgroups=raceSubgroups(race), mark=d.mark;
  const steps=["race","background","mark","free","review"];
  return {...base,system:s,step:this.creationStep,
   steps:steps.map((key,i)=>({key,title:(i+1)+". "+({race:"Race",background:"Background",mark:"Mark",free:"Free Talents",review:"Sheet"}[key]),active:key===this.creationStep})),
   stepRace:this.creationStep==="race",stepBackground:this.creationStep==="background",stepMark:this.creationStep==="mark",
   stepFree:this.creationStep==="free",stepReview:this.creationStep==="review",
   raceOptions:optionList(data.races,s.race,x=>x.name,x=>x.name),
   raceName:s.race,raceTraits:[...(race?.traits||[]),...(race?.abilities||[]),...(d.subgroup?.innateAbility?[d.subgroup.innateAbility]:[])].map(x=>({name:x.name,description:x.effect||x.description||x.condition||""})),
   subgroupLabel:race?.subgroupType||"Subgroup",hasSubgroups:subgroups.length>0,
   subgroupOptions:optionList(subgroups,s.subgroup,x=>x.name,x=>x.name),
   human:s.race==="Human",humanAttributes:attributes.map(name=>({name,checked:(s.humanAttributes||[]).includes(name)})),
   backgroundOptions:optionList(Object.entries(data.backgrounds).filter(([,b])=>b.status==="approved").map(([name])=>name),s.background),
   backgroundTalent:bg?.skillTalent?.name||"Pending",backgroundAbility:bg?.nonCombatAbility||null,
   markOptions:optionList(data.marks,s.mark,x=>x.id,x=>x.id.charAt(0).toUpperCase()+x.id.slice(1)),
   markChoices:[0,1].map(i=>({index:i,options:optionList(["",...(mark?.startingSkillOptions||[])],s.markTalents?.[i]||"")})),
   freeChoices:[0,1,2].map(i=>({index:i,options:optionList(["",...data.skills.map(x=>x.name)],s.freeTalents?.[i]||"")})),
   racialOptions:optionList(["",...data.skills.map(x=>x.name)],s.racialTalent),
   allocation:d.scores,remaining:d.remaining,valid:d.errors.length===0,errors:d.errors,
   talents:d.talents,derived:d,notes:s.notes};
 }
 activateListeners(html){
  super.activateListeners(html);if(!this.isEditable)return;
  html.find("[data-step]").on("click",event=>{event.preventDefault();this.creationStep=event.currentTarget.dataset.step;this.render(false);});
  html.find("[data-field]").on("change",async event=>{
   const el=event.currentTarget,path=el.dataset.field;let value=el.value;
   if(el.type==="number")value=Number(value);
   if(path==="race"){const raceName=value;await this.actor.update({"system.race":raceName,"system.subgroup":"","system.humanAttributes":[],"system.racialTalent":""});return;}
   if(path==="mark"){await this.actor.update({"system.mark":value,"system.markTalents":["",""]});return;}
   if(path==="background"){
    // Background Talent is fixed; any overlapping Mark and free selections are cleared.
    const book=await loadCreationRules(),skill=book.backgrounds[value]?.skillTalent?.name;
    const markTalents=[...this.actor.system.markTalents].map(x=>x===skill?"":x);
    const freeTalents=[...this.actor.system.freeTalents].map(x=>x===skill?"":x);
    await this.actor.update({"system.background":value,"system.markTalents":markTalents,"system.freeTalents":freeTalents,"system.racialTalent":this.actor.system.racialTalent===skill?"":this.actor.system.racialTalent});return;
   }
   if(path==="subgroup")path==="subgroup"&&(value=String(value));
   if(path==="allocation")return;
   if(path==="name"){await this.actor.update({name:value});return;}
   await this.actor.update({["system."+path]:value});
  });
  html.find("[data-allocation]").on("change",async event=>{
   const a=event.currentTarget.dataset.allocation;
   const value=Number(event.currentTarget.value);
   if(!Number.isInteger(value)||value<0||value>15){ui.notifications.warn("Allocate 0–15 whole points per attribute.");this.render(false);return;}
   await this.actor.update({["system.allocation."+a]:value});
  });
  html.find("[data-human-attribute]").on("change",async event=>{
   const a=event.currentTarget.dataset.humanAttribute;
   let chosen=[...this.actor.system.humanAttributes];
   if(event.currentTarget.checked){if(!chosen.includes(a)&&chosen.length<3)chosen.push(a);}
   else chosen=chosen.filter(x=>x!==a);
   await this.actor.update({"system.humanAttributes":chosen});
  });
  html.find("[data-talent-kind]").on("change",async event=>{
   const el=event.currentTarget,kind=el.dataset.talentKind,index=Number(el.dataset.index);
   const path=kind==="mark"?"markTalents":"freeTalents";
   const next=Array.from(this.actor.system[path]);next[index]=el.value;
   await this.actor.update({["system."+path]:next});
  });
 }
}
