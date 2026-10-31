# Agreed rules and open design decisions

## Phase 1 boundary
Develop and test **Quartz (1), Garnet (2), Amethyst (3)**. Do not implement future Marks or high-rank abilities now. Rank 0 represents ordinary unmarked characters.

## Character foundation
- Start player heroes at **Quartz**, with one Mark of Power.
- Five primary attributes: Might, Prowess, Endurance, Intellect, Presence; initial baseline 25 each.
- Starting attribute point allocation is **not decided**.
- Marks of Power: Defender, Striker, Skirmisher, Warden (healing), Arcanist, Adept.
- Rank 2 specialization belongs to the chosen Mark of Power; see JSON roster.
- Rank 3 awakens Soul Weapon; its detailed mechanics remain to be designed.

## Skill rules
- A skill's governing attribute provides its base target percentage.
- Skill Talent adds +5 percentage points, Expertise adds an additional +5, and Mastery adds another +5.
- Expertise requires Talent; Mastery requires Expertise.
- Some skills are inaccessible untrained. The complete roster and gates are **not yet approved**.
- Working starting allocation: **two** skills granted through the Mark, **three** freely selected, **one** background skill. Mark-specific lists and background selections not yet defined. Earlier discussion also mentioned three Mark skills; confirm if this working allocation changes.
- Design races first, then backgrounds.
- Spellcasting separate from Arcana is a **proposal**, not yet a final decision.

## Resolution
- d100 roll under/equal to modified target.
- Successes: 1 + floor((target − roll) / 10).
- Natural 01–05 adds 3 extra successes on a successful check.

## Defense and wounds
- Physical defense = Dodge + Block + Parry; base Dodge = floor(Prowess / 10).
- Avoidable spells: Dodge + Spell Resistance; unavoidable spells: Spell Resistance alone.
- Damage passes through appropriate resistance, shield mitigation pool, armor mitigation pool, Health, then Wounds.
- Quartz wound capacity is 3; threshold = Rank + floor(floor(Endurance / 10) / 2).
- Overflow creates ceil(overflow / threshold) wounds; full wounds results in Bleeding to Death, not automatic death.
- Rank-0 threshold edge cases, resource scaling, and combat action economy are still open.

## Future-only design
- Rank 4 Element, Rank 5 Beast/familiar, Rank 6 Concept, Rank 7 Eldritch.
- Eldritch is a **standardized** identity derived only from Power, Specialization, Element, Concept. It **enhances** Soul Weapon and familiar, not vice versa.
- Do not flesh out these systems until their development phase.

## Next decisions
1. Race roster and racial traits.
2. Skill roster and which skills require training.
3. Final role-specific starting skill selections and background list (after races).
4. Attribute point allocation and skill governing attributes.
5. Rank 1 abilities, action economy, combat implementation.

## Resistance rounding (approved)
- On a hit dealing positive damage of a type with positive applicable resistance, prevent `min(matching damage, max(1, floor(matching damage × resistancePercent / 100)))` damage.
- No fractional carryover. Each damage type in a mixed hit is resolved separately. Do not reduce damage below zero.
- This means a 5% resistance prevents all of a 1-point matching hit; playtest small-hit balance before considering any changes.
