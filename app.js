/**
 * ═══════════════════════════════════════════════════════
 *  APP.JS — ResumeAI Visual Overhaul
 *  Particle canvas · Cursor glow · AOS · PDF · Rendering
 * ═══════════════════════════════════════════════════════
 */

// ─── PDF.js ──────────────────────────────────────────────────────────────────
if (typeof pdfjsLib !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

// ─── PARTICLE CANVAS ─────────────────────────────────────────────────────────
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Particle() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.r = Math.random() * 1.5 + .3;
    this.vx = (Math.random() - .5) * .3;
    this.vy = (Math.random() - .5) * .3;
    this.life = Math.random();
    this.maxLife = Math.random() * 200 + 100;
    this.frame = 0;
    const cols = ['167,139,250','56,189,248','52,211,153','251,191,36'];
    this.col = cols[Math.floor(Math.random() * cols.length)];
  }

  Particle.prototype.update = function() {
    this.x += this.vx; this.y += this.vy; this.frame++;
    if (this.frame > this.maxLife || this.x < 0 || this.x > W || this.y < 0 || this.y > H) {
      this.x = Math.random() * W; this.y = Math.random() * H;
      this.frame = 0;
    }
  };

  Particle.prototype.draw = function() {
    const alpha = Math.sin((this.frame / this.maxLife) * Math.PI) * .6;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.col},${alpha})`;
    ctx.fill();
  };

  function init() {
    resize();
    particles = Array.from({ length: 120 }, () => new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(167,139,250,${(1 - dist/100) * .06})`;
          ctx.lineWidth = .5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  init();
  loop();
})();

// ─── CURSOR GLOW ─────────────────────────────────────────────────────────────
(function initCursor() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
})();

// ─── SIMPLE AOS (Animate on Scroll) ──────────────────────────────────────────
(function initAOS() {
  const style = document.createElement('style');
  style.textContent = `
    [data-aos] { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }
    [data-aos].aos-visible { opacity: 1; transform: none; }
  `;
  document.head.appendChild(style);

  function check() {
    document.querySelectorAll('[data-aos]').forEach(el => {
      const delay = parseInt(el.dataset.aosDelay || 0);
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        setTimeout(() => el.classList.add('aos-visible'), delay);
      }
    });
  }
  window.addEventListener('scroll', check, { passive: true });
  setTimeout(check, 200);
})();

// ─── NAV ACTIVE STATES ────────────────────────────────────────────────────────
function updateNavActive(pageId) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === pageId);
  });
}

// ─── NAVIGATION ──────────────────────────────────────────────────────────────
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + pageId).classList.add('active');
  updateNavActive(pageId);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // Re-trigger AOS
  setTimeout(() => {
    document.querySelectorAll('[data-aos]').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) el.classList.add('aos-visible');
    });
  }, 100);
}

// ─── PDF HANDLING ─────────────────────────────────────────────────────────────
async function extractTextFromPDF(file) {
  const buf = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
  let text = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map(it => it.str).join(' ') + '\n';
  }
  return { text: text.trim(), pages: pdf.numPages };
}

async function handlePDFUpload(mode, input) {
  const file = input.files[0];
  if (!file) return;

  const nameEl    = document.getElementById(`pdf-name-${mode}`);
  const previewEl = document.getElementById(`pdf-preview-${mode}`);
  const textareaEl= document.getElementById(`resume-text-${mode}`);
  const uploadEl  = document.getElementById(`upload-area-${mode}`);

  nameEl.textContent = '  ' + file.name;
  textareaEl.value = '⏳ Extracting text from PDF…';
  previewEl.classList.remove('hidden');
  uploadEl.style.display = 'none';

  try {
    const { text, pages } = await extractTextFromPDF(file);
    textareaEl.value = text || 'Could not extract text — please paste manually.';
    const pagesEl = document.getElementById(`pdf-pages-${mode}`);
    if (pagesEl) pagesEl.textContent = `${pages} pages`;
  } catch (e) {
    textareaEl.value = 'Error reading PDF. Please paste your resume text manually.';
  }
}

function clearPDF(mode) {
  document.getElementById(`pdf-preview-${mode}`).classList.add('hidden');
  document.getElementById(`upload-area-${mode}`).style.display = '';
  document.getElementById(`resume-text-${mode}`).value = '';
  document.getElementById(`pdf-upload-${mode}`).value = '';
}

