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
