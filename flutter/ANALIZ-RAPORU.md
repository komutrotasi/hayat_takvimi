# 📱 Hayat Takvimi — Android (Flutter) Sürümü Detaylı Analiz Raporu

> **Sürüm:** v2.0.0+1  
> **Flutter SDK:** 3.32.4 (stable) / Dart 3.8.1  
> **Target:** Android API 35  
> **Tarih:** 2026-07-06  
> **Analiz:** Derinlemesine statik analiz — mimari, özellikler, hatalar, güvenlik

---

## 1. 📁 Proje Yapısı

```
flutter/
├── lib/
│   ├── main.dart                      (68 satır)     ✅ Entry point + Provider setup
│   ├── theme/
│   │   └── app_theme.dart             (310 satır)    ✅ Tam tema sistemi
│   ├── models/
│   │   ├── task.dart                  (~220 satır)   ✅ Task + SubTask modelleri
│   │   ├── habit.dart                 (~120 satır)   ✅ Habit modeli + streak
│   │   └── app_state.dart             (327 satır)    ✅ Global ChangeNotifier state
│   ├── services/
│   │   ├── storage_service.dart       (37 satır)     ✅ SharedPreferences CRUD
│   │   ├── prayer_service.dart        (132 satır)    ✅ aladhan.com API + cache
│   │   ├── notification_service.dart  (135 satır)    ✅ flutter_local_notifications
│   │   └── crypto_service.dart        (98 satır)     ✅ AES-256-GCM + PBKDF2
│   ├── widgets/
│   │   ├── task_card.dart             (~375 satır)   ✅ Görev kartı
│   │   ├── habit_card.dart            (~275 satır)   ✅ 7 günlük grid + streak
│   │   ├── prayer_card.dart           (~170 satır)   ✅ Namaz vakitleri
│   │   ├── timer_ring.dart            (~450 satır)   ✅ CustomPainter animasyonlu ring
│   │   ├── add_task_sheet.dart        (~655 satır)   ✅ Görev ekleme bottom sheet
│   │   ├── add_habit_sheet.dart       (~320 satır)   ✅ Alışkanlık ekleme
│   │   └── confirm_dialog.dart        (~155 satır)   ✅ Onay dialogu
│   └── screens/
│       ├── home_screen.dart           (113 satır)    ✅ BottomNav + Prayer header
│       ├── tasks_screen.dart          (229 satır)    ✅ Görev listesi + filtreler
│       ├── habits_screen.dart         (255 satır)    ✅ Alışkanlık ekranı
│       ├── timer_screen.dart          (44 satır)     ⚠️ Stub — sadece TimerRing wrap
│       ├── calendar_screen.dart       (~240 satır)   ✅ table_calendar entegrasyonu
│       ├── analytics_screen.dart      (507 satır)    ✅ fl_chart grafikleri
│       └── settings_screen.dart       (409 satır)    ✅ Ayarlar + yedekleme
├── android/                                           ✅ Native Android proje
├── assets/                                            ✅ Asset dizini
├── pubspec.yaml                       (49 satır)     ✅ Bağımlılıklar
├── pubspec.lock                       (20.391 bayt)  ✅ Kilit dosyası
├── task.md                            (261 satır)    ✅ Aşama takip dosyası
└── implementation_plan.md             (179 satır)    ✅ İmplementasyon planı
```

---

## 2. 🏗️ Mimari

| Katman | Detay |
|--------|-------|
| **Paradigma** | Flutter Widget Tree — StatelessWidget ağırlıklı |
| **State Management** | Provider (`ChangeNotifierProvider`) |
| **State Sınıfı** | `AppState extends ChangeNotifier` |
| **Storage** | `SharedPreferences` — tek anahtar `ht_android_v1` |
| **Şifreleme** | `encrypt` paketi (AES-256-GCM) + `pointycastle` (PBKDF2) |
| **API** | `http` paketi — aladhan.com namaz vakitleri |
| **Bildirimler** | `flutter_local_notifications` + `timezone` |
| **Tema** | Material 3 + Google Fonts (Outfit, JetBrains Mono) |
| **Navigasyon** | `NavigationBar` (5 sekme) + `IndexedStack` |

### Bağımlılıklar (pubspec.yaml)

