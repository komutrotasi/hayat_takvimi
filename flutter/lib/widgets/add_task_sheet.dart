import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

import '../models/app_state.dart';
import '../models/task.dart';
import '../theme/app_theme.dart';

class AddTaskSheet extends StatefulWidget {
  const AddTaskSheet({super.key, this.existing});
  final Task? existing;

  static Future<void> show(BuildContext context, {Task? existing}) {
    return showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (_) => AddTaskSheet(existing: existing),
    );
  }

  @override
  State<AddTaskSheet> createState() => _AddTaskSheetState();
}

class _AddTaskSheetState extends State<AddTaskSheet> {
  late final TextEditingController _titleCtrl;
  late final TextEditingController _notesCtrl;
  String _category = 'Kişisel';
  Priority _priority = Priority.low;
  DateTime? _dueDate;
  TimeOfDay? _dueTime;
  RepeatType _repeat = RepeatType.none;
  Set<int> _repDays = {};
  List<SubTask> _subTasks = [];
  final _subCtrl = TextEditingController();

  final _categories = ['İş', 'Kişisel', 'Sağlık', 'Eğitim', 'Alışveriş', 'Diğer'];
  final _formKey = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
    final t = widget.existing;
    _titleCtrl = TextEditingController(text: t?.title ?? '');
    _notesCtrl = TextEditingController(text: t?.notes ?? '');
    if (t != null) {
      _category = t.category;
      _priority = t.priority;
      _dueDate = t.dueDate;
      _repeat = t.repeat;
      _repDays = t.repDays.toSet();
      _subTasks = List.from(t.subTasks);
    }
  }

  @override
  void dispose() {
    _titleCtrl.dispose();
    _notesCtrl.dispose();
    _subCtrl.dispose();
    super.dispose();
  }

  void _save() {
    if (!_formKey.currentState!.validate()) return;
    final state = context.read<AppState>();
    DateTime? due;
    if (_dueDate != null) {
      due = DateTime(
        _dueDate!.year,
        _dueDate!.month,
        _dueDate!.day,
        _dueTime?.hour ?? 0,
        _dueTime?.minute ?? 0,
      );
    }
    final task = Task(
      id: widget.existing?.id ?? DateTime.now().millisecondsSinceEpoch.toString(),
      title: _titleCtrl.text.trim(),
      category: _category,
      priority: _priority,
      notes: _notesCtrl.text.trim(),
      dueDate: due,
      repeat: _repeat,
      repDays: _repDays.toList(),
      subTasks: _subTasks,
      done: widget.existing?.done ?? false,
      created: widget.existing?.created ?? DateTime.now(),
    );
    if (widget.existing != null) {
      state.updateTask(task);
    } else {
      state.addTask(task);
    }
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final mq = MediaQuery.of(context);
    final catColor = categoryColor(_category);

    return Padding(
      padding: EdgeInsets.only(bottom: mq.viewInsets.bottom),
      child: Container(
        constraints: BoxConstraints(maxHeight: mq.size.height * 0.92),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Handle bar
            Center(
              child: Container(
                margin: const EdgeInsets.only(top: 12, bottom: 8),
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: isDark ? AppColors.darkCardBorder : AppColors.lightBorder,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Row(
                children: [
                  Text(
                    widget.existing != null ? 'Görevi Düzenle' : 'Yeni Görev',
                    style: GoogleFonts.outfit(
                      fontSize: 20,
                      fontWeight: FontWeight.w700,
                      color: isDark ? AppColors.darkText : AppColors.lightText,
                    ),
                  ),
                  const Spacer(),
                  IconButton(
                    icon: const Icon(Icons.close_rounded),
                    onPressed: () => Navigator.pop(context),
                  ),
                ],
              ),
            ),
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.fromLTRB(20, 4, 20, 20),
                child: Form(
                  key: _formKey,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Başlık
                      TextFormField(
                        controller: _titleCtrl,
                        autofocus: true,
                        decoration: const InputDecoration(
                          labelText: 'Görev başlığı',
                          prefixIcon: Icon(Icons.task_alt_rounded),
                        ),
                        validator: (v) => v == null || v.trim().isEmpty ? 'Başlık gerekli' : null,
                      ),
                      const SizedBox(height: 14),
                      // Notlar
                      TextFormField(
                        controller: _notesCtrl,
                        maxLines: 2,
                        decoration: const InputDecoration(
                          labelText: 'Notlar (opsiyonel)',
                          prefixIcon: Icon(Icons.notes_rounded),
                          alignLabelWithHint: true,
                        ),
                      ),
                      const SizedBox(height: 20),
                      // Kategori
                      _SectionLabel('Kategori'),
                      const SizedBox(height: 8),
                      Wrap(
                        spacing: 8,
                        runSpacing: 8,
                        children: _categories.map((cat) {
                          final selected = _category == cat;
                          final color = categoryColor(cat);
                          return ChoiceChip(
                            label: Text(cat),
                            selected: selected,
                            onSelected: (_) => setState(() => _category = cat),
                            selectedColor: color.withOpacity(0.2),
                            labelStyle: GoogleFonts.outfit(
                              color: selected ? color : null,
                              fontWeight: selected ? FontWeight.w600 : FontWeight.w400,
                            ),
                            avatar: selected
                                ? Icon(Icons.circle, color: color, size: 10)
                                : null,
                          );
                        }).toList(),
                      ),
                      const SizedBox(height: 20),
                      // Öncelik
                      _SectionLabel('Öncelik'),
                      const SizedBox(height: 8),
                      Row(
                        children: Priority.values.map((p) {
                          final selected = _priority == p;
                          final (label, color) = switch (p) {
                            Priority.low => ('Düşük', AppColors.darkSubtext),
                            Priority.medium => ('Orta', AppColors.warning),
                            Priority.high => ('Yüksek', AppColors.danger),
                          };
                          return Expanded(
                            child: Padding(
                              padding: const EdgeInsets.only(right: 8),
                              child: ChoiceChip(
                                label: Center(child: Text(label)),
                                selected: selected,
                                onSelected: (_) => setState(() => _priority = p),
                                selectedColor: color.withOpacity(0.2),
                                labelStyle: GoogleFonts.outfit(
                                  color: selected ? color : null,
                                  fontWeight: selected ? FontWeight.w600 : FontWeight.w400,
                                  fontSize: 13,
                                ),
                              ),
                            ),
                          );
                        }).toList(),
                      ),
                      const SizedBox(height: 20),
                      // Tarih & Saat
                      _SectionLabel('Son Tarih'),
                      const SizedBox(height: 8),
                      Row(
                        children: [
                          Expanded(
                            child: _TapField(
                              icon: Icons.calendar_today_rounded,
                              label: _dueDate != null
                                  ? DateFormat('d MMMM yyyy', 'tr').format(_dueDate!)
                                  : 'Tarih seç',
                              onTap: () async {
                                final d = await showDatePicker(
                                  context: context,
                                  initialDate: _dueDate ?? DateTime.now(),
                                  firstDate: DateTime(2020),
                                  lastDate: DateTime(2099),
                                );
                                if (d != null) setState(() => _dueDate = d);
                              },
                              active: _dueDate != null,
                            ),
                          ),
                          const SizedBox(width: 10),
                          Expanded(
                            child: _TapField(
                              icon: Icons.access_time_rounded,
                              label: _dueTime != null
                                  ? _dueTime!.format(context)
                                  : 'Saat seç',
                              onTap: () async {
                                final t = await showTimePicker(
                                  context: context,
                                  initialTime: _dueTime ?? TimeOfDay.now(),
                                );
                                if (t != null) setState(() => _dueTime = t);
                              },
                              active: _dueTime != null,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 20),
                      // Tekrar
                      _SectionLabel('Tekrar'),
                      const SizedBox(height: 8),
                      DropdownButtonFormField<RepeatType>(
                        value: _repeat,
                        decoration: const InputDecoration(
                          prefixIcon: Icon(Icons.repeat_rounded),
                        ),
                        items: [
                          DropdownMenuItem(value: RepeatType.none, child: Text('Tekrar yok', style: GoogleFonts.outfit())),
                          DropdownMenuItem(value: RepeatType.daily, child: Text('Her gün', style: GoogleFonts.outfit())),
                          DropdownMenuItem(value: RepeatType.weekly, child: Text('Her hafta', style: GoogleFonts.outfit())),
                          DropdownMenuItem(value: RepeatType.monthly, child: Text('Her ay', style: GoogleFonts.outfit())),
                          DropdownMenuItem(value: RepeatType.custom, child: Text('Özel günler', style: GoogleFonts.outfit())),
                        ],
                        onChanged: (v) => setState(() => _repeat = v!),
                      ),
                      if (_repeat == RepeatType.custom) ...[
                        const SizedBox(height: 12),
                        _DaySelector(selected: _repDays, onChanged: (d) => setState(() => _repDays = d)),
                      ],
                      const SizedBox(height: 20),
                      // Alt Görevler
                      _SectionLabel('Alt Görevler'),
                      const SizedBox(height: 8),
                      ..._subTasks.asMap().entries.map((entry) {
                        final i = entry.key;
                        final sub = entry.value;
                        return Padding(
                          padding: const EdgeInsets.only(bottom: 6),
                          child: Row(
                            children: [
                              Icon(Icons.drag_handle_rounded,
                                  color: isDark ? AppColors.darkSubtext : AppColors.lightSubtext, size: 20),
                              const SizedBox(width: 8),
                              Expanded(
                                child: Text(sub.title, style: GoogleFonts.outfit(fontSize: 14)),
                              ),
                              IconButton(
                                icon: const Icon(Icons.close_rounded, size: 18),
                                onPressed: () => setState(() => _subTasks.removeAt(i)),
                              ),
                            ],
                          ),
                        );
                      }),
                      Row(
                        children: [
                          Expanded(
                            child: TextFormField(
                              controller: _subCtrl,
                              decoration: const InputDecoration(
                                hintText: 'Alt görev ekle...',
                                prefixIcon: Icon(Icons.add_rounded),
                              ),
                              onFieldSubmitted: (_) => _addSubTask(),
                            ),
                          ),
                          const SizedBox(width: 8),
                          ElevatedButton(
                            onPressed: _addSubTask,
                            style: ElevatedButton.styleFrom(
                              padding: const EdgeInsets.all(14),
                              minimumSize: Size.zero,
                            ),
                            child: const Icon(Icons.add_rounded, size: 20),
                          ),
                        ],
                      ),
                      const SizedBox(height: 24),
                      // Kaydet
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton.icon(
                          onPressed: _save,
                          icon: const Icon(Icons.check_rounded),
                          label: Text(widget.existing != null ? 'Güncelle' : 'Kaydet'),
                          style: ElevatedButton.styleFrom(
                            padding: const EdgeInsets.symmetric(vertical: 16),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _addSubTask() {
    final text = _subCtrl.text.trim();
    if (text.isEmpty) return;
    setState(() {
      _subTasks.add(SubTask(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        title: text,
      ));
      _subCtrl.clear();
    });
  }
}

// ── Section Label ─────────────────────────────────────────────────────────────

class _SectionLabel extends StatelessWidget {
  const _SectionLabel(this.label);
  final String label;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Text(
      label,
      style: GoogleFonts.outfit(
        fontSize: 12,
        fontWeight: FontWeight.w700,
        letterSpacing: 1,
        color: isDark ? AppColors.darkSubtext : AppColors.lightSubtext,
      ),
    );
  }
}

// ── Tap Field ─────────────────────────────────────────────────────────────────

class _TapField extends StatelessWidget {
  const _TapField({required this.icon, required this.label, required this.onTap, required this.active});
  final IconData icon;
  final String label;
  final VoidCallback onTap;
  final bool active;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 14),
        decoration: BoxDecoration(
          color: isDark ? AppColors.darkCard : AppColors.lightCard,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: active ? AppColors.teal : (isDark ? AppColors.darkCardBorder : AppColors.lightBorder),
            width: active ? 2 : 1,
          ),
        ),
        child: Row(
          children: [
            Icon(icon, size: 18, color: active ? AppColors.teal : (isDark ? AppColors.darkSubtext : AppColors.lightSubtext)),
            const SizedBox(width: 8),
            Expanded(
              child: Text(
                label,
                style: GoogleFonts.outfit(
                  fontSize: 13,
                  color: active ? (isDark ? AppColors.darkText : AppColors.lightText) : (isDark ? AppColors.darkSubtext : AppColors.lightSubtext),
                ),
                overflow: TextOverflow.ellipsis,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ── Day Selector ──────────────────────────────────────────────────────────────

class _DaySelector extends StatelessWidget {
  const _DaySelector({required this.selected, required this.onChanged});
  final Set<int> selected;
  final void Function(Set<int>) onChanged;

  static const _days = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: List.generate(7, (i) {
        final day = i + 1; // 1=Monday, 7=Sunday
        final sel = selected.contains(day);
        return GestureDetector(
          onTap: () {
            final next = Set<int>.from(selected);
            if (sel) next.remove(day); else next.add(day);
            onChanged(next);
          },
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 150),
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: sel ? AppColors.teal : Colors.transparent,
              borderRadius: BorderRadius.circular(10),
              border: Border.all(
                color: sel ? AppColors.teal : AppColors.darkCardBorder,
              ),
            ),
            child: Center(
              child: Text(
                _days[i],
                style: GoogleFonts.outfit(
                  fontSize: 11,
                  fontWeight: FontWeight.w600,
                  color: sel ? Colors.white : AppColors.darkSubtext,
                ),
              ),
            ),
          ),
        );
      }),
    );
  }
}
