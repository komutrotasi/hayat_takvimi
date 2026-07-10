import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:table_calendar/table_calendar.dart';
import 'package:intl/intl.dart';

import '../models/app_state.dart';
import '../models/task.dart';
import '../theme/app_theme.dart';
import '../widgets/add_task_sheet.dart';
import '../widgets/task_card.dart';

class CalendarScreen extends StatefulWidget {
  const CalendarScreen({super.key});

  @override
  State<CalendarScreen> createState() => _CalendarScreenState();
}

class _CalendarScreenState extends State<CalendarScreen> {
  DateTime _focused = DateTime.now();
  DateTime _selected = DateTime.now();

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Consumer<AppState>(
      builder: (context, state, _) {
        final selectedTasks = _tasksForDay(state.tasks, _selected);

        return Scaffold(
          appBar: AppBar(
            title: Text(
              DateFormat('MMMM yyyy', 'tr').format(_focused),
              style: GoogleFonts.outfit(fontSize: 22, fontWeight: FontWeight.w700),
            ),
            actions: [
              IconButton(
                icon: const Icon(Icons.today_rounded),
                onPressed: () => setState(() {
                  _focused = DateTime.now();
                  _selected = DateTime.now();
                }),
                tooltip: 'Bugüne Git',
              ),
            ],
          ),
          body: Column(
            children: [
              // Takvim
              Container(
                color: isDark ? AppColors.darkSurface : AppColors.lightSurface,
                child: TableCalendar(
                  locale: 'tr_TR',
                  firstDay: DateTime(2020),
                  lastDay: DateTime(2099),
                  focusedDay: _focused,
                  selectedDayPredicate: (d) => isSameDay(d, _selected),
                  onDaySelected: (sel, foc) => setState(() {
                    _selected = sel;
                    _focused = foc;
                  }),
                  onPageChanged: (foc) => setState(() => _focused = foc),
                  calendarFormat: CalendarFormat.month,
                  headerVisible: false,
                  eventLoader: (day) => _tasksForDay(state.tasks, day),
                  calendarStyle: CalendarStyle(
                    outsideDaysVisible: false,
                    defaultTextStyle: GoogleFonts.outfit(
                      color: isDark ? AppColors.darkText : AppColors.lightText,
                    ),
                    weekendTextStyle: GoogleFonts.outfit(
                      color: isDark ? AppColors.darkSubtext : AppColors.lightSubtext,
                    ),
                    selectedDecoration: const BoxDecoration(
                      color: AppColors.teal,
                      shape: BoxShape.circle,
                    ),
                    todayDecoration: BoxDecoration(
                      color: AppColors.teal.withOpacity(0.2),
                      shape: BoxShape.circle,
                      border: Border.all(color: AppColors.teal, width: 2),
                    ),
                    todayTextStyle: GoogleFonts.outfit(
                      color: AppColors.teal,
                      fontWeight: FontWeight.w700,
                    ),
                    selectedTextStyle: GoogleFonts.outfit(
                      color: Colors.white,
                      fontWeight: FontWeight.w700,
                    ),
                    markerDecoration: const BoxDecoration(
                      color: AppColors.teal,
                      shape: BoxShape.circle,
                    ),
                    markersMaxCount: 3,
                  ),
                  daysOfWeekStyle: DaysOfWeekStyle(
                    weekdayStyle: GoogleFonts.outfit(
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                      color: isDark ? AppColors.darkSubtext : AppColors.lightSubtext,
                    ),
                    weekendStyle: GoogleFonts.outfit(
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                      color: isDark ? AppColors.darkSubtext : AppColors.lightSubtext,
                    ),
                  ),
                ),
              ),
              const Divider(height: 1),
              // Seçili gün başlığı
              Padding(
                padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
                child: Row(
                  children: [
                    Text(
                      DateFormat('d MMMM, EEEE', 'tr').format(_selected),
                      style: GoogleFonts.outfit(
                        fontSize: 15,
                        fontWeight: FontWeight.w700,
                        color: isDark ? AppColors.darkText : AppColors.lightText,
                      ),
                    ),
                    const Spacer(),
                    TextButton.icon(
                      onPressed: () => AddTaskSheet.show(context),
                      icon: const Icon(Icons.add_rounded, size: 16),
                      label: Text('Görev Ekle', style: GoogleFonts.outfit(fontSize: 13)),
                      style: TextButton.styleFrom(foregroundColor: AppColors.teal),
                    ),
                  ],
                ),
              ),
              // Görev listesi
              Expanded(
                child: selectedTasks.isEmpty
                    ? Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Text('📅', style: TextStyle(fontSize: 40)),
                            const SizedBox(height: 8),
                            Text(
                              'Bu gün için görev yok',
                              style: GoogleFonts.outfit(
                                color: isDark ? AppColors.darkSubtext : AppColors.lightSubtext,
                              ),
                            ),
                          ],
                        ),
                      )
                    : ListView.builder(
                        itemCount: selectedTasks.length,
                        padding: const EdgeInsets.only(bottom: 80),
                        itemBuilder: (context, i) => TaskCard(
                          task: selectedTasks[i],
                          onTap: () => context.read<AppState>().toggleTask(selectedTasks[i].id),
                          onEdit: () => AddTaskSheet.show(context, existing: selectedTasks[i]),
                        ),
                      ),
              ),
            ],
          ),
        );
      },
    );
  }

  List<Task> _tasksForDay(List<Task> tasks, DateTime day) {
    return tasks.where((t) =>
      t.dueDate != null &&
      t.dueDate!.year == day.year &&
      t.dueDate!.month == day.month &&
      t.dueDate!.day == day.day
    ).toList();
  }
}
