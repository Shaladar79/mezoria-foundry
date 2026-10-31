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

## Mixed-type damage resistance (approved)
- Split a mixed-damage attack into its damage-type components before resistance.
- Calculate applicable resistance separately for each component using floor, minimum 1 prevented damage when both matching damage and resistance are positive; prevention never exceeds that component's damage.
- Combine remaining damage after resistance and proceed through shield mitigation, armor mitigation, Health, and Wounds in the approved order.
- Rules for assigning remaining damage types to shield and armor mitigation pools still require design.

## Shield categories (approved clarification)
- **Equipment shields** grant a Block percentage, contributing to physical defense and reducing an attack's chance to hit. They do **not** provide the magical shield damage-mitigation pool.
- **Magical shields** granted by abilities provide a damage-mitigation pool. That pool absorbs post-resistance damage before armor mitigation.
- Combat damage order: applicable resistance → magical shield mitigation pool (if active) → armor mitigation pool → Health → Wounds.
- Exact equipment Block percentages, magical shield capacity, lifetime, and recharge rules remain pending.

## Armor mitigation durability and repair (approved)
- Armor provides an equipment mitigation pool which depletes as it absorbs damage after applicable resistances and magical shields.
- Depletion persists across combat encounters; armor does **not** automatically regain mitigation when combat ends.
- Ordinary armor requires repairs to restore its mitigation pool.
- Some magical armor has item-specific regeneration of its mitigation pool over time, without ordinary repair; rates and conditions are defined by the item.
- Armor mitigation capacity, repair methods/costs, and magical regeneration intervals are deferred to equipment design.

## Field versus workshop armor repairs (approved)
- Minor repairs may be performed in the field by a character with the appropriate Crafting skill for the armor.
- Field repairs may restore up to **25% of the armor's maximum mitigation pool**; exact rounding and handling of repeat field repairs remain to be decided.
- Full repairs, restoring the complete mitigation pool, require an appropriate workshop and Crafting skill.
- Tool/material requirements, repair time and roll difficulty will be defined with the Crafting and equipment systems.

## Armor field-repair ceiling and Durability (approved revision)
- Field repair is **not** a total cumulative 25% repair allowance. It may be repeated, but may never raise the armor's current mitigation pool above **25% of the original maximum mitigation pool**. Example: maximum 40, field-repair ceiling 10; with pool 0 it can be brought to 10, with pool 7 it can be brought to 10.
- Armor has a separate **Durability** score, analogous to wounds. Each time a positive armor mitigation pool is depleted to zero, armor loses **1 Durability**. While the pool remains at zero, further hits do not repeatedly subtract Durability; repairing and depleting again triggers another loss.
- At **0 Durability**, armor cannot be repaired in the field until it is repaired in an appropriate workshop. Workshop repair is required to restore field-repair eligibility.
- Full mitigation-pool repair requires an appropriate workshop. The appropriate Crafting skill is required for field repairs and workshop repairs.
- Starting/max Durability, amount restored by workshop repair, 25% ceiling rounding, tools/materials, and interaction with magical self-repair will be defined later.
- This replaces the earlier interpretation of field repairs as a cumulative 25%-of-maximum restoration allowance.

## Deferred to equipment design: armor Durability values
- Do not select starting/maximum Durability by armor category or by material yet. Revisit both options when designing equipment rules.
- Preserve the already-approved mitigation depletion, Durability loss at zero mitigation, field repair ceiling, and workshop requirements.

## Physical defenses by attack type (approved)
- **Parry:** applies to melee attacks only; not ranged attacks.
- **Dodge:** applies to ranged attacks only; not melee attacks.
- **Block:** may apply against both melee and ranged attacks.
- Thus melee defense draws on applicable **Parry + Block**, and ranged defense draws on applicable **Dodge + Block**, rather than universally combining all three.
- Exact chance-to-hit resolution and interaction with avoidable spell attacks remain to be determined. This replaces earlier shorthand stating physical defense is always Dodge + Block + Parry.

## Spell defenses and shield blocking (approved)
- Magical projectile attacks count as ranged: **Dodge + Spell Resistance**. They receive Block **only if the equipped shield explicitly permits blocking magical attacks**.
- Melee spell attacks count as melee: **Parry + Spell Resistance**. They receive Block **only if the equipped shield explicitly permits blocking magical attacks**.
- **Ordinary equipped shields cannot Block magic by default**. Special item properties may allow it; exact shield enchantments are part of equipment design.
- Unavoidable spells use **Spell Resistance only**; Dodge, Parry, and equipment Block do not apply.
- Detailed attack-versus-defense math remains to be designed.

