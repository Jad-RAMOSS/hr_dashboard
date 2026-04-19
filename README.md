# 📊 HR Attendance Analytics Dashboard - Automated Edition

This dashboard is now fully automated. Whenever you update the Excel file and push it to GitHub, the dashboard will automatically update and redeploy.

## 🚀 How to Update the Dashboard with New Data

This is the easiest way to keep your dashboard up-to-date:

1. **Prepare your Excel file:**
   - Make sure your new data is in an `.xlsx` file.
   - Keep the column names consistent (e.g., "Code", "Name", "DEPT", etc.).
   - You can name the file anything (e.g., `Q2_Report.xlsx`).

2. **Upload to GitHub:**
   - Go to your repository on GitHub.
   - Delete the old `.xlsx` file and upload your new one (OR just upload it with a new name).
   - Commit the changes.

3. **Automatic Magic:**
   - GitHub Actions will detect the new file.
   - It will automatically run the conversion script to update the data.
   - It will rebuild the dashboard and deploy it to **GitHub Pages**.

## 🛠️ Technical Details

### Automated Pipeline
- **Script:** `scripts/process-excel.cjs` handles mapping Arabic Excel headers to the dashboard's internal format.
- **Workflow:** `.github/workflows/deploy.yml` manages the entire build and deploy process on every push.
- **Base Path:** Configured in `vite.config.js` to work perfectly with GitHub repository subfolders.

### Local Development (If needed)
If you want to run it on your computer:
1. `npm install`
2. `npm run process` (to convert the current Excel file in the root)
3. `npm run dev` (to start the preview)

## 📊 Features
- **Dynamic Data:** No more hardcoded data in the code.
- **Arabic/English Toggle:** Switch between languages instantly.
- **Interactive Deep-Dive:** Click on departments or employees for detailed breakdowns.
- **Automatic Deployment:** Professional-grade CI/CD pipeline.
