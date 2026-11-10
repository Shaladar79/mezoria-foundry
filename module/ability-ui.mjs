import {MARK_SECTIONS,generatedMarkAbilities,eligibleOptions} from "./ability-generator.mjs";
export function registerAbilityListeners(sheet,html){
 html.find("[data-select-mark-ability]").on("click",event=>{
  event.preventDefault();
  const s=MARK_SECTIONS.find(x=>x.id===event.currentTarget.dataset.selectMarkAbility);
  if(!s)return;
  new Dialog({title:s.name+" — Select Ability",content:"<p>Select an ability source. The custom and premade workflows will be developed next.</p>",buttons:{
   custom:{label:"Custom",callback:()=>ui.notifications.info("Custom ability creation is not yet available.")},
   premade:{label:"Premade",callback:()=>ui.notifications.info("Premade ability selection is not yet available.")}
  }}).render(true);
 });
 html.find("[data-spend-ability-ep]").on("click",event=>{
  event.preventDefault();
  const a=generatedMarkAbilities(sheet.actor.system.mark).find(x=>x.id===event.currentTarget.dataset.spendAbilityEp);
  if(!a)return;
  const rank=Math.max(1,Math.min(3,Number(sheet.actor.system.rank)||1));
  const stored=sheet.actor.getFlag("mezoria-foundry","epPurchases")||{};
  const current=stored[a.id]||{};
  const info=eligibleOptions(a,rank,current);
  const content='<div class="mezoria-ep-dialog"><p><b>'+a.name+'</b> — '+info.remaining+' of '+info.budget+' EP unspent</p>'+
   info.options.map(o=>'<section class="mezoria-ep-category"><h4>'+o.name+'</h4>'+
    o.tiers.map(t=>{const disabled=!t.unlocked||t.tier<=o.current||t.additionalCost>info.remaining;
     return '<label class="mezoria-ep-option"><input type="radio" name="ep-choice" value="'+o.id+':'+t.tier+'"'+(disabled?' disabled':'')+'><span>'+t.description+' · '+t.cost+' total EP'+(a.kind==="aura"?' · no Mana':', +'+t.mana+' Mana')+(t.tier<=o.current?' (owned)':!t.unlocked?' (locked)':disabled?' (insufficient EP)':' · spend '+t.additionalCost+' EP')+'</span></label>';}).join('')+'</section>').join('')+
    '<p>Purchases are stored on this actor. Combat effect automation is not yet connected.</p></div>';
  new Dialog({title:"Spend EP — "+a.name,content,buttons:{
   purchase:{label:"Purchase Selected",callback:async html=>{
    const chosen=html.find('input[name="ep-choice"]:checked').val();
    if(!chosen){ui.notifications.warn("Select an available enhancement.");return;}
    const [id,raw]=chosen.split(":");const tier=Number(raw);
    const latest=sheet.actor.getFlag("mezoria-foundry","epPurchases")||{};
    const owned=latest[a.id]||{};
    const fresh=eligibleOptions(a,rank,owned);
    const option=fresh.options.find(o=>o.id===id);
    const target=option?.tiers.find(t=>t.tier===tier);
    if(!target||!target.unlocked||target.tier<=option.current||target.additionalCost>fresh.remaining){ui.notifications.warn("Enhancement not available.");return;}
    await sheet.actor.setFlag("mezoria-foundry","epPurchases",{...latest,[a.id]:{...owned,[id]:tier}});
    ui.notifications.info("Purchased "+option.name+" for "+a.name+".");sheet.render(false);
   }},
   close:{label:"Close"}
  },default:"close"}).render(true);
 });
}