| Paket | Sürüm | Amaç |
|-------|-------|------|
| `flutter_localizations` | SDK | Türkçe lokalizasyon |
| `provider` | ^6.0.0 | State management |
| `shared_preferences` | ^2.0.0 | Yerel depolama |
| `flutter_local_notifications` | ^17.0.0 | Bildirimler |
| `timezone` | ^0.9.0 | Zaman dilimi desteği |
| `geolocator` | ^13.0.0 | Konum (bildirilmiş ama kullanılmıyor) |
| `http` | ^1.2.0 | Namaz API |
| `encrypt` | ^5.0.3 | AES-256 şifreleme |
| `fl_chart` | ^0.68.0 | Analitik grafikler |
| `table_calendar` | ^3.1.2 | Takvim widget'ı |
| `intl` | ^0.20.2 | Tarih formatlama |
| `permission_handler` | ^11.3.1 | İzin yönetimi |
| `google_fonts` | ^6.2.1 | Outfit + JetBrains Mono |

> ⚠️ **`pointycastle`** pubspec.yaml'da **eksik** — ancak `crypto_service.dart` bunu kullanıyor!

---

## 3. 📊 Güncel Durum (Tamamlama Yüzdesi)

### Aşama Durumu

| Aşama | Ad | Durum |
|-------|----|-------|
| Aşama 0 | Geliştirme Ortamı | ✅ Tamamlandı (0.10 ve 0.11 hâlâ eksik) |
| Aşama 1 | Proje Altyapısı | ⚠️ Kısmen (1.2 ve 1.4 eksik) |
| Aşama 2 | Tema Sistemi | ✅ Tamamlandı |
| Aşama 3 | Modeller | ✅ Tamamlandı |
| Aşama 4 | Servisler | ✅ Tamamlandı |
| Aşama 5 | Widget'lar | ✅ Tamamlandı |
| Aşama 6 | Ekranlar | ✅ Tamamlandı (timer_screen stub) |
| Aşama 7 | Entegrasyon & Test | ❌ Başlanmadı |
| Aşama 8 | Build & Derleme | ❌ Başlanmadı |
| Aşama 9 | Analiz Raporu | ⬅️ Bu dosya |

**Genel Tamamlama: ~60%** (kod yazıldı ama entegrasyon ve build testi yapılmadı)

---

## 4. ✅ Tamamlanan Özellikler

### 4.1 Tema Sistemi (`app_theme.dart`)
- [x] Material 3 koyu tema (`#0f172a` arka plan, `#14b8a6` teal accent)
- [x] Material 3 açık tema (beyaz/slate)
- [x] Google Fonts: Outfit (UI) + JetBrains Mono (timer)
- [x] Tam TextTheme (displayLarge → labelSmall)
- [x] CardTheme, NavigationBarTheme, AppBarTheme
- [x] ChipTheme, InputDecorationTheme, ElevatedButtonTheme
- [x] BottomSheetTheme, DialogTheme, DividerTheme

### 4.2 State Yönetimi (`app_state.dart`)
- [x] Task CRUD (add, update, remove, toggle, clearCompleted)
- [x] Habit CRUD (add, update, remove, toggle)
- [x] Prayer times set/get
- [x] Timer state (tick, toggle, reset, setPreset)
- [x] Theme toggle
- [x] City set
- [x] Category times tracking
- [x] Analytics hesapları (pendingCount, doneCount, overdueCount, completionRate, categoryDist, last7DaysDone)
- [x] Factory reset
- [x] Daily auto-reset (tekrar eden görevler)
- [x] `firstWhereOrNull` extension

### 4.3 Görev Ekranı (`tasks_screen.dart`)
- [x] Görev listesi (CustomScrollView + SliverList)
- [x] Filtreler: Tümü / Bugün / Bekleyen / Tamamlanan
- [x] Kategori filtreleri (6 renk kodlu chip)
- [x] Öncelik bazlı sıralama (bekleyenler üstte)
- [x] RefreshIndicator (pull-to-refresh)
- [x] FAB ile görev ekleme
- [x] Tamamlananları temizle butonu

### 4.4 Alışkanlık Ekranı (`habits_screen.dart`)
- [x] Alışkanlık listesi + özet kart (ort. oran, en uzun seri, toplam)
- [x] Long-press → edit/delete options
- [x] Boş durum UI

### 4.5 Timer Ekranı (`timer_screen.dart`)
- [x] TimerRing widget entegrasyonu
- [x] Seans sayısı göstergesi
- ⚠️ **STUB** — Preset butonları, kategori seçici, Başlat/Durdur butonları timer_screen'de yok, TimerRing içinde

