/* =========================================================
   CONFIG — edit these for your Panchayath
   ========================================================= */
// WhatsApp number that complaints are sent to, in international
// format with no + or spaces (country code + number).
const WHATSAPP_NUMBER = "919999999999"; // TODO: replace with the real office WhatsApp number

// Email address the contact form composes a message to.
const CONTACT_EMAIL = "office@cherukolconnect.gov.in"; // TODO: replace with real email

// A story counts as "latest" for this many days, then moves to Old News.
const LATEST_WINDOW_DAYS = 2;
// A story is removed completely this many days after it was published.
const ARCHIVE_LIFETIME_DAYS = 7;

// How many of the freshest stories to show in the scrollable
// "Latest from your Panchayath" grid on the home page.
const LATEST_DISPLAY_COUNT = 7;

/* =========================================================
   CONTENT SOURCE — Google Sheets
   =========================================================
   The client edits three tabs in one Google Sheet (News,
   Updates, Achievements). Each tab is published to the web as
   CSV and fetched here on every page load, so every visitor
   sees the same content — no login, no admin panel, no code.

   SETUP (do this once):
   1. Create a Google Sheet with three tabs named exactly:
      News | Updates | Achievements
      (see README-FOR-CLIENT.md for the exact column headers
      each tab needs, and a template link.)
   2. File -> Share -> Publish to web -> choose each individual
      sheet/tab (not "Entire document") -> CSV -> Publish.
   3. Copy the CSV link Google gives you for each tab and paste
      it below, replacing the placeholder URLs.
   4. That's it. The client only ever touches the Sheet again.
   ========================================================= */
const SHEET_CSV = {
  news:         "https://docs.google.com/spreadsheets/d/e/2PACX-1vSJK5YMcn6VV8MIAAbqJqBNBPedOqanyVx2eZPvmA9L3AZ-B0BcMFmLAJ9QISg7lr_DIze9N_JRt0u1/pub?gid=0&single=true&output=csv",
  updates:      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSJK5YMcn6VV8MIAAbqJqBNBPedOqanyVx2eZPvmA9L3AZ-B0BcMFmLAJ9QISg7lr_DIze9N_JRt0u1/pub?gid=2101454905&single=true&output=csv",
  achievements: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSJK5YMcn6VV8MIAAbqJqBNBPedOqanyVx2eZPvmA9L3AZ-B0BcMFmLAJ9QISg7lr_DIze9N_JRt0u1/pub?gid=735728458&single=true&output=csv"
};

// How often (in ms) to re-fetch the Sheet while the site is open,
// so a change the client makes shows up for visitors already
// browsing without them needing to refresh. 5 minutes is a
// reasonable balance between freshness and not hammering Google.
const SHEET_REFRESH_MS = 5 * 60 * 1000;

const DAY_MS = 24 * 60 * 60 * 1000;

/* =========================================================
   GALLERY — static images shown in the Gallery tab and the
   home page carousel. Not sourced from the Sheet; edit this
   array directly to change the photos on display.
   ========================================================= */
const GALLERY_IMAGES = [
  { src: "images/gallery-office.jpg",  caption: "Panchayath Office" },
  { src: "images/gallery-hall.jpg",    caption: "Community Hall" },
  { src: "images/gallery-market.jpg",  caption: "Local Market" },
  { src: "images/gallery-park.jpg",    caption: "Village Park" },
  { src: "images/gallery-temple.jpg",  caption: "Temple Grounds" },
  { src: "images/gallery-school.jpg",  caption: "Government School" }
];

const GALLERY_CAPTIONS_ML = {
  "images/gallery-office.jpg": "പഞ്ചായത്ത് ഓഫീസ്",
  "images/gallery-hall.jpg": "കമ്മ്യൂണിറ്റി ഹാൾ",
  "images/gallery-market.jpg": "പ്രാദേശിക മാർക്കറ്റ്",
  "images/gallery-park.jpg": "ഗ്രാമ പാർക്ക്",
  "images/gallery-temple.jpg": "ക്ഷേത്ര മൈതാനം",
  "images/gallery-school.jpg": "സർക്കാർ സ്കൂൾ"
};

/* =========================================================
   i18n — English / Malayalam
   ========================================================= */
