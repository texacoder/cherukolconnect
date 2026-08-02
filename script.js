/* =========================================================
   CONFIG — edit these for your Panchayath
   ========================================================= */
// WhatsApp number that complaints are sent to, in international
// format with no + or spaces (country code + number).
const WHATSAPP_NUMBER = "919747787996"; // TODO: replace with the real office WhatsApp number

// Email address the contact form composes a message to.
const CONTACT_EMAIL = "cherukolegp@gmail.com"; // TODO: replace with real email

// A story counts as "latest" for this many days, then moves to Old News.
const LATEST_WINDOW_DAYS = 7;
// A story is removed completely this many days after it was published.
const ARCHIVE_LIFETIME_DAYS = 30;

// How many of the freshest stories to show in the scrollable
// "Latest from your Panchayath" grid on the home page.
const LATEST_DISPLAY_COUNT = 7;

// District the home page's live rain/weather alert banner watches.
// A row in the WeatherAlert sheet tab only triggers the banner when
// its "district" column contains this text (case-insensitive).
const WEATHER_ALERT_DISTRICT = "Pathanamthitta";

/* =========================================================
   CONTENT SOURCE — Google Sheets
   =========================================================
   The client edits five tabs in one Google Sheet (News,
   Updates, Achievements, WeatherAlert, HomeSlider). Each tab
   is published to the web as CSV and fetched here on every
   page load, so every visitor sees the same content — no
   login, no admin panel, no code.

   SETUP (do this once):
   1. Create a Google Sheet with tabs named exactly:
      News | Updates | Achievements | WeatherAlert | HomeSlider
      (see README-FOR-CLIENT.md for the exact column headers
      each tab needs, and a template link.)
   2. File -> Share -> Publish to web -> choose each individual
      sheet/tab (not "Entire document") -> CSV -> Publish.
   3. Copy the CSV link Google gives you for each tab and paste
      it below, replacing the placeholder URLs.
   4. That's it. The client only ever touches the Sheet again.

   WeatherAlert tab columns:
     district, level, headline_en, headline_ml, detail_en,
     detail_ml, updated
   - district: e.g. "Pathanamthitta" (only rows matching
     WEATHER_ALERT_DISTRICT above are ever shown).
   - level: red | orange | yellow (anything else, or a blank
     row, means no alert is shown for that district).
   - headline/detail: optional; if left blank the banner falls
     back to a generic "<Level> issued for <district> district"
     line built from the i18n strings below.
   - updated: free text, e.g. "1 Aug, 9:40 AM" — shown as-is so
     visitors can see how fresh the alert is.
   To raise, change, or clear the alert, the client just edits
   that one row in the Sheet — the home page picks it up
   automatically on its next refresh (every SHEET_REFRESH_MS,
   currently 5 minutes), no redeploy needed.

   HomeSlider tab columns:
     id, image, caption_en, caption_ml
   - image: a public image URL (e.g. a Google Drive "anyone with
     the link can view" image link, or any hosted image URL).
   - caption_en / caption_ml: optional captions shown under the
     slide.
   This is the ONLY source for the home page's sliding image
   carousel now — it no longer reuses the Gallery tab's photos
   (GALLERY_IMAGES below), so the client can curate a short,
   separate set of slides for the home page without it affecting
   the full Photo Gallery page.
   ========================================================= */
const SHEET_CSV = {
  news:         "https://docs.google.com/spreadsheets/d/e/2PACX-1vSJK5YMcn6VV8MIAAbqJqBNBPedOqanyVx2eZPvmA9L3AZ-B0BcMFmLAJ9QISg7lr_DIze9N_JRt0u1/pub?gid=0&single=true&output=csv",
  updates:      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSJK5YMcn6VV8MIAAbqJqBNBPedOqanyVx2eZPvmA9L3AZ-B0BcMFmLAJ9QISg7lr_DIze9N_JRt0u1/pub?gid=2101454905&single=true&output=csv",
  achievements: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSJK5YMcn6VV8MIAAbqJqBNBPedOqanyVx2eZPvmA9L3AZ-B0BcMFmLAJ9QISg7lr_DIze9N_JRt0u1/pub?gid=735728458&single=true&output=csv",
  weatherAlert: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSJK5YMcn6VV8MIAAbqJqBNBPedOqanyVx2eZPvmA9L3AZ-B0BcMFmLAJ9QISg7lr_DIze9N_JRt0u1/pub?gid=2024229532&single=true&output=csv", // TODO: add a "WeatherAlert" tab to the Sheet, publish it to web as CSV, and paste its link here
  homeSlider:   "https://docs.google.com/spreadsheets/d/e/2PACX-1vSJK5YMcn6VV8MIAAbqJqBNBPedOqanyVx2eZPvmA9L3AZ-B0BcMFmLAJ9QISg7lr_DIze9N_JRt0u1/pub?gid=1904233165&single=true&output=csv" // TODO: add a "HomeSlider" tab to the Sheet, publish it to web as CSV, and paste its link here
};

