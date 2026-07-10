import 'package:flutter_local_notifications/flutter_local_notifications.dart' as fln;
import 'package:timezone/timezone.dart' as tz;

import '../models/task.dart';

final _plugin = fln.FlutterLocalNotificationsPlugin();

class NotificationService {
  static bool _initialized = false;

  static Future<void> initialize() async {
    if (_initialized) return;

    const androidSettings =
        fln.AndroidInitializationSettings('@mipmap/ic_launcher');
    const settings = fln.InitializationSettings(android: androidSettings);
    await _plugin.initialize(settings);
    _initialized = true;
  }

  // ── Task Reminders ─────────────────────────────────────────────────────────

  static Future<void> scheduleTaskReminder(Task task) async {
    if (task.dueDate == null) return;
    await initialize();

    final dt = DateTime(
      task.dueDate!.year,
      task.dueDate!.month,
      task.dueDate!.day,
      task.dueTime?.hour ?? 9,
      task.dueTime?.minute ?? 0,
    );

    if (dt.isBefore(DateTime.now())) return;

    final tzDt = tz.TZDateTime.from(dt, tz.local);

    final androidDetails = fln.AndroidNotificationDetails(
      'hayat_takvimi_tasks',
      'Görev Hatırlatıcıları',
      channelDescription: 'Görev bitiş tarihi bildirimleri',
      importance: fln.Importance.high,
      priority: fln.Priority.high,
      icon: '@mipmap/ic_launcher',
    );

    await _plugin.zonedSchedule(
      task.id.hashCode & 0x7FFFFFFF,
      '📋 ${task.priorityLabel} öncelikli görev',
      task.title,
      tzDt,
      fln.NotificationDetails(android: androidDetails),
      androidScheduleMode: fln.AndroidScheduleMode.exactAllowWhileIdle,
    );
  }

  static Future<void> cancelTaskReminder(String taskId) async {
    await initialize();
    await _plugin.cancel(taskId.hashCode & 0x7FFFFFFF);
  }

  // ── Prayer Notifications ───────────────────────────────────────────────────

  static Future<void> schedulePrayerNotif({
    required int id,
    required String name,
    required String time, // 'HH:mm'
  }) async {
    await initialize();

    final parts = time.split(':');
    if (parts.length != 2) return;
    final h = int.tryParse(parts[0]) ?? 0;
    final m = int.tryParse(parts[1]) ?? 0;

    final now = DateTime.now();
    var dt = DateTime(now.year, now.month, now.day, h, m);
    if (dt.isBefore(now)) {
      dt = dt.add(const Duration(days: 1));
    }

    final tzDt = tz.TZDateTime.from(dt, tz.local);

    final androidDetails = fln.AndroidNotificationDetails(
      'hayat_takvimi_prayer',
      'Namaz Vakitleri',
      channelDescription: 'Namaz vakti bildirimleri',
      importance: fln.Importance.high,
      priority: fln.Priority.high,
      icon: '@mipmap/ic_launcher',
    );

    await _plugin.zonedSchedule(
      1000 + id,
      '🕌 $name vakti',
      '$name namazı için vakit geldi',
      tzDt,
      fln.NotificationDetails(android: androidDetails),
      androidScheduleMode: fln.AndroidScheduleMode.exactAllowWhileIdle,
      matchDateTimeComponents: fln.DateTimeComponents.time, // daily repeat
    );
  }

  static Future<void> cancelPrayerNotif(int id) async {
    await initialize();
    await _plugin.cancel(1000 + id);
  }

  static Future<void> cancelAll() async {
    await initialize();
    await _plugin.cancelAll();
  }

  // ── Immediate (test) ───────────────────────────────────────────────────────

  static Future<void> showImmediate({
    required String title,
    required String body,
  }) async {
    await initialize();
    const androidDetails = fln.AndroidNotificationDetails(
      'hayat_takvimi_general',
      'Genel Bildirimler',
      importance: fln.Importance.defaultImportance,
    );
    await _plugin.show(
      0,
      title,
      body,
      const fln.NotificationDetails(android: androidDetails),
    );
  }
}
