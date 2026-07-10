import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

import '../models/app_state.dart';
import '../theme/app_theme.dart';
import '../widgets/timer_ring.dart';

class TimerScreen extends StatelessWidget {
  const TimerScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Consumer<AppState>(
      builder: (context, state, _) {
        return Scaffold(
          appBar: AppBar(
            title: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Pomodoro', style: GoogleFonts.outfit(fontSize: 22, fontWeight: FontWeight.w700)),
                Text(
                  '${state.timer.sessCount} seans tamamlandı',
                  style: GoogleFonts.outfit(
                    fontSize: 12,
                    color: isDark ? AppColors.darkSubtext : AppColors.lightSubtext,
                  ),
                ),
              ],
            ),
          ),
          body: const SafeArea(
            child: Center(
              child: TimerRing(),
            ),
          ),
        );
      },
    );
  }
}
