/**
 * The Taste Card — Interactive Field Guide Logic
 * Aiseosa Uyi-Idahor · Blockfest Africa 2026, Lagos
 */

(function () {
  'use strict';

  // --- Storage Keys ---
  const STORAGE_KEY_PREFIX = 'taste_card_';
  const KEYS = {
    PRACTITIONER: STORAGE_KEY_PREFIX + 'practitioner',
    BRIEF_ACHIEVE: STORAGE_KEY_PREFIX + 'brief_achieve',
    BRIEF_AUDIENCE: STORAGE_KEY_PREFIX + 'brief_audience',
    BRIEF_WHY: STORAGE_KEY_PREFIX + 'brief_why',
    REFUSAL: STORAGE_KEY_PREFIX + 'refusal',
    CHECK_1: STORAGE_KEY_PREFIX + 'check_1',
    CHECK_2: STORAGE_KEY_PREFIX + 'check_2',
    CHECK_3: STORAGE_KEY_PREFIX + 'check_3'
  };

  // --- Presets Data ---
  const PRESETS = {
    founder: {
      achieve: "eliminate three unnecessary onboarding screens to reach first value in 45 seconds",
      audience: "busy tech founders evaluating our API during their lunch break",
      why: "conversion is lost when speed and clarity are delayed by generic marketing fluff"
    },
    designer: {
      achieve: "establish an unshakeable typographical hierarchy with two core weights and zero decorative clutter",
      audience: "engineers and product managers implementing our design system tokens",
      why: "consistent products are built on disciplined constraints, not infinite styling choices"
    },
    creative: {
      achieve: "craft a singular brand voice that speaks with quiet conviction rather than hype",
      audience: "a discerning audience tired of interchangeable AI-generated corporate copy",
      why: "authenticity cannot be faked when everyone has access to the exact same generative model"
    }
  };

  // --- DOM Elements ---
  const el = {
    // Practitioner
    practitionerName: document.getElementById('practitionerName'),
    printPractitionerName: document.getElementById('printPractitionerName'),
    printVerificationDate: document.getElementById('printVerificationDate'),

    // Monday Brief
    briefAchieve: document.getElementById('briefAchieve'),
    briefAudience: document.getElementById('briefAudience'),
    briefWhy: document.getElementById('briefWhy'),
    previewAchieve: document.getElementById('previewAchieve'),
    previewAudience: document.getElementById('previewAudience'),
    previewWhy: document.getElementById('previewWhy'),
    btnResetBrief: document.getElementById('btnResetBrief'),
    btnCopyBrief: document.getElementById('btnCopyBrief'),
    briefStatus: document.getElementById('briefStatus'),
    presetButtons: document.querySelectorAll('.preset-pill'),

    // Refusal
    refusalText: document.getElementById('refusalText'),
    charCount: document.getElementById('charCount'),
    charMeterFill: document.getElementById('charMeterFill'),
    btnCopyRefusal: document.getElementById('btnCopyRefusal'),
    starterChips: document.querySelectorAll('.starter-chip'),
    printRefusalStatement: document.getElementById('printRefusalStatement'),

    // Checklist
    check1: document.getElementById('check1'),
    check2: document.getElementById('check2'),
    check3: document.getElementById('check3'),
    checksCompleted: document.getElementById('checksCompleted'),
    checksStatusLabel: document.getElementById('checksStatusLabel'),
    judgmentProgressBar: document.getElementById('judgmentProgressBar'),
    meterProgress: document.getElementById('meterProgress'),
    verdictBanner: document.getElementById('verdictBanner'),
    verdictHeadline: document.getElementById('verdictHeadline'),
    verdictDetail: document.getElementById('verdictDetail'),

    // Actions & Nav
    btnPrint: document.getElementById('btnPrint'),
    btnQuickNav: document.getElementById('btnQuickNav'),
    btnDeckPrint: document.getElementById('btnDeckPrint'),
    btnDeckExportText: document.getElementById('btnDeckExportText'),
    deckStatusText: document.getElementById('deckStatusText'),
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toastMessage')
  };

  let toastTimeout = null;

  // --- Helper Functions ---

  function showToast(message) {
    if (!el.toast || !el.toastMessage) return;
    el.toastMessage.textContent = message;
    el.toast.classList.add('show');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      el.toast.classList.remove('show');
    }, 2800);
  }

  function copyToClipboard(text, successMessage) {
    if (!text || text.trim() === '') {
      showToast('Nothing to copy yet');
      return;
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(
        () => showToast(successMessage || 'Copied to clipboard'),
        () => fallbackCopy(text, successMessage)
      );
    } else {
      fallbackCopy(text, successMessage);
    }
  }

  function fallbackCopy(text, successMessage) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        showToast(successMessage || 'Copied to clipboard');
      } else {
        showToast('Unable to copy');
      }
    } catch (err) {
      showToast('Copy failed');
    }
    document.body.removeChild(textarea);
  }

  // --- LocalStorage Safely ---

  function saveStorage(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn('Storage unavailable:', e);
    }
  }

  function loadStorage(key, fallback = '') {
    try {
      const val = localStorage.getItem(key);
      return val !== null ? val : fallback;
    } catch (e) {
      return fallback;
    }
  }

  // --- Practitioner / Signer ---

  function initPractitioner() {
    const savedName = loadStorage(KEYS.PRACTITIONER, '');
    if (el.practitionerName) {
      el.practitionerName.value = savedName;
      updatePrintPractitioner(savedName);

      el.practitionerName.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        saveStorage(KEYS.PRACTITIONER, val);
        updatePrintPractitioner(val);
      });
    }

    // Set formatted verification date for print
    if (el.printVerificationDate) {
      const now = new Date();
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      el.printVerificationDate.textContent = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
    }
  }

  function updatePrintPractitioner(name) {
    if (el.printPractitionerName) {
      el.printPractitionerName.textContent = name || 'Anonymous Practitioner';
    }
  }

  // --- Monday Brief Logic ---

  function updateBriefPreview() {
    const achieve = (el.briefAchieve.value || '').trim();
    const audience = (el.briefAudience.value || '').trim();
    const why = (el.briefWhy.value || '').trim();

    // Slot 1
    if (achieve) {
      el.previewAchieve.textContent = achieve;
      el.previewAchieve.classList.remove('slot-empty');
    } else {
      el.previewAchieve.textContent = '______';
      el.previewAchieve.classList.add('slot-empty');
    }

    // Slot 2
    if (audience) {
      el.previewAudience.textContent = audience;
      el.previewAudience.classList.remove('slot-empty');
    } else {
      el.previewAudience.textContent = '______';
      el.previewAudience.classList.add('slot-empty');
    }

    // Slot 3
    if (why) {
      el.previewWhy.textContent = why;
      el.previewWhy.classList.remove('slot-empty');
    } else {
      el.previewWhy.textContent = '______';
      el.previewWhy.classList.add('slot-empty');
    }

    // Persist
    saveStorage(KEYS.BRIEF_ACHIEVE, achieve);
    saveStorage(KEYS.BRIEF_AUDIENCE, audience);
    saveStorage(KEYS.BRIEF_WHY, why);

    // Deck status
    updateDeckStatus();
  }

  function getCompletedBriefSentence() {
    const achieve = (el.briefAchieve.value || '').trim() || '[achieve outcome]';
    const audience = (el.briefAudience.value || '').trim() || '[target audience]';
    const why = (el.briefWhy.value || '').trim() || '[core reason]';
    return `We want to ${achieve} for ${audience} because ${why}.`;
  }

  function initMondayBrief() {
    // Load saved
    el.briefAchieve.value = loadStorage(KEYS.BRIEF_ACHIEVE, '');
    el.briefAudience.value = loadStorage(KEYS.BRIEF_AUDIENCE, '');
    el.briefWhy.value = loadStorage(KEYS.BRIEF_WHY, '');

    updateBriefPreview();

    [el.briefAchieve, el.briefAudience, el.briefWhy].forEach((input) => {
      input.addEventListener('input', updateBriefPreview);
    });

    // Preset pills
    el.presetButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const presetKey = btn.getAttribute('data-preset');
        const data = PRESETS[presetKey];
        if (data) {
          el.briefAchieve.value = data.achieve;
          el.briefAudience.value = data.audience;
          el.briefWhy.value = data.why;
          updateBriefPreview();
          showToast(`Loaded ${btn.textContent} preset`);
        }
      });
    });

    // Reset Brief
    if (el.btnResetBrief) {
      el.btnResetBrief.addEventListener('click', () => {
        el.briefAchieve.value = '';
        el.briefAudience.value = '';
        el.briefWhy.value = '';
        updateBriefPreview();
        showToast('Monday Brief reset');
      });
    }

    // Copy Brief
    if (el.btnCopyBrief) {
      el.btnCopyBrief.addEventListener('click', () => {
        const sentence = getCompletedBriefSentence();
        copyToClipboard(sentence, 'Monday Brief copied');
      });
    }
  }

  // --- Refusal Exercise Logic ---

  function updateRefusal() {
    const text = el.refusalText.value || '';
    const length = text.length;
    const max = 180;

    if (el.charCount) {
      el.charCount.textContent = length;
    }

    if (el.charMeterFill) {
      const pct = Math.min(100, Math.round((length / max) * 100));
      el.charMeterFill.style.width = pct + '%';
      if (length >= max) {
        el.charMeterFill.style.background = '#DC2626';
      } else {
        el.charMeterFill.style.background = 'var(--color-orange)';
      }
    }

    // Print text
    if (el.printRefusalStatement) {
      el.printRefusalStatement.textContent = text.trim() || 'No refusal statement declared yet.';
    }

    // Persist
    saveStorage(KEYS.REFUSAL, text);
    updateDeckStatus();
  }

  function initRefusal() {
    el.refusalText.value = loadStorage(KEYS.REFUSAL, '');
    updateRefusal();

    el.refusalText.addEventListener('input', updateRefusal);

    // Starter chips
    el.starterChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const phrase = chip.getAttribute('data-text');
        if (phrase) {
          el.refusalText.value = phrase;
          updateRefusal();
          showToast('Refusal starter applied');
        }
      });
    });

    // Copy Refusal
    if (el.btnCopyRefusal) {
      el.btnCopyRefusal.addEventListener('click', () => {
        const text = el.refusalText.value.trim();
        if (!text) {
          showToast('Declare a refusal statement first');
          return;
        }
        copyToClipboard(text, 'Refusal statement copied');
      });
    }
  }

  // --- Checklist (Before You Ship) Logic ---

  function updateChecklist() {
    let completed = 0;
    const checks = [el.check1, el.check2, el.check3];
    
    checks.forEach((chk, idx) => {
      if (chk && chk.checked) {
        completed++;
      }
    });

    // Update numbers
    if (el.checksCompleted) el.checksCompleted.textContent = completed;
    
    // Update progress bar
    const pct = Math.round((completed / 3) * 100);
    if (el.meterProgress) el.meterProgress.style.width = pct + '%';
    if (el.judgmentProgressBar) el.judgmentProgressBar.setAttribute('aria-valuenow', completed);

    // Update status labels
    const remaining = 3 - completed;
    if (el.checksStatusLabel) {
      if (remaining === 0) {
        el.checksStatusLabel.textContent = 'All Verified';
      } else if (remaining === 1) {
        el.checksStatusLabel.textContent = '1 Judgment Remaining';
      } else {
        el.checksStatusLabel.textContent = `${remaining} Judgments Remaining`;
      }
    }

    // Verdict Banner State
    if (el.verdictBanner) {
      if (completed === 3) {
        el.verdictBanner.classList.add('verified');
        if (el.verdictHeadline) el.verdictHeadline.textContent = 'Signed & Ready to Ship — Taste Verified';
        if (el.verdictDetail) {
          el.verdictDetail.textContent = 'The solution is verified, differentiated from synthetic averages, and stripped of non-essential weight.';
        }
      } else {
        el.verdictBanner.classList.remove('verified');
        if (el.verdictHeadline) el.verdictHeadline.textContent = 'Judgments Required';
        if (el.verdictDetail) {
          el.verdictDetail.textContent = `${remaining} of 3 criteria still require critical scrutiny before release.`;
        }
      }
    }

    // Persist
    saveStorage(KEYS.CHECK_1, el.check1.checked ? 'true' : 'false');
    saveStorage(KEYS.CHECK_2, el.check2.checked ? 'true' : 'false');
    saveStorage(KEYS.CHECK_3, el.check3.checked ? 'true' : 'false');

    updateDeckStatus();
  }

  function initChecklist() {
    if (el.check1) el.check1.checked = loadStorage(KEYS.CHECK_1, 'false') === 'true';
    if (el.check2) el.check2.checked = loadStorage(KEYS.CHECK_2, 'false') === 'true';
    if (el.check3) el.check3.checked = loadStorage(KEYS.CHECK_3, 'false') === 'true';

    [el.check1, el.check2, el.check3].forEach((chk) => {
      if (chk) chk.addEventListener('change', updateChecklist);
    });

    updateChecklist();
  }

  // --- Deck Status Tracker ---

  function updateDeckStatus() {
    if (!el.deckStatusText) return;

    const briefDone = Boolean(el.briefAchieve.value.trim() && el.briefAudience.value.trim() && el.briefWhy.value.trim());
    const refusalDone = Boolean(el.refusalText.value.trim());
    const checksCount = [el.check1, el.check2, el.check3].filter((c) => c && c.checked).length;

    if (briefDone && refusalDone && checksCount === 3) {
      el.deckStatusText.textContent = 'Field Card Certified ✦';
      el.deckStatusText.style.color = '#10B981';
    } else if (briefDone || refusalDone || checksCount > 0) {
      el.deckStatusText.textContent = `Drafting (${checksCount}/3 Checks)`;
      el.deckStatusText.style.color = 'var(--color-orange)';
    } else {
      el.deckStatusText.textContent = 'Fresh Card';
      el.deckStatusText.style.color = 'var(--color-ink-faint)';
    }
  }

  // --- Export Markdown ---

  function generateMarkdown() {
    const practitioner = el.practitionerName.value.trim() || 'Aiseosa Uyi-Idahor';
    const briefSentence = getCompletedBriefSentence();
    const refusal = el.refusalText.value.trim() || 'None declared yet.';
    const c1 = el.check1.checked ? '[x]' : '[ ]';
    const c2 = el.check2.checked ? '[x]' : '[ ]';
    const c3 = el.check3.checked ? '[x]' : '[ ]';

    return `# The Taste Card — Field Guide
*Based on “Taste Is the New Skill” by Aiseosa Uyi-Idahor (Blockfest Africa 2026, Lagos)*

> “Taste is knowing what to cut. And signing what’s left.”
> “AI can generate the options. You own the judgment.”

---

## Issued To / Practitioner
**${practitioner}**

---

## Part 1: The Five Principles

### 01. COLLECT. MIX. NAME.
- **Explanation:** Don't accept the first idea. Gather different references, combine them, and identify what makes the strongest one work.
- **Question:** *What can I combine that hasn't been combined this way before?*

### 02. WRITE FIRST. GO WIDE. CUT HARD.
- **Explanation:** Define the idea before prompting. Explore many directions, then remove anything that doesn't strengthen it.
- **Question:** *What is the idea, without the decoration?*

### 03. PROTECT THREE THINGS.
- **Explanation:** Decide what must remain consistent: your colour, your shape and your voice. Let everything else evolve.
- **Question:** *What must never change, even when everything else does?*

### 04. WRITE ONE TESTABLE SENTENCE.
- **Explanation:** Describe the outcome you want without prescribing the solution. Make it specific enough that another person can judge whether you achieved it.
- **Question:** *Could a stranger tell whether this works?*

### 05. CRITIQUE THE GOAL, NOT THE COLOUR.
- **Explanation:** Before polishing the output, check whether it solves the right problem. Better execution cannot rescue the wrong idea.
- **Question:** *Is this solving the problem, or just looking good?*

---

## Part 2: Monday Brief
*“Complete this before opening your AI tool.”*

> **“${briefSentence}”**

---

## Part 3: What Does Your Product Refuse To Do?
*“Your product, your service, your team, your office. One sentence. Be specific.”*

> **“${refusal}”**

---

## Part 4: Before You Ship Checklist
*“AI can generate the options. You own the judgment.”*

- ${c1} Does it solve the actual problem?
- ${c2} Does it feel distinct from the obvious AI-generated answer?
- ${c3} What can I remove without losing the idea?

---
*Created with The Taste Card · Blockfest Africa 2026, Lagos*
`;
  }

  function downloadMarkdown() {
    const content = generateMarkdown();
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'the-taste-card.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Downloaded the-taste-card.md');
  }

  // --- Navigation & Print Handlers ---

  function initActions() {
    // Print triggers
    const triggerPrint = () => {
      // Ensure print preview text is populated
      updateBriefPreview();
      updateRefusal();
      updateChecklist();
      window.print();
    };

    if (el.btnPrint) el.btnPrint.addEventListener('click', triggerPrint);
    if (el.btnDeckPrint) el.btnDeckPrint.addEventListener('click', triggerPrint);

    // Quick jump to brief
    if (el.btnQuickNav) {
      el.btnQuickNav.addEventListener('click', () => {
        const briefSec = document.getElementById('mondayBriefSection');
        if (briefSec) {
          briefSec.scrollIntoView({ behavior: 'smooth' });
          if (el.briefAchieve) el.briefAchieve.focus();
        }
      });
    }

    // Export markdown button
    if (el.btnDeckExportText) {
      el.btnDeckExportText.addEventListener('click', downloadMarkdown);
    }
  }

  // --- Document Initialization ---
  document.addEventListener('DOMContentLoaded', () => {
    initPractitioner();
    initMondayBrief();
    initRefusal();
    initChecklist();
    initActions();
    updateDeckStatus();
  });
})();
