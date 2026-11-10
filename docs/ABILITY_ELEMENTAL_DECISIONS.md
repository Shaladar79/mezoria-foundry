# Mezoria Foundry v2 — Ability, Elemental, and Combat Design Decisions

> Approved design record through **Q114**, 2026-11-09. This is design documentation, not an assertion that rules are implemented in Foundry. **Q110–Q114 are now approved.** Later explicit corrections supersede earlier proposals. Also consult [RULES_DECISIONS.md](RULES_DECISIONS.md) for the older foundation and starting-Mark decisions.

## Scope and earlier approved foundations

- Character Ranks: **Rank 0 Normal** (unmarked); **1 Quartz, 2 Garnet, 3 Amethyst, 4 Topaz, 5 Opal, 6 Emerald, 7 Sapphire, 8 Ruby, 9 Diamond, 10 Astralite**.
- Mark milestones: Rank 1 Mark of Purpose; 2 Specialization; 3 Soul Weapon; 4 Elemental Mark; 5 Mark of the Beast; 6 Concept Mark; 7 Eldritch Mark.
- Marks of Purpose: Defender, Striker, Skirmisher, Warden, Arcanist, Adept. At Quartz, each receives one granted signature active and one granted passive aura, rather than consuming a purchased-ability slot.
- **Defender**: Guardian's Stand (active, self-only, +5 percentage points Parry); Unyielding Resolve (passive, allies within 2 spaces +2 percentage points to applicable Dodge, Parry, Block, and Spell Resistance).
- **Striker**: Battle Fury (active, +3 Physical damage per attack success); Aura of Ferocity (passive, allies within 2 spaces +1 Physical damage per attack success).
- **Skirmisher**: Evasive Footwork (active, self-only, +5 percentage points Dodge); Aura of Swiftness (passive, allies within 2 spaces +1 Action Score when rolling Action Score, once per ally per round, not extra movement/actions).
- **Warden**: Restorative Touch (active LifeForce heal, per-success value to be specified); Aura of Renewal (passive, allies within 2 spaces +1 LifeForce regeneration/turn).
- **Arcanist**: Arcane Surge (active, raw Astral Magical attack at one target within 6 spaces, 3 Magical damage per success); Aura of Attunement (passive, allies within 2 spaces +1 Mana regeneration/turn).
- **Adept**: Adaptive Insight (active, temporarily boosts a chosen skill; values pending); Aura of Clarity (passive, allies within 2 spaces gain a noncombat skill-check bonus; value pending).
- Aura-Control is a **Presence** skill concerning pressure and subduing with aura; it does not automatically modify passive Mark auras. Many starting-ability Mana, action, duration and later-Rank values remain undecided. Do not infer them from examples.

## Ability creation, activation and progression (approved design through Q83)

### Checks, costs and slots

1. Activated abilities consume **Mana**, including martial powers. Where a check applies, use the appropriate check: combat skill for an attack, Spellcasting for spells, Aura Control for specific aura powers, and Ritual Casting/Ritual Magic as applicable to ritual summons. Fixed-effect powers need not roll unless an ability explicitly says otherwise. Per-success effects use the rolled number of successes.
2. **Failed activations still consume full Mana**. Mana cost is composed of the ability category's base cost, Ability Rank component, and applicable enhancement modifiers. Category/rank base numbers are **not yet established** in this record.
3. Abilities are permanently upgraded using **Essence**; upgraded abilities cannot freely downcast to a previous Ability Rank. Ability Rank cannot exceed character Rank. Essence spent to purchase/upgrade abilities counts toward character Rank advancement under the approved advancement structure.
4. A purchased ability costs Essence and occupies a purchased-ability slot. **Granted Mark powers do not consume those slots**, including granted signature powers and later milestones.
5. Purchased-ability slots: **Quartz 3, Garnet 4, Amethyst 6**; later Rank slot limits still pending.
6. Newly purchased abilities generally start at Quartz with their Rank-1 EP allocation, unless a separately defined exception applies.

### Enhancement Points (EP)

Each ability earns its own EP as its Ability Rank increases. EP do not move between abilities.