const I18N = {
  en: {
    "nav.home": "Home",
    "nav.updates": "Important Updates",
    "nav.achievements": "Achievements",
    "nav.oldnews": "Old News",
    "nav.gallery": "Gallery",
    "nav.complaint": "File a Complaint",
    "nav.contact": "Contact",

    "home.eyebrow": "Updated daily",
    "home.title": "Latest from your Panchayath",
    "home.sub": "News and announcements from the last two days. Scroll the list below to see everything at a glance — older stories move to the Old News page and clear out a week after publishing.",
    "home.emptyPre": "No fresh updates right now — check back soon, or browse",

    "updates.eyebrow": "Notices & Circulars",
    "updates.title": "Important Updates",
    "updates.sub": "Deadlines, office notices, and announcements that need your attention. This is placeholder content — replace it with real notices any time.",
    "updates.empty": "No important updates at the moment.",

    "achievements.eyebrow": "Milestones",
    "achievements.title": "Achievements",
    "achievements.sub": "Projects completed and recognitions earned by the Panchayath. This is placeholder content — replace it with real achievements any time.",
    "achievements.empty": "No achievements listed yet.",

    "oldnews.eyebrow": "Archive",
    "oldnews.sub": "Stories older than two days live here for one week from their publish date, then they're cleared automatically.",
    "oldnews.empty": "Nothing in the archive at the moment.",

    "gallery.eyebrow": "Around the Panchayath",
    "gallery.title": "Photo Gallery",
    "gallery.sub": "A look at our offices, events, and public spaces.",

    "complaint.eyebrow": "Grievance Redressal",
    "complaint.sub": "Fill in the details below. Submitting opens WhatsApp with your message pre-filled, ready to send to the Panchayath office.",
    "complaint.name": "Full name",
    "complaint.namePh": "Your name",
    "complaint.ward": "Ward / area",
    "complaint.wardPh": "e.g. Ward 7",
    "complaint.phone": "Phone number",
    "complaint.phonePh": "10-digit mobile number",
    "complaint.details": "Complaint details",
    "complaint.detailsPh": "Describe the issue…",
    "complaint.send": "Send via WhatsApp",
    "complaint.note": "You'll be redirected to WhatsApp to review and send your message.",

    "contact.eyebrow": "Get in Touch",
    "contact.title": "Contact the Office",
    "contact.sub": "Visit, call, or write to us — we're here on working days.",
    "contact.officeTitle": "Panchayath Office",
    "contact.address": "Panchayath Office Building, Near Bus Stand, Kerala – 689XXX",
    "contact.hours": "Monday–Saturday, 10:00 AM – 5:00 PM",
    "contact.name": "Name",
    "contact.namePh": "Your name",
    "contact.email": "Email",
    "contact.emailPh": "you@example.com",
    "contact.message": "Message",
    "contact.messagePh": "How can we help?",
    "contact.send": "Send Message",
    "contact.note": "Opens your email app with this message ready to send.",

    "footer.text": "Cherukol Connect — Panchayath News & Services. Built for the community.",

    "card.latest": "Latest",
    "card.archive": "Archive",
    "card.today": "Today",
    "card.daysAgo1": "1 day ago",
    "card.daysAgoN": "{n} days ago",
    "carousel.goTo": "Go to slide"
  },
  ml: {
    "nav.home": "ഹോം",
    "nav.updates": "പ്രധാന അറിയിപ്പുകൾ",
    "nav.achievements": "നേട്ടങ്ങൾ",
    "nav.oldnews": "പഴയ വാർത്തകൾ",
    "nav.gallery": "ഗാലറി",
    "nav.complaint": "പരാതി നൽകുക",
    "nav.contact": "ബന്ധപ്പെടുക",

    "home.eyebrow": "ദിവസവും പുതുക്കുന്നു",
    "home.title": "നിങ്ങളുടെ പഞ്ചായത്തിൽ നിന്നുള്ള ഏറ്റവും പുതിയ വാർത്തകൾ",
    "home.sub": "കഴിഞ്ഞ രണ്ട് ദിവസത്തെ വാർത്തകളും അറിയിപ്പുകളും. താഴെയുള്ള ലിസ്റ്റ് സ്ക്രോൾ ചെയ്ത് എല്ലാം ഒറ്റനോട്ടത്തിൽ കാണുക — പഴയ വാർത്തകൾ 'പഴയ വാർത്തകൾ' പേജിലേക്ക് മാറുകയും പ്രസിദ്ധീകരിച്ച് ഒരാഴ്ചയ്ക്ക് ശേഷം നീക്കം ചെയ്യപ്പെടുകയും ചെയ്യും.",
    "home.emptyPre": "ഇപ്പോൾ പുതിയ അപ്ഡേറ്റുകൾ ഇല്ല — ഉടൻ വീണ്ടും പരിശോധിക്കുക, അല്ലെങ്കിൽ കാണുക",

    "updates.eyebrow": "അറിയിപ്പുകളും സർക്കുലറുകളും",
    "updates.title": "പ്രധാന അറിയിപ്പുകൾ",
    "updates.sub": "നിങ്ങളുടെ ശ്രദ്ധ ആവശ്യമുള്ള അവസാന തീയതികൾ, ഓഫീസ് അറിയിപ്പുകൾ, പ്രഖ്യാപനങ്ങൾ. ഇത് മാതൃകാ ഉള്ളടക്കമാണ് — എപ്പോൾ വേണമെങ്കിലും യഥാർത്ഥ അറിയിപ്പുകൾ ഉപയോഗിച്ച് മാറ്റിസ്ഥാപിക്കുക.",
    "updates.empty": "ഇപ്പോൾ പ്രധാന അറിയിപ്പുകളൊന്നുമില്ല.",

    "achievements.eyebrow": "നാഴികക്കല്ലുകൾ",
    "achievements.title": "നേട്ടങ്ങൾ",
    "achievements.sub": "പഞ്ചായത്ത് പൂർത്തിയാക്കിയ പദ്ധതികളും നേടിയ അംഗീകാരങ്ങളും. ഇത് മാതൃകാ ഉള്ളടക്കമാണ് — എപ്പോൾ വേണമെങ്കിലും യഥാർത്ഥ നേട്ടങ്ങൾ ഉപയോഗിച്ച് മാറ്റിസ്ഥാപിക്കുക.",
    "achievements.empty": "ഇതുവരെ നേട്ടങ്ങളൊന്നും പട്ടികപ്പെടുത്തിയിട്ടില്ല.",

    "oldnews.eyebrow": "ആർക്കൈവ്",
    "oldnews.sub": "രണ്ട് ദിവസത്തിൽ കൂടുതൽ പഴക്കമുള്ള വാർത്തകൾ പ്രസിദ്ധീകരിച്ച തീയതി മുതൽ ഒരാഴ്ചത്തേക്ക് ഇവിടെ ലഭ്യമാണ്, അതിനുശേഷം അവ സ്വയമേവ നീക്കം ചെയ്യപ്പെടും.",
    "oldnews.empty": "ഇപ്പോൾ ആർക്കൈവിൽ ഒന്നുമില്ല.",

    "gallery.eyebrow": "പഞ്ചായത്തിന് ചുറ്റും",
    "gallery.title": "ഫോട്ടോ ഗാലറി",
    "gallery.sub": "ഞങ്ങളുടെ ഓഫീസുകൾ, പരിപാടികൾ, പൊതു ഇടങ്ങൾ എന്നിവയുടെ ഒരു കാഴ്ച.",

    "complaint.eyebrow": "പരാതി പരിഹാരം",
    "complaint.sub": "താഴെയുള്ള വിവരങ്ങൾ പൂരിപ്പിക്കുക. സമർപ്പിക്കുമ്പോൾ നിങ്ങളുടെ സന്ദേശം മുൻകൂട്ടി പൂരിപ്പിച്ച നിലയിൽ WhatsApp തുറക്കും, പഞ്ചായത്ത് ഓഫീസിലേക്ക് അയക്കാൻ തയ്യാർ.",
    "complaint.name": "മുഴുവൻ പേര്",
    "complaint.namePh": "നിങ്ങളുടെ പേര്",
    "complaint.ward": "വാർഡ് / പ്രദേശം",
    "complaint.wardPh": "ഉദാ. വാർഡ് 7",
    "complaint.phone": "ഫോൺ നമ്പർ",
    "complaint.phonePh": "10 അക്ക മൊബൈൽ നമ്പർ",
    "complaint.details": "പരാതി വിശദാംശങ്ങൾ",
    "complaint.detailsPh": "പ്രശ്നം വിവരിക്കുക…",
    "complaint.send": "WhatsApp വഴി അയക്കുക",
    "complaint.note": "നിങ്ങളുടെ സന്ദേശം പരിശോധിച്ച് അയക്കാൻ WhatsApp-ലേക്ക് റീഡയറക്‌ട് ചെയ്യപ്പെടും.",

    "contact.eyebrow": "ബന്ധപ്പെടുക",
    "contact.title": "ഓഫീസുമായി ബന്ധപ്പെടുക",
    "contact.sub": "സന്ദർശിക്കുക, വിളിക്കുക, അല്ലെങ്കിൽ എഴുതുക — പ്രവൃത്തി ദിവസങ്ങളിൽ ഞങ്ങൾ ഇവിടെയുണ്ട്.",
    "contact.officeTitle": "പഞ്ചായത്ത് ഓഫീസ്",
    "contact.address": "പഞ്ചായത്ത് ഓഫീസ് കെട്ടിടം, ബസ് സ്റ്റാൻഡിന് സമീപം, കേരളം – 689XXX",
    "contact.hours": "തിങ്കൾ–ശനി, രാവിലെ 10:00 – വൈകുന്നേരം 5:00",
    "contact.name": "പേര്",
    "contact.namePh": "നിങ്ങളുടെ പേര്",
    "contact.email": "ഇമെയിൽ",
    "contact.emailPh": "you@example.com",
    "contact.message": "സന്ദേശം",
    "contact.messagePh": "ഞങ്ങൾക്ക് എങ്ങനെ സഹായിക്കാനാകും?",
    "contact.send": "സന്ദേശം അയക്കുക",
    "contact.note": "ഈ സന്ദേശം അയക്കാൻ തയ്യാറായി നിങ്ങളുടെ ഇമെയിൽ ആപ്പ് തുറക്കും.",

    "footer.text": "ചെറുകോൽ കണക്റ്റ് — പഞ്ചായത്ത് വാർത്തകളും സേവനങ്ങളും. സമൂഹത്തിനായി നിർമ്മിച്ചത്.",

    "card.latest": "പുതിയത്",
    "card.archive": "ആർക്കൈവ്",
    "card.today": "ഇന്ന്",
    "card.daysAgo1": "1 ദിവസം മുമ്പ്",
    "card.daysAgoN": "{n} ദിവസം മുമ്പ്",
    "carousel.goTo": "സ്ലൈഡിലേക്ക് പോകുക"
  }
};

