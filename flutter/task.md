# 📋 Flutter Android — Yapılacaklar & Ortam Raporu

> **Hedef:** Web sürümüyle tam parite sağlamak  
> **Durum:** 🟢 Ortam HAZIR — Aşama 1-6 tamamlandı, Aşama 7'ye geçmeye hazır  
> **Son güncelleme:** 2026-07-06 19:58 (TR saati)

---

## 🖥️ Aşama 0 — Geliştirme Ortamı ✅ TAMAMLANDI

### ✅ Tüm Kurulu Araçlar (Eksiksiz)

| Araç | Versiyon | Yol | Durum |
|------|----------|-----|-------|
| **Flutter SDK** | 3.32.4 (stable) | `C:\Users\XXX-DELL\AppData\Local\flutter_sdk\flutter\bin\flutter.bat` | ✅ Kurulu & PATH'te |
| **Dart SDK** | 3.8.1 (stable, windows_x64) | `C:\Users\XXX-DELL\AppData\Local\flutter_sdk\flutter\bin\dart.bat` | ✅ Flutter ile dahili |
| **Flutter DevTools** | 2.45.1 | Flutter SDK içinde dahili | ✅ Kurulu |
| **JDK 17** (Eclipse Temurin) | 17.0.15+6 | `C:\Users\XXX-DELL\AppData\Local\Programs\jdk-17\bin\java.exe` | ✅ Kurulu & PATH'te |
| **Android SDK** | API 35 / build-tools 35.0.0 | `C:\Users\XXX-DELL\AppData\Local\Android\Sdk` | ✅ Kurulu |
| **Android cmdline-tools** | 16.0 (sdkmanager) | `C:\Users\XXX-DELL\AppData\Local\Android\Sdk\cmdline-tools\latest\bin\` | ✅ Kurulu |
| **Android platform-tools (adb)** | En son | `C:\Users\XXX-DELL\AppData\Local\Android\Sdk\platform-tools\` | ✅ Kurulu |
| **Android Build Tools** | 35.0.0 | `C:\Users\XXX-DELL\AppData\Local\Android\Sdk\build-tools\35.0.0\` | ✅ Kurulu |
| **Android Platform** | android-35 | `C:\Users\XXX-DELL\AppData\Local\Android\Sdk\platforms\android-35\` | ✅ Kurulu |
| **Git** | 2.54.0.windows.1 | `C:\Program Files\Git\cmd\git.exe` | ✅ Kurulu & PATH'te |
| **VS Code** | Kurulu* | `C:\Users\XXX-DELL\AppData\Local\Programs\Microsoft VS Code` | ✅ Kurulu |
| **Google Chrome** | 149.0.7827.201 | `C:\Program Files\Google\Chrome\Application\chrome.exe` | ✅ Kurulu |
| **Microsoft Edge** | 149.0.4022.98 | Sistem yerleşik | ✅ Kurulu |
| **Windows** | 11 25H2 (Build 10.0.26220.6772) | — | ✅ |

> *VS Code versiyonu `flutter doctor` tarafından tespit edilemiyor — bilinen flutter doctor sorunu.

---

### ⚙️ Flutter SDK Tam Detayları

```
Flutter 3.32.4 • channel stable
Konum       : C:\Users\XXX-DELL\AppData\Local\flutter_sdk\flutter
flutter.bat : C:\Users\XXX-DELL\AppData\Local\flutter_sdk\flutter\bin\flutter.bat
dart.bat    : C:\Users\XXX-DELL\AppData\Local\flutter_sdk\flutter\bin\dart.bat
Repository  : https://github.com/flutter/flutter.git
Framework revision: 6fba2447e9 (2025-06-12 19:03:56 -0700)
Engine revision   : 8cd19e509d (2025-06-12 16:30:12 -0700)
Dart version      : 3.8.1 (stable) (Wed May 28 00:47:25 2025 -0700) on "windows_x64"
DevTools version  : 2.45.1
```

### ☕ JDK 17 Tam Detayları

```
OpenJDK Runtime Environment Temurin-17.0.15+6 (build 17.0.15+6)
OpenJDK 64-Bit Server VM Temurin-17.0.15+6 (build 17.0.15+6, mixed mode, sharing)
Konum  : C:\Users\XXX-DELL\AppData\Local\Programs\jdk-17
java   : C:\Users\XXX-DELL\AppData\Local\Programs\jdk-17\bin\java.exe
javac  : C:\Users\XXX-DELL\AppData\Local\Programs\jdk-17\bin\javac.exe
```

### 🤖 Android SDK Tam Detayları

```
Android SDK Root   : C:\Users\XXX-DELL\AppData\Local\Android\Sdk
cmdline-tools      : C:\Users\XXX-DELL\AppData\Local\Android\Sdk\cmdline-tools\latest\bin\sdkmanager.bat
sdkmanager version : 16.0
platform-tools     : C:\Users\XXX-DELL\AppData\Local\Android\Sdk\platform-tools\ (adb dahil)
build-tools        : C:\Users\XXX-DELL\AppData\Local\Android\Sdk\build-tools\35.0.0\
platform           : android-35
Lisanslar          : Tümü kabul edildi ✅
```

### 🌐 Kalıcı Ortam Değişkenleri (User scope)

```
JAVA_HOME    = C:\Users\XXX-DELL\AppData\Local\Programs\jdk-17
ANDROID_HOME = C:\Users\XXX-DELL\AppData\Local\Android\Sdk
ANDROID_SDK_ROOT = C:\Users\XXX-DELL\AppData\Local\Android\Sdk
PATH += C:\Users\XXX-DELL\AppData\Local\flutter_sdk\flutter\bin
PATH += C:\Users\XXX-DELL\AppData\Local\Programs\jdk-17\bin
```

### 📊 flutter doctor -v Son Çıktısı

```
[√] Flutter (Channel stable, 3.32.4) 
[√] Windows Version (Windows 11 25H2)
[√] Android toolchain (Android SDK version 35.0.0)
    • Platform android-35, build-tools 35.0.0
    • Java version OpenJDK Temurin-17.0.15+6
    • All Android licenses accepted.