| Ability Rank | EP gained at rank | Cumulative EP |
|---|---:|---:|
| 1 Quartz | 1 | 1 |
| 2 Garnet | 2 | 3 |
| 3 Amethyst | 3 | 6 |
| 4 Topaz | 4 | 10 |
| 5 Opal | 5 | 15 |
| 6 Emerald | 6 | 21 |
| 7 Sapphire | 7 | 28 |
| 8 Ruby | 8 | 36 |
| 9 Diamond | 9 | 45 |
| 10 Astralite | 10 | 55 |

- Enhancements are rank-gated by the **Ability Rank** and have per-ability EP investments.
- Retraining an assigned EP costs **10 Essence for each EP reassigned**. This retraining expenditure **does not** count toward character Rank advancement.

### Damage enhancements and stacking

- **Primary per-success damage enhancement:** sequential, once-only tiers. Each higher tier **replaces**, not adds to, the previous tier's bonus. Earlier EP investment credits the cumulative tier cost. This expressly supersedes earlier repeat-purchase damage-enhancement limits/proposals.

| Ability Rank | Highest-tier primary bonus per success | Cumulative EP | Mana modifier |
|---|---:|---:|---:|
| Quartz | +1 | 1 | +1 |
| Garnet | +2 | 3 | +2 |
| Amethyst | +3 | 5 | +3 |
| Topaz | +4 | 8 | +4 |
| Opal | +5 | 11 | +5 |
| Emerald | +6 | 14 | +6 |
| Sapphire | +7 | 18 | +7 |
| Ruby | +8 | 22 | +8 |
| Diamond | +9 | 27 | +9 |
| Astralite | +10 | 32 | +10 |

- A flat damage bonus is applied **once per successful attack**, not once per success and not multiplied by critical successes. Per-success bonuses multiply by the total attack successes (including applicable crit successes).
- Bonuses from **different named effects** may stack. Duplicate applications of the **same named effect** do not stack.
- Primary upgrades are permanent parts of the ability; they are not toggleable on each cast (see Q105 below).

## Base elements and advanced fusion identities

### Base elemental types

**Fire, Water, Earth, Air, Lightning, Ice, Light, Shadow**.

Opposing pairs that cannot be selected together using *Touched by Element*: **Fire/Water, Lightning/Ice, Light/Shadow, Earth/Air**.

At **Sapphire (Rank 7)**, *Touched by Element* permits **one additional compatible elemental affinity**. At **Diamond (Rank 9)**, the predetermined fusion of the primary element and this additional affinity unlocks automatically. The specific ability applications still require EP investment.

### Approved advanced elements — all 24 non-opposing pairs

| Constituent elements | Advanced element | Identity |
|---|---|---|
| Fire + Earth | **Magma** | molten stone, lava, eruptions, terrain |
| Fire + Air | **Inferno** | concentrated heat, blasts, explosive combustion |
| Fire + Lightning | **Plasma** | ionized energy, arcs, beams |
| Fire + Ice | **Frostfire** | supernatural burning and freezing |
| Fire + Light | **Solar** | radiant solar flame and blinding heat |
| Fire + Shadow | **Shadowflame** | concealed darkness-infused flames |
| Water + Earth | **Mire** | mud, quicksand, unstable terrain, entrapment |
| Water + Air | **Mist** | vapor, concealment, atmospheric moisture |
| Water + Lightning | **Storm** | thunderstorms, charged rain and clouds |
| Water + Ice | **Glacier** | moving ice, frozen barriers, flash-freezing |
| Water + Light | **Purity** | cleansing, purification, restoration |
| Water + Shadow | **Abyss** | lightless depths, crushing pressure, dark currents |
| Earth + Lightning | **Magnetism** | magnetic forces and charged minerals/metals |
| Earth + Ice | **Permafrost** | frozen ground and enduring frost |
| Earth + Light | **Crystal** | luminous crystal, refraction and barriers |
| Earth + Shadow | **Obsidian** | dark crystalline stone, spikes and barriers |
| Air + Lightning | **Thunder** | thunderclaps, sonic shock and charged winds |
| Air + Ice | **Blizzard** | snowstorms and freezing winds |
| Air + Light | **Aurora** | luminous currents and dazzling illusions |
| Air + Shadow | **Shroud** | moving darkness, protective veils and concealment |
| Lightning + Light | **Radiance** | brilliant charged light and radiant fields |
| Lightning + Shadow | **Darkcurrent** | concealed shadow electricity |
| Ice + Light | **Diamondfrost** | luminous reflective crystal ice |
| Ice + Shadow | **Blackfrost** | creeping black ice, heat-draining darkness |

