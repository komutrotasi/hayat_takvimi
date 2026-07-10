import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

import '../models/app_state.dart';
import '../models/habit.dart';
import '../theme/app_theme.dart';

class HabitCard extends StatelessWidget {
  const HabitCard({super.key, required this.habit});
  final Habit habit;

  @override
  Widget build(BuildContext context) {
    final appState = context.read<AppState>();
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final color = Color(habit.color);
    final todayKey = _dayKey(DateTime.now());
    final doneToday = habit.doneMap[todayKey] ?? false;
    final streak = habit.streak();
    final rate = habit.habitRate();

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCard : AppColors.lightCard,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: isDark ? AppColors.darkCardBorder : AppColors.lightBorder,
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Başlık satırı
            Row(
              children: [
                // İkon
                Container(
                  width: 44,
                  height: 44,
                  decoration: BoxDecoration(
                    color: color.withOpacity(0.15),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Center(
                    child: Text(
                      habit.icon,
                      style: const TextStyle(fontSize: 22),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                // İsim & streak
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        habit.name,
                        style: GoogleFonts.outfit(
                          fontSize: 15,
                          fontWeight: FontWeight.w600,
                          color: isDark ? AppColors.darkText : AppColors.lightText,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Row(
                        children: [
                          if (streak > 0) ...[
                            Text('🔥', style: const TextStyle(fontSize: 13)),
                            const SizedBox(width: 3),
                            Text(
                              '$streak gün seri',
                              style: GoogleFonts.outfit(
                                fontSize: 12,
                                fontWeight: FontWeight.w500,
                                color: AppColors.warning,
                              ),
                            ),
                          ] else
                            Text(
                              'Seri yok',
                              style: GoogleFonts.outfit(
                                fontSize: 12,
                                color: isDark ? AppColors.darkSubtext : AppColors.lightSubtext,
                              ),
                            ),
                        ],
                      ),
                    ],
                  ),
                ),
                // Bugün tamamla butonu
                GestureDetector(
                  onTap: () => appState.toggleHabit(habit.id),
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 250),
                    curve: Curves.easeOut,
                    width: 36,
                    height: 36,
                    decoration: BoxDecoration(
                      color: doneToday ? color : Colors.transparent,
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(
                        color: doneToday ? color : (isDark ? AppColors.darkSubtext : AppColors.lightSubtext),
                        width: 2,
                      ),
                    ),
                    child: doneToday
                        ? const Icon(Icons.check_rounded, color: Colors.white, size: 20)
                        : null,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 14),
            // Son 7 gün grid
            _Last7Days(habit: habit, color: color),
            const SizedBox(height: 12),
            // Progress bar
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Tamamlama oranı',
                      style: GoogleFonts.outfit(
                        fontSize: 11,
                        color: isDark ? AppColors.darkSubtext : AppColors.lightSubtext,
                      ),
                    ),
                    Text(
                      '%${(rate * 100).toStringAsFixed(0)}',
                      style: GoogleFonts.outfit(
                        fontSize: 11,
                        fontWeight: FontWeight.w600,
                        color: color,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 5),
                ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: LinearProgressIndicator(
                    value: rate,
                    backgroundColor: color.withOpacity(0.15),
                    valueColor: AlwaysStoppedAnimation<Color>(color),
                    minHeight: 6,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  static String _dayKey(DateTime d) =>
      '${d.year}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}';
}

// ── Son 7 Gün Grid ────────────────────────────────────────────────────────────

class _Last7Days extends StatelessWidget {
  const _Last7Days({required this.habit, required this.color});
  final Habit habit;
  final Color color;

  static String _dayKey(DateTime d) =>
      '${d.year}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}';

  static const _dayNames = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

  @override
  Widget build(BuildContext context) {
    final now = DateTime.now();
    final days = List.generate(7, (i) => now.subtract(Duration(days: 6 - i)));

    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: days.map((day) {
        final key = _dayKey(day);
        final done = habit.doneMap[key] ?? false;
        final isToday = key == _dayKey(now);

        return Column(
          children: [
            Text(
              _dayNames[day.weekday - 1],
              style: GoogleFonts.outfit(
                fontSize: 10,
                fontWeight: FontWeight.w500,
                color: isToday ? color : AppColors.darkSubtext,
              ),
            ),
            const SizedBox(height: 4),
            AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              width: 30,
              height: 30,
              decoration: BoxDecoration(
                color: done ? color : color.withOpacity(0.08),
                borderRadius: BorderRadius.circular(8),
                border: isToday
                    ? Border.all(color: color, width: 2)
                    : null,
              ),
              child: done
                  ? const Icon(Icons.check_rounded, color: Colors.white, size: 16)
                  : null,
            ),
          ],
        );
      }).toList(),
    );
  }
}
