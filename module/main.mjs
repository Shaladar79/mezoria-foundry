import {MezoriaCharacterData,MezoriaNPCData} from "./model.mjs";
import {MezoriaCharacterSheet} from "./sheet.mjs";
import {loadCreationRules} from "./rules.mjs";
Hooks.once("init",()=>{
 CONFIG.Actor.dataModels.character=MezoriaCharacterData;
 CONFIG.Actor.dataModels.npc=MezoriaNPCData;
 Actors.registerSheet("mezoria-foundry",MezoriaCharacterSheet,{types:["character"],makeDefault:true,label:"Mezoria Character Sheet"});
});
Hooks.once("ready",async()=>{
 try{await loadCreationRules();game.actors.filter(a=>a.type==="character").forEach(a=>{if(a.sheet?.rendered)a.sheet.render(false)});}
 catch(e){console.error("Mezoria: could not load creator rules",e);ui.notifications.error("Mezoria creation rules could not be loaded. See browser console.");}
});
