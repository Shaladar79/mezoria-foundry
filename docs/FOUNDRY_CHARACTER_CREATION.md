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

## Compact two-column skill layout — v0.2.5

The approved Skills UI uses two side-by-side panels of approximately equal width: **Trained Skills** (left), then **Untrained Skills** with five attribute-filter tabs (right). Each panel has an independent, fixed-height scroll area. Every skill is a single compact row: **Skill name | Attribute abbreviation | Bonus (Talent +5 or —) | TN % | Roll**. Font sizes are approximately two points smaller than before, and skill names use ellipsis with a full-name tooltip if panel space is limited. Both panels retain the current d100 rolls and bonus calculations. Narrow windows stack panels vertically to maintain usability. No skill rules were changed.

## Attributes and Status tab — v0.2.6

The Attributes and Status tab now has four compact panels: (1) an attribute saving-roll table displaying base 35, allocation, racial bonus, background bonus, final TN and a d100 Roll button; (2) Combat Status showing Rank, racial movement, approved base Dodge = floor(Prowess/10), and Action Score bonus, with an editable **current Action Score** and **Roll New Round** button that adds d20 + floor(Prowess/10) to the prior saved score per the approved carryover rule; (3) Wounds showing Quartz capacity 3, threshold = Rank + floor(floor(Endurance/10)/2), editable current Wounds and a Bleeding to Death alert at capacity; and (4) the approved Health/Mana tens-digit **foundations**, clearly labeled as foundations pending final pool scaling. Unapproved Parry, Block, Spell Resistance, shield, and armor statistics remain explicitly pending. The tracker does not automate action spending, damage, or healing.

## Approved resource naming and Quartz scaling — 2026-11-05

- Rename the Health resource to **LifeForce**. The spellcasting resource is simply **Mana**, not Mana Foundation.
- At Rank 1 **Quartz**, **maximum LifeForce = 3 × (floor(Might / 10) + floor(Endurance / 10))** and **maximum Mana = 3 × (floor(Intellect / 10) + floor(Presence / 10))**, using final attribute scores including allocation and racial/background adjustments.
- The multiplier ×3 applies specifically to Quartz; scaling at higher ranks is not yet approved. Resource spending, current-value trackers, regeneration, healing and recovery are separate decisions still pending.
- Damage order terminology uses **LifeForce** in place of Health; protection and Wound rules are otherwise unchanged.

## LifeForce regeneration and rest — approved Quartz baseline (2026-11-05)

- LifeForce recovers through natural regeneration, rest, and received healing; talents may modify recovery, but their exact bonuses are not yet defined.
- At Quartz Rank (Rank 1), natural regeneration is **1 LifeForce per turn**.
- A **light rest restores 50% of maximum LifeForce** (rounded up to the next whole point, capped at the maximum). A **full rest restores LifeForce to 100% of maximum**. Neither rest action inherently removes Wounds under this LifeForce-only recovery rule.
- Rest durations, higher-rank regeneration, talent modifiers, healing ability amounts, and Mana recovery are pending.
- The Foundry sheet has a current-LifeForce tracker plus explicit buttons for +1/Turn, Light Rest (+50%), and Full Rest. It does not automatically tick every turn or trigger rests; the player activates the relevant button.

## Approved Mana recovery and rest durations — 2026-11-05

- **Mana recovery equals LifeForce recovery at Quartz:** regenerate **1 Mana per turn**, with the Quartz LifeForce rate remaining **1 per turn**.
- **Light rest lasts 4 hours**, restoring **50% of each maximum** (LifeForce and Mana), rounded up to whole points and capped at maximum. This is an amount added to each currently depleted pool, not a reset to 50%.
- **Full rest lasts 8 hours**, restoring both LifeForce and Mana to **100% of their maximum pools**.
- Rest actions do not themselves remove Wounds. Rest eligibility/interruption rules, talents, healing specifics and future Rank scaling are undecided.
- The Foundry Attributes tab includes editable current LifeForce/Mana values and shared +1-per-turn, 4-hour light rest and 8-hour full rest buttons; these trigger on player input, not automatically after elapsed time.

## Wound recovery — approved 2026-11-05

- **Full rest (8 hours):** restore all LifeForce and Mana **and recover 1 Wound** (never reduce Wounds below 0).
- **Light rest (4 hours):** restore 50% of maximum LifeForce and Mana; **does not recover Wounds**.
- **Higher-rank healing abilities** can recover Wounds. The eligible abilities, required ranks, recovery amounts, and Mana costs are pending later ability design.
- Routine per-turn LifeForce/Mana regeneration does not remove Wounds.
- The Foundry full-rest control updates all three stored values together; no automatic rest timer is implied.

