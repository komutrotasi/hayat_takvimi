# Flutter/Android — Web ile Tam Parite Planı

Web sürümündeki (`web/app.js`, `web/index.html`, `web/styles.css`) tüm özellikleri Flutter Android uygulamasına taşıyoruz.
Mevcut `flutter/lib/main.dart` (~738 satır, temel yapı) tamamen yeniden yazılacak; modüler `lib/` klasör yapısıyla.

---

## Kapsam Özeti

Web sürümünün tüm özellikleri:
- ✅ Görev yönetimi (CRUD, tekrar, alt görev, öncelik, kategori, hatırlatıcı)
- ✅ Namaz vakitleri (aladhan.com API, şehir/konum bazlı)
- ✅ Alışkanlık takibi (7 günlük streak, tamamlama yüzdesi)
- ✅ Pomodoro / Odak sayacı (25/5/15 dakika preset)
- ✅ Analitik & istatistikler (tamamlama oranı, streak, kategori dağılımı)
- ✅ Takvim görünümü (aylık, görev dotları)
- ✅ Şifreli yedekleme (AES-256-GCM + PBKDF2)
- ✅ Koyu/açık tema
- ✅ Bildirimler (namaz vakti + görev hatırlatıcı)
- ✅ Günlük sıfırlama (tekrar eden görevler)

---

## Mimari

```
flutter/lib/
  main.dart               ← Entry point, tema, router
  models/
    task.dart             ← Task, SubTask modelleri
    habit.dart            ← Habit modeli
    app_state.dart        ← Global state (ChangeNotifier)
  services/
    storage_service.dart  ← SharedPreferences CRUD
    prayer_service.dart   ← aladhan.com API + cache
    notification_service.dart ← flutter_local_notifications
    crypto_service.dart   ← AES-256 yedek/geri yükle
  screens/
    home_screen.dart      ← BottomNav ana ekranı
    tasks_screen.dart     ← Görevler sayfası
    habits_screen.dart    ← Alışkanlıklar sayfası
    timer_screen.dart     ← Pomodoro sayacı
    analytics_screen.dart ← İstatistikler
    calendar_screen.dart  ← Aylık takvim
    settings_screen.dart  ← Ayarlar, yedek/geri yükleme
  widgets/
    task_card.dart        ← Görev kartı widget
    habit_card.dart       ← Alışkanlık kartı widget
    prayer_card.dart      ← Namaz vakitleri kartı
    add_task_sheet.dart   ← Görev ekleme bottom sheet
    add_habit_sheet.dart  ← Alışkanlık ekleme bottom sheet
    timer_ring.dart       ← Animasyonlu timer ring (CustomPainter)
    confirm_dialog.dart   ← Özel onay dialogu
  theme/
    app_theme.dart        ← Koyu/açık tema tanımları
```

---

## Proposed Changes

### Dependencies — pubspec.yaml

