# HR Attendance Analytics Dashboard - Q1 Report

This dashboard provides a comprehensive visual analysis of employee attendance and leave for Q1 2026. It is built using **React** and **Recharts**.

## ✨ Latest Updates
- **New Data Columns:** Added support for:
  - Hours of Incomplete Work (عدم اكتمال الساعات)
  - Early Departure Hours (الانصراف المبكر)
  - Missing Signatures (عدم الأمضاء)
  - Delay Hours (ساعات التأخير)
  - Vacation Balances (رصيد 2025، الرصيد المتبقي)
- **UI Bug Fixes:** Fixed a scrolling issue on the main page to allow viewing long lists of departments and employees.
- **Improved Responsiveness:** Better layout for different screen sizes.

## 🚀 Deployment Guide

### Easiest Way: Netlify Drop (No code needed)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the **`deploy`** folder from this project onto the browser page.
3. Your dashboard is now online!

### Professional Way: Vercel (via GitHub)
1. Upload the contents of the `deploy` folder to a new GitHub repository.
2. Connect the repository to [Vercel](https://vercel.com).
3. Vercel will automatically build and deploy your project.

## 💻 Local Development

1. **Install Node.js:** Download from [nodejs.org](https://nodejs.org/).
2. **Navigate to Deploy Folder:**
   ```bash
   cd deploy
   ```
3. **Install Dependencies:**
   ```bash
   npm install
   ```
4. **Start Development Server:**
   ```bash
   npm run dev
   ```

---

## 📊 Features
- **Interactive Rankings:** Filter by Work Days, Absenteeism, Missing Signatures, and more.
- **Department Deep-Dive:** Click any department to see its full breakdown and employee list.
- **Employee Profiles:** Click any employee to view their specific attendance charts and leave balances.
- **RTL Support:** Full Arabic language support with the Cairo font for a professional look.

## 📊 Data Source
The data is sourced from `q1 report.xlsx` and automatically processed into the React components.
