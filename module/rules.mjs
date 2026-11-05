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
 const r=rulebook.races.find(x=>x.name===s.race),b=rulebook.backgrounds[s.background],m=rulebook.marks.find(x=>x.id===s.mark);
 const sub=raceSubgroups(r).find(x=>x.name===s.subgroup);
 const rb=attributeBonus(sub?.attributes??r?.attributes),bb=attributeBonus(b?.attributeBonus);
 if(s.race==="Human")for(const a of s.humanAttributes||[])if(a in rb)rb[a]+=2;
 const scores=names.map(name=>({name,base:25,allocated:Number(s.allocation?.[name]||0),racial:rb[name],background:bb[name],total:25+Number(s.allocation?.[name]||0)+rb[name]+bb[name]}));
 const markTalents=Array.from({length:2},(_,i)=>s.markTalents?.[i]||"");
 const freeTalents=Array.from({length:3},(_,i)=>s.freeTalents?.[i]||"");
 const racialTalent=s.race==="Human"?s.racialTalent:"";
 const selected=[b?.skillTalent?.name,...markTalents,...freeTalents,...(s.race==="Human"?[racialTalent]:[])];
 const errors=[];
 const spent=scores.reduce((sum,a)=>sum+a.allocated,0);
 if(spent!==25)errors.push("Allocate exactly 25 points (currently "+spent+").");
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
 const talents=nonEmpty.map((name,i)=>({name,attribute:skillIndex.get(name)?.governingAttribute||skillIndex.get(name)?.attr||"",bonus:5,source:i===0?"Background":i<=2?"Mark":i<=5?"Free":"Racial"}));
 return {race:r,subgroup:sub,background:b,mark:m,scores,bonuses,spent,remaining:25-spent,talents,errors,movement:sub?.movement?.ground??r?.baseMovement??null};
}