#### [MODIFY] [pubspec.yaml](file:///c:/Users/XXX-DELL/Desktop/Repositories%20(Depolar)/hayat-takvimi/flutter/pubspec.yaml)
- `http: ^1.2.0` ekle (namaz API)
- `encrypt: ^5.0.3` ekle (AES-256)
- `pointycastle: ^3.9.1` ekle (PBKDF2)
- `fl_chart: ^0.68.0` ekle (analitik grafikler)
- `table_calendar: ^3.1.2` ekle (takvim widget'ı)
- `intl: ^0.19.0` ekle (tarih formatlama)
- `permission_handler: ^11.3.1` ekle (bildirim izni)

---

### Core Models

#### [NEW] [task.dart](file:///c:/Users/XXX-DELL/Desktop/Repositories%20(Depolar)/hayat-takvimi/flutter/lib/models/task.dart)
- `Task` sınıfı: id, title, done, category, dueDate, dueTime, priority, notes, repeat (none/daily/weekly/monthly), repDays, subTasks, created
- `SubTask` sınıfı: id, title, done
- JSON serialization

#### [NEW] [habit.dart](file:///c:/Users/XXX-DELL/Desktop/Repositories%20(Depolar)/hayat-takvimi/flutter/lib/models/habit.dart)
- `Habit` sınıfı: id, name, icon, color, done (Map<String, bool> tarih bazlı)
- streak(), habitRate(), longestStreak() metodları

#### [NEW] [app_state.dart](file:///c:/Users/XXX-DELL/Desktop/Repositories%20(Depolar)/hayat-takvimi/flutter/lib/models/app_state.dart)
- Global `ChangeNotifier` — tasks, habits, prayers, timerState, theme, city, catTimes
- `save()`, `load()`, günlük sıfırlama mantığı

---

### Services

#### [NEW] [storage_service.dart](file:///c:/Users/XXX-DELL/Desktop/Repositories%20(Depolar)/hayat-takvimi/flutter/lib/services/storage_service.dart)
- SharedPreferences tabanlı kalıcı depolama
- Anahtar: `ht_android_v1`

#### [NEW] [prayer_service.dart](file:///c:/Users/XXX-DELL/Desktop/Repositories%20(Depolar)/hayat-takvimi/flutter/lib/services/prayer_service.dart)
- `fetchPrayerTimes(city)` → aladhan.com API
- Günlük cache (SharedPreferences)
- Fallback sabit vakitler

#### [NEW] [notification_service.dart](file:///c:/Users/XXX-DELL/Desktop/Repositories%20(Depolar)/hayat-takvimi/flutter/lib/services/notification_service.dart)
- Görev hatırlatıcı zamanlama
- Namaz vakti bildirimi

#### [NEW] [crypto_service.dart](file:///c:/Users/XXX-DELL/Desktop/Repositories%20(Depolar)/hayat-takvimi/flutter/lib/services/crypto_service.dart)
- AES-256-GCM şifreleme/çözme
- PBKDF2-SHA256 key türetme (100.000 iterasyon)
- Yedek dosya export/import

---

### Theme

#### [NEW] [app_theme.dart](file:///c:/Users/XXX-DELL/Desktop/Repositories%20(Depolar)/hayat-takvimi/flutter/lib/theme/app_theme.dart)
- Koyu tema: `#0f172a` arka plan, `#14b8a6` (teal) accent
- Açık tema: beyaz/gri arka plan, teal accent
- Google Fonts: Outfit (UI), JetBrains Mono (timer)

---

### Screens (6 sayfa)

#### [MODIFY] [main.dart](file:///c:/Users/XXX-DELL/Desktop/Repositories%20(Depolar)/hayat-takvimi/flutter/lib/main.dart)
Tamamen yeniden yazılır — sadece entry point, tema ve provider setup kalır.

#### [NEW] home_screen.dart — BottomNavigationBar (6 sekme)
#### [NEW] tasks_screen.dart — Görev listesi, filtreleme, hızlı ekleme
#### [NEW] habits_screen.dart — Alışkanlık kartları, streak göstergesi
#### [NEW] timer_screen.dart — Pomodoro ring, preset'ler, seanslar
#### [NEW] analytics_screen.dart — Grafikler (fl_chart), istatistikler
#### [NEW] calendar_screen.dart — Aylık takvim (table_calendar)
#### [NEW] settings_screen.dart — Şehir, tema, yedek/geri yükle

---

### Widgets

#### [NEW] task_card.dart — Renkli kategorili görev kartı, swipe-to-delete
#### [NEW] habit_card.dart — 7 günlük check grid + streak chip
#### [NEW] prayer_card.dart — Namaz vakitleri listesi + sonraki vakit countdown
#### [NEW] add_task_sheet.dart — Bottom sheet (tüm alanlar)
#### [NEW] add_habit_sheet.dart — Alışkanlık ekleme/düzenleme
#### [NEW] timer_ring.dart — CustomPainter animasyonlu ring
#### [NEW] confirm_dialog.dart — Özel onay dialogu

---

## Verification Plan

### Build Check
```
flutter pub get
flutter analyze
flutter build apk --debug
```

### Manual Verification
- Görev ekleme/düzenleme/silme
- Namaz vakitleri API çağrısı (Konya için)
- Alışkanlık tamamlama + streak hesabı
- Pomodoro başlatma/durdurma
- Şifreli yedek export → import
- Koyu/açık tema geçişi

---

## Open Questions

> [!IMPORTANT]
> **Teknik soru:** `encrypt` paketi ile AES-256-GCM'i tam olarak desteklemek için `pointycastle` gerekiyor.
> Web sürümüyle birebir uyumlu şifreli yedek mı istiyorsunuz (aynı format), yoksa sadece Android için yeterli şifreleme mi?

> [!NOTE]
> Mevcut `flutter/lib/main.dart` tamamen silinip yeni modüler yapıyla değiştirilecek.
> Mevcut `SharedPreferences` anahtarı (`ht_flutter_tasks`) yerine `ht_android_v1` kullanılacak — yani mevcut veriler kaybolacak.
> Bu kabul edilebilir mi?
