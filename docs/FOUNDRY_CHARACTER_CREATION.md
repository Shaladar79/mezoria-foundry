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

## Character Actor sheet launch flow — 2026-11-05

- **New Character Actors open the basic Character Sheet**, not the creator wizard. A prominent **+** button in the sheet header opens the creator at **Race**.
- The creator follows **Race → Background → Mark of Power → Three Free Talents → Attribute Allocation / Review** and updates the same Actor as choices change.
- **Back to Sheet** returns to the basic sheet without marking character creation complete. The + button remains available.
- On the Review step, **Finish Character Creation** appears only when character validation passes. Clicking it persists `system.creationComplete = true` and returns to the character sheet.
- The + button remains accessible after completion for later edits (its accessible label becomes Edit character creation). This does not change Rank progression or Essence rules.
- Pending or incomplete characters show a notice and their recorded selections on the basic sheet.
- This implementation is pending a live Foundry VTT v13 test.

## Character sheet v0.2 — 2026-11-05 (latest rules)

**This section supersedes previous 25-point allocations and creator order descriptions above.** Starting characters allocate **35 whole percentage points** across five base-25% attributes, subject to **+15 maximum per attribute before race/background bonuses** (40% pre-bonus cap). Racial and background adjustments apply afterward.

### Creator sequence

1. Race, including subgroup/tribe/clan/aspect and Human racial Talent where appropriate.
2. Background, automatically applying its attribute bonuses, fixed Talent and ability.
3. Mark of Power and two eligible Mark Talent selections.
4. Three unrestricted (nonduplicating) free Talents.
5. Allocate exactly 35 attribute points, then review scores.
6. **Character name is always the final creator step**; Finish only when the selection and allocation checks pass.

### Character sheet

The Character Actor opens on the basic sheet, with a **+** button to launch the creator. Its header contains read-only fields for **Name, Race, conditional Tribe (Mythrain) / Clan (Draconian) / Aspect (Scion), Background, and Mark**; edit character-creation choices through the wizard.

The sheet has two tabs:

- **Attributes and Status:** Five attribute TNs with individual d100 roll buttons. Status shows existing movement, Rank and placeholders for Health, Mana, Wounds and Defenses until calculations are approved.
- **Skills:** Trained skills are displayed first (Talent grants +5 to the associated attribute score). All skills allowing untrained checks are then shown; unlearned trained-only skills are excluded. Each visible skill has its current TN and a d100 roll action.

Roll buttons submit Foundry chat messages indicating TN, result, success/failure, and critical outcome. Foundry v13 uses the v13-supported Roll API; the system has still **not been tested inside a live Foundry installation**. Skill bonuses beyond currently implemented Talent and any special situation modifiers remain future work.

### Testing checklist

- Create a new Character Actor; confirm its sheet opens first and the **+** button launches at Race.
- Select Mythrain, Draconian, and Scion in turn; verify the Tribe/Clan/Aspect header field, then switch to Human to test Adaptability and racial Talent.
- Choose Background and Mark, ensuring duplicate Talent selections are flagged.
- Pick three free Talents and distribute all 35 attribute points within the +15 per-attribute cap.
- Enter a name on the **last** creator step and finish; confirm the header and both tabs persist after closing and reopening.
- Verify trained skills appear first; untrained-available skills appear next; untrained trained-only skills are hidden.
- Roll an attribute save and a trained/untrained skill; confirm TN, chat result, and roll-under behavior.

## Selection defaults and visible bonuses — 2026-11-05

- Newly created Character Actors start with **Race, Background, and Mark unset**. Every corresponding dropdown displays **None Selected** until the player explicitly chooses one; creation validation requires each choice.
- Race and Background dropdown option labels list their attribute bonuses. Races whose bonus is subgroup-specific indicate this, and the current race/subgroup and background bonuses are listed beneath each selection as separate positive percentage-point adjustments. Humans continue to choose three +2% attributes.
- Mark Talent controls only appear once a Mark has been selected; after selection, the Mark's eight eligible skill options populate both Talent dropdowns. This prevents the preselected-Mark issue reported during testing.
- Existing Character Actors retain their previous selections. Blank defaults only apply to new Actors, not stored data.

## Starting attribute baseline revision — 2026-11-05

- **Supersedes previous 25% starting base:** All five attributes (Might, Prowess, Endurance, Intellect, Presence) now begin at **35%** before any point allocation or racial/background modifiers.
- Players still distribute **35 percentage points** among the five attributes. The **+15 point maximum per individual attribute** remains unchanged, making the updated pre-racial/background maximum **50%** (35% base +15%). No maximum after bonuses has been approved.
- Character creator, attribute save TNs, skill TNs, and displayed sheet values must all use the new 35% base; the rest of the rules remain unchanged.

## Skills tab organization — development v0.2.4

The **Skills** sheet tab now shows a permanent **Trained Skills** section at the top (all granted Skill Talents, alphabetized; current TN and Roll action). Below it, **Skills Usable Untrained** provides five attribute sub-tabs: Might, Prowess, Endurance, Intellect, and Presence. Each sub-tab shows only approved untrained-usable skills governed by that attribute, excluding skills already listed as trained, with live TN and Roll actions. Unlearned trained-only skills remain hidden. The selected attribute sub-tab persists while the Actor sheet instance stays open. No skill mechanics have changed.
