const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');

// 1. Process Date Range
let period = { start: "N/A", end: "N/A" };
const dateFile = path.join(ROOT_DIR, 'date_range.txt');
if (fs.existsSync(dateFile)) {
  const content = fs.readFileSync(dateFile, 'utf8');
  const startMatch = content.match(/start_date:\s*(.*)/);
  const endMatch = content.match(/end_date:\s*(.*)/);
  if (startMatch) period.start = startMatch[1].trim();
  if (endMatch) period.end = endMatch[1].trim();
}

// 2. Find and Process Excel
const files = fs.readdirSync(ROOT_DIR);
const excelFile = files.find(f => f.endsWith('.xlsx') && !f.startsWith('~$'));

if (!excelFile) {
  console.error("❌ No Excel file found in the root directory.");
  process.exit(1);
}

console.log(`📂 Processing: ${excelFile}`);

const workbook = XLSX.readFile(path.join(ROOT_DIR, excelFile));
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const rawData = XLSX.utils.sheet_to_json(worksheet);

const mapping = {
  'Code': 'code',
  'Name': 'name',
  'DEPT': 'dept',
  'Position': 'pos',
  'أيام العمل الفعليه': 'work',
  ' عدم أكتمال ساعات العمل بالساعات': 'inc_hrs',
  'ساعات الأنصراف المبكر': 'early_hrs',
  'عدد عدم الأمضاء': 'no_sig',
  'غياب بدون أذن': 'abs',
  'ساعات التأخير': 'late_hrs',
  'اجازة من الرصيد ': 'reg',
  'اجازة مرضي': 'sick',
  'اجازات رسمية': 'off_hol',
  'اجازة وضع': 'mat',
  'إجمالى الاجازات': 'total_leave',
  'رصيد الاعتيادى': 'bal_reg',
  'رصيد العارضة': 'bal_emerg',
  'رصيد 2025': 'bal_2025',
  'اجمالى الرصيد المتبقي': 'bal_total'
};

const processedEmployees = rawData.map(row => {
  const newRow = {};
  for (const [arabic, english] of Object.entries(mapping)) {
    let value = row[arabic];
    if (['code', 'work', 'no_sig', 'abs', 'reg', 'sick', 'off_hol', 'mat', 'total_leave', 'bal_reg', 'bal_emerg', 'bal_2025', 'bal_total'].includes(english)) {
      value = parseFloat(value) || 0;
    }
    newRow[english] = value;
  }
  return newRow;
});

// 3. Save combined output to src/data.json
const output = {
  period,
  employees: processedEmployees
};

fs.writeFileSync(path.join(SRC_DIR, 'data.json'), JSON.stringify(output, null, 2));

console.log(`✅ Successfully updated src/data.json.`);
console.log(`📅 Period: ${period.start} to ${period.end}`);
console.log(`👤 Employees: ${processedEmployees.length}`);
