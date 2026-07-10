import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

import '../models/app_state.dart';
import '../theme/app_theme.dart';

class AnalyticsScreen extends StatelessWidget {
  const AnalyticsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Consumer<AppState>(
      builder: (context, state, _) {
        return Scaffold(
          appBar: AppBar(
            title: Text('Analitik', style: GoogleFonts.outfit(fontSize: 22, fontWeight: FontWeight.w700)),
          ),
          body: ListView(
            padding: const EdgeInsets.only(bottom: 100),
            children: [
              // Özet kartlar
              Padding(
                padding: const EdgeInsets.fromLTRB(16, 8, 16, 4),
                child: Row(
                  children: [
                    _StatCard(
                      label: 'Tamamlanan',
                      value: '${state.doneCount}',
                      icon: Icons.check_circle_rounded,
                      color: AppColors.success,
                    ),
                    const SizedBox(width: 12),
                    _StatCard(
                      label: 'Bekleyen',
                      value: '${state.pendingCount}',
                      icon: Icons.pending_rounded,
                      color: AppColors.warning,
                    ),
                    const SizedBox(width: 12),
                    _StatCard(
                      label: 'Gecikmiş',
                      value: '${state.overdueCount}',
                      icon: Icons.warning_rounded,
                      color: AppColors.danger,
                    ),
                  ],
                ),
              ),
              // Tamamlama oranı (Pie)
              if (state.tasks.isNotEmpty) _CompletionPie(state: state),
              // 7 günlük trend (Line)
              _WeeklyChart(data: state.last7DaysDone()),
              // Kategori dağılımı (Bar)
              if (state.categoryDist.isNotEmpty) _CategoryBar(dist: state.categoryDist),
              // Alışkanlık streak liderleri
              if (state.habits.isNotEmpty) _HabitLeaders(state: state),
              // Odak süresi
              if (state.catTimes.isNotEmpty) _FocusTime(catTimes: state.catTimes),
            ],
          ),
        );
      },
    );
  }
}

// ── Stat Card ─────────────────────────────────────────────────────────────────

