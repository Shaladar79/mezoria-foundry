# Mezoria Foundry v2 — Pinning Shot (Q527–Q561)

> **Approved Rank 1–3 design record (2026-11-14). Documentation only.** Pinning Shot's active design was closed by the user following Q561. Q562 (Basic Reinforced Interruption compatibility) was proposed but **not answered** and is neither approved nor rejected. Other unreviewed Basic categories remain unresolved. This document does **not** implement Foundry features; system version remains **0.2.17**. Q440 remains unapproved. Numerical development beyond Rank 3 and general harmful-condition classifications are deferred.

## Identity and base ability (Q527–Q532, Q538–Q541)

- **Name:** Pinning Shot (user-approved replacement for proposed "Precision Shot").
- **Classification:** **Marksman Precursor**, an organizational tag only; **available to every Striker** via shared Striker ability pool.
- **Attack:** A **normal physical ranged weapon attack**, not a magical ranged attack. Uses **normal weapon damage** with **no additional base Physical damage** (Q541).
- **Activation:** **3 base Mana**, **2 total Action Score** (not additional to a normal attack), **1-round cooldown** using existing cooldown rules.
- **On a successful attack hit:** Target makes an **initial Might resistance check**. Unenhanced Pinning Shot applies **no check modifier**. A successful Might check prevents immobilization; a failed check immobilizes the target.
- **Immobilization:** Target **cannot leave its current space**; attacking, spellcasting and other nonmovement actions remain available subject to existing rules. Duration is **one full combat round**, ending at the **same initiative point in the next round**, unless ended earlier by approved mechanisms. No separate general-condition classification was assigned.

## Rank 2 Specialized: Reinforced Pinning (Q533–Q537)

- **Name:** Reinforced Pinning (Q534); **Rank 2 — Garnet**.
- **Purchase:** **2 EP**, from the cumulative Rank 2 budget of 3 EP.
- **Effect:** Apply **−10 percentage points** to the target's **initial Might resistance check** against Pinning Shot's immobilization. This modifier does **not** affect escape checks.
- **Mana surcharge:** **+1 Mana**.
- **Activation:** **Mandatory and automatic once purchased** on every Pinning Shot; cannot be toggled off or downgraded to save Mana. Thus Pinning Shot with Reinforced Pinning costs **4 Mana**, before other purchased enhancement surcharges.
- Does not modify duration, base weapon damage or the target's escape check.

## Rank 3 Specialized: Suppressing Shot (Q542–Q546)

- **Name:** Suppressing Shot; **Rank 3 — Amethyst**.
- **Purchase:** **3 EP**, from the cumulative Rank 3 budget of 6 EP.
- **Effect:** The target suffers **−10 percentage points to attack accuracy** **while immobilized by the applying Pinning Shot**, with **no independent duration**. The penalty reduces relevant attack roll-under thresholds; it does not by itself prohibit attacks or spellcasting.
- **Mana surcharge:** **+2 Mana**, **optional**, declared and paid **before the attack roll**. Cost is spent on a miss or if the target passes the initial Might resistance check, even when no penalty is produced.
- Reinforced Pinning stays mandatory if already purchased; Suppressing Shot can be activated or omitted independently.

## Ending the immobilization and suppression (Q547–Q551)

- **Normal expiration:** one full round from the qualifying application, at the same initiative point in the following round.
- **Early escape:** An immobilized target may spend **2 Action Score per attempt** to make a **normal unmodified Might escape check**. **Success ends immobilization immediately**; **failure leaves it in effect**, with the 2 Action Score still spent. **Unlimited attempts** subject to available Action Score, and **no escalating retry penalty**.
- **Reinforced Pinning's −10 percentage-point penalty applies ONLY to the initial Might resistance**, never the later Might escape attempts.
- **Forced movement:** A successful forced-movement effect can displace the target using its own existing rules. **Actual displacement from the pinned space immediately ends immobilization**, along with any Suppressing Shot penalty tied to it. If displacement fails, the existing pin remains. No separate forced-movement resistance check or distance adjustment is introduced by Pinning Shot.
- Termination of immobilization by successful escape, successful forced displacement, or expiration terminates the linked suppression penalty, even if it would otherwise have time remaining.

## Multiple Pinning Shot and Suppressing Shot applications (Q552–Q554)