const LANG_STORAGE_KEY = "cherukolConnectLang";

function getCurrentLang(){
  return document.documentElement.getAttribute("lang") === "ml" ? "ml" : "en";
}

function t(key){
  const lang = getCurrentLang();
  return (I18N[lang] && I18N[lang][key]) || (I18N.en && I18N.en[key]) || key;
}

function applyTranslations(){
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.setAttribute("placeholder", t(key));
  });

  document.getElementById("todayDate").textContent = formatDate(new Date().toISOString());

  // Re-render dynamic sections so in-card strings (Latest/Archive
  // pill, "Today"/"N days ago", date formatting) follow the
  // selected language too. Uses whatever is currently cached in
  // memory (already-fetched Sheet data) — no re-fetch.
  renderAllNews();
  renderUpdates();
  renderAchievements();
  renderGallery();
  renderCarousel();
}

function setLanguage(lang){
  document.documentElement.setAttribute("lang", lang);
  const label = document.getElementById("langToggleLabel");
  if (label) label.textContent = lang === "ml" ? "English" : "മലയാളം";
  try{ localStorage.setItem(LANG_STORAGE_KEY, lang); }catch(e){ /* ignore */ }
  applyTranslations();
}

function initLangToggle(){
  const btn = document.getElementById("langToggle");
  let saved = "en";
  try{ saved = localStorage.getItem(LANG_STORAGE_KEY) || "en"; }catch(e){ /* ignore */ }
  setLanguage(saved === "ml" ? "ml" : "en");

  btn.addEventListener("click", () => {
    setLanguage(getCurrentLang() === "ml" ? "en" : "ml");
  });
}