// How often (in ms) to re-fetch the Sheet while the site is open,
// so a change the client makes shows up for visitors already
// browsing without them needing to refresh. 5 minutes is a
// reasonable balance between freshness and not hammering Google.
// This is also how often the live weather-alert banner re-checks.
const SHEET_REFRESH_MS = 5 * 60 * 1000;

const DAY_MS = 24 * 60 * 60 * 1000;

/* =========================================================
   GALLERY — static images shown in the Gallery tab (the full
   Photo Gallery page only). Not sourced from the Sheet; edit
   this array directly to change the photos on display there.
   NOTE: these are no longer used for the home page carousel —
   that now comes entirely from the HomeSlider Sheet tab above.
   ========================================================= */
const GALLERY_IMAGES = [
  { src: "rain.jpg",  caption: "" },
  { src: "electricity.jpg",    caption: "" },
  { src: "rain1.jpg",  caption: "" },
  { src: "rain2.jpg",  caption: "" },
  { src: "rain3.jpg",  caption: "" },
  { src: "rain4.jpg",  caption: "" },
  { src: "rain5.jpg",  caption: "" },
  { src: "p1.jpg",  caption: "" },
  { src: "p2.jpg",  caption: "" },
  { src: "p3.jpg",  caption: "" },
  { src: "p4.jpg",  caption: "" }
];

const GALLERY_CAPTIONS_ML = {
  "rain.jpg": "",
  "electricity.jpg": "",
  "cherukolrain.jpg": ""
};

/* =========================================================
   HELP DESK — quick-dial contacts shown on the home page.
   Not sourced from the Sheet; edit these arrays directly to
   change names/numbers. `key` points at an i18n string below
   so each entry has an English + Malayalam label out of the
   box; `phone` is a plain 10-digit number (no spaces/+91).
   `icon` picks the badge glyph, `color` picks the badge/accent
   colour (see the .helpdesk-* classes in styles.css).
   ========================================================= */
const HELP_DESK_CONTACTS = [
  { key: "helpdesk.president",          phone: "9747787996", icon: "person",    color: "green"  },
  { key: "helpdesk.vicePresident",      phone: "9447421293", icon: "person",    color: "orange" },
  { key: "helpdesk.secretary",          phone: "9495301223", icon: "pen",       color: "blue"   },
  { key: "helpdesk.assistantSecretary", phone: "9539123495", icon: "person",    color: "purple" },
  { key: "helpdesk.seniorClerk",        phone: "9495383970", icon: "clipboard", color: "brown"  }
];

const HELP_DESK_WARD_MEMBERS = [
  { key: "helpdesk.ward1", phone: "9447116372", icon: "group", color: "green" },
  { key: "helpdesk.ward2", phone: "8590648211", icon: "group", color: "pink"  },
  { key: "helpdesk.ward3", phone: "9847296107", icon: "group", color: "blue"  }
];

/* =========================================================
   EMERGENCY CONTACTS — district / taluk / forest division
   control room numbers shown in the home page's "Emergency
   Contacts" section (below Help Desk). Not sourced from the
   Sheet; edit these directly to change names/numbers.
   Sourced from the district's printed control-room poster.

   - EMERGENCY_DEOC: the single district Collectorate Control
     Room banner at the top, with its EN/ML label and one or
     more numbers (landline, toll-free, mobile) each rendered
     as its own tap-to-call chip.
   - EMERGENCY_TEOC: one row per Taluk Control Room, rendered
     with the same card style as Help Desk (`color` picks the
     badge/accent colour from the .helpdesk-* classes).
   - EMERGENCY_FOREST: Forest Division control rooms.
   `phone` can be a landline (with STD code, e.g. "0468 2222221"),
   a toll-free number (e.g. "1077"), or a 10-digit mobile number —
   the tel: link is built appropriately for each in script below.
   ========================================================= */
const EMERGENCY_DEOC = {
  name: "Collectorate Control Room (DEOC)",
  nameML: "കളക്ടറേറ്റ് കൺട്രോൾ റും (DEOC)",
  numbers: ["04682 322515", "1077", "+91 80788 08915"]
};

