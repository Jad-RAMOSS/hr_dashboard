import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell, LabelList, PieChart, Pie, Legend
} from "recharts";
import DATA from "./data.json";

const EMPLOYEES = DATA.employees;
const PERIOD = DATA.period;

const DEPT_NAMES = [...new Set(EMPLOYEES.map(e => e.dept))];
const DEPTS = DEPT_NAMES.map(d => {
  const emps = EMPLOYEES.filter(e => e.dept === d);
  return {
    name: d, count: emps.length,
    work: emps.reduce((s, e) => s + e.work, 0),
    abs: emps.reduce((s, e) => s + e.abs, 0),
    no_sig: emps.reduce((s, e) => s + e.no_sig, 0),
    total_leave: emps.reduce((s, e) => s + e.total_leave, 0),
    bal_total: emps.reduce((s, e) => s + e.bal_total, 0),
    reg: emps.reduce((s, e) => s + e.reg, 0),
    sick: emps.reduce((s, e) => s + e.sick, 0),
    off_hol: emps.reduce((s, e) => s + e.off_hol, 0),
    mat: emps.reduce((s, e) => s + e.mat, 0),
  };
});

const TRANSLATIONS = {
  ar: {
    title: "لوحة تحليلات الحضور — Damen", langBtn: "English",
    work: "أيام العمل الفعلية", inc_hrs: "عدم اكتمال الساعات", early_hrs: "الانصراف المبكر",
    no_sig: "عدم الأمضاء", abs: "غياب بدون أذن", late_hrs: "ساعات التأخير",
    total_leave: "إجمالي الأجازات", bal_total: "الرصيد المتبقي",
    reg: "اعتيادي", sick: "مرضي", off_hol: "رسمية", mat: "وضع",
    bal_reg: "رصيد اعتيادي", bal_emerg: "رصيد عارضة", bal_2025: "رصيد 2025",
    depts: "الأقسام", employees: "موظف", top10: "أعلى 10 موظفين",
    days: "يوم", hours: "ساعة", dept: "قسم", pos: "وظيفة", code: "كود",
    leaveBreakdown: "تفاصيل الأجازات", balBreakdown: "تفاصيل الرصيد",
    deptDeepDive: "تفاصيل القسم", distribution: "توزيع الأيام",
    from: "من", to: "إلى", report: "تقرير"
  },
  en: {
    title: "Attendance Analytics — Damen", langBtn: "العربية",
    work: "Actual Work Days", inc_hrs: "Incomplete Hours", early_hrs: "Early Departure",
    no_sig: "Missing Signatures", abs: "Unexcused Absence", late_hrs: "Delay Hours",
    total_leave: "Total Leaves", bal_total: "Remaining Balance",
    reg: "Regular", sick: "Sick", off_hol: "Official", mat: "Maternity",
    bal_reg: "Regular Balance", bal_emerg: "Emergency Balance", bal_2025: "2025 Balance",
    depts: "Departments", employees: "Employees", top10: "Top 10 Employees",
    days: "Days", hours: "Hrs", dept: "Dept", pos: "Pos", code: "Code",
    leaveBreakdown: "Leave Breakdown", balBreakdown: "Balance Breakdown",
    deptDeepDive: "Department Details", distribution: "Days Distribution",
    from: "From", to: "To", report: "Report"
  }
};

const TABS = [
  { id: "work", key: "work", color: "#34D399", unit: "days" },
  { id: "inc_hrs", key: "inc_hrs", color: "#60A5FA", unit: "hours" },
  { id: "early_hrs", key: "early_hrs", color: "#818CF8", unit: "hours" },
  { id: "no_sig", key: "no_sig", color: "#FCD34D", unit: "days" },
  { id: "abs", key: "abs", color: "#FB7185", unit: "days" },
  { id: "late_hrs", key: "late_hrs", color: "#F87171", unit: "hours" },
  { id: "total_leave", key: "total_leave", color: "#C084FC", unit: "days", sub: ["reg", "sick", "off_hol", "mat"], breakdownKey: "leaveBreakdown" },
  { id: "bal_total", key: "bal_total", color: "#F472B6", unit: "days", sub: ["bal_reg", "bal_emerg", "bal_2025"], breakdownKey: "balBreakdown" },
];

