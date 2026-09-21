# Editing Cherukole Connect — Guide for the Panchayath Office

Six things on the website — News, Important Updates, Achievements, the
weather alert banner, the home page photo slider, and the Help Desk
contact cards — are all controlled from **one Google Sheet**. Nobody
needs to touch code or log into anything to change them: edit a row in
the Sheet, and the live site picks it up automatically within 5 minutes.

This only needs to be set up once.

## One-time setup

1. Create a new Google Sheet.
2. Rename the six tabs at the bottom (or create them) to exactly:
   `News`, `Updates`, `Achievements`, `WeatherAlert`, `HomeSlider`, `HelpDesk`
3. In the first row of each tab, type the column headers exactly as
   listed below for that tab (spelling and underscores matter — the
   website reads them literally).
4. For each tab: **File → Share → Publish to web** → under "Link",
   choose that one sheet/tab from the dropdown (not "Entire Document")
   → format **Comma-separated values (.csv)** → **Publish**.
5. Copy the link Google gives you.
6. Send the six links to whoever maintains the website — they get
   pasted into the `SHEET_CSV` block near the top of `script.js`,
   replacing the placeholder for that tab. That's the only code change
   ever needed; after this, the office only edits the Sheet.

Leaving a tab's link as the placeholder just means that section stays
empty/hidden on the site — nothing breaks.

## Column headers, tab by tab

Every `_en` / `_ml` pair is English / Malayalam. Leaving a `_ml` column
blank just falls back to the English text — never leave the whole row
blank if you want it to show at all.

### News
| id | title_en | title_ml | summary_en | summary_ml | image | date |
|----|----------|----------|------------|------------|-------|------|
A story shows on the home page's "Latest" list for 7 days, then moves
to "Old News" for a further 23 days (30 total), then disappears.
- `id`: anything unique, e.g. `n1`, `n2` — used for the shareable article link.
- `image`: a public image URL (a Google Drive "anyone with the link"
  image link works, or any hosted image URL).
- `date`: any format Google recognizes, e.g. `2026-09-21`.

### Updates
| id | tag_en | tag_ml | title_en | title_ml | detail_en | detail_ml | date | priority |
|----|--------|--------|----------|----------|-----------|-----------|------|----------|
- `priority`: type `urgent` to highlight it in red; anything else (or
  blank) shows as a normal notice.

### Achievements
| id | year | title_en | title_ml | detail_en | detail_ml |
|----|------|----------|----------|-----------|-----------|

### WeatherAlert
| id | district | level | headline_en | headline_ml | detail_en | detail_ml | updated |
|----|----------|-------|--------------|--------------|-----------|-----------|---------|
- Only a row whose `district` matches the district configured in
  `script.js` (`WEATHER_ALERT_DISTRICT`, currently "Pathanamthitta")
  is ever shown.
- `level`: `red`, `orange`, or `yellow`. Anything else (or blank)
  means no alert shows for that row.
- Leave `headline`/`detail` blank to fall back to a generic
  "X Alert issued for [district] district" line.
- To clear an active alert, just change its `level` to blank.

### HomeSlider
| id | image | caption_en | caption_ml |
|----|-------|------------|------------|
The rotating photo banner at the top of the home page. Add a few rows
to build a slideshow; captions are optional. This is separate from the
full Photo Gallery page (which is still edited directly in code).

### HelpDesk
| id | name_en | name_ml | role_en | role_ml | phone | group | color |
|----|---------|---------|---------|---------|-------|-------|-------|
The "Help Desk" quick-dial cards on the home page (President,
Secretary, ward members, etc.).
- `phone`: a 10-digit mobile number, or a landline with STD code
  (e.g. `0468 2222221`) — either becomes a tap-to-call link.
- `group`: type `ward` to list the row under "Ward Members" instead of
  the main Help Desk grid; leave blank for everyone else.
- `color` (optional): one of `blue`, `teal`, `purple`, `brown`, `pink`,
  `green`. Leave blank and the site picks one automatically.
- This whole section is hidden on the site until this tab has at
  least one row — so it's safe to leave empty until it's ready.
- **Got the wrong or an outdated number listed today?** Just add/edit
  the row here — no developer needed.

## Other things that are edited directly in code (not the Sheet)

These change rarely enough that they live in the code instead:
- **Photo Gallery page** images — `GALLERY_IMAGES` in `script.js`.
- **WhatsApp number** complaints are sent to, and the **contact email**
  — `WHATSAPP_NUMBER` / `CONTACT_EMAIL` at the top of `script.js`.
- Office address/hours on the Contact page — in `index.html` and the
  `contact.*` translations in `script.js`.

If any of those need to change, send the new details to whoever
maintains the site.
