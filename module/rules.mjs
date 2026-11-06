const names=["Might","Prowess","Endurance","Intellect","Presence"];
let cache=null;
export async function loadCreationRules(){
 if(cache)return cache;
 const paths=["core-rules","races","backgrounds","skills"];
 const source=await Promise.all(paths.map(async p=>{
  const response=await fetch("systems/mezoria-foundry/data/"+p+".json");
  if(!response.ok)throw Error("Missing "+p+": "+response.status);
  return response.json();
 }));
 cache={core:source[0],races:source[1].races,backgrounds:source[2].definitions,
  skills:Object.values(source[3].attributes).flatMap(g=>g.skills),marks:source[0].marksOfPower};
 return cache;
}
export function rulesReady(){return cache;}
function attributeBonus(obj){
 const b=Object.fromEntries(names.map(n=>[n,0]));
 if(!obj)return b;
 for(const n of names)if(Number.isFinite(obj[n]))b[n]+=obj[n];
 for(const item of obj.bonuses??[])if(item.attribute in b)b[item.attribute]+=item.percentagePoints||0;
 return b;
}
export function raceSubgroups(r){
 if(!r)return[];
 if(r.subgroupType==="tribes")return (r.tribeFamilies||[]).flatMap(f=>f.tribes||[]);
 if(r.subgroupType==="clans")return r.clans||[];
 if(r.subgroupType==="aspects")return r.aspects||[];
 return [];
}
export function deriveCharacter(s,rulebook=cache){
 if(!rulebook)return null;
 const r=rulebook.races.find(x=>x.name===s.race),b=rulebook.backgrounds[s.background],m=rulebook.marks.find(x=>x.id===String(s.mark??"").toLowerCase());
 const sub=raceSubgroups(r).find(x=>x.name===s.subgroup);
 const rb=attributeBonus(sub?.attributes??r?.attributes),bb=attributeBonus(b?.attributeBonus);
 if(s.race==="Human")for(const a of s.humanAttributes||[])if(a in rb)rb[a]+=2;
 const scores=names.map(name=>({name,base:35,allocated:Number(s.allocation?.[name]||0),racial:rb[name],background:bb[name],total:35+Number(s.allocation?.[name]||0)+rb[name]+bb[name]}));
 const markTalents=Array.from({length:2},(_,i)=>s.markTalents?.[i]||"");
 const freeTalents=Array.from({length:3},(_,i)=>s.freeTalents?.[i]||"");
 const racialTalent=s.race==="Human"?s.racialTalent:"";
 const selected=[b?.skillTalent?.name,...markTalents,...freeTalents,...(s.race==="Human"?[racialTalent]:[])];
 const errors=[];
 const spent=scores.reduce((sum,a)=>sum+a.allocated,0);
 if(spent!==35)errors.push("Allocate exactly 35 points (currently "+spent+").");
 if(scores.some(a=>!Number.isInteger(a.allocated)||a.allocated<0||a.allocated>15))errors.push("Each attribute allocation must be 0–15 whole points.");
 if(!r)errors.push("Choose a valid race.");
 if(!b)errors.push("Choose a valid background.");
 if(!m)errors.push("Choose a valid Mark.");
 if(raceSubgroups(r).length&&!sub)errors.push("Choose a valid tribe, clan, or aspect.");
 if(s.race==="Human"&&(new Set(s.humanAttributes||[]).size!==3||!(s.humanAttributes||[]).every(a=>names.includes(a))))errors.push("Humans choose three distinct attributes.");
 if(markTalents.some(x=>!x||!m?.startingSkillOptions.includes(x)))errors.push("Choose two eligible Mark Skill Talents.");
 if(freeTalents.some(x=>!x||!rulebook.skills.some(y=>y.name===x)))errors.push("Choose three approved free Skill Talents.");
 if(s.race==="Human"&&!rulebook.skills.some(x=>x.name===racialTalent))errors.push("Choose a Human Versatility Skill Talent.");
 const nonEmpty=selected.filter(Boolean);
 if(new Set(nonEmpty).size!==nonEmpty.length)errors.push("Starting Skill Talents cannot be duplicated; background awards take priority.");
 const bonuses={race:rb,background:bb};
 const skillIndex=new Map(rulebook.skills.map(x=>[x.name,x]));
 const talents=[{name:b?.skillTalent?.name,source:"Background"},...markTalents.map(name=>({name,source:"Mark"})),...freeTalents.map(name=>({name,source:"Free"})),...(s.race==="Human"?[{name:racialTalent,source:"Racial"}]:[])].filter(x=>x.name).map(x=>({...x,attribute:skillIndex.get(x.name)?.governingAttribute||"",bonus:5}));
 const score=name=>scores.find(item=>item.name===name)?.total??35;
 const prowessTens=Math.floor(score("Prowess")/10);
 const enduranceTens=Math.floor(score("Endurance")/10);
 const rank=s.rank||1;
 const woundThreshold=rank+Math.floor(enduranceTens/2);
 const woundCapacity=rank===1?3:null; // Quartz capacity approved; no other Rank capacities defined.
 const woundsTaken=Math.max(0,Number(s.woundsTaken)||0);
 const failures=Math.max(0,Math.min(3,Number(s.deathSaveFailures)||0));
 const deathState=s.deathState==="dead"?"dead":s.deathState==="stabilized"?"stabilized":"none";
 const currentLifeForce=rank===1?Math.min(3*(Math.floor(score("Might")/10)+enduranceTens),s.currentLifeForce??3*(Math.floor(score("Might")/10)+enduranceTens)):null;
 const unconscious=(deathState==="stabilized"&&currentLifeForce===0)||(woundCapacity!==null&&woundsTaken>=woundCapacity&&deathState==="none");
 const unableToEvade=Boolean(s.unableToEvade);
 const dodgeSuppressed=deathState==="dead"||unconscious||unableToEvade;
 const armorCategory=["Light","Medium","Heavy"].includes(s.armorCategory)?s.armorCategory:"none";
 const armorCaps={Light:5,Medium:10,Heavy:15};
 const armorMultipliers=[1,1.5,2,3];
 const armorRank=Math.max(0,Math.min(10,Number(s.armorRank)||0));
 const armorRankPermitted=armorRank<=rank;
 const armorScalingKnown=armorRank<armorMultipliers.length;
 const armorBaseMitigation=Math.max(0,Number(s.armorBaseMitigation)||0);
 const armorCategoryBaseCap=armorCaps[armorCategory]??0;
 const armorBaseValid=armorBaseMitigation<=armorCategoryBaseCap;
 const armorMaximumMitigation=armorCategory!=="none"&&armorScalingKnown&&armorRankPermitted&&armorBaseValid
  ?Math.ceil(armorBaseMitigation*armorMultipliers[armorRank]):null;
 const armorCategoryMaximum=armorCategory!=="none"&&armorScalingKnown
  ?Math.ceil(armorCategoryBaseCap*armorMultipliers[armorRank]):null;
 const armorMaximumDurability=Math.max(0,Number(s.armorMaximumDurability)||0);
 const status={
  baseDodge:prowessTens,dodge:dodgeSuppressed?0:prowessTens,dodgeSuppressed,unableToEvade,initiativeBonus:prowessTens,
  baseParry:Math.floor(score("Might")/10),weaponParryRating:Math.max(0,Number(s.equippedMeleeParryRating)||0),
  parry:dodgeSuppressed?0:Math.floor(score("Might")/10)+Math.max(0,Number(s.equippedMeleeParryRating)||0),
  parrySuppressed:dodgeSuppressed,
  shieldEquipped:Boolean(s.shieldEquipped),
  shieldBlockRating:Math.max(0,Number(s.equippedShieldBlockRating)||0),
  baseBlock:Boolean(s.shieldEquipped)?Math.floor(enduranceTens/2):0,
  block:Boolean(s.shieldEquipped)&&!dodgeSuppressed?Math.max(0,Number(s.equippedShieldBlockRating)||0)+Math.floor(enduranceTens/2):0,
  blockSuppressed:dodgeSuppressed,
  currentMagicalShieldMitigation:Math.max(0,Number(s.currentMagicalShieldMitigation)||0),
  magicalShieldDuration:(Number(s.currentMagicalShieldMitigation)||0)>0?(s.magicalShieldDuration||""):"",
  magicalShieldActive:(Number(s.currentMagicalShieldMitigation)||0)>0,
  spellResistance:Math.floor(score("Intellect")/10),
  armorName:s.armorName||"",armorCategory,armorRank,armorRankPermitted,armorScalingKnown,
  armorBaseMitigation,armorBaseValid,armorCategoryBaseCap,armorCategoryMaximum,
  armorMaximumMitigation,
  armorCurrentMitigation:armorMaximumMitigation===null?null:Math.min(armorMaximumMitigation,s.armorCurrentMitigation??armorMaximumMitigation),
  armorMaximumDurability,
  armorCurrentDurability:Math.min(armorMaximumDurability,s.armorCurrentDurability??armorMaximumDurability),
  woundThreshold,woundCapacity,woundsTaken,
  bleedingToDeath:woundCapacity!==null&&woundsTaken>=woundCapacity&&deathState==="none",
  deathSaveFailures:failures,deathState,
  deathSaveTN:Math.max(0,score("Endurance")-5*failures),
  isDead:deathState==="dead",
  isStabilized:deathState==="stabilized",
  isUnconscious:deathState==="stabilized"&&((s.currentLifeForce??(rank===1?3*(Math.floor(score("Might")/10)+enduranceTens):0))===0),
  isConscious:deathState==="stabilized"&&((s.currentLifeForce??(rank===1?3*(Math.floor(score("Might")/10)+enduranceTens):0))>0),
  lifeForce:rank===1?3*(Math.floor(score("Might")/10)+enduranceTens):null,
  mana:rank===1?3*(Math.floor(score("Intellect")/10)+Math.floor(score("Presence")/10)):null,
  currentLifeForce,
  currentMana:rank===1?Math.min(3*(Math.floor(score("Intellect")/10)+Math.floor(score("Presence")/10)),s.currentMana??3*(Math.floor(score("Intellect")/10)+Math.floor(score("Presence")/10))):null,
  lifeForceRegen:rank===1?1:null,
  manaRegen:rank===1?1:null,
  actionScore:Number(s.actionScore)||0,
  movement:sub?.movement?.ground??r?.baseMovement??null
 };
 return {race:r,subgroup:sub,background:b,mark:m,scores,bonuses,spent,remaining:35-spent,talents,errors,movement:status.movement,status};
}