### 4.6 Analitik (`analytics_screen.dart`)
- [x] 3'lü özet stat kartı (tamamlanan/bekleyen/gecikmiş)
- [x] PieChart — tamamlama oranı
- [x] LineChart — 7 günlük trend
- [x] BarChart — kategori dağılımı
- [x] Habit Leaders — streak sıralaması
- [x] Focus Time — odak süresi listesi

### 4.7 Ayarlar Ekranı (`settings_screen.dart`)
- [x] Koyu/açık tema switch
- [x] Şehir değiştirme (namaz vakitleri için)
- [x] Şifreli yedek al
- [x] Yedekten geri yükle
- [x] Fabrika sıfırlama

### 4.8 Servisler
- [x] `StorageService` — SharedPreferences CRUD (`ht_android_v1`)
- [x] `PrayerService` — aladhan.com API + günlük cache
- [x] `NotificationService` — görev hatırlatıcı + namaz bildirimi
- [x] `CryptoService` — AES-256-GCM + PBKDF2 (web ile uyumlu format)

---

## 5. 🔴 Bilinen Hatalar ve Sorunlar

### BUG-F-01: `pointycastle` bağımlılığı pubspec.yaml'da eksik (**KRİTİK**)
- **Dosya:** `flutter/pubspec.yaml`
- **Sorun:** `crypto_service.dart` satır 6 — `import 'package:pointycastle/export.dart';` kullanıyor
- **Mevcut durum:** pubspec.yaml'da `pointycastle` yok — `flutter pub get` başarısız olur
- **Etki:** Uygulama derlenmez!
- **Çözüm:** `pubspec.yaml`'a ekle: `  pointycastle: ^3.9.1`

### BUG-F-02: `_SettingCard.isDark` referansı çözümsüz (**KRİTİK**)
- **Dosya:** `flutter/lib/screens/settings_screen.dart` L363-366
- **Sorun:** `_SettingCard` sınıfı `isDark` değişkenini kullanıyor ama sınıfın içinde tanımlı değil
- **Kod:**
  ```dart
  // settings_screen.dart:364
  color: isDark ? AppColors.darkCard : AppColors.lightCard,
  ```
  `isDark` → Bu satırda `BuildContext` yok, `Theme.of(context)` çağrısı yapılmıyor
- **Etki:** Compile-time hatası — derlenmez
- **Çözüm:** `build(BuildContext context)` içinde `final isDark = Theme.of(context).brightness == Brightness.dark;` tanımla

### BUG-F-03: `_importBackup()` geri yükleme sonrası state güncellenmez
- **Dosya:** `flutter/lib/screens/settings_screen.dart` L205-217
- **Sorun:** `CryptoService.importBackup()` çağrısı veriyi parse ediyor ama dönen `Map` `state`'e uygulanmıyor
- **Kod:**
  ```dart
  await CryptoService.importBackup(backup.trim(), password);
  // Verileri yükle
  await state.factoryReset();  // ← Eski veriyi siliyor, geri yüklemez!
  ```
- **Etki:** Yedekten geri yükleme çalışmıyor — veri siliniyor ama yükleme yapılmıyor
- **Çözüm:** `importBackup` dönüşünü state'e uygula

### BUG-F-04: `NotificationService` timezone başlatılmamış
- **Dosya:** `flutter/lib/services/notification_service.dart`
- **Sorun:** `tz.local` kullanılıyor ama `tz.initializeTimeZones()` çağrısı yok
- **Etki:** Bildirim zamanlaması runtime hatası verir
- **Çözüm:** `initialize()` içine ekle:
  ```dart
  import 'package:timezone/data/latest.dart' as tz;
  // ...
  tz.initializeTimeZones();
  tz.setLocalLocation(tz.getLocation('Europe/Istanbul'));
  ```

### BUG-F-05: `flutter pub get` çalıştırılmamış (Aşama 0.10 eksik)
- **task.md** L119 → `[ ]` **0.10** `flutter pub get` çalıştır
- **Etki:** Bağımlılıklar indirilmemiş, build yapılamaz

### BUG-F-06: `AndroidManifest.xml` izinleri eksik (Aşama 1.4 eksik)
- **task.md** L137 → `[ ]` **1.4** `AndroidManifest.xml` izinlerini ekle
- **Eksik izinler:** `INTERNET`, `VIBRATE`, `RECEIVE_BOOT_COMPLETED`, `POST_NOTIFICATIONS`, `ACCESS_FINE_LOCATION`
- **Etki:** Bildirimler, namaz API, konum tespiti çalışmaz