## Attack versus defense (approved)
- **Final attack target = modified attacker skill percentage − sum of applicable defender defense percentages**, as determined by attack type and shield-magic restrictions.
- Roll d100. An attack succeeds when the roll is at most the **final attack target**.
- Successful attack's successes use **1 + floor((final attack target − roll) / 10)**, so defense can reduce both accuracy and success count.
- Existing successful natural 01–05 critical bonus of 3 successes remains unchanged; target floors/ceilings and edge cases will be reviewed separately.

## Automatic low-roll hits and critical successes (approved)
- On **attack rolls**, natural **01–05 always hits**, even if defenses reduce the final attack target to 0 or below. The minimum hit probability is therefore 5%.
- If the **final attack target is 5% or less**, a natural 01–05 hit is a **normal success (1 success)** and gets **no +3 critical successes**.
- If the final attack target is **greater than 5%**, natural 01–05 retains the ordinary **+3 critical successes**, calculated in addition to the standard success formula.
- All other successful attacks calculate successes with `1 + floor((final target − roll)/10)`.
- This modifies **combat attack** resolution; non-attack skill checks are not changed by this decision.

## Automatic high-roll misses (approved)
- On combat attack rolls, natural **96–100 always misses**, regardless of final attack target or accuracy bonuses.
- These are **ordinary misses**, not automatic critical failures and do not inherently apply extra penalties.
- Together with natural 01–05 automatic hits, effective attack hit chance is bounded between **5% and 95%**, even if the calculated target lies outside that range.
- Attack resolution precedence: natural 96–100 misses; natural 01–05 hits (normal 1 success if final target <=5); otherwise compare the roll to the unmodified-by-these-exceptions final target.

## Damage scaling by successes (approved)
- The standard damage formula for damaging weapons and abilities is **damage = successes × that weapon or ability's damage per success**.
- Each weapon or ability supplies its own damage-per-success value; values will be assigned in the equipment/ability design phase.
- Successful attack critical bonus successes count toward damage scaling.
- Example: 4 successes from an attack with 3 damage per success produces **12 damage** before applicable resistance, magical shields, armor, Health, and Wounds.
- Explicit additional damage effects (including type-specific bonuses) apply according to their own rules; exact modifier handling may be detailed with abilities and equipment.

## Armor protection by damage type (approved)
- **Ordinary physical armor** absorbs **Physical damage only** (including slash, pierce, and bludgeon), through its armor mitigation pool. It does not absorb elemental or other non-Physical damage.
- **Magical armor** may explicitly protect against additional damage types, determined by that armor's individual properties. Magical status alone does not automatically confer protection against every damage type.
- For mixed-damage attacks, track damage-type components separately through armor mitigation. Only armor-covered components spend the armor pool; uncovered components bypass armor and continue to Health/Wounds after earlier applicable mitigation.
- Which damage types ability-created magical shields absorb is not yet defined and will be addressed separately.

## Magical shield damage-type coverage (approved)
- Magical shield **mitigation pools granted by abilities** absorb damage of **all types by default** (Physical and elemental/other types).
- An individual ability may expressly restrict its shield to certain damage types (for example, Fire only).
- Eligible damage is absorbed by the shield pool after applicable resistance and before armor mitigation, up to the shield's remaining capacity.
- This does not change equipment shield Block rules: ordinary equipped shields cannot Block magic unless they have an explicit relevant property.
- Still pending: how limited shield capacity is allocated among damage components when a mixed-type attack exceeds the remaining magical shield pool.

## Magical shield mixed-damage allocation: Physical first (approved)
- After resolving each damage type's resistance independently, eligible **Physical damage consumes an ability-created magical shield mitigation pool before eligible non-Physical damage**.
- Shield mitigation is limited by its current remaining pool and the types the ability can absorb.
- Example: a standard barrier with 15 mitigation takes 12 Physical + 8 Fire after resistance; it absorbs 12 Physical and 3 Fire, leaving 5 Fire. Ordinary armor cannot absorb the remaining Fire.
- Ordering when an attack includes **multiple non-Physical damage types** remains pending.

## Multiple non-Physical damage types: attacker-declared ordering (approved)
- Magical shields continue to absorb eligible **Physical damage first**.
- When a mixed attack includes multiple eligible **non-Physical damage types** and shield capacity is insufficient, the **attacker chooses their resolution order when declaring the attack**.
- This priority must be declared **before the defender's damage resistances and mitigation are calculated** and cannot be changed after seeing the result.
- Remaining magical shield pool absorbs non-Physical components in the declared order. Only damage types eligible under the shield ability can be absorbed.
