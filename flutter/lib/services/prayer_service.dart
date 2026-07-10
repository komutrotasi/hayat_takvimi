import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

import '../models/app_state.dart';

const _kCacheKey = 'ht_prayer_cache_v1';



class PrayerService {
  /// Fetch prayer times for [city]. Returns cached result if already fetched today.
  static Future<List<PrayerTime>> fetchPrayerTimes(String city) => fetchTimes(city);

  static Future<List<PrayerTime>> fetchTimes(String city) async {
    final today = _todayKey();
    final prefs = await SharedPreferences.getInstance();
    final cached = prefs.getString(_kCacheKey);

    if (cached != null) {
      try {
        final map = jsonDecode(cached) as Map<String, dynamic>;
        if (map['date'] == today && map['city'] == city) {
          final list = (map['times'] as List<dynamic>)
              .map((e) => PrayerTime(
                    name: e['name'] as String,
                    time: e['time'] as String,
                  ))
              .toList();
          return list;
        }
      } catch (_) {}
    }

    try {
      final uri = Uri.parse(
        'https://api.aladhan.com/v1/timingsByCity'
        '?city=${Uri.encodeComponent(city)}'
        '&country=TR'
        '&method=13', // Diyanet İşleri Başkanlığı
      );

      final response = await http
          .get(uri)
          .timeout(const Duration(seconds: 8));

      if (response.statusCode == 200) {
        final body = jsonDecode(response.body) as Map<String, dynamic>;
        final timings =
            body['data']?['timings'] as Map<String, dynamic>?;
        if (timings != null) {
          final prayers = _parsePrayers(timings);

          // Cache
          await prefs.setString(
            _kCacheKey,
            jsonEncode({
              'date': today,
              'city': city,
              'times': prayers
                  .map((p) => {'name': p.name, 'time': p.time})
                  .toList(),
            }),
          );

          return prayers;
        }
      }
    } catch (_) {}

    return _fallback();
  }

  static List<PrayerTime> _parsePrayers(Map<String, dynamic> timings) {
    String clean(String? t) {
      if (t == null) return '--:--';
      // API returns "05:30 (EET)" — take first part
      return t.split(' ').first;
    }

    return [
      PrayerTime(name: 'İmsak', time: clean(timings['Imsak'] as String?)),
      PrayerTime(name: 'Güneş', time: clean(timings['Sunrise'] as String?)),
      PrayerTime(name: 'Öğle', time: clean(timings['Dhuhr'] as String?)),
      PrayerTime(name: 'İkindi', time: clean(timings['Asr'] as String?)),
      PrayerTime(name: 'Akşam', time: clean(timings['Maghrib'] as String?)),
      PrayerTime(name: 'Yatsı', time: clean(timings['Isha'] as String?)),
    ];
  }

  static List<PrayerTime> _fallback() => [
        PrayerTime(name: 'İmsak', time: '05:30'),
        PrayerTime(name: 'Güneş', time: '07:05'),
        PrayerTime(name: 'Öğle', time: '13:00'),
        PrayerTime(name: 'İkindi', time: '16:30'),
        PrayerTime(name: 'Akşam', time: '19:45'),
        PrayerTime(name: 'Yatsı', time: '21:15'),
      ];

  /// Next prayer (returns null if all passed)
  static PrayerTime? nextPrayer(List<PrayerTime> prayers) {
    final now = DateTime.now();
    final nowMins = now.hour * 60 + now.minute;

    for (final p in prayers) {
      final parts = p.time.split(':');
      if (parts.length != 2) continue;
      final h = int.tryParse(parts[0]) ?? 0;
      final m = int.tryParse(parts[1]) ?? 0;
      final pMins = h * 60 + m;
      if (pMins > nowMins) return p;
    }
    return null; // all passed today
  }

  /// Minutes until next prayer
  static int minutesUntil(PrayerTime prayer) {
    final now = DateTime.now();
    final nowMins = now.hour * 60 + now.minute;
    final parts = prayer.time.split(':');
    final h = int.tryParse(parts[0]) ?? 0;
    final m = int.tryParse(parts[1]) ?? 0;
    return (h * 60 + m) - nowMins;
  }

  static String _todayKey() {
    final now = DateTime.now();
    return '${now.year}-${now.month.toString().padLeft(2, '0')}-${now.day.toString().padLeft(2, '0')}';
  }
}