## Header rest, Action Score and Essence controls — v0.2.11

- The character sheet header has **Light Rest (4h)**, **Full Rest (8h)** and **Roll Action Score** buttons, available on the character sheet after creation. These reuse the approved recovery and Action Score operations, which remain manually triggered; their duplicate controls are removed from the status panels.
- Light Rest restores half of maximum LifeForce and Mana (rounded up, capped); Full Rest restores both pools completely and reduces Wounds by 1 (minimum zero). +1 LifeForce/+1 Mana per turn remains in the resource panel.
- **Current Essence** and **Spent Essence** are separate editable nonnegative whole-number fields in the header, stored on the Actor with initial values 0. They do not yet imply an Essence grant/spend rule, and manual edits do not automatically redistribute Essence between fields.
- **Spend Essence (Soon)** is visibly disabled until the approved spending menu and its behavior are implemented. No Essence is deducted.

## Compact header toolbar — v0.2.13

- The five header actions are shown in one left-to-right horizontal row: **End Turn**, **Light Rest (4h)**, **Full Rest (8h)**, **Roll Action Score**, and disabled **Spend Essence**. Each uses a compact height and smaller font. The Current/Spent Essence fields are placed directly above the toolbar.
- **End Turn** reuses the pre-existing manual Quartz per-turn recovery action, regenerating +1 LifeForce and +1 Mana (both capped at maximum), and replaces the redundant resource-panel +1 per turn button. No other turn-advancement, Action Score deduction, combat turn-order mutation, or timer behavior is implied or implemented.
- Narrow windows horizontally scroll the toolbar rather than stacking its actions vertically.

## Bleeding to Death: Endurance save resolution — approved 2026-11-05

- At maximum Wounds, the character is Bleeding to Death. Roll an **Endurance saving throw each turn**.
- **One success stabilizes** the character. If their current LifeForce is 0, they stay unconscious; when stable with more than 0 LifeForce, they regain consciousness.
- **Each failed save** adds a cumulative **−5 percentage-point penalty** to future Endurance death-save TNs. **Three failed saves cause death.** Natural 01–05 remains an automatic success under the existing d100 convention.
- The sheet now tracks failed death saves, rolls from the Wounds panel, and displays stable/unconscious/conscious/dead states. It does not automatically roll at turn boundaries or assign external stabilization/extra-damage rules, which remain undecided.

## Dodge defense — approved 2026-11-05

- All characters receive passive Dodge equal to **floor(Prowess / 10)** percent, without spending Action Score, Mana, or making a separate Dodge roll.
- Dodge applies to ranged physical attacks and magical projectiles, not to physical melee attacks, melee spell attacks or unavoidable spells.
- Dodge subtracts from the attacker's target percentage and can thereby reduce hit probability and successes.
- Effective Dodge is **0 while unconscious, immobilized, dead or otherwise physically unable to evade**. A manual Unable to evade toggle models immobilization or other physical incapacity; unconscious or dead states from existing wound/death mechanics suppress Dodge automatically.
- The character sheet shows base Dodge and effective Dodge separately. Future talents, equipment and ability modifiers remain to be defined.

## Parry defense — approved 2026-11-05

- Every melee weapon has a Parry rating. **Total Parry (%) = floor(Might / 10) + equipped melee weapon Parry rating**.
- Parry applies against melee attacks, including melee spell attacks under established defense categories; it does not apply against ranged attacks.
- Under the approved attack-vs-defense formula, applicable Parry reduces the attacker's hit target and can reduce successes.
- Until the Equipment/Item system is developed, the Status tab has a manually editable, nonnegative whole-number **Equipped Melee Weapon Parry Rating** field, default 0, and calculates base and total Parry automatically. Weapon-specific ratings are not yet defined.
- Whether a character can Parry while unconscious/immobilized, and how multiple melee weapons affect Parry, are **pending**, not inferred from Dodge.

## Parry incapacitation — approved 2026-11-05

- Parry uses the same incapacitation conditions as Dodge: unconscious, immobilized, dead, or physically unable to defend => **effective Parry 0%**.
- A single Status tab condition checkbox applies to both defenses. Base Might contribution and the equipped weapon's Parry rating remain saved and are not erased by incapacitation.
- This does not alter the approved formula for normal Parry, and leaves weapon rating values and multiple-weapon rules for equipment design.
