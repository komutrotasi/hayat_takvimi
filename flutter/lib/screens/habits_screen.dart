import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

import '../models/app_state.dart';
import '../theme/app_theme.dart';
import '../widgets/add_habit_sheet.dart';
import '../widgets/confirm_dialog.dart';
import '../widgets/habit_card.dart';

class HabitsScreen extends StatelessWidget {
  const HabitsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Consumer<AppState>(
      builder: (context, state, _) {
        final habits = state.habits;
        final doneToday = habits.where((h) {
          final key = _dayKey(DateTime.now());
          return h.doneMap[key] ?? false;
        }).length;

        return Scaffold(
          appBar: AppBar(
            title: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Alışkanlıklar', style: GoogleFonts.outfit(fontSize: 22, fontWeight: FontWeight.w700)),
                Text(
                  'Bugün $doneToday/${habits.length} tamamlandı',
                  style: GoogleFonts.outfit(
                    fontSize: 12,
                    color: isDark ? AppColors.darkSubtext : AppColors.lightSubtext,
                  ),
                ),
              ],
            ),
            actions: [
              IconButton(
                icon: const Icon(Icons.add_rounded),
                onPressed: () => AddHabitSheet.show(context),
                tooltip: 'Alışkanlık Ekle',
              ),
            ],
          ),
          body: habits.isEmpty
              ? _EmptyState(onAdd: () => AddHabitSheet.show(context))
              : CustomScrollView(
                  slivers: [
                    // Özet kart
                    SliverToBoxAdapter(
                      child: _SummaryCard(state: state),
                    ),
                    // Alışkanlık listesi
                    SliverList(
                      delegate: SliverChildBuilderDelegate(
                        (context, i) {
                          final habit = habits[i];
                          return GestureDetector(
                            onLongPress: () => _showOptions(context, state, habit.id),
                            child: HabitCard(habit: habit),
                          );
                        },
                        childCount: habits.length,
                      ),
                    ),
                    const SliverPadding(padding: EdgeInsets.only(bottom: 100)),
                  ],
                ),
        );
      },
    );
  }

  void _showOptions(BuildContext context, AppState state, String id) {
    final habit = state.habits.firstWhereOrNull((h) => h.id == id);
    if (habit == null) return;

    showModalBottomSheet(
      context: context,
      builder: (_) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.edit_rounded),
              title: Text('Düzenle', style: GoogleFonts.outfit()),
              onTap: () {
                Navigator.pop(context);
                AddHabitSheet.show(context, existing: habit);
              },
            ),
            ListTile(
              leading: const Icon(Icons.delete_outline_rounded, color: AppColors.danger),
              title: Text('Sil', style: GoogleFonts.outfit(color: AppColors.danger)),
              onTap: () async {
                Navigator.pop(context);
                final ok = await ConfirmDialog.show(
                  context,
                  title: 'Alışkanlık Sil',
                  message: '"${habit.name}" silinsin mi? Tüm geçmiş veriler de silinecek.',
                  confirmLabel: 'Sil',
                  isDestructive: true,
                );
                if (ok) state.removeHabit(id);
              },
            ),
          ],
        ),
      ),
    );
  }

  static String _dayKey(DateTime d) =>
      '${d.year}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}';
}

// ── Summary Card ──────────────────────────────────────────────────────────────

class _SummaryCard extends StatelessWidget {
  const _SummaryCard({required this.state});
  final AppState state;

  @override
  Widget build(BuildContext context) {
    final habits = state.habits;
    if (habits.isEmpty) return const SizedBox.shrink();

    final avgRate = habits.isEmpty
        ? 0.0
        : habits.map((h) => h.habitRate()).reduce((a, b) => a + b) / habits.length;

    final bestStreak = habits.isEmpty
        ? 0
        : habits.map((h) => h.streak()).reduce((a, b) => a > b ? a : b);

    return Container(
      margin: const EdgeInsets.fromLTRB(16, 8, 16, 4),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [AppColors.teal.withValues(alpha: 0.8), AppColors.tealDark],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          Expanded(
            child: _StatItem(
              label: 'Ort. Oran',
              value: '%${(avgRate * 100).toStringAsFixed(0)}',
              icon: Icons.trending_up_rounded,
            ),
          ),
          Container(width: 1, height: 40, color: Colors.white24),
          Expanded(
            child: _StatItem(
              label: 'En Uzun Seri',
              value: '$bestStreak gün',
              icon: Icons.local_fire_department_rounded,
            ),
          ),
          Container(width: 1, height: 40, color: Colors.white24),
          Expanded(
            child: _StatItem(
              label: 'Toplam',
              value: '${habits.length} alışkanlık',
              icon: Icons.checklist_rounded,
            ),
          ),
        ],
      ),
    );
  }
}

class _StatItem extends StatelessWidget {
  const _StatItem({required this.label, required this.value, required this.icon});
  final String label;
  final String value;
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Icon(icon, color: Colors.white70, size: 18),
        const SizedBox(height: 4),
        Text(
          value,
          style: GoogleFonts.outfit(
            fontSize: 16,
            fontWeight: FontWeight.w700,
            color: Colors.white,
          ),
        ),
        Text(
          label,
          style: GoogleFonts.outfit(
            fontSize: 10,
            color: Colors.white70,
          ),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }
}

class _EmptyState extends StatelessWidget {
  const _EmptyState({required this.onAdd});
  final VoidCallback onAdd;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text('🌱', style: TextStyle(fontSize: 56)),
          const SizedBox(height: 16),
          Text(
            'Henüz alışkanlık eklenmedi',
            style: GoogleFonts.outfit(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: isDark ? AppColors.darkSubtext : AppColors.lightSubtext,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'İlk alışkanlığını oluştur ve takibe başla',
            style: GoogleFonts.outfit(
              fontSize: 13,
              color: isDark ? AppColors.darkSubtext : AppColors.lightSubtext,
            ),
          ),
          const SizedBox(height: 24),
          ElevatedButton.icon(
            onPressed: onAdd,
            icon: const Icon(Icons.add_rounded),
            label: const Text('Alışkanlık Ekle'),
          ),
        ],
      ),
    );
  }
}
