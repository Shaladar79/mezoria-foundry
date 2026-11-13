# Mezoria Foundry v2 — Rank 1–3 Enhancement Decisions (Q327–Q439)

> **Approved tabletop design through Q439 (2026-11-13); documentation only.** This document supplements and, where explicitly inconsistent, **supersedes historical values** in `DEFENDER_RANK_1_3_DESIGN.md`, `ABILITY_ELEMENTAL_DECISIONS.md`, and earlier proposals. Do not infer implementation in Foundry. `system.json` stays **0.2.17**. Q440 (Guardian's Intervention Basic Action Score compatibility) was **proposed but not approved**; it is NOT included here as an approval. Continue with Striker ability review next.

## Scope, precedence and guardrails

- Active mechanical/numerical design is limited to **Rank 1 Quartz, Rank 2 Garnet, Rank 3 Amethyst**. Aura advancement, exact AoE shape dimensions, harmful-condition classifications, Rank 4+ numerical mechanics, and unverified historical effects/costs are deferred.
- Granted Mark auras consume neither purchased-ability slots nor ordinary EP; have **no Mana upkeep**; base aura radius begins at **2 spaces at Rank 1** and grows **+1 space at each Rank** (Q328 supersedes the earlier every-other-Rank proposal). Numerical per-Rank aura strength remains deferred.
- Each purchased ability owns its cumulative, bankable EP budget: **1 EP at Rank 1, 3 EP at Rank 2, 6 EP at Rank 3** (incremental gains 1/2/3). EP is neither freely transferable nor automatically spent. Retraining costs **10 Essence per reassigned EP** and does not count toward character advancement.
- **Basic** enhances only an existing numerical effect and must be explicitly listed as compatible with that purchased ability; explicitly approved exceptions remain exceptions. Compatible Basics begin at Quartz. Higher Basic tiers **replace**, rather than stack with, earlier tiers of the same enhancement.
- **Specialized** introduces distinct tactical functionality, or is specifically approved as an exception to the classification guideline. Each purchased ability has **exactly one designer-assigned Specialized option unlocked at Rank 2 and one at Rank 3**. Unlocking only makes the option purchasable; it does not grant it for free. More options begin at Rank 4, but their details are deferred. Shared catalog entries are not purchasable unless assigned to an ability. Unassigned entries stay in the catalog (Q433).
- Standard Specialized repeat-purchase eligibility (Q366): an option first unlocked at Rank N can be purchased again every N character Ranks, where the specific enhancement supports additional tiers. Examples beyond Rank 3 are **scheduling references, not developed mechanics**.
- Different enhancements' activation Mana modifiers add; same-enhancement tier modifiers replace earlier ones. Historical Specialized costs/effects remain as individually approved, not silently standardized.
- Where earlier documents show other EP prices, enhancements, ranks, bonus values or shield effects, use the **later specific Q-number ruling**, not the superseded historical example.

## Standard Basic enhancement catalog (Q330–Q350)

All compatible Basics begin at Quartz and use cumulative tiers:

| Character/ability Rank | Cumulative EP for a Basic | Added activation Mana |
|---|---:|---:|
| 1 Quartz | 1 | +1 |
| 2 Garnet | 2 | +2 |
| 3 Amethyst | 3 | +3 |

Tier effects at Quartz / Garnet / Amethyst:

| Basic enhancement | Rank 1 / Rank 2 / Rank 3 |
|---|---|
| Damage | +1 / +2 / +3 per success |
| Direct LifeForce Healing | +1 / +2 / +3 per success |
| Magical Shield Mitigation | +2 / +4 / +6 mitigation per success |
| Beneficial Duration | +1 / +2 / +3 rounds (not harmful-condition duration) |
| Physical Range | +1 / +2 / +3 spaces |
| Magical Range | +1 / +2 / +4 spaces |
| Existing AoE Radius | +1 / +2 / +3 spaces; line/cone geometry deferred |
| Movement effect distance | +1 / +2 / +3 spaces; no movement-mode creation or permanent speed bonus |
| Direct Mana Restoration | +1 / +2 / +3 per success |
| Existing LifeForce Regeneration | +1 / +2 / +3 per turn |
| Existing Mana Regeneration | +1 / +2 / +3 per turn |
| Accuracy | +3 / +6 / +9 percentage points to eligible **attack** rolls; no automatic-hit/crit-rule changes |
| Non-Damaging Potency | +2 / +4 / +6 percentage points for an eligible existing percentage effect |
| Existing Action Score **bonus** | +1 / +2 / +3; not an activation discount, new action or new bonus |
| Existing Condition Resistance | +5 / +10 / +15 percentage points; no immunity/cleansing |

**Reinforced Interruption** (Q403–Q404) is a further **Basic** enhancement for abilities with an *existing compatible Might-based movement-interruption check*: bonus **+2/+4/+6 percentage points**, cumulative **1/2/3 EP**, **+1/+2/+3 activation Mana**. The earlier Amethyst-only +5 percentage points, 3 EP and +1 Mana version is superseded. Its use does not change opposed checks, size modifiers or reaction mechanics. Basic Accuracy still applies to attack rolls; it is not automatically interchangeable with Reinforced Interruption.

## Shared Specialized enhancement catalog

The eight generally designed entries (Q360–Q391) are:

| Enhancement | Initial Rank | Purchase EP | Added Mana | Approved effect |
|---|---:|---:|---:|---|
| Additional Targets | 2 | 3 | +2 | +1 additional *eligible* target per purchased tier |
| Defense Penetration | 3 | 3 | +2 | −5 percentage points to applicable **combat defense**; not elemental resistance penetration |
| Elemental Resistance | 2 | 3 | +2 | +5 percentage points to existing eligible elemental resistance |
| Mana Efficiency | 3 | 4 | per catalog approval | −10% **total activation Mana**, calculated last, rounded nearest whole Mana half-up, minimum 1 |
| Condition Duration Reduction | 2 | 3 | +2 | −1 round of eligible remaining harmful-condition duration; not full cleansing |
| Condition Infliction | 2 | 3 | +2 | −5 percentage points on target's existing harmful-condition resistance save |
| Harmful Condition Duration | 2 | 3 | +2 | +1 round to existing inflicted harmful condition |
| Condition Cleansing | 2 | 3 | +2 | Remove one eligible minor harmful condition; definition of *minor* is deferred |

**Do not infer an unverified activation-Mana surcharge for Mana Efficiency** from other specialized entries; retain its individually approved 4 EP, 10% cost formula and calculation rules pending verification of any other historical details.

Previously ability-specific entries admitted to reusable Specialized catalog (Q392–Q433):

| Enhancement | Original ability | Rank | EP | Added Mana | Effect / compatibility |
|---|---|---:|---:|---:|---|
| Reinforced Interception | Guardian's Intervention | 2 | 2 | +1 | 3 flat mitigation per purchased tier on interception; approved Magical Shield interaction retained |
| Defensive Protection | Guardian's Intervention | **3** (Q417) | 2 | +1 | +3 applicable Dodge/Parry/Block/Spell Resistance against redirected attack; see Hold the Line-specific trigger below |
| Reactive Interception | Guardian's Intervention | 3 | 3 | +1 | Permits interception of eligible reaction-triggered attacks; **not** assigned to Guardian's Intervention in Ranks 1–3 |
| Reinforced Manifestation | Iron Bastion | 2 | 2 | +1 | +1 Magical Shield mitigation **per success per purchased tier**; explicitly Specialized despite numerical nature (Q424) |
| Sure Footed | Iron Bastion | 3 | 3 | +1 | +5 percentage points to Might saves vs forced movement while relevant shield is active |
| Distracting Challenge | Vanguard's Challenge | 3 | **unverified** | **unverified** | Specialized classification and assignment retained; historical exact effect/costs **not independently verified**, must not invent (Q399, Q432) |
| Countering Readiness | Defensive Readiness | 2 | 2 | +1 | If Defensive Readiness causes attack to miss, +5 percentage points to next eligible attack |
| Unyielding Defense | Defensive Readiness | 3 | 3 | +1 | When incoming attack still hits, 4 **flat mitigation after armor**, before LifeForce |
| Opportunity Attack | Hold the Line | 2 | 2 | +1 | Eligible melee attack accompanies **successful** movement interruption using the **same reaction** |
| Increased Damage Cap | Relentless Assault | 2 | 2 | +1 | +4 to cumulative flat damage cap, raising existing +4 cap to +8; growth stays +2 per follow-up successful hit |
| Killing Momentum | Relentless Assault | 3 | 3 | +1 | Every qualifying finishing blow while active grants immediate movement **up to 2 spaces**, zero extra Action Score/reaction/Mana per trigger; no opportunity attacks or movement-triggered reactions; legal spaces/modes only; +2 spaces for each further purchase eligible every three Ranks; **does not carry damage chain to new target** |
| Protective Challenge | Vanguard's Challenge | 2 | 2 | +1 | On successful challenge, +2 applicable Dodge/Parry/Block/Spell Resistance against challenged enemy for remaining challenge duration, no additional reaction or Mana per attack |

The former **Increased Momentum** (+2-to-+3 per-hit chain growth) was **removed** from active design (after Q405), not retained as an option. No hidden substitution.

### Special case: Defensive Protection reused on Hold the Line (Q418–Q421)

- Hold the Line assigns Defensive Protection at **Rank 3**, same 2 EP / +1 activation Mana and +3 applicable defense as the catalog entry.
- Trigger: successful Hold the Line movement interruption.
- Against **each successfully interrupted enemy**, Defender has +3 applicable Dodge/Parry/Block/Spell Resistance on that enemy's eligible attacks until **beginning of Defender's next turn**. It can apply to multiple attacks; independent interrupted enemies qualify; duplicate instances against same enemy do not stack.
- **No extra reaction** beyond Hold the Line's interruption reaction; both purchased Opportunity Attack and Defensive Protection can operate on the same successful interruption.
- Original Guardian's Intervention redirected-attack-only Defensive Protection behavior is **unchanged**.

## Finalized Rank 2/Rank 3 Specialized assignments

| Purchased ability | Rank 2 — Garnet | Rank 3 — Amethyst |
|---|---|---|
| Guardian's Intervention | Reinforced Interception | Defensive Protection |
| Defensive Readiness | Countering Readiness | Unyielding Defense |
| Hold the Line | Opportunity Attack | Defensive Protection |
| Iron Bastion | Reinforced Manifestation | Sure Footed |
| Vanguard's Challenge | Protective Challenge | Distracting Challenge (details pending historical verification) |
| Relentless Assault (Striker) | Increased Damage Cap | Killing Momentum |

Other approved Specialized catalog entries, including Reactive Interception and Mana Efficiency, are retained without forced assignment.

## Iron Bastion: coexistence of Basic and Specialized mitigation (Q422–Q424)

- Base Iron Bastion Magical Shield = **3 mitigation per success**. Standard Basic Magical Shield Mitigation gives **+2/+4/+6 per success** at Quartz/Garnet/Amethyst. Reinforced Manifestation is a distinct **Specialized exception**, giving **+1 per success per purchased tier**, initial Rank 2 purchase **2 EP / +1 Mana**.
- **The two purchased enhancements stack additively.** Each has its own EP purchase; activation Mana surcharges add.
- Example at Rank 3: base 3 + Basic tier 3 bonus 6 + one Reinforced Manifestation tier 1 = **10 mitigation per success**. EP invested 3+2 = 5 of six available; Mana base 3 + Basic tier3 surcharge3 + Specialized surcharge1 = **7 Mana**.
- Existing shield replacement rule, duration, cooldown and no simultaneous Magical Shields are preserved. Earlier numerical variants in the historical Defender document are superseded by Q397/Q423/Q424.

## Guardian's Intervention — Basic compatibility review through Q439

Base: reaction-based eligible single-target attack redirection to the Defender; **2-space interception distance**, **3 Mana**, **0 Action Score**, **one reaction**, **once per round**; legal adjacent landing space; movement does not provoke movement-triggered reactions. Base redirection and original attack roll adjudication remain intact.

- **Approved Basic Movement** for intercept distance (Q436): +1/+2/+3 spaces, yielding **3/4/5 total interception spaces** at Quartz/Garnet/Amethyst. Standard cumulative 1/2/3 EP and +1/+2/+3 Mana.
- **Basic Physical Range is not assigned** to Guardian's Intervention. Q436 explicitly **superseded** the Q435 assignment of Physical Range with Movement for this ability only; it did not remove Physical Range from the general catalog. No extra movement is granted after interception.
- **No Basic defensive bonus** (Q437) because base ability lacks the effect; Rank 3 Specialized Defensive Protection supplies an eligible defense bonus.
- **No Basic flat damage mitigation** (Q438); Specialized Reinforced Interception supplies interception mitigation.
- **Mana Efficiency stays Specialized**, 4 EP/10% total activation Mana reduction applied last, rounded half-up, minimum1, and **not assigned** to Guardian's Intervention in Ranks 1–3 (Q439).
- **Q440: unapproved** proposal about whether Guardian's Intervention supports Basic Action Score. Do **not** record a rejection or approval by implication; underlying zero Action Score cost is unchanged.

## Other preserved Defender mechanics and review reminders

- Guardian's Intervention: retain intercept restrictions, legal movement, once-per-round reaction, original roll reassessment, and approved Magical Shield interaction. Do not assume historical superseded Range Extension or earlier Defensive Protection numerical tiers are current.
- Defensive Readiness: retain its original activation and reaction rules; Countering Readiness triggers **only if it makes the attack miss**; Unyielding Defense reduces damage **after armor** if the incoming attack still hits.
- Hold the Line: preserve its opposed Might interruption check, relative size modifiers, reaction economy, controlled zone, Opportunity Attack same-reaction attack, and Basic Reinforced Interruption +2/+4/+6 progression.
- Iron Bastion: base 3 shield mitigation per success, **2 Action Score**, **3 Mana**, **3-round base duration**, **2-round cooldown**, existing replacement behavior; Sure Footed adds +5 percentage points on Might saves vs forced movement while active. Basic beneficial Duration may increase only existing duration.
- Vanguard's Challenge: one visible enemy within **3 spaces**, **2 Action Score**, **2 Mana**, **2-round duration**, **2-round cooldown**, **−10 percentage points** to eligible single-target attacks against creatures other than Defender. Protective Challenge purchased: +2 eligible defense only against challenged enemy for remaining duration; +1 activation Mana => **3 Mana before other modifiers**. Distracting Challenge original exact effect/costs remain unverified.
- Relentless Assault: base cumulative flat damage progression **+2 per successful follow-up hit against same target**, cap **+4**. Increased Damage Cap raises cap to **+8** without speeding growth. Killing Momentum enables finishing-blow repositioning but does **not** transfer accumulated damage when changing targets; Accuracy remains Basic; Increased Momentum removed.

## Next design handoff — Striker

User requested: **update GitHub design records first, then move to Striker abilities.** Continue one question at a time, beginning with reviewing the existing Striker ability roster and selecting the next Striker purchased-ability audit. Preserve Relentless Assault's finalized enhancements. Q440 is unresolved, not approved. Do not modify executable code or bump `system.json` while doing this design-documentation update.
