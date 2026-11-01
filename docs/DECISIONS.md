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

## Magical shield stacking and replacement (approved)
- A target may have **only one active ability-created magical shield mitigation pool at a time**. These pools never stack.
- Applying a **stronger magical shield replaces the existing shield**, including the old shield's remaining mitigation pool and the types of damage it protects against. The two pools do not combine.
- Equipment shields that grant Block are a distinct mechanic and do not occupy the magical shield slot.
- How to measure shield strength and what happens when an equal-strength or weaker shield is cast remain pending.

## Magical shield replacement: target choice and remaining pool (approved correction)
- **Supersedes the prior stronger-shield automatic replacement rule.** There is still only **one active magical shield** per target; pools never stack.
- When a new shield is offered, compare **the existing shield's current remaining mitigation** with **the new shield's offered mitigation**. Do not use the existing shield's original maximum in that comparison.
- **The recipient chooses** whether to retain their current shield or accept the new shield, regardless of which has more mitigation remaining. Type coverage and other shield properties can matter more than raw pool size.
- If accepted, the new shield completely replaces the old shield's remaining pool, damage-type protection, and other shield properties. If refused, the existing shield stays unchanged.
- Example: an existing Fire-only shield with **22 remaining** may be replaced voluntarily with an all-type Arcane Barrier providing **20**; the recipient may instead keep the Fire shield.
- Equipment shields granting Block remain separate from this magical shield slot.

## Same-shield recasting (approved)
- Recasting an existing magical shield creates a new offered mitigation pool rather than adding protection to the active pool.
- The recipient may accept the new shield and replace the current one, or keep the current shield.
- Example: an Arcane Barrier at 8/20, recast for 20, becomes 20/20 if accepted, not 28.

## Magical shield duration and expiration (approved)
- Every magical shield ability defines **its own duration**; there is no universal duration for all shields.
- A shield **ends immediately** when either its duration expires or its remaining mitigation pool reaches **zero**, whichever happens first.
- When the recipient accepts a replacement or recast shield, the old shield ends; the new shield uses its own duration and mitigation pool.
- Exact durations are deferred until individual abilities are designed.

## Magical shield maintenance (approved)
- Ability-created magical shields require **no concentration** and **no ongoing Mana expenditure by default** once successfully cast.
- Shields remain active until the ability-defined duration expires, their mitigation pool is depleted, or another established replacement/end condition occurs.
- An individual shield ability may explicitly require concentration, recurring Mana, or other upkeep; these are exceptions, not the baseline.
- Initial casting costs are established by each ability and are unaffected by this maintenance rule.

## Dispelling magical shields (approved)
- Active ability-created magical shields **can be targeted and removed by dispelling magic**, provided the dispelling effect is strong enough to overcome the shield.
- A successful dispel ends the shield immediately, removing its remaining mitigation pool and damage-type coverage.
- Dispelling is an alternative to depleting the shield by damage or waiting for its duration to expire.
- The precise dispel contest, strength calculation, targeting, and thresholds are deferred until the magic ability system is developed.

## Area-of-effect damage: independent target mitigation (approved)
- For an area-effect attack hitting multiple creatures, resolve **each affected target's damage and defenses independently**.
- Each target applies their own applicable **damage resistances → active magical shield mitigation pool → eligible armor mitigation pool → Health → Wounds**.
- Magical shield pools are **individual to their owners**, not shared or pooled across creatures; each target still has at most one active magical shield.
- Keep damage-type distinctions and the established Physical-first magical shield allocation for each target separately.
- Exact area-attack targeting, attack roll, and saving throw procedures remain to be designed.

## Area-of-effect attack rolls (approved)
- Roll **one d100 attack roll per AoE ability**, rather than rolling separately for every affected creature.
- Compare the **same rolled value** against each target's own final hit target: modified spell/ability accuracy minus that target's applicable defenses.
- Each target is independently hit or missed. Apply the established **natural 01–05 automatic hit** and **96–100 automatic miss** rules to the shared attack roll for each target.
- Each hit target calculates its own successes from its own final hit target and the shared roll, then separately resolves damage resistance, magical shields, applicable armor, Health, and Wounds.
- Any exceptional unavoidable AoE or saving-throw-based abilities will be detailed during ability design.

