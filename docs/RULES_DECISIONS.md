# Mezoria — Rules Decisions

> Rules development record. Includes original approvals, superseded proposals, and explicit deferrals. For current background definitions see `data/backgrounds.json`; for racial specifications see `data/races.json`.

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

## Action Score carryover between rounds (approved)
- **Remaining Action Score carries forward between rounds**, including positive, zero, and negative balances. It is not reset to zero at the round boundary.
- **New round Action Score = previous remaining Action Score + 1d20 + floor(Prowess / 10) + applicable modifiers.**
- Example: previous score -6, d20 roll 11, Prowess 47 (+4), no other modifiers results in 9 Action Score for the new round.
- Negative score can persist across rounds if not overcome by the next roll and bonuses.
- **Still pending:** whether actions may voluntarily overspend Action Score, precise pass/end-round behavior, action costs and ties. Negative-score carryover does not by itself decide overspending.

## Action Score final-action overspending (approved)
- With a positive Action Score, a combatant may take an action that costs more points than remain and go into negative score.
- The full action cost is deducted. At zero or negative score, the character cannot take another normal paid action that round.
- Negative Action Score carries into the next round as previously approved.
- Example: 3 remaining points and an action costing 5 leaves -2.
- Special actions while at non-positive score require separate rules.

## Action Score tie-breaking (approved)
- The combatant with the **highest current remaining Action Score** acts next.
- If scores tie, the combatant with the **higher full Prowess percentage** acts first (not merely the tens-digit bonus).
- If Prowess also ties, use a **d20 roll-off**; the higher result acts first. Reroll any continuing roll-off ties.
- Reevaluate ordering as Action Scores change after actions.

## Movement Action Score cost (approved)
- A movement action costs **2 Action Score** to move **up to the character's full movement pace**.
- This replaces the proposed cost of 1 Action Score per movement space.
- Example: a character with ground movement 5 may move up to 5 spaces as a 2-point movement action.
- Further decisions pending: whether moving less than full pace still costs 2, whether multiple movement actions are permitted during the same round, and special terrain or movement-mode rules.

## Partial movement cost (approved)
- Moving **any positive distance up to the character's full movement pace costs 2 Action Score**, regardless of how many spaces are actually traversed.
- No discount applies for moving only part of the character's pace. Example: with movement speed 5, moving 1, 3, or 5 spaces each costs 2 Action Score.
- Further decisions on repeated movement actions and special movement/terrain costs remain pending.

## Multiple movement actions per round (approved)
- A character may take **multiple movement actions in one round**, each costing **2 Action Score** and allowing movement of any positive distance up to full movement pace.
- After each movement action, subtract its cost and recalculate action priority by remaining Action Score; other combatants may act between movement actions.
- The approved final-action overspending rule applies: a combatant with positive Action Score may take a movement action that leaves the balance negative, then cannot take further normal paid actions that round.
- Example: movement pace 5 and two movement actions cost 4 Action Score total, allowing up to 10 spaces in two separate actions.

## Might-governed skill list (approved — 2026-11-05)
- **Might is the governing attribute** for eight skills: **Athletics, Mining, Woodcutting, Brawn, Grappling, Unarmed Combat, Heavy Weapons, Intimidation**.
- Athletics, Mining, Woodcutting, and Intimidation already existed; **Brawn, Grappling, Unarmed Combat, and Heavy Weapons** are new registered skills. Total registered background-granted plus selected skills: **50**.
- **Brawn** represents raw physical force such as lifting, pushing, pulling, and breaking objects; **Athletics** represents strength-based physical movement.
- **Intimidation** is governed by Might, including its non-combat applications. This does **not** change the approved bonuses or Talents of Enforcer and Racketeer; their existing Intimidation skill uses Might as its base.
- **Grappling**, **Unarmed Combat**, and **Heavy Weapons** are distinct skills, but their detailed attack resolution, interactions, weapon classification, and other combat effects remain pending combat-skill design. No existing combat rules are overridden by this roster decision.
- Other skills retain **pending** governing attributes until reviewed by attribute. Skill training restrictions remain unfinalized.

