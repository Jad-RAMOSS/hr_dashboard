import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, PieChart, Pie, Legend, LabelList,
} from "recharts";

const EMPLOYEES = [{"code": 5, "name": "محمود محمد محمود علي", "dept": "عمليات المبيعات", "pos": "مشرف عمليات المبيعات ", "work": 62, "inc_hrs": "15:40", "early_hrs": "9:21", "no_sig": 1, "abs": 0, "late_hrs": "0:0", "reg": 5, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 11, "bal_reg": 22.0, "bal_emerg": 7.0, "bal_2025": 29.0, "bal_total": 58.0}, {"code": 6, "name": "إبراهيم علاء صادق علي ", "dept": "عمليات المبيعات", "pos": "مشرف عمليات مبيعات", "work": 65, "inc_hrs": "18:58", "early_hrs": "11:3", "no_sig": 1, "abs": 1, "late_hrs": "0:58", "reg": 2, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 8, "bal_reg": 22.0, "bal_emerg": 7.0, "bal_2025": 27.0, "bal_total": 56.0}, {"code": 7, "name": "أحمد عمر محمد خلف", "dept": "تطوير الأعمال", "pos": "رئيس قطاع تطوير الأعمال / نائب العضو المنتدب", "work": 60, "inc_hrs": "17:36", "early_hrs": "3:13", "no_sig": 5, "abs": 3, "late_hrs": "6:58", "reg": 6, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 12, "bal_reg": 20.0, "bal_emerg": 7.0, "bal_2025": 14.0, "bal_total": 41.0}, {"code": 8, "name": "أمجد محمد سمير علي", "dept": "تطوير الأعمال", "pos": "مدير  أول تطوير مشروعات التمويل", "work": 58, "inc_hrs": "21:28", "early_hrs": "11:58", "no_sig": 2, "abs": 1, "late_hrs": "0:37", "reg": 8, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 14, "bal_reg": 22.0, "bal_emerg": 7.0, "bal_2025": 5.0, "bal_total": 34.0}, {"code": 9, "name": "كرستينا وليم نصيف عجايبي", "dept": "تطوير الأعمال", "pos": "مشرف أول تطوير الأعمال", "work": 50, "inc_hrs": "15:40", "early_hrs": "2:34", "no_sig": 3, "abs": 4, "late_hrs": "5:7", "reg": 13, "sick": 0, "off_hol": 8, "mat": 0, "total_leave": 21, "bal_reg": 12.0, "bal_emerg": 7.0, "bal_2025": 11.0, "bal_total": 30.0}, {"code": 11, "name": "أحمد رأفت محمد عبدالمجيد", "dept": "الموارد البشرية", "pos": "رئيس قطاع الموارد البشرية", "work": 57, "inc_hrs": "16:57", "early_hrs": "2:4", "no_sig": 13, "abs": 1, "late_hrs": "19:34", "reg": 9, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 15, "bal_reg": 22.0, "bal_emerg": 7.0, "bal_2025": 22.0, "bal_total": 51.0}, {"code": 16, "name": "هاني رمضان عبدالعزبز روبي ", "dept": "أمن المعلومات", "pos": "مدير أول إدارة أمن المعلومات", "work": 61, "inc_hrs": "30:19", "early_hrs": "7:58", "no_sig": 9, "abs": 2, "late_hrs": "9:15", "reg": 5, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 11, "bal_reg": 12.0, "bal_emerg": 7.0, "bal_2025": 22.0, "bal_total": 41.0}, {"code": 19, "name": "محمد عادل عبدالعليم الكفراوى", "dept": "الحسابات", "pos": "مشرف المحاسبة", "work": 62, "inc_hrs": "27:25", "early_hrs": "11:37", "no_sig": 6, "abs": 2, "late_hrs": "5:40", "reg": 6, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 12, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 12.0, "bal_total": 32.0}, {"code": 20, "name": "سامح سعدالدين محمود علي", "dept": "الحسابات", "pos": "مشرف حسابات", "work": 60, "inc_hrs": "29:45", "early_hrs": "9:10", "no_sig": 2, "abs": 0, "late_hrs": "7:16", "reg": 8, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 14, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 0.0, "bal_total": 20.0}, {"code": 25, "name": "ياسمين عبدالنعيم حامد محمود", "dept": " الدعاية و التسويق", "pos": "مشرف علاقات عامة", "work": 56, "inc_hrs": "18:55", "early_hrs": "5:1", "no_sig": 6, "abs": 2, "late_hrs": "11:1", "reg": 9, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 15, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 3.0, "bal_total": 23.0}, {"code": 26, "name": "وائل عوض علي علي", "dept": "تكنولوجيا المعلومات", "pos": "مصمم برمجيات", "work": 48, "inc_hrs": "9:58", "early_hrs": "2:49", "no_sig": 3, "abs": 0, "late_hrs": "1:58", "reg": 19, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 25, "bal_reg": 21.0, "bal_emerg": 7.0, "bal_2025": 10.0, "bal_total": 38.0}, {"code": 27, "name": "أحمد محمد سعيد عبدالفتاح الخضرى", "dept": "العمليات المركزية", "pos": "مشرف أول عمليات", "work": 61, "inc_hrs": "18:3", "early_hrs": "4:51", "no_sig": 1, "abs": 0, "late_hrs": "4:24", "reg": 8, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 14, "bal_reg": 22.0, "bal_emerg": 7.0, "bal_2025": 7.5, "bal_total": 36.5}, {"code": 29, "name": "هنادي محمد نورالدين عبدالله شومان ", "dept": "العمليات المركزية", "pos": "مشرف عمليات", "work": 57, "inc_hrs": "23:15", "early_hrs": "4:57", "no_sig": 0, "abs": 1, "late_hrs": "7:40", "reg": 8, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 14, "bal_reg": 8.0, "bal_emerg": 6.0, "bal_2025": 6.0, "bal_total": 20.0}, {"code": 31, "name": "محمد جمال عبدالحافظ خليفة", "dept": "الشئون الإدارية", "pos": "مشرف أول شئون إدارية", "work": 60, "inc_hrs": "6:30", "early_hrs": "0:0", "no_sig": 8, "abs": 0, "late_hrs": "7:54", "reg": 7, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 13, "bal_reg": 16.0, "bal_emerg": 7.0, "bal_2025": 0.0, "bal_total": 23.0}, {"code": 32, "name": "محمد شحات أحمد حنفي", "dept": "الشئون الإدارية", "pos": "مساعد شئون إدارية", "work": 55, "inc_hrs": "3:45", "early_hrs": "0:0", "no_sig": 0, "abs": 3, "late_hrs": "0:0", "reg": 11, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 17, "bal_reg": 11.0, "bal_emerg": 7.0, "bal_2025": 0.0, "bal_total": 18.0}, {"code": 33, "name": "سيد حمدالله عبدالحميد عبدالعال", "dept": "الشئون الإدارية", "pos": "مساعد شئون إدارية", "work": 76, "inc_hrs": "2:15", "early_hrs": "0:0", "no_sig": 5, "abs": 5, "late_hrs": "9:46", "reg": 16, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 22, "bal_reg": 16.0, "bal_emerg": 7.0, "bal_2025": 1.0, "bal_total": 24.0}, {"code": 34, "name": "محمد نصرالدين محمد علي", "dept": "الشئون الإدارية", "pos": "مساعد شئون إدارية", "work": 53, "inc_hrs": "10:10", "early_hrs": "7:37", "no_sig": 3, "abs": 0, "late_hrs": "0:0", "reg": 15, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 21, "bal_reg": 13.0, "bal_emerg": 4.0, "bal_2025": 0.0, "bal_total": 17.0}, {"code": 37, "name": "عبدالرحمن محمود سيد نعيم", "dept": "الشئون الإدارية", "pos": "سائق", "work": 62, "inc_hrs": "16:43", "early_hrs": "4:37", "no_sig": 7, "abs": 0, "late_hrs": "4:10", "reg": 5, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 11, "bal_reg": 10.0, "bal_emerg": 7.0, "bal_2025": 0.0, "bal_total": 17.0}, {"code": 39, "name": "محمود محمد محمود محمد", "dept": "الشئون الإدارية", "pos": "سائق", "work": 60, "inc_hrs": "11:12", "early_hrs": "2:28", "no_sig": 6, "abs": 1, "late_hrs": "7:10", "reg": 6, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 12, "bal_reg": 10.0, "bal_emerg": 6.0, "bal_2025": 0.0, "bal_total": 16.0}, {"code": 256, "name": "وسام عصام راشد أحمد", "dept": "تطوير الأعمال", "pos": "مشرف تطوير الأعمال", "work": 53, "inc_hrs": "18:45", "early_hrs": "9:7", "no_sig": 0, "abs": 6, "late_hrs": "3:40", "reg": 8, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 14, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 15.0, "bal_total": 35.0}, {"code": 257, "name": "هدير أحمد محمد أحمد", "dept": "العمليات المالية", "pos": "مشرف العمليات المالية", "work": 59, "inc_hrs": "15:45", "early_hrs": "9:28", "no_sig": 10, "abs": 0, "late_hrs": "0:34", "reg": 8, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 14, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 8.0, "bal_total": 28.0}, {"code": 259, "name": "شيماء محمد حسن محمد", "dept": "تحليلات المبيعات", "pos": "مشرف تحليلات المبيعات ", "work": 61, "inc_hrs": "11:13", "early_hrs": "4:58", "no_sig": 3, "abs": 2, "late_hrs": "7:49", "reg": 4, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 10, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 25.0, "bal_total": 45.0}, {"code": 279, "name": "محمود سيد حسين أحمد", "dept": "العمليات المركزية", "pos": "فنى صيانة POS", "work": 48, "inc_hrs": "3:15", "early_hrs": "0:0", "no_sig": 5, "abs": 6, "late_hrs": "0:0", "reg": 16, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 22, "bal_reg": 2.0, "bal_emerg": 7.0, "bal_2025": 0.0, "bal_total": 9.0}, {"code": 373, "name": "أحمد عادل عبدالحميد شفيق ", "dept": "تكنولوجيا المعلومات", "pos": "أخصائي جودة نظم", "work": 70, "inc_hrs": "16:55", "early_hrs": "7:28", "no_sig": 3, "abs": 1, "late_hrs": "2:13", "reg": 5, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 11, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 9.0, "bal_total": 29.0}, {"code": 375, "name": "مروه عبدالمنعم محمد محمد", "dept": "تطوير الأعمال", "pos": "مشرف ادارة مشروعات", "work": 62, "inc_hrs": "15:42", "early_hrs": "7:28", "no_sig": 2, "abs": 0, "late_hrs": "1:43", "reg": 4, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 10, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 25.0, "bal_total": 45.0}, {"code": 481, "name": "أحمد عزت أحمد السيد", "dept": "الحسابات", "pos": "رئيس قطاع الإدارة المالية", "work": 62, "inc_hrs": "22:22", "early_hrs": "6:15", "no_sig": 25, "abs": 3, "late_hrs": "26:49", "reg": 2, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 8, "bal_reg": 21.0, "bal_emerg": 7.0, "bal_2025": 30.0, "bal_total": 58.0}, {"code": 482, "name": "عبدالرحمن عزيز السيد محمد", "dept": "الحسابات", "pos": "مشرف حسابات", "work": 48, "inc_hrs": "14:19", "early_hrs": "8:10", "no_sig": 6, "abs": 0, "late_hrs": "7:52", "reg": 20, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 26, "bal_reg": 0.0, "bal_emerg": 2.0, "bal_2025": 0.0, "bal_total": 2.0}, {"code": 483, "name": "أحمد حامد محمد حامد", "dept": "العمليات المركزية", "pos": "أخصائي عمليات", "work": 59, "inc_hrs": "9:24", "early_hrs": "5:3", "no_sig": 3, "abs": 2, "late_hrs": "0:0", "reg": 4, "sick": 3, "off_hol": 6, "mat": 0, "total_leave": 13, "bal_reg": 22.0, "bal_emerg": 7.0, "bal_2025": 19.0, "bal_total": 48.0}, {"code": 484, "name": "محمد رمضان عبدالرحيم أحمد", "dept": "العمليات المركزية", "pos": "مشرف عمليات", "work": 62, "inc_hrs": "20:18", "early_hrs": "2:33", "no_sig": 10, "abs": 3, "late_hrs": "6:52", "reg": 8, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 14, "bal_reg": 13.0, "bal_emerg": 6.0, "bal_2025": 12.0, "bal_total": 31.0}, {"code": 485, "name": "محمود عباس عبدالسلام ضيف", "dept": "تحليلات المبيعات", "pos": "مدير تحليلات المبيعات  و العمليات المالية", "work": 62, "inc_hrs": "8:4", "early_hrs": "2:12", "no_sig": 4, "abs": 1, "late_hrs": "7:34", "reg": 3, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 9, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 19.0, "bal_total": 39.0}, {"code": 486, "name": "أحمد محمود أحمد محمود", "dept": "العمليات المركزية", "pos": "رئيس قطاع العمليات المركزية", "work": 63, "inc_hrs": "3:24", "early_hrs": "0:0", "no_sig": 54, "abs": 1, "late_hrs": "27:27", "reg": 3, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 9, "bal_reg": 22.0, "bal_emerg": 7.0, "bal_2025": 19.0, "bal_total": 48.0}, {"code": 501, "name": "هشام رمضان عبدالرحيم رمضان", "dept": "عمليات المبيعات", "pos": "مدير عمليات المبيعات", "work": 60, "inc_hrs": "21:49", "early_hrs": "11:45", "no_sig": 10, "abs": 0, "late_hrs": "2:13", "reg": 9, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 15, "bal_reg": 12.0, "bal_emerg": 7.0, "bal_2025": 12.0, "bal_total": 31.0}, {"code": 502, "name": "عمار فؤاد سعيد رضا", "dept": "تطوير الأعمال", "pos": "مدير تطوير الأعمال", "work": 67, "inc_hrs": "21:16", "early_hrs": "11:34", "no_sig": 0, "abs": 7, "late_hrs": "1:9", "reg": 2, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 8, "bal_reg": 22.0, "bal_emerg": 7.0, "bal_2025": 30.0, "bal_total": 59.0}, {"code": 503, "name": "محمد حسين صالح علي", "dept": "الموارد البشرية", "pos": "أخصائي أول الموارد البشرية ", "work": 65, "inc_hrs": "14:15", "early_hrs": "5:7", "no_sig": 15, "abs": 0, "late_hrs": "11:25", "reg": 3, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 9, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 13.0, "bal_total": 33.0}, {"code": 504, "name": "محمد علي عصمت السيسي", "dept": "عمليات المبيعات", "pos": "أخصائي أول عمليات المبيعات ", "work": 63, "inc_hrs": "16:16", "early_hrs": "5:1", "no_sig": 2, "abs": 1, "late_hrs": "4:24", "reg": 4, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 10, "bal_reg": 12.0, "bal_emerg": 7.0, "bal_2025": 13.0, "bal_total": 32.0}, {"code": 582, "name": "مني أحمد شعبان إبراهيم", "dept": " الدعاية و التسويق", "pos": "أخصائي أول تسويق", "work": 58, "inc_hrs": "26:3", "early_hrs": "10:13", "no_sig": 0, "abs": 5, "late_hrs": "2:58", "reg": 5, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 11, "bal_reg": 11.0, "bal_emerg": 7.0, "bal_2025": 4.0, "bal_total": 22.0}, {"code": 630, "name": "عاصم إبراهيم إبراهيم الدخاخني", "dept": "الشئون الإدارية", "pos": "مشرف أول شئون إدارية", "work": 63, "inc_hrs": "14:30", "early_hrs": "5:1", "no_sig": 2, "abs": 0, "late_hrs": "5:19", "reg": 4, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 10, "bal_reg": 20.0, "bal_emerg": 7.0, "bal_2025": 1.0, "bal_total": 28.0}, {"code": 640, "name": "فادي يوسف جورج يوسف", "dept": " الدعاية و التسويق", "pos": "اخصائى  تسويق تجاري", "work": 40, "inc_hrs": "15:16", "early_hrs": "6:43", "no_sig": 0, "abs": 6, "late_hrs": "0:37", "reg": 10, "sick": 0, "off_hol": 8, "mat": 0, "total_leave": 18, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 19.0, "bal_total": 39.0}, {"code": 745, "name": "مازن لؤي قصى محب الدين الخطيب", "dept": "تطوير الأعمال", "pos": "مدير أول تطوير الأعمال", "work": 63, "inc_hrs": "8:25", "early_hrs": "1:1", "no_sig": 3, "abs": 0, "late_hrs": "10:37", "reg": 5, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 11, "bal_reg": 7.0, "bal_emerg": 7.0, "bal_2025": 23.0, "bal_total": 37.0}, {"code": 781, "name": "سلمى حسن أحمد محمد ثابت", "dept": "تطوير الأعمال", "pos": "مدير تطوير الأعمال", "work": 62, "inc_hrs": "31:0", "early_hrs": "10:19", "no_sig": 3, "abs": 0, "late_hrs": "7:33", "reg": 10, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 16, "bal_reg": 22.0, "bal_emerg": 6.0, "bal_2025": 16.0, "bal_total": 44.0}, {"code": 888, "name": "عمر مختار جمال عبدالغفور", "dept": "الحسابات", "pos": "محاسب أول", "work": 64, "inc_hrs": "23:55", "early_hrs": "8:19", "no_sig": 1, "abs": 0, "late_hrs": "7:33", "reg": 4, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 10, "bal_reg": 12.0, "bal_emerg": 7.0, "bal_2025": 1.0, "bal_total": 20.0}, {"code": 910, "name": "ياسر عبدالفتاح نسيم أحمد", "dept": "الشئون الإدارية", "pos": "موظف إستقبال", "work": 59, "inc_hrs": "25:16", "early_hrs": "7:58", "no_sig": 2, "abs": 0, "late_hrs": "2:3", "reg": 9, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 15, "bal_reg": 16.0, "bal_emerg": 7.0, "bal_2025": -2.0, "bal_total": 21.0}, {"code": 1037, "name": "سعيد عيدالمنعم عبدالفتاح النحاس", "dept": "تكنولوجيا المعلومات", "pos": "مطور أول برمجيات", "work": 71, "inc_hrs": "2:18", "early_hrs": "1:9", "no_sig": 1, "abs": 1, "late_hrs": "0:0", "reg": 8, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 14, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 10.0, "bal_total": 30.0}, {"code": 1159, "name": "أميرة شوقي أمين عوض", "dept": "تكنولوجيا المعلومات", "pos": "مشرف أول تطوير برمجيات", "work": 65, "inc_hrs": "3:30", "early_hrs": "0:0", "no_sig": 2, "abs": 5, "late_hrs": "8:3", "reg": 5, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 11, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 4.0, "bal_total": 24.0}, {"code": 1166, "name": "عمرو أحمد تيسير السيد محمد عبدالغني", "dept": "تكنولوجيا المعلومات", "pos": "مشرف أول جودة نظم", "work": 62, "inc_hrs": "9:19", "early_hrs": "0:0", "no_sig": 0, "abs": 7, "late_hrs": "1:33", "reg": 2, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 8, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 22.0, "bal_total": 42.0}, {"code": 1167, "name": "عبدالله وجيه نجاح سليمان سليمان", "dept": "الشئون الإدارية", "pos": "مساعد شئون إدارية", "work": 37, "inc_hrs": "9:16", "early_hrs": "0:40", "no_sig": 4, "abs": 3, "late_hrs": "13:49", "reg": 19, "sick": 15, "off_hol": 6, "mat": 0, "total_leave": 40, "bal_reg": 9.0, "bal_emerg": 6.0, "bal_2025": 0.0, "bal_total": 15.0}, {"code": 1188, "name": "أحمد محمد عبدالعزيز أحمد محمد", "dept": "تحليلات المبيعات", "pos": "أخصائي أول تحليل المبيعات ", "work": 57, "inc_hrs": "9:6", "early_hrs": "0:0", "no_sig": 0, "abs": 8, "late_hrs": "3:19", "reg": 2, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 8, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 26.0, "bal_total": 46.0}, {"code": 1224, "name": "آية ممدوح أحمد عبدالجواد شتا", "dept": "الموارد البشرية", "pos": "أخصائي الموارد البشرية ", "work": 55, "inc_hrs": "18:28", "early_hrs": "6:37", "no_sig": 3, "abs": 5, "late_hrs": "5:7", "reg": 9, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 15, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 10.0, "bal_total": 30.0}, {"code": 1331, "name": "محمود أيمن محمد علي", "dept": "تكنولوجيا المعلومات", "pos": "مطور برمجيات", "work": 49, "inc_hrs": "25:52", "early_hrs": "7:52", "no_sig": 2, "abs": 56, "late_hrs": "15:0", "reg": 2, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 8, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 10.0, "bal_total": 30.0}, {"code": 1408, "name": "محمود رضا محمود السيد", "dept": "العمليات المركزية", "pos": "أخصائي عمليات", "work": 61, "inc_hrs": "22:37", "early_hrs": "7:55", "no_sig": 2, "abs": 0, "late_hrs": "5:55", "reg": 12, "sick": 6, "off_hol": 6, "mat": 0, "total_leave": 24, "bal_reg": 5.0, "bal_emerg": 6.0, "bal_2025": 1.0, "bal_total": 12.0}, {"code": 1461, "name": "ليلى فاروق علي أحمد عبدربه", "dept": " الدعاية و التسويق", "pos": "رئيس قطاع الدعاية والتسويق", "work": 49, "inc_hrs": "2:45", "early_hrs": "0:0", "no_sig": 38, "abs": 0, "late_hrs": "28:34", "reg": 21, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 27, "bal_reg": 0.0, "bal_emerg": 0.0, "bal_2025": 0.0, "bal_total": 0.0}, {"code": 1477, "name": "ماريو مجدي أسعد غبريال", "dept": "تكنولوجيا المعلومات", "pos": "مشرف دعم النظم", "work": 62, "inc_hrs": "0:0", "early_hrs": "0:0", "no_sig": 0, "abs": 45, "late_hrs": "0:0", "reg": 2, "sick": 0, "off_hol": 8, "mat": 0, "total_leave": 10, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 19.0, "bal_total": 39.0}, {"code": 1481, "name": "محمد سيد محمد عبدالقادر", "dept": "العمليات المركزية", "pos": "أخصائي اول عمليات ", "work": 58, "inc_hrs": "20:15", "early_hrs": "6:1", "no_sig": 1, "abs": 2, "late_hrs": "10:36", "reg": 9, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 15, "bal_reg": 13.0, "bal_emerg": 5.0, "bal_2025": 6.0, "bal_total": 24.0}, {"code": 1482, "name": "برسوم نعيم سليمان يوسف", "dept": "العمليات المركزية", "pos": "أخصائي عمليات ", "work": 58, "inc_hrs": "12:22", "early_hrs": "7:10", "no_sig": 1, "abs": 6, "late_hrs": "0:0", "reg": 4, "sick": 0, "off_hol": 8, "mat": 0, "total_leave": 12, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 20.0, "bal_total": 40.0}, {"code": 1492, "name": "مينا أنسي حافظ أبادير سعيد", "dept": "تكنولوجيا المعلومات", "pos": "مطور برمجيات", "work": 56, "inc_hrs": "7:10", "early_hrs": "2:25", "no_sig": 0, "abs": 2, "late_hrs": "0:0", "reg": 11, "sick": 0, "off_hol": 8, "mat": 0, "total_leave": 19, "bal_reg": 12.0, "bal_emerg": 7.0, "bal_2025": 4.0, "bal_total": 23.0}, {"code": 1493, "name": "مصطفى محمد محمود مدكور موسى", "dept": "تكنولوجيا المعلومات", "pos": "مطور برمجيات", "work": 59, "inc_hrs": "13:18", "early_hrs": "6:58", "no_sig": 0, "abs": 1, "late_hrs": "0:0", "reg": 12, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 18, "bal_reg": 11.0, "bal_emerg": 5.0, "bal_2025": 0.0, "bal_total": 16.0}, {"code": 1494, "name": "أحمد خالد كمال أحمد", "dept": "العمليات المركزية", "pos": "أخصائي اول عمليات ", "work": 55, "inc_hrs": "9:52", "early_hrs": "4:58", "no_sig": 1, "abs": 10, "late_hrs": "8:36", "reg": 7, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 13, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 22.0, "bal_total": 42.0}, {"code": 1496, "name": "يمنى حسن أحمد حسين محمد خليل", "dept": "تكنولوجيا المعلومات", "pos": "أخصائي جودة نظم", "work": 61, "inc_hrs": "11:25", "early_hrs": "4:49", "no_sig": 0, "abs": 4, "late_hrs": "0:31", "reg": 10, "sick": 4, "off_hol": 6, "mat": 0, "total_leave": 20, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 0.0, "bal_total": 20.0}, {"code": 1569, "name": "سارة محمد حسن جاد", "dept": "العمليات المالية", "pos": "أخصائي العمليات المالية", "work": 60, "inc_hrs": "12:28", "early_hrs": "2:48", "no_sig": 0, "abs": 1, "late_hrs": "4:24", "reg": 7, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 13, "bal_reg": 12.0, "bal_emerg": 7.0, "bal_2025": 14.0, "bal_total": 33.0}, {"code": 1570, "name": "مصطفى محمود محمد إبراهيم", "dept": "الموارد البشرية", "pos": "مشرف التوظيف", "work": 26, "inc_hrs": "1:15", "early_hrs": "0:0", "no_sig": 1, "abs": 0, "late_hrs": "0:0", "reg": 46, "sick": 24, "off_hol": 6, "mat": 0, "total_leave": 76, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 20.0, "bal_total": 40.0}, {"code": 1589, "name": "عمر محمد مجدي فرج", "dept": "تكنولوجيا المعلومات", "pos": "مطور برمجيات", "work": 55, "inc_hrs": "15:30", "early_hrs": "4:52", "no_sig": 3, "abs": 2, "late_hrs": "2:57", "reg": 12, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 18, "bal_reg": 8.0, "bal_emerg": 6.0, "bal_2025": 0.0, "bal_total": 14.0}, {"code": 1590, "name": "سلمى محمود محمد رسمي", "dept": "الحسابات", "pos": "محاسب", "work": 60, "inc_hrs": "22:15", "early_hrs": "10:9", "no_sig": 0, "abs": 0, "late_hrs": "2:10", "reg": 7, "sick": 2, "off_hol": 6, "mat": 0, "total_leave": 15, "bal_reg": 11.0, "bal_emerg": 7.0, "bal_2025": 6.0, "bal_total": 24.0}, {"code": 1596, "name": "أحمد سيد حمدالله عبدالحميد", "dept": "الحسابات", "pos": "موظف الحسابات", "work": 57, "inc_hrs": "7:40", "early_hrs": "2:42", "no_sig": 30, "abs": 6, "late_hrs": "4:13", "reg": 7, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 13, "bal_reg": 5.0, "bal_emerg": 7.0, "bal_2025": 0.0, "bal_total": 12.0}, {"code": 1609, "name": "مصطفى محمدالمهدي أمين محمد", "dept": "تكنولوجيا المعلومات", "pos": "مطور برمجيات", "work": 63, "inc_hrs": "5:45", "early_hrs": "2:30", "no_sig": 1, "abs": 3, "late_hrs": "0:0", "reg": 9, "sick": 7, "off_hol": 6, "mat": 0, "total_leave": 22, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 5.0, "bal_total": 25.0}, {"code": 1610, "name": "عبدالله رجب بكري محمد", "dept": "تكنولوجيا المعلومات", "pos": "مطور برمجيات", "work": 65, "inc_hrs": "4:45", "early_hrs": "0:0", "no_sig": 0, "abs": 2, "late_hrs": "0:0", "reg": 15, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 21, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 3.0, "bal_total": 23.0}, {"code": 1628, "name": "كريم حسنين عبدالمنعم حسنين", "dept": "العمليات المالية", "pos": "أخصائي العمليات المالية", "work": 59, "inc_hrs": "4:45", "early_hrs": "0:0", "no_sig": 9, "abs": 1, "late_hrs": "9:27", "reg": 8, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 14, "bal_reg": 11.0, "bal_emerg": 7.0, "bal_2025": 4.0, "bal_total": 22.0}, {"code": 1700, "name": "عبدالرحمن سعيد امام عبدالجواد", "dept": "العمليات المركزية", "pos": "أخصائي عمليات", "work": 71, "inc_hrs": "3:45", "early_hrs": "0:0", "no_sig": 0, "abs": 0, "late_hrs": "16:30", "reg": 17, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 23, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 5.5, "bal_total": 25.5}, {"code": 1701, "name": "عمرو محمد عبدالتواب محمد", "dept": "العمليات المالية", "pos": "أخصائي أول العمليات المالية", "work": 60, "inc_hrs": "8:10", "early_hrs": "0:0", "no_sig": 5, "abs": 3, "late_hrs": "14:10", "reg": 3, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 9, "bal_reg": 12.0, "bal_emerg": 7.0, "bal_2025": 13.5, "bal_total": 32.5}, {"code": 1733, "name": "عمر محمد صابر علي", "dept": "العمليات المركزية", "pos": "أخصائي عمليات", "work": 74, "inc_hrs": "3:30", "early_hrs": "0:0", "no_sig": 1, "abs": 6, "late_hrs": "16:30", "reg": 2, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 8, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 14.0, "bal_total": 34.0}, {"code": 1738, "name": "عمرو محمد محمود محمد هارون", "dept": "تكنولوجيا المعلومات", "pos": "مطور برمجيات", "work": 77, "inc_hrs": "9:31", "early_hrs": "0:0", "no_sig": 3, "abs": 2, "late_hrs": "0:30", "reg": 3, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 9, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 11.75, "bal_total": 31.75}, {"code": 1739, "name": "محب يسري وديع وليم", "dept": "تكنولوجيا المعلومات", "pos": "مطور برمجيات", "work": 68, "inc_hrs": "14:21", "early_hrs": "7:21", "no_sig": 3, "abs": 1, "late_hrs": "0:0", "reg": 4, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 10, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 11.75, "bal_total": 31.75}, {"code": 1740, "name": "اشرف سمير عبدالغفار عبدالجواد منتصر", "dept": "الموارد البشرية", "pos": "مدير الرواتب وشئون العاملين", "work": 61, "inc_hrs": "10:13", "early_hrs": "4:34", "no_sig": 19, "abs": 0, "late_hrs": "0:37", "reg": 6, "sick": 2, "off_hol": 6, "mat": 0, "total_leave": 14, "bal_reg": 22.0, "bal_emerg": 7.0, "bal_2025": 15.0, "bal_total": 44.0}, {"code": 1753, "name": "منه الله احمد الدسوقى عبدالعال", "dept": "الموارد البشرية", "pos": "أخصائي الموارد البشرية ", "work": 51, "inc_hrs": "9:21", "early_hrs": "5:7", "no_sig": 4, "abs": 0, "late_hrs": "0:30", "reg": 16, "sick": 3, "off_hol": 6, "mat": 0, "total_leave": 25, "bal_reg": 4.0, "bal_emerg": 7.0, "bal_2025": 1.25, "bal_total": 12.25}, {"code": 1775, "name": "جاد شريف جاد سليمان الواحى", "dept": "تكنولوجيا المعلومات", "pos": "مطور برمجيات", "work": 37, "inc_hrs": "13:34", "early_hrs": "0:0", "no_sig": 0, "abs": 30, "late_hrs": "1:40", "reg": 2, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 8, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 10.5, "bal_total": 30.5}, {"code": 1777, "name": "احمد صلاح الدين محمد احمد", "dept": "تطوير الأعمال", "pos": "مشرف أول تطوير الأعمال", "work": 54, "inc_hrs": "19:46", "early_hrs": "6:43", "no_sig": 2, "abs": 0, "late_hrs": "1:19", "reg": 13, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 19, "bal_reg": 14.0, "bal_emerg": 6.0, "bal_2025": 3.5, "bal_total": 23.5}, {"code": 1780, "name": "على عبد الحميد سيد عبدالحميد", "dept": "الموارد البشرية", "pos": "اخصائى توظيف", "work": 60, "inc_hrs": "17:7", "early_hrs": "5:12", "no_sig": 0, "abs": 2, "late_hrs": "5:12", "reg": 5, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 11, "bal_reg": 12.0, "bal_emerg": 7.0, "bal_2025": 2.75, "bal_total": 21.75}, {"code": 1791, "name": "محمد يحيى محمد خطاب", "dept": "العمليات المالية", "pos": "أخصائي العمليات المالية", "work": 62, "inc_hrs": "9:31", "early_hrs": "5:1", "no_sig": 0, "abs": 3, "late_hrs": "0:0", "reg": 4, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 10, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 5.75, "bal_total": 25.75}, {"code": 1800, "name": "يوسف هاني روفائيل ميخيائيل", "dept": "تكنولوجيا المعلومات", "pos": "اخصائى دعم نظم", "work": 45, "inc_hrs": "6:55", "early_hrs": "0:0", "no_sig": 0, "abs": 48, "late_hrs": "0:36", "reg": 2, "sick": 0, "off_hol": 8, "mat": 0, "total_leave": 10, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 2.0, "bal_total": 22.0}, {"code": 1813, "name": "مصطفي شريف السيد عطيه عفيفي", "dept": "العمليات المركزية ", "pos": "اخصائى عمليات مركزية", "work": 69, "inc_hrs": "9:57", "early_hrs": "7:25", "no_sig": 1, "abs": 9, "late_hrs": "0:0", "reg": 2, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 8, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 3.0, "bal_total": 23.0}, {"code": 1843, "name": "نورهان وائل قرنى عبدالوهاب", "dept": "الحسابات", "pos": "محاسب", "work": 64, "inc_hrs": "13:31", "early_hrs": "7:46", "no_sig": 4, "abs": 0, "late_hrs": "0:0", "reg": 3, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 9, "bal_reg": 12.0, "bal_emerg": 7.0, "bal_2025": 1.25, "bal_total": 20.25}, {"code": 1860, "name": "محمد اسامه عبد الرؤوف على سلامه", "dept": "تكنولوجيا المعلومات", "pos": "اخصائى دعم نظم", "work": 39, "inc_hrs": "7:4", "early_hrs": "2:30", "no_sig": 0, "abs": 54, "late_hrs": "0:34", "reg": 2, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 8, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 1.0, "bal_total": 21.0}, {"code": 1894, "name": "عمرو جمال عيد ابوالعنين نحيله", "dept": "تكنولوجيا المعلومات", "pos": "مطور برمجيات", "work": 61, "inc_hrs": "17:58", "early_hrs": "9:34", "no_sig": 1, "abs": 7, "late_hrs": "7:55", "reg": 4, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 10, "bal_reg": 12.0, "bal_emerg": 6.0, "bal_2025": 0.0, "bal_total": 18.0}, {"code": 1899, "name": "خالد محمد علي الجميل", "dept": "تكنولوجيا المعلومات", "pos": "مطور برمجيات", "work": 60, "inc_hrs": "18:37", "early_hrs": "9:4", "no_sig": 0, "abs": 0, "late_hrs": "0:31", "reg": 4, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 10, "bal_reg": 13.0, "bal_emerg": 5.0, "bal_2025": 0.0, "bal_total": 18.0}, {"code": 1901, "name": "منة احمد ابراهيم عبدالغفار عفيفي", "dept": " الدعاية و التسويق", "pos": "اخصائي تسويق", "work": 53, "inc_hrs": "12:43", "early_hrs": "4:49", "no_sig": 0, "abs": 1, "late_hrs": "0:0", "reg": 6, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 12, "bal_reg": 9.0, "bal_emerg": 7.0, "bal_2025": 0.0, "bal_total": 16.0}, {"code": 1904, "name": "محمد عصام محمد ابوالدهب", "dept": "تكنولوجيا المعلومات", "pos": "رئيس قطاع تكنولوجيا المعلومات", "work": 23, "inc_hrs": "11:13", "early_hrs": "0:0", "no_sig": 8, "abs": 9, "late_hrs": "23:7", "reg": 7, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 13, "bal_reg": 6.83, "bal_emerg": 6.41, "bal_2025": 0.0, "bal_total": 13.24}, {"code": 1944, "name": "احمد خالد على محمد", "dept": "العمليات المركزية", "pos": "اخصائى عمليات مركزية ", "work": 15, "inc_hrs": "8:4", "early_hrs": "7:27", "no_sig": 0, "abs": 9, "late_hrs": "0:31", "reg": 0, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 6, "bal_reg": 0.0, "bal_emerg": 0.0, "bal_2025": 0.0, "bal_total": 0.0}];

