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

/**
 * Compose a player's current tooltip from the approved base ability and its
 * purchased EP tiers. Unknown base values are intentionally NOT guessed.
 * Computed totals are displayed only where the base value is established.
 */
export function evolvedAbilityDescription(ability, purchases={}){
 const get=(key)=>{const opt=EP_OPTIONS.find(x=>x.id===key);return opt?.tiers.find(t=>t[4]===Number(purchases[key]))||null;};
 const damage=get("damage"),healing=get("healing"),range=get("range"),duration=get("duration");
 const accuracy=get("accuracy"),potency=get("potency"),life=get("life-regen"),mana=get("mana-regen"),targets=get("additional-target");
 const lines=[];
 const plus=(tier)=>tier?Number(tier[3].match(/\d+/)?.[0]||0):0;
 switch(ability.id){
  case "guardians-stand":
   lines.push("Self-only; Parry bonus: +"+(5+plus(potency))+" percentage points"+(potency?" (base +5, EP +3)":"")+".");
   break;
  case "unyielding-resolve":
   lines.push("Caster and allies in aura: +"+(2+plus(potency))+" percentage points to applicable Dodge, Parry, Block, and Spell Resistance.");
   break;
  case "battle-fury":
   lines.push("Physical damage bonus: +"+(3+plus(damage))+" per attack success.");
   break;
  case "aura-of-ferocity":
   lines.push("Caster and allies: +1 Physical damage per attack success.");
   break;
  case "evasive-footwork":
   lines.push("Self-only; Dodge bonus: +"+(5+plus(potency))+" percentage points.");
   break;
  case "aura-of-swiftness":
   lines.push("Caster and allies: +1 Action Score when rolling Action Score, once per ally per round (does not grant extra actions).");
   break;
  case "restorative-touch":
   lines.push("Restores LifeForce; base healing per success is pending."+(healing?" EP adds +"+plus(healing)+" LifeForce per success.":""));
   break;
  case "aura-of-renewal":
   lines.push("Caster and allies: +"+(1+plus(life))+" LifeForce regeneration per turn.");
   break;
  case "arcane-surge":
   lines.push("Astral Magical attack: "+(3+plus(damage))+" damage per success.");
   break;
  case "aura-of-attunement":
   lines.push("Caster and allies: +"+(1+plus(mana))+" Mana regeneration per turn.");
   break;
  case "adaptive-insight":
   lines.push("Temporarily improves a chosen skill; base amount remains pending."+(potency?" EP adds +"+plus(potency)+" percentage points.":""));
   break;
  case "aura-of-clarity":
   lines.push("Caster and allies gain a noncombat skill-check bonus; base value is pending."+(potency?" EP adds +"+plus(potency)+" percentage points.":""));
   break;
  default:lines.push(ability.description);
 }
 if(ability.kind==="aura"){
  lines.push("Aura radius: "+(2+plus(range))+" spaces"+(range?" (2 base + "+plus(range)+" EP)":"")+".");
  lines.push("No Mana cost or upkeep, including EP enhancements.");
 }else{
  if(ability.id==="arcane-surge")lines.push("Range: "+(6+plus(range))+" spaces.");
  else if(range)lines.push("Ability range: base range +"+plus(range)+" spaces (base range not yet specified).");
  if(duration)lines.push("Eligible non-condition duration: "+({1:"×1.5",2:"×2",3:"×3"}[Number(purchases.duration)]||"enhanced")+" base duration"+(ability.id==="adaptive-insight"||ability.id==="battle-fury"||ability.id==="evasive-footwork"||ability.id==="guardians-stand"?" (base duration pending)":"")+".");
  if(accuracy)lines.push("Attack accuracy: +3 percentage points (ability only).");
  if(targets)lines.push("Targets: +1 eligible additional target; one shared roll, with independent target resolution.");
  const manaModifiers=[damage,healing,range,duration,accuracy,potency,life,mana,targets].filter(Boolean).reduce((total,t)=>total+t[2],0);
  if(manaModifiers)lines.push("Activation Mana: base cost +"+manaModifiers+" from purchased EP enhancements (base cost pending).");
 }
 return lines.join(" ");
}
