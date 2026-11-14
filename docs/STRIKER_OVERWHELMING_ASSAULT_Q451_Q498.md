# Mezoria Foundry v2 — Overwhelming Assault (Q451–Q498)

> **Approved design record, 2026-11-14. Documentation only; not implemented Foundry code.** Canonical name **Overwhelming Assault** (the occasional informal name "Overwhelming Strike" does not rename the ability). It is a **Generic Striker** purchased ability, **not** a Ravager precursor. Only Rank 1 Quartz, Rank 2 Garnet and Rank 3 Amethyst numerical design is covered. The Basic compatibility audit was closed by Q498. All prior decisions, Relentless Assault, and unapproved Q440 remain unaffected. Foundry system version **0.2.17** is unchanged.

## Ability identity and base mechanics (Q451–Q456)

- **Name:** Overwhelming Assault.
- **Category:** **Generic Striker**; available to Strikers independent of specialization.
- **Delivery:** **One normal melee attack against a single target**.
- **Base bonus:** **+4 Physical damage per attack success**. This is **per success on the current attack**, not a cumulative damage chain.
- **Activation cost:** **4 Mana**, **3 total Action Score** (not +3 above a normal attack).
- **Cooldown:** **1 round**, following already established cooldown timing.
- **Damage processing:** Standard Resistance → Magical Shield → Armor → LifeForce → Wounds sequence except for the explicitly defined Specialized effects below.

## Basic enhancement compatibility and costs (Q457–Q466; Q496; audit closed Q498)

Compatible purchased Basics: **Basic Damage** and **Basic Accuracy** only. Both are **automatically and mandatorily active** at the purchased tier for every Overwhelming Assault activation; their purchased-tier Mana surcharges are mandatory. Players cannot toggle them off or activate a lower tier to reduce Mana.

| Rank / tier | Basic Damage: added Physical per attack success | Overwhelming Assault Physical bonus per success with Basic Damage | Basic Accuracy added to initiating attack TN | Cumulative EP **each** | Added Mana **each** |
|---|---:|---:|---:|---:|---:|
| Rank 1 Quartz | +1 | +5 | +3 percentage points | 1 | +1 |
| Rank 2 Garnet | +2 | +6 | +6 percentage points | 2 | +2 |
| Rank 3 Amethyst | +3 | +7 | +9 percentage points | 3 | +3 |

Each tier replaces the preceding tier of the same enhancement, rather than adding it. Compatible Damage and Accuracy purchases are independent, and their EP and Mana costs add.

Explicitly incompatible or unassigned Basic categories:

- **Basic Non-Damaging Potency (Q459):** incompatible; no preexisting eligible numerical non-damage component.
- **Basic Action Score (Q461):** incompatible; activation has a cost, not a positive Action Score effect.
- **Basic Duration (Q462):** incompatible; one instantaneous attack; a cooldown is not beneficial duration.
- **Basic Physical Range and Magical Range (Q449, Q463):** not assigned / incompatible for this melee ability.
- **Basic Movement (Q464):** incompatible; no intrinsic movement. This does not alter Relentless Assault's Killing Momentum.
- **Basic Area-of-Effect Radius (Q465):** incompatible; single-target attack.
- **Basic Condition Resistance (Q466):** incompatible; no existing resistance effect.
- Other Basic compatibility exclusions remain as previously decided; closing the audit (Q498) does **not** introduce new compatible Basics.
- **Defense Penetration (Q460)** remains a **Specialized enhancement in the shared catalog**, *not assigned* to Overwhelming Assault. Existing catalog reference: first eligible Rank 3, 3 EP +2 Mana, -5 percentage points to applicable combat defense; this entry is **not purchased for Overwhelming Assault**.

## Rank 2 Specialized: Shattering Blow (Q467–Q472)

- **Rank 2 Garnet**, **2 EP to purchase**, **+1 Mana if activated**.
- When selected, deal **+2 extra armor-only damage per attack success**.
- Respect normal initial Resistance and Magical Shield mitigation; **do not bypass Magical Shields**.
- Apply the extra armor-only damage **first on reaching the Armor mitigation layer**, before the attack's normal damage is applied to the remaining Armor pool.
- Armor-only bonus may reduce the Armor pool but **cannot directly damage LifeForce or Wounds**. Any excess armor-only bonus beyond the remaining Armor pool is discarded. It does **not directly damage armor durability**; the system's existing durability-loss mechanism applies normally.
- Example approved in Q470: Armor pool 10, 8 normal attack damage remaining after prior layers, 3 attack successes → 6 additional armor-only damage; Armor drops to 4; normal 8 damage then removes 4 Armor and **overflows 4 to LifeForce** (with normal further rules).

## Rank 3 Specialized: Deep Wound (Q467; Q473–Q495)