const DEPT_NAMES = [...new Set(EMPLOYEES.map(e => e.dept))];
const DEPTS = DEPT_NAMES.map(d => {
  const emps = EMPLOYEES.filter(e => e.dept === d);
  return {
    name: d, count: emps.length,
    work:  emps.reduce((s,e)=>s+e.work,0),
    abs:   emps.reduce((s,e)=>s+e.abs,0),
    sick:  emps.reduce((s,e)=>s+e.sick,0),
    no_sig: emps.reduce((s,e)=>s+e.no_sig,0),
    reg:   emps.reduce((s,e)=>s+e.reg,0),
    bal_total: emps.reduce((s,e)=>s+e.bal_total,0),
  };
});

const TABS = [
  {id:"work",      label:"أيام العمل الفعلية",      icon:"◉",  color:"#34D399", key:"work"  },
  {id:"abs",       label:"غياب بدون إذن",           icon:"⚡", color:"#F87171", key:"abs"   },
  {id:"no_sig",    label:"عدد عدم الأمضاء",          icon:"✎",  color:"#FCD34D", key:"no_sig" },
  {id:"sick",      label:"إجازات مرضية",            icon:"✚",  color:"#C084FC", key:"sick"  },
  {id:"reg",       label:"إجازات اعتيادية",         icon:"📅", color:"#60A5FA", key:"reg"   },
  {id:"bal_total", label:"إجمالي الرصيد المتبقي",   icon:"▣",  color:"#F472B6", key:"bal_total" },
];

