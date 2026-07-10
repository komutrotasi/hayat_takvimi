class Habit {
  Habit({
    required this.id,
    required this.name,
    this.icon = '⭐',
    this.color = 0xFF14b8a6,
    Map<String, bool>? doneMap,
  }) : doneMap = doneMap ?? {};

  final String id;
  String name;
  String icon;
  int color; // Color.value (ARGB int)
  /// Key format: 'yyyy-MM-dd' → true/false
  Map<String, bool> doneMap;

  static String _dateKey(DateTime date) =>
      '${date.year}-${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}';

  bool isDoneOn(DateTime date) => doneMap[_dateKey(date)] == true;

  void toggle(DateTime date) {
    final key = _dateKey(date);
    doneMap[key] = !(doneMap[key] ?? false);
  }

  void setDone(DateTime date, {bool value = true}) {
    doneMap[_dateKey(date)] = value;
  }

  /// Current streak (consecutive days ending today)
  int streak() {
    int count = 0;
    var date = DateTime.now();
    while (true) {
      if (isDoneOn(date)) {
        count++;
        date = date.subtract(const Duration(days: 1));
      } else {
        break;
      }
    }
    return count;
  }

  /// Longest streak ever
  int longestStreak() {
    if (doneMap.isEmpty) return 0;
    final keys = doneMap.keys
        .where((k) => doneMap[k] == true)
        .map((k) => DateTime.tryParse(k))
        .where((d) => d != null)
        .cast<DateTime>()
        .toList()
      ..sort();
    if (keys.isEmpty) return 0;
    int longest = 1, current = 1;
    for (int i = 1; i < keys.length; i++) {
      final diff = keys[i].difference(keys[i - 1]).inDays;
      if (diff == 1) {
        current++;
        if (current > longest) longest = current;
      } else {
        current = 1;
      }
    }
    return longest;
  }

  /// Completion rate over last [days] days (0.0 – 1.0)
  double habitRate({int days = 7}) {
    int done = 0;
    final now = DateTime.now();
    for (int i = 0; i < days; i++) {
      final date = now.subtract(Duration(days: i));
      if (isDoneOn(date)) done++;
    }
    return done / days;
  }

  /// Last [days] booleans for grid display (index 0 = oldest)
  List<bool> last7() {
    final result = <bool>[];
    final now = DateTime.now();
    for (int i = 6; i >= 0; i--) {
      result.add(isDoneOn(now.subtract(Duration(days: i))));
    }
    return result;
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'icon': icon,
        'color': color,
        'doneMap': doneMap,
      };

  factory Habit.fromJson(Map<String, dynamic> json) => Habit(
        id: json['id'] as String? ?? _genId(),
        name: json['name'] as String? ?? '',
        icon: json['icon'] as String? ?? '⭐',
        color: _parseColor(json['color']),
        doneMap: (json['doneMap'] as Map<String, dynamic>?)
                ?.map((k, v) => MapEntry(k, v as bool? ?? false)) ??
            {},
      );

  static int _parseColor(dynamic v) {
    if (v is int) return v;
    if (v is String) {
      // Legacy: '#rrggbb' hex string
      final hex = v.replaceFirst('#', '');
      return int.tryParse('FF$hex', radix: 16) ?? 0xFF14b8a6;
    }
    return 0xFF14b8a6;
  }

  static String _genId() =>
      DateTime.now().microsecondsSinceEpoch.toString();
}

final kDefaultHabits = [
  Habit(id: 'h1', name: 'Sabah namazı', icon: '🌅', color: 0xFFf59e0b),
  Habit(id: 'h2', name: 'Kuran okuma', icon: '📖', color: 0xFF10b981),
  Habit(id: 'h3', name: 'Egzersiz', icon: '🏃', color: 0xFF3b82f6),
  Habit(id: 'h4', name: 'Su içme (8 bardak)', icon: '💧', color: 0xFF06b6d4),
  Habit(id: 'h5', name: 'Kitap okuma', icon: '📚', color: 0xFF8b5cf6),
];
