# Defender — Rank 1–3 ability design record (approved through Q302)

> Mezoria Foundry v2, design-only. These are **approved tabletop rules**, not implemented Foundry combat mechanics. The `system.json` version remains **0.2.17**. Rank 4–10 functionality and unresolved costs are explicitly deferred. This record continues [Ability and Elemental Decisions](ABILITY_ELEMENTAL_DECISIONS.md) (Q1–Q155) and does not replace other foundational rules.

## Scope and roster

- **Mark of Purpose:** Defender. **Rank 2 specializations:** Guardian, Bulwark, Vanguard.
- **Granted Quartz powers (existing foundation):** **Guardian's Stand** (active; self-only +5 percentage points Parry) and **Unyielding Resolve** (passive aura; allies within 2 spaces +2 percentage points to applicable Dodge, Parry, Block, Spell Resistance). These are granted Mark powers, **not** purchased generic/specialization abilities.
- **Purchased specialization premades:** **Guardian's Intervention** (Guardian), **Iron Bastion** (Bulwark), **Vanguard's Challenge** (Vanguard).
- **Purchased generic Defender premades (available to all three specializations):** **Defensive Readiness** and **Hold the Line**.
- Initial playable scope: **Quartz (Rank 1), Garnet (Rank 2), Amethyst (Rank 3)** only. Higher-rank ideas are kept as design references, not playtest requirements.

## Shared combat/EP foundation

- Rank 1–2: **1** shared reaction per combat round; Rank 3–4: **2**; Rank 5–6: **3**; Rank 7–8: **4**; Rank 9–10: **5**. Refresh at the **beginning of each combat round**; unused reactions do not carry over. Reaction abilities normally cost **0 Action Score**.
- Ability-specific, **cumulative** enhancement EP pool: Rank 1 **1 EP**, Rank 2 **3 EP**, Rank 3 **6 EP**. EP belongs to the purchased ability; higher tiers replace lower tiers, rather than stacking tier costs or bonuses.
- Add the currently purchased enhancement tiers' **additional activation Mana** to the ability's base Mana. Enhancements do not automatically unlock merely by reaching a rank.
- Relevant damage order: **Resistance → Magical Shield → Armor → LifeForce → Wounds**.
- Natural 01–05 automatically hits; critical success bonus is normally +3 successes. Defense modifiers can reduce successes but cannot turn a natural auto-hit into a miss. At final attack TN ≤5%, the natural auto-hit gives only 1 success, without the critical bonus.

## Guardian specialization — Guardian's Intervention (Q156–Q175 and relevant prior approvals)

- Purchasable at Rank 1. Reaction intercepting a **single-target** attack against an ally within **2 spaces**, following the enemy's attack roll but before damage.
- The Guardian instantly travels by a legal, unobstructed route to an available space adjacent to the ally and becomes the target; no movement-triggered opportunity attacks. Reassess the **original attack roll** against the Guardian's defenses (including critical results).
- Base **3 Mana**, **1 shared reaction**, **0 Action Score**; at most once per round. Only legal redirections can be performed.
- **Range Extension** purchased tiers: +1/+2/+4 spaces, **1/3/5 cumulative EP**, **+1/+2/+3 activation Mana**.
- **Defensive Protection:** +5/+10/+15 percentage points to the applicable defense against the intercepted attack, **1/3/5 cumulative EP**, **+1/+2/+3 Mana**.
- **Reinforced Interception** (Rank 2): 3 flat mitigation from a separate temporary interception shield against the redirected attack (resolved before ordinary magical shields); **2 EP**, **+1 Mana**.
- **Reactive Interception** (Rank 3): can intercept reaction-generated single-target attacks; **3 EP**, **+1 Mana**.
- Retain all restrictions and order of operations recorded in earlier Defender decisions; do not assume the separate shield is a permanent shield.

## Bulwark specialization — Iron Bastion (Q176–Q190)

- Purchasable Rank 1; active self-only magical shield generated with an **Endurance percentile activation roll**: **3 shield mitigation per success**. Covers physical and magical damage.
- Activation **2 Action Score, 3 Mana**; base duration **3 rounds**. **2-round cooldown begins immediately at activation**, even after a failed activation; spent costs remain spent. Recasting once permitted replaces the old shield, discarding its remaining mitigation.
- Shield persists if the Bulwark is unconscious and follows them when forcibly moved. Existing global **one magical shield at a time** rule applies.
- **Generic shield potency:** +2/+4/+6 additional mitigation **per success**, **1/3/5 cumulative EP**, **+1/+2/+3 Mana**.
- **Duration extension:** additive +1/+2/+3 rounds, **1/3/5 cumulative EP**, **+1/+2/+3 Mana**; supersedes earlier multiplicative proposal.
- **Reinforced Manifestation** (Rank 2): +5 **flat** mitigation on shield creation, **2 EP**, **+2 Mana**.
- **Sure Footed** (Rank 3): +5 percentage points to Might saves resisting forced movement while shield is active, **3 EP**, **+1 Mana**. Future possible tiers are deferred.