const PIE_SLICES = [
  {key:"work",  name:"أيام العمل",        fill:"#34D399"},
  {key:"abs",   name:"غياب بدون إذن",    fill:"#F87171"},
  {key:"no_sig",name:"عدم الأمضاء",       fill:"#FCD34D"},
  {key:"sick",  name:"إجازة مرضية",      fill:"#C084FC"},
  {key:"reg",   name:"إجازة اعتيادية",   fill:"#60A5FA"},
];

function shortName(n) {
  const p = n.trim().split(" ");
  return p.length >= 3 ? p[0]+" "+p[p.length-1] : p.slice(0,2).join(" ");
}

function PieTip({active, payload}) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div style={{background:"#0a1628",border:`1px solid ${p.payload.fill}55`,borderRadius:8,
      padding:"8px 12px",direction:"rtl",boxShadow:`0 8px 20px ${p.payload.fill}25`}}>
      <p style={{color:"#94A3B8",fontSize:11,margin:"0 0 3px"}}>{p.name}</p>
      <p style={{color:p.payload.fill,fontWeight:800,fontSize:18,margin:0}}>
        {p.value} <span style={{color:"#475569",fontSize:11}}>يوم ({p.payload.pct}%)</span>
      </p>
    </div>
  );
}

function EmployeeModal({emp, onClose}) {
  const sliceData = PIE_SLICES
    .map(s => ({...s, value: emp[s.key] || 0}))
    .filter(s => s.value > 0);
  const pieSum = sliceData.reduce((s,x)=>s+x.value,0);
  const withPct = sliceData.map(s=>({...s, pct: Math.round((s.value/pieSum)*100)}));

  const bars = [
    {label:"أيام العمل", val:emp.work, color:"#34D399"},
    {label:"عدم الأمضاء", val:emp.no_sig, color:"#FCD34D"},
    {label:"ساعات التأخير", val:emp.late_hrs, color:"#F87171", isStr: true},
    {label:"الرصيد المتبقي", val:emp.bal_total, color:"#F472B6"},
  ];
  const maxBar = Math.max(...bars.filter(b=>!b.isStr).map(b=>b.val), 1);

  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.78)",
      zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",
      backdropFilter:"blur(8px)",padding:16}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#0d1829",
        border:"1px solid rgba(255,255,255,0.1)",borderRadius:18,width:"100%",maxWidth:560,
        padding:26,direction:"rtl",boxShadow:"0 24px 80px rgba(0,0,0,0.65)",maxHeight:"90vh",overflowY:"auto"}}>

        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
          <div>
            <h2 style={{margin:0,color:"#F1F5F9",fontSize:16,fontWeight:800}}>{emp.name}</h2>
            <p style={{margin:"3px 0 0",color:"#475569",fontSize:11}}>{emp.pos}</p>
            <span style={{display:"inline-block",marginTop:5,background:"#1e3a5f30",
              border:"1px solid #2563EB30",color:"#60A5FA",fontSize:10,padding:"2px 10px",borderRadius:5}}>
              {emp.dept}
            </span>
          </div>
          <button onClick={onClose} style={{background:"rgba(255,255,255,0.06)",
            border:"1px solid rgba(255,255,255,0.1)",color:"#94A3B8",borderRadius:8,
            width:30,height:30,cursor:"pointer",fontSize:15,lineHeight:"30px",textAlign:"center",flexShrink:0}}>✕</button>
        </div>

        <div style={{display:"flex",gap:18,marginBottom:18}}>
          <div style={{flex:"0 0 200px"}}>
            <p style={{color:"#475569",fontSize:10,margin:"0 0 6px",textAlign:"center"}}>توزيع الأيام</p>
            {withPct.length > 0 ? (
              <PieChart width={200} height={190}>
                <Pie data={withPct} cx="50%" cy="50%" outerRadius={78} innerRadius={38}
                  dataKey="value" paddingAngle={3}>
                  {withPct.map((s,i)=><Cell key={i} fill={s.fill}/>)}
                </Pie>
                <Tooltip content={<PieTip/>}/>
                <Legend iconType="circle" iconSize={7}
                  formatter={v=><span style={{color:"#94A3B8",fontSize:9}}>{v}</span>}/>
              </PieChart>
            ) : (
              <div style={{height:190,display:"flex",alignItems:"center",justifyContent:"center",
                color:"#64748B",fontSize:11}}>لا بيانات</div>
            )}
          </div>

          <div style={{flex:1,display:"flex",flexDirection:"column",gap:7,justifyContent:"center"}}>
            {bars.map(b=>(
              <div key={b.label}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                  <span style={{color:"#94A3B8",fontSize:10}}>{b.label}</span>
                  <span style={{color:b.color,fontSize:11,fontWeight:700}}>{b.val} {b.isStr ? "ساعة" : "يوم"}</span>
                </div>
                {!b.isStr && (
                  <div style={{height:5,background:"rgba(255,255,255,0.05)",borderRadius:3,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${(b.val/maxBar)*100}%`,background:b.color,
                      borderRadius:3,boxShadow:`0 0 6px ${b.color}50`}}/>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:10}}>
           <div style={{background:"#1e3a5f20",padding:10,borderRadius:10}}>
              <p style={{color:"#475569",fontSize:10,margin:0}}>عدم اكتمال الساعات</p>
              <p style={{color:"#E2E8F0",fontSize:14,fontWeight:700,margin:0}}>{emp.inc_hrs} ساعة</p>
           </div>
           <div style={{background:"#1e3a5f20",padding:10,borderRadius:10}}>
              <p style={{color:"#475569",fontSize:10,margin:0}}>الانصراف المبكر</p>
              <p style={{color:"#E2E8F0",fontSize:14,fontWeight:700,margin:0}}>{emp.early_hrs} ساعة</p>
           </div>
        </div>

        <div style={{textAlign:"center",color:"#1E293B",fontSize:10,marginTop:15}}>كود الموظف: {emp.code}</div>
      </div>
    </div>
  );
}

function DeptModal({dept, activeKey, color, onClose}) {
  const d = DEPTS.find(x=>x.name===dept);
  if (!d) return null;
  const emps = [...EMPLOYEES.filter(e=>e.dept===dept)].sort((a,b)=>b[activeKey]-a[activeKey]);
  const [selEmp, setSelEmp] = useState(null);

  const pieSum = PIE_SLICES.reduce((s,x)=>s+(d[x.key] || 0),0);
  const slices = PIE_SLICES.map(s=>({...s, value:d[s.key] || 0, pct:Math.round(((d[s.key]||0)/pieSum)*100)}))
    .filter(s=>s.value>0);

  const activeTab = TABS.find(t=>t.key===activeKey);

  return (
    <>
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",
      zIndex:900,display:"flex",alignItems:"center",justifyContent:"center",
      backdropFilter:"blur(8px)",padding:16}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#0d1829",
        border:`1px solid ${color}30`,borderRadius:18,width:"100%",maxWidth:640,
        padding:26,direction:"rtl",boxShadow:`0 24px 80px rgba(0,0,0,0.65)`,
        maxHeight:"90vh",overflowY:"auto"}}>

        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <div>
            <h2 style={{margin:0,color:"#F1F5F9",fontSize:17,fontWeight:800}}>{dept}</h2>
            <p style={{margin:"3px 0 0",color:"#475569",fontSize:11}}>{d.count} موظف</p>
          </div>
          <button onClick={onClose} style={{background:"rgba(255,255,255,0.06)",
            border:"1px solid rgba(255,255,255,0.1)",color:"#94A3B8",borderRadius:8,
            width:30,height:30,cursor:"pointer",fontSize:15,lineHeight:"30px",textAlign:"center"}}>✕</button>
        </div>

        <div style={{display:"flex",gap:18,marginBottom:20}}>
          <div style={{flex:"0 0 210px"}}>
            <p style={{color:"#475569",fontSize:10,margin:"0 0 6px",textAlign:"center"}}>توزيع الأيام الكلي</p>
            <PieChart width={210} height={200}>
              <Pie data={slices} cx="50%" cy="50%" outerRadius={80} innerRadius={38}
                dataKey="value" paddingAngle={3}>
                {slices.map((s,i)=><Cell key={i} fill={s.fill}/>)}
              </Pie>
              <Tooltip content={<PieTip/>}/>
              <Legend iconType="circle" iconSize={7}
                formatter={v=><span style={{color:"#94A3B8",fontSize:9}}>{v}</span>}/>
            </PieChart>
          </div>

          <div style={{flex:1,display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,alignContent:"center"}}>
            {[
              {label:"أيام العمل",    val:d.work,  color:"#34D399"},
              {label:"غياب",          val:d.abs,   color:"#F87171"},
              {label:"عدم أمضاء",      val:d.no_sig,color:"#FCD34D"},
              {label:"مرضي",          val:d.sick,  color:"#C084FC"},
              {label:"اعتيادي",       val:d.reg,   color:"#60A5FA"},
              {label:"الرصيد الكلي",   val:d.bal_total, color:"#F472B6"},
            ].map(k=>(
              <div key={k.label} style={{background:`${k.color}10`,border:`1px solid ${k.color}22`,
                borderRadius:8,padding:"7px 10px",textAlign:"center"}}>
                <div style={{color:k.color,fontWeight:800,fontSize:17}}>{k.val}</div>
                <div style={{color:"#475569",fontSize:9,marginTop:1}}>{k.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p style={{color:"#94A3B8",fontSize:11,margin:"0 0 8px",fontWeight:600}}>
            موظفو القسم — مرتب حسب: {activeTab?.label} ↓ &nbsp;
            <span style={{color:"#64748B",fontWeight:400,fontSize:10}}>(اضغط موظف لعرض ملفه)</span>
          </p>
          <div style={{display:"flex",flexDirection:"column",gap:3}}>
            {emps.map((emp,i)=>(
              <div key={emp.code} onClick={()=>setSelEmp(emp)}
                style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",
                  borderRadius:8,background:"rgba(255,255,255,0.02)",
                  border:"1px solid rgba(255,255,255,0.04)",
                  cursor:"pointer",transition:"all 0.15s"}}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.05)"}
                onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.02)"}>
                <div style={{width:20,height:20,borderRadius:5,background:`${color}20`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  color,fontSize:10,fontWeight:800,flexShrink:0}}>{i+1}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{color:"#E2E8F0",fontSize:11,fontWeight:600,
                    overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{emp.name}</div>
                  <div style={{color:"#64748B",fontSize:9,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{emp.pos}</div>
                </div>
                <div style={{display:"flex",gap:10,flexShrink:0}}>
                  {[
                    {v:emp.work, c:"#34D399", l:"عمل"},
                    {v:emp.abs,  c:"#F87171", l:"غياب"},
                    {v:emp.no_sig, c:"#FCD34D", l:"أمضاء"},
                    {v:emp.sick, c:"#C084FC", l:"مرضي"},
                    {v:emp.bal_total,  c:"#F472B6", l:"رصيد"},
                  ].map(x=>(
                    <div key={x.l} style={{textAlign:"center",minWidth:30}}>
                      <div style={{color: x.v > 0 ? x.c : "#1E293B", fontSize:11, fontWeight: x.v>0?700:400}}>{x.v}</div>
                      <div style={{color:"#1E293B",fontSize:8}}>{x.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{color:"#1E3A5F",fontSize:11,flexShrink:0}}>←</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    {selEmp && <EmployeeModal emp={selEmp} onClose={()=>setSelEmp(null)}/>}
    </>
  );
}

export default function App() {
  const [tabId, setTabId]     = useState("work");
  const [selEmp, setSelEmp]   = useState(null);
  const [selDept, setSelDept] = useState(null);

  const tab = TABS.find(t=>t.id===tabId);
  const {color, key} = tab;

  const top10 = [...EMPLOYEES].sort((a,b)=>b[key]-a[key]).slice(0,10);
  const sortedDepts = [...DEPTS].sort((a,b)=>b[key]-a[key]);
  const maxDept = Math.max(...sortedDepts.map(d=>d[key]),1);
  const maxEmp  = Math.max(...top10.map(e=>e[key]),1);

  const deptBarData = sortedDepts.map(d=>({
    name: d.name.length>11 ? d.name.slice(0,11)+"…" : d.name,
    fullName: d.name, value: d[key],
  }));
  const empBarData = top10.map(e=>({
    name: shortName(e.name),
    fullName: e.name, pos: e.pos, value: e[key], _emp: e,
  }));

  const BarTip = (extra) => ({active, payload}) => {
    if (!active||!payload?.length) return null;
    const d = payload[0].payload;
    return (
      <div style={{background:"#0a1628",border:`1px solid ${color}55`,borderRadius:10,
        padding:"10px 14px",direction:"rtl",minWidth:170,boxShadow:`0 8px 24px ${color}25`}}>
        <p style={{color:"#94A3B8",fontSize:11,margin:"0 0 3px",fontWeight:600}}>{d.fullName}</p>
        {d.pos && <p style={{color:"#475569",fontSize:10,margin:"0 0 3px"}}>{d.pos}</p>}
        <p style={{color:"#64748B",fontSize:10,margin:"0 0 6px"}}>{extra.hint}</p>
        <p style={{color,fontWeight:800,fontSize:20,margin:0}}>
          {d.value} <span style={{color:"#64748B",fontSize:11,fontWeight:400}}>{tabId === "bal_total" ? "رصيد" : "يوم/مرة"}</span>
        </p>
      </div>
    );
  };

  const DeptTip = BarTip({hint:"اضغط لعرض تفاصيل القسم"});
  const EmpTip  = BarTip({hint:"اضغط لعرض الملف الشخصي"});

  return (
    <div style={{background:"#0f172a",minHeight:"100vh",direction:"rtl",
      fontFamily:"'Cairo','Segoe UI',Tahoma,sans-serif",
      display:"flex",flexDirection:"column",overflow:"auto"}}>

      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,
        background:`radial-gradient(ellipse 70% 40% at 50% 0%,${color}12 0%,transparent 70%)`,
        transition:"background 0.5s"}}/>

      <header style={{position:"relative",zIndex:10,display:"flex",alignItems:"center",
        justifyContent:"space-between",padding:"11px 22px",
        borderBottom:"1px solid rgba(255,255,255,0.06)",
        background:"rgba(15,23,42,0.92)",backdropFilter:"blur(20px)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:34,height:34,borderRadius:9,
            background:`linear-gradient(135deg,${color}CC,${color}44)`,
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:15}}>{tab.icon}</div>
          <div>
            <div style={{color:"#E2E8F0",fontWeight:700,fontSize:13}}>لوحة تحليلات الحضور — Q1</div>
            <div style={{color:"#64748B",fontSize:9}}>{EMPLOYEES.length} موظف · {DEPTS.length} أقسام</div>
          </div>
        </div>
        <div style={{background:`${color}14`,border:`1px solid ${color}35`,
          borderRadius:8,padding:"4px 12px",color,fontSize:11,fontWeight:600}}>{tab.label}</div>
      </header>

      <nav style={{position:"relative",zIndex:10,display:"flex",gap:3,padding:"7px 22px",
        borderBottom:"1px solid rgba(255,255,255,0.04)",
        background:"rgba(15,23,42,0.7)",overflowX:"auto"}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTabId(t.id)} style={{
            display:"flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:7,
            border:`1px solid ${tabId===t.id?t.color:"rgba(255,255,255,0.06)"}`,
            background:tabId===t.id?`${t.color}15`:"transparent",
            color:tabId===t.id?t.color:"#94A3B8",
            fontSize:11,fontWeight:tabId===t.id?700:400,
            cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit",transition:"all 0.2s",
          }}>{t.icon} {t.label}</button>
        ))}
      </nav>

      <main style={{position:"relative",zIndex:5,flex:1,padding:"16px 22px",
        display:"flex",flexDirection:"column",gap:14,overflow:"visible"}}>

        <div>
          <h1 style={{margin:0,fontSize:17,fontWeight:800,color:"#F1F5F9",
            display:"flex",alignItems:"center",gap:7}}>
            <span style={{color}}>{tab.icon}</span>{tab.label}
          </h1>
          <p style={{margin:"2px 0 0",color:"#64748B",fontSize:11}}>
            انقر على أي قسم أو موظف لعرض الرسم الدائري والتفاصيل الكاملة
          </p>
        </div>

        <div style={{display:"flex",gap:14,flex:1,minHeight:0,flexWrap:"wrap"}}>

          {/* DEPARTMENTS PANEL */}
          <div style={{flex:1,minWidth:320,display:"flex",flexDirection:"column",gap:10,
            background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",
            borderRadius:14,padding:"13px 14px",overflow:"hidden"}}>

            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{color:"#94A3B8",fontSize:12,fontWeight:700}}>🏢 الأقسام ({DEPTS.length})</span>
              <span style={{color:"#1E3A5F",fontSize:10,background:"rgba(255,255,255,0.03)",
                border:"1px solid rgba(255,255,255,0.06)",borderRadius:5,padding:"2px 8px"}}>
                اضغط ← للتفاصيل
              </span>
            </div>

            <div style={{height:200}}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptBarData} layout="vertical"
                  margin={{top:0,right:42,left:104,bottom:0}}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.04)"/>
                  <XAxis type="number" tick={{fill:"#334155",fontSize:9}} axisLine={false} tickLine={false}/>
                  <YAxis type="category" dataKey="name" width={102}
                    tick={{fill:"#94A3B8",fontSize:9}} axisLine={false} tickLine={false}/>
                  <Tooltip content={<DeptTip/>} cursor={{fill:"rgba(255,255,255,0.025)"}}/>
                  <Bar dataKey="value" radius={[0,5,5,0]} maxBarSize={22}
                    onClick={d=>setSelDept(d.fullName)} style={{cursor:"pointer"}}>
                    <LabelList dataKey="value" position="right"
                      style={{fill:color,fontSize:9,fontWeight:700}}/>
                    {deptBarData.map((_,i)=>{
                      const a=Math.round((0.35+(deptBarData[i].value/maxDept)*0.65)*255).toString(16).padStart(2,"0");
                      return <Cell key={i} fill={`${color}${a}`}/>;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{maxHeight: 300, overflowY:"auto",display:"flex",flexDirection:"column",gap:2}}>
              {sortedDepts.map((d,i)=>(
                <div key={d.name} onClick={()=>setSelDept(d.name)}
                  style={{display:"flex",alignItems:"center",gap:7,padding:"5px 9px",
                    borderRadius:7,background:"rgba(255,255,255,0.015)",
                    border:"1px solid rgba(255,255,255,0.04)",
                    cursor:"pointer",transition:"background 0.15s"}}
                  onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.05)"}
                  onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.015)"}>
                  <div style={{width:18,height:18,borderRadius:5,background:`${color}20`,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    color,fontSize:9,fontWeight:800,flexShrink:0}}>{i+1}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{color:"#E2E8F0",fontSize:10,fontWeight:600,
                      overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.name}</div>
                    <div style={{color:"#64748B",fontSize:8}}>{d.count} موظف</div>
                  </div>
                  <div style={{color,fontWeight:800,fontSize:13,flexShrink:0}}>{d[key]}</div>
                  <div style={{color:"#1E3A5F",fontSize:10,flexShrink:0}}>←</div>
                </div>
              ))}
            </div>
          </div>

          {/* EMPLOYEES PANEL */}
          <div style={{flex:1,minWidth:320,display:"flex",flexDirection:"column",gap:10,
            background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",
            borderRadius:14,padding:"13px 14px",overflow:"hidden"}}>

            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{color:"#94A3B8",fontSize:12,fontWeight:700}}>👤 أعلى 10 موظفين</span>
              <span style={{color:"#1E3A5F",fontSize:10,background:"rgba(255,255,255,0.03)",
                border:"1px solid rgba(255,255,255,0.06)",borderRadius:5,padding:"2px 8px"}}>
                اضغط ← للملف
              </span>
            </div>

            <div style={{height:200}}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={empBarData} layout="vertical"
                  margin={{top:0,right:42,left:104,bottom:0}}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.04)"/>
                  <XAxis type="number" tick={{fill:"#334155",fontSize:9}} axisLine={false} tickLine={false}/>
                  <YAxis type="category" dataKey="name" width={102}
                    tick={{fill:"#94A3B8",fontSize:9}} axisLine={false} tickLine={false}/>
                  <Tooltip content={<EmpTip/>} cursor={{fill:"rgba(255,255,255,0.025)"}}/>
                  <Bar dataKey="value" radius={[0,5,5,0]} maxBarSize={22}
                    onClick={d=>setSelEmp(d._emp)} style={{cursor:"pointer"}}>
                    <LabelList dataKey="value" position="right"
                      style={{fill:color,fontSize:9,fontWeight:700}}/>
                    {empBarData.map((_,i)=>{
                      const a=Math.round((0.35+(empBarData[i].value/maxEmp)*0.65)*255).toString(16).padStart(2,"0");
                      return <Cell key={i} fill={`${color}${a}`}/>;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{maxHeight: 300, overflowY:"auto",display:"flex",flexDirection:"column",gap:2}}>
              {top10.map((emp,i)=>(
                <div key={emp.code} onClick={()=>setSelEmp(emp)}
                  style={{display:"flex",alignItems:"center",gap:7,padding:"5px 9px",
                    borderRadius:7,background:"rgba(255,255,255,0.015)",
                    border:"1px solid rgba(255,255,255,0.04)",
                    cursor:"pointer",transition:"background 0.15s"}}
                  onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.05)"}
                  onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.015)"}>
                  <div style={{width:18,height:18,borderRadius:5,background:`${color}20`,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    color,fontSize:9,fontWeight:800,flexShrink:0}}>{i+1}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{color:"#E2E8F0",fontSize:10,fontWeight:600,
                      overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{emp.name}</div>
                    <div style={{color:"#64748B",fontSize:8,
                      overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{emp.dept}</div>
                  </div>
                  <div style={{color,fontWeight:800,fontSize:13,flexShrink:0}}>{emp[key]}</div>
                  <div style={{color:"#1E3A5F",fontSize:10,flexShrink:0}}>←</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{display:"flex",gap:8,justifyContent:"flex-end",flexWrap:"wrap", paddingBottom: 20}}>
          {[
            {label:"إجمالي",    val: EMPLOYEES.reduce((s,e)=>s+e[key],0)},
            {label:"أعلى قيمة",val: top10[0]?.[key]??0},
            {label:"متوسط",     val: Math.round(EMPLOYEES.reduce((s,e)=>s+e[key],0)/EMPLOYEES.length)},
          ].map(p=>(
            <div key={p.label} style={{background:`${color}10`,border:`1px solid ${color}22`,
              borderRadius:9,padding:"7px 14px",textAlign:"center"}}>
              <div style={{color,fontWeight:800,fontSize:16}}>{p.val}</div>
              <div style={{color:"#475569",fontSize:10,marginTop:1}}>{p.label}</div>
            </div>
          ))}
        </div>
      </main>

      {selEmp  && <EmployeeModal emp={selEmp}  onClose={()=>setSelEmp(null)}/>}
      {selDept && <DeptModal dept={selDept} activeKey={key} color={color} onClose={()=>setSelDept(null)}/>}
    </div>
  );
}
