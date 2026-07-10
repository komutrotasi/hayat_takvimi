import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'habit.dart';
import 'task.dart';

const _kStorageKey = 'ht_android_v1';
const _kPrayerCacheKey = 'ht_prayer_cache_v1';

class TimerState {
  TimerState({
    this.remain = 25 * 60,
    this.total = 25 * 60,
    this.running = false,
    this.sessCount = 0,
    this.mode = TimerMode.focus,
  });

  int remain;
  int total;
  bool running;
  int sessCount;
  TimerMode mode;
}

enum TimerMode { focus, shortBreak, longBreak }

class PrayerTime {
  PrayerTime({required this.name, required this.time});
  final String name;
  final String time;
}

class AppState extends ChangeNotifier {
  AppState();

  // ── State ──────────────────────────────────────────────────────────────────
  List<Task> tasks = [];
  List<Habit> habits = [];
  List<PrayerTime> prayers = [];
  TimerState timer = TimerState();
  bool isDark = true;
  String city = 'Konya';
  Map<String, double> catTimes = {}; // category → minutes
  String lastReset = ''; // 'yyyy-MM-dd'
  bool isLoaded = false;

  // ── Load / Save ────────────────────────────────────────────────────────────

  Future<void> load() async {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString(_kStorageKey);
    if (raw != null && raw.isNotEmpty) {
      try {
        final data = jsonDecode(raw) as Map<String, dynamic>;
        tasks = (data['tasks'] as List<dynamic>? ?? [])
            .map((e) => Task.fromJson(e as Map<String, dynamic>))
            .toList();
        habits = (data['habits'] as List<dynamic>? ?? [])
            .map((e) => Habit.fromJson(e as Map<String, dynamic>))
            .toList();
        isDark = data['isDark'] as bool? ?? true;
        city = data['city'] as String? ?? 'Konya';
        catTimes = (data['catTimes'] as Map<String, dynamic>? ?? {})
            .map((k, v) => MapEntry(k, (v as num).toDouble()));
        lastReset = data['lastReset'] as String? ?? '';
      } catch (_) {
        // corrupt data — start fresh
        _initDefaults();
      }
    } else {
      _initDefaults();
    }
    isLoaded = true;
    autoReset();
    notifyListeners();
  }

  void _initDefaults() {
    habits = kDefaultHabits.map((h) => Habit(
      id: h.id,
      name: h.name,
      icon: h.icon,
      color: h.color,
    )).toList();
  }

  Future<void> save() async {
    final prefs = await SharedPreferences.getInstance();
    final data = {
      'tasks': tasks.map((t) => t.toJson()).toList(),
      'habits': habits.map((h) => h.toJson()).toList(),
      'isDark': isDark,
      'city': city,
      'catTimes': catTimes,
      'lastReset': lastReset,
    };
    await prefs.setString(_kStorageKey, jsonEncode(data));
  }

  // ── Daily Auto-Reset ────────────────────────────────────────────────────────

  void autoReset() {
    final today = _todayKey();
    if (lastReset == today) return;
    lastReset = today;

    for (final task in tasks) {
      if (task.done && task.repeat != RepeatType.none) {
        if (task.occursOn(DateTime.now())) {
          task.done = false;
          for (final sub in task.subTasks) {
            sub.done = false;
          }
        }
      }
    }
    save();
  }

  static String _todayKey() {
    final now = DateTime.now();
    return '${now.year}-${now.month.toString().padLeft(2, '0')}-${now.day.toString().padLeft(2, '0')}';
  }

  // ── Task CRUD ──────────────────────────────────────────────────────────────

  void addTask(Task task) {
    tasks.add(task);
    save();
    notifyListeners();
  }

  void updateTask(Task updated) {
    final idx = tasks.indexWhere((t) => t.id == updated.id);
    if (idx == -1) return;
    tasks[idx] = updated;
    save();
    notifyListeners();
  }

  void removeTask(String id) {
    tasks.removeWhere((t) => t.id == id);
    save();
    notifyListeners();
  }

  void toggleTask(String id) {
    final task = tasks.firstWhereOrNull((t) => t.id == id);
    if (task == null) return;
    task.done = !task.done;
    save();
    notifyListeners();
  }

