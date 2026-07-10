import 'dart:async';
import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

import '../models/app_state.dart';
import '../theme/app_theme.dart';

class TimerRing extends StatefulWidget {
  const TimerRing({super.key});

  @override
  State<TimerRing> createState() => _TimerRingState();
}

class _TimerRingState extends State<TimerRing> with SingleTickerProviderStateMixin {
  Timer? _ticker;
  late AnimationController _pulseCtrl;
  late Animation<double> _pulseAnim;

  @override
  void initState() {
    super.initState();
    _pulseCtrl = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    )..repeat(reverse: true);
    _pulseAnim = Tween<double>(begin: 0.95, end: 1.05).animate(
      CurvedAnimation(parent: _pulseCtrl, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _ticker?.cancel();
    _pulseCtrl.dispose();
    super.dispose();
  }

  void _startTicker(AppState state) {
    _ticker?.cancel();
    _ticker = Timer.periodic(const Duration(seconds: 1), (_) {
      state.timerTick();
    });
  }

  void _stopTicker() {
    _ticker?.cancel();
    _ticker = null;
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<AppState>(
      builder: (context, state, _) {
        final timer = state.timer;
        final color = switch (timer.mode) {
          TimerMode.focus => AppColors.teal,
          TimerMode.shortBreak => AppColors.success,
          TimerMode.longBreak => AppColors.info,
        };

        if (timer.running && (_ticker == null || !_ticker!.isActive)) {
          WidgetsBinding.instance.addPostFrameCallback((_) => _startTicker(state));
        }
        if (!timer.running) _stopTicker();

        final progress = timer.total > 0 ? timer.remain / timer.total : 0.0;
        final mins = timer.remain ~/ 60;
        final secs = timer.remain % 60;

        return Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Ring
            AnimatedBuilder(
              animation: _pulseAnim,
              builder: (context, child) {
                return Transform.scale(
                  scale: timer.running ? _pulseAnim.value : 1.0,
                  child: child,
                );
              },
              child: SizedBox(
                width: 260,
                height: 260,
                child: Stack(
                  alignment: Alignment.center,
                  children: [
                    CustomPaint(
                      size: const Size(260, 260),
                      painter: _RingPainter(progress: progress, color: color),
                    ),
                    Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          '${mins.toString().padLeft(2, '0')}:${secs.toString().padLeft(2, '0')}',
                          style: GoogleFonts.jetBrainsMono(
                            fontSize: 52,
                            fontWeight: FontWeight.w700,
                            color: color,
                            letterSpacing: -2,
                          ),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          switch (timer.mode) {
                            TimerMode.focus => 'ODAK',
                            TimerMode.shortBreak => 'KISA MOLA',
                            TimerMode.longBreak => 'UZUN MOLA',
                          },
                          style: GoogleFonts.outfit(
                            fontSize: 13,
                            fontWeight: FontWeight.w700,
                            letterSpacing: 3,
                            color: color.withOpacity(0.7),
                          ),
                        ),
                        if (timer.sessCount > 0) ...[
                          const SizedBox(height: 8),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: List.generate(
                              timer.sessCount.clamp(0, 8),
                              (_) => Container(
                                margin: const EdgeInsets.symmetric(horizontal: 2),
                                width: 8,
                                height: 8,
                                decoration: BoxDecoration(
                                  color: color.withOpacity(0.7),
                                  shape: BoxShape.circle,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ],
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 36),
            // Preset butonları
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _PresetBtn(
                  label: '25dk',
                  sublabel: 'Odak',
                  selected: timer.mode == TimerMode.focus,
                  onTap: () => state.setTimerPreset(TimerMode.focus),
                ),
                const SizedBox(width: 12),
                _PresetBtn(
                  label: '5dk',
                  sublabel: 'Kısa Mola',
                  selected: timer.mode == TimerMode.shortBreak,
                  onTap: () => state.setTimerPreset(TimerMode.shortBreak),
                ),
                const SizedBox(width: 12),
                _PresetBtn(
                  label: '15dk',
                  sublabel: 'Uzun Mola',
                  selected: timer.mode == TimerMode.longBreak,
                  onTap: () => state.setTimerPreset(TimerMode.longBreak),
                ),
              ],
            ),
            const SizedBox(height: 32),
            // Kontroller
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Sıfırla
                _ControlBtn(
                  icon: Icons.refresh_rounded,
                  onTap: () {
                    _stopTicker();
                    state.timerReset();
                  },
                  tooltip: 'Sıfırla',
                ),
                const SizedBox(width: 20),
                // Başlat/Durdur (büyük buton)
                GestureDetector(
                  onTap: () {
                    state.timerToggle();
                    if (state.timer.running) {
                      _startTicker(state);
                    } else {
                      _stopTicker();
                    }
                  },
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 200),
                    width: 72,
                    height: 72,
                    decoration: BoxDecoration(
                      color: color,
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: color.withOpacity(0.4),
                          blurRadius: 20,
                          spreadRadius: 2,
                        ),
                      ],
                    ),
                    child: Icon(
                      timer.running ? Icons.pause_rounded : Icons.play_arrow_rounded,
                      color: Colors.white,
                      size: 36,
                    ),
                  ),
                ),
                const SizedBox(width: 20),
                // Seans sayısı
                _ControlBtn(
                  icon: Icons.bar_chart_rounded,
                  onTap: null,
                  tooltip: '${timer.sessCount} seans',
                  badge: timer.sessCount > 0 ? '${timer.sessCount}' : null,
                ),
              ],
            ),
          ],
        );
      },
    );
  }
}