## Starting attribute allocation — approved 2026-11-05

- All five attributes (Might, Prowess, Endurance, Intellect, Presence) begin at **25%** before allocation.
- Characters distribute exactly **25 additional percentage points** among the five attributes at Rank 1 (Quartz).
- No attribute may exceed **40% before race and background bonuses**; this means at most +15 allocated points to one attribute.
- Race and background bonuses apply **after** allocation and may bring a starting attribute above 40%.
- No separate post-bonus starting cap has been approved; do not silently impose one.
- Example: an Embergiest Soldier allocating +15 to Might starts with 25 + 15 + 3 racial + 2 background = **45% Might**.
- Skill-tier advancement, Rank advancement, and Essence spending remain deferred to their later section.

## Starting Mark of Power Skill Talent selection — approved 2026-11-05

- At character creation, a Rank 1 (Quartz) character chooses **two distinct Skill Talents from the eligible skill list of their selected Mark of Power**.
- The Mark does not automatically award two fixed, predetermined skills; the player chooses from that Mark's list.
- The **two-Mark-Talent allocation** is now approved (previous ambiguity over two versus three resolved).
- The individual eligible skill lists for Defender, Striker, Skirmisher, Warden, Arcanist, and Adept remain **under review** and are not yet locked in.
- The working additional allocation remains three free Skill Talents and one background-granted Skill Talent; review remaining skill-selection mechanics separately.
- Skill improvement and Essence (XP) spending remain deferred to rank advancement design.

## Mark of Power starting Skill Talent lists — approved 2026-11-05

At Quartz Rank, choose two distinct Skill Talents from the eight eligible skills associated with the chosen Mark of Power. The user approved all six lists, replacing **Lore: Eldritch Magic** in Arcanist with **Lore: Astral Magic**.

- **Defender:** Athletics, Grappling, Heavy Weapons, Melee Weapons, Tactics, Resilience, Discipline, Leadership.
- **Striker:** Heavy Weapons, Melee Weapons, Ranged Weapons, Throwing Weapons, Unarmed Combat, Athletics, Tactics, Intimidation.
- **Skirmisher:** Acrobatics, Stealth, Melee Weapons, Ranged Weapons, Throwing Weapons, Tracking, Riding, Escape Artist.
- **Warden:** Medicine, Nature, Survival, Animal Handling, Insight, Concentration, Magic Theory, Herbalism.
- **Arcanist:** Magic Theory, Ritual Magic, Use Magic Device, Concentration, Research, Lore: Elemental Magic, Lore: Concept Magic, Lore: Astral Magic.
- **Adept:** Tinkering, Engineering, Navigation, Investigation, Research, Use Magic Device, Sleight of Hand, Persuasion.

All 48 entries reference approved skills (some skills are shared across Marks). These are starting eligibility lists, not exclusive restrictions on future free selections or Essence progression. Each selection grants the Talent tier, including skills otherwise trained-only. Advancing Talent tiers remains deferred to Rank Advancement and Essence (XP).

## Astral origin of magic and skill-list revision — 2026-11-05

- **Supersedes earlier Magical Lore roster:** **Lore: Concept Magic** is removed as a separate approved skill. This does not remove Concept Marks or Concept powers.
- **Cosmology:** Magic originates from the Astral in its pure form. **Lore: Astral Magic** is the foundational magical Lore specialization. **Magic Theory** remains a distinct skill.
- Magical Lore now has **6** skills; total Lore skills **20**; total approved skills **90** (51 trained-only and 39 untrained-allowed).
- The Arcanist Mark's eight starting options now include **Herbalism** in place of Lore: Concept Magic: Magic Theory, Ritual Magic, Use Magic Device, Concentration, Research, Lore: Elemental Magic, Herbalism, Lore: Astral Magic.
- Historic entries above reflect past approval states and are superseded by this amendment.

## Three free starting Skill Talent selections — approved 2026-11-05

