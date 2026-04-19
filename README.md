# 📊 HR Attendance Analytics Dashboard - Automated Edition

This dashboard is now fully automated. Whenever you update the Excel file or the configuration and push to GitHub, the dashboard will automatically update and redeploy.

## 🚀 How to Update the Dashboard

### 1. Update the Period (Quarter & Dates)
Edit the `config.json` file in the root directory:
```json
{
  "start_date": "2025-12-26",
  "end_date": "2026-04-15",
  "quarter": "Q1"
}
```
- **start_date / end_date:** Use any format you like; it will be displayed exactly as written.
- **quarter:** Enter Q1, Q2, Q3, or Q4.

### 2. Update the Data (Excel)
1. Prepare your data in an `.xlsx` file.
2. Ensure column names like "Code", "Name", and "DEPT" remain the same.
3. Replace the old `.xlsx` file with your new one.

### 3. Push to GitHub
Commit your changes and push:
```bash
git add .
git commit -m "Update for new quarter"
git push origin main
```
**GitHub Actions** will then automatically process the data and update your live site!

## 🛠️ Technical Details
- **Data Processor:** `scripts/process-excel.cjs` reads `config.json` and your Excel file to generate `src/data.json`.
- **Deployment:** Uses GitHub Actions (`.github/workflows/deploy.yml`) to build and host on GitHub Pages.