// ─── DRAG & DROP ──────────────────────────────────────────────────────────────
function initDragDrop() {
  const area = document.getElementById('upload-area-job');
  if (!area) return;
  area.addEventListener('dragover', e => { e.preventDefault(); area.classList.add('dragging'); });
  area.addEventListener('dragleave', () => area.classList.remove('dragging'));
  area.addEventListener('drop', e => {
    e.preventDefault(); area.classList.remove('dragging');
    const file = e.dataTransfer?.files[0];
    if (file?.type === 'application/pdf') handlePDFUpload('job', { files: [file] });
  });
}

// ─── JOB RECOMMENDATION ──────────────────────────────────────────────────────
function runJobRecommendation() {
  const t1 = document.getElementById('resume-text-job')?.value || '';
  const t2 = document.getElementById('manual-text-job').value  || '';
  const input = (t1 + ' ' + t2).trim();

  if (input.length < 20) { showToast('Please upload a PDF or paste at least 20 characters.', 'warn'); return; }

  const showNLP = document.getElementById('show-nlp-job').checked;
  const { query, results, qVec } = rankDocuments(input, JOB_DATABASE.map(j => ({ ...j })));

  if (showNLP) renderNLPPanel('job', input, query, qVec, results.length);
  else document.getElementById('nlp-panel-job').classList.add('hidden');

  renderJobCards(results);
}

function renderNLPPanel(mode, original, queryProc, qVec, numDocs) {
  const panel = document.getElementById(`nlp-panel-${mode}`);
  const steps = document.getElementById(`nlp-steps-${mode}`);
  panel.classList.remove('hidden');

  const topTF = [...qVec.entries()].sort((a,b)=>b[1]-a[1]).slice(0, 14);
  const termsHtml = topTF.map(([t,v]) =>
    `<span style="color:var(--cyan)">${esc(t)}</span><span style="color:var(--faint)">→${v.toFixed(4)}</span>`
  ).join('  &nbsp; ');

  steps.innerHTML = `
    <div class="nlp-step">
      <div class="nlp-step-label">Step 1 — Lowercasing</div>
      <div class="nlp-step-value">${esc(original.toLowerCase().slice(0, 220))}…</div>
    </div>
    <div class="nlp-step">
      <div class="nlp-step-label">Step 2 — Tokenization (first 30 raw tokens)</div>
      <div class="nlp-step-value">[${queryProc.rawTokens.slice(0,30).map(esc).join(', ')}…]</div>
    </div>
    <div class="nlp-step">
      <div class="nlp-step-label">Step 3 — After Stopword Removal (${queryProc.tokens.length} meaningful tokens)</div>
      <div class="nlp-step-value">[${queryProc.tokens.slice(0,24).map(esc).join(', ')}…]</div>
    </div>
    <div class="nlp-step">
      <div class="nlp-step-label">Step 4 — TF-IDF Top Terms  <small style="color:var(--faint);font-style:normal">(term → weighted score)</small></div>
      <div class="nlp-step-value">${termsHtml}</div>
    </div>
    <div class="nlp-step">
      <div class="nlp-step-label">Step 5 — Cosine Similarity against ${numDocs} job descriptions</div>
      <div class="nlp-step-value" style="color:var(--muted)">sim(A,B) = <span style="color:var(--sky)">dot(A,B)</span> / (<span style="color:var(--violet)">‖A‖</span> × <span style="color:var(--violet)">‖B‖</span>) &nbsp;→&nbsp; Results sorted descending below ↓</div>
    </div>
  `;
}

function renderJobCards(results) {
  const section = document.getElementById('job-results');
  const cards   = document.getElementById('job-cards');
  const badge   = document.getElementById('job-count-badge');

  section.classList.remove('hidden');
  badge.textContent = `${results.length} jobs`;

  cards.innerHTML = results.map((job, i) => {
    const pct = Math.round(job.score * 100);
    const tier = pct >= 40 ? 'high' : pct >= 20 ? 'med' : pct >= 10 ? 'low' : 'vlow';
    const label = pct >= 40 ? '🟢 Strong Match' : pct >= 20 ? '🔵 Good Match' : pct >= 10 ? '🟡 Partial' : '⚫ Low';
    const fillW = Math.min(pct * 1.7, 100);

    return `<div class="job-card" style="animation-delay:${i * 60}ms">
      <div class="job-card-rank-stripe stripe-${tier}"></div>
      <div class="job-card-top">
        <div>
          <div class="job-rank-label">#${i+1} of ${results.length}</div>
          <div class="job-title">${esc(job.title)}</div>
          <span class="job-category">${esc(job.category)}</span>
        </div>
        <div class="job-score-block">
          <div class="job-score-pct score-color-${tier}">${pct}%</div>
          <div style="font-size:.72rem;color:var(--faint);margin-top:.15rem">${label}</div>
        </div>
      </div>
      <div class="job-desc">${esc(job.text.replace(/\s+/g,' ').trim().slice(0, 190))}…</div>
      <div class="job-bar-wrap">
        <div class="job-bar-meta">
          <span>Cosine Similarity</span>
          <span>${job.score.toFixed(6)}</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill fill-${tier}" style="width:0%" data-w="${fillW}"></div>
        </div>
      </div>
    </div>`;
  }).join('');

  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // Animate bars after DOM paint
  requestAnimationFrame(() => setTimeout(() => {
    cards.querySelectorAll('[data-w]').forEach(el => {
      el.style.width = el.dataset.w + '%';
    });
  }, 80));
}

