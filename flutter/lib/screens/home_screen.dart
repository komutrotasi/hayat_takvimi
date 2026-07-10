import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/app_state.dart';
import '../services/prayer_service.dart';
import '../widgets/prayer_card.dart';
import 'analytics_screen.dart';
import 'calendar_screen.dart';
import 'habits_screen.dart';
import 'settings_screen.dart';
import 'tasks_screen.dart';
import 'timer_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _tab = 0;

  static const _tabs = [
    NavigationDestination(
      icon: Icon(Icons.checklist_rounded),
      label: 'Görevler',
      selectedIcon: Icon(Icons.checklist_rounded),
    ),
    NavigationDestination(
      icon: Icon(Icons.loop_rounded),
      label: 'Alışkanlık',
      selectedIcon: Icon(Icons.loop_rounded),
    ),
    NavigationDestination(
      icon: Icon(Icons.timer_rounded),
      label: 'Timer',
      selectedIcon: Icon(Icons.timer_rounded),
    ),
    NavigationDestination(
      icon: Icon(Icons.calendar_month_rounded),
      label: 'Takvim',
      selectedIcon: Icon(Icons.calendar_month_rounded),
    ),
    NavigationDestination(
      icon: Icon(Icons.bar_chart_rounded),
      label: 'Analitik',
      selectedIcon: Icon(Icons.bar_chart_rounded),
    ),
  ];

  static const _screens = [
    TasksScreen(),
    HabitsScreen(),
    TimerScreen(),
    CalendarScreen(),
    AnalyticsScreen(),
  ];

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => _loadPrayers());
  }

  Future<void> _loadPrayers() async {
    final state = context.read<AppState>();
    try {
      final times = await PrayerService.fetchPrayerTimes(state.city);
      state.setPrayers(times);
    } catch (_) {
      // Sessizce hata
    }
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<AppState>(
      builder: (context, state, _) {
        return Scaffold(
          body: Column(
            children: [
              // Namaz vakitleri kartı (sabit üstte)
              SafeArea(
                bottom: false,
                child: PrayerCard(
                  prayers: state.prayers,
                  city: state.city,
                ),
              ),
              // Ekranlar
              Expanded(
                child: IndexedStack(
                  index: _tab,
                  children: _screens,
                ),
              ),
            ],
          ),
          bottomNavigationBar: NavigationBar(
            selectedIndex: _tab,
            onDestinationSelected: (i) => setState(() => _tab = i),
            destinations: _tabs,
            labelBehavior: NavigationDestinationLabelBehavior.onlyShowSelected,
            height: 65,
          ),
          // Ayarlar butonu (global FAB yerine AppBar'da — NotificationBar'dan ulaşılıyor)
        );
      },
    );
  }
}
