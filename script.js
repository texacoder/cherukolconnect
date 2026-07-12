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

const STORAGE_KEY = "cherukolConnectNewsItems";
const DAY_MS = 24 * 60 * 60 * 1000;

/* =========================================================
   SEED DATA — used only the first time the site runs, so
   there's something to see. Replace freely, or add stories
   through addNewsItem() (see bottom of file).
   ========================================================= */
function daysAgoISO(n){
  return new Date(Date.now() - n * DAY_MS).toISOString();
}

const SEED_NEWS = [
  {
    id: "n1",
    title: "Panchayath launches new drinking water scheme for Ward 4",
    summary: "A fresh pipeline project aims to bring round-the-clock water supply to over 300 households by next month.",
    image: "images/news-water.jpg",
    date: daysAgoISO(0)
  },
  {
    id: "n2",
    title: "Public health camp scheduled at Community Hall this weekend",
    summary: "Free general checkups, eye screening, and vaccination drives will be held from 9 AM to 4 PM.",
    image: "images/news-healthcamp.jpg",
    date: daysAgoISO(0)
  },
  {
    id: "n3",
    title: "New LED streetlights installed along the river road",
    summary: "Over 40 energy-efficient LED lights have replaced old sodium lamps, improving night-time visibility for commuters.",
    image: "images/news-streetlight.jpg",
    date: daysAgoISO(0)
  },
  {
    id: "n4",
    title: "Road resurfacing work completed on Main Bazaar Road",
    summary: "The stretch connecting the bus stand to the market has been repaved, easing daily commutes for residents.",
    image: "images/news-road.jpg",
    date: daysAgoISO(1)
  },
  {
    id: "n5",
    title: "Monsoon preparedness meeting held with ward members",
    summary: "Officials reviewed drainage clearance and flood-response plans ahead of the coming rains.",
    image: "images/news-meeting.jpg",
    date: daysAgoISO(1)
  },
  {
    id: "n6",
    title: "Library extends evening hours for students during exam season",
    summary: "The Panchayath public library will now stay open until 8 PM on weekdays through the exam period.",
    image: "images/news-library.jpg",
    date: daysAgoISO(1)
  },
  {
    id: "n7",
    title: "Kudumbashree unit opens new handicrafts stall near the market",
    summary: "Local women's collective showcases handmade bags, coir products, and festival decor at a new permanent stall.",
    image: "images/news-handicrafts.jpg",
    date: daysAgoISO(2)
  },
  {
    id: "n8",
    title: "Grama Sabha meeting notice for next month's ward development plan",
    summary: "Residents are invited to share priorities for the upcoming annual development plan at the ward-level meeting.",
    image: "images/news-meeting2.jpg",
    date: daysAgoISO(4)
  }
];

const GALLERY_IMAGES = [
  { src: "images/gallery-office.jpg",  caption: "Panchayath Office" },
  { src: "images/gallery-hall.jpg",    caption: "Community Hall" },
  { src: "images/gallery-market.jpg",  caption: "Local Market" },
  { src: "images/gallery-park.jpg",    caption: "Village Park" },
  { src: "images/gallery-temple.jpg",  caption: "Temple Grounds" },
  { src: "images/gallery-school.jpg",  caption: "Government School" }
];

/* ---------------------------------------------------------
   Malayalam translations for seed content, keyed by id.
   These are looked up at render time (see localize()) so
   switching languages also translates the text INSIDE the
   news / updates / achievements / gallery cards, not just
   the surrounding UI labels. If a new item is added later via
   addNewsItem()/addUpdateItem()/addAchievement() with no entry
   here, it simply falls back to the text it was created with.
   --------------------------------------------------------- */