### BUG-F-07: `geolocator` paketi bildirilmiş ama kullanılmıyor
- **Dosya:** `pubspec.yaml` L24
- **Sorun:** Hiçbir Dart dosyasında `geolocator` import edilmiyor
- **Etki:** Gereksiz bağımlılık — apk boyutunu artırır
- **Çözüm:** Kullanılacaksa `settings_screen.dart`'a GPS entegrasyonu ekle; kullanılmayacaksa `pubspec.yaml`'dan kaldır

### BUG-F-08: `timer_screen.dart` — preset butonları eksik (**İşlevsellik Eksik**)
- **Dosya:** `flutter/lib/screens/timer_screen.dart` (44 satır)
- **Sorun:** Timer ekranı sadece `TimerRing` widget'ı gösteriyor — preset butonları (25/45/60/5dk), kategori seçici, Başlat/Durdur butonları yok
- **Etki:** Kullanıcı timer'ı etkileşimli kullanamaz
- **Çözüm:** `TimerRing` içinden preset/kontrol butonlarını `timer_screen`'e taşı veya ekle

### BUG-F-09: `settings_screen.dart` Ayarlar navigasyonu eksik
- **Dosya:** `flutter/lib/screens/home_screen.dart`
- **Sorun:** `HomeScreen` 5 tab tanımlıyor (Görevler, Alışkanlık, Timer, Takvim, Analitik) ama Ayarlar ekranı tab'larda yok
- **Etki:** Ayarlar ekranına erişim yolu belirsiz — `home_screen.dart`'taki yorum satırı "Ayarlar butonu → NotificationBar'dan ulaşılıyor" diyor ama uygulama yok
- **Çözüm:** 6. tab ekle veya AppBar'a `IconButton` ekle

### BUG-F-10: `withOpacity()` deprecated warning
- **Dosya:** Birden fazla dosya (analytics_screen.dart, tasks_screen.dart, habits_screen.dart)
- **Sorun:** `.withOpacity()` Flutter 3.x'te deprecated, `.withValues(alpha:)` kullanılmalı
- **Örnekler:**
  - `analytics_screen.dart` L253: `AppColors.teal.withOpacity(0.1)`
  - `settings_screen.dart` L397: `color.withOpacity(0.15)`
- **Çözüm:** Tüm `.withOpacity()` çağrılarını `.withValues(alpha:)` ile değiştir

### BUG-F-11: `last7DaysDone()` — `completedAt` yerine `dueDate` kullanıyor
- **Dosya:** `flutter/lib/models/app_state.dart` L285-300
- **Sorun:** Analitik ekranındaki "7 Günlük Tamamlama" grafiği `t.dueDate` ile eşleşiyor — görevin ne zaman tamamlandığını değil, ne zaman yapılacağını gösteriyor
- **Etki:** Gerçek tamamlama trendi yanlış hesaplanıyor
- **Çözüm:** `Task` modeline `completedAt` ekle ve `last7DaysDone()` içinde bunu kullan

### BUG-F-12: Backup format uyumsuzluğu (web vs Android)
- **Web:** `HT6:<base64(salt[32]+iv[12]+ct)>` — PBKDF2 310.000 iterasyon
- **Android:** `base64(salt[32]+iv[12]+ct)` — PBKDF2 100.000 iterasyon
- **Etki:** Web'den alınan yedek Android'e yüklenemez ve tam tersi
- **Çözüm:** Iteration count'u 310.000'e çıkar veya format prefix ekle

---

## 6. 🔐 Güvenlik Analizi

### GÜVENLİK PUANI: 7.5 / 10

#### ✅ Güçlü Yönler

| Kontrol | Durum | Detay |
|---------|-------|-------|
| **Şifreleme Algoritması** | ✅ Güvenli | AES-256-GCM |
| **Key Derivation** | ✅ Var | PBKDF2-SHA256 (100.000 iterasyon) |
| **Salt Randomness** | ✅ Güvenli | `Random.secure()` — kriptografik rastgelelik |
| **IV Boyutu** | ✅ Doğru | 12 bayt (96-bit GCM standardı) |
| **Koyu Tema** | ✅ Güvenli | `obscureText: true` şifre alanlarında |
| **Confirm Dialog** | ✅ Var | Silme/sıfırlama işlemleri onay gerektiriyor |
| **SharedPreferences** | ⚠️ Şifresiz | Android'de plaintext — yeterli cihaz güvenliği gerekli |

#### ⚠️ Riskler

