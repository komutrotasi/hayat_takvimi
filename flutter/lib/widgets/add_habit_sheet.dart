import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

import '../models/app_state.dart';
import '../models/habit.dart';
import '../theme/app_theme.dart';

class AddHabitSheet extends StatefulWidget {
  const AddHabitSheet({super.key, this.existing});
  final Habit? existing;

  static Future<void> show(BuildContext context, {Habit? existing}) {
    return showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (_) => AddHabitSheet(existing: existing),
    );
  }

  @override
  State<AddHabitSheet> createState() => _AddHabitSheetState();
}

class _AddHabitSheetState extends State<AddHabitSheet> {
  late final TextEditingController _nameCtrl;
  String _icon = '⭐';
  Color _color = AppColors.teal;
  final _formKey = GlobalKey<FormState>();

  static const _icons = [
    '⭐', '📚', '💪', '🏃', '🧘', '💧', '🥗', '😴', '🎯', '✍️',
    '🎵', '🎨', '💊', '🙏', '🚴', '🏊', '🧹', '🌱', '💻', '📖',
    '🧠', '❤️', '🌞', '🎃', '🦷', '🛁', '🍎', '🧘‍♂️', '🏋️', '🎮',
  ];

  static const _colors = [
    AppColors.teal, AppColors.catWork, AppColors.catHealth,
    AppColors.catEducation, AppColors.catShopping, AppColors.danger,
    AppColors.info, Color(0xFFa855f7), Color(0xFFf97316), Color(0xFF64748b),
  ];

  @override
  void initState() {
    super.initState();
    final h = widget.existing;
    _nameCtrl = TextEditingController(text: h?.name ?? '');
    if (h != null) {
      _icon = h.icon;
      _color = Color(h.color);
    }
  }

  @override
  void dispose() {
    _nameCtrl.dispose();
    super.dispose();
  }

  void _save() {
    if (!_formKey.currentState!.validate()) return;
    final state = context.read<AppState>();
    final habit = Habit(
      id: widget.existing?.id ?? DateTime.now().millisecondsSinceEpoch.toString(),
      name: _nameCtrl.text.trim(),
      icon: _icon,
      color: _color.toARGB32(),
      doneMap: widget.existing?.doneMap ?? {},
    );
    if (widget.existing != null) {
      state.updateHabit(habit);
    } else {
      state.addHabit(habit);
    }
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final mq = MediaQuery.of(context);

    return Padding(
      padding: EdgeInsets.only(bottom: mq.viewInsets.bottom),
      child: Container(
        constraints: BoxConstraints(maxHeight: mq.size.height * 0.88),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
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
                    widget.existing != null ? 'Alışkanlık Düzenle' : 'Yeni Alışkanlık',
                    style: GoogleFonts.outfit(
                      fontSize: 20,
                      fontWeight: FontWeight.w700,
                      color: isDark ? AppColors.darkText : AppColors.lightText,
                    ),
                  ),
                  const Spacer(),
                  IconButton(icon: const Icon(Icons.close_rounded), onPressed: () => Navigator.pop(context)),
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
                      // Önizleme
                      Center(
                        child: Container(
                          width: 80,
                          height: 80,
                          decoration: BoxDecoration(
                            color: _color.withValues(alpha: 0.2),
                            borderRadius: BorderRadius.circular(24),
                            border: Border.all(color: _color, width: 2),
                          ),
                          child: Center(
                            child: Text(_icon, style: const TextStyle(fontSize: 36)),
                          ),
                        ),
                      ),
                      const SizedBox(height: 20),
                      // İsim
                      TextFormField(
                        controller: _nameCtrl,
                        autofocus: true,
                        decoration: const InputDecoration(
                          labelText: 'Alışkanlık adı',
                          prefixIcon: Icon(Icons.edit_rounded),
                        ),
                        validator: (v) => v == null || v.trim().isEmpty ? 'Ad gerekli' : null,
                      ),
                      const SizedBox(height: 20),
                      // İkon seçici
                      _SectionLabel('İkon Seç'),
                      const SizedBox(height: 10),
                      Wrap(
                        spacing: 10,
                        runSpacing: 10,
                        children: _icons.map((icon) {
                          final selected = _icon == icon;
                          return GestureDetector(
                            onTap: () => setState(() => _icon = icon),
                            child: AnimatedContainer(
                              duration: const Duration(milliseconds: 150),
                              width: 48,
                              height: 48,
                              decoration: BoxDecoration(
                                color: selected ? _color.withValues(alpha: 0.2) : (isDark ? AppColors.darkCard : AppColors.lightCard),
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(
                                  color: selected ? _color : (isDark ? AppColors.darkCardBorder : AppColors.lightBorder),
                                  width: selected ? 2 : 1,
                                ),
                              ),
                              child: Center(child: Text(icon, style: const TextStyle(fontSize: 22))),
                            ),
                          );
                        }).toList(),
                      ),
                      const SizedBox(height: 20),
                      // Renk seçici
                      _SectionLabel('Renk Seç'),
                      const SizedBox(height: 10),
                      Wrap(
                        spacing: 12,
                        runSpacing: 12,
                        children: _colors.map((color) {
                          final selected = _color == color;
                          return GestureDetector(
                            onTap: () => setState(() => _color = color),
                            child: AnimatedContainer(
                              duration: const Duration(milliseconds: 150),
                              width: 40,
                              height: 40,
                              decoration: BoxDecoration(
                                color: color,
                                shape: BoxShape.circle,
                                border: selected
                                    ? Border.all(color: Colors.white, width: 3)
                                    : null,
                                boxShadow: selected
                                    ? [BoxShadow(color: color.withValues(alpha: 0.5), blurRadius: 8, spreadRadius: 1)]
                                    : null,
                              ),
                              child: selected
                                  ? const Icon(Icons.check_rounded, color: Colors.white, size: 20)
                                  : null,
                            ),
                          );
                        }).toList(),
                      ),
                      const SizedBox(height: 28),
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton.icon(
                          onPressed: _save,
                          icon: const Icon(Icons.check_rounded),
                          label: Text(widget.existing != null ? 'Güncelle' : 'Kaydet'),
                          style: ElevatedButton.styleFrom(padding: const EdgeInsets.symmetric(vertical: 16)),
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
}

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
