import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

import '../models/app_state.dart';
import '../models/task.dart';
import '../theme/app_theme.dart';
import '../widgets/add_task_sheet.dart';
import '../widgets/task_card.dart';

class TasksScreen extends StatefulWidget {
  const TasksScreen({super.key});

  @override
  State<TasksScreen> createState() => _TasksScreenState();
}

class _TasksScreenState extends State<TasksScreen> {
  String _filter = 'Tümü';
  String? _catFilter;

  static const _filters = ['Tümü', 'Bugün', 'Bekleyen', 'Tamamlanan'];
  static const _categories = ['İş', 'Kişisel', 'Sağlık', 'Eğitim', 'Alışveriş', 'Diğer'];

  List<Task> _applyFilters(List<Task> tasks) {
    final now = DateTime.now();
    List<Task> result = tasks;

    switch (_filter) {
      case 'Bugün':
        result = result.where((t) =>
          t.dueDate != null &&
          t.dueDate!.year == now.year &&
          t.dueDate!.month == now.month &&
          t.dueDate!.day == now.day
        ).toList();
      case 'Bekleyen':
        result = result.where((t) => !t.done).toList();
      case 'Tamamlanan':
        result = result.where((t) => t.done).toList();
    }

    if (_catFilter != null) {
      result = result.where((t) => t.category == _catFilter).toList();
    }

    // Bekleyenler üstte, tamamlananlar alta
    result.sort((a, b) {
      if (a.done != b.done) return a.done ? 1 : -1;
      return a.priority.index.compareTo(b.priority.index) * -1;
    });

    return result;
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Consumer<AppState>(
      builder: (context, state, _) {
        final tasks = _applyFilters(state.tasks);

        return Scaffold(
          appBar: AppBar(
            title: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Görevler', style: GoogleFonts.outfit(fontSize: 22, fontWeight: FontWeight.w700)),
                Text(
                  '${state.pendingCount} bekliyor · ${state.doneCount} tamamlandı',
                  style: GoogleFonts.outfit(fontSize: 12, color: isDark ? AppColors.darkSubtext : AppColors.lightSubtext),
                ),
              ],
            ),
            actions: [
              if (state.doneCount > 0)
                IconButton(
                  icon: const Icon(Icons.cleaning_services_rounded),
                  tooltip: 'Tamamlananları temizle',
                  onPressed: () => state.clearCompleted(),
                ),
            ],
          ),
          body: RefreshIndicator(
            onRefresh: () async => state.load(),
            color: AppColors.teal,
            child: CustomScrollView(
              slivers: [
                // Ana filtreler
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(16, 8, 16, 0),
                    child: SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Row(
                        children: _filters.map((f) {
                          final selected = _filter == f;
                          return Padding(
                            padding: const EdgeInsets.only(right: 8),
                            child: ChoiceChip(
                              label: Text(f),
                              selected: selected,
                              onSelected: (_) => setState(() => _filter = f),
                              selectedColor: AppColors.teal.withOpacity(0.2),
                              labelStyle: GoogleFonts.outfit(
                                fontWeight: selected ? FontWeight.w600 : FontWeight.w400,
                                color: selected ? AppColors.teal : null,
                              ),
                            ),
                          );
                        }).toList(),
                      ),
                    ),
                  ),
                ),
                // Kategori filtreleri
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(16, 8, 16, 8),
                    child: SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Row(
                        children: [
                          Padding(
                            padding: const EdgeInsets.only(right: 8),
                            child: ChoiceChip(
                              label: const Text('Hepsi'),
                              selected: _catFilter == null,
                              onSelected: (_) => setState(() => _catFilter = null),
                              selectedColor: AppColors.darkCard,
                            ),
                          ),
                          ..._categories.map((cat) {
                            final selected = _catFilter == cat;
                            final color = categoryColor(cat);
                            return Padding(
                              padding: const EdgeInsets.only(right: 8),
                              child: ChoiceChip(
                                label: Text(cat),
                                selected: selected,
                                onSelected: (_) => setState(() => _catFilter = selected ? null : cat),
                                selectedColor: color.withOpacity(0.2),
                                avatar: Container(
                                  width: 10,
                                  height: 10,
                                  decoration: BoxDecoration(color: color, shape: BoxShape.circle),
                                ),
                                labelStyle: GoogleFonts.outfit(
                                  color: selected ? color : null,
                                  fontWeight: selected ? FontWeight.w600 : FontWeight.w400,
                                ),
                              ),
                            );
                          }),
                        ],
                      ),
                    ),
                  ),
                ),
                // Task listesi
                tasks.isEmpty
                    ? SliverFillRemaining(
                        child: _EmptyState(filter: _filter),
                      )
                    : SliverList(
                        delegate: SliverChildBuilderDelegate(
                          (context, i) => TaskCard(
                            task: tasks[i],
                            onTap: () => context.read<AppState>().toggleTask(tasks[i].id),
                            onEdit: () => AddTaskSheet.show(context, existing: tasks[i]),
                          ),
                          childCount: tasks.length,
                        ),
                      ),
                const SliverPadding(padding: EdgeInsets.only(bottom: 100)),
              ],
            ),
          ),
          floatingActionButton: FloatingActionButton.extended(
            onPressed: () => AddTaskSheet.show(context),
            icon: const Icon(Icons.add_rounded),
            label: Text('Görev Ekle', style: GoogleFonts.outfit(fontWeight: FontWeight.w600)),
          ),
        );
      },
    );
  }
}

class _EmptyState extends StatelessWidget {
  const _EmptyState({required this.filter});
  final String filter;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            switch (filter) {
              'Tamamlanan' => '🎉',
              'Bugün' => '📅',
              _ => '✅',
            },
            style: const TextStyle(fontSize: 56),
          ),
          const SizedBox(height: 16),
          Text(
            switch (filter) {
              'Tamamlanan' => 'Henüz tamamlanan görev yok',
              'Bugün' => 'Bugün için görev yok',
              'Bekleyen' => 'Bekleyen görev yok, harika!',
              _ => 'Henüz görev eklenmedi',
            },
            style: GoogleFonts.outfit(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: isDark ? AppColors.darkSubtext : AppColors.lightSubtext,
            ),
          ),
        ],
      ),
    );
  }
}
