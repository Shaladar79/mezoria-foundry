# Mezoria Foundry v2

Foundry VTT system development for **Mezoria**, a percentile-based heroic fantasy RPG.

## Development scope

The first playable milestone is **Rank 1 (Quartz) through Rank 3 (Amethyst)**. Rank 0 (Normal) is for unmarked inhabitants and NPCs; player characters begin at Quartz. Higher-rank features are design notes only until their development phase.

This repository is being developed incrementally: record agreed rules, introduce data models, then build and connect Foundry sheets, rolls, progression, and combat when their dependencies are designed.

## Current foundation

- Five attributes: Might, Prowess, Endurance, Intellect, Presence.
- Six starting Marks of Power with three associated Rank 2 specializations each.
- Skill talents: Talent, Expertise, and Mastery grant cumulative +5, +10, and +15 percentage points.
- New Quartz heroes receive talents from their Mark of Power, player choice, and a selected background; the 20 Common backgrounds are defined in `data/backgrounds.json`.
- Roll-under d100 with additional successes by 10-point margin, and critical bonuses on natural 01–05.
- Universal Mana for activated powers, including martial abilities.
- Shield and armor mitigation pools; wound system.

## Design documentation and game data

- `data/core-rules.json` — system rules and character-creation framework.
- `data/races.json` — structured racial details.
- `data/backgrounds.json` — background categories and the 20 finalized Common backgrounds.
- `docs/RULES_DECISIONS.md` — rules development and decisions.
- `docs/RACE_DECISIONS.md` — race design reference and decisions.
- `docs/BACKGROUND_DECISIONS.md` — background design decisions and history.
- `docs/DECISIONS.md` — index linking to the three decision files (retained for old links).

Use these separate decision files when assembling a future in-person tabletop rulebook. Each subject has a dedicated home so its decision history can be reviewed without searching unrelated mechanics.

## Important

**Not yet a playable Foundry package.** No Foundry manifest, sheet, or automation is claimed to be ready. Rules tagged `pending` or `provisional` must not be treated as finalized.

## Character creator prototype

A standalone Quartz character creator and live basic sheet are available at [`character-creator/index.html`](character-creator/index.html). Download this HTML file and open it in a browser to create Rank 1 characters and export/import JSON saves. The current [character creation order and limitations](docs/CHARACTER_CREATOR_V01.md) are documented separately. This is a prototype rather than an installed Foundry VTT system.

## Foundry VTT system scaffold (v0.1)

The repository root contains `system.json`, the minimal Foundry VTT system manifest. The `module/` folder contains a character Actor data model, rule loader and sheet controller; `templates/character-sheet.hbs` contains the character sheet, and `styles/mezoria.css` supplies styling. This initial build targets the Foundry v13 APIs but has **not yet been run and tested in Foundry**. The [creation implementation notes](docs/FOUNDRY_CHARACTER_CREATION.md) explain current limitations and how to test it.

The creator now proceeds **Race → Background → Mark → Three Free Talents → Attribute Allocation and Review**. Human racial Talent is selected during the Race stage. This workflow also applies to the standalone creator.

## Character sheet v0.2: testing target

Character Actor sheet now shows identity fields (name, race, conditional tribe/clan/aspect, background, Mark) and opens the creator through its **+** button. The creator asks for a name **last** and uses **35 distributable attribute points** (40% pre-bonus cap). Two tabs are available: **Attributes and Status** (attribute saves and current TN) and **Skills** (trained skills first, other untrained-allowed skills afterward; each has a current TN and d100 roll button). See [Foundry test checklist](docs/FOUNDRY_CHARACTER_CREATION.md). This version has not yet been verified in a live Foundry environment.