### Elemental damage conversion

- Available beginning **Topaz (Rank 4)**, purchased in stages rather than automatically scaling:
  - Topaz: **25% conversion**, 1 cumulative EP.
  - Opal: **50% conversion**, +2 EP, 3 cumulative.
  - Emerald: **100% conversion**, +3 EP, 6 cumulative.
- Conversion replaces an equal amount of original-type damage with the new type; **total damage is preserved**, with converted fractional damage rounded **down**.
- Percentage is the purchased conversion tier; changes require purchasing the next allowed tier or retraining under the approved 10 Essence/EP rule.
- Conversion and adding a distinct secondary elemental damage component are different effects.

### Additional secondary elemental damage

Available with the Elemental Mark beginning Topaz. Each rank-gated tier is once-only, sequential and replaces the previous bonus.

| Minimum Ability Rank | Added damage per success | Cumulative EP | Mana modifier |
|---|---:|---:|---:|
| Topaz | +1 | 1 | +2 |
| Opal | +2 | 2 | +3 |
| Sapphire | +3 | 3 | +4 |
| Diamond | +4 | 4 | +5 |
| Astralite | +5 | 5 | +6 |

At Emerald and Ruby the earlier bonus remains until the next available upgrade. Secondary elemental type is generally the bound element; the Sapphire additional compatible affinity permits corresponding later design applications.

### Diamond advanced-element enhancements

Eligible existing abilities can evolve with EP purchases; independent newly purchased advanced-element abilities use ordinary Essence and purchased-slot rules.

- **Advanced-Element Damage Conversion Unlock:** 3 EP once, minimum Diamond; lets an eligible ability use its **already purchased** 25/50/100% conversion tier to convert to its unlocked fusion type. When used, adds **+2 Mana**; conversion itself adds **no extra total damage**. The 3 EP are additional to earlier conversion purchases.
- **Advanced-Element Additional Damage:** 6 EP once, minimum Diamond; adds **+5 advanced-element damage per success** as a distinct component, with **+7 Mana** on activation.
- Both advanced enhancements may be acquired on the same eligible ability; their applicable Mana modifiers add.
- Advanced damage types have distinct resistances; do not silently treat Plasma damage as separate Fire and Lightning damage.

## Elemental resistance and damage resolution — Q84–Q92

### Signed resistance calculation

- A positive resistance decreases damage; negative resistance indicates **weakness** and increases damage.
- For a typed component with incoming nonnegative damage `D` and effective resistance `R` (percentage points), damage after resistance is **max(0, floor(D × (1 − R / 100)))**.
- Advanced element resistance uses the signed arithmetic mean of its two base-element resistances: **floor((R_base1 + R_base2) / 2)**, including negative values.
- Each elemental damage component remains separately typed and is rounded down when adjusted.

### Authoritative damage order (revised Q84; Q85–Q86)

Earlier descriptions placing character resistance before the magical shield are **superseded**. Use this order:

1. Determine attack damage, successes, bonuses and distinct damage types, including any conversion.
2. **Magical shield:** apply the shield's **own** relevant resistance to the incoming component; then use its mitigation pool to absorb damage.
3. **Character:** apply personal elemental resistance or weakness to damage that has passed the shield.
4. **Armor:** apply the armor's **own** relevant resistance, if any; then absorb damage from its pool **only for damage types the armor explicitly supports**.
5. Remaining damage reaches **LifeForce**, then **Wounds** under the established health-layer rules.

Armor, shield, and character resistances are distinct; personal resistance does **not** retroactively defend the shield. A resistance-only armor property can adjust damage even if the armor does not support mitigation for that type.