/* =========================================================
   CSV PARSING (small, dependency-free)
   =========================================================
   Handles quoted fields, commas inside quotes, and escaped
   quotes ("") — enough for what Google Sheets' CSV export
   produces. Returns an array of row-objects keyed by the
   header row.
   ========================================================= */
function parseCSV(text){
  const rows = [];
  let row = [], field = "", inQuotes = false;

  for (let i = 0; i < text.length; i++){
    const c = text[i];
    if (inQuotes){
      if (c === '"'){
        if (text[i + 1] === '"'){ field += '"'; i++; }
        else { inQuotes = false; }
      } else {
        field += c;
      }
    } else {
      if (c === '"'){ inQuotes = true; }
      else if (c === ','){ row.push(field); field = ""; }
      else if (c === '\n' || c === '\r'){
        if (c === '\r' && text[i + 1] === '\n') i++;
        row.push(field); field = "";
        if (row.length > 1 || row[0] !== "") rows.push(row);
        row = [];
      } else {
        field += c;
      }
    }
  }
  if (field !== "" || row.length){ row.push(field); rows.push(row); }
  if (!rows.length) return [];

  const headers = rows[0].map(h => h.trim());
  return rows.slice(1)
    .filter(r => r.some(cell => cell.trim() !== ""))
    .map(r => {
      const obj = {};
      headers.forEach((h, idx) => { obj[h] = (r[idx] || "").trim(); });
      return obj;
    });
}