const SEED_NEWS_ML = {
  n1: {
    title: "വാർഡ് 4-ന് പുതിയ കുടിവെള്ള പദ്ധതി പഞ്ചായത്ത് ആരംഭിച്ചു",
    summary: "അടുത്ത മാസത്തോടെ 300-ലധികം വീടുകളിൽ 24 മണിക്കൂറും കുടിവെള്ളം എത്തിക്കാൻ ലക്ഷ്യമിടുന്ന പുതിയ പൈപ്പ്‌ലൈൻ പദ്ധതി."
  },
  n2: {
    title: "ഈ വാരാന്ത്യം കമ്മ്യൂണിറ്റി ഹാളിൽ പൊതുജനാരോഗ്യ ക്യാമ്പ്",
    summary: "രാവിലെ 9 മുതൽ വൈകിട്ട് 4 വരെ സൗജന്യ പൊതു പരിശോധന, കണ്ണ് പരിശോധന, വാക്സിനേഷൻ ക്യാമ്പുകൾ നടക്കും."
  },
  n3: {
    title: "നദീതീര റോഡിൽ പുതിയ എൽഇഡി തെരുവുവിളക്കുകൾ സ്ഥാപിച്ചു",
    summary: "40-ലധികം ഊർജക്ഷമതയുള്ള എൽഇഡി ലൈറ്റുകൾ പഴയ സോഡിയം ലാമ്പുകൾക്ക് പകരം സ്ഥാപിച്ചു, രാത്രി യാത്രക്കാർക്ക് കൂടുതൽ ദൃശ്യപരത നൽകുന്നു."
  },
  n4: {
    title: "മെയിൻ ബസാർ റോഡിലെ റോഡ് പുനർനിർമാണം പൂർത്തിയായി",
    summary: "ബസ് സ്റ്റാൻഡിനെ മാർക്കറ്റുമായി ബന്ധിപ്പിക്കുന്ന ഭാഗം പുനർനിർമിച്ചു, നിവാസികളുടെ ദൈനംദിന യാത്ര എളുപ്പമാക്കുന്നു."
  },
  n5: {
    title: "വാർഡ് അംഗങ്ങളുമായി മൺസൂൺ തയ്യാറെടുപ്പ് യോഗം നടന്നു",
    summary: "വരാനിരിക്കുന്ന മഴയ്ക്ക് മുന്നോടിയായി ഡ്രെയിനേജ് ക്ലിയറൻസും വെള്ളപ്പൊക്ക പ്രതിരോധ പദ്ധതികളും ഉദ്യോഗസ്ഥർ അവലോകനം ചെയ്തു."
  },
  n6: {
    title: "പരീക്ഷാക്കാലത്ത് വിദ്യാർത്ഥികൾക്കായി ലൈബ്രറി വൈകുന്നേര സമയം നീട്ടി",
    summary: "പരീക്ഷാക്കാലയളവിൽ പഞ്ചായത്ത് പൊതു ലൈബ്രറി പ്രവൃത്തിദിവസങ്ങളിൽ രാത്രി 8 മണി വരെ തുറന്നിരിക്കും."
  },
  n7: {
    title: "മാർക്കറ്റിനടുത്ത് കുടുംബശ്രീ യൂണിറ്റ് പുതിയ കരകൗശല സ്റ്റാൾ തുറന്നു",
    summary: "പ്രാദേശിക വനിതാ കൂട്ടായ്മ കൈകൊണ്ട് നിർമ്മിച്ച ബാഗുകൾ, കയർ ഉൽപ്പന്നങ്ങൾ, ഉത്സവ അലങ്കാരങ്ങൾ എന്നിവ പുതിയ സ്ഥിരം സ്റ്റാളിൽ പ്രദർശിപ്പിക്കുന്നു."
  },
  n8: {
    title: "അടുത്ത മാസത്തെ വാർഡ് വികസന പദ്ധതിക്കുള്ള ഗ്രാമസഭാ യോഗ അറിയിപ്പ്",
    summary: "വരാനിരിക്കുന്ന വാർഷിക വികസന പദ്ധതിക്കായി മുൻഗണനകൾ പങ്കിടാൻ നിവാസികളെ വാർഡ്തല യോഗത്തിലേക്ക് ക്ഷണിക്കുന്നു."
  }
};