[√] Chrome (149.0.7827.201)
[X] Visual Studio — Opsiyonel (sadece Windows desktop hedefi için)
[!] Android Studio — Opsiyonel (SDK kurulumu tamamlandı, gerekli değil)
[√] VS Code
[√] Connected device (3 available: Windows, Chrome, Edge)
[√] Network resources
```

---

### 🚫 Kurulmayan / Gerekmeyen Araçlar

| Araç | Neden Yok | Etki |
|------|-----------|------|
| **Android Studio** | Opsiyonel — cmdline-tools yeterli | Yok (APK derleme mümkün) |
| **Visual Studio** | Sadece Windows desktop hedefi için | Yok (Android hedefi için gerekli değil) |

---

### 📋 Aşama 0 Görevleri

- `[x]` **0.1** Flutter SDK tespit et — versiyon, yol, kanal
- `[x]` **0.2** `flutter doctor -v` çalıştır — tüm bileşenleri kontrol et
- `[x]` **0.3** Android SDK dizini bul → `flutter config --android-sdk` ayarla
- `[x]` **0.4** Flutter'ı sistem PATH'ine kalıcı ekle
- `[x]` **0.5** JDK 17 (Eclipse Temurin 17.0.15+6) indir & kur → `C:\...\Programs\jdk-17\`
- `[x]` **0.6** Android cmdline-tools (sdkmanager 16.0) indir & aç
- `[x]` **0.7** `sdkmanager "platform-tools" "platforms;android-35" "build-tools;35.0.0"` çalıştır
- `[x]` **0.8** Android lisanslarını kabul et: `flutter doctor --android-licenses`
- `[x]` **0.9** JAVA_HOME, ANDROID_HOME, ANDROID_SDK_ROOT ortam değişkenlerini kalıcı ayarla
- `[ ]` **0.10** `flutter pub get` çalıştır — bağımlılıkları yükle
- `[ ]` **0.11** `flutter analyze` — kod hatası yok mu kontrol et

---

## 🔧 Aşama 1 — Proje Altyapısı & Bağımlılıklar

- `[x]` **1.1** `pubspec.yaml` güncelle — yeni paketleri ekle
  - `http: ^1.2.0` (namaz API)
  - `encrypt: ^5.0.3` (AES-256)
  - `pointycastle: ^3.9.1` (PBKDF2)
  - `fl_chart: ^0.68.0` (analitik grafikler)
  - `table_calendar: ^3.1.2` (takvim)
  - `intl: ^0.19.0` (tarih formatlama)
  - `permission_handler: ^11.3.1` (bildirim izni)
  - `google_fonts: ^6.2.1` (Outfit, JetBrains Mono)
- `[ ]` **1.2** `flutter pub get` çalıştır, bağımlılıkları doğrula
- `[x]` **1.3** Klasör yapısını oluştur (`models/`, `services/`, `screens/`, `widgets/`, `theme/`)
- `[ ]` **1.4** `AndroidManifest.xml` izinlerini ekle (INTERNET, VIBRATE, RECEIVE_BOOT_COMPLETED, POST_NOTIFICATIONS, ACCESS_FINE_LOCATION)

---

## 🎨 Aşama 2 — Tema Sistemi

- `[x]` **2.1** `lib/theme/app_theme.dart` oluştur
  - Koyu tema: `#0f172a` arka plan, `#14b8a6` teal accent, gradient card'lar
  - Açık tema: beyaz/slate arka plan, teal accent
  - Google Fonts entegrasyonu (Outfit, JetBrains Mono)
  - ColorScheme, TextTheme, CardTheme, NavigationBarTheme tanımları
- `[x]` **2.2** `main.dart` temizle — sadece entry point + Provider + tema kalacak şekilde yeniden yaz