/* ---------------------------------------------------------
   Fetches and parses a published Google Sheet CSV. Returns
   null (not a throw) on any failure, so callers can cleanly
   fall back to an empty list — a client who hasn't finished
   the Sheet setup yet, or a temporary network drop, never
   breaks the page.
   --------------------------------------------------------- */
async function fetchSheet(url){
  if (!url || url.includes("PASTE_YOUR_PUBLISHED_ID_HERE")) return null;
  try{
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("Sheet fetch failed: " + res.status);
    const text = await res.text();
    return parseCSV(text);
  }catch(e){
    console.warn("Could not load Google Sheet, using empty fallback content.", url, e);
    return null;
  }
}

/* ---------------------------------------------------------
   Row -> item mappers.
   Each expects specific column headers in the Sheet (see
   README-FOR-CLIENT.md). Blank optional cells fall back to
   sensible defaults so a client leaving a column empty never
   breaks rendering.
   --------------------------------------------------------- */
function parseSheetDate(value){
  if (!value) return new Date().toISOString();
  const d = new Date(value);
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

function rowToNewsItem(row, i){
  return {
    id: row.id || ("sheet-n" + i),
    title: row.title_en || row.title || "",
    summary: row.summary_en || row.summary || "",
    image: row.image || "images/news-placeholder.jpg",
    date: parseSheetDate(row.date),
    _ml: {
      title: row.title_ml || "",
      summary: row.summary_ml || ""
    }
  };
}

function rowToUpdateItem(row, i){
  const priorityRaw = (row.priority || "").trim().toLowerCase();
  return {
    id: row.id || ("sheet-u" + i),
    tag: row.tag_en || row.tag || "Notice",
    title: row.title_en || row.title || "",
    detail: row.detail_en || row.detail || "",
    date: parseSheetDate(row.date),
    priority: priorityRaw === "urgent" ? "urgent" : "notice",
    _ml: {
      tag: row.tag_ml || "",
      title: row.title_ml || "",
      detail: row.detail_ml || ""
    }
  };
}

function rowToAchievementItem(row, i){
  return {
    id: row.id || ("sheet-a" + i),
    year: row.year || String(new Date().getFullYear()),
    title: row.title_en || row.title || "",
    detail: row.detail_en || row.detail || "",
    _ml: {
      title: row.title_ml || "",
      detail: row.detail_ml || ""
    }
  };
}

// In-memory caches. Populated entirely from the Google Sheet on
// load (and every SHEET_REFRESH_MS after). They start empty and
// stay empty until the Sheet is configured and reachable — the
// page's empty-state messages handle that gracefully.
let newsCache = [];
let updatesCache = [];
let achievementsCache = [];

async function loadNewsFromSheet(){
  const rows = await fetchSheet(SHEET_CSV.news);
  if (rows) newsCache = rows.map(rowToNewsItem).filter(i => i.title);
}
async function loadUpdatesFromSheet(){
  const rows = await fetchSheet(SHEET_CSV.updates);
  if (rows) updatesCache = rows.map(rowToUpdateItem).filter(i => i.title);
}
async function loadAchievementsFromSheet(){
  const rows = await fetchSheet(SHEET_CSV.achievements);
  if (rows) achievementsCache = rows.map(rowToAchievementItem).filter(i => i.title);
}

async function refreshAllFromSheet(){
  await Promise.all([
    loadNewsFromSheet(),
    loadUpdatesFromSheet(),
    loadAchievementsFromSheet()
  ]);
  renderAllNews();
  renderUpdates();
  renderAchievements();
}

/* ---------------------------------------------------------
   localize(): picks Malayalam text for an item when Malayalam
   is active, using the item's own _ml fields (populated
   directly from the Sheet's *_ml columns). Falls back to the
   English/original text if no translation is available for
   that field, so a client who only fills in English never
   sees a blank card.
   --------------------------------------------------------- */
function localize(item){
  const lang = getCurrentLang();
  if (lang !== "ml") return item;
  if (item._ml){
    const filled = {};
    Object.entries(item._ml).forEach(([k, v]) => { if (v) filled[k] = v; });
    return Object.assign({}, item, filled);
  }
  return item;
}

/* =========================================================
   NEWS LIFECYCLE (unchanged logic, now reads from newsCache)
   ========================================================= */
function purgeExpired(items){
  const cutoff = Date.now() - ARCHIVE_LIFETIME_DAYS * DAY_MS;
  return items.filter(item => new Date(item.date).getTime() >= cutoff);
}

function ageInDays(item){
  return Math.floor((Date.now() - new Date(item.date).getTime()) / DAY_MS);
}

/* =========================================================
   RENDERING
   ========================================================= */
function formatDate(iso){
  const lang = getCurrentLang();
  const locale = lang === "ml" ? "ml-IN" : "en-IN";
  return new Date(iso).toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" });
}

function ageLabelFor(item){
  const age = ageInDays(item);
  if (age <= 0) return t("card.today");
  if (age === 1) return t("card.daysAgo1");
  return t("card.daysAgoN").replace("{n}", age);
}

function placeholderSVG(){
  return `<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <rect x="3" y="5" width="18" height="14" rx="2"/>
    <circle cx="8.5" cy="10.5" r="1.5"/>
    <path d="m21 15-5-5-11 9"/>
  </svg>`;
}
window.placeholderSVG = placeholderSVG;

function escapeHTML(str){
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function newsCardHTML(item, isFresh){
  return `
    <article class="news-card">
      <div class="news-card-img">
        <img src="${item.image}" alt="" loading="lazy"
             onerror="this.parentElement.innerHTML = placeholderSVG();">
      </div>
      <div class="news-card-body">
        <div class="news-card-meta">
          <span class="pill ${isFresh ? "pill-fresh" : ""}">${isFresh ? t("card.latest") : t("card.archive")}</span>
          <span>${ageLabelFor(item)}</span>
        </div>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.summary)}</p>
        <div class="news-card-footer">${formatDate(item.date)}</div>
      </div>
    </article>`;
}

function newsListItemHTML(item){
  return `
    <article class="news-list-item">
      <div class="news-list-thumb">
        <img src="${item.image}" alt="" loading="lazy"
             onerror="this.parentElement.innerHTML = placeholderSVG();">
      </div>
      <div class="news-list-body">
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.summary)}</p>
      </div>
      <div class="news-list-meta">${formatDate(item.date)}</div>
    </article>`;
}

function renderAllNews(){
  let items = purgeExpired(newsCache);
  items = items.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  const latest = items.filter(i => ageInDays(i) < LATEST_WINDOW_DAYS);
  const old = items.filter(i => ageInDays(i) >= LATEST_WINDOW_DAYS);

  const latestGrid = document.getElementById("latestNewsGrid");
  const toShow = latest.slice(0, LATEST_DISPLAY_COUNT);

  latestGrid.innerHTML = toShow.map(i => newsCardHTML(localize(i), true)).join("");
  document.getElementById("latestEmptyState").hidden = toShow.length > 0;

  const oldGrid = document.getElementById("oldNewsGrid");
  oldGrid.innerHTML = old.map(i => newsListItemHTML(localize(i))).join("");
  document.getElementById("oldEmptyState").hidden = old.length > 0;
}

function renderGallery(){
  const grid = document.getElementById("galleryGrid");
  const lang = getCurrentLang();
  grid.innerHTML = GALLERY_IMAGES.map(g => {
    const caption = (lang === "ml" && GALLERY_CAPTIONS_ML[g.src]) ? GALLERY_CAPTIONS_ML[g.src] : g.caption;
    return `
    <div class="gallery-item">
      <img src="${g.src}" alt="${escapeHTML(caption)}" loading="lazy"
           onerror="this.parentElement.innerHTML = placeholderSVG() + '<div class=\\'cap\\'>${escapeHTML(caption)}</div>';">
      <div class="cap">${escapeHTML(caption)}</div>
    </div>
  `;
  }).join("");
}

/* =========================================================
   HOME CAROUSEL — unchanged from original
   ========================================================= */
const CAROUSEL_INTERVAL_MS = 4500;
let carouselIndex = 0;
let carouselTimer = null;

function carouselSlideCaption(img){
  const lang = getCurrentLang();
  return (lang === "ml" && GALLERY_CAPTIONS_ML[img.src]) ? GALLERY_CAPTIONS_ML[img.src] : img.caption;
}

function renderCarousel(){
  const track = document.getElementById("carouselTrack");
  const dotsWrap = document.getElementById("carouselDots");
  if (!track || !dotsWrap) return;

  track.innerHTML = GALLERY_IMAGES.map(img => {
    const caption = carouselSlideCaption(img);
    return `
      <div class="carousel-slide">
        <img src="${img.src}" alt="${escapeHTML(caption)}" loading="lazy"
             onerror="this.parentElement.innerHTML = placeholderSVG() + '<div class=\\'carousel-caption\\'>${escapeHTML(caption)}</div>';">
        <div class="carousel-caption">${escapeHTML(caption)}</div>
      </div>`;
  }).join("");

  dotsWrap.innerHTML = GALLERY_IMAGES.map((img, i) => `
    <button type="button" class="carousel-dot" role="tab" data-index="${i}"
      aria-label="${t("carousel.goTo")} ${i + 1}" aria-selected="${i === carouselIndex}"></button>
  `).join("");

  updateCarouselPosition();
}

function updateCarouselPosition(){
  const track = document.getElementById("carouselTrack");
  if (!track) return;
  const count = GALLERY_IMAGES.length;
  if (count === 0) return;
  if (carouselIndex < 0) carouselIndex = count - 1;
  if (carouselIndex >= count) carouselIndex = 0;

  track.style.transform = `translateX(-${carouselIndex * 100}%)`;
  document.querySelectorAll("#carouselDots .carousel-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === carouselIndex);
    dot.setAttribute("aria-selected", i === carouselIndex);
  });
}

function carouselGoTo(index){
  carouselIndex = index;
  updateCarouselPosition();
}

function carouselNext(){ carouselGoTo(carouselIndex + 1); }
function carouselPrev(){ carouselGoTo(carouselIndex - 1); }

function startCarouselAutoplay(){
  stopCarouselAutoplay();
  if (GALLERY_IMAGES.length <= 1) return;
  carouselTimer = setInterval(carouselNext, CAROUSEL_INTERVAL_MS);
}

function stopCarouselAutoplay(){
  if (carouselTimer){ clearInterval(carouselTimer); carouselTimer = null; }
}

function initCarousel(){
  const carousel = document.getElementById("homeCarousel");
  if (!carousel) return;

  renderCarousel();
  startCarouselAutoplay();

  document.getElementById("carouselNext").addEventListener("click", () => {
    carouselNext();
    startCarouselAutoplay();
  });
  document.getElementById("carouselPrev").addEventListener("click", () => {
    carouselPrev();
    startCarouselAutoplay();
  });
  document.getElementById("carouselDots").addEventListener("click", (e) => {
    const dot = e.target.closest(".carousel-dot");
    if (!dot) return;
    carouselGoTo(Number(dot.dataset.index));
    startCarouselAutoplay();
  });

  carousel.addEventListener("mouseenter", stopCarouselAutoplay);
  carousel.addEventListener("mouseleave", startCarouselAutoplay);
  carousel.addEventListener("touchstart", stopCarouselAutoplay, { passive: true });
  carousel.addEventListener("touchend", startCarouselAutoplay, { passive: true });
}

/* ---------------------------------------------------------
   Important Updates — rendering (data now from updatesCache)
   --------------------------------------------------------- */
function bellIconSVG(){
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>`;
}

function updateItemHTML(item){
  return `
    <article class="update-item priority-${item.priority}">
      <div class="update-icon">${bellIconSVG()}</div>
      <div class="update-body">
        <div class="update-top">
          <span class="update-tag">${escapeHTML(item.tag)}</span>
          <span class="update-date">${formatDate(item.date)}</span>
        </div>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.detail)}</p>
      </div>
    </article>`;
}

function renderUpdates(){
  const items = updatesCache.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  const grid = document.getElementById("updatesGrid");
  grid.innerHTML = items.map(i => updateItemHTML(localize(i))).join("");
  document.getElementById("updatesEmptyState").hidden = items.length > 0;
}

/* ---------------------------------------------------------
   Achievements — rendering (data now from achievementsCache)
   --------------------------------------------------------- */
function trophyIconSVG(){
  return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M8 21h8M12 17v4"/>
    <path d="M7 4h10v5a5 5 0 0 1-10 0V4z"/>
    <path d="M7 5H4a1 1 0 0 0-1 1v1a4 4 0 0 0 4 4"/>
    <path d="M17 5h3a1 1 0 0 1 1 1v1a4 4 0 0 1-4 4"/>
  </svg>`;
}

