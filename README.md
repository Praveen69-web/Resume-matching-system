# ResumeAI

A browser-based resume intelligence tool that matches resumes to jobs and ranks students against job roles — entirely client-side, with no server or API required. Powered by a custom NLP engine built from scratch in vanilla JavaScript.

---

## Features

- **Job Recommendation** — Upload or paste a resume and get ranked job matches from a curated database of 20+ roles across AI/ML, Web Dev, Cloud, Cybersecurity, and more.
- **Student Ranking** — Select a target job role and rank a pool of student profiles by how well their skills align.
- **NLP Transparency Panel** — Toggle a step-by-step view of the NLP pipeline showing exactly how your text was processed and scored.
- **PDF Upload** — Drag-and-drop or click-to-upload PDF resumes; text is extracted automatically via PDF.js.
- **Animated UI** — Particle canvas background, cursor glow effect, and scroll-triggered animations (AOS).

---

## How It Works

The matching engine in `nlp.js` implements a classic IR (Information Retrieval) pipeline:

### 1. Text Preprocessing
Raw text is lowercased, tokenized on word boundaries (`\b[a-z][a-z0-9+#.]*\b`), and filtered against a curated stopword list of ~120 common English words. Tokens shorter than 3 characters are also removed.

### 2. Term Frequency (TF)
For each document, the normalized frequency of each token is computed:
```
TF(term) = count(term) / total_tokens
```

### 3. Inverse Document Frequency (IDF)
IDF is computed across the query + all documents using smoothing to avoid division by zero:
```
IDF(term) = log((N + 1) / (df + 1)) + 1
```

### 4. TF-IDF Vectorization
Each document and the query are represented as sparse vectors where each dimension is a term weighted by `TF × IDF`.

### 5. Cosine Similarity
The query vector is compared to every document vector:
```
sim(A, B) = dot(A, B) / (‖A‖ × ‖B‖)
```
Results are sorted in descending order and displayed with a match percentage and tier label (Strong / Good / Partial / Low).

---

## Project Structure

```
├── index.html      # Single-page app shell with all page views
├── style.css       # Dark theme, card layouts, animations
├── app.js          # UI logic: navigation, PDF handling, rendering, toasts
├── nlp.js          # NLP engine: preprocessing, TF-IDF, cosine similarity
└── data.js         # Job database (20+ roles) and student profile database
```

---

## Getting Started

No build step or dependencies needed.

1. Clone or download the repository.
2. Open `index.html` directly in any modern browser.

```bash
git clone https://github.com/your-username/resumeai.git
cd resumeai
open index.html   # or just double-click it
```

> PDF extraction requires `pdf.js` which is loaded from a CDN. An internet connection is needed on first load.

---

## Usage

### Job Recommendation
1. Navigate to the **Job Match** page.
2. Upload a PDF resume or paste resume text into the text area.
3. Optionally enable **Show NLP Steps** to see how the text is processed.
4. Click **Find Matching Jobs** — results appear ranked by cosine similarity score.

### Student Ranking
1. Navigate to the **Rank Students** page.
2. Select a role from the quick-pick chips or type a custom role.
3. Click **Rank Students** — all student profiles are scored and sorted against the role description.

---

## Databases

`data.js` ships with two pre-built datasets:

**Job Database** — 20+ job descriptions across categories:
`AI/ML · Data · Web Dev · Cloud · Cybersecurity · Mobile · Game Dev · Blockchain · UX/Design · Business`

**Student Database** — A set of student profiles with varied skill sets used to demonstrate the ranking feature.

**Role Database** — A mapping of role names to descriptive skill paragraphs used when ranking students.

---

## NLP API Reference

All functions are available globally from `nlp.js`.

| Function | Signature | Description |
|---|---|---|
| `preprocess` | `(text) → { raw, rawTokens, tokens, cleaned }` | Lowercase, tokenize, remove stopwords |
| `termFrequency` | `(tokens) → Map<term, tf>` | Normalized term frequency |
| `inverseDocFrequency` | `(tokenSets) → Map<term, idf>` | Smoothed IDF across a corpus |
| `tfidfVector` | `(tokens, idf) → Map<term, score>` | TF-IDF weighted vector |
| `cosineSimilarity` | `(vecA, vecB) → float [0,1]` | Cosine similarity between two vectors |
| `rankDocuments` | `(queryText, documents) → { query, idf, qVec, results }` | Full pipeline: preprocess → vectorize → rank |
| `topTerms` | `(vec, n?) → string` | Debug helper: top-n terms by TF-IDF weight |

---

## Match Score Tiers

| Score | Tier | Label |
|---|---|---|
| ≥ 40% | High | 🟢 Strong Match |
| 20–39% | Med | 🔵 Good Match |
| 10–19% | Low | 🟡 Partial |
| < 10% | Very Low | ⚫ Low |

---

## Browser Compatibility

Works in any modern browser that supports ES6+ (Chrome, Firefox, Edge, Safari). No server, no framework, no build tools.

---

## License

MIT
