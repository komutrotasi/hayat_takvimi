import 'package:flutter/material.dart';

enum RepeatType { none, daily, weekly, monthly, custom }

enum Priority { low, medium, high }

class SubTask {
  SubTask({
    required this.id,
    required this.title,
    this.done = false,
  });

  final String id;
  String title;
  bool done;

  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'done': done,
      };

  factory SubTask.fromJson(Map<String, dynamic> json) => SubTask(
        id: json['id'] as String? ?? _genId(),
        title: json['title'] as String? ?? '',
        done: json['done'] as bool? ?? false,
      );

  static String _genId() =>
      DateTime.now().microsecondsSinceEpoch.toString();
}

class Task {
  Task({
    required this.id,
    required this.title,
    this.done = false,
    this.category = 'Genel',
    this.dueDate,
    this.dueTime,
    this.priority = Priority.low,
    this.notes = '',
    this.repeat = RepeatType.none,
    List<int>? repDays,
    List<SubTask>? subTasks,
    DateTime? created,
  })  : repDays = repDays ?? [],
        subTasks = subTasks ?? [],
        created = created ?? DateTime.now();

  final String id;
  String title;
  bool done;
  String category;
  DateTime? dueDate;
  TimeOfDay? dueTime;
  Priority priority;
  String notes;
  RepeatType repeat;
  List<int> repDays; // JS getDay() — 0=Sun…6=Sat
  List<SubTask> subTasks;
  final DateTime created;

  bool get isOverdue {
    if (done || dueDate == null) return false;
    final today = DateTime.now();
    final d = DateTime(today.year, today.month, today.day);
    return dueDate!.isBefore(d);
  }

  bool get isDueToday {
    if (dueDate == null) return false;
    final today = DateTime.now();
    return dueDate!.year == today.year &&
        dueDate!.month == today.month &&
        dueDate!.day == today.day;
  }

  bool occursOn(DateTime date) {
    switch (repeat) {
      case RepeatType.none:
        if (dueDate == null) return false;
        return dueDate!.year == date.year &&
            dueDate!.month == date.month &&
            dueDate!.day == date.day;
      case RepeatType.daily:
        if (dueDate != null && date.isBefore(dueDate!)) return false;
        return true;
      case RepeatType.weekly:
        if (dueDate != null && date.isBefore(dueDate!)) return false;
        if (repDays.isEmpty) {
          // fallback: same weekday as dueDate
          return dueDate != null && date.weekday == dueDate!.weekday;
        }
        // repDays uses JS convention: 0=Sun, 1=Mon…6=Sat
        // Dart weekday: 1=Mon…7=Sun
        final jsDay = date.weekday % 7; // convert Dart→JS
        return repDays.contains(jsDay);
      case RepeatType.monthly:
        if (dueDate != null && date.isBefore(dueDate!)) return false;
        return dueDate != null && date.day == dueDate!.day;
    }
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'done': done,
        'category': category,
        'dueDate': dueDate?.toIso8601String(),
        'dueTime': dueTime == null
            ? null
            : '${dueTime!.hour.toString().padLeft(2, '0')}:${dueTime!.minute.toString().padLeft(2, '0')}',
        'priority': priority.name,
        'notes': notes,
        'repeat': repeat.name,
        'repDays': repDays,
        'subTasks': subTasks.map((s) => s.toJson()).toList(),
        'created': created.toIso8601String(),
      };

  factory Task.fromJson(Map<String, dynamic> json) => Task(
        id: json['id'] as String? ?? _genId(),
        title: json['title'] as String? ?? '',
        done: json['done'] as bool? ?? false,
        category: json['category'] as String? ?? 'Genel',
        dueDate: json['dueDate'] != null
            ? DateTime.tryParse(json['dueDate'] as String)
            : null,

        priority: _parsePriority(json['priority']),
        dueTime: _parseTime(json['dueTime'] as String?),
        notes: json['notes'] as String? ?? '',
        repeat: _parseRepeat(json['repeat'] as String?),
        repDays: (json['repDays'] as List<dynamic>?)
                ?.map((e) => e as int)
                .toList() ??
            [],
        subTasks: (json['subTasks'] as List<dynamic>?)
                ?.map((e) => SubTask.fromJson(e as Map<String, dynamic>))
                .toList() ??
            [],
        created: json['created'] != null
            ? DateTime.tryParse(json['created'] as String) ?? DateTime.now()
            : DateTime.now(),
      );

  Task copyWith({
    String? title,
    bool? done,
    String? category,
    DateTime? dueDate,
    TimeOfDay? dueTime,
    Priority? priority,
    String? notes,
    RepeatType? repeat,
    List<int>? repDays,
    List<SubTask>? subTasks,
  }) =>
      Task(
        id: id,
        title: title ?? this.title,
        done: done ?? this.done,
        category: category ?? this.category,
        dueDate: dueDate ?? this.dueDate,
        dueTime: dueTime ?? this.dueTime,
        priority: priority ?? this.priority,
        notes: notes ?? this.notes,
        repeat: repeat ?? this.repeat,
        repDays: repDays ?? List.from(this.repDays),
        subTasks: subTasks ?? List.from(this.subTasks),
        created: created,
      );

  static String _genId() =>
      DateTime.now().microsecondsSinceEpoch.toString();

  static TimeOfDay? _parseTime(String? value) {
    if (value == null || value.isEmpty) return null;
    final parts = value.split(':');
    if (parts.length != 2) return null;
    final h = int.tryParse(parts[0]);
    final m = int.tryParse(parts[1]);
    if (h == null || m == null) return null;
    return TimeOfDay(hour: h, minute: m);
  }

  static RepeatType _parseRepeat(String? value) {
    switch (value) {
      case 'daily':
        return RepeatType.daily;
      case 'weekly':
        return RepeatType.weekly;
      case 'monthly':
        return RepeatType.monthly;
      case 'custom':
        return RepeatType.custom;
      default:
        return RepeatType.none;
    }
  }

  static Priority _parsePriority(dynamic value) {
    if (value is String) {
      switch (value) {
        case 'high': return Priority.high;
        case 'medium': return Priority.medium;
        default: return Priority.low;
      }
    }
    // Legacy int support
    if (value is int) {
      if (value >= 3) return Priority.high;
      if (value == 2) return Priority.medium;
    }
    return Priority.low;
  }

  String get priorityLabel => switch (priority) {
    Priority.high => 'Yüksek',
    Priority.medium => 'Orta',
    Priority.low => 'Düşük',
  };

  String get repeatLabel => switch (repeat) {
    RepeatType.daily => 'Günlük',
    RepeatType.weekly => 'Haftalık',
    RepeatType.monthly => 'Aylık',
    RepeatType.custom => 'Özel',
    RepeatType.none => 'Tekrar yok',
  };
}