function achievementCardHTML(item){
  return `
    <article class="achievement-card">
      <div class="achievement-top">
        <div class="achievement-icon">${trophyIconSVG()}</div>
        <span class="achievement-year">${escapeHTML(item.year)}</span>
      </div>
      <h3>${escapeHTML(item.title)}</h3>
      <p>${escapeHTML(item.detail)}</p>
    </article>`;
}

function renderAchievements(){
  const grid = document.getElementById("achievementsGrid");
  grid.innerHTML = achievementsCache.map(i => achievementCardHTML(localize(i))).join("");
  document.getElementById("achievementsEmptyState").hidden = achievementsCache.length > 0;
}

/* =========================================================
   TAB NAVIGATION
   ========================================================= */
function showTab(tabName){
  document.querySelectorAll(".tab-panel").forEach(p => {
    p.classList.toggle("active", p.id === "tab-" + tabName);
  });
  document.querySelectorAll(".nav-link").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabName);
  });
  document.getElementById("siteNav").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function initNav(){
  document.querySelectorAll("[data-tab]").forEach(el => {
    el.addEventListener("click", () => showTab(el.dataset.tab));
  });
  document.getElementById("navToggle").addEventListener("click", () => {
    document.getElementById("siteNav").classList.toggle("open");
  });
}