## Vanguard specialization — Vanguard's Challenge (Q191–Q232)

- Purchasable Rank 1; supernatural Mark effect, not mind control, does not require speech, gesture, shared language, or target intelligence.
- Activation **Presence percentile roll**, **2 Action Score, 2 Mana**, against **one visible enemy within 3 spaces**, no target resistance save. Base duration **2 rounds**; **2-round cooldown starts immediately**, including failed activations (costs still consumed). An attempted activation reveals the Vanguard's location to its target even if activation fails.
- While challenged, target takes **−10 percentage points to its attack TN** when making an eligible **single-target** attack against someone other than the originating Vanguard. Applies to reaction/opportunity attacks, not area attacks; evaluate the final target after redirection.
- Challenge remains after range or line of sight is lost. Multiple separate enemies may be challenged; multiple Vanguards' same-named challenge penalties do **not** stack on the same enemy (strongest applies). A challenged enemy may attack **any of its challenging Vanguards** without this penalty. Different named accuracy penalties can stack; positive accuracy modifiers offset them.
- No independent attack-penalty cap. Natural 01–05 auto-hit remains, with no critical bonus if final TN ≤5%.
- Challenge survives the challenged enemy's temporary incapacity but ends on their defeat, on originating Vanguard's unconsciousness, or at end of combat. Voluntary dismissal is free on own turn without refunds/cooldown reset. Ordinary dispels do not remove a Mark challenge; expressly Mark-specific suppression/dispels can. Summons and familiars can be separate targets.
- **Extended Challenge:** additive +1/+2/+3 rounds, **1/3/5 cumulative EP**, **+1/+2/+3 Mana**.
- **Extended Range:** +1/+2/+4 spaces to **activation range**, **1/3/5 cumulative EP**, **+1/+2/+3 Mana**.
- **Challenge Potency** (Rank 2): additional −5 percentage points to eligible enemy attack TN (total −15%), **2 EP**, **+1 Mana**. Later ranks 4/6/8/10 deferred.
- **Distracting Challenge** (Rank 3): −2 to the relevant target defense (Dodge/Parry/Block/Spell Resistance, minimum 0) when the originating Vanguard attacks the challenged enemy, **3 EP**, **+1 Mana**.

## Generic Defender — Defensive Readiness (Q233–Q260)

