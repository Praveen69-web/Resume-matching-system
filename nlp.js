/**
 * ═══════════════════════════════════════════════════════
 *  NLP ENGINE — nlp.js
 *  Implements:
 *    1. Text preprocessing (lowercase, tokenize, stopword removal)
 *    2. TF-IDF vectorization
 *    3. Cosine similarity
 * ═══════════════════════════════════════════════════════
 */

// ─── STOPWORDS ───────────────────────────────────────────────────────────────
const STOPWORDS = new Set([
  'a','an','the','and','or','but','in','on','at','to','for','of','with',
  'by','from','as','is','was','are','were','be','been','being','have',
  'has','had','do','does','did','will','would','should','could','may',
  'might','shall','can','need','dare','ought','used','that','this','these',
  'those','it','its','i','me','my','we','our','you','your','he','she','they',
  'them','their','what','which','who','how','when','where','why','not','no',
  'nor','so','yet','both','either','neither','if','then','else','than','such',
  'too','very','just','also','more','most','other','some','any','all','each',
  'every','few','many','much','own','same','so','than','too','very','s','t',
  'can','will','just','don','should','now','d','ll','m','o','re','ve','y',
  'ain','aren','couldn','didn','doesn','hadn','hasn','haven','isn','ma',
  'mightn','mustn','needn','shan','shouldn','wasn','weren','won','wouldn',
  'about','above','across','after','against','along','among','around',
  'before','behind','below','beneath','beside','between','beyond','during',
  'except','inside','into','near','off','out','outside','over','past',
  'since','through','throughout','under','unless','until','upon','within',
  'without','able','want','work','well','must','use','using','get','make',
  'new','good','first','one','two','three','year','years','strong','experience',
  'knowledge','understanding','ability','skills','skill','proficient','familiar'
]);

// ─── STEP 1: PREPROCESS ──────────────────────────────────────────────────────
/**
 * preprocess(text) → { tokens, cleaned }
 * Lowercase → tokenize → remove stopwords & short tokens
 */
function preprocess(text) {
  // Lowercase
  const lower = text.toLowerCase();

  // Tokenize: split on anything that isn't alphanumeric
  const rawTokens = lower.match(/\b[a-z][a-z0-9+#.]*\b/g) || [];

  // Remove stopwords and very short tokens
  const tokens = rawTokens.filter(t => t.length > 2 && !STOPWORDS.has(t));

  return {
    raw: lower,
    rawTokens,
    tokens,
    cleaned: tokens.join(' ')
  };
}
// ─── STEP 2: TERM FREQUENCY ──────────────────────────────────────────────────
/**
 * termFrequency(tokens) → Map<term, tf>
 * TF = count(term) / total_terms  (normalized)
 */
function termFrequency(tokens) {
  const tf = new Map();
  const total = tokens.length || 1;
  tokens.forEach(t => tf.set(t, (tf.get(t) || 0) + 1));
  tf.forEach((count, term) => tf.set(term, count / total));
  return tf;
}

// ─── STEP 3: IDF ─────────────────────────────────────────────────────────────
/**
 * inverseDocFrequency(tokenSets) → Map<term, idf>
 * IDF = log((N+1) / (df+1))  — smoothed to avoid zero division
 */
function inverseDocFrequency(tokenSets) {
  const N = tokenSets.length;
  const df = new Map();

  tokenSets.forEach(tokens => {
    const unique = new Set(tokens);
    unique.forEach(t => df.set(t, (df.get(t) || 0) + 1));
  });
  const idf = new Map();
  df.forEach((count, term) => {
    idf.set(term, Math.log((N + 1) / (count + 1)) + 1);
  });
  return idf;
}
// ─── STEP 4: TF-IDF VECTOR ───────────────────────────────────────────────────
/**
 * tfidfVector(tokens, idf) → Map<term, tfidf_score>
 */
function tfidfVector(tokens, idf) {
  const tf = termFrequency(tokens);
  const vec = new Map();
  tf.forEach((tfVal, term) => {
    const idfVal = idf.get(term) || Math.log((1 + 1) / (1 + 1)) + 1;
    vec.set(term, tfVal * idfVal);
  });
  return vec;
}

// ─── STEP 5: COSINE SIMILARITY ───────────────────────────────────────────────
/**
 * cosineSimilarity(vecA, vecB) → float [0, 1]
 * sim = dot(A,B) / (||A|| × ||B||)
 */
function cosineSimilarity(vecA, vecB) {
  let dot = 0, magA = 0, magB = 0;

  // Dot product over shared keys
  vecA.forEach((valA, term) => {
    if (vecB.has(term)) dot += valA * vecB.get(term);
    magA += valA * valA;
  });
  vecB.forEach(valB => { magB += valB * valB; });

  const denom = Math.sqrt(magA) * Math.sqrt(magB);
  return denom === 0 ? 0 : dot / denom;
}

// ─── MAIN: RANK DOCUMENTS ────────────────────────────────────────────────────
/**
 * rankDocuments(queryText, documents)
 * documents: [{ id, title, text, ...meta }]
 * Returns: ranked array with similarity scores + NLP debug info
 */
function rankDocuments(queryText, documents) {
  // Preprocess query
  const queryProc = preprocess(queryText);

  // Preprocess all docs
  const docProcs = documents.map(d => ({
    ...d,
    proc: preprocess(d.text)
  }));

  // Build IDF over query + all docs
  const allTokenSets = [queryProc.tokens, ...docProcs.map(d => d.proc.tokens)];
  const idf = inverseDocFrequency(allTokenSets);

  // Build query vector
  const qVec = tfidfVector(queryProc.tokens, idf);
  // Score each doc
  const scored = docProcs.map(d => {
    const dVec = tfidfVector(d.proc.tokens, idf);
    const score = cosineSimilarity(qVec, dVec);
    return { ...d, score, vec: dVec, proc: d.proc };
  });

  // Sort descending
  scored.sort((a, b) => b.score - a.score);

  // Return with debug info
  return {
    query: queryProc,
    idf,
    qVec,
    results: scored
  };
}

// ─── UTILITY: TOP TF-IDF TERMS ───────────────────────────────────────────────
function topTerms(vec, n = 8) {
  return [...vec.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([t, v]) => `${t}(${v.toFixed(3)})`)
    .join('  ');
}