- At Rank 1 (Quartz), select **three distinct free Skill Talents** from **any of the 90 approved skills**, without Mark of Power restrictions.
- Each starting free selection grants the **Talent** tier.
- A skill already granted through the selected Mark of Power or the background cannot be chosen as a free selection; duplicate starting Skill Talent awards are not permitted.
- The starting Skill Talent allocation remains two Mark choices + three free choices + one background grant (six, before possible racial traits).
- Tier improvement and Essence (XP) spending are reserved for advancement design.

## Background and Mark Skill Talent overlap — approved 2026-11-05

- Background-granted Skill Talent takes priority and remains unchanged.
- If either of the two selected Mark of Power skills matches the Background skill, **reselect that Mark Talent from another eligible skill on the same Mark's list**.
- Background grants are **not** converted to a free choice on overlap. No duplicated starting Talent awards.
- The previous recommendation to replace the Background award with an unrestricted free Skill Talent is rejected.

## Racial Skill Talent uniqueness — approved 2026-11-05

- Racial Skill Talents must be selected from skills not already granted by the character's Mark of Power, Background, or freely chosen starting talents.
- A racial Skill Talent cannot duplicate any other racial starting Skill Talent.
- The Human Versatile racial trait grants one additional freely chosen distinct Skill Talent, giving a standard Human seven total starting Skill Talents (2 Mark, 3 free, 1 Background, 1 racial).
- All racial skills selected under a free-choice trait may come from the approved skill roster; duplicate awards do not stack.
- Skill improvement and Essence (XP) remain deferred to Rank Advancement.

## Creator and sheet revision — 2026-11-05 (superseding prior allocation)

- User changes distributable starting attribute pool **from 25 to 35 whole percentage points**. Base remains 25% in each of five attributes; pre-race/background allocation cap remains 40% (+15 max per attribute). All 35 points can be allocated within this cap.
- Creator order: Race (Human racial Talent) → Background → Mark and two Talents → Three Free Talents → 35-point attribute allocation → **Character Name, always the final step**, then finish.
- Character sheet header has name, race, conditional Mythrain tribe / Draconian clan / Scion aspect, background, and Mark fields.
- Two sheet tabs: Attributes and Status, Skills. Show attribute saving rolls at current attribute TN. Skills tab shows all untrained-available skills plus trained skills, with trained skills first, and TN plus roll action; trained-only skills not trained remain hidden.
- Keep Health, Mana, other unfinished stats as placeholders pending rules approval. Normal percentile rolls use the system's d100 roll-under convention.

## Starting attribute baseline revision — 2026-11-05

- **Supersedes previous 25% starting base:** All five attributes (Might, Prowess, Endurance, Intellect, Presence) now begin at **35%** before any point allocation or racial/background modifiers.
- Players still distribute **35 percentage points** among the five attributes. The **+15 point maximum per individual attribute** remains unchanged, making the updated pre-racial/background maximum **50%** (35% base +15%). No maximum after bonuses has been approved.
- Character creator, attribute save TNs, skill TNs, and displayed sheet values must all use the new 35% base; the rest of the rules remain unchanged.

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

## Equipped shield Block defense — approved 2026-11-05

- **Block (%) = equipped shield's Block rating + floor(Endurance / 10) / 2.** The specified formula does not round down after halving; half percentage-point values are retained (e.g. Endurance 35 gives +1.5%).
- An equipped shield is required for its Block defense. Without a shield, effective Block is 0 and the Endurance contribution does not apply.
- Equipment shields Block applicable physical melee and ranged attacks. Magic cannot be Blocked without a specific magic-blocking property; magical shield mitigation pools are a separate mechanic.
- Until Item/equipment support exists, Status has a shield-equipped toggle and manually editable integer shield Block rating; base Endurance contribution and total Block derive automatically. Numeric shield ratings remain pending equipment design.
- Whether incapacitation removes Block and how multiple shields interact remain pending explicit decisions.

## Block rounding and incapacitation — approved 2026-11-05

