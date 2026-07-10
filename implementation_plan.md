# 🗓️ Hayat Takvimi — Kapsamlı Analiz & Yol Haritası

## 📊 Proje Genel Durumu

| Bileşen | Durum | Tamamlanma |
|---------|-------|-----------|
| **Web Sürümü** | 🟡 Fonksiyonel, hatalar var | ~85% |
| **Flutter (Android)** | 🔴 Kod yazıldı, derlenmedi | ~60% |
| **Backend API (PHP)** | 🔴 Yok | 0% |
| **Bulut Senkronizasyon** | 🔴 Yok | 0% |

---

## 🚨 ÖNCE BUNLAR — Hatalar ve Güvenlik Açıkları

### 🔴 Web — Kritik Güvenlik Açıkları

#### GA-01: `unsafe-inline` script izni (CSP zayıflığı)
- **Dosya**: `index.html` satır 29
- **Sorun**: `script-src 'self' 'unsafe-inline'` XSS saldırılarına kapı açar.
- **Çözüm**: `unsafe-inline` kaldır, nonce-based CSP uygula.

#### GA-02: Namaz API CORS hatası — API URL hardcoded, değiştirilemez
- **Dosya**: `app.js` satır 602
- **Sorun**: API URL her zaman `api.aladhan.com` — kullanıcı aynı ağ üzerindeyse kısıtlanabilir.
- **Çözüm**: API URL'yi ayarlar üzerinden yapılandırılabilir yap.

#### GA-03: AES şifreleme parametresi zayıflığı
- **Dosya**: `app.js` satır 327
- **Sorun**: PBKDF2 iterasyon sayısı 310,000 — 2024 standartları için düşük; minimum 600,000 önerilir.
- **Çözüm**: İterasyon sayısını 600,000'e çık; eski dosyalar için geriye dönük uyumluluk koru.

#### GA-04: Şifreli yedekte sürüm başlığı kontrolü yetersiz
- **Dosya**: `app.js` satır 351
- **Sorun**: `HT4:` formatında çözme de kabul ediliyor — eski ve zayıf PBKDF2 iterasyonlarıyla şifrelenmiş dosyalar çözülebilir.
- **Çözüm**: `HT6:` harici versiyonlar için uyarı göster veya reddet.

---

### 🟡 Web — Fonksiyonel Hatalar

#### FB-01: Takvim gün kartları renklendirilmemiş
- **Dosya**: `app.js` → `renderCalendar()` satır 1452-1471
- **Sorun**: Gün kartları düz görünüyor; görev yoğunluğuna göre renklendirme yok.
- **Çözüm**: Görev sayısına göre arka plan rengi degrade (0 görev=gri, 1-2=sarı, 3+=yeşil).

#### FB-02: Namaz Vakitleri bağımsız menü değil
- **Sorun**: Namaz vakitleri takvim view içine gömülü. Ayrı header menüsü yok.
- **Çözüm**: Header'a `🕌 Namaz` butonu ekle → ayrı view oluştur.

#### FB-03: Aylık takvim küçük
- **Sorun**: Takvim `.cal-main` alanı yarım genişlikte, namaz paneli yanında sıkışmış.
- **Çözüm**: Namaz paneli header menüsüne taşınınca takvim tam genişliğe çıkar.

#### FB-04: Sayfa ilk açılışında `renderNamaz()` çağrısı gecikiyor
- **Dosya**: `app.js` satır 1803-1818
- **Sorun**: Cache yoksa API'den veri çekme sırasında "Yükleniyor…" kalıyor.
- **Çözüm**: Önce `PRAYERS` sabit verileriyle render et, API gelince güncelle.

#### FB-05: Timer `pausedRemain` sıfırlanmıyor (preset değişince)
- **Dosya**: `app.js` satır 897-900
- **Sorun**: `setPreset()` çağrıldığında `T.pausedRemain = null` set edilmiyor.
- **Çözüm**: `setPreset()` içinde `T.pausedRemain = null` ekle.

#### FB-06: `subInp` listener DOMContentLoaded beklemeden bağlanıyor
- **Dosya**: `app.js` satır 835
- **Sorun**: Script `defer` olduğundan sorun çıkmıyor ama güvensiz — DOM hazır olmadan çalışabilir.
- **Çözüm**: Event listener'ları `DOMContentLoaded` bloğuna al veya en azından `init()` fonksiyonuna taşı.

#### FB-07: `dailyQuote` her sayfa yüklenişinde random değişiyor
- **Dosya**: `app.js` satır 1820-1828
- **Sorun**: `Math.random()` kullanılıyor — aynı gün içinde sayfa yenilenirse farklı söz çıkıyor.
- **Çözüm**: Günün indeksini baz al: `DAILY_QUOTES[dayOfYear() % DAILY_QUOTES.length]`.

