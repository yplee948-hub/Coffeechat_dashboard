#!/usr/bin/env node
/**
 * Sync SharePoint / OneDrive Excel tracker into public/data/
 *
 * Usage:
 *   npm run sync:tracker -- "/path/to/AmbassadorCoffeeChat.xlsx"
 *   TRACKER_PATH="/path/to/file.xlsx" npm run sync:tracker
 *
 * If you sync the SharePoint file via OneDrive, point TRACKER_PATH at the
 * local synced copy — it updates automatically when Excel saves.
 */

import { copyFileSync, existsSync, mkdirSync } from 'fs'
import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const outDir = join(root, 'public', 'data')

const source =
  process.argv[2] ||
  process.env.TRACKER_PATH ||
  process.env.SHAREPOINT_LOCAL_PATH

if (!source) {
  console.error(`
Missing tracker file path.

Options:
  1. npm run sync:tracker -- "/Users/you/OneDrive/.../CoffeeChat.xlsx"
  2. TRACKER_PATH="/path/to/file.xlsx" npm run sync:tracker

SharePoint link (requires UW login — cannot download headless):
  https://uwnetid-my.sharepoint.com/:x:/g/personal/msti_uw_edu/ETpJ7eJ5fX5MhYk6FkmtnZwBw1IwHy7RyB_GEPDntEYpAw

Tip: If the workbook is in your OneDrive sync folder, use that local path.
`)
  process.exit(1)
}

const abs = resolve(source)
if (!existsSync(abs)) {
  console.error(`File not found: ${abs}`)
  process.exit(1)
}

mkdirSync(outDir, { recursive: true })

const ext = abs.toLowerCase().endsWith('.xlsx') ? '.xlsx' : '.csv'
const dest = join(outDir, `tracker${ext}`)

copyFileSync(abs, dest)
console.log(`Synced ${abs}`)
console.log(`  → ${dest}`)
console.log('Restart dev server or click Refresh in the dashboard.')
