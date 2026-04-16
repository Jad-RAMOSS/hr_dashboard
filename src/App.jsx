import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell, LabelList, PieChart, Pie, Legend
} from "recharts";

const EMPLOYEES = [{"code": 5, "name": "محمود محمد محمود علي", "dept": "عمليات المبيعات", "pos": "مشرف عمليات المبيعات ", "work": 62, "inc_hrs": "15:40", "early_hrs": "9:21", "no_sig": 1, "abs": 0, "late_hrs": "0:0", "reg": 5, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 11, "bal_reg": 22.0, "bal_emerg": 7.0, "bal_2025": 29.0, "bal_total": 58.0}, {"code": 6, "name": "إبراهيم علاء صادق علي ", "dept": "عمليات المبيعات", "pos": "مشرف عمليات مبيعات", "work": 65, "inc_hrs": "18:58", "early_hrs": "11:3", "no_sig": 1, "abs": 1, "late_hrs": "0:58", "reg": 2, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 8, "bal_reg": 22.0, "bal_emerg": 7.0, "bal_2025": 27.0, "bal_total": 56.0}, {"code": 7, "name": "أحمد عمر محمد خلف", "dept": "تطوير الأعمال", "pos": "رئيس قطاع تطوير الأعمال / نائب العضو المنتدب", "work": 60, "inc_hrs": "17:36", "early_hrs": "3:13", "no_sig": 5, "abs": 3, "late_hrs": "6:58", "reg": 6, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 12, "bal_reg": 20.0, "bal_emerg": 7.0, "bal_2025": 14.0, "bal_total": 41.0}, {"code": 8, "name": "أمجد محمد سمير علي", "dept": "تطوير الأعمال", "pos": "مدير  أول تطوير مشروعات التمويل", "work": 58, "inc_hrs": "21:28", "early_hrs": "11:58", "no_sig": 2, "abs": 1, "late_hrs": "0:37", "reg": 8, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 14, "bal_reg": 22.0, "bal_emerg": 7.0, "bal_2025": 5.0, "bal_total": 34.0}, {"code": 9, "name": "كرستينا وليم نصيف عجايبي", "dept": "تطوير الأعمال", "pos": "مشرف أول تطوير الأعمال", "work": 50, "inc_hrs": "15:40", "early_hrs": "2:34", "no_sig": 3, "abs": 4, "late_hrs": "5:7", "reg": 13, "sick": 0, "off_hol": 8, "mat": 0, "total_leave": 21, "bal_reg": 12.0, "bal_emerg": 7.0, "bal_2025": 11.0, "bal_total": 30.0}, {"code": 11, "name": "أحمد رأفت محمد عبدالمجيد", "dept": "الموارد البشرية", "pos": "رئيس قطاع الموارد البشرية", "work": 57, "inc_hrs": "16:57", "early_hrs": "2:4", "no_sig": 13, "abs": 1, "late_hrs": "19:34", "reg": 9, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 15, "bal_reg": 22.0, "bal_emerg": 7.0, "bal_2025": 22.0, "bal_total": 51.0}, {"code": 16, "name": "هاني رمضان عبدالعزبز روبي ", "dept": "أمن المعلومات", "pos": "مدير أول إدارة أمن المعلومات", "work": 61, "inc_hrs": "30:19", "early_hrs": "7:58", "no_sig": 9, "abs": 2, "late_hrs": "9:15", "reg": 5, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 11, "bal_reg": 12.0, "bal_emerg": 7.0, "bal_2025": 22.0, "bal_total": 41.0}, {"code": 19, "name": "محمد عادل عبدالعليم الكفراوى", "dept": "الحسابات", "pos": "مشرف المحاسبة", "work": 62, "inc_hrs": "27:25", "early_hrs": "11:37", "no_sig": 6, "abs": 2, "late_hrs": "5:40", "reg": 6, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 12, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 12.0, "bal_total": 32.0}, {"code": 20, "name": "سامح سعدالدين محمود علي", "dept": "الحسابات", "pos": "مشرف حسابات", "work": 60, "inc_hrs": "29:45", "early_hrs": "9:10", "no_sig": 2, "abs": 0, "late_hrs": "7:16", "reg": 8, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 14, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 0.0, "bal_total": 20.0}, {"code": 25, "name": "ياسمين عبدالنعيم حامد محمود", "dept": " الدعاية و التسويق", "pos": "مشرف علاقات عامة", "work": 56, "inc_hrs": "18:55", "early_hrs": "5:1", "no_sig": 6, "abs": 2, "late_hrs": "11:1", "reg": 9, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 15, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 3.0, "bal_total": 23.0}, {"code": 26, "name": "وائل عوض علي علي", "dept": "تكنولوجيا المعلومات", "pos": "مصمم برمجيات", "work": 48, "inc_hrs": "9:58", "early_hrs": "2:49", "no_sig": 3, "abs": 0, "late_hrs": "1:58", "reg": 19, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 25, "bal_reg": 21.0, "bal_emerg": 7.0, "bal_2025": 10.0, "bal_total": 38.0}, {"code": 27, "name": "أحمد محمد سعيد عبدالفتاح الخضرى", "dept": "العمليات المركزية", "pos": "مشرف أول عمليات", "work": 61, "inc_hrs": "18:3", "early_hrs": "4:51", "no_sig": 1, "abs": 0, "late_hrs": "4:24", "reg": 8, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 14, "bal_reg": 22.0, "bal_emerg": 7.0, "bal_2025": 7.5, "bal_total": 36.5}, {"code": 29, "name": "هنادي محمد نورالدين عبدالله شومان ", "dept": "العمليات المركزية", "pos": "مشرف عمليات", "work": 57, "inc_hrs": "23:15", "early_hrs": "4:57", "no_sig": 0, "abs": 1, "late_hrs": "7:40", "reg": 8, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 14, "bal_reg": 8.0, "bal_emerg": 6.0, "bal_2025": 6.0, "bal_total": 20.0}, {"code": 31, "name": "محمد جمال عبدالحافظ خليفة", "dept": "الشئون الإدارية", "pos": "مشرف أول شئون إدارية", "work": 60, "inc_hrs": "6:30", "early_hrs": "0:0", "no_sig": 8, "abs": 0, "late_hrs": "7:54", "reg": 7, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 13, "bal_reg": 16.0, "bal_emerg": 7.0, "bal_2025": 0.0, "bal_total": 23.0}, {"code": 32, "name": "محمد شحات أحمد حنفي", "dept": "الشئون الإدارية", "pos": "مساعد شئون إدارية", "work": 55, "inc_hrs": "3:45", "early_hrs": "0:0", "no_sig": 0, "abs": 3, "late_hrs": "0:0", "reg": 11, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 17, "bal_reg": 11.0, "bal_emerg": 7.0, "bal_2025": 0.0, "bal_total": 18.0}, {"code": 33, "name": "سيد حمدالله عبدالحميد عبدالعال", "dept": "الشئون الإدارية", "pos": "مساعد شئون إدارية", "work": 76, "inc_hrs": "2:15", "early_hrs": "0:0", "no_sig": 5, "abs": 5, "late_hrs": "9:46", "reg": 16, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 22, "bal_reg": 16.0, "bal_emerg": 7.0, "bal_2025": 1.0, "bal_total": 24.0}, {"code": 34, "name": "محمد نصرالدين محمد علي", "dept": "الشئون الإدارية", "pos": "مساعد شئون إدارية", "work": 53, "inc_hrs": "10:10", "early_hrs": "7:37", "no_sig": 3, "abs": 0, "late_hrs": "0:0", "reg": 15, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 21, "bal_reg": 13.0, "bal_emerg": 4.0, "bal_2025": 0.0, "bal_total": 17.0}, {"code": 37, "name": "عبدالرحمن محمود سيد نعيم", "dept": "الشئون الإدارية", "pos": "سائق", "work": 62, "inc_hrs": "16:43", "early_hrs": "4:37", "no_sig": 7, "abs": 0, "late_hrs": "4:10", "reg": 5, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 11, "bal_reg": 10.0, "bal_emerg": 7.0, "bal_2025": 0.0, "bal_total": 17.0}, {"code": 39, "name": "محمود محمد محمود محمد", "dept": "الشئون الإدارية", "pos": "سائق", "work": 60, "inc_hrs": "11:12", "early_hrs": "2:28", "no_sig": 6, "abs": 1, "late_hrs": "7:10", "reg": 6, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 12, "bal_reg": 10.0, "bal_emerg": 6.0, "bal_2025": 0.0, "bal_total": 16.0}, {"code": 256, "name": "وسام عصام راشد أحمد", "dept": "تطوير الأعمال", "pos": "مشرف تطوير الأعمال", "work": 53, "inc_hrs": "18:45", "early_hrs": "9:7", "no_sig": 0, "abs": 6, "late_hrs": "3:40", "reg": 8, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 14, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 15.0, "bal_total": 35.0}, {"code": 257, "name": "هدير أحمد محمد أحمد", "dept": "العمليات المالية", "pos": "مشرف العمليات المالية", "work": 59, "inc_hrs": "15:45", "early_hrs": "9:28", "no_sig": 10, "abs": 0, "late_hrs": "0:34", "reg": 8, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 14, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 8.0, "bal_total": 28.0}, {"code": 259, "name": "شيماء محمد حسن محمد", "dept": "تحليلات المبيعات", "pos": "مشرف تحليلات المبيعات ", "work": 61, "inc_hrs": "11:13", "early_hrs": "4:58", "no_sig": 3, "abs": 2, "late_hrs": "7:49", "reg": 4, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 10, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 25.0, "bal_total": 45.0}, {"code": 279, "name": "محمود سيد حسين أحمد", "dept": "العمليات المركزية", "pos": "فنى صيانة POS", "work": 48, "inc_hrs": "3:15", "early_hrs": "0:0", "no_sig": 5, "abs": 6, "late_hrs": "0:0", "reg": 16, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 22, "bal_reg": 2.0, "bal_emerg": 7.0, "bal_2025": 0.0, "bal_total": 9.0}, {"code": 373, "name": "أحمد عادل عبدالحميد شفيق ", "dept": "تكنولوجيا المعلومات", "pos": "أخصائي جودة نظم", "work": 70, "inc_hrs": "16:55", "early_hrs": "7:28", "no_sig": 3, "abs": 1, "late_hrs": "2:13", "reg": 5, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 11, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 9.0, "bal_total": 29.0}, {"code": 375, "name": "مروه عبدالمنعم محمد محمد", "dept": "تطوير الأعمال", "pos": "مشرف ادارة مشروعات", "work": 62, "inc_hrs": "15:42", "early_hrs": "7:28", "no_sig": 2, "abs": 0, "late_hrs": "1:43", "reg": 4, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 10, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 25.0, "bal_total": 45.0}, {"code": 481, "name": "أحمد عزت أحمد السيد", "dept": "الحسابات", "pos": "رئيس قطاع الإدارة المالية", "work": 62, "inc_hrs": "22:22", "early_hrs": "6:15", "no_sig": 25, "abs": 3, "late_hrs": "26:49", "reg": 2, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 8, "bal_reg": 21.0, "bal_emerg": 7.0, "bal_2025": 30.0, "bal_total": 58.0}, {"code": 482, "name": "عبدالرحمن عزيز السيد محمد", "dept": "الحسابات", "pos": "مشرف حسابات", "work": 48, "inc_hrs": "14:19", "early_hrs": "8:10", "no_sig": 6, "abs": 0, "late_hrs": "7:52", "reg": 20, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 26, "bal_reg": 0.0, "bal_emerg": 2.0, "bal_2025": 0.0, "bal_total": 2.0}, {"code": 483, "name": "أحمد حامد محمد حامد", "dept": "العمليات المركزية", "pos": "أخصائي عمليات", "work": 59, "inc_hrs": "9:24", "early_hrs": "5:3", "no_sig": 3, "abs": 2, "late_hrs": "0:0", "reg": 4, "sick": 3, "off_hol": 6, "mat": 0, "total_leave": 13, "bal_reg": 22.0, "bal_emerg": 7.0, "bal_2025": 19.0, "bal_total": 48.0}, {"code": 484, "name": "محمد رمضان عبدالرحيم أحمد", "dept": "العمليات المركزية", "pos": "مشرف عمليات", "work": 62, "inc_hrs": "20:18", "early_hrs": "2:33", "no_sig": 10, "abs": 3, "late_hrs": "6:52", "reg": 8, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 14, "bal_reg": 13.0, "bal_emerg": 6.0, "bal_2025": 12.0, "bal_total": 31.0}, {"code": 485, "name": "محمود عباس عبدالسلام ضيف", "dept": "تحليلات المبيعات", "pos": "مدير تحليلات المبيعات  و العمليات المالية", "work": 62, "inc_hrs": "8:4", "early_hrs": "2:12", "no_sig": 4, "abs": 1, "late_hrs": "7:34", "reg": 3, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 9, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 19.0, "bal_total": 39.0}, {"code": 486, "name": "أحمد محمود أحمد محمود", "dept": "العمليات المركزية", "pos": "رئيس قطاع العمليات المركزية", "work": 63, "inc_hrs": "3:24", "early_hrs": "0:0", "no_sig": 54, "abs": 1, "late_hrs": "27:27", "reg": 3, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 9, "bal_reg": 22.0, "bal_emerg": 7.0, "bal_2025": 19.0, "bal_total": 48.0}, {"code": 501, "name": "هشام رمضان عبدالرحيم رمضان", "dept": "عمليات المبيعات", "pos": "مدير عمليات المبيعات", "work": 60, "inc_hrs": "21:49", "early_hrs": "11:45", "no_sig": 10, "abs": 0, "late_hrs": "2:13", "reg": 9, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 15, "bal_reg": 12.0, "bal_emerg": 7.0, "bal_2025": 12.0, "bal_total": 31.0}, {"code": 502, "name": "عمار فؤاد سعيد رضا", "dept": "تطوير الأعمال", "pos": "مدير تطوير الأعمال", "work": 67, "inc_hrs": "21:16", "early_hrs": "11:34", "no_sig": 0, "abs": 7, "late_hrs": "1:9", "reg": 2, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 8, "bal_reg": 22.0, "bal_emerg": 7.0, "bal_2025": 30.0, "bal_total": 59.0}, {"code": 503, "name": "محمد حسين صالح علي", "dept": "الموارد البشرية", "pos": "أخصائي أول الموارد البشرية ", "work": 65, "inc_hrs": "14:15", "early_hrs": "5:7", "no_sig": 15, "abs": 0, "late_hrs": "11:25", "reg": 3, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 9, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 13.5, "bal_total": 33.5}, {"code": 504, "name": "محمد علي عصمت السيسي", "dept": "عمليات المبيعات", "pos": "أخصائي أول عمليات المبيعات ", "work": 63, "inc_hrs": "16:16", "early_hrs": "5:1", "no_sig": 2, "abs": 1, "late_hrs": "4:24", "reg": 4, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 10, "bal_reg": 12.0, "bal_emerg": 7.0, "bal_2025": 13.0, "bal_total": 32.0}, {"code": 582, "name": "مني أحمد شعبان إبراهيم", "dept": " الدعاية و التسويق", "pos": "أخصائي أول تسويق", "work": 58, "inc_hrs": "26:3", "early_hrs": "10:13", "no_sig": 0, "abs": 5, "late_hrs": "2:58", "reg": 5, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 11, "bal_reg": 11.0, "bal_emerg": 7.0, "bal_2025": 4.0, "bal_total": 22.0}, {"code": 630, "name": "عاصم إبراهيم إبراهيم الدخاخني", "dept": "الشئون الإدارية", "pos": "مشرف أول شئون إدارية", "work": 63, "inc_hrs": "14:30", "early_hrs": "5:1", "no_sig": 2, "abs": 0, "late_hrs": "5:19", "reg": 4, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 10, "bal_reg": 20.0, "bal_emerg": 7.0, "bal_2025": 1.0, "bal_total": 28.0}, {"code": 640, "name": "فادي يوسف جورج يوسف", "dept": " الدعاية و التسويق", "pos": "اخصائى  تسويق تجاري", "work": 40, "inc_hrs": "15:16", "early_hrs": "6:43", "no_sig": 0, "abs": 6, "late_hrs": "0:37", "reg": 10, "sick": 0, "off_hol": 8, "mat": 0, "total_leave": 18, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 19.0, "bal_total": 39.0}, {"code": 745, "name": "مازن لؤي قصى محب الدين الخطيب", "dept": "تطوير الأعمال", "pos": "مدير أول تطوير الأعمال", "work": 63, "inc_hrs": "8:25", "early_hrs": "1:1", "no_sig": 3, "abs": 0, "late_hrs": "10:37", "reg": 5, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 11, "bal_reg": 7.0, "bal_emerg": 7.0, "bal_2025": 23.0, "bal_total": 37.0}, {"code": 781, "name": "سلمى حسن أحمد محمد ثابت", "dept": "تطوير الأعمال", "pos": "مدير تطوير الأعمال", "work": 62, "inc_hrs": "31:0", "early_hrs": "10:19", "no_sig": 3, "abs": 0, "late_hrs": "7:33", "reg": 10, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 16, "bal_reg": 22.0, "bal_emerg": 6.0, "bal_2025": 16.0, "bal_total": 44.0}, {"code": 888, "name": "عمر مختار جمال عبدالغفور", "dept": "الحسابات", "pos": "محاسب أول", "work": 64, "inc_hrs": "23:55", "early_hrs": "8:19", "no_sig": 1, "abs": 0, "late_hrs": "7:33", "reg": 4, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 10, "bal_reg": 12.0, "bal_emerg": 7.0, "bal_2025": 1.0, "bal_total": 20.0}, {"code": 910, "name": "ياسر عبدالفتاح نسيم أحمد", "dept": "الشئون الإدارية", "pos": "موظف إستقبال", "work": 59, "inc_hrs": "25:16", "early_hrs": "7:58", "no_sig": 2, "abs": 0, "late_hrs": "2:3", "reg": 9, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 15, "bal_reg": 16.0, "bal_emerg": 7.0, "bal_2025": -2.0, "bal_total": 21.0}, {"code": 1037, "name": "سعيد عيدالمنعم عبدالفتاح النحاس", "dept": "تكنولوجيا المعلومات", "pos": "مطور أول برمجيات", "work": 71, "inc_hrs": "2:18", "early_hrs": "1:9", "no_sig": 1, "abs": 1, "late_hrs": "0:0", "reg": 8, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 14, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 10.0, "bal_total": 30.0}, {"code": 1159, "name": "أميرة شوقي أمين عوض", "dept": "تكنولوجيا المعلومات", "pos": "مشرف أول تطوير برمجيات", "work": 65, "inc_hrs": "3:30", "early_hrs": "0:0", "no_sig": 2, "abs": 5, "late_hrs": "8:3", "reg": 5, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 11, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 4.0, "bal_total": 24.0}, {"code": 1166, "name": "عمرو أحمد تيسير السيد محمد عبدالغني", "dept": "تكنولوجيا المعلومات", "pos": "مشرف أول جودة نظم", "work": 62, "inc_hrs": "9:19", "early_hrs": "0:0", "no_sig": 0, "abs": 7, "late_hrs": "1:33", "reg": 2, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 8, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 22.0, "bal_total": 42.0}, {"code": 1167, "name": "عبدالله وجيه نجاح سليمان سليمان", "dept": "الشئون الإدارية", "pos": "مساعد شئون إدارية", "work": 37, "inc_hrs": "9:16", "early_hrs": "0:40", "no_sig": 4, "abs": 3, "late_hrs": "13:49", "reg": 19, "sick": 15, "off_hol": 6, "mat": 0, "total_leave": 40, "bal_reg": 9.0, "bal_emerg": 6.0, "bal_2025": 0.0, "bal_total": 15.0}, {"code": 1188, "name": "أحمد محمد عبدالعزيز أحمد محمد", "dept": "تحليلات المبيعات", "pos": "أخصائي أول تحليل المبيعات ", "work": 57, "inc_hrs": "9:6", "early_hrs": "0:0", "no_sig": 0, "abs": 8, "late_hrs": "3:19", "reg": 2, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 8, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 26.0, "bal_total": 46.0}, {"code": 1224, "name": "آية ممدوح أحمد عبدالجواد شتا", "dept": "الموارد البشرية", "pos": "أخصائي الموارد البشرية ", "work": 55, "inc_hrs": "18:28", "early_hrs": "6:37", "no_sig": 3, "abs": 5, "late_hrs": "5:7", "reg": 9, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 15, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 10.0, "bal_total": 30.0}, {"code": 1331, "name": "محمود أيمن محمد علي", "dept": "تكنولوجيا المعلومات", "pos": "مطور برمجيات", "work": 49, "inc_hrs": "25:52", "early_hrs": "7:52", "no_sig": 2, "abs": 56, "late_hrs": "15:0", "reg": 2, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 8, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 10.0, "bal_total": 30.0}, {"code": 1408, "name": "محمود رضا محمود السيد", "dept": "العمليات المركزية", "pos": "أخصائي عمليات", "work": 61, "inc_hrs": "22:37", "early_hrs": "7:55", "no_sig": 2, "abs": 0, "late_hrs": "5:55", "reg": 12, "sick": 6, "off_hol": 6, "mat": 0, "total_leave": 24, "bal_reg": 5.0, "bal_emerg": 6.0, "bal_2025": 1.0, "bal_total": 12.0}, {"code": 1461, "name": "ليلى فاروق علي أحمد عبدربه", "dept": " الدعاية و التسويق", "pos": "رئيس قطاع الدعاية والتسويق", "work": 49, "inc_hrs": "2:45", "early_hrs": "0:0", "no_sig": 38, "abs": 0, "late_hrs": "28:34", "reg": 21, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 27, "bal_reg": 0.0, "bal_emerg": 0.0, "bal_2025": 0.0, "bal_total": 0.0}, {"code": 1477, "name": "ماريو مجدي أسعد غبريال", "dept": "تكنولوجيا المعلومات", "pos": "مشرف دعم النظم", "work": 62, "inc_hrs": "0:0", "early_hrs": "0:0", "no_sig": 0, "abs": 45, "late_hrs": "0:0", "reg": 2, "sick": 0, "off_hol": 8, "mat": 0, "total_leave": 10, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 19.0, "bal_total": 39.0}, {"code": 1481, "name": "محمد سيد محمد عبدالقادر", "dept": "العمليات المركزية", "pos": "أخصائي اول عمليات ", "work": 58, "inc_hrs": "20:15", "early_hrs": "6:1", "no_sig": 1, "abs": 2, "late_hrs": "10:36", "reg": 9, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 15, "bal_reg": 13.0, "bal_emerg": 5.0, "bal_2025": 6.0, "bal_total": 24.0}, {"code": 1482, "name": "برسوم نعيم سليمان يوسف", "dept": "العمليات المركزية", "pos": "أخصائي عمليات ", "work": 58, "inc_hrs": "12:22", "early_hrs": "7:10", "no_sig": 1, "abs": 6, "late_hrs": "0:0", "reg": 4, "sick": 0, "off_hol": 8, "mat": 0, "total_leave": 12, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 20.0, "bal_total": 40.0}, {"code": 1492, "name": "مينا أنسي حافظ أبادير سعيد", "dept": "تكنولوجيا المعلومات", "pos": "مطور برمجيات", "work": 56, "inc_hrs": "7:10", "early_hrs": "2:25", "no_sig": 0, "abs": 2, "late_hrs": "0:0", "reg": 11, "sick": 0, "off_hol": 8, "mat": 0, "total_leave": 19, "bal_reg": 12.0, "bal_emerg": 7.0, "bal_2025": 4.0, "bal_total": 23.0}, {"code": 1493, "name": "مصطفى محمد محمود مدكور موسى", "dept": "تكنولوجيا المعلومات", "pos": "مطور برمجيات", "work": 59, "inc_hrs": "13:18", "early_hrs": "6:58", "no_sig": 0, "abs": 1, "late_hrs": "0:0", "reg": 12, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 18, "bal_reg": 11.0, "bal_emerg": 5.0, "bal_2025": 0.0, "bal_total": 16.0}, {"code": 1494, "name": "أحمد خالد كمال أحمد", "dept": "العمليات المركزية", "pos": "أخصائي اول عمليات ", "work": 55, "inc_hrs": "9:52", "early_hrs": "4:58", "no_sig": 1, "abs": 10, "late_hrs": "8:36", "reg": 7, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 13, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 22.0, "bal_total": 42.0}, {"code": 1496, "name": "يمنى حسن أحمد حسين محمد خليل", "dept": "تكنولوجيا المعلومات", "pos": "أخصائي جودة نظم", "work": 61, "inc_hrs": "11:25", "early_hrs": "4:49", "no_sig": 0, "abs": 4, "late_hrs": "0:31", "reg": 10, "sick": 4, "off_hol": 6, "mat": 0, "total_leave": 20, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 0.0, "bal_total": 20.0}, {"code": 1569, "name": "سارة محمد حسن جاد", "dept": "العمليات المالية", "pos": "أخصائي العمليات المالية", "work": 60, "inc_hrs": "12:28", "early_hrs": "2:48", "no_sig": 0, "abs": 1, "late_hrs": "4:24", "reg": 7, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 13, "bal_reg": 12.0, "bal_emerg": 7.0, "bal_2025": 14.0, "bal_total": 33.0}, {"code": 1570, "name": "مصطفى محمود محمد إبراهيم", "dept": "الموارد البشرية", "pos": "مشرف التوظيف", "work": 26, "inc_hrs": "1:15", "early_hrs": "0:0", "no_sig": 1, "abs": 0, "late_hrs": "0:0", "reg": 46, "sick": 24, "off_hol": 6, "mat": 0, "total_leave": 76, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 20.0, "bal_total": 40.0}, {"code": 1589, "name": "عمر محمد مجدي فرج", "dept": "تكنولوجيا المعلومات", "pos": "مطور برمجيات", "work": 55, "inc_hrs": "15:30", "early_hrs": "4:52", "no_sig": 3, "abs": 2, "late_hrs": "2:57", "reg": 12, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 18, "bal_reg": 8.0, "bal_emerg": 6.0, "bal_2025": 0.0, "bal_total": 14.0}, {"code": 1590, "name": "سلمى محمود محمد رسمي", "dept": "الحسابات", "pos": "محاسب", "work": 60, "inc_hrs": "22:15", "early_hrs": "10:9", "no_sig": 0, "abs": 0, "late_hrs": "2:10", "reg": 7, "sick": 2, "off_hol": 6, "mat": 0, "total_leave": 15, "bal_reg": 11.0, "bal_emerg": 7.0, "bal_2025": 6.0, "bal_total": 24.0}, {"code": 1596, "name": "أحمد سيد حمدالله عبدالحميد", "dept": "الحسابات", "pos": "موظف الحسابات", "work": 57, "inc_hrs": "7:40", "early_hrs": "2:42", "no_sig": 30, "abs": 6, "late_hrs": "4:13", "reg": 7, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 13, "bal_reg": 5.0, "bal_emerg": 7.0, "bal_2025": 0.0, "bal_total": 12.0}, {"code": 1609, "name": "مصطفى محمدالمهدي أمين محمد", "dept": "تكنولوجيا المعلومات", "pos": "مطور برمجيات", "work": 63, "inc_hrs": "5:45", "early_hrs": "2:30", "no_sig": 1, "abs": 3, "late_hrs": "0:0", "reg": 9, "sick": 7, "off_hol": 6, "mat": 0, "total_leave": 22, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 5.0, "bal_total": 25.0}, {"code": 1610, "name": "عبدالله رجب بكري محمد", "dept": "تكنولوجيا المعلومات", "pos": "مطور برمجيات", "work": 65, "inc_hrs": "4:45", "early_hrs": "0:0", "no_sig": 0, "abs": 2, "late_hrs": "0:0", "reg": 15, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 21, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 3.0, "bal_total": 23.0}, {"code": 1628, "name": "كريم حسنين عبدالمنعم حسنين", "dept": "العمليات المالية", "pos": "أخصائي العمليات المالية", "work": 59, "inc_hrs": "4:45", "early_hrs": "0:0", "no_sig": 9, "abs": 1, "late_hrs": "9:27", "reg": 8, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 14, "bal_reg": 11.0, "bal_emerg": 7.0, "bal_2025": 4.0, "bal_total": 22.0}, {"code": 1700, "name": "عبدالرحمن سعيد امام عبدالجواد", "dept": "العمليات المركزية", "pos": "أخصائي عمليات", "work": 71, "inc_hrs": "3:45", "early_hrs": "0:0", "no_sig": 0, "abs": 0, "late_hrs": "16:30", "reg": 17, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 23, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 5.5, "bal_total": 25.5}, {"code": 1701, "name": "عمرو محمد عبدالتواب محمد", "dept": "العمليات المالية", "pos": "أخصائي أول العمليات المالية", "work": 60, "inc_hrs": "8:10", "early_hrs": "0:0", "no_sig": 5, "abs": 3, "late_hrs": "14:10", "reg": 3, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 9, "bal_reg": 12.0, "bal_emerg": 7.0, "bal_2025": 13.5, "bal_total": 32.5}, {"code": 1733, "name": "عمر محمد صابر علي", "dept": "العمليات المركزية", "pos": "أخصائي عمليات", "work": 74, "inc_hrs": "3:30", "early_hrs": "0:0", "no_sig": 1, "abs": 6, "late_hrs": "16:30", "reg": 2, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 8, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 14.0, "bal_total": 34.0}, {"code": 1738, "name": "عمرو محمد محمود محمد هارون", "dept": "تكنولوجيا المعلومات", "pos": "مطور برمجيات", "work": 77, "inc_hrs": "9:31", "early_hrs": "0:0", "no_sig": 3, "abs": 2, "late_hrs": "0:30", "reg": 3, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 9, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 11.75, "bal_total": 31.75}, {"code": 1739, "name": "محب يسري وديع وليم", "dept": "تكنولوجيا المعلومات", "pos": "مطور برمجيات", "work": 68, "inc_hrs": "14:21", "early_hrs": "7:21", "no_sig": 3, "abs": 1, "late_hrs": "0:0", "reg": 4, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 10, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 11.75, "bal_total": 31.75}, {"code": 1740, "name": "اشرف سمير عبدالغفار عبدالجواد منتصر", "dept": "الموارد البشرية", "pos": "مدير الرواتب وشئون العاملين", "work": 61, "inc_hrs": "10:13", "early_hrs": "4:34", "no_sig": 19, "abs": 0, "late_hrs": "0:37", "reg": 6, "sick": 2, "off_hol": 6, "mat": 0, "total_leave": 14, "bal_reg": 22.0, "bal_emerg": 7.0, "bal_2025": 15.0, "bal_total": 44.0}, {"code": 1753, "name": "منه الله احمد الدسوقى عبدالعال", "dept": "الموارد البشرية", "pos": "أخصائي الموارد البشرية ", "work": 51, "inc_hrs": "9:21", "early_hrs": "5:7", "no_sig": 4, "abs": 0, "late_hrs": "0:30", "reg": 16, "sick": 3, "off_hol": 6, "mat": 0, "total_leave": 25, "bal_reg": 4.0, "bal_emerg": 7.0, "bal_2025": 1.25, "bal_total": 12.25}, {"code": 1775, "name": "جاد شريف جاد سليمان الواحى", "dept": "تكنولوجيا المعلومات", "pos": "مطور برمجيات", "work": 37, "inc_hrs": "13:34", "early_hrs": "0:0", "no_sig": 0, "abs": 30, "late_hrs": "1:40", "reg": 2, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 8, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 10.5, "bal_total": 30.5}, {"code": 1777, "name": "احمد صلاح الدين محمد احمد", "dept": "تطوير الأعمال", "pos": "مشرف أول تطوير الأعمال", "work": 54, "inc_hrs": "19:46", "early_hrs": "6:43", "no_sig": 2, "abs": 0, "late_hrs": "1:19", "reg": 13, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 19, "bal_reg": 14.0, "bal_emerg": 6.0, "bal_2025": 3.5, "bal_total": 23.5}, {"code": 1780, "name": "على عبد الحميد سيد عبدالحميد", "dept": "الموارد البشرية", "pos": "اخصائى توظيف", "work": 60, "inc_hrs": "17:7", "early_hrs": "5:12", "no_sig": 0, "abs": 2, "late_hrs": "5:12", "reg": 5, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 11, "bal_reg": 12.0, "bal_emerg": 7.0, "bal_2025": 2.75, "bal_total": 21.75}, {"code": 1791, "name": "محمد يحيى محمد خطاب", "dept": "العمليات المالية", "pos": "أخصائي العمليات المالية", "work": 62, "inc_hrs": "9:31", "early_hrs": "5:1", "no_sig": 0, "abs": 3, "late_hrs": "0:0", "reg": 4, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 10, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 5.75, "bal_total": 25.75}, {"code": 1800, "name": "يوسف هاني روفائيل ميخيائيل", "dept": "تكنولوجيا المعلومات", "pos": "اخصائى دعم نظم", "work": 45, "inc_hrs": "6:55", "early_hrs": "0:0", "no_sig": 0, "abs": 48, "late_hrs": "0:36", "reg": 2, "sick": 0, "off_hol": 8, "mat": 0, "total_leave": 10, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 2.0, "bal_total": 22.0}, {"code": 1813, "name": "مصطفي شريف السيد عطيه عفيفي", "dept": "العمليات المركزية ", "pos": "اخصائى عمليات مركزية", "work": 69, "inc_hrs": "9:57", "early_hrs": "7:25", "no_sig": 1, "abs": 9, "late_hrs": "0:0", "reg": 2, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 8, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 3.0, "bal_total": 23.0}, {"code": 1843, "name": "نورهان وائل قرنى عبدالوهاب", "dept": "الحسابات", "pos": "محاسب", "work": 64, "inc_hrs": "13:31", "early_hrs": "7:46", "no_sig": 4, "abs": 0, "late_hrs": "0:0", "reg": 3, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 9, "bal_reg": 12.0, "bal_emerg": 7.0, "bal_2025": 1.25, "bal_total": 20.25}, {"code": 1860, "name": "محمد اسامه عبد الرؤوف على سلامه", "dept": "تكنولوجيا المعلومات", "pos": "اخصائى دعم نظم", "work": 39, "inc_hrs": "7:4", "early_hrs": "2:30", "no_sig": 0, "abs": 54, "late_hrs": "0:34", "reg": 2, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 8, "bal_reg": 13.0, "bal_emerg": 7.0, "bal_2025": 1.0, "bal_total": 21.0}, {"code": 1894, "name": "عمرو جمال عيد ابوالعنين نحيله", "dept": "تكنولوجيا المعلومات", "pos": "مطور برمجيات", "work": 61, "inc_hrs": "17:58", "early_hrs": "9:34", "no_sig": 1, "abs": 7, "late_hrs": "7:55", "reg": 4, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 10, "bal_reg": 12.0, "bal_emerg": 6.0, "bal_2025": 0.0, "bal_total": 18.0}, {"code": 1899, "name": "خالد محمد علي الجميل", "dept": "تكنولوجيا المعلومات", "pos": "مطور برمجيات", "work": 60, "inc_hrs": "18:37", "early_hrs": "9:4", "no_sig": 0, "abs": 0, "late_hrs": "0:31", "reg": 4, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 10, "bal_reg": 13.0, "bal_emerg": 5.0, "bal_2025": 0.0, "bal_total": 18.0}, {"code": 1901, "name": "منة احمد ابراهيم عبدالغفار عفيفي", "dept": " الدعاية و التسويق", "pos": "اخصائي تسويق", "work": 53, "inc_hrs": "12:43", "early_hrs": "4:49", "no_sig": 0, "abs": 1, "late_hrs": "0:0", "reg": 6, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 12, "bal_reg": 9.0, "bal_emerg": 7.0, "bal_2025": 0.0, "bal_total": 16.0}, {"code": 1904, "name": "محمد عصام محمد ابوالدهب", "dept": "تكنولوجيا المعلومات", "pos": "رئيس قطاع تكنولوجيا المعلومات", "work": 23, "inc_hrs": "11:13", "early_hrs": "0:0", "no_sig": 8, "abs": 9, "late_hrs": "23:7", "reg": 7, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 13, "bal_reg": 6.83, "bal_emerg": 6.41, "bal_2025": 0.0, "bal_total": 13.24}, {"code": 1944, "name": "أحمد خالد على محمد", "dept": "العمليات المركزية", "pos": "اخصائى عمليات مركزية ", "work": 15, "inc_hrs": "8:4", "early_hrs": "7:27", "no_sig": 0, "abs": 9, "late_hrs": "0:31", "reg": 0, "sick": 0, "off_hol": 6, "mat": 0, "total_leave": 6, "bal_reg": 0.0, "bal_emerg": 0.0, "bal_2025": 0.0, "bal_total": 0.0}];

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
    deptDeepDive: "تفاصيل القسم", distribution: "توزيع الأيام"
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
    deptDeepDive: "Department Details", distribution: "Days Distribution"
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
          <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>{t.title}</h1>
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
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 40 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" width={80} tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ background: "#0f172a", border: "none", borderRadius: 12 }} />
                  <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={18} onClick={(d) => setSelEmp(d._emp)} style={{ cursor: "pointer" }}>
                    {chartData.map((_, i) => <Cell key={i} fill={tab.color} />)}
                    <LabelList dataKey="value" position="right" style={{ fill: tab.color, fontSize: 11, fontWeight: 800 }} />
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