#### FB-08: Üst bar dropdown menüleri mobilde tıklanamıyor (yavaş)
- **Dosya**: `styles.css` — `.dropdown-content` hover
- **Sorun**: Hover ile açılan dropdown mobil dokunuşta anında kapanıyor.
- **Çözüm**: Click bazlı toggle ekle, hover sadece desktop'ta kalsın.

---

### 🔴 Flutter — Kritik Eksikler

#### FA-01: `flutter pub get` hiç çalıştırılmamış
- **Dosya**: `flutter/pubspec.yaml`
- **Sorun**: Bağımlılıklar indirilmedi, `pubspec.lock` eksik bağımlılık içeriyor.
- **Çözüm**: `flutter pub get` → `flutter analyze` çalıştır.

#### FA-02: `AppState` ekranlara bağlanmamış
- **Dosya**: Tüm `screens/*.dart` dosyaları
- **Sorun**: Ekranlar `context.watch<AppState>()` kullanmıyor — veri değişince yenilenmiyorlar.
- **Çözüm**: Her ekrana `Consumer<AppState>` veya `context.watch` ekle.

#### FA-03: Timer `timerTick()` çağrısı yok
- **Dosya**: `lib/models/app_state.dart` satır 239
- **Sorun**: `timerTick()` fonksiyonu var ama `TimerScreen`'de `Timer.periodic()` yok.
- **Çözüm**: `TimerScreen`'de `Timer.periodic(Duration(seconds: 1), ...)` ile tick çağrısı ekle.

#### FA-04: Kategori sistemi web ile uyumsuz
- **Sorun**: Web'de dinamik kategoriler varken Flutter'da kategori sistemi hiç yok.
- **Çözüm**: `Category` modeli ve CRUD ekle.

#### FA-05: Namaz kılındı takibi yok
- **Sorun**: `AppState`'de namaz takip (prayers: {date: {namaz: bool}}) yapısı eksik.
- **Çözüm**: `prayerLog` haritası ekle, `PrayerCard`'a toggle işlevi bağla.

#### FA-06: `AndroidManifest.xml` izinleri eksik
- **Dosya**: `flutter/android/app/src/main/AndroidManifest.xml`
- **Sorun**: INTERNET, VIBRATE, POST_NOTIFICATIONS, ACCESS_FINE_LOCATION izinleri yok.
- **Çözüm**: İzinleri ekle.

#### FA-07: Şifreli yedekleme sistemi bağlanmamış
- **Dosya**: `lib/services/crypto_service.dart` (var ama kullanılmıyor)
- **Sorun**: `CryptoService` var ama `SettingsScreen`'e bağlanmamış.
- **Çözüm**: Export/import UI ve mantığını settings ekranına bağla.

---

## 📋 Adım Adım Yol Haritası

---

### 🔧 FAZ 0 — Web Hataları & Güvenlik (Önce bunlar!)