| Kontrol | Sorun | Risk Seviyesi |
|---------|-------|---------------|
| **PBKDF2 iterasyon sayısı** | 100.000 — Web'deki 310.000'den düşük | Orta |
| **Backup format prefix yok** | Web HT6: prefix kulllanıyor, Android kullanmıyor | Orta |
| **Yetersiz şifre doğrulama** | `password.isEmpty` kontrolü var ama minimum uzunluk yok | Düşük |
| **Backup plaintext ekranda** | `SelectableText(backup)` ile Base64 yedek kod ekranda gösteriliyor | Düşük |
| **Şifresiz JSON depolama** | SharedPreferences plaintext JSON — rooted cihazda okunabilir | Düşük |
| **Bildirim servisi init** | timezone başlatılmadan tz.local kullanımı | Yüksek (crash) |
| **input validation eksik** | Şehir adı için safeText/sanitization yok | Düşük |

#### ❌ Kritik Güvenlik Açığı
**Yok** — Temel kriptografi doğru uygulanmış. Kritik XSS, injection veya veri sızıntısı tespit edilmedi.

---

## 7. ⚡ Performans Analizi

| Metrik | Değer | Yorum |
|--------|-------|-------|
| **State management** | Provider | Basit, performanslı |
| **Widget optimizasyonu** | `Consumer<AppState>` | Gerekli yerlerde kullanılmış |
| **Render** | `IndexedStack` | Sekme değişiminde rebuild yok ✅ |
| **Animasyon** | `CustomPainter` (TimerRing) | Native performans ✅ |
| **API çağrısı** | Başlangıçta bir kez + şehir değişiminde | Günlük cache var ✅ |
| **Storage** | `await prefs.setString()` her save'de | Asenkron — bloklamıyor ✅ |
| **Büyük liste** | `SliverList` | Lazy render ✅ |
| **Gereksiz rebuild** | `Consumer` + `context.watch` karışımı | Optimum değil — review edilebilir |

---

## 8. 🔄 Sıradaki Yapılacaklar (Öncelikli)

### Kritik (Derleme için Zorunlu)

- [ ] **F-TODO-01 [KRİTİK]:** `pubspec.yaml`'a `pointycastle: ^3.9.1` ekle
- [ ] **F-TODO-02 [KRİTİK]:** `_SettingCard.build()` içine `isDark` tanımı ekle
- [ ] **F-TODO-03 [KRİTİK]:** `NotificationService.initialize()` içine `tz.initializeTimeZones()` + `tz.setLocalLocation()` ekle
- [ ] **F-TODO-04 [KRİTİK]:** `flutter pub get` çalıştır (Aşama 0.10)
- [ ] **F-TODO-05 [KRİTİK]:** `AndroidManifest.xml` izinlerini ekle (Aşama 1.4)

### Yüksek Öncelik (İşlevsellik)

- [ ] **F-TODO-06:** `_importBackup()` mantığını düzelt — parse edilen veriyi state'e uygula
- [ ] **F-TODO-07:** `timer_screen.dart`'a preset butonları, kategori seçici ve kontrol butonlarını ekle
- [ ] **F-TODO-08:** Ayarlar ekranına erişim yolu ekle (6. tab veya AppBar IconButton)
- [ ] **F-TODO-09:** Backup format prefix ekle (`HT_ANDROID_V1:`) — cross-platform uyumsuzluğu belirt
- [ ] **F-TODO-10:** PBKDF2 iterasyon sayısını 310.000'e çıkar (web ile pariteye getir)

### Orta Öncelik

- [ ] **F-TODO-11:** Tüm `.withOpacity()` → `.withValues(alpha:)` (Flutter 3.x deprecation)
- [ ] **F-TODO-12:** `last7DaysDone()` içinde `completedAt` kullan
- [ ] **F-TODO-13:** `geolocator` paketini kullan veya kaldır
- [ ] **F-TODO-14:** `flutter analyze` çalıştır — uyarıları düzelt (Aşama 8.1)

### Test Aşaması (Aşama 7)

- [ ] **F-TODO-15:** `AppState` → tüm ekranlara `context.watch/read` bağlantısını doğrula
- [ ] **F-TODO-16:** Namaz API entegrasyonunu test et (Konya, İstanbul, Ankara)
- [ ] **F-TODO-17:** Bildirim zamanlamayı test et (görev + namaz)
- [ ] **F-TODO-18:** Şifreli yedek → export → import döngüsünü test et
- [ ] **F-TODO-19:** Günlük sıfırlama (`autoReset`) mantığını test et
- [ ] **F-TODO-20:** Tema geçişini (dark/light) test et

