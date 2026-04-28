import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell, LabelList, PieChart, Pie, Legend
} from "recharts";
import DATA from "./data.json";

const EMPLOYEES = DATA.employees;
const PERIOD = DATA.period;

const COLORS = {
  work: "#34D399",
  inc_hrs: "#60A5FA",
  early_hrs: "#818CF8",
  no_sig: "#FCD34D",
  late_hrs: "#F87171",
  total_leave: "#C084FC",
  reg: "#3B82F6",
  sick: "#C084FC",
  off_hol: "#10B981",
  mat: "#F43F5E",
  bal_total: "#F472B6",
  bal_reg: "#F472B6",
  bal_emerg: "#EC4899",
  bal_2025: "#DB2777"
};

const DEPT_NAMES = [...new Set(EMPLOYEES.map(e => e.dept))];
const DEPTS = DEPT_NAMES.map(d => {
  const emps = EMPLOYEES.filter(e => e.dept === d);
  const totalWork = emps.reduce((s, e) => s + e.work, 0);
  return {
    name: d, count: emps.length,
    work: totalWork,
    avg_work: emps.length > 0 ? parseFloat((totalWork / emps.length).toFixed(1)) : 0,
    no_sig: emps.reduce((s, e) => s + e.no_sig, 0),
    total_leave: emps.reduce((s, e) => s + e.total_leave, 0),
    bal_total: emps.reduce((s, e) => s + e.bal_total, 0),
    reg: emps.reduce((s, e) => s + e.reg, 0),
    sick: emps.reduce((s, e) => s + e.sick, 0),
    off_hol: emps.reduce((s, e) => s + e.off_hol, 0),
    mat: emps.reduce((s, e) => s + e.mat, 0),
  };
});

const EMPLOYEES_ENHANCED = EMPLOYEES.map(e => {
  const d = DEPTS.find(dept => dept.name === e.dept);
  return { ...e, avg_work: d ? d.avg_work : 0 };
});

const TRANSLATIONS = {
  ar: {
    title: "لوحة تحليلات الحضور — Damen", langBtn: "English",
    work: "أيام العمل الفعلية", avgWork: "متوسط أيام العمل", inc_hrs: "عدم اكتمال الساعات", early_hrs: "الانصراف المبكر",
    no_sig: "عدم الأمضاء", late_hrs: "ساعات التأخير",
    total_leave: "إجمالي الأجازات", bal_total: "الرصيد المتبقي",
    reg: "اعتيادي", sick: "مرضي", off_hol: "رسمية", mat: "وضع",
    bal_reg: "رصيد اعتيادي", bal_emerg: "رصيد عارضة", bal_2025: "رصيد 2025",
    depts: "الأقسام", employees: "موظف", top10: "أعلى 10 موظفين",
    days: "يوم", hours: "ساعة", dept: "قسم", pos: "وظيفة", code: "كود",
    leaveBreakdown: "تفاصيل الأجازات", balBreakdown: "تفاصيل الرصيد",
    deptDeepDive: "تفاصيل القسم", distribution: "توزيع الأيام",
    avgWorkFull: "متوسط أيام العمل للقسم", from: "من", to: "إلى"
  },
  en: {
    title: "Attendance Analytics — Damen", langBtn: "العربية",
    work: "Actual Work Days", avgWork: "Dept. Avg Work Days", inc_hrs: "Incomplete Hours", early_hrs: "Early Departure",
    no_sig: "Missing Signatures", late_hrs: "Delay Hours",
    total_leave: "Total Leaves", bal_total: "Remaining Balance",
    reg: "Regular", sick: "Sick", off_hol: "Official", mat: "Maternity",
    bal_reg: "Regular Balance", bal_emerg: "Emergency Balance", bal_2025: "2025 Balance",
    depts: "Departments", employees: "Employees", top10: "Top 10 Employees",
    days: "Days", hours: "Hrs", dept: "Dept", pos: "Pos", code: "Code",
    leaveBreakdown: "Leave Breakdown", balBreakdown: "Balance Breakdown",
    deptDeepDive: "Department Details", distribution: "Days Distribution",
    avgWorkFull: "Dept. Avg Work Days", from: "From", to: "To"
  }
};