// ─── STUDENT RANKING ─────────────────────────────────────────────────────────
function runStudentRanking() {
  const roleInput = document.getElementById('role-input').value.trim();
  if (!roleInput) { showToast('Please select or enter a job role.', 'warn'); return; }

  let roleText = ROLE_DATABASE[roleInput] || '';
  if (!roleText) {
    const key = Object.keys(ROLE_DATABASE).find(k =>
      k.toLowerCase().includes(roleInput.toLowerCase()) ||
      roleInput.toLowerCase().includes(k.toLowerCase())
    );
    roleText = key ? ROLE_DATABASE[key] : roleInput;
  }

  const showNLP = document.getElementById('show-nlp-rank').checked;
  const { query, results, qVec } = rankDocuments(roleText, STUDENT_DATABASE);

  if (showNLP) renderNLPPanel('rank', roleText, query, qVec, results.length);
  else document.getElementById('nlp-panel-rank').classList.add('hidden');

  renderRankCards(results, roleInput);
}

function renderRankCards(results, roleName) {
  const section = document.getElementById('rank-results');
  const grid    = document.getElementById('rank-cards-grid');
  const badge   = document.getElementById('role-display-badge');

  section.classList.remove('hidden');
  badge.textContent = roleName;

  grid.innerHTML = results.map((s, i) => {
    const rank = i + 1;
    const pct  = Math.round(s.score * 100);
    const tier = pct >= 40 ? 'high' : pct >= 20 ? 'med' : pct >= 10 ? 'low' : 'vlow';
    const medalClass = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : '';
    const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;
    const topWords = s.proc?.tokens?.slice(0, 7).join(' · ') || '';
    const fillW = Math.min(pct * 1.7, 100);

    return `<div class="rank-card" style="animation-delay:${i * 50}ms">
      <div class="rank-medal ${medalClass}">${medal}</div>
      <div class="rank-body">
        <div class="rank-name">${esc(s.name)}</div>
        <div class="rank-skills">${esc(topWords)}</div>
      </div>
      <div class="rank-score-col">
        <div class="rank-pill pill-${tier}">${pct}%</div>
        <div class="rank-mini-bar">
          <div class="rank-mini-fill fill-${tier}" style="width:0%" data-w="${fillW}"></div>
        </div>
      </div>
    </div>`;
  }).join('');

  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  requestAnimationFrame(() => setTimeout(() => {
    grid.querySelectorAll('[data-w]').forEach(el => {
      el.style.width = el.dataset.w + '%';
    });
  }, 80));
}

// ─── ROLE CHIPS ───────────────────────────────────────────────────────────────
function initRoleChips() {
  const container = document.getElementById('role-chips');
  const input     = document.getElementById('role-input');
  if (!container || !input) return;

  ROLE_SUGGESTIONS.forEach(role => {
    const chip = document.createElement('button');
    chip.className = 'role-chip';
    chip.textContent = role;
    chip.type = 'button';
    chip.onclick = () => {
      container.querySelectorAll('.role-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      input.value = role;
    };
    container.appendChild(chip);
  });
}

// ─── TOAST ───────────────────────────────────────────────────────────────────
function showToast(msg, type = 'info') {
  const t = document.createElement('div');
  t.style.cssText = `
    position:fixed;bottom:2rem;right:2rem;z-index:9999;
    background:rgba(15,21,38,.95);border:1px solid ${type==='warn'?'rgba(251,191,36,.4)':'rgba(167,139,250,.4)'};
    color:${type==='warn'?'#fbbf24':'#a78bfa'};
    padding:.75rem 1.2rem;border-radius:10px;font-size:.88rem;font-weight:500;
    backdrop-filter:blur(20px);max-width:320px;
    animation:toastIn .3s ease;
  `;
  const style = document.createElement('style');
  style.textContent = '@keyframes toastIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}';
  document.head.appendChild(style);
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; setTimeout(() => t.remove(), 300); }, 3000);
}

// ─── UTILS ───────────────────────────────────────────────────────────────────
function esc(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initRoleChips();
  initDragDrop();
  updateNavActive('home');
});
