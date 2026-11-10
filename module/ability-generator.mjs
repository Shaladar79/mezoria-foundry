// Mezoria Foundry v2 — initial Mark ability generator / EP framework.
// Q115–Q155 are design-only unless explicitly implemented below.
// This module supports granted Mark of Purpose abilities and test EP purchases.
// Ability Rank defaults to the character's current Rank (limited to 1–3 in this prototype).
export const MARK_SECTIONS=[
 {id:"purpose",name:"Mark of Purpose"},
 {id:"specialty",name:"Mark of Specialty"},
 {id:"elements",name:"Mark of Elements"},
 {id:"beast",name:"Mark of the Beast"},
 {id:"eldritch",name:"Eldritch Mark"}
];
export const GRANTED_MARK_ABILITIES={
 defender:[
  {id:"guardians-stand",name:"Guardian's Stand",kind:"active",description:"Self-only; +5 percentage points to Parry.",tags:["potency","duration"]},
  {id:"unyielding-resolve",name:"Unyielding Resolve",kind:"aura",description:"Allies and caster within 2 spaces gain +2 percentage points to applicable Dodge, Parry, Block, and Spell Resistance.",tags:["range","potency"]}
 ],
 striker:[
  {id:"battle-fury",name:"Battle Fury",kind:"active",description:"+3 Physical damage per attack success.",tags:["damage","duration"]},
  {id:"aura-of-ferocity",name:"Aura of Ferocity",kind:"aura",description:"Allies and caster within 2 spaces gain +1 Physical damage per attack success.",tags:["range"]}
 ],
 skirmisher:[
  {id:"evasive-footwork",name:"Evasive Footwork",kind:"active",description:"Self-only; +5 percentage points to Dodge.",tags:["potency","duration"]},
  {id:"aura-of-swiftness",name:"Aura of Swiftness",kind:"aura",description:"Allies and caster within 2 spaces gain +1 to Action Score rolls, once per ally per round.",tags:["range"]}
 ],
 warden:[
  {id:"restorative-touch",name:"Restorative Touch",kind:"active",description:"Restores LifeForce; base restoration per success remains to be finalized.",tags:["healing","range"]},
  {id:"aura-of-renewal",name:"Aura of Renewal",kind:"aura",description:"Allies and caster within 2 spaces gain +1 LifeForce regeneration per turn.",tags:["range","life-regen"]}
 ],
 arcanist:[
  {id:"arcane-surge",name:"Arcane Surge",kind:"active",description:"Astral Magical attack; one target within 6 spaces; 3 damage per success.",tags:["damage","range","accuracy","additional-target"]},
  {id:"aura-of-attunement",name:"Aura of Attunement",kind:"aura",description:"Allies and caster within 2 spaces gain +1 Mana regeneration per turn.",tags:["range","mana-regen"]}
 ],
 adept:[
  {id:"adaptive-insight",name:"Adaptive Insight",kind:"active",description:"Temporarily improves a chosen skill; exact bonus is pending.",tags:["potency","duration"]},
  {id:"aura-of-clarity",name:"Aura of Clarity",kind:"aura",description:"Allies and caster within 2 spaces gain a noncombat skill-check bonus; exact value is pending.",tags:["range","potency"]}
 ]
};
// Only enhancements supported by an ability's existing effect are presented.
// Category limits are conservative for the initial test; the eventual generator
// will use full ability definitions to determine eligibility.
export const EP_OPTIONS=[
 {id:"damage",name:"Primary Damage",tags:["damage"],tiers:[[1,1,1,"+1 damage/success",1],[2,3,2,"+2 damage/success",2],[3,5,3,"+3 damage/success",3]]},
 {id:"healing",name:"Primary Healing",tags:["healing"],tiers:[[1,1,1,"+1 LifeForce/success",1],[2,3,2,"+2 LifeForce/success",2],[3,5,3,"+3 LifeForce/success",3]]},
 {id:"range",name:"Range / Aura Radius",tags:["range"],tiers:[[1,1,1,"+1 space",1],[2,3,2,"+2 spaces",2],[3,5,3,"+4 spaces",3]]},
 {id:"duration",name:"General Duration",tags:["duration"],tiers:[[1,1,1,"×1.5 duration",1],[2,3,2,"×2 duration",2],[3,5,3,"×3 duration",3]]},
 {id:"accuracy",name:"Accuracy",tags:["accuracy"],tiers:[[2,2,1,"+3 percentage points",1]]},
 {id:"potency",name:"Non-Damaging Potency",tags:["potency"],tiers:[[2,2,2,"+3 percentage points",1]]},
 {id:"life-regen",name:"LifeForce Regeneration",tags:["life-regen"],tiers:[[1,1,1,"+1 LifeForce/turn",1],[3,4,2,"+2 LifeForce/turn",2]]},
 {id:"mana-regen",name:"Mana Regeneration",tags:["mana-regen"],tiers:[[2,2,2,"+1 Mana/turn",1]]},
 {id:"additional-target",name:"Additional Target",tags:["additional-target"],tiers:[[3,3,2,"+1 target",1]]}
];
export function generatedMarkAbilities(mark){
 return (GRANTED_MARK_ABILITIES[String(mark||"").toLowerCase()]||[]).map(a=>({...a,section:"purpose",granted:true,abilityRank:1}));
}
export function epBudget(rank){const n=Math.max(1,Math.min(3,Number(rank)||1));return n*(n+1)/2;}
export function eligibleOptions(ability,rank,spent={}){
 const budget=epBudget(rank),aura=ability.kind==="aura",used=Object.entries(spent).reduce((n,[id,tier])=>{
  const opt=EP_OPTIONS.find(o=>o.id===id);const def=opt?.tiers.find(t=>t[4]===tier);
  return n+(def?def[1]*(aura?2:1):0);
 },0);
 return {budget,used,remaining:Math.max(0,budget-used),options:EP_OPTIONS
  .filter(o=>ability.tags.includes(o.id)&&(!aura||["range","potency","life-regen","mana-regen","resistance"].includes(o.id)))
  .map(o=>({id:o.id,name:o.name,current:Number(spent[o.id])||0,tiers:o.tiers.map(t=>({
   rank:t[0],cost:t[1]*(aura?2:1),mana:aura?0:t[2],description:t[3],tier:t[4],
   additionalCost:t[1]*(aura?2:1)-(o.tiers.find(v=>v[4]===(Number(spent[o.id])||0))?.[1]||0)*(aura?2:1),
   unlocked:t[0]<=rank
  }))}))};
}