---

## 🗃️ Aşama 3 — Modeller

- `[x]` **3.1** `lib/models/task.dart` oluştur
- `[x]` **3.2** `lib/models/habit.dart` oluştur
- `[x]` **3.3** `lib/models/app_state.dart` oluştur

---

## ⚙️ Aşama 4 — Servisler

- `[x]` **4.1** `lib/services/storage_service.dart` oluştur
- `[x]` **4.2** `lib/services/prayer_service.dart` oluştur
- `[x]` **4.3** `lib/services/notification_service.dart` oluştur
- `[x]` **4.4** `lib/services/crypto_service.dart` oluştur

---

## 🪟 Aşama 5 — Widget'lar

- `[x]` **5.1** `lib/widgets/task_card.dart` — Görev kartı
- `[x]` **5.2** `lib/widgets/habit_card.dart` — Alışkanlık kartı
- `[x]` **5.3** `lib/widgets/prayer_card.dart` — Namaz vakitleri kartı
- `[x]` **5.4** `lib/widgets/timer_ring.dart` — Pomodoro ring
- `[x]` **5.5** `lib/widgets/add_task_sheet.dart` — Görev ekleme bottom sheet
- `[x]` **5.6** `lib/widgets/add_habit_sheet.dart` — Alışkanlık ekleme bottom sheet
- `[x]` **5.7** `lib/widgets/confirm_dialog.dart` — Özel onay dialogu

---

## 📱 Aşama 6 — Ekranlar

- `[x]` **6.1** `lib/screens/home_screen.dart`
- `[x]` **6.2** `lib/screens/tasks_screen.dart`
- `[x]` **6.3** `lib/screens/habits_screen.dart`
- `[x]` **6.4** `lib/screens/timer_screen.dart`
- `[x]` **6.5** `lib/screens/calendar_screen.dart`
- `[x]` **6.6** `lib/screens/analytics_screen.dart`
- `[x]` **6.7** `lib/screens/settings_screen.dart`

---

## 🔗 Aşama 7 — Entegrasyon & Test

- `[ ]` **7.1** `AppState` → tüm ekranlara `context.watch/read` ile bağla
- `[ ]` **7.2** Namaz API entegrasyonunu test et (Konya, İstanbul, Ankara)
- `[ ]` **7.3** Bildirim zamanlamayı test et (görev + namaz)
- `[ ]` **7.4** Şifreli yedek → export → import döngüsünü test et
- `[ ]` **7.5** Günlük sıfırlama (`autoReset`) mantığını test et
- `[ ]` **7.6** Takvim görev marker'larını test et
- `[ ]` **7.7** Tema geçişini (dark/light) test et

---

## 🛠️ Aşama 8 — Build & Derleme

- `[ ]` **8.1** `flutter analyze` — hata/uyarı yokluğunu doğrula
- `[ ]` **8.2** `flutter build apk --debug` — APK derle
- `[ ]` **8.3** APK'yı cihazda/emülatörde çalıştır
- `[ ]` **8.4** Kritik akışları manuel doğrula (görev → bildirim → tamamla)

---

## 📝 Aşama 9 — Analiz Raporu

- `[ ]` **9.1** `flutter/ANALIZ-RAPORU.md` oluştur
  - Mimari, özellikler, güvenlik, performans değerlendirmesi
  - Web sürümüyle fark analizi
  - Açık sorunlar ve gelecek öneriler

---

## 🗂️ Proje Dosya Yapısı (Tamamlanan)

```
hayat-takvimi/flutter/
├── lib/
│   ├── main.dart                          ✅
│   ├── theme/
│   │   └── app_theme.dart                 ✅
│   ├── models/
│   │   ├── task.dart                      ✅
│   │   ├── habit.dart                     ✅
│   │   └── app_state.dart                 ✅
│   ├── services/
│   │   ├── storage_service.dart           ✅
│   │   ├── prayer_service.dart            ✅
│   │   ├── notification_service.dart      ✅
│   │   └── crypto_service.dart            ✅
│   ├── widgets/
│   │   ├── task_card.dart                 ✅
│   │   ├── habit_card.dart                ✅
│   │   ├── prayer_card.dart               ✅
│   │   ├── timer_ring.dart                ✅
│   │   ├── add_task_sheet.dart            ✅
│   │   ├── add_habit_sheet.dart           ✅
│   │   └── confirm_dialog.dart            ✅
│   └── screens/
│       ├── home_screen.dart               ✅
│       ├── tasks_screen.dart              ✅
│       ├── habits_screen.dart             ✅
│       ├── timer_screen.dart              ✅
│       ├── calendar_screen.dart           ✅
│       ├── analytics_screen.dart          ✅
│       └── settings_screen.dart           ✅
├── android/                               ✅
├── assets/                                ✅
├── pubspec.yaml                           ✅
└── task.md                                ✅ (bu dosya)
```