### Q87–Q90 — Armor support and source stacking

- **Q87:** Unsupported damage bypasses armor mitigation completely, without using armor's mitigation pool or durability. Dedicated equipment-damage effects may expressly override this.
- **Q88:** Armor may gain elemental resistance and/or mitigation support from **special materials, enchantments, or both**. Each property must explicitly name the relevant damage type.
- **Q89:** Armor's elemental resistance and its ability to mitigate that element are **independent properties**: an item may provide either, both, or neither. Resistance-only armor applies its reduction without consuming armor mitigation/durability.
- **Q90:** Elemental resistance bonuses from different materials and different named enchantments **add** on the same armor item. Duplicate same-named enchantments do not stack.

### Q91–Q92 — Layer-wise bounds

- **Q91:** Each defensive layer (**magical shield, character, armor**) separately caps positive elemental resistance at **+75%**, unless an explicitly written special ability or equipment property overrides its cap.
- **Q92:** Each layer separately floors negative elemental resistance at **−100%**, unless an explicitly written exception applies. A layer at −100% doubles its typed incoming damage before its mitigation.
- Caps are applied per layer, **not** as a combined cap for a complete attack; sequential reductions can result in far greater combined protection.

## Elemental Resistance Penetration — Q93–Q109 (approved)

### Definition, boundaries, and carry-through