const EMERGENCY_TEOC = [
  { name: "Kozhencherry Control Room", nameML: "കോഴഞ്ചേരി കൺട്രോൾ റും", phone: "0468 2222221", icon: "person", color: "blue"   },
  { name: "Mallappally Control Room",  nameML: "മല്ലപ്പള്ളി കൺട്രോൾ റും", phone: "0469 2682293", icon: "person", color: "orange" },
  { name: "Adoor Control Room",        nameML: "അടൂർ കൺട്രോൾ റും",       phone: "04734 224826",  icon: "person", color: "purple" },
  { name: "Ranni Control Room",        nameML: "റാന്നി കൺട്രോൾ റും",     phone: "04735 227442",  icon: "person", color: "brown"  },
  { name: "Thiruvalla Control Room",   nameML: "തിരുവല്ല കൺട്രോൾ റും",   phone: "0469 2601303",  icon: "person", color: "pink"   },
  { name: "Konni Control Room",        nameML: "കോന്നി കൺട്രോൾ റും",     phone: "0468 2240087",  icon: "person", color: "blue"   }
];

const EMERGENCY_FOREST = [
  { name: "Forest Division Control Room — Ranni", nameML: "ഫോറസ്റ്റ് ഡിവിഷൻ കൺട്രോൾ റും — റാന്നി", phone: "9188407515", icon: "group", color: "green" },
  { name: "Forest Division Control Room — Konni", nameML: "ഫോറസ്റ്റ് ഡിവിഷൻ കൺട്രോൾ റും — കോന്നി", phone: "9188407513", icon: "group", color: "green" }
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
    "home.sub": "News and announcements from the last seven days. Scroll the list below to see everything at a glance — older stories move to the Old News page and clear out 30 days after publishing.",
    "home.emptyPre": "No fresh updates right now — check back soon, or browse",

    "updates.eyebrow": "Notices & Circulars",
    "updates.title": "Important Updates",
    "updates.sub": "Deadlines, office notices, and announcements that need your attention.",
    "updates.empty": "No important updates at the moment.",

    "achievements.eyebrow": "Milestones",
    "achievements.title": "Achievements",
    "achievements.sub": "Projects completed and recognitions earned by the Panchayath. ",
    "achievements.empty": "No achievements listed yet.",

    "oldnews.eyebrow": "Archive",
    "oldnews.sub": "Stories older than seven days live here for 30days from their publish date, then they're cleared automatically.",
    "oldnews.empty": "Nothing in the archive at the moment.",

    "gallery.eyebrow": "Around the Panchayath",
    "gallery.title": "Photo Gallery",
    "gallery.sub": "Capturing cherukole panchayat's initiatives,emergency response,community events,and public services.",

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
    "contact.address": "Cherukole, Pathanamthitta, Kerala – 689650",
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
    "carousel.goTo": "Go to slide",
    "card.readMore": "Read more",
    "card.close": "Close",

    "helpdesk.eyebrow": "Quick Contacts",
    "helpdesk.title": "Help Desk",
    "helpdesk.sub": "Reach out directly to Panchayath officials and ward members — tap a card to call.",
    "helpdesk.wardHeading": "Ward Members",
    "helpdesk.president": "President",
    "helpdesk.vicePresident": "Vice President",
    "helpdesk.secretary": "Secretary",
    "helpdesk.assistantSecretary": "Assistant Secretary",
    "helpdesk.seniorClerk": "Senior Clerk",
    "helpdesk.ward1": "Ward 1 Member",
    "helpdesk.ward2": "Ward 2 Member",
    "helpdesk.ward3": "Ward 3 Member",

    "emergency.eyebrow": "In Case of Emergency",
    "emergency.title": "Emergency Contacts",
    "emergency.sub": "District, Taluk, and Forest Division control room numbers for Pathanamthitta.",
    "emergency.deocTitle": "Collectorate Control Room (DEOC)",
    "emergency.teocHeading": "Taluk Control Rooms (TEOC)",
    "emergency.forestHeading": "Forest Division Control Room",

    "weatherAlert.level.red": "Red Alert",
    "weatherAlert.level.orange": "Orange Alert",
    "weatherAlert.level.yellow": "Yellow Alert",
    "weatherAlert.defaultHeadline": "{level} issued for Pathanamthitta district",
    "weatherAlert.updated": "Updated:"
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
    "home.sub": "കഴിഞ്ഞ ഏഴ് ദിവസത്തെ വാർത്തകളും അറിയിപ്പുകളും. താഴെയുള്ള ലിസ്റ്റ് സ്ക്രോൾ ചെയ്ത് എല്ലാം ഒറ്റനോട്ടത്തിൽ കാണുക — പഴയ വാർത്തകൾ 'പഴയ വാർത്തകൾ' പേജിലേക്ക് മാറുകയും പ്രസിദ്ധീകരിച്ച് 30 ദിവസ ശേഷം നീക്കം ചെയ്യപ്പെടുകയും ചെയ്യും.",
    "home.emptyPre": "ഇപ്പോൾ പുതിയ അപ്ഡേറ്റുകൾ ഇല്ല — ഉടൻ വീണ്ടും പരിശോധിക്കുക, അല്ലെങ്കിൽ കാണുക",

    "updates.eyebrow": "അറിയിപ്പുകളും സർക്കുലറുകളും",
    "updates.title": "പ്രധാന അറിയിപ്പുകൾ",
    "updates.sub": "നിങ്ങളുടെ ശ്രദ്ധ ആവശ്യമുള്ള അവസാന തീയതികൾ, ഓഫീസ് അറിയിപ്പുകൾ, പ്രഖ്യാപനങ്ങൾ.",
    "updates.empty": "ഇപ്പോൾ പ്രധാന അറിയിപ്പുകളൊന്നുമില്ല.",

    "achievements.eyebrow": "നാഴികക്കല്ലുകൾ",
    "achievements.title": "നേട്ടങ്ങൾ",
    "achievements.sub": "പഞ്ചായത്ത് പൂർത്തിയാക്കിയ പദ്ധതികളും നേടിയ അംഗീകാരങ്ങളും.",
    "achievements.empty": "ഇതുവരെ നേട്ടങ്ങളൊന്നും പട്ടികപ്പെടുത്തിയിട്ടില്ല.",

    "oldnews.eyebrow": "ആർക്കൈവ്",
    "oldnews.sub": "ഏഴ് ദിവസത്തിൽ കൂടുതൽ പഴക്കമുള്ള വാർത്തകൾ പ്രസിദ്ധീകരിച്ച തീയതി മുതൽ 30 ദിവസ  ഇവിടെ ലഭ്യമാണ്, അതിനുശേഷം അവ സ്വയമേവ നീക്കം ചെയ്യപ്പെടും.",
    "oldnews.empty": "ഇപ്പോൾ ആർക്കൈവിൽ ഒന്നുമില്ല.",

    "gallery.eyebrow": "പഞ്ചായത്തിന് ചുറ്റും",
    "gallery.title": "ഫോട്ടോ ഗാലറി",
    "gallery.sub": "ചെറുകോൾ പഞ്ചായത്തിന്റെ പദ്ധതികൾ, അടിയന്തര പ്രതികരണ പ്രവർത്തനങ്ങൾ, സമൂഹ പരിപാടികൾ, പൊതുസേവനങ്ങൾ എന്നിവ രേഖപ്പെടുത്തുന്നു.",

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
    "contact.address": "ചെറുകോൽ, പത്തനംതിട്ട, കേരളം – 689650",
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
    "carousel.goTo": "സ്ലൈഡിലേക്ക് പോകുക",
    "card.readMore": "കൂടുതൽ വായിക്കുക",
    "card.close": "അടയ്ക്കുക",

    "helpdesk.eyebrow": "പെട്ടെന്നുള്ള ബന്ധപ്പെടൽ",
    "helpdesk.title": "ഹെൽപ്പ് ഡെസ്ക്",
    "helpdesk.sub": "പഞ്ചായത്ത് ഉദ്യോഗസ്ഥരുമായും വാർഡ് അംഗങ്ങളുമായും നേരിട്ട് ബന്ധപ്പെടുക — വിളിക്കാൻ കാർഡിൽ ടാപ്പ് ചെയ്യുക.",
    "helpdesk.wardHeading": "വാർഡ് അംഗങ്ങൾ",
    "helpdesk.president": "പ്രസിഡന്റ്",
    "helpdesk.vicePresident": "വൈസ് പ്രസിഡന്റ്",
    "helpdesk.secretary": "സെക്രട്ടറി",
    "helpdesk.assistantSecretary": "അസിസ്റ്റന്റ് സെക്രട്ടറി",
    "helpdesk.seniorClerk": "സീനിയർ ക്ലാർക്ക്",
    "helpdesk.ward1": "വാർഡ് 1 മെമ്പർ",
    "helpdesk.ward2": "വാർഡ് 2 മെമ്പർ",
    "helpdesk.ward3": "വാർഡ് 3 മെമ്പർ",

    "emergency.eyebrow": "അടിയന്തര ഘട്ടങ്ങളിൽ",
    "emergency.title": "അടിയന്തര നമ്പറുകൾ",
    "emergency.sub": "പത്തനംതിട്ട ജില്ലയിലെ ജില്ലാ, താലൂക്ക്, ഫോറസ്റ്റ് ഡിവിഷൻ കൺട്രോൾ റും നമ്പറുകൾ.",
    "emergency.deocTitle": "കളക്ടറേറ്റ് കൺട്രോൾ റും (DEOC)",
    "emergency.teocHeading": "താലൂക്ക് കൺട്രോൾ റും (TEOC)",
    "emergency.forestHeading": "ഫോറസ്റ്റ് ഡിവിഷൻ കൺട്രോൾ റും",

    "weatherAlert.level.red": "റെഡ് അലേർട്ട്",
    "weatherAlert.level.orange": "ഓറഞ്ച് അലേർട്ട്",
    "weatherAlert.level.yellow": "യെല്ലോ അലേർട്ട്",
    "weatherAlert.defaultHeadline": "പത്തനംതിട്ട ജില്ലയിൽ {level} പ്രഖ്യാപിച്ചു",
    "weatherAlert.updated": "പുതുക്കിയത്:"
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
  renderHelpDesk();
  renderEmergencyContacts();
  renderWeatherAlert();
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

// Valid alert levels, most severe first. Anything else in the
// Sheet's "level" column (blank, "green", "none", a typo, ...)
// is treated as "no active alert" for that row.
const WEATHER_ALERT_LEVELS = ["red", "orange", "yellow"];

function rowToWeatherAlertItem(row, i){
  return {
    id: row.id || ("sheet-w" + i),
    district: row.district || "",
    level: (row.level || "").trim().toLowerCase(),
    headline: row.headline_en || row.headline || "",
    detail: row.detail_en || row.detail || "",
    updated: row.updated || "",
    _ml: {
      headline: row.headline_ml || "",
      detail: row.detail_ml || ""
    }
  };
}

// Home page slider — sourced from the "HomeSlider" Sheet tab.
// Each row is one slide: an image URL plus an optional caption.
function rowToHomeSliderItem(row, i){
  return {
    id: row.id || ("sheet-h" + i),
    image: row.image || "",
    caption: row.caption_en || row.caption || "",
    _ml: {
      caption: row.caption_ml || ""
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
let weatherAlertCache = [];
let homeSliderCache = [];

// Tracks which news card is currently expanded (blog-style
// read-more), keyed by item id, so it survives re-renders
// triggered by language switches or Sheet refreshes.
// NOTE: only used by the Old News list now — the home page
// "Latest" cards open a full article page in a new tab instead.
let expandedNewsId = null;

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
async function loadWeatherAlertFromSheet(){
  const rows = await fetchSheet(SHEET_CSV.weatherAlert);
  if (rows) weatherAlertCache = rows.map(rowToWeatherAlertItem).filter(i => i.district);
}
async function loadHomeSliderFromSheet(){
  const rows = await fetchSheet(SHEET_CSV.homeSlider);
  if (rows) homeSliderCache = rows.map(rowToHomeSliderItem).filter(i => i.image);
}

async function refreshAllFromSheet(){
  await Promise.all([
    loadNewsFromSheet(),
    loadUpdatesFromSheet(),
    loadAchievementsFromSheet(),
    loadWeatherAlertFromSheet(),
    loadHomeSliderFromSheet()
  ]);
  renderAllNews();
  renderUpdates();
  renderAchievements();
  renderWeatherAlert();
  renderCarousel();
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

/* ---------------------------------------------------------
   Blog-style expand/collapse for a news card's summary.
   Still used by the Old News archive list: clicking a title
   (or its read-more/close button) toggles an inline panel
   open with the full summary text, instead of navigating away.
   Only one card is expanded at a time.
   --------------------------------------------------------- */
function toggleNewsExpand(id){
  expandedNewsId = (expandedNewsId === id) ? null : id;
  renderAllNews();

  // Scroll the opened card into view within the scroll panel.
  if (expandedNewsId){
    requestAnimationFrame(() => {
      const el = document.querySelector(`.news-card[data-id="${CSS.escape(id)}"]`);
      if (el) el.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
  }
}
window.toggleNewsExpand = toggleNewsExpand;

/* ---------------------------------------------------------
   Home page "Latest" cards: opens the full article on its own
   real page (article.html?id=...) in a new browser tab. This is
   a genuine URL — not a Blob URL — so it works when shared: the
   article page fetches the same News Google Sheet on load and
   renders the matching story on whatever device opens the link.
   The current language is passed along so the article opens in
   the same language the visitor was reading in.
   --------------------------------------------------------- */
function openNewsArticle(id){
  const lang = getCurrentLang();
  const url = `article.html?id=${encodeURIComponent(id)}&lang=${encodeURIComponent(lang)}`;
  window.open(url, "_blank", "noopener");
}
window.openNewsArticle = openNewsArticle;

function newsCardHTML(item, isFresh){
  // Home page "Latest" cards (isFresh === true) open the full
  // article in a new tab. Old News list items (isFresh === false,
  // rendered via newsListItemHTML below) keep the inline expand.
  return `
    <article class="news-card" data-id="${escapeHTML(item.id)}">
      <div class="news-card-img">
        <img src="${item.image}" alt="" loading="lazy"
             onerror="this.parentElement.innerHTML = placeholderSVG();">
      </div>
      <div class="news-card-body">
        <div class="news-card-meta">
          <span class="pill ${isFresh ? "pill-fresh" : ""}">${isFresh ? t("card.latest") : t("card.archive")}</span>
          <span>${ageLabelFor(item)}</span>
        </div>
        <h3 class="news-card-title" role="button" tabindex="0"
            onclick="openNewsArticle('${item.id}')"
            onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openNewsArticle('${item.id}');}">
          ${escapeHTML(item.title)}
        </h3>
        <p>${escapeHTML(item.summary)}</p>
        <button type="button" class="news-readmore" onclick="openNewsArticle('${item.id}')">
          ${t("card.readMore")}
        </button>
        <div class="news-card-footer">${formatDate(item.date)}</div>
      </div>
    </article>`;
}

function newsListItemHTML(item){
  const isOpen = expandedNewsId === item.id;
  return `
    <article class="news-list-item ${isOpen ? "is-open" : ""}" data-id="${escapeHTML(item.id)}">
      <div class="news-list-thumb">
        <img src="${item.image}" alt="" loading="lazy"
             onerror="this.parentElement.innerHTML = placeholderSVG();">
      </div>
      <div class="news-list-body">
        <h3 class="news-card-title" role="button" tabindex="0" aria-expanded="${isOpen}"
            onclick="toggleNewsExpand('${item.id}')"
            onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleNewsExpand('${item.id}');}">
          ${escapeHTML(item.title)}
        </h3>
        <p class="${isOpen ? "news-card-summary-full" : ""}">${escapeHTML(item.summary)}</p>
        <button type="button" class="news-readmore" onclick="toggleNewsExpand('${item.id}')">
          ${isOpen ? t("card.close") : t("card.readMore")}
        </button>
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
   HOME CAROUSEL
   =========================================================
   Now sourced entirely from homeSliderCache (the "HomeSlider"
   Sheet tab), not from GALLERY_IMAGES — so the client controls
   the home page slides independently from the full Photo
   Gallery page by editing that one Sheet tab.
   ========================================================= */
const CAROUSEL_INTERVAL_MS = 4500;
let carouselIndex = 0;
let carouselTimer = null;

function renderCarousel(){
  const track = document.getElementById("carouselTrack");
  const dotsWrap = document.getElementById("carouselDots");
  if (!track || !dotsWrap) return;

  const slides = homeSliderCache.map(localize);

  track.innerHTML = slides.map(item => {
    const caption = item.caption || "";
    return `
      <div class="carousel-slide">
        <img src="${item.image}" alt="${escapeHTML(caption)}" loading="lazy"
             onerror="this.parentElement.innerHTML = placeholderSVG() + '<div class=\\'carousel-caption\\'>${escapeHTML(caption)}</div>';">
        <div class="carousel-caption">${escapeHTML(caption)}</div>
      </div>`;
  }).join("");

  dotsWrap.innerHTML = slides.map((img, i) => `
    <button type="button" class="carousel-dot" role="tab" data-index="${i}"
      aria-label="${t("carousel.goTo")} ${i + 1}" aria-selected="${i === carouselIndex}"></button>
  `).join("");

  updateCarouselPosition();
}

function updateCarouselPosition(){
  const track = document.getElementById("carouselTrack");
  if (!track) return;
  const count = homeSliderCache.length;
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
  if (homeSliderCache.length <= 1) return;
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

/* ---------------------------------------------------------
   LIVE RAIN / WEATHER ALERT — home page banner.
   Reads from weatherAlertCache (the WeatherAlert Sheet tab),
   keeps only rows whose district matches WEATHER_ALERT_DISTRICT
   and whose level is one of WEATHER_ALERT_LEVELS, and shows the
   most severe match. Hides itself entirely when there's nothing
   active. Called on initial render, on every Sheet refresh
   (SHEET_REFRESH_MS), and on language switch — so it behaves
   like a live, auto-updating alert without a page reload.
   --------------------------------------------------------- */
function renderWeatherAlert(){
  const banner = document.getElementById("weatherAlertBanner");
  if (!banner) return;

  const match = weatherAlertCache
    .filter(a => a.district.toLowerCase().includes(WEATHER_ALERT_DISTRICT.toLowerCase()))
    .filter(a => WEATHER_ALERT_LEVELS.includes(a.level))
    .sort((a, b) => WEATHER_ALERT_LEVELS.indexOf(a.level) - WEATHER_ALERT_LEVELS.indexOf(b.level))[0];

  if (!match){
    banner.hidden = true;
    banner.className = "weather-alert-banner";
    return;
  }

  const item = localize(match);
  const levelLabel = t("weatherAlert.level." + match.level);
  const defaultHeadline = t("weatherAlert.defaultHeadline").replace("{level}", levelLabel);

  banner.hidden = false;
  banner.className = `weather-alert-banner level-${match.level}`;
  document.getElementById("weatherAlertHeadline").textContent = item.headline || defaultHeadline;
  document.getElementById("weatherAlertDetail").textContent = item.detail || "";
  document.getElementById("weatherAlertUpdated").textContent =
    match.updated ? `${t("weatherAlert.updated")} ${match.updated}` : "";
}

/* ---------------------------------------------------------
   Help Desk — quick-dial contact cards (rendering)
   Static data (HELP_DESK_CONTACTS / HELP_DESK_WARD_MEMBERS
   above), not from the Sheet. Icons are picked per-entry via
   the `icon` field; colours via the `color` field, matching
   the .helpdesk-* classes in styles.css.
   --------------------------------------------------------- */
function helpDeskPersonIconSVG(){
  return `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 21c0-4 3.8-6.5 8-6.5s8 2.5 8 6.5"/>
  </svg>`;
}
function helpDeskPenIconSVG(){
  return `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M12 20h9"/>
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>
  </svg>`;
}
function helpDeskClipboardIconSVG(){
  return `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="6" y="4" width="12" height="17" rx="2"/>
    <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1"/>
    <path d="M9 11h6M9 15h6"/>
  </svg>`;
}
function helpDeskGroupIconSVG(){
  return `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="9" cy="8" r="3"/>
    <path d="M2 20c0-3.3 3.1-5 7-5s7 1.7 7 5"/>
    <circle cx="17.5" cy="9" r="2.3"/>
    <path d="M15.6 13.1c2.7.4 4.9 1.9 4.9 4"/>
  </svg>`;
}
function helpDeskPhoneIconSVG(){
  return `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8.1 9.6a16 16 0 0 0 6 6l1.1-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z"/>
  </svg>`;
}

function helpDeskIconFor(type){
  switch(type){
    case "pen": return helpDeskPenIconSVG();
    case "clipboard": return helpDeskClipboardIconSVG();
    case "group": return helpDeskGroupIconSVG();
    default: return helpDeskPersonIconSVG();
  }
}

// Displays a 10-digit number as "XXXXX XXXXX" for readability.
function formatHelpDeskPhone(phone){
  const digits = phone.replace(/\D/g, "");
  if (digits.length !== 10) return phone;
  return digits.slice(0, 5) + " " + digits.slice(5);
}

function helpDeskItemHTML(contact){
  const name = escapeHTML(t(contact.key));
  const digits = contact.phone.replace(/\D/g, "");
  return `
    <a class="helpdesk-item helpdesk-${contact.color}" href="tel:+91${digits}">
      <span class="helpdesk-icon">${helpDeskIconFor(contact.icon)}</span>
      <span class="helpdesk-name">${name}</span>
      <span class="helpdesk-phone">${helpDeskPhoneIconSVG()}${formatHelpDeskPhone(contact.phone)}</span>
    </a>`;
}

function renderHelpDesk(){
  const grid = document.getElementById("helpDeskGrid");
  const wardGrid = document.getElementById("helpDeskWardGrid");
  if (grid) grid.innerHTML = HELP_DESK_CONTACTS.map(helpDeskItemHTML).join("");
  if (wardGrid) wardGrid.innerHTML = HELP_DESK_WARD_MEMBERS.map(helpDeskItemHTML).join("");
}

/* ---------------------------------------------------------
   Emergency Contacts — rendering.
   Static data (EMERGENCY_DEOC / EMERGENCY_TEOC /
   EMERGENCY_FOREST above), not from the Sheet. TEOC and
   Forest rows reuse the same .helpdesk-item card markup as
   the Help Desk section above (so both look consistent);
   the DEOC district number gets its own red banner with one
   tap-to-call chip per number, since it can list more than
   a single phone number (landline, toll-free, mobile).
   --------------------------------------------------------- */

// Builds a tel: href from a raw phone string, handling landlines
// (STD code, e.g. "0468 2222221"), toll-free numbers (e.g. "1077"),
// and mobile numbers (10-digit, or already prefixed with +91).
function toTelHref(phone){
  const trimmed = phone.trim();
  const digits = trimmed.replace(/[^\d+]/g, "");
  if (trimmed.startsWith("+")) return `tel:${digits}`;
  if (digits.length === 10) return `tel:+91${digits}`;
  return `tel:${digits}`;
}

function emergencyDeocItemHTML(contact){
  const name = escapeHTML(t(contact.key));
  const digits = contact.phone.replace(/\D/g, "");
  return `
    <a class="helpdesk-item helpdesk-${contact.color}" href="tel:+91${digits}">
      <span class="helpdesk-icon">${helpDeskIconFor(contact.icon)}</span>
      <span class="helpdesk-name">${name}</span>
      <span class="helpdesk-phone">${helpDeskPhoneIconSVG()}${formatHelpDeskPhone(contact.phone)}</span>
    </a>`;
}

// TEOC/Forest rows have inline name/phone (not an i18n `key` like
// Help Desk), with a separate Malayalam string in `nameML`.
function emergencyRowHTML(row){
  const lang = getCurrentLang();
  const name = escapeHTML(lang === "ml" && row.nameML ? row.nameML : row.name);
  return `
    <a class="helpdesk-item helpdesk-${row.color}" href="${toTelHref(row.phone)}">
      <span class="helpdesk-icon">${helpDeskIconFor(row.icon)}</span>
      <span class="helpdesk-name">${name}</span>
      <span class="helpdesk-phone">${helpDeskPhoneIconSVG()}${escapeHTML(row.phone)}</span>
    </a>`;
}

function emergencyDeocHTML(){
  const lang = getCurrentLang();
  const title = escapeHTML(t("emergency.deocTitle"));
  const numbersHTML = EMERGENCY_DEOC.numbers.map(num => `
    <a href="${toTelHref(num)}">${helpDeskPhoneIconSVG()}${escapeHTML(num)}</a>
  `).join("");
  return `
    <p class="emergency-deoc-title">${title}</p>
    <div class="emergency-deoc-numbers">${numbersHTML}</div>`;
}

function renderEmergencyContacts(){
  const deocEl = document.getElementById("emergencyDeoc");
  const teocGrid = document.getElementById("emergencyTeocGrid");
  const forestGrid = document.getElementById("emergencyForestGrid");
  if (deocEl) deocEl.innerHTML = emergencyDeocHTML();
  if (teocGrid) teocGrid.innerHTML = EMERGENCY_TEOC.map(emergencyRowHTML).join("");
  if (forestGrid) forestGrid.innerHTML = EMERGENCY_FOREST.map(emergencyRowHTML).join("");
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
  renderHelpDesk();
  renderEmergencyContacts();
  renderWeatherAlert();
  initCarousel();
  initComplaintForm();
  initContactForm();
  updateBreakpointAttr();
  initLangToggle();

  window.addEventListener("resize", updateBreakpointAttr);

  // Pull real content from the Google Sheet (falls back silently
  // to an empty list if not configured yet or unreachable).
  await refreshAllFromSheet();
  startCarouselAutoplay();

  // Keep content fresh for anyone who leaves a tab open, and
  // re-check the two-day/one-week aging windows periodically.
  // This is also what makes the weather-alert banner "live" —
  // it re-checks the WeatherAlert sheet on the same cycle.
  setInterval(refreshAllFromSheet, SHEET_REFRESH_MS);
});