class _StatCard extends StatelessWidget {
  const _StatCard({required this.label, required this.value, required this.icon, required this.color});
  final String label;
  final String value;
  final IconData icon;
  final Color color;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: isDark ? AppColors.darkCard : AppColors.lightCard,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: isDark ? AppColors.darkCardBorder : AppColors.lightBorder),
        ),
        child: Column(
          children: [
            Icon(icon, color: color, size: 24),
            const SizedBox(height: 6),
            Text(
              value,
              style: GoogleFonts.outfit(fontSize: 22, fontWeight: FontWeight.w700, color: color),
            ),
            Text(
              label,
              style: GoogleFonts.outfit(
                fontSize: 11,
                color: isDark ? AppColors.darkSubtext : AppColors.lightSubtext,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}

// ── Completion Pie ────────────────────────────────────────────────────────────

class _CompletionPie extends StatelessWidget {
  const _CompletionPie({required this.state});
  final AppState state;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final done = state.doneCount.toDouble();
    final pending = state.pendingCount.toDouble();

    return _ChartCard(
      title: 'Tamamlama Oranı',
      child: SizedBox(
        height: 180,
        child: Row(
          children: [
            Expanded(
              child: PieChart(
                PieChartData(
                  sections: [
                    PieChartSectionData(
                      value: done,
                      color: AppColors.success,
                      title: '${(state.completionRate * 100).toStringAsFixed(0)}%',
                      titleStyle: GoogleFonts.outfit(
                        fontSize: 18,
                        fontWeight: FontWeight.w700,
                        color: Colors.white,
                      ),
                      radius: 70,
                    ),
                    if (pending > 0)
                      PieChartSectionData(
                        value: pending,
                        color: AppColors.darkCardBorder,
                        title: '',
                        radius: 60,
                      ),
                  ],
                  sectionsSpace: 2,
                  centerSpaceRadius: 0,
                ),
              ),
            ),
            const SizedBox(width: 16),
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _Legend(color: AppColors.success, label: 'Tamamlanan (${state.doneCount})'),
                const SizedBox(height: 8),
                _Legend(color: AppColors.darkCardBorder, label: 'Bekleyen (${state.pendingCount})'),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _Legend extends StatelessWidget {
  const _Legend({required this.color, required this.label});
  final Color color;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(width: 12, height: 12, decoration: BoxDecoration(color: color, shape: BoxShape.circle)),
        const SizedBox(width: 6),
        Text(label, style: GoogleFonts.outfit(fontSize: 12)),
      ],
    );
  }
}

// ── Weekly Chart ──────────────────────────────────────────────────────────────

class _WeeklyChart extends StatelessWidget {
  const _WeeklyChart({required this.data});
  final List<int> data;

  static const _days = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

  @override
  Widget build(BuildContext context) {
    final spots = data.asMap().entries
        .map((e) => FlSpot(e.key.toDouble(), e.value.toDouble()))
        .toList();
    final maxY = (data.isEmpty ? 5 : data.reduce((a, b) => a > b ? a : b) + 1).toDouble();

    return _ChartCard(
      title: '7 Günlük Tamamlama',
      child: SizedBox(
        height: 160,
        child: LineChart(
          LineChartData(
            minY: 0,
            maxY: maxY < 1 ? 5 : maxY,
            gridData: FlGridData(
              show: true,
              drawVerticalLine: false,
              horizontalInterval: 1,
              getDrawingHorizontalLine: (_) => FlLine(
                color: AppColors.darkCardBorder.withOpacity(0.5),
                strokeWidth: 1,
              ),
            ),
            borderData: FlBorderData(show: false),
            titlesData: FlTitlesData(
              leftTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
              rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
              topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
              bottomTitles: AxisTitles(
                sideTitles: SideTitles(
                  showTitles: true,
                  getTitlesWidget: (v, _) {
                    final now = DateTime.now();
                    final day = now.subtract(Duration(days: 6 - v.toInt()));
                    return Text(
                      _days[day.weekday - 1],
                      style: GoogleFonts.outfit(fontSize: 10, color: AppColors.darkSubtext),
                    );
                  },
                ),
              ),
            ),
            lineBarsData: [
              LineChartBarData(
                spots: spots,
                isCurved: true,
                color: AppColors.teal,
                barWidth: 3,
                belowBarData: BarAreaData(
                  show: true,
                  color: AppColors.teal.withOpacity(0.1),
                ),
                dotData: FlDotData(
                  show: true,
                  getDotPainter: (spot, _, __, ___) => FlDotCirclePainter(
                    radius: 4,
                    color: AppColors.teal,
                    strokeColor: Colors.white,
                    strokeWidth: 2,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ── Category Bar ──────────────────────────────────────────────────────────────

class _CategoryBar extends StatelessWidget {
  const _CategoryBar({required this.dist});
  final Map<String, int> dist;

  @override
  Widget build(BuildContext context) {
    final sorted = dist.entries.toList()..sort((a, b) => b.value.compareTo(a.value));
    final maxVal = sorted.first.value.toDouble();

    return _ChartCard(
      title: 'Kategori Dağılımı',
      child: SizedBox(
        height: sorted.length * 48.0,
        child: BarChart(
          BarChartData(
            alignment: BarChartAlignment.center,
            maxY: maxVal + 1,
            barTouchData: BarTouchData(enabled: false),
            gridData: FlGridData(show: false),
            borderData: FlBorderData(show: false),
            titlesData: FlTitlesData(
              leftTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
              rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
              topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
              bottomTitles: AxisTitles(
                sideTitles: SideTitles(
                  showTitles: true,
                  getTitlesWidget: (v, _) {
                    final i = v.toInt();
                    if (i < 0 || i >= sorted.length) return const SizedBox.shrink();
                    return Padding(
                      padding: const EdgeInsets.only(top: 4),
                      child: Text(
                        sorted[i].key,
                        style: GoogleFonts.outfit(fontSize: 10, color: AppColors.darkSubtext),
                      ),
                    );
                  },
                ),
              ),
            ),
            barGroups: sorted.asMap().entries.map((e) {
              final color = categoryColor(e.value.key);
              return BarChartGroupData(
                x: e.key,
                barRods: [
                  BarChartRodData(
                    toY: e.value.value.toDouble(),
                    color: color,
                    width: 20,
                    borderRadius: const BorderRadius.vertical(top: Radius.circular(6)),
                  ),
                ],
              );
            }).toList(),
          ),
        ),
      ),
    );
  }
}

// ── Habit Leaders ─────────────────────────────────────────────────────────────

class _HabitLeaders extends StatelessWidget {
  const _HabitLeaders({required this.state});
  final AppState state;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final sorted = [...state.habits]..sort((a, b) => b.streak().compareTo(a.streak()));
    final top = sorted.take(5).toList();

    return _ChartCard(
      title: 'Seri Liderleri 🔥',
      child: Column(
        children: top.asMap().entries.map((e) {
          final i = e.key;
          final h = e.value;
          final streak = h.streak();
          final color = Color(h.color);
          return Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: Row(
              children: [
                Text(
                  '${i + 1}.',
                  style: GoogleFonts.outfit(
                    fontSize: 14,
                    fontWeight: FontWeight.w700,
                    color: i == 0 ? AppColors.warning : (isDark ? AppColors.darkSubtext : AppColors.lightSubtext),
                  ),
                ),
                const SizedBox(width: 10),
                Text(h.icon, style: const TextStyle(fontSize: 20)),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        h.name,
                        style: GoogleFonts.outfit(fontSize: 14, fontWeight: FontWeight.w600),
                      ),
                      ClipRRect(
                        borderRadius: BorderRadius.circular(4),
                        child: LinearProgressIndicator(
                          value: h.habitRate(),
                          backgroundColor: color.withOpacity(0.15),
                          valueColor: AlwaysStoppedAnimation<Color>(color),
                          minHeight: 4,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 10),
                Text(
                  '$streak gün',
                  style: GoogleFonts.outfit(
                    fontSize: 13,
                    fontWeight: FontWeight.w700,
                    color: streak > 0 ? AppColors.warning : (isDark ? AppColors.darkSubtext : AppColors.lightSubtext),
                  ),
                ),
              ],
            ),
          );
        }).toList(),
      ),
    );
  }
}

// ── Focus Time ────────────────────────────────────────────────────────────────

class _FocusTime extends StatelessWidget {
  const _FocusTime({required this.catTimes});
  final Map<String, double> catTimes;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final total = catTimes.values.fold(0.0, (a, b) => a + b);
    final sorted = catTimes.entries.toList()..sort((a, b) => b.value.compareTo(a.value));

    return _ChartCard(
      title: 'Odak Süresi',
      child: Column(
        children: [
          Text(
            '${total.toStringAsFixed(0)} dk toplam',
            style: GoogleFonts.outfit(
              fontSize: 24,
              fontWeight: FontWeight.w700,
              color: AppColors.teal,
            ),
          ),
          const SizedBox(height: 12),
          ...sorted.take(5).map((e) {
            final color = categoryColor(e.key);
            final pct = total > 0 ? e.value / total : 0.0;
            return Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: Row(
                children: [
                  Container(
                    width: 10, height: 10,
                    decoration: BoxDecoration(color: color, shape: BoxShape.circle),
                  ),
                  const SizedBox(width: 8),
                  Expanded(child: Text(e.key, style: GoogleFonts.outfit(fontSize: 13))),
                  Text(
                    '${e.value.toStringAsFixed(0)} dk',
                    style: GoogleFonts.outfit(fontSize: 12, color: isDark ? AppColors.darkSubtext : AppColors.lightSubtext),
                  ),
                  const SizedBox(width: 8),
                  SizedBox(
                    width: 80,
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(4),
                      child: LinearProgressIndicator(
                        value: pct,
                        backgroundColor: color.withOpacity(0.15),
                        valueColor: AlwaysStoppedAnimation<Color>(color),
                        minHeight: 6,
                      ),
                    ),
                  ),
                ],
              ),
            );
          }),
        ],
      ),
    );
  }
}

// ── Chart Card ────────────────────────────────────────────────────────────────

class _ChartCard extends StatelessWidget {
  const _ChartCard({required this.title, required this.child});
  final String title;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Container(
      margin: const EdgeInsets.fromLTRB(16, 8, 16, 4),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCard : AppColors.lightCard,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: isDark ? AppColors.darkCardBorder : AppColors.lightBorder),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: GoogleFonts.outfit(fontSize: 15, fontWeight: FontWeight.w700),
          ),
          const SizedBox(height: 16),
          child,
        ],
      ),
    );
  }
}