const TABS = [
  { id: "work", key: "work", color: COLORS.work, unit: "days" },
  { id: "avgWork", key: "avg_work", color: COLORS.work, unit: "days" },
  { id: "inc_hrs", key: "inc_hrs", color: COLORS.inc_hrs, unit: "hours" },
  { id: "early_hrs", key: "early_hrs", color: COLORS.early_hrs, unit: "hours" },
  { id: "no_sig", key: "no_sig", color: COLORS.no_sig, unit: "days" },
  { id: "late_hrs", key: "late_hrs", color: COLORS.late_hrs, unit: "hours" },
  { id: "total_leave", key: "total_leave", color: COLORS.total_leave, unit: "days", sub: ["reg", "sick", "off_hol", "mat"], breakdownKey: "leaveBreakdown" },
  { id: "bal_total", key: "bal_total", color: COLORS.bal_total, unit: "days", sub: ["bal_reg", "bal_emerg", "bal_2025"], breakdownKey: "balBreakdown" },
];

function parseTime(val) {
  if (typeof val === "number") return val;
  if (typeof val === "string" && val.includes(":")) {
    const [h, m] = val.split(":").map(Number);
    return h + (m / 60);
  }
  return parseFloat(val) || 0;
}

function ProgressItem({ label, value, unit, color, max, hasSub, isOpen }) {
  const isTime = typeof value === "string" && value.includes(":");
  let pct = 0;
  if (!isTime) pct = Math.min((value / (max || 100)) * 100, 100);
  else { const h = parseTime(value); pct = Math.min((h / 40) * 100, 100); }

  return (
    <div style={{ marginBottom: 12, width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, alignItems: "center" }}>
        <span style={{ color: "#94A3B8", fontSize: 12, fontWeight: 500 }}>
          {label} {hasSub && <span style={{fontSize:10, opacity:0.6}}>{isOpen ? "▼" : "▶"}</span>}
        </span>
        <span style={{ color, fontSize: 14, fontWeight: 800 }}>
          {value} <span style={{ fontSize: 10, opacity: 0.8 }}>{unit}</span>
        </span>
      </div>
      <div style={{ height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 10, boxShadow: `0 0 8px ${color}44` }} />
      </div>
    </div>
  );
}

