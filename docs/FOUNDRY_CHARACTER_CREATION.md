# Mezoria Foundry v2 — Foundry Character Creation Scaffold

## Implementation status

This is the first **Foundry VTT system scaffold**, intended for the v13 API. It is not yet runtime-tested within Foundry and is not packaged as a hosted manifest install. The repo itself is the working system directory.

- `system.json`: system ID `mezoria-foundry`, Actor types `character` and `npc`, scripts and CSS references
- `module/main.mjs`: Actor data model and character sheet registration
- `module/model.mjs`: persistent Rank 1 character input fields and placeholder NPC model
- `module/rules.mjs`: load existing JSON rules and derive character sheet view, validate starting options
- `module/sheet.mjs`: editable Actor sheet with stage navigation and updates written to Actor `system` data
- `templates/character-sheet.hbs`: five-stage character creator and live character sheet preview
- `styles/mezoria.css`: sheet layout

The `data/` directory remains the source of truth for race, background, Mark, and skill definitions. The Foundry sheet reads these JSON files directly rather than maintaining separate hand-written lists.

## Approved workflow and application order

1. **Race:** Choose race and optional tribe/clan/aspect. Apply racial attribute adjustments and racial traits. Humans select their three Adaptability attributes (+2 percentage points each) and their one extra distinct racial Skill Talent.
2. **Background:** Choose background. Automatically apply its fixed attribute bonuses, one fixed Skill Talent, and noncombat ability.
3. **Mark of Power:** Choose one of the six Marks; select two distinct Skill Talents from its eight-option list, excluding the Background Talent. The Mark has no currently approved attribute adjustments; none are invented.
4. **Three free Skill Talents:** Choose three distinct approved skills excluding racial, background, and Mark grants.
5. **Attribute allocation / review:** Allocate exactly 25 points among five attributes starting at 25% each. Spend no more than 15 points on any one attribute (maximum 40% before bonuses); apply race and background bonuses to final totals. Review validation messages and final sheet.

The standalone creator follows the same order of operations. Displayed final attributes are computed without inventing Health, Mana, Wounds or other deferred formulas.

## Current persistence contract (Actor)

Actor type: `character`. `actor.system` stores the following user choices:

- `rank` (starts at 1)
- `race`, `subgroup`, `background`, `mark`
- `allocation` with keys `Might`, `Prowess`, `Endurance`, `Intellect`, `Presence` (integer additions from 0 to 15)
- `humanAttributes` (three distinct attribute names for humans)
- `markTalents` (two names), `freeTalents` (three names), `racialTalent` (Human additional Talent)
- `notes`

Computed final attributes, talent list, and validation messages are **derived** from those source selections; they are not independent manually editable actor stats.

## Initial manual installation and smoke test

1. Clone or download this repository as a folder named `mezoria-foundry` in the Foundry VTT **User Data / Data / systems** directory.
2. Launch Foundry VTT v13 and create a world using the Mezoria Foundry v2 game system. The compatibility and sheet APIs have not been runtime-verified.
3. In the Actors directory, create an Actor of type `character`, then open its sheet.
4. Choose a race and verify race/subgroup and Human Adaptability controls; choose a background and verify its fixed Talent and bonuses.
5. Choose a Mark, its two Talent options, and three free Talents; verify that conflicting selections are flagged and attribute totals update.
6. Allocate 25 points (maximum 15 into one attribute). Check the preview and validation warnings; close and reopen the sheet to verify Actor persistence.
7. Report errors from the browser developer console for follow-up work.

## Known limitations

- Foundry runtime smoke test has **not** been performed; this is a starter system, not a confirmed production package.
- V13 legacy `ActorSheet` is used provisionally; migrate to ApplicationV2/HandlebarsApplicationMixin after the baseline is tested.
- The sheet validates errors but does not block every intermediate incompatible choice. Changing a background clears directly conflicting selected Talents; on other collisions the player must resolve the error.
- Subgroup-specific racial abilities and bonuses are displayed in a minimal way; resistance, flight, racial powers, and other detailed mechanics are not automated.
- Health, Mana, Wounds, spell casting, defenses, equipment, Essence, advancement, combat and full dice rolls are deferred.
- System is not yet published as an in-app manifest release; use local/manual installation.
- Future edits to the rules JSON will be reflected when Foundry reloads. The standalone HTML snapshot must still be regenerated separately.

## Iteration plan

1. Run the first real Foundry smoke test and repair any manifest/sheet API problems.
2. Define approved Health, Mana, Wounds and defenses; show these on the sheet and in the creator.
3. Expand racial traits and powers to Actor data and add explanatory tooltips.
4. Add inventory and equipment after that design section.
5. Add Rank Advancement and Essence XP when approved; preserve existing Talent uniqueness during creation.