### Build Aşaması (Aşama 8)

- [ ] **F-TODO-21:** `flutter analyze` — hata/uyarı yokluğunu doğrula
- [ ] **F-TODO-22:** `flutter build apk --debug` — APK derle
- [ ] **F-TODO-23:** APK'yı cihazda/emülatörde çalıştır

---

## 9. 🆚 Web Sürümüyle Karşılaştırma

| Özellik | Android (Flutter v2.0) | Web (v7.0) |
|---------|------------------------|------------|
| Görev CRUD | ✅ Tam | ✅ Tam |
| Kategori sistemi | ⚠️ Sabit 6 kategori | ✅ Özel kategoriler |
| Hızlı görev ekleme | ❌ Yok | ✅ Var (#tag) |
| Arama | ❌ Yok | ✅ Var |
| Sıralama | ❌ Yok | ✅ 4 seçenek |
| Tekrar türleri | ✅ Tam | ✅ Tam |
| Namaz takibi | ✅ 6 vakit | ✅ 5 vakit |
| GPS konum | ⚠️ Paket var, kullanılmıyor | ✅ Var |
| Günlük ibadet takibi | ❌ Yok | ✅ Var |
| Haftalık ibadet grafiği | ❌ Yok | ✅ Var |
| Zikir takibi | ❌ Yok | ✅ 20 günlük zikir |
| Günün Ayeti/Hadisi | ❌ Yok | ✅ Var |
| Alışkanlık takibi | ✅ 7 günlük grid | ✅ Var |
| Pomodoro | ⚠️ Temel (stub timer) | ✅ Tam |
| Kategori süre takibi | ✅ Var | ✅ Var |
| Analitik (grafik) | ✅ fl_chart (5 grafik) | ✅ Canvas SVG (5 grafik) |
| Takvim görünümü | ✅ table_calendar | ✅ Özel render |
| Şifreli yedekleme | ✅ AES-256-GCM | ✅ AES-256-GCM |
| JSON export | ❌ Yok | ✅ Var |
| CSV export | ❌ Yok | ✅ Var |
| Bildirimler | ✅ System notifications | ✅ Browser notifications |
| Tema | ✅ Dark/Light Material 3 | ✅ Dark/Light CSS |
| Cross-backup uyumu | ❌ Format farklı | ✅ HT6 formatı |
| Test edilmiş | ❌ Hiç çalıştırılmadı | ✅ Production'da |

**Android Parite Skoru: ~55%** (kod mevcut, entegrasyon & test eksik)

---

## 10. 📊 Özet Değerlendirme

| Kriter | Puan | Yorum |
|--------|------|-------|
| **Kod Mimarisi** | 8/10 | Provider + modüler yapı iyi |
| **Özellik Kapsamı** | 6/10 | Temel özellikler var, web paritesi yok |
| **Güvenlik** | 7/10 | AES-256 iyi ama iterasyon düşük |
| **Hata Sayısı** | 4/10 | 4 compile-time hata var — derlenmez |
| **Test Kapsamı** | 1/10 | Hiç test yok, build da yapılmamış |
| **Performans Potansiyeli** | 8/10 | Flutter native — potansiyel yüksek |
| **Tema & UI** | 9/10 | Material 3, Google Fonts — premium görünüm |
| **Dokümantasyon** | 7/10 | task.md + implementation_plan.md var |

> **Genel Puan: 6.25 / 10**  
> Android sürümü mimari açıdan iyi tasarlanmış ancak birkaç kritik compile hatası nedeniyle şu an çalışmıyor.  
> **Önce BUG-F-01, BUG-F-02, BUG-F-03, BUG-F-04 düzeltilmeli** — ardından `flutter pub get` + `flutter analyze` + build.

---

## 11. 🛠️ Hızlı Düzeltme Sırası

```
1. pubspec.yaml → pointycastle: ^3.9.1 ekle
2. flutter pub get çalıştır
3. settings_screen.dart → _SettingCard.build() içine isDark tanımı ekle
4. notification_service.dart → tz.initializeTimeZones() ekle
5. android/app/src/main/AndroidManifest.xml → izinleri ekle
6. flutter analyze → çıkan uyarıları düzelt
7. settings_screen.dart → _importBackup() mantığını düzelt
8. timer_screen.dart → preset + kontrol butonları ekle
9. home_screen.dart → Ayarlar erişim yolu ekle
10. flutter build apk --debug → build test
```

---

*Rapor oluşturulma tarihi: 2026-07-06 20:10 TR*