const SEED_UPDATES_ML = {
  u1: {
    tag: "അവസാന തീയതി",
    title: "സ്വത്ത് നികുതി അടയ്ക്കാനുള്ള അവസാന തീയതി ഓഗസ്റ്റ് 31 വരെ നീട്ടി",
    detail: "നീട്ടിയ അവസാന തീയതിക്കുള്ളിൽ വൈകിയ ഫീസില്ലാതെ നിവാസികൾക്ക് ഇപ്പോൾ സ്വത്ത് നികുതി അടയ്ക്കാം. ഓൺലൈനിലോ പഞ്ചായത്ത് ഓഫീസ് കൗണ്ടറിലോ പണമടയ്ക്കാം."
  },
  u2: {
    tag: "ഓഫീസ് അറിയിപ്പ്",
    title: "ഓണം അവധി പ്രമാണിച്ച് പഞ്ചായത്ത് ഓഫീസ് അടച്ചിരിക്കും",
    detail: "ഓണത്തോടനുബന്ധിച്ച് ഈ മാസം 5 മുതൽ 7 വരെ ഓഫീസ് അടച്ചിരിക്കും. അടിയന്തര സേവനങ്ങൾക്ക് WhatsApp പരാതി ലൈൻ വഴി ബന്ധപ്പെടാം."
  },
  u3: {
    tag: "പുതിയ സേവനം",
    title: "ജനന, മരണ സർട്ടിഫിക്കറ്റുകൾ ഇപ്പോൾ ഓൺലൈനിൽ ലഭ്യമാണ്",
    detail: "ജനന, മരണ സർട്ടിഫിക്കറ്റുകൾക്കുള്ള അപേക്ഷകൾ ഇപ്പോൾ ഇ-ഡിസ്ട്രിക്റ്റ് കേരള പോർട്ടൽ വഴി സമർപ്പിക്കാം, ഓഫീസ് സന്ദർശനത്തിന്റെ ആവശ്യം കുറയ്ക്കുന്നു."
  },
  u4: {
    tag: "അറിയിപ്പ്",
    title: "വ്യാഴാഴ്ച താൽക്കാലിക കുടിവെള്ള വിതരണ തടസ്സം",
    detail: "വാർഡ് 3, 5 എന്നിവിടങ്ങളിൽ പതിവ് പൈപ്പ്‌ലൈൻ അറ്റകുറ്റപ്പണിക്കായി വ്യാഴാഴ്ച രാവിലെ 10 മുതൽ ഉച്ചയ്ക്ക് 2 വരെ കുടിവെള്ള വിതരണം തടസ്സപ്പെടും."
  }
};

const SEED_ACHIEVEMENTS_ML = {
  a1: {
    title: "മികച്ച പഞ്ചായത്ത് അവാർഡ് — ശുചിത്വവും മാലിന്യ സംസ്കരണവും",
    detail: "വീടുതോറുമുള്ള മാലിന്യ ശേഖരണവും പ്രവർത്തനക്ഷമമായ വസ്തു ശേഖരണ കേന്ദ്രവും വിജയകരമായി നടപ്പാക്കിയതിന് ജില്ലാതലത്തിൽ അംഗീകാരം."
  },
  a2: {
    title: "100% എൽഇഡി തെരുവുവിളക്ക് പരിവർത്തനം പൂർത്തിയായി",
    detail: "എല്ലാ വാർഡ് റോഡുകളും ഇപ്പോൾ ഊർജക്ഷമതയുള്ള എൽഇഡി ലൈറ്റിംഗിലാണ്, ഇത് പഞ്ചായത്തിന്റെ വൈദ്യുതി ചെലവ് കുറയ്ക്കുകയും രാത്രി സുരക്ഷ മെച്ചപ്പെടുത്തുകയും ചെയ്യുന്നു."
  },
  a3: {
    title: "വാർഡ് വോളന്റിയർമാർക്ക് പൂർണ്ണ ഡിജിറ്റൽ സാക്ഷരതാ പരിരക്ഷ",
    detail: "ഓരോ വാർഡിലും ഇപ്പോൾ പരിശീലനം ലഭിച്ച കുടുംബശ്രീ വോളന്റിയർമാർ ഉണ്ട്, ഇ-ഡിസ്ട്രിക്റ്റ്, കെ-സ്മാർട്ട് ഓൺലൈൻ സേവനങ്ങളിൽ നിവാസികളെ സഹായിക്കാൻ കഴിയും."
  },
  a4: {
    title: "കുടിവെള്ള വിതരണ പദ്ധതിക്കുള്ള ശുദ്ധജല അവാർഡ്",
    detail: "പഞ്ചായത്തിലെ 80%-ലധികം വീടുകളിലേക്ക് സുരക്ഷിതമായ പൈപ്പ് കുടിവെള്ളം എത്തിച്ചതിന് സംസ്ഥാനതല അംഗീകാരം."
  }
};