- Purchasable Rank 1 by all Defender specializations. **Reaction**, self only, activated **after enemy attack roll but before outcome resolution** against an eligible **single-target attack targeting this Defender**. Requires consciousness, ability to react, sufficient Mana, and awareness of the incoming attack through any valid sense; seeing the attacker is **not** mandatory. Completely undetected attacks are ineligible.
- Base **2 Mana**, **1 shared reaction**, **0 Action Score**, **no activation roll**, **no cooldown**. Adds **+3 to an otherwise eligible defense** (Dodge, Parry, Block, Spell Resistance) for that attack only. No creation of an ineligible defense. Area-effect attacks excluded.
- Maximum **one Defensive Readiness activation per incoming attack**; may activate against separate attacks with remaining reactions/Mana. Differently named eligible defensive reactions may be combined by paying each separately. Redirected single-target attacks (e.g., via Guardian's Intervention) are eligible after redirection, if reactions remain.
- Against natural critical 01–05, defense increases normally and can reduce resulting successes but **does not negate automatic hit**.
- Restraint/immobilization alone does not bar activation if character can still react and legally use that defense. Conditions that prohibit reactions and unconsciousness do bar activation.
- **Defensive Reinforcement**: +1/+2/+3 extra defense (total +4/+5/+6), **1/3/5 cumulative EP**, **+1/+2/+3 additional Mana**.
- **Countering Readiness** (Rank 2): only triggers if Defensive Readiness **turns an otherwise successful attack into a miss**. Grants **+5 percentage points** to the next attack roll against that triggering enemy, expires end of Defender's **next turn**. **2 EP**, **+1 Mana**. Each successful trigger against the same enemy stacks +5 without independent numerical cap; bonuses against different enemies are tracked separately. The accumulated bonus against one enemy is entirely consumed on the **first eligible attack attempt**, whether hit or miss; no extra attack granted.
- **Unyielding Defense** (Rank 3): if attack **still hits** after Defensive Readiness, reduce the triggering attack's remaining damage by **4 after Armor and before LifeForce**. One attack only, not a magical shield, doesn't protect shield/armor pools; unused reduction lost. **3 EP**, **+1 Mana**.
- Example complete 6-EP allocation at Amethyst: Quartz Defensive Reinforcement (1), Countering Readiness (2), Unyielding Defense (3), yielding +4 defense and 5 Mana activation cost.

## Generic Defender — Hold the Line (Q261–Q296)

- Purchasable by all Defender specializations. **Active defensive stance**, costing **2 Action Score + 3 base Mana**. Creates a **stationary, three-dimensional 2-space-radius zone** centered on the Defender's position for **3 combat rounds**.
- **Activation or reactivation at most once per combat round**, no additional multi-round cooldown. Reactivation pays full costs and **replaces** the one existing zone, refreshing duration. It does not refresh reactions.
- **Voluntarily leaving** original defended position ends stance. Forced movement permits applicable **Might save** to resist displacement; **actual displacement** ends stance. A standing Defender's eligible bonuses to saves against forced movement remain applicable.
- **Trigger:** enemy physical movement **into or within** zone, including forced movement and flying. **Teleportation** into/out of zone bypasses interruption/opportunity attack; subsequent physical movement may trigger.
- **Interruption:** Defender **Might opposed check** against enemy **Might or Prowess**, as appropriate to resistance method. **1 shared reaction per attempt**; **one interruption attempt per enemy per enemy turn**, while reactions remain. Success stops movement; failure permits it to continue. On successful interruption of **forced** movement, immediately cancel **all remaining movement from that effect**.
- **Creature size:** no absolute size cap. Enemy's Might/Prowess TN adjusts **+10 percentage points per size category larger than Defender** or **−10 per category smaller**. Same size 0; affects interruption opposition, not attack roll.
- **Airborne interruption:** three-dimensional zone applies to fliers. Hover-capable creatures maintain altitude; continuous-flight/gliding creatures follow their own established flying/falling/descent rules after their movement is halted.
- **Extended Perimeter** (Rank 1/2/3): +1/+2/+3 radius (total 3/4/5 spaces, in 3D), **1/3/5 cumulative EP**, **+1/+2/+3 additional activation Mana**. Does not extend melee weapon reach.
- **Extended Vigil** (Rank 1/2/3): additive +1/+2/+3 rounds (total 4/5/6), **1/3/5 cumulative EP**, **+1/+2/+3 additional Mana**. Does not circumvent movement/stance ending rules.
- **Opportunity Attack enhancement** (Rank 2): **2 EP**, **+1 activation Mana** (4 total if alone). On enemy's physical **entry** into the defended zone (including forced movement; not teleportation), allows a **normal melee weapon opportunity attack only within the equipped weapon's actual reach**. If enemy enters zone out of reach, can resolve when it **first subsequently enters weapon reach**. Movement wholly within zone does not alone establish an additional opportunity attack. Maximum **one such opportunity attack per enemy per enemy turn**, including leave/reentry. The opportunity attack and Might interruption form **one combined defensive response costing one shared reaction**, not two; resolve **interruption first, attack second**, and attack remains available whether the interruption succeeds or fails, subject to reach/trigger. Rank 2+ zones are not themselves a reach increase.
- Combined response edge cases involving a base interruption attempted early and a later eligible entry into weapon reach should be interpreted without granting duplicate reactions/attacks; any remaining precise event-window/trigger sequencing is for playtest adjudication rather than assumed new mechanics.

## Reinforced Interruption (Q297–Q302): approved Rank 3, higher tiers deferred

- **Rank 3 — Amethyst:** **3 EP**, **+1 additional activation Mana**, **+5 percentage points to Defender's Might target number** during Hold the Line movement interruption. Does not award automatic successes or alter the enemy's size modifier.
- Future design **tier unlocks at Ranks 6 and 9**, with tentative **total** bonuses approved as **+10 and +15 percentage points**, respectively. **Higher-tier EP and Mana costs have NOT been approved**; Q303 (proposed higher-rank EP costs) was not answered. These ranks are **outside the Rank 1–3 playtest scope**. Do not implement or invent those costs.
- Example Rank 3 allocation: Reinforced Interruption (3 EP), Opportunity Attack (2 EP), Quartz Extended Perimeter (1 EP) = **6 EP**, **6 total activation Mana**, **3-space radius** and **+5 percentage-point interruption modifier**.

## Defender roster — review before Striker

| Category | Ability | Rank 1–3 design |
|---|---|---|
| Granted active | Guardian's Stand | Earlier foundation documented; check specific activation/cost details before implementation |
| Granted passive | Unyielding Resolve | Earlier foundation documented; no Mana aura upkeep |
| Guardian specialization | Guardian's Intervention | Rank 1–3 designed |
| Bulwark specialization | Iron Bastion | Rank 1–3 designed |
| Vanguard specialization | Vanguard's Challenge | Rank 1–3 designed |
| Generic purchased | Defensive Readiness | Rank 1–3 designed |
| Generic purchased | Hold the Line | Rank 1–3 designed |

### Playtest and implementation cautions

1. **Design record ≠ executable system.** Keep current runtime and `system.json` at v0.2.17; Foundry has not been verified to apply these purchased ability effects automatically.
2. Existing granted starting active/passive powers have older, separate design records; validate their complete costs and effects before building runtime content.
3. **Q303+ higher-rank EP decisions deferred**, not silently approved.
4. Preserve distinctions among purchased generic abilities, specialization premades, and granted Mark powers.
5. Move next to **Striker** design (existing specializations: Ravager, Reaver, Marksman), focusing on Rank 1–3 playtest only.
