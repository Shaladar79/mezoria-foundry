const F=foundry.data.fields;
const attrs=["Might","Prowess","Endurance","Intellect","Presence"];
export class MezoriaCharacterData extends foundry.abstract.TypeDataModel {
 static defineSchema(){
  const allocated=Object.fromEntries(attrs.map(a=>[a,new F.NumberField({required:true,nullable:false,integer:true,initial:0,min:0,max:15})]));
  return {
   rank:new F.NumberField({required:true,integer:true,initial:1,min:1}),
   creationComplete:new F.BooleanField({required:true,initial:false}),
   race:new F.StringField({required:true,initial:""}),
   subgroup:new F.StringField({required:true,initial:""}),
   background:new F.StringField({required:true,initial:""}),
   mark:new F.StringField({required:true,initial:""}),
   allocation:new F.SchemaField(allocated),
   humanAttributes:new F.ArrayField(new F.StringField(),{initial:[]}),
   markTalents:new F.ArrayField(new F.StringField(),{initial:["",""]}),
   freeTalents:new F.ArrayField(new F.StringField(),{initial:["","",""]}),
   racialTalent:new F.StringField({required:true,initial:""}),
   woundsTaken:new F.NumberField({required:true,integer:true,initial:0,min:0}),
   actionScore:new F.NumberField({required:true,integer:true,initial:0}),
   notes:new F.StringField({required:true,initial:""})
  };
 }
}
export class MezoriaNPCData extends foundry.abstract.TypeDataModel {
 static defineSchema(){return {rank:new F.NumberField({required:true,integer:true,initial:0,min:0}),notes:new F.StringField({initial:""})};}
}