// ── Ring Painter ──────────────────────────────────────────────────────────────

class _RingPainter extends CustomPainter {
  const _RingPainter({required this.progress, required this.color});
  final double progress;
  final Color color;

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = size.width / 2 - 12;
    const strokeWidth = 14.0;

    // Arka plan halkası
    final bgPaint = Paint()
      ..color = color.withOpacity(0.1)
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeWidth
      ..strokeCap = StrokeCap.round;
    canvas.drawCircle(center, radius, bgPaint);

    // İlerleme halkası
    final fgPaint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeWidth
      ..strokeCap = StrokeCap.round;

    final rect = Rect.fromCircle(center: center, radius: radius);
    canvas.drawArc(
      rect,
      -math.pi / 2,
      2 * math.pi * progress,
      false,
      fgPaint,
    );

    // Parlak nokta (başlangıç)
    final dotPaint = Paint()
      ..color = color
      ..style = PaintingStyle.fill;
    final dotPos = Offset(
      center.dx + radius * math.cos(-math.pi / 2 + 2 * math.pi * progress),
      center.dy + radius * math.sin(-math.pi / 2 + 2 * math.pi * progress),
    );
    canvas.drawCircle(dotPos, strokeWidth / 2, dotPaint);
  }

  @override
  bool shouldRepaint(_RingPainter old) =>
      old.progress != progress || old.color != color;
}

// ── Preset Button ─────────────────────────────────────────────────────────────

class _PresetBtn extends StatelessWidget {
  const _PresetBtn({
    required this.label,
    required this.sublabel,
    required this.selected,
    required this.onTap,
  });
  final String label;
  final String sublabel;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        decoration: BoxDecoration(
          color: selected
              ? AppColors.teal.withOpacity(0.2)
              : (isDark ? AppColors.darkCard : AppColors.lightCard),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: selected ? AppColors.teal : (isDark ? AppColors.darkCardBorder : AppColors.lightBorder),
            width: selected ? 2 : 1,
          ),
        ),
        child: Column(
          children: [
            Text(
              label,
              style: GoogleFonts.outfit(
                fontSize: 16,
                fontWeight: FontWeight.w700,
                color: selected ? AppColors.teal : (isDark ? AppColors.darkText : AppColors.lightText),
              ),
            ),
            Text(
              sublabel,
              style: GoogleFonts.outfit(
                fontSize: 10,
                color: selected ? AppColors.teal.withOpacity(0.8) : (isDark ? AppColors.darkSubtext : AppColors.lightSubtext),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ── Control Button ────────────────────────────────────────────────────────────

class _ControlBtn extends StatelessWidget {
  const _ControlBtn({required this.icon, required this.onTap, required this.tooltip, this.badge});
  final IconData icon;
  final VoidCallback? onTap;
  final String tooltip;
  final String? badge;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Tooltip(
      message: tooltip,
      child: GestureDetector(
        onTap: onTap,
        child: Stack(
          children: [
            Container(
              width: 52,
              height: 52,
              decoration: BoxDecoration(
                color: isDark ? AppColors.darkCard : AppColors.lightCard,
                shape: BoxShape.circle,
                border: Border.all(
                  color: isDark ? AppColors.darkCardBorder : AppColors.lightBorder,
                ),
              ),
              child: Icon(icon, color: isDark ? AppColors.darkText : AppColors.lightText, size: 24),
            ),
            if (badge != null)
              Positioned(
                top: 0,
                right: 0,
                child: Container(
                  padding: const EdgeInsets.all(4),
                  decoration: const BoxDecoration(
                    color: AppColors.teal,
                    shape: BoxShape.circle,
                  ),
                  child: Text(
                    badge!,
                    style: const TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.w700),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