const GALLERY_CAPTIONS_ML = {
  "images/gallery-office.jpg": "പഞ്ചായത്ത് ഓഫീസ്",
  "images/gallery-hall.jpg": "കമ്മ്യൂണിറ്റി ഹാൾ",
  "images/gallery-market.jpg": "പ്രാദേശിക മാർക്കറ്റ്",
  "images/gallery-park.jpg": "ഗ്രാമ പാർക്ക്",
  "images/gallery-temple.jpg": "ക്ഷേത്ര മൈതാനം",
  "images/gallery-school.jpg": "സർക്കാർ സ്കൂൾ"
};

// Returns a copy of a seed item with English fields swapped for
// their Malayalam counterparts (when available) based on the
// current language. Priority: a static SEED_*_ML entry (curated,
// keyed by id) wins if present; otherwise falls back to any
// auto-translated fields cached directly on the item itself
// (added via translateAndCache() when the item was created).
function localize(item, translationMap){
  const lang = getCurrentLang();
  if (lang !== "ml") return item;
  const seedTr = translationMap[item.id];
  if (seedTr) return Object.assign({}, item, seedTr);
  if (item._ml) return Object.assign({}, item, item._ml);
  return item;
}

/* ---------------------------------------------------------
   AUTO-TRANSLATE for newly added content
   New items created through addNewsItem()/addUpdateItem()/
   addAchievement() have no entry in the static SEED_*_ML maps,
   so their Malayalam text is fetched once (via the free
   MyMemory translation API) at creation time and cached on the
   item as `_ml` in localStorage. Later renders just reuse that
   cached translation — no repeat API calls, and it still works
   offline after the first fetch. If the request fails (e.g. no
   network), the item silently falls back to showing its
   original language text, same as before this feature existed.
   --------------------------------------------------------- */
