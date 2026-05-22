# Connecting to the SharePoint Excel Tracker

SharePoint URL:
https://uwnetid-my.sharepoint.com/:x:/g/personal/msti_uw_edu/ETpJ7eJ5fX5MhYk6FkmtnZwBw1IwHy7RyB_GEPDntEYpAw?e=7SNNoE

The dashboard cannot read this file directly without **UW NetID authentication** (the link returns HTTP 401 for unauthenticated requests). Use one of the options below.

## Option 1: OneDrive sync (recommended)

If the workbook syncs to your Mac via OneDrive:

```bash
# Find the local path in Finder → right-click file → "Copy as Pathname"
npm run sync:tracker -- "/Users/you/Library/CloudStorage/OneDrive-UW/.../AmbassadorCoffeeChat.xlsx"
```

Set `TRACKER_PATH` in `.env.local` (optional) and re-run sync whenever Excel updates:

```bash
TRACKER_PATH="/path/to/synced/file.xlsx" npm run sync:tracker
```

Then click **Refresh** in the dashboard (or restart `npm run dev`).

## Option 2: Manual export from SharePoint

1. Open the SharePoint link in your browser (sign in with UW NetID).
2. **File → Save As → Download a Copy** (`.xlsx`) or **Download as CSV**.
3. Place the file at:
   - `public/data/tracker.xlsx` (preferred), or
   - `public/data/tracker.csv`
4. Click **Refresh** in the dashboard header banner.

## Option 3: Scheduled sync script

Add to cron or run after editing Excel:

```bash
npm run sync:tracker -- "$TRACKER_PATH"
```

## Data the dashboard reads

The parser maps your current tracker columns:

| Excel column | Dashboard field |
|--------------|-----------------|
| Added Time | Request date |
| Name (First, Last) | Prospect |
| Who do you want to connect with? | Request type (normalized) |
| Preferred Contact Method | Contact method (normalized) |
| Responsible Ambassador | Owner |
| Assigned alumni/student | Assigned ambassador |
| Email sent (`v` = Yes) | Intro email sent |

**Not yet in the export:** Intro Email Sent Date, Feedback Form Sent/Received — add these per the PRD to unlock feedback-due KPIs.

## Option 4: Microsoft Graph API (future)

For live reads without manual export, register an Azure app with `Files.Read` / `Sites.Read.All`, sign in as an MSTI manager, and call Graph to download the workbook. This requires IT approval and is not included in the MVP.

## Verify connection

When connected, the banner shows:

> Connected to **/data/tracker.csv** · 83 requests · updated 2:45 PM

If you see an error, confirm `public/data/tracker.xlsx` or `tracker.csv` exists and is valid.
