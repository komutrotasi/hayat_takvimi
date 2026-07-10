import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

import '../models/app_state.dart';
import '../models/task.dart';
import '../theme/app_theme.dart';

class TaskCard extends StatelessWidget {
  const TaskCard({
    super.key,
    required this.task,
    this.onTap,
    this.onEdit,
  });

  final Task task;
  final VoidCallback? onTap;
  final VoidCallback? onEdit;

  @override
  Widget build(BuildContext context) {
    final appState = context.read<AppState>();
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final catColor = categoryColor(task.category);

    return Dismissible(
      key: Key(task.id),
      direction: DismissDirection.endToStart,
      confirmDismiss: (_) => _confirmDelete(context),
      onDismissed: (_) => appState.removeTask(task.id),
      background: Container(
        margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
        decoration: BoxDecoration(
          color: AppColors.danger.withOpacity(0.15),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppColors.danger.withOpacity(0.4)),
        ),
        alignment: Alignment.centerRight,
        padding: const EdgeInsets.only(right: 20),
        child: const Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.delete_outline_rounded, color: AppColors.danger, size: 28),
            SizedBox(height: 4),
            Text('Sil', style: TextStyle(color: AppColors.danger, fontSize: 11, fontWeight: FontWeight.w600)),
          ],
        ),
      ),
      child: GestureDetector(
        onTap: onTap,
        onLongPress: onEdit,
        child: Container(
          margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
          decoration: BoxDecoration(
            color: isDark ? AppColors.darkCard : AppColors.lightCard,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: isDark ? AppColors.darkCardBorder : AppColors.lightBorder,
            ),
          ),
          child: IntrinsicHeight(
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Sol renkli kategori çizgisi
                Container(
                  width: 4,
                  decoration: BoxDecoration(
                    color: catColor,
                    borderRadius: const BorderRadius.only(
                      topLeft: Radius.circular(16),
                      bottomLeft: Radius.circular(16),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                // Checkbox
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 12),
                  child: GestureDetector(
                    onTap: () => appState.toggleTask(task.id),
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      width: 24,
                      height: 24,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: task.done ? catColor : Colors.transparent,
                        border: Border.all(
                          color: task.done ? catColor : (isDark ? AppColors.darkSubtext : AppColors.lightSubtext),
                          width: 2,
                        ),
                      ),
                      child: task.done
                          ? const Icon(Icons.check, color: Colors.white, size: 14)
                          : null,
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                // İçerik
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(vertical: 12),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Expanded(
                              child: Text(
                                task.title,
                                style: GoogleFonts.outfit(
                                  fontSize: 15,
                                  fontWeight: FontWeight.w600,
                                  color: task.done
                                      ? (isDark ? AppColors.darkSubtext : AppColors.lightSubtext)
                                      : (isDark ? AppColors.darkText : AppColors.lightText),
                                  decoration: task.done ? TextDecoration.lineThrough : null,
                                ),
                              ),
                            ),
                            _PriorityChip(priority: task.priority),
                          ],
                        ),
                        if (task.notes.isNotEmpty) ...[
                          const SizedBox(height: 4),
                          Text(
                            task.notes,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: GoogleFonts.outfit(
                              fontSize: 12,
                              color: isDark ? AppColors.darkSubtext : AppColors.lightSubtext,
                            ),
                          ),
                        ],
                        const SizedBox(height: 8),
                        Row(
                          children: [
                            // Kategori chip
                            _MiniChip(
                              label: task.category,
                              color: catColor,
                            ),
                            const SizedBox(width: 6),
                            // Tarih
                            if (task.dueDate != null) ...[
                              _MiniChip(
                                label: DateFormat('d MMM', 'tr').format(task.dueDate!),
                                icon: Icons.calendar_today_rounded,
                                color: task.isOverdue && !task.done
                                    ? AppColors.danger
                                    : (isDark ? AppColors.darkSubtext : AppColors.lightSubtext),
                              ),
                              const SizedBox(width: 6),
                            ],
                            // Alt görev sayacı
                            if (task.subTasks.isNotEmpty) ...[
                              _MiniChip(
                                label: '${task.subTasks.where((s) => s.done).length}/${task.subTasks.length}',
                                icon: Icons.checklist_rounded,
                                color: isDark ? AppColors.darkSubtext : AppColors.lightSubtext,
                              ),
                            ],
                            // Tekrar ikonu
                            if (task.repeat != RepeatType.none) ...[
                              const SizedBox(width: 6),
                              Icon(
                                Icons.repeat_rounded,
                                size: 14,
                                color: isDark ? AppColors.darkSubtext : AppColors.lightSubtext,
                              ),
                            ],
                          ],
                        ),
                        // Alt görev progress bar
                        if (task.subTasks.isNotEmpty) ...[
                          const SizedBox(height: 8),
                          ClipRRect(
                            borderRadius: BorderRadius.circular(4),
                            child: LinearProgressIndicator(
                              value: task.subTasks.isEmpty
                                  ? 0
                                  : task.subTasks.where((s) => s.done).length / task.subTasks.length,
                              backgroundColor: catColor.withOpacity(0.15),
                              valueColor: AlwaysStoppedAnimation<Color>(catColor),
                              minHeight: 4,
                            ),
                          ),
                        ],
                      ],
                    ),
                  ),
                ),
                const SizedBox(width: 12),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Future<bool?> _confirmDelete(BuildContext context) {
    return showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Görevi Sil'),
        content: Text('"${task.title}" silinsin mi?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Vazgeç'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(ctx, true),
            style: TextButton.styleFrom(foregroundColor: AppColors.danger),
            child: const Text('Sil'),
          ),
        ],
      ),
    );
  }
}

// ── Priority Chip ─────────────────────────────────────────────────────────────

class _PriorityChip extends StatelessWidget {
  const _PriorityChip({required this.priority});
  final Priority priority;

  @override
  Widget build(BuildContext context) {
    if (priority == Priority.low) return const SizedBox.shrink();
    final (label, color) = switch (priority) {
      Priority.high => ('Yüksek', AppColors.danger),
      Priority.medium => ('Orta', AppColors.warning),
      Priority.low => ('', Colors.transparent),
    };
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
      decoration: BoxDecoration(
        color: color.withOpacity(0.15),
        borderRadius: BorderRadius.circular(6),
      ),
      child: Text(
        label,
        style: GoogleFonts.outfit(
          fontSize: 10,
          fontWeight: FontWeight.w700,
          color: color,
        ),
      ),
    );
  }
}

// ── Mini Chip ─────────────────────────────────────────────────────────────────

class _MiniChip extends StatelessWidget {
  const _MiniChip({required this.label, this.icon, required this.color});
  final String label;
  final IconData? icon;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        if (icon != null) ...[
          Icon(icon, size: 12, color: color),
          const SizedBox(width: 3),
        ],
        Text(
          label,
          style: GoogleFonts.outfit(
            fontSize: 11,
            fontWeight: FontWeight.w500,
            color: color,
          ),
        ),
      ],
    );
  }
}