- Block is always a whole-number percentage: **Block = equipped shield rating + floor(floor(Endurance / 10) / 2)**. This explicitly rounds the Endurance-based half down, preventing fractional Block values (e.g., Endurance 35 adds +1%, not +1.5%).
- Block requires an equipped shield; without one it is 0. While unconscious, immobilized, dead or unable to physically defend, **effective Block is 0**; the shield rating is retained.
- The existing shared **Unable to Dodge / Parry / Block** condition toggle applies to all three defenses. Automatic incapacitation suppression also applies to each.

## Spell Resistance — approved 2026-11-05

- Everyone's **Spell Resistance (%) = floor(Intellect / 10)**, rounded down to whole percentage points. It is derived in the Combat Status panel.
- Existing approved spell-defense categories remain: magical projectile = Dodge + Spell Resistance (plus Block only for shields explicitly able to block magic); melee spell attack = Parry + Spell Resistance (plus conditional magical Block); unavoidable spell = Spell Resistance only.
- The incapacitation interaction for Spell Resistance has **not** been decided; unlike Dodge/Parry/Block, the sheet does not currently set it to zero for incapacitation. Any equipment, talent, or spell modifiers remain for later design.

## Spell Resistance while incapacitated — approved 2026-11-05

- **Spell Resistance remains active at its full calculated value** when unconscious, immobilized, dead, or otherwise physically unable to defend. Unlike Dodge, Parry, and Block, it does not depend on movement or an active defensive response.
- Formula stays **floor(Intellect / 10)** whole percentage points, and is not suppressed by the Unable to Dodge / Parry / Block checkbox or by Wound/death status.
- Spell Resistance still applies against magical projectiles, melee spell attacks, and unavoidable spells according to their existing attack-defense categories.

## Armor categories, equipment ranks and mitigation caps — approved 2026-11-06

- There are **three armor categories: Light, Medium, Heavy**.
- **All equipment uses the same Rank scale as characters: Rank 0–10**, with Rank 0 Normal through Rank 10 Astralite.
- **A character may not use or equip equipment higher than their own Rank**. Equal or lower Rank is permitted by this rank-gating rule; other item requirements are not yet specified.
- **An armor piece's maximum mitigation pool is determined jointly by its armor category and Rank**. The category-by-rank numerical caps remain **pending**; do not assign guessed mitigation points.
- Prior approved damage handling, armor depletion, durability and repair rules remain unchanged.
- Sheet inventory/equip validation and armor category/rank data fields are deferred until equipment design; this entry records the approved framework only.

## Rank 0 armor mitigation caps — approved 2026-11-06

- **Normal (Rank 0) maximum armor mitigation pools:** Light **5**, Medium **10**, Heavy **15** mitigation points.
- These are category maximums at Rank 0, not additional damage reduction percentages. Armor mitigation is a depleting pool under the previously approved damage order.
- Rank 1–10 category-by-rank mitigation growth is **not yet approved**. Do not use provisional scaling figures as official rules.

## Armor maximum mitigation by rank — approved 2026-11-06

- Armor categories: Light, Medium, Heavy. Rank 0 base pools: 5, 10, 15 respectively.
- Approved rank multipliers: Rank 0 Normal ×1; Rank 1 Quartz ×1.5; Rank 2 Garnet ×2; Rank 3 Amethyst ×3.
- **Always round calculated armor mitigation maximums UP to the next whole point** (`Math.ceil`).
- Approved maximum mitigation pools:

| Rank | Light | Medium | Heavy |
|---|---:|---:|---:|
| 0 Normal | 5 | 10 | 15 |
| 1 Quartz | 8 | 15 | 23 |
| 2 Garnet | 10 | 20 | 30 |
| 3 Amethyst | 15 | 30 | 45 |

- Rank 3 marks the first major soul-strengthening power threshold and Soul Weapon manifestation. Rank 4–10 mitigation scaling remains intentionally deferred.
- Character equipment remains limited to equipment of equal or lower Rank.

## Individually defined armor mitigation and durability bases — approved 2026-11-06

