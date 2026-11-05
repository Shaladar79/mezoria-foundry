# Mezoria Foundry v2 — Character Creation v0.1

## Scope

The first character creator is a standalone, offline-capable HTML prototype at [`character-creator/index.html`](../character-creator/index.html). It embeds a snapshot of approved rule data from `data/core-rules.json`, `data/races.json`, `data/backgrounds.json`, and `data/skills.json`. No Foundry VTT runtime or installation is required yet.

Download the HTML file and open it in a browser. Create a character, review the live sheet, export a JSON save, and import it later. Print the sheet using the Print button. The exported JSON schema is provisional and will be versioned as the system evolves.

## Character creation: order of operations

1. **Identity:** Enter character name and choose one Mark of Power (Defender, Striker, Skirmisher, Warden, Arcanist, or Adept).
2. **Race:** Choose playable race and, if applicable, Mythrain tribe, Draconian clan, or Scion aspect. Record racial traits and starting movement. Humans choose three distinct attributes for +2 each and receive one additional freely selected Skill Talent.
3. **Background:** Choose one approved background. Background grants its documented attribute bonuses, fixed Skill Talent, and noncombat ability.
4. **Attribute allocation:** Set each of the five attributes (Might, Prowess, Endurance, Intellect, Presence) to 25 before allocation. Distribute exactly 25 whole percentage points with no more than 15 added to one attribute; no pre-bonus attribute may exceed 40. Apply racial and background bonuses afterward. No post-bonus cap has been approved.
5. **Mark Skill Talents:** Select two different skills from the chosen Mark's eight approved options, excluding the fixed Background Talent. On overlap, change the Mark selection, not the Background.
6. **Free Skill Talents:** Select three additional distinct skills from any of the 90 approved skills, with no duplication of Background or Mark awards.
7. **Racial Skill Talent:** If a racial ability grants a free starting Talent (e.g. Human Versatility), choose one more distinct approved skill. No duplicate Talent awards.
8. **Validation and sheet:** Require complete selection and allocation, then calculate visible attribute percentages and Skill Talent entries. Talent adds +5 percentage points to an associated skill's governing attribute when a skill check is called for. The prototype does not yet implement rolls.
9. **Save:** Export the validated character as JSON; print the current sheet when desired.

## Design boundaries and extension plan

- **In scope today:** creation UI, approved race/background/Mark/skill choices, allocation limits, duplicate prevention, sheet preview, import/export and printing.
- **Not yet implemented:** Health/Mana derivation, wounds calculation, defensive values, racial movement edge cases, equipment, armor/shields, spell or power choices, Essence tracking, Rank 2/3 progression, game rules automation, Foundry actor/item data structures, live d100 rolls, or validation of all racial ability mechanics.
- **Do not invent mechanics:** Missing values display as pending. The prototype is not a substitute for full Foundry system implementation.
- **Next iteration:** Define derived stats, then add matching character sheet fields and creator review steps. Build the Foundry Actor/Sheet and system data bindings once their required mechanics are approved.
- **Rule snapshot:** HTML contains embedded approved data. When rule JSON changes, regenerate/update the embedded snapshot before releasing the next version.
- **Talent training:** Some skills are trained-only. Every starting Talent selection awards the Talent tier and satisfies that skill's training requirement. Skill improvement and Essence (XP) spending remain reserved for Rank Advancement.

## Data sources

- `data/core-rules.json`: attribute point pool, caps, Mark skills, Skill Talent allocation
- `data/races.json`: race, tribe, clan, aspect and associated bonuses
- `data/backgrounds.json`: 72 background definitions
- `data/skills.json`: 90 approved skills and trained-only flags

## Verification checklist

- [x] Nine races and their existing 35 subgroup options represented
- [x] 72 approved backgrounds represented
- [x] Six Marks and their eight-option lists use approved skills
- [x] All 90 approved skills are available in free-selection controls
- [x] Background Talents all resolve to current approved skills
- [ ] Browser interaction / Foundry VTT integration tested in a running deployment
