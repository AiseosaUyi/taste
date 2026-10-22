# The Taste Card — A Premium Interactive Field Guide

> **“Taste is knowing what to cut. And signing what’s left.”**  
> *A field guide based on the presentation **“Taste Is the New Skill”** by **Aiseosa Uyi-Idahor** at **Blockfest Africa 2026, Lagos**.*

---

## Overview

As generative AI democratizes the creation of text, interface prototypes, and visuals, production speed ceases to be a competitive advantage. When anyone can generate twenty options in five seconds, the critical differentiator is human judgment: knowing which direction has genuine substance, what to prune without remorse, and what to sign with conviction.

**The Taste Card** is a practical digital field guide designed for founders, product designers, engineering leads, creatives, and investors. It provides an actionable, tactile workflow to apply disciplined aesthetic and strategic judgment to AI-assisted work.

---

## The Four Core Modules

### 1. The Five Taste Principles
1. **01. COLLECT. MIX. NAME.**  
   *Don't accept the first idea. Gather different references, combine them, and identify what makes the strongest one work.*  
   *Question:* What can I combine that hasn't been combined this way before?
2. **02. WRITE FIRST. GO WIDE. CUT HARD.**  
   *Define the idea before prompting. Explore many directions, then remove anything that doesn't strengthen it.*  
   *Question:* What is the idea, without the decoration?
3. **03. PROTECT THREE THINGS.**  
   *Decide what must remain consistent: your colour, your shape and your voice. Let everything else evolve.*  
   *Question:* What must never change, even when everything else does?
4. **04. WRITE ONE TESTABLE SENTENCE.**  
   *Describe the outcome you want without prescribing the solution. Make it specific enough that another person can judge whether you achieved it.*  
   *Question:* Could a stranger tell whether this works?
5. **05. CRITIQUE THE GOAL, NOT THE COLOUR.**  
   *Before polishing the output, check whether it solves the right problem. Better execution cannot rescue the wrong idea.*  
   *Question:* Is this solving the problem, or just looking good?

### 2. Your Monday Brief
*“Complete this before opening your AI tool.”*  
A structured formulation tool using the canonical template:
> **“We want to `[achieve]` for `[audience]` because `[why]`.”**

- Real-time sentence composition and live preview.
- One-click presets for **Founders**, **Designers**, and **Creative Leads**.
- Instant clipboard copy formatted as prompt prefix or system instruction.
- Local persistence so drafts survive browser refreshes.

### 3. What Does Your Product Refuse To Do?
*“Your product, your service, your team, your office. One sentence. Be specific.”*
- Interactive boundary-setting exercise with a 180-character limit.
- Live character meter and curated thought-starters.
- Eliminates synthetic consensus by defining explicit non-negotiables.

### 4. Before You Ship Checklist
*“AI can generate the options. You own the judgment.”*
- Three essential evaluation criteria:
  1. *Does it solve the actual problem?*
  2. *Does it feel distinct from the obvious AI-generated answer?*
  3. *What can I remove without losing the idea?*
- Non-gamified, dignified progress tracking with verification certification.

---

## Visual Design & Craftsmanship

- **Color Palette:** Warm cream archival tone (`#F4F0E8`), vivid international orange (`#F15A24`), deep ink near-black (`#171717`), and warm muted stone rules (`#D8D2C5`, `#78716C`).
- **Typography (Disciplined Two-Family System):**
  - *Archivo (Omnibus-Type):* 19th-century American grotesque heritage for structural headlines, UI labels, body text, and interactive controls. Bold, industrial, unpretentious, and free of AI geometric mannerisms.
  - *Newsreader (Production Type):* Contemporary literary book serif with optical sizing for the core axioms, philosophical reflections, and italic thought prompts.
- **Graphic Language:** Hand-drawn minimal pencil-style SVG diagrams for each principle, subtle offset orange/black drop shadows, and authentic field-notebook stamp seals.
- **Zero Dependencies:** Pure HTML5, CSS3, and modern vanilla JavaScript. No external build steps or heavy node libraries required.

---

## Print & PDF Export

The Taste Card includes a dedicated `@media print` stylesheet optimized for standard A4 and Letter printing:
- Preserves the cream archival background on supported print engines (`print-color-adjust: exact`).
- Strips away all interactive UI chrome, buttons, and floating decks.
- Ensures all cards and sections avoid awkward page breaks (`break-inside: avoid`).
- Seamlessly incorporates the user's completed Monday Brief, declared Refusal statement, and certified Checklist into the printed document.
- Tap **“Print / PDF”** in the top bar or floating deck, or use `Cmd + P` / `Ctrl + P`.

---

## Quick Start / Local Running

You can run the field guide using any standard web server:

### With Node.js (bundled script)
```bash
npm start
# or: node server.js
```
Then visit [http://localhost:3000](http://localhost:3000) in your browser.

### With Python
```bash
python3 -m http.server 3000
```

### Direct Open
Double-click `index.html` or open it in any modern desktop or mobile browser.

---

## Attribution

**Aiseosa Uyi-Idahor**  
Senior Product Designer & Design Engineer  
Blockfest Africa 2026, Lagos

*“AI can generate the options. You own the judgment.”*