- **Armor type/item design determines its own base mitigation and base durability.** Light, Medium and Heavy armor types need not share identical statistics within a category.
- **Rank scaling:** for Ranks 0–3, use the established armor multipliers x1, x1.5, x2, x3. Maximum mitigation = ceiling(item base mitigation × Rank multiplier); maximum durability = ceiling(item base durability × Rank multiplier). Both are whole-point pools, rounded **up**.
- The approved category mitigation values (Rank 0 Light 5, Medium 10, Heavy 15 and scaled category caps at Ranks 1–3) are **ceilings**, not automatically assigned values. An item's Rank 0 base mitigation must not exceed its category's Rank 0 cap, and a scaled item must not exceed the category cap at its Rank.
- Example: a Heavy armor design with base mitigation 12 gets 12/18/24/36 mitigation at Ranks 0/1/2/3, below the Heavy category caps 15/23/30/45.
- **Durability base values are assigned per armor type** when designed; no universal durability numbers or category-wide durability caps have been approved.
- Equipment can only be used by a character of equal or greater Rank. Rank 4–10 scaling remains deferred.
- Existing mitigation depletion, durability loss and repair rules are unchanged. Equipment item sheet/validation are still pending.

## Durability Rank scaling revoked — approved 2026-11-06 (supersedes previous entry)

- **Maximum armor Durability is a fixed whole-number statistic assigned to each armor type when designed. It does NOT scale with equipment Rank.** Rank 0 through Rank 10 versions of the same armor type retain the same maximum Durability unless a separately designed item explicitly has different base properties.
- This supersedes the earlier proposal to multiply Durability by 1/1.5/2/3 and round up. Those prior Rank-scaled Durability examples are **not approved**.
- **Mitigation still scales by Rank** using the approved multipliers (Rank 0 ×1, Rank 1 ×1.5, Rank 2 ×2, Rank 3 ×3), rounding mitigation up and applying its armor-category cap. Higher Rank multipliers remain pending.
- Existing durability-loss and repair rules are unchanged. Individual armor types' durability numbers are yet to be designed.

## Magical shield tracker — approved 2026-11-06

- The Status tab has **Current Magical Shield Mitigation** (whole-number points) and **Remaining Duration** (editable, ability-defined duration). No maximum mitigation field is shown.
- Current mitigation of 0 means the shield is gone and clears Remaining Duration. Reapplication by an ability grants a new pool; shields do not regenerate simply because time passes.
- Ability-specific durations are not standardized; the sheet uses a text duration field until power/effect tracking can provide units and expiration automation. When duration expires, the magical shield ends even if points remain; currently this expiration must be resolved manually by setting mitigation to 0.
- One active magical shield maximum, existing replacement decision rules, damage ordering and dispelling remain unchanged.

## Equipped armor Status tab tracking — 2026-11-06

- Added provisional Actor fields and Attributes & Status controls for armor name, category (Light/Medium/Heavy), equipment Rank, individual base mitigation, current and calculated maximum mitigation, current durability, and fixed maximum durability.
- Maximum mitigation derives from `ceil(base mitigation × approved equipment Rank multiplier)` for Ranks 0–3; category Rank 0 base caps are Light 5, Medium 10, Heavy 15. Editing is validated against base/category caps, character equipment Rank, and current-versus-maximum pools. New current pool values initialize at calculated maximum when unset.
- Maximum durability is manually entered per armor type and does not scale with Rank; current durability defaults to that maximum when unset. Both track as whole-number points.
- Equipment Items and item-driven synchronization are deferred until the Equipment section. Ranks 4–10 mitigation scaling is not invented.
- Resistances belong on a separate future tab, conditions on the Combat tab. Next design priority: Rank 1 starting powers for each Mark of Purpose, followed by ability creation rules.

## Mark of Purpose starting abilities — approved 2026-11-06

- At Rank 1 (Quartz), every Mark of Purpose grants **one signature active ability** and **one passive ability** automatically on selection. Applies to Defender, Striker, Skirmisher, Warden, Arcanist and Adept.
- Specific ability effects are not approved yet. Design each Mark's pair individually, beginning with Defender. Active ability cost and action mechanics will be specified per power under the existing Mana rule.
- This starting allocation does not decide how many additional powers may be learned, their creation rules, or later-Rank grants.