async function translateText(text){
  if (!text) return "";
  try{
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|ml`
    );
    if (!res.ok) throw new Error("Translation request failed");
    const data = await res.json();
    const translated = data && data.responseData && data.responseData.translatedText;
    return translated || "";
  }catch(e){
    console.warn("Auto-translation unavailable, showing original text instead.", e);
    return "";
  }
}

// Translates the given fields of an item to Malayalam, caches
// them under item._ml in the given store (by id), and re-renders
// via the provided callback once done.
async function translateAndCache(id, fields, storageKey, rerender){
  const translatedEntries = await Promise.all(
    Object.entries(fields).map(async ([key, value]) => [key, await translateText(value)])
  );
  const ml = {};
  translatedEntries.forEach(([key, value]) => { if (value) ml[key] = value; });
  if (Object.keys(ml).length === 0) return;

  try{
    const raw = localStorage.getItem(storageKey);
    if (!raw) return;
    const items = JSON.parse(raw);
    const item = items.find(i => i.id === id);
    if (!item) return;
    item._ml = ml;
    localStorage.setItem(storageKey, JSON.stringify(items));
  }catch(e){
    console.warn("Could not cache auto-translation.", e);
    return;
  }

  rerender();
}

/* ---------------------------------------------------------
   Important Updates — placeholder content. Replace freely,
   or add more through addUpdateItem() (see bottom of file).
   priority: "urgent" | "notice"
   --------------------------------------------------------- */
const SEED_UPDATES = [
  {
    id: "u1",
    tag: "Deadline",
    title: "Property tax payment deadline extended to 31st August",
    detail: "Residents can now pay property tax without a late fee through the extended deadline. Payments can be made online or at the Panchayath office counter.",
    date: daysAgoISO(0),
    priority: "urgent"
  },
  {
    id: "u2",
    tag: "Office Notice",
    title: "Panchayath office closed on account of Onam holidays",
    detail: "The office will remain closed from the 5th to the 7th of the month for Onam. Emergency services can be reached via the WhatsApp complaint line.",
    date: daysAgoISO(1),
    priority: "notice"
  },
  {
    id: "u3",
    tag: "New Service",
    title: "Birth and death certificates now available online",
    detail: "Applications for birth and death certificates can now be submitted through the e-District Kerala portal, reducing the need for an office visit.",
    date: daysAgoISO(2),
    priority: "notice"
  },
  {
    id: "u4",
    tag: "Advisory",
    title: "Temporary water supply interruption on Thursday",
    detail: "Water supply will be interrupted between 10 AM and 2 PM on Thursday for routine pipeline maintenance in Wards 3 and 5.",
    date: daysAgoISO(3),
    priority: "urgent"
  }
];

/* ---------------------------------------------------------
   Achievements — placeholder content. Replace freely, or add
   more through addAchievement() (see bottom of file).
   --------------------------------------------------------- */
const SEED_ACHIEVEMENTS = [
  {
    id: "a1",
    year: "2025",
    title: "Best Panchayath Award — Sanitation & Waste Management",
    detail: "Recognised at the district level for the successful rollout of door-to-door waste collection and a working material collection facility."
  },
  {
    id: "a2",
    year: "2024",
    title: "100% LED streetlight conversion completed",
    detail: "All ward roads now run on energy-efficient LED lighting, cutting the Panchayath's power costs and improving night-time safety."
  },
  {
    id: "a3",
    year: "2024",
    title: "Full digital literacy coverage for Ward volunteers",
    detail: "Every ward now has trained Kudumbashree volunteers able to assist residents with e-District and KSMART online services."
  },
  {
    id: "a4",
    year: "2023",
    title: "Clean Water Award for the drinking water supply project",
    detail: "State-level recognition for expanding safe piped drinking water access to over 80% of Panchayath households."
  }
];

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

// Applies translations to every element tagged with data-i18n /
// data-i18n-placeholder, and re-renders any dynamically built
// content (news cards, updates, achievements) so their generated
// text (e.g. "Today", "3 days ago") switches too.
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
  // selected language too.
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
   NEWS STORAGE + LIFECYCLE
   ========================================================= */
function loadNews(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveNews(SEED_NEWS);
      return [...SEED_NEWS];
    }
    return JSON.parse(raw);
  }catch(e){
    console.warn("Could not read stored news, using seed data.", e);
    return [...SEED_NEWS];
  }
}

function saveNews(items){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }catch(e){
    console.warn("Could not save news to this browser.", e);
  }
}

// Removes anything older than ARCHIVE_LIFETIME_DAYS and returns what's left.
function purgeExpired(items){
  const cutoff = Date.now() - ARCHIVE_LIFETIME_DAYS * DAY_MS;
  return items.filter(item => new Date(item.date).getTime() >= cutoff);
}

function ageInDays(item){
  return Math.floor((Date.now() - new Date(item.date).getTime()) / DAY_MS);
}

// Adds a new story. Call this from a console or an admin tool later:
// addNewsItem({ title, summary, image })
function addNewsItem({ title, summary, image }){
  const items = loadNews();
  const id = "n" + Date.now();
  items.unshift({
    id,
    title, summary,
    image: image || "images/news-placeholder.jpg",
    date: new Date().toISOString()
  });
  saveNews(items);
  renderAllNews();

  // Fetch + cache the Malayalam version in the background so the
  // language toggle works on this item too, then re-render.
  translateAndCache(id, { title, summary }, STORAGE_KEY, renderAllNews);
}
window.addNewsItem = addNewsItem;

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

/* ---- Uniform news card (used in the scrollable "Latest" grid) ----
   Every card shares one fixed height (see .news-card in styles.css)
   with the title/summary clamped to a set number of lines, so all
   boxes in the grid are exactly the same size regardless of how
   long any individual story's text is. */
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

/* ---- Compact list row (used for the Old News archive) ---- */
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
  let items = purgeExpired(loadNews());
  saveNews(items);
  // newest first
  items = items.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  const latest = items.filter(i => ageInDays(i) < LATEST_WINDOW_DAYS);
  const old = items.filter(i => ageInDays(i) >= LATEST_WINDOW_DAYS);

  // Home tab: every "latest" story rendered as an identically-sized
  // card inside a scrollable panel, so 5-7 stories are all reachable
  // without the page growing taller.
  const latestGrid = document.getElementById("latestNewsGrid");
  const toShow = latest.slice(0, LATEST_DISPLAY_COUNT);

  latestGrid.innerHTML = toShow.map(i => newsCardHTML(localize(i, SEED_NEWS_ML), true)).join("");
  document.getElementById("latestEmptyState").hidden = toShow.length > 0;

  // Old News tab: full archive as a compact list.
  const oldGrid = document.getElementById("oldNewsGrid");
  oldGrid.innerHTML = old.map(i => newsListItemHTML(localize(i, SEED_NEWS_ML))).join("");
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
   HOME CAROUSEL — lightweight vanilla JS/CSS carousel with
   Bootstrap-style behavior (indicator dots, prev/next arrows,
   auto-rotate, pause on hover/touch). Slides are built from the
   same GALLERY_IMAGES used in the Gallery tab, so it stays in
   sync with whatever images/captions live there (including
   Malayalam captions when that language is active).
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
    // Semantic alt text describes the specific image for screen readers.
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
    startCarouselAutoplay(); // restart timer so manual nav doesn't fight autoplay
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

  // Pause on hover (mouse) and touch (mobile), resume on leave/end.
  carousel.addEventListener("mouseenter", stopCarouselAutoplay);
  carousel.addEventListener("mouseleave", startCarouselAutoplay);
  carousel.addEventListener("touchstart", stopCarouselAutoplay, { passive: true });
  carousel.addEventListener("touchend", startCarouselAutoplay, { passive: true });
}

/* ---------------------------------------------------------
   Important Updates — storage + rendering
   --------------------------------------------------------- */
const UPDATES_STORAGE_KEY = "cherukolConnectUpdates";

function loadUpdates(){
  try{
    const raw = localStorage.getItem(UPDATES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(UPDATES_STORAGE_KEY, JSON.stringify(SEED_UPDATES));
      return [...SEED_UPDATES];
    }
    return JSON.parse(raw);
  }catch(e){
    console.warn("Could not read stored updates, using seed data.", e);
    return [...SEED_UPDATES];
  }
}

function saveUpdates(items){
  try{
    localStorage.setItem(UPDATES_STORAGE_KEY, JSON.stringify(items));
  }catch(e){
    console.warn("Could not save updates to this browser.", e);
  }
}

// Adds a new update. Call from a console or an admin tool later:
// addUpdateItem({ tag, title, detail, priority }) — priority is "urgent" or "notice"
function addUpdateItem({ tag, title, detail, priority }){
  const items = loadUpdates();
  const id = "u" + Date.now();
  const finalTag = tag || "Notice";
  items.unshift({
    id,
    tag: finalTag,
    title, detail,
    date: new Date().toISOString(),
    priority: priority === "urgent" ? "urgent" : "notice"
  });
  saveUpdates(items);
  renderUpdates();

  translateAndCache(id, { tag: finalTag, title, detail }, UPDATES_STORAGE_KEY, renderUpdates);
}
window.addUpdateItem = addUpdateItem;

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
  const items = loadUpdates().slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  const grid = document.getElementById("updatesGrid");
  grid.innerHTML = items.map(i => updateItemHTML(localize(i, SEED_UPDATES_ML))).join("");
  document.getElementById("updatesEmptyState").hidden = items.length > 0;
}

/* ---------------------------------------------------------
   Achievements — storage + rendering
   --------------------------------------------------------- */
const ACHIEVEMENTS_STORAGE_KEY = "cherukolConnectAchievements";

function loadAchievements(){
  try{
    const raw = localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(SEED_ACHIEVEMENTS));
      return [...SEED_ACHIEVEMENTS];
    }
    return JSON.parse(raw);
  }catch(e){
    console.warn("Could not read stored achievements, using seed data.", e);
    return [...SEED_ACHIEVEMENTS];
  }
}

function saveAchievements(items){
  try{
    localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(items));
  }catch(e){
    console.warn("Could not save achievements to this browser.", e);
  }
}

// Adds a new achievement. Call from a console or an admin tool later:
// addAchievement({ year, title, detail })
function addAchievement({ year, title, detail }){
  const items = loadAchievements();
  const id = "a" + Date.now();
  items.unshift({
    id,
    year: year || String(new Date().getFullYear()),
    title, detail
  });
  saveAchievements(items);
  renderAchievements();

  translateAndCache(id, { title, detail }, ACHIEVEMENTS_STORAGE_KEY, renderAchievements);
}
window.addAchievement = addAchievement;

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
  const items = loadAchievements();
  const grid = document.getElementById("achievementsGrid");
  grid.innerHTML = items.map(i => achievementCardHTML(localize(i, SEED_ACHIEVEMENTS_ML))).join("");
  document.getElementById("achievementsEmptyState").hidden = items.length > 0;
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
   Tags <html data-breakpoint="sm|md|lg|xl"> on load/resize so
   you can visually confirm which breakpoint is active while
   testing the news grid (or anything else) in devtools.
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
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("todayDate").textContent = formatDate(new Date().toISOString());

  initNav();
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

  // Re-check for expired/aged-over stories once an hour, in case
  // the page is left open across a day boundary.
  setInterval(renderAllNews, 60 * 60 * 1000);
});