function ProfilePie({ data, t }) {
  const slices = [
    { name: t.work,      value: parseTime(data.work),      fill: COLORS.work },
    { name: t.reg,       value: parseTime(data.reg),       fill: COLORS.reg },
    { name: t.sick,      value: parseTime(data.sick),      fill: COLORS.sick },
    { name: t.off_hol,   value: parseTime(data.off_hol),   fill: COLORS.off_hol },
    { name: t.mat,       value: parseTime(data.mat),       fill: COLORS.mat },
  ].filter(s => s.value > 0);

  if (slices.length === 0) return null;

  return (
    <div style={{ height: 200, marginTop: 10 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={slices} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5}>
            {slices.map((s, i) => <Cell key={i} fill={s.fill} />)}
          </Pie>
          <Tooltip contentStyle={{background:"#0f172a", border:"none", borderRadius:10, fontSize:11}} />
          <Legend iconType="circle" wrapperStyle={{fontSize:9}} layout="horizontal" verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function EmployeeModal({ emp, onClose, lang, t }) {
  const [openSub, setOpenSub] = useState(null);
  const maxVal = Math.max(...TABS.map(tab => parseTime(emp[tab.key])), 10);

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, width: "100%", maxWidth: 480, padding: 24, direction: lang === "ar" ? "rtl" : "ltr", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <h2 style={{ margin: 0, color: "#F8FAFC", fontSize: 18 }}>{emp.name}</h2>
            <p style={{ margin: "2px 0 0", color: "#94A3B8", fontSize: 12 }}>{emp.pos} • {emp.dept}</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#64748B", cursor: "pointer", fontSize: 20 }}>✕</button>
        </div>

        <div style={{ maxHeight: "70vh", overflowY: "auto", paddingRight: lang === "ar" ? 0 : 10, paddingLeft: lang === "ar" ? 10 : 0 }}>
          <ProfilePie data={emp} t={t} />
          {TABS.map(tab => (
            <div key={tab.id}>
              <div onClick={() => tab.sub && setOpenSub(openSub === tab.id ? null : tab.id)} style={{ cursor: tab.sub ? "pointer" : "default" }}>
                <ProgressItem label={t[tab.id]} value={emp[tab.key]} unit={t[tab.unit]} color={tab.color} max={maxVal} hasSub={!!tab.sub} isOpen={openSub === tab.id} />
              </div>
              {tab.sub && openSub === tab.id && (
                <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 12, padding: "12px 16px", marginBottom: 12, marginTop: -8 }}>
                  <p style={{ margin: "0 0 10px", fontSize: 11, color: "#64748B", fontWeight: 700 }}>{t[tab.breakdownKey]}</p>
                  {tab.sub.map(sk => (
                    <div key={sk} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
                      <span style={{ color: "#94A3B8" }}>{t[sk]}</span>
                      <span style={{ color: COLORS[sk] || "#E2E8F0", fontWeight: 700 }}>{emp[sk]} {t.days}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DeptModal({ deptName, onClose, lang, t, tabId }) {
  const d = DEPTS.find(x => x.name === deptName);
  const tab = TABS.find(x => x.id === tabId);
  const emps = EMPLOYEES_ENHANCED.filter(e => e.dept === deptName).sort((a,b) => parseTime(b[tab.key]) - parseTime(a[tab.key]));
  const [selEmp, setSelEmp] = useState(null);

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 900, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, width: "100%", maxWidth: 600, padding: 24, direction: lang === "ar" ? "rtl" : "ltr", height: "85vh", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 15 }}>
          <div>
            <h2 style={{ margin: 0, color: "#F8FAFC", fontSize: 20 }}>{deptName}</h2>
            <div style={{ display: "flex", gap: 12, marginTop: 5 }}>
              <span style={{ color: "#94A3B8", fontSize: 12 }}>{d.count} {t.employees}</span>
              <span style={{ color: COLORS.work, fontSize: 12, fontWeight: 700 }}>{t.avgWorkFull}: {d.avg_work}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#64748B", cursor: "pointer", fontSize: 20 }}>✕</button>
        </div>

        <div style={{ overflowY: "auto", flex: 1, paddingRight: lang === "ar" ? 0 : 10, paddingLeft: lang === "ar" ? 10 : 0 }}>
          <ProfilePie data={d} t={t} />
          <h3 style={{fontSize:14, color:"#94A3B8", marginBottom:12, marginTop: 20}}>{t.employees}</h3>
          {emps.map(emp => (
            <div key={emp.code} onClick={() => setSelEmp(emp)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: 16, background: "rgba(255,255,255,0.02)", marginBottom: 8, cursor: "pointer", border: "1px solid transparent" }} onMouseEnter={e => e.currentTarget.style.borderColor = tab.color} onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{emp.name}</div>
                <div style={{ fontSize: 10, color: "#64748B" }}>{emp.pos}</div>
              </div>
              <div style={{ color: tab.color, fontWeight: 800 }}>{emp[tab.key]}</div>
            </div>
          ))}
        </div>
      </div>
      {selEmp && <EmployeeModal emp={selEmp} lang={lang} t={t} onClose={() => setSelEmp(null)} />}
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("ar");
  const [tabId, setTabId] = useState("work");
  const [selEmp, setSelEmp] = useState(null);
  const [selDept, setSelDept] = useState(null);
  const t = TRANSLATIONS[lang];
  const tab = TABS.find(x => x.id === tabId);

  const sortedEmps = [...EMPLOYEES_ENHANCED].sort((a, b) => parseTime(b[tab.key]) - parseTime(a[tab.key])).slice(0, 10);
  const sortedDepts = [...DEPTS].sort((a, b) => b[tab.key] - a[tab.key]);

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", direction: lang === "ar" ? "rtl" : "ltr", fontFamily: "'Cairo', sans-serif", color: "#F1F5F9" }}>
      <header style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1e293b" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>D</div>
          <div>
            <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>{t.title}</h1>
            <p style={{ margin: 0, fontSize: 10, color: "#94A3B8" }}>{PERIOD.quarter} • {PERIOD.start} - {PERIOD.end}</p>
          </div>
        </div>
        <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", padding: "8px 16px", borderRadius: 10, cursor: "pointer", fontWeight: 700 }}>{t.langBtn}</button>
      </header>

      <nav style={{ display: "flex", gap: 8, padding: "12px 24px", overflowX: "auto", background: "rgba(30,41,59,0.5)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        {TABS.map(item => (
          <button key={item.id} onClick={() => setTabId(item.id)} style={{ padding: "8px 16px", borderRadius: 12, border: `1px solid ${tabId === item.id ? item.color : "transparent"}`, background: tabId === item.id ? `${item.color}22` : "transparent", color: tabId === item.id ? item.color : "#64748B", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>{t[item.id]}</button>
        ))}
      </nav>

      <main style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 24 }}>
          
          {tabId !== "avgWork" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ background: "#1e293b", borderRadius: 24, padding: 24, border: "1px solid rgba(255,255,255,0.05)" }}>
                <h3 style={{ margin: "0 0 20px", color: "#94A3B8", fontSize: 15 }}>{t.top10} - {t[tabId]}</h3>
                {sortedEmps.map(emp => (
                  <div key={emp.code} onClick={() => setSelEmp(emp)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: 16, background: "rgba(255,255,255,0.02)", marginBottom: 8, cursor: "pointer", border: "1px solid transparent" }} onMouseEnter={e => e.currentTarget.style.borderColor = tab.color} onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{emp.name}</div>
                      <div style={{ fontSize: 10, color: "#64748B" }}>{emp.dept}</div>
                    </div>
                    <div style={{ color: tab.color, fontWeight: 800 }}>{emp[tab.key]}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ background: "#1e293b", borderRadius: 24, padding: 24, border: "1px solid rgba(255,255,255,0.05)", maxHeight: 800, overflowY: "auto" }}>
            <h3 style={{ margin: "0 0 20px", color: "#94A3B8", fontSize: 15 }}>{t.depts}</h3>
            {sortedDepts.map(d => (
              <div key={d.name} onClick={() => setSelDept(d.name)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: 16, background: "rgba(255,255,255,0.02)", marginBottom: 8, cursor: "pointer", border: "1px solid transparent" }} onMouseEnter={e => e.currentTarget.style.borderColor = tab.color} onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{d.name}</div>
                  <div style={{ fontSize: 11, color: "#64748B" }}>{d.count} {t.employees}</div>
                </div>
                <div style={{ color: tab.color, fontWeight: 800 }}>{tabId === "work" ? d.work : Math.round(parseTime(d[tab.key]) * 10) / 10}</div>
              </div>
            ))}
          </div>

        </div>
      </main>

      {selEmp && <EmployeeModal emp={selEmp} lang={lang} t={t} onClose={() => setSelEmp(null)} />}
      {selDept && <DeptModal deptName={selDept} lang={lang} t={t} tabId={tabId} onClose={() => setSelDept(null)} />}
    </div>
  );
}