- **Q93:** Penetration is a **flat percentage-point subtraction** from applicable positive elemental resistance, not a proportional percentage discount. Example: 50% resistance with 20-point penetration becomes 30%.
- **Q94:** Penetration stops at **0%**, never induces a weakness, and never makes existing negative resistance worse. At zero or negative resistance, penetration has no further effect.
- **Q95 superseded by Q100–Q101:** An earlier layer-specific-targeting proposal was subsequently replaced by the user's carry-through rule. **Standard penetration is NOT limited to one selected defensive layer.**
- **Q100 (user's Option D):** One element's activated penetration follows its matching damage through shield → character → armor; if damage remains, it applies in **full** independently to each relevant resistance layer. It is not depleted by earlier layers and does not bypass mitigation pools.
- **Q101:** Even when an earlier layer has **no positive resistance**, the same penetration continues to later layers with remaining matching damage.
- **Q102:** A penetration enhancement specifies **one elemental damage type**; it affects that type's components across layers, not unrelated elemental components.
- **Q103:** An ability dealing multiple elements may buy **independent penetration enhancements per element**, each with its own EP progression; Mana modifiers from enhancements activated together add.
- **Q104:** Players can selectively activate purchased penetration enhancements, paying Mana **only** for those chosen.
- **Q105:** This selection privilege is **limited to elemental penetration**. Other purchased enhancements are applied automatically when their conditions are met; permanent primary damage upgrades remain active. Special explicitly defined ability choices are respected.
- **Q106:** Declare activated penetration **before** any attack/ability check, pay its applicable Mana modifier as part of the activation cost, and **do not refund** on a failed check. No retroactive declaration after the roll.
- **Q107:** Penetration follows the **final damage type after elemental conversion**. Converted Fire damage benefits from active Fire Penetration; unchanged Physical damage does not.
- **Q108:** Advanced elements (e.g. Plasma) require **independent advanced-element penetration enhancements**, rather than inheriting penetration for their constituent elements.
- **Q109:** Once the advanced element is available at Diamond, an eligible Diamond-Rank ability may **directly purchase any unlocked advanced-element penetration tier up to Diamond** by paying that tier's **full cumulative EP cost**; all lower tiers count as included. Later upgrades pay only the cumulative cost difference. Astralite unlocks its corresponding upper tier normally.

### Q96–Q99 — Approved penetration enhancement tiers

Each elemental type's penetration on each ability is a **once-only, sequential, rank-gated** enhancement line. Higher tiers replace lower numerical penetration values (do not add). Previously invested EP credit higher-tier costs. Only the highest owned tier's Mana modifier applies **if that element's penetration is activated**.

| Minimum Ability Rank | Penetration (percentage points) | Cumulative EP | Incremental EP | Mana modifier when active |
|---|---:|---:|---:|---:|
| 4 Topaz | 5 | 1 | 1 | +1 |
| 5 Opal | 10 | 2 | 1 | +2 |
| 6 Emerald | 15 | 3 | 1 | +3 |
| 7 Sapphire | 25 | 5 | 2 | +5 |
| 8 Ruby | 35 | 7 | 2 | +7 |
| 9 Diamond | 45 | 10 | 3 | +9 |
| 10 Astralite | 60 | 14 | 4 | +12 |

If Fire and Lightning are both activated at Sapphire with 25-point penetration each, their two independent 5-EP purchases cost a combined **+10 Mana on activation**. They do not combine against the *same* component unless a separate rule expressly provides that behavior.

### Worked example

An ability deals 20 Physical damage and converts 50% to Fire, producing **10 Physical + 10 Fire**. It activates 25-point Fire Penetration. Against a character with +40% Fire resistance, the converted Fire component encounters an **effective +15%** resistance and becomes **floor(10 × 0.85) = 8 Fire** at the character layer. Physical damage receives no Fire Penetration. Shield and armor resistance/mitigation are resolved in their approved order for each surviving component.

## Decisions still open — do not treat as approved

- **Q110–Q114:** Approved below.
- Exact base Mana cost tables, action costs and durations for many active abilities; later-rank slot limits and Mark aura stacking/progression.
- Mechanical details and item statistics for specific armor materials/enchantments. Illustrative examples are not canonical item entries.
- Explicit definitions of penetration sources other than the approved ability enhancement line, and any special exception bypassing layer caps.
- Other topics marked pending in [RULES_DECISIONS.md](RULES_DECISIONS.md).

## Implementation status

**Decisions documented only.** This file makes no change to Foundry scripts, schemas, equipment data, automation or published builds. Treat these rules as approved *design requirements* awaiting implementation, tests, and any unresolved rulings.

## Addendum — Q110–Q114 approved 2026-11-10

- **Q110 — penetration source stacking:** Different **named** sources of elemental resistance penetration stack **additively** on the relevant element. Multiple instances of the same named effect **do not stack**; use the strongest applicable instance. The added penetration applies in full at each defensive resistance layer reached by surviving damage. This extends the existing distinct-name stacking principle.
- **Q111 — no overall penetration cap:** Combined penetration has **no independent numerical ceiling**. However, penetration **never reduces effective resistance below 0%** and never amplifies weakness. Excess points against a particular layer have no further effect there.
- **Q112 — weakness directly changes resistance:** An effect inflicting elemental weakness subtracts its stated **percentage points** directly from the specified defensive layer's elemental resistance. The value may become negative and increases subsequent elemental damage. Standard resistance bounds remain **−100% to +75% per layer**, with explicit special exceptions permitted. Weakness does not inherently bypass mitigation. This is distinct from penetration, which stops at zero.
- **Q113 — weakness source stacking:** Different named elemental weakness effects affecting the same element **and layer** stack **additively**. Duplicate applications of the same named effect do not stack; use the strongest applicable instance. Apply the layer's approved resistance minimum unless explicitly excepted.
- **Q114 — resist weakness with ability-specified attribute save:** After a successful application attack or ability check, the target makes a **defensive attribute save specified by that ability**. A successful save **prevents the weakness entirely**; a failed save allows the **full listed weakness** to apply. This does not, by itself, define the attribute for every weakness power, duration, or later repeat saves. Do not infer a partial-effect success, since Q114 expressly specifies full prevention.

### New near-term design scope

**Prioritize playtest-complete ability enhancements for Quartz (Rank 1), Garnet (Rank 2), and Amethyst (Rank 3) before continuing Rank 4–10 design.** Existing EP allocation is Quartz 1, Garnet +2 (3 cumulative), Amethyst +3 (6 cumulative). Existing primary per-success damage enhancement costs/tiers for these ranks remain as above. Do not implement new mechanics or change code without a later explicit instruction. Higher-rank enhancement design is deferred pending the initial playtest.


## Addendum — Q115–Q155 approved design (2026-11-10)

These approvals continue Q114. This record is **design authority**, not a claim that all mechanics are implemented. Q155: **B** — granted Mark aura ranges use Euclidean straight-line circular distance on the grid. Ordinary physical obstacles do not block them, but explicitly aura-blocking magical barriers do (Q154).

### Q115–Q130 — individual ability Enhancement Points

- **Q115:** Successful attribute save fully negates Elemental Weakness; failure applies the full listed effect.
- **Q116:** Primary LifeForce healing bonus per success: Quartz +1/1 cumulative EP/+1 Mana; Garnet +2/3 EP/+2 Mana; Amethyst +3/5 EP/+3 Mana. Sequential tiers replace earlier tiers.
- **Q117:** Magical shield initial mitigation per success: +2/1 EP/+1 Mana, +4/3 EP/+2 Mana, +6/5 EP/+3 Mana at Quartz/Garnet/Amethyst.
- **Q118:** Eligible general ability durations: ×1.5/1 EP/+1 Mana, ×2/3 EP/+2 Mana, ×3/5 EP/+3 Mana. These do not affect harmful condition duration (Q138); fractional duration rounding remains open.
- **Q119:** Eligible ability range: +1/+2/+4 spaces with 1/3/5 cumulative EP and +1/+2/+3 Mana. Self-only abilities excluded unless explicitly allowed.
- **Q120:** Existing AoE radius: +1/+2/+3 spaces, 1/3/5 cumulative EP, +1/+2/+3 Mana. Does not turn single-target abilities into AoE abilities.
- **Q121:** Additional target unlocks only at **Ability Rank 3**, +1 target for 3 EP/+2 Mana, purchased once for an eligible ability.
- **Q122:** Additional-target effects share one ability roll; resolve accuracy, defenses, and successes separately per target. One activation and Mana cost.
- **Q123:** No generic selective AoE target exclusion enhancement at Ranks 1–3.
- **Q124:** Individual ability accuracy unlocks at Ability Ranks 2/4/6/8/10, +3 percentage points per tier. Garnet first tier costs 2 EP and adds +1 Mana; higher-rank tier costs remain undecided.
- **Q125:** Combat defense penetration unlocks at Amethyst: bypass 5 percentage points of one selected applicable combat defense (Dodge, Parry, Block, or Spell Resistance), 3 EP/+2 Mana, once per ability; defense not reduced below zero.
- **Q126:** Mana efficiency unlocks at Ability Ranks 3/6/9, -10% per tier, each tier +5 EP (5/10/15 cumulative). Applies to total activation cost including modifiers.
- **Q127:** Mana efficiency final cost rounds to nearest whole, half up; minimum 1 Mana.
- **Q128:** Unspent EP remain on their individual ability and may be allocated later; EP do not transfer between abilities.
- **Q129:** Eligible percentage-point non-damaging effect potency unlocks at Ranks 2/4/6/8/10; +3 per tier. Incremental EP 2/4/6/8/10 (cumulative 2/6/12/20/30); highest tier Mana modifier +2/+4/+6/+8/+10. Flat effects require their own enhancement categories.
- **Q130:** Movement ability effects +1/+2/+3 spaces at Quartz/Garnet/Amethyst; cumulative 1/3/5 EP; +1/+2/+3 Mana. Does not permanently change movement or grant actions.

### Q131–Q145 — action economy, resistance and restoration

- **Q131:** Action Score ability-effect enhancement begins at Garnet, +1 for 2 EP/+2 Mana, no new Amethyst tier; does not independently grant actions.
- **Q132:** Universal cooldown reduction unavailable at Ability Ranks 1–3.
- **Q133:** Elemental resistance enhancement tiers at Ability Ranks 3/6/9: +5/+10/+15 percentage points, incremental 3/6/9 EP (cumulative 3/9/18). Rank 3 Mana modifier +2; later modifiers pending. Only improves already-granted elemental resistance; defensive layer +75% cap remains unless explicitly excepted.
- **Q134:** Saving throws against existing protected conditions: Garnet +5 percentage points, 2 EP/+2 Mana, retained at Amethyst.
- **Q135:** Amethyst condition duration reduction: -1 round remaining on an eligible existing harmful condition, 3 EP/+2 Mana.
- **Q136:** Amethyst condition infliction: target -5 percentage points to its applicable condition save, 3 EP/+2 Mana; only for conditions ability already inflicts.
- **Q137:** Amethyst harmful condition duration enhancement: +1 round, 3 EP/+2 Mana.
- **Q138:** General Q118 duration multipliers do not affect harmful condition durations; Q137 is the sole general enhancement to those durations.
- **Q139:** Amethyst cleansing: remove one eligible minor harmful condition on an eligible cleansing ability, 4 EP/+3 Mana. Minor-condition categories remain to be defined.
- **Q140:** No universal activation Action Score cost reduction at Ability Ranks 1–3.
- **Q141:** No universal critical-success enhancement at Ability Ranks 1–3; critical-hit rules unchanged.
- **Q142:** Direct Mana restoration per success +1/+2/+3 at Quartz/Garnet/Amethyst, cumulative 1/3/5 EP, Mana modifier +1/+2/+3.
- **Q143:** Mana restoration cannot target its own caster by default; individual ability may explicitly override.
- **Q144:** LifeForce regeneration enhancement Quartz +1 per turn (1 EP/+1 Mana), retained Garnet, Amethyst +2 per turn (4 cumulative EP/+2 Mana).
- **Q145:** Mana regeneration enhancement begins Garnet: +1 Mana per turn, 2 EP/+2 Mana, retained at Amethyst. For granted Mark auras, apply Q146 cost modifier and zero Mana rule.

### Q146–Q155 — granted Mark auras

- **Q146 revised:** Granted Mark auras, including their natural rank-up features and purchased EP enhancements, **never consume Mana** or require upkeep. Purchased standard EP enhancements on those auras cost **double EP**. The originally proposed purchased-passive upkeep rule is superseded for granted Mark auras; non-granted passives may have individual rules.
- **Q147:** Normal personal EP limits apply to auras even if doubling delays affordability. E.g. Q145 regeneration normally costs 2 EP, but 4 EP on granted Arcanist aura: not affordable with Garnet's cumulative 3 EP; affordable with Amethyst's 6 EP.
- **Q148:** Granted auras can purchase compatible Range, non-damaging Potency, LifeForce Regeneration, Mana Regeneration and Elemental Resistance enhancements. Other types require explicit permission. Double EP costs and zero Mana upkeep apply.
- **Q149:** Granted aura radius follows Q119 range progression, doubled EP costs: +1 space/2 EP (Quartz minimum); +2 spaces/6 cumulative EP (Garnet minimum); +4 spaces/10 cumulative EP (Amethyst minimum). Affordability still governed by accumulated EP (first tier affordable at Garnet, second at Amethyst, third no earlier than Topaz).
- **Q150:** Same named Mark auras do not stack; each recipient uses the strongest applicable instance, including enhancements. Compatible differently named auras may stack.
- **Q151:** Each aura affects its own owner unless individually excluded.
- **Q152:** On owner unconsciousness, base aura and bought enhancements immediately suppress; automatically resume on recovery without Mana/action. Aura ends on death.
- **Q153:** While conscious, stun/paralysis/restraint/immobilization alone do not suppress auras; explicit aura suppression does.
- **Q154:** Ordinary physical walls, closed doors and obstacles do not block an aura. Explicitly aura-blocking magical barriers do.
- **Q155:** Auras use Euclidean straight-line radius measurement (circular distance, not Chebyshev or Manhattan). See Q154 barrier exceptions.

### Initial implementation scope

The Mark Ability tab lists five sections: Mark of Purpose, Mark of Specialty, Mark of Elements, Mark of the Beast, Eldritch Mark. The chosen Mark of Purpose populates with two **granted** starting powers. Every section exposes a **Select Ability** choice dialog with only **Custom** and **Premade** choices (no creation flow yet). Granted abilities expose a **Spend EP** advancement dialog for compatible first-playtest enhancement tiers. Remaining unknown base Mana/action costs, exact potency for some powers, the omitted Concept Mark UI, higher-rank Mark features, additional ability definitions, and actual combat effect application are deferred. Do not assume UI purchase tracking applies enhancement effects in combat.