- `[ ]` **0.1** GA-01: CSP `unsafe-inline` kaldır (nonce ekle veya external script'e geçir)
- `[ ]` **0.2** GA-03: PBKDF2 iterasyon sayısı 600,000 yap
- `[ ]` **0.3** GA-04: HT4/HT5 formatı için uyarı göster, yükseltmeye yönlendir
- `[ ]` **0.4** FB-05: `setPreset()` içinde `T.pausedRemain = null` ekle
- `[ ]` **0.5** FB-07: `initDailyQuote()` içinde `dayOfYear()` bazlı index kullan
- `[ ]` **0.6** FB-08: Dropdown'ları click-toggle'a çevir (mobile uyumluluk)
- `[ ]` **0.7** Tüm düzeltmeleri test et, cache version `v15` yap

---

### 🎨 FAZ 1 — Web Yeni Özellikler

- `[ ]` **1.1** Namaz Vakitleri → ayrı header menüsü (`🕌 Namaz`) + view
- `[ ]` **1.2** Aylık takvim tam genişliğe al
- `[ ]` **1.3** Takvim gün kartlarını renklendirme (görev yoğunluğuna göre)
- `[ ]` **1.4** Web sürümü `takvim.komutrotasi.com` subdomainine hazırla (CNAME)

---

### 🗄️ FAZ 2 — Backend (PHP + MySQL)

- `[ ]` **2.1** cPanel → MySQL → `hayat_takvimi` veritabanı oluştur
- `[ ]` **2.2** SQL dosyasını yükle (6 tablo: users, tasks, habits, categories, timer_sessions, sync_log)
- `[ ]` **2.3** `api.komutrotasi.com` subdomain oluştur
- `[ ]` **2.4** PHP dosyaları yaz: `auth.php`, `tasks.php`, `habits.php`, `categories.php`, `sync.php`
- `[ ]` **2.5** JWT authentication (HS256, 24 saat geçerli)
- `[ ]` **2.6** Rate limiting (60 istek/dk / IP)
- `[ ]` **2.7** CORS sadece `takvim.komutrotasi.com` + APK origin'e aç
- `[ ]` **2.8** API'yi test et (Postman/curl)

---

### 🌐 FAZ 3 — Web Bulut Entegrasyonu

- `[ ]` **3.1** Web'e Login/Register modalı ekle
- `[ ]` **3.2** Hibrit mod: Giriş yapmadan localStorage çalışır, login sonrası senkronize
- `[ ]` **3.3** `sync.js` servisi yaz: offline kuyruk + push/pull
- `[ ]` **3.4** CSP'ye `api.komutrotasi.com` `connect-src`'e ekle
- `[ ]` **3.5** Otomatik 5 dakikada bir senkronizasyon

---

### 📱 FAZ 4 — Flutter Hata Düzeltmeleri

- `[ ]` **4.1** FA-06: `AndroidManifest.xml` izinleri ekle
- `[ ]` **4.2** FA-01: `flutter pub get` + `flutter analyze` çalıştır
- `[ ]` **4.3** FA-02: Tüm ekranlara `Consumer<AppState>` / `context.watch` ekle
- `[ ]` **4.4** FA-03: `TimerScreen`'e `Timer.periodic(Duration(seconds:1), ...)` ekle
- `[ ]` **4.5** FA-04: Kategori modeli + CRUD ekle
- `[ ]` **4.6** FA-05: Namaz takip `prayerLog` yapısı AppState'e ekle, PrayerCard'a bağla
- `[ ]` **4.7** FA-07: SettingsScreen'e export/import UI bağla

---

### 📱 FAZ 5 — Flutter Bulut Entegrasyonu

- `[ ]` **5.1** `lib/services/api_service.dart` yaz (JWT, HTTP, retry logic)
- `[ ]` **5.2** Login/Register ekranı (splash sonrası)
- `[ ]` **5.3** Offline-first: değişiklikler kuyruğa → internet gelince push
- `[ ]` **5.4** Pull: uygulama açılışında son senkronizasyondan bu yana değişenleri çek
- `[ ]` **5.5** Çakışma çözümü: `updated_at` bazlı "son kaydeden kazanır"

---

### 📦 FAZ 6 — APK Derleme & Test

- `[ ]` **6.1** `flutter analyze` — sıfır hata/uyarı
- `[ ]` **6.2** `flutter build apk --debug` — debug APK
- `[ ]` **6.3** Debug APK'yı gerçek cihazda test et
- `[ ]` **6.4** Kritik akışları doğrula (görev ekle → senkronize → web'de gör)
- `[ ]` **6.5** `flutter build apk --release` — imzalı release APK
- `[ ]` **6.6** APK imzalama (keystore oluştur)

---

### 🚀 FAZ 7 — Yayın & Dağıtım

- `[ ]` **7.1** Web sürümü `takvim.komutrotasi.com`'a yükle
- `[ ]` **7.2** SSL sertifikası kontrol et (Let's Encrypt)
- `[ ]` **7.3** APK dağıtım kanalı: doğrudan indirme linki veya Google Play
- `[ ]` **7.4** `takvim.komutrotasi.com/indir` sayfası (APK indirme + QR kodu)
- `[ ]` **7.5** Kullanıcı kayıt sayfası açılışı

---

## 🏗️ Nihai Mimari

```
takvim.komutrotasi.com   ←── Web Uygulaması (HTML/CSS/JS)
        │
        │  HTTPS + JWT
        ▼
api.komutrotasi.com      ←── PHP Backend
        │
        │  PDO + Prepared Statements
        ▼
MySQL Veritabanı         ←── Tüm kullanıcı verileri (cPanel)
        ▲
        │  HTTPS + JWT
        │
Android APK (Flutter)   ←── Çevrimdışı çalışır, online'da senkronize eder
```

---

## ⚠️ Önemli Kararlar

> [!IMPORTANT]
> **Hangi Fazdan Başlayalım?**
> Önerim: FAZ 0 (web güvenlik düzeltmeleri) → FAZ 1 (web yeni özellikler) → FAZ 2 (backend) sırasıyla gidelim.
> Onaylarsan hemen FAZ 0'a başlıyorum.

> [!WARNING]
> **Flutter bağımlılıkları** (`pubspec.yaml`) henüz indirilmemiş. FAZ 4'e başlamadan önce `flutter pub get` çalıştırman gerekiyor. Birlikte yaparız.

> [!NOTE]
> **Veri Göçü**: Web'deki `localStorage` verilerini bulut hesabına taşımak için "İlk kez giriş yap → Mevcut yerel veriyi buluta aktar" akışı tasarlanacak. Kullanıcı veri kaybetmez.