  void toggleSubTask(String taskId, String subId) {
    final task = tasks.firstWhereOrNull((t) => t.id == taskId);
    if (task == null) return;
    final sub = task.subTasks.firstWhereOrNull((s) => s.id == subId);
    if (sub == null) return;
    sub.done = !sub.done;
    save();
    notifyListeners();
  }

  void clearCompleted() {
    tasks.removeWhere((t) => t.done && t.repeat == RepeatType.none);
    save();
    notifyListeners();
  }

  // ── Habit CRUD ─────────────────────────────────────────────────────────────

  void addHabit(Habit habit) {
    habits.add(habit);
    save();
    notifyListeners();
  }

  void updateHabit(Habit updated) {
    final idx = habits.indexWhere((h) => h.id == updated.id);
    if (idx == -1) return;
    habits[idx] = updated;
    save();
    notifyListeners();
  }

  void removeHabit(String id) {
    habits.removeWhere((h) => h.id == id);
    save();
    notifyListeners();
  }

  void toggleHabit(String id, {DateTime? date}) {
    final habit = habits.firstWhereOrNull((h) => h.id == id);
    if (habit == null) return;
    habit.toggle(date ?? DateTime.now());
    save();
    notifyListeners();
  }

  // ── Theme ──────────────────────────────────────────────────────────────────

  void toggleTheme() {
    isDark = !isDark;
    save();
    notifyListeners();
  }

  // ── City ──────────────────────────────────────────────────────────────────

  void setCity(String value) {
    city = value.trim().isEmpty ? 'Konya' : value.trim();
    save();
    notifyListeners();
  }

  // ── Prayer Times ───────────────────────────────────────────────────────────

  void setPrayers(List<PrayerTime> times) {
    prayers = times;
    notifyListeners();
  }

  // ── Timer ──────────────────────────────────────────────────────────────────

  void setTimerPreset(TimerMode mode) {
    final secs = switch (mode) {
      TimerMode.focus => 25 * 60,
      TimerMode.shortBreak => 5 * 60,
      TimerMode.longBreak => 15 * 60,
    };
    timer = TimerState(remain: secs, total: secs, mode: mode);
    notifyListeners();
  }

  void timerTick() {
    if (!timer.running) return;
    if (timer.remain > 0) {
      timer.remain--;
    } else {
      timer.running = false;
      if (timer.mode == TimerMode.focus) {
        timer.sessCount++;
      }
    }
    notifyListeners();
  }

  void timerToggle() {
    timer.running = !timer.running;
    notifyListeners();
  }

  void timerReset() {
    timer.remain = timer.total;
    timer.running = false;
    notifyListeners();
  }

  void addCatTime(String category, double minutes) {
    catTimes[category] = (catTimes[category] ?? 0) + minutes;
    save();
    notifyListeners();
  }

  // ── Analytics ─────────────────────────────────────────────────────────────

  int get pendingCount => tasks.where((t) => !t.done).length;
  int get doneCount => tasks.where((t) => t.done).length;
  int get overdueCount => tasks.where((t) => t.isOverdue).length;
  double get completionRate =>
      tasks.isEmpty ? 0 : doneCount / tasks.length;

  Map<String, int> get categoryDist {
    final map = <String, int>{};
    for (final t in tasks) {
      map[t.category] = (map[t.category] ?? 0) + 1;
    }
    return map;
  }

  List<int> last7DaysDone() {
    final result = <int>[];
    final now = DateTime.now();
    for (int i = 6; i >= 0; i--) {
      final date = now.subtract(Duration(days: i));
      result.add(tasks
          .where((t) =>
              t.done &&
              t.dueDate != null &&
              t.dueDate!.year == date.year &&
              t.dueDate!.month == date.month &&
              t.dueDate!.day == date.day)
          .length);
    }
    return result;
  }

  // ── Factory Reset ──────────────────────────────────────────────────────────

  Future<void> factoryReset() async {
    tasks = [];
    habits = [];
    prayers = [];
    timer = TimerState();
    catTimes = {};
    lastReset = '';
    _initDefaults();
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_kStorageKey);
    await prefs.remove(_kPrayerCacheKey);
    notifyListeners();
  }
}

extension ListExtension<T> on List<T> {
  T? firstWhereOrNull(bool Function(T) test) {
    for (final e in this) {
      if (test(e)) return e;
    }
    return null;
  }
}