- **Pinning Shot reapplication (Q552):** A new Pinning Shot must **hit** and cause **failed applicable initial Might resistance** to refresh immobilization. On qualifying reapplication, immobilization refreshes to **one full combat round from the new hit**; durations **never stack additively**. A failed reapplication leaves the existing immobilization unchanged.
- **Reapplication without Suppressing Shot (Q553):** Qualifying new Pinning Shot may refresh immobilization, but a **previous Suppressing Shot penalty retains its original expiration**. The original penalty cannot be extended for free. Even when the pin is refreshed, suppression ends at its own original expiration (or earlier if immobilization ends).
- **Reapplication with Suppressing Shot (Q554):** Only **one −10-percentage-point attack accuracy penalty** from Suppressing Shot applies. Successful qualifying suppressed reapplication **refreshes the suppression expiration** to correspond to the new immobilization expiration. Penalties **do not stack** (two uses never produce −20 percentage points). A failed reapplication does not grant a new suppression effect.
- No other independent stacking rules have been inferred or approved.

## Basic enhancement compatibility (Q555–Q561)

| Basic enhancement | Status / effect |
|---|---|
| **Basic Damage** | **Incompatible** (Q555): normal physical weapon damage exists, but the base ability has no intrinsic bonus Physical damage for Basic Damage to increase |
| **Basic Accuracy** | **Compatible** (Q556): +3/+6/+9 percentage points to **ranged attack roll** at Quartz/Garnet/Amethyst; it does not modify Might resistance |
| **Basic Accuracy activation** | **Always active at purchased tier**, mandatory Mana surcharge, cannot disable or downgrade (Q557) |
| **Basic Non-Damaging Potency** | **Incompatible** (Q558); cannot enlarge the two Specialized penalties |
| **Basic Action Score** | **Incompatible** (Q559); the 2 total Action Score activation cost is not a positive Action Score effect |
| **Basic Physical Range** | **Compatible** (Q560): +1/+2/+3 spaces at Quartz/Garnet/Amethyst |
| **Basic Physical Range activation** | **Always active at purchased tier**, mandatory Mana surcharge even when extra range is unnecessary; cannot disable or downgrade (Q561) |
| **Basic Beneficial Duration** | Cannot automatically extend harmful immobilization under the existing beneficial-duration rule; no separate exception approved |
| **Basic Reinforced Interruption** | **Q562 explicitly unanswered**; neither compatible nor incompatible has been approved |
| **Other unreviewed Basics** | **Open**, not implicitly approved or rejected |

For **each** compatible Basic Accuracy and Basic Physical Range, the approved cumulative per-tier purchase and activation values are:

| Rank | Cumulative EP per Basic | Added Mana per Basic | Accuracy | Physical Range |
|---|---:|---:|---:|---:|
| Rank 1 — Quartz | 1 | +1 | +3 percentage points | +1 space |
| Rank 2 — Garnet | 2 | +2 | +6 percentage points | +2 spaces |
| Rank 3 — Amethyst | 3 | +3 | +9 percentage points | +3 spaces |

Purchased tiers **replace**, rather than add to, earlier tiers. Mandatory costs from multiple purchased Basics and Reinforced Pinning add together; Suppressing Shot adds its surcharge only when separately selected.

## Costs and EP examples

- **Base:** 3 Mana, 2 total Action Score, 1-round cooldown.
- **Reinforced Pinning only:** 4 Mana.
- **Suppressing Shot selected, Reinforced Pinning not purchased:** 5 Mana.
- **Both Specialized purchased, Suppressing Shot not selected:** 4 Mana.
- **Both Specialized purchased, Suppressing Shot selected:** 6 Mana.
- Add any mandatory Basic Accuracy and Physical Range Mana surcharges in all cases.
- Cumulative EP budget per purchased ability: **1 at Rank 1, 3 at Rank 2, 6 at Rank 3**. Reinforced Pinning (2 EP) + Suppressing Shot (3 EP) = **5/6 EP**, leaving 1 EP available for an eligible Basic tier or banking. Spending on one enhancement does not give another enhancement for free.

## Preservation and scope

- **Pinning Shot active Rank 1–3 design is closed by user request**, with Q562 and other unreviewed Basic compatibility decisions explicitly open. Do not treat closing the design as voting for Q562.
- **Siphoning Strike's** unfinished Basic compatibility (including Basic Duration) remains open.
- **Guardian's Intervention Q440 Basic Action Score compatibility** remains **unapproved**.
- **Relentless Assault**, **Overwhelming Assault** (including Shattering Blow, Deep Wound and Bleeding treatment), and **Siphoning Strike** (including Vitae Barrier and Greater Siphon) remain unchanged.
- No new equipment mechanics, universal conditions, general forced-movement rules, or Rank 4+ numerical effects are introduced.
- **Documentation only; Foundry code, game data and system version 0.2.17 remain untouched.**