function ProgressItem({ label, value, unit, color, max, hasSub, isOpen }) {
  const isTime = typeof value === "string" && value.includes(":");
  let pct = 0;
  if (!isTime) pct = Math.min((value / (max || 100)) * 100, 100);
  else { const [h] = value.split(":").map(Number); pct = Math.min((h / 40) * 100, 100); }

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
    { name: t.reg, value: data.reg, fill: "#60A5FA" },
    { name: t.sick, value: data.sick, fill: "#C084FC" },
    { name: t.off_hol, value: data.off_hol, fill: "#34D399" },
    { name: t.abs, value: data.abs, fill: "#FB7185" },
  ].filter(s => s.value > 0);

  if (slices.length === 0) return null;

  return (
    <div style={{ height: 180, marginTop: 10 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={slices} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5}>
            {slices.map((s, i) => <Cell key={i} fill={s.fill} />)}
          </Pie>
          <Tooltip contentStyle={{background:"#0f172a", border:"none", borderRadius:10, fontSize:12}} />
          <Legend iconType="circle" wrapperStyle={{fontSize:10}} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function EmployeeModal({ emp, onClose, lang, t }) {
  const [openSub, setOpenSub] = useState(null);
  const maxVal = Math.max(...TABS.map(tab => typeof emp[tab.key] === "number" ? emp[tab.key] : 0), 10);

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
                      <span style={{ color: "#E2E8F0", fontWeight: 700 }}>{emp[sk]} {t.days}</span>
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
  const emps = EMPLOYEES.filter(e => e.dept === deptName).sort((a,b) => {
    const valA = typeof a[tab.key] === "string" && a[tab.key].includes(":") ? parseFloat(a[tab.key].replace(":", ".")) : a[tab.key];
    const valB = typeof b[tab.key] === "string" && b[tab.key].includes(":") ? parseFloat(b[tab.key].replace(":", ".")) : b[tab.key];
    return valB - valA;
  });
  const [selEmp, setSelEmp] = useState(null);

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 900, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, width: "100%", maxWidth: 600, padding: 24, direction: lang === "ar" ? "rtl" : "ltr", height: "85vh", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <h2 style={{ margin: 0, color: "#F8FAFC", fontSize: 20 }}>{deptName}</h2>
            <p style={{ margin: "2px 0 0", color: "#94A3B8", fontSize: 12 }}>{d.count} {t.employees}</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#64748B", cursor: "pointer", fontSize: 20 }}>✕</button>
        </div>

        <div style={{ overflowY: "auto", flex: 1, paddingRight: lang === "ar" ? 0 : 10, paddingLeft: lang === "ar" ? 10 : 0 }}>
          <ProfilePie data={d} t={t} />
          <h3 style={{fontSize:14, color:"#94A3B8", marginBottom:12}}>{t.employees}</h3>
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

  const sortedEmps = [...EMPLOYEES].sort((a, b) => {
    const valA = typeof a[tab.key] === "string" && a[tab.key].includes(":") ? parseFloat(a[tab.key].replace(":", ".")) : a[tab.key];
    const valB = typeof b[tab.key] === "string" && b[tab.key].includes(":") ? parseFloat(b[tab.key].replace(":", ".")) : b[tab.key];
    return valB - valA;
  }).slice(0, 10);

  const chartData = sortedEmps.map(e => ({
    name: lang === "ar" ? e.name.split(" ")[0] + " " + e.name.split(" ").pop() : e.name.split(" ")[0],
    fullName: e.name, value: typeof e[tab.key] === "number" ? e[tab.key] : parseFloat(e[tab.key].replace(":", ".")) || 0, _emp: e
  }));

  const sortedDepts = [...DEPTS].sort((a, b) => b[tab.key] - a[tab.key]);

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", direction: lang === "ar" ? "rtl" : "ltr", fontFamily: "'Cairo', sans-serif", color: "#F1F5F9" }}>
      <header style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1e293b" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>D</div>
          <div>
            <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>{t.title}</h1>
            <p style={{ margin: 0, fontSize: 10, color: "#94A3B8", fontWeight: 600 }}>
              <span style={{background: "#3B82F6", color: "#fff", padding: "1px 6px", borderRadius: 4, marginRight: lang === 'en' ? 6 : 0, marginLeft: lang === 'ar' ? 6 : 0}}>
                {PERIOD.quarter}
              </span>
              {t.from} <span style={{color: "#F1F5F9"}}>{PERIOD.start}</span> {t.to} <span style={{color: "#F1F5F9"}}>{PERIOD.end}</span>
            </p>
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
          
          <div style={{ background: "#1e293b", borderRadius: 24, padding: 24, border: "1px solid rgba(255,255,255,0.05)" }}>
            <h3 style={{ margin: "0 0 20px", color: "#94A3B8" }}>{t.top10} - {t[tabId]}</h3>
            <div style={{ height: 320, direction: "ltr", textAlign: "left" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 60, top: 5, bottom: 5 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" hide />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ background: "#0f172a", border: "none", borderRadius: 12 }} />
                  <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={22} onClick={(d) => setSelEmp(d._emp)} style={{ cursor: "pointer" }}>
                    {chartData.map((_, i) => <Cell key={i} fill={tab.color} />)}
                    <LabelList 
                      dataKey="fullName" 
                      position="insideLeft" 
                      offset={12} 
                      style={{ fill: "#000", fontSize: 13, fontWeight: 900, pointerEvents: "none" }} 
                    />
                    <LabelList 
                      dataKey="value" 
                      position="right" 
                      offset={10}
                      style={{ fill: tab.color, fontSize: 13, fontWeight: 900 }} 
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ background: "#1e293b", borderRadius: 24, padding: 24, border: "1px solid rgba(255,255,255,0.05)", maxHeight: 500, overflowY: "auto" }}>
            <h3 style={{ margin: "0 0 20px", color: "#94A3B8" }}>{t.depts}</h3>
            {sortedDepts.map(d => (
              <div key={d.name} onClick={() => setSelDept(d.name)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: 16, background: "rgba(255,255,255,0.02)", marginBottom: 8, cursor: "pointer", border: "1px solid transparent" }} onMouseEnter={e => e.currentTarget.style.borderColor = tab.color} onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{d.name}</div>
                  <div style={{ fontSize: 11, color: "#64748B" }}>{d.count} {t.employees}</div>
                </div>
                <div style={{ color: tab.color, fontWeight: 800 }}>{Math.round(d[tab.key] * 10) / 10}</div>
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
