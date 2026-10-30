# Mezoria Foundry v2

Foundry VTT system development for **Mezoria**, a percentile-based heroic fantasy RPG.

## Development scope

The first playable milestone is **Rank 1 (Quartz) through Rank 3 (Amethyst)**. Rank 0 (Normal) is for unmarked inhabitants and NPCs; player characters begin at Quartz. Higher-rank features are design notes only until their development phase.

This repository is being developed incrementally: record agreed rules, introduce data models, then build and connect Foundry sheets, rolls, progression, and combat when their dependencies are designed.

## Current foundation

- Five attributes: Might, Prowess, Endurance, Intellect, Presence.
- Six starting Marks of Power with three associated Rank 2 specializations each.
- Skill talents: Talent, Expertise, and Mastery grant cumulative +5, +10, and +15 percentage points.
- New Quartz heroes receive talents from their Mark of Power, player choice, and a future background.
- Roll-under d100 with additional successes by 10-point margin, and critical bonuses on natural 01–05.
- Universal Mana for activated powers, including martial abilities.
- Shield and armor mitigation pools; wound system.

See `data/core-rules.json` and `docs/DECISIONS.md` for the machine-readable and human-readable current specifications.

## Important

**Not yet a playable Foundry package.** No Foundry manifest, sheet, or automation is claimed to be ready. Rules tagged `pending` or `provisional` must not be treated as finalized.