/* =========================================================
   COMPLAINT FORM -> WHATSAPP
   ========================================================= */
function initComplaintForm(){
  const form = document.getElementById("complaintForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("cName").value.trim();
    const ward = document.getElementById("cWard").value.trim();
    const phone = document.getElementById("cPhone").value.trim();
    const message = document.getElementById("cMessage").value.trim();

    const lines = [
      "*New Complaint via Cherukol Connect*",
      `Name: ${name}`,
      ward ? `Ward/Area: ${ward}` : null,
      `Phone: ${phone}`,
      `Complaint: ${message}`
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener");
    form.reset();
  });
}

/* =========================================================
   CONTACT FORM -> MAILTO
   ========================================================= */
function initContactForm(){
  const form = document.getElementById("contactForm");
  document.getElementById("contactWaDisplay").textContent =
    "+91 " + WHATSAPP_NUMBER.slice(2, 7) + " " + WHATSAPP_NUMBER.slice(7);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("ctName").value.trim();
    const email = document.getElementById("ctEmail").value.trim();
    const message = document.getElementById("ctMessage").value.trim();

    const subject = encodeURIComponent(`Message from ${name} via Cherukol Connect`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    form.reset();
  });
}

/* =========================================================
   RESPONSIVE BREAKPOINT DEBUG ATTRIBUTE
   ========================================================= */
function currentBreakpointLabel(width){
  if (width >= 1440) return "xl";
  if (width >= 1024) return "lg";
  if (width >= 768) return "md";
  return "sm";
}

function updateBreakpointAttr(){
  document.documentElement.setAttribute("data-breakpoint", currentBreakpointLabel(window.innerWidth));
}

/* =========================================================
   INIT
   ========================================================= */
document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("todayDate").textContent = formatDate(new Date().toISOString());

  initNav();

  // Render immediately (empty state until the Sheet loads) so the
  // page structure is ready, then swap in real content the moment
  // the Sheet fetch resolves.
  renderAllNews();
  renderUpdates();
  renderAchievements();
  renderGallery();
  initCarousel();
  initComplaintForm();
  initContactForm();
  updateBreakpointAttr();
  initLangToggle();

  window.addEventListener("resize", updateBreakpointAttr);

  // Pull real content from the Google Sheet (falls back silently
  // to an empty list if not configured yet or unreachable).
  await refreshAllFromSheet();

  // Keep content fresh for anyone who leaves a tab open, and
  // re-check the two-day/one-week aging windows periodically.
  setInterval(refreshAllFromSheet, SHEET_REFRESH_MS);
});