## Guardian's Stand and starting Mark auras — approved direction 2026-11-09

- Defender's Rank 1 **Guardian's Stand** is an active **self-only** defensive effect intended to help its user withstand attacks; at Quartz it gives a **small Parry bonus**. Bonus amount, Mana and action cost, duration, and progression remain to be designed. Do not treat it as an ally-interception or ally-targeted skill.
- Defender's Rank 1 passive **Unyielding Resolve** becomes the beginning of Defender's **aura power**, rather than a self-only defensive passive.
- **Every Mark of Purpose starts with a passive aura power at Quartz.** The aura gives **a small bonus to the defenses of allies within a small radius of the character** and forms the basis for later aura development.
- Exact aura radius, defensive categories and amounts, whether the bearer is included, aura stacking, progression and distinctive Mark-specific differences are undecided. No numerical effects are approved yet.
- This revises the earlier illustrative Guardian's Stand/Unyielding Resolve descriptions, without changing the approved one-active plus one-passive starting grant.

## Quartz Mark aura range and defense coverage — approved 2026-11-09

- All six starting Mark of Purpose aura passives have a **2-space radius** at Quartz Rank.
- Allies within the aura receive bonuses to **all applicable defenses: Dodge, Parry, Block, and Spell Resistance**. Applicable means existing restrictions on which defense works against an attack still apply; the aura does not grant the ability to Dodge melee or Parry ranged attacks.
- **Numerical bonuses are not yet approved**, and neither are aura stacking, bearer inclusion, duration/uptime, or higher-Rank progression. Review bonus magnitudes next.

## Correction: distinct Mark of Purpose starting auras — approved 2026-11-09

- The preceding rule that *all* six Marks provide a two-space bonus to every defense is **superseded**. All six Marks begin with **different** passive auras, creating party synergy, and each has one active granted ability.
- **Defender only:** Unyielding Resolve grants nearby allies, within **2 spaces**, a small bonus to all applicable defenses (Dodge, Parry, Block, Spell Resistance). Numeric bonus remains undecided.
- Other Marks will receive different aura effects; their radii and bonuses have not yet been determined. Aura stacking and self-inclusion are pending.
- **Aura-Control** is a new Presence skill talent; exact uses await aura and ability creation rules.

## Defender Quartz power bonuses and Aura-Control distinction — approved 2026-11-09

- **Guardian's Stand (active):** self only; grants **+5 percentage points to Parry** at Quartz Rank while active. Mana cost, action cost, duration and future Rank scaling remain undecided.
- **Unyielding Resolve (passive aura):** provides allies within **2 spaces** **+2 percentage points** to all *applicable* defenses: Dodge, Parry, Block, and Spell Resistance. Existing applicability restrictions remain unchanged; aura bearer inclusion, aura stacking and later improvements remain undecided.
- **Aura-Control** is a distinct Presence skill for **aura combat**, exerting aura pressure and attempting to subdue or overwhelm others through one's aura. It is primarily a roleplay/flavor-oriented capability; detailed contest mechanics come later. **It does not improve passive Mark aura bonuses, radius, targeting, or other passive aura properties by default.** This supersedes earlier speculative aura-shaping interpretations.

## Striker granted starting powers — approved concepts 2026-11-09

- **Battle Fury**, Striker signature active at Quartz: temporary self-only increase to offensive damage. Exact amount, damage calculation, action/Mana cost, duration and higher-rank progression pending.
- **Aura of Ferocity**, Striker signature passive at Quartz: increases nearby allies' damage to create synergy with Defender's distinct defensive aura. Exact bonus, radius, relevant damage types, stacking and progression pending. Do not copy Defender's defense aura or presume the same 2-space radius without approval.
- Approval covers ability concepts, not numerical values or special mechanics. Aura-Control remains separate from passive Mark auras.
