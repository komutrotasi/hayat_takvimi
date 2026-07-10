import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../models/app_state.dart';

class PrayerCard extends StatelessWidget {
  const PrayerCard({super.key, required this.prayers, required this.city});
  final List<PrayerTime> prayers;
  final String city;

  @override
  Widget build(BuildContext context) {
    final nextIdx = _nextPrayerIndex();

    return Container(
      margin: const EdgeInsets.fromLTRB(16, 8, 16, 4),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF0f4c75), Color(0xFF1b6ca8)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFF0f4c75).withValues(alpha: 0.4),
            blurRadius: 16,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const Text('🕌', style: TextStyle(fontSize: 20)),
                const SizedBox(width: 8),
                Text(
                  'Namaz Vakitleri',
                  style: GoogleFonts.outfit(
                    fontSize: 16,
                    fontWeight: FontWeight.w700,
                    color: Colors.white,
                  ),
                ),
                const Spacer(),
                Row(
                  children: [
                    const Icon(Icons.location_on_rounded, color: Colors.white70, size: 14),
                    const SizedBox(width: 4),
                    Text(
                      city,
                      style: GoogleFonts.outfit(
                        fontSize: 13,
                        color: Colors.white70,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 14),
            prayers.isEmpty
                ? Center(
                    child: Text(
                      'Vakitler yükleniyor...',
                      style: GoogleFonts.outfit(color: Colors.white60, fontSize: 13),
                    ),
                  )
                : Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: prayers.asMap().entries.map((entry) {
                      final i = entry.key;
                      final p = entry.value;
                      final isNext = i == nextIdx;
                      return _PrayerItem(
                        name: p.name,
                        time: p.time,
                        isNext: isNext,
                      );
                    }).toList(),
                  ),
          ],
        ),
      ),
    );
  }

  int _nextPrayerIndex() {
    if (prayers.isEmpty) return -1;
    final now = TimeOfDay.now();
    final nowMins = now.hour * 60 + now.minute;
    for (int i = 0; i < prayers.length; i++) {
      final parts = prayers[i].time.split(':');
      if (parts.length == 2) {
        final mins = int.tryParse(parts[0])! * 60 + int.tryParse(parts[1])!;
        if (mins > nowMins) return i;
      }
    }
    return 0; // Ertesi gün ilk vakit
  }
}

class _PrayerItem extends StatelessWidget {
  const _PrayerItem({required this.name, required this.time, required this.isNext});
  final String name;
  final String time;
  final bool isNext;

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 300),
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
      decoration: isNext
          ? BoxDecoration(
              color: Colors.white.withValues(alpha: 0.2),
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: Colors.white.withValues(alpha: 0.4)),
            )
          : null,
      child: Column(
        children: [
          Text(
            name,
            style: GoogleFonts.outfit(
              fontSize: 10,
              fontWeight: FontWeight.w600,
              color: isNext ? Colors.white : Colors.white60,
              letterSpacing: 0.5,
            ),
          ),
          const SizedBox(height: 3),
          Text(
            time,
            style: GoogleFonts.jetBrainsMono(
              fontSize: 14,
              fontWeight: FontWeight.w700,
              color: isNext ? Colors.white : Colors.white70,
            ),
          ),
          if (isNext)
            Padding(
              padding: const EdgeInsets.only(top: 2),
              child: Container(
                width: 6,
                height: 6,
                decoration: const BoxDecoration(
                  color: Color(0xFF22c55e),
                  shape: BoxShape.circle,
                ),
              ),
            ),
        ],
      ),
    );
  }
}