- **Rank 3 Amethyst**, **3 EP to purchase**, **+2 Mana if activated**.
- A selected Deep Wound applies a distinct **Bleeding** ongoing effect **automatically**, without an additional Endurance save or resistance check, **only if the initiating Overwhelming Assault deals at least 1 actual LifeForce damage** after Resistance, Magical Shield and Armor.
- Shattering Blow's armor-only bonus never independently satisfies this LifeForce-damage prerequisite.
- **Bleeding damage each tick:** **1 direct LifeForce damage per initiating attack success**, frozen from the applying attack. Example 4 successes → 4 damage per tick.
- **Tick timing:** At the **beginning of each combat round**. No immediate tick on application; first tick is at the beginning of the **next** combat round.
- **Duration:** **Two scheduled damage ticks**, then expires unless earlier removed. Successful reapplication refreshes to **two scheduled ticks**.
- **Deep Wound-specific exception:** Its Bleeding tick damage **bypasses Resistance, Magical Shield and Armor**, going **directly to LifeForce**; damage beyond LifeForce uses the **normal Wound overflow** rules. This does **not** set a general rule for other Bleeding, damage-over-time or condition effects. Deep Wound's Bleeding is separate from the game's existing Wound and Bleeding-to-Death states.
- **Stacking:** Only **one strongest instance**; when reapplying, keep the larger *per-tick damage*, never add instances. **Every successful qualifying reapplication** (stronger, equal, or weaker) refreshes the two-tick duration.
- **Early removal:** Successful trained **Medicine** treatment, an **eligible Condition Cleansing** effect (specific eligibility still deferred), or enough **actual magical LifeForce healing** within a **single combat round** to equal or exceed the current Bleeding per-tick damage. Multiple healing spells and casters can contribute to this same-round total. Only LifeForce **actually restored**, not overhealing, counts. Once threshold is met, Bleeding ends immediately. Stopping Bleeding does not independently restore lost LifeForce or remove existing Wounds.

### Medicine treatment details (Q484–Q492)

- **Skill:** Medicine, **trained-only**.
- **Action Score cost:** **2 per attempt**.
- **Check:** Normal roll-under Medicine check, with **−2 percentage points to Medicine TN for every point of the active Bleeding's damage per tick**.
- **Medical equipment:** Treatment without supplies is allowed. A **+10 percentage-point** TN bonus requires **both** a **reusable medical kit** and suitable **consumable bandages/dressings**. Neither alone grants the +10 bonus.
- **Consumption:** **One consumable use** is expended **on every treatment attempt receiving the equipment bonus**, whether the check succeeds or fails. Reusable medical kit is not consumed.
- **Retries:** Unlimited failed-treatment retries, each with normal **2 Action Score**, check penalty and (if using the +10 bonus) another consumable use. **No extra retry penalty**. Still subject to normal action economy.
- **Successful treatment:** Removes Bleeding immediately and prevents future ticks; does not on its own heal LifeForce or remove Wounds.
- **Not decided:** Medical kit capacity, refill rules, prices/crafting, detailed cleansing eligibility or wider condition classifications.

## Activation sequence, optional Specialized selection (Q495–Q497)

- Purchased **Basic Damage and Accuracy** are **always on** at purchased tiers, with mandatory Mana surcharges.
- Purchased **Shattering Blow and Deep Wound** are **individually optional**. Player may select neither, one, or both for a given Overwhelming Assault.
- **Declare selections and pay all applicable Mana before the attack roll**; Mana remains spent on misses, or if Deep Wound's LifeForce prerequisite is not met.
- Example activation sequence: declare single target and selected Specialized effects → pay base 4 Mana + mandatory Basics + chosen Specialized surcharge(s) → make attack using approved Accuracy → apply standard damage with Shattering Blow's bonus at its designated Armor stage → only when selected and at least 1 actual LifeForce damage was inflicted, apply Deep Wound Bleeding.

### Activation Mana costs (excluding mandatory purchased Basic surcharges)

| Selected Specialized enhancements | Mana |
|---|---:|
| Neither | 4 |
| Shattering Blow only | 5 |
| Deep Wound only | 6 |
| Both | 7 |

Every activation costs **3 total Action Score** and observes the **1-round cooldown**.

## EP accounting and scope

The ability's EP budget is **cumulative 1 at Rank 1, 3 at Rank 2, 6 at Rank 3**. **Shattering Blow (2 EP) + Deep Wound (3 EP) = 5 of 6 cumulative EP** at Rank 3, leaving 1 EP available for a compatible Basic tier or banking. EP spent on one Basic cannot be silently reused for another; EP costs and Mana costs add.

- Q498 closed the Rank 1–3 Basic compatibility audit for Overwhelming Assault.
- **Relentless Assault** remains unchanged, including its Ravager Precursor identity and its independently approved effects.
- **Q440 Guardian's Intervention Basic Action Score compatibility remains unapproved**.
- Further Rank 4+ numerical mechanics, general harmful-condition classifications, and unrelated rules are deferred.
- **No Foundry system implementation or version change** is implied by this documentation record.