## Area-of-effect damage per target (approved)
- Area-of-effect attacks use **one shared attack roll**, but each target independently determines whether it is hit and how many successes the attack achieves against that target.
- **Damage dealt to each hit target = successes against that target × the ability's damage per success.** Missed targets receive no damage from that attack.
- The approved natural 01–05 auto-hit/critical rules and 96–100 auto-miss rules apply to each target's resolution of the shared roll.
- Each target separately applies their damage-type resistances, magical shield, eligible armor, Health, and Wounds.
- Example: a 4 Fire damage-per-success AoE yields 12 Fire damage at 3 successes, 4 Fire damage at 1 success, and 0 on a miss, before mitigation.

## Area-of-effect friendly fire (approved)
- **Friendly fire is enabled by default:** area-of-effect damaging abilities affect valid creatures in their area whether they are allies or enemies (including the caster if inside the affected area).
- Individual abilities may explicitly exempt allies, the caster, or other creatures.
- Apply the approved single shared AoE attack roll against each affected target separately; compute that target's successes, damage and mitigation independently.
- Exact area shapes, sizes and target-placement mechanics are deferred to individual ability design.

## Area-of-effect cover and effect origin (approved)
- Creatures receive cover-based defensive protection against an AoE attack **when the cover actually protects them and lies between them and the effect's point of origin**.
- Determine the relevant direction **from the AoE's origin**, not merely from the caster's location.
- Cover that does not intervene between the target and the effect's origin does not protect against that effect.
- Abilities that bypass or circumvent cover can define exceptions.
- Exact cover-defense bonuses, partial versus full cover, and obstacle durability are deferred to terrain/combat cover design.

## Cover levels and defense effects (approved)
- **Partial cover:** +10 percentage points of applicable defense against an attack.
- **Heavy cover:** +20 percentage points of applicable defense against an attack.
- **Full cover:** Target cannot be directly targeted through the obstruction; attacks capable of penetrating, destroying, or explicitly bypassing it may still affect the target under their rules.
- Cover bonuses apply to relevant physical and magical attacks, including area effects where cover intervenes between target and **effect origin**.
- When applicable, the cover bonus is included with the defender's other defense percentages subtracted from the attacker's modified accuracy.
- Exact criteria for cover categories, object durability, attack penetration, and obstruction destruction remain for terrain/equipment rules.

## Destructible cover objects and future Foundry sheet (approved)
- Destructible cover has **its own mitigation pool and durability score**, separate from a character's armor, equipment Block, or magical shield.
- Cover may be damaged or destroyed; exact interaction between pool depletion, durability loss, attacks penetrating objects, and material-dependent values will be defined during **objects and terrain** design.
- **Implementation task deferred:** Build a dedicated **Destructible Cover sheet** in Foundry VTT later, during the objects/terrain phase. It must represent mitigation and durability; additional sheet fields and workflows will be established then.
- Do not invent cover statistics or implement the sheet during this combat-rule phase.

## Damage carry-through on destroyed cover (approved)
- When an attack **destroys intervening cover** and **can penetrate the obstruction**, any damage remaining after the cover absorbs its share **continues toward creatures behind it**.
- If the attack cannot penetrate the material/obstruction, damage does **not** carry through to a creature behind it, even if the cover is damaged.
- Example: a qualifying attack deals 20 damage; cover absorbs 12 before destruction, and the remaining 8 may reach a target behind it, subject to that target's applicable mitigation and any attack-resolution requirements.
- Precise penetration eligibility, cover mitigation and durability interactions, and how a target behind the obstruction is hit are deferred to the **objects/terrain** rules and future Destructible Cover sheet.

## Initiative and action economy: Action Score system (approved foundation)
- **Supersedes the proposed d100 Prowess initiative by successes.** Combat uses the user's HWFWM-style **Action Score**.
- **Starting Action Score = 1d20 + floor(Prowess / 10) + applicable modifiers.** The Prowess contribution is its tens digit (e.g., Prowess 37 contributes +3).
- The combatant with the **highest currently remaining Action Score acts next**. Performing actions spends Action Score, so turn priority changes dynamically as scores change.
- Movement, basic attacks, abilities, and other paid action types each have their own Action Score cost, to be specified separately.
- The round ends when participants are out of enough score to perform permitted paid actions; pass/end-round details remain to be specified.
- **Deferred:** specific costs, tied-score ordering, free actions, unaffordable-action handling, and whether earlier HWFWM carryover/negative-score rules also apply in Mezoria.
