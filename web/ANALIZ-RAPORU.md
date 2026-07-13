# 🌐 Mikat — Web Sürümü Detaylı Analiz Raporu

> **Sürüm:** v7.0 (index.html) / app.js  
> **Tarih:** 2026-07-06  
> **Analiz:** Derinlemesine statik analiz — mimari, özellikler, güvenlik, hatalar

---

## 1. 📁 Dosya Yapısı

```
web/
├── index.html          (27.963 bayt — 537 satır)    ✅ HTML yapısı, modaller, PWA banner
├── app.js              (82.039 bayt — 1801 satır)   ✅ Tüm uygulama mantığı
├── styles.css          (53.979 bayt)                 ✅ Tam CSS tasarım sistemi
├── manifest.json       (947 bayt)                    ✅ PWA manifesti
├── service-worker.js   (1.407 bayt)                  ✅ Çevrimdışı desteği
├── favicon.ico                                        ✅
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   └── apple-touch-icon.png
└── app.js.bak          (83.203 bayt)                 ⚠️ Eski yedek dosya — repo'da olmamalı
```

---

## 2. 🏗️ Mimari

| Katman | Detay |
|--------|-------|
| **Paradigma** | Vanilla JS — sınıfsız prosedürel + fonksiyonel |
| **State** | Global `S` nesnesi (`let S = {tasks, prayers, habits, ...}`) |
| **Storage** | `localStorage` — `ht6` anahtarı |
| **Şifreleme** | `crypto.subtle` API (AES-256-GCM + PBKDF2-SHA256) |
| **API** | `aladhan.com` namaz vakitleri REST API (method=13, Diyanet) |
| **PWA** | Service Worker (Cache-first statik, Network-first API) |
| **Render** | Manuel DOM manipülasyonu — `innerHTML` + `esc()` koruması |
| **Bundle** | Tek dosya — framework yok |

### State Yapısı

```javascript
let S = {
  tasks: [],           // Görev listesi
  prayers: {},         // Günlük namaz durumu (kılındı/kılınmadı)
  habits: {},          // Alışkanlık takibi
  zikirDone: {},       // Günlük zikir tamamlandı mı
  catTime: {},         // Kategori bazlı odak süresi (dakika)
  timerSess: {},       // Pomodoro seans sayısı
  theme: 'dark',       // 'dark' | 'light'
  cats: null,          // Özel kategoriler
  habitDefs: null,     // Alışkanlık tanımları
  lastReset: '',       // Son günlük sıfırlama tarihi
  notifEnabled: false, // Bildirimler açık mı
  namazCity: 'Konya',  // Namaz vakitleri şehri
  autoBackup: false,   // Otomatik yedekleme
  lastBackup: '',      // Son yedekleme zamanı
  lat: null, lng: null // GPS koordinatları
};
```

---

## 3. ✅ Özellikler (Tamamlanan)

### 3.1 Görev Yönetimi
- [x] CRUD (Ekle, Düzenle, Sil, Tamamla)
- [x] Kategori sistemi (özel kategori oluşturma, emoji, renk)
- [x] Öncelik seviyeleri: Yüksek / Orta / Düşük
- [x] Son tarih + saat hatırlatıcısı
- [x] Tekrar türleri: Günlük, 2 günde bir, Haftalık (gün seçimli), Aylık (tarih seçimli), Ayın sonu, Özel aralık
- [x] Alt görevler (sub-tasks)
- [x] Etiket (tag) sistemi
- [x] Not alanı (3000 karakter)
- [x] Süre tahmini alanı
- [x] Hızlı görev ekleme (#anahtar ile kategori)
- [x] Arama (canlı filtreleme)
- [x] Filtreler: Tümü / Bekliyor / Bitti / Bugün
- [x] Sıralama: Öncelik / Tarih / Eklenme / İsim
- [x] Tamamlananları sıfırla / fabrika sıfırla
- [x] Günlük otomatik sıfırlama (tekrar eden görevler)

### 3.2 Namaz Takibi
- [x] aladhan.com API entegrasyonu (Diyanet method=13)
- [x] Günlük önbellekleme (localStorage)
- [x] GPS konum tespiti → otomatik şehir seçimi
- [x] Namaz kılındı/kılınmadı takibi
- [x] Sıradaki vakit göstergesi + geri sayım
- [x] Günlük ibadet progress bar
- [x] Haftalık ibadet grafiği (7 günlük)
- [x] İmsak dahil 6 vakit (API'den: Imsak, Sunrise, Dhuhr, Asr, Maghrib, Isha)
- [x] Namaz bildirimleri (Web Notifications API)

### 3.3 Alışkanlık Takibi
- [x] Varsayılan alışkanlıklar (Sabah/Akşam Zikirleri, Kuran, Kitap, Yürüyüş, Su)
- [x] Günlük toggle
- [x] Streak hesabı
- [x] Alışkanlık ekleme/düzenleme/silme

### 3.4 Pomodoro Sayacı
- [x] Sayaç ring animasyonu (SVG)
- [x] Preset'ler: 25dk, 45dk, 60dk, 5dk mola
- [x] Kategori bazlı süre takibi
- [x] Bugünkü seanslar göstergesi (nokta sistemi)
- [x] Web Audio API ile tamamlanma sesi
- [x] Pause / Resume / Reset

### 3.5 Analitik
- [x] Tamamlanan/Bekleyen/Gecikmiş görev sayıları
- [x] Kategori dağılımı
- [x] 7 günlük trend
- [x] Alışkanlık streak liderleri
- [x] Performans metrikleri

### 3.6 Takvim
- [x] Aylık takvim görünümü (özel render)
- [x] Gün seçimi → o güne görev ekleme
- [x] Seçili güne görev listesi
- [x] Tekrar eden görev marker'ları

### 3.7 Dini İçerik
- [x] Günün Ayeti (sabit liste)
- [x] Günün Hadisi (sabit liste)
- [x] Günün Duası (sabit liste)
- [x] Günlük Zikir (rotasyon — 20 zikir)
- [x] Zikir tamamlama takibi

### 3.8 Yedekleme & Güvenlik
- [x] AES-256-GCM şifreli yedekleme (Web Crypto API)
- [x] PBKDF2-SHA256 key türetme (310.000 iterasyon)
- [x] Format: `MK1:<base64(salt[32]+iv[12]+ciphertext)>`
- [x] Geriye dönük uyumluluk: HT4, HT5, HT6 formatları (eski Mikat sürümleri)
- [x] JSON export (şifresiz)
- [x] CSV export
- [x] Otomatik yedekleme (localStorage → `mikat-auto-backup`)
- [x] Dosya olarak indirme (.htbak uzantısı)

### 3.9 PWA
- [x] Service Worker (çevrimdışı desteği)
- [x] manifest.json (standalone mod)
- [x] install banner (BeforeInstallPromptEvent)
- [x] Çevrimdışı banner (online/offline event)

### 3.10 Erişilebilirlik & UX
- [x] ARIA label'ları (role="dialog", aria-modal, aria-label)
- [x] Klavye erişilebilirliği (Enter tuşu)
- [x] Toast bildirimleri (success/error/warning/info)
- [x] Koyu/Açık tema geçişi
- [x] Türkçe yerelleştirme

---

## 4. 🔴 Bilinen Hatalar ve Sorunlar

### BUG-W-01: `app.js.bak` dosyası repo'da yer alıyor
- **Dosya:** `web/app.js.bak` (83.203 bayt)
- **Risk:** Eski sürüm (backup) production dosyasıyla karışabilir, `.gitignore`'a eklenmeli
- **Çözüm:** `.gitignore`'a `*.bak` ekle, dosyayı sil

### BUG-W-02: `factoryReset()` onay koruması yeterli ama kullanıcı "SIFIRLA" yazmalı
- **Dosya:** `index.html` L498-507
- **Durum:** İyi bir güvenlik önlemi ✅ — tek sorun mobil klavyede Türkçe karakter "I/İ" tutarsızlığı
- **Risk:** Kullanıcı "sıfırla" (küçük harf) yazınca buton aktif olmayabilir — test edilmeli

### BUG-W-03: `scheduleNotifs()` göreve bugün 5 saniye sonra bildirim gönderme
- **Dosya:** `app.js` L575-582
- **Sorun:** `reminderTime` olmayan ama `due === today()` olan görevlere her sayfa açılışında 5 saniye sonra bildirim gönderilir
- **Risk:** Yanlış zamanlı, tekrarlayan bildirimler — kullanıcıyı rahatsız edebilir

### BUG-W-04: `decData()` eski format desteğinde güvenlik açığı
- **Dosya:** `app.js` L339-344
- **Sorun:** `HT4:` ve `HT5:` prefix'leri kabul ediliyor — bu formatlarda farklı iterasyon sayıları olabilir, doğrulama yok
- **Öneri:** Legacy format desteğini belgele veya kaldır

### BUG-W-05: `uint8ToBase64` — eski tarayıcılarda `String.fromCharCode.apply` stack overflow
- **Dosya:** `app.js` L320-327
- **Durum:** 8192 chunk ile kısmen çözülmüş (H-10 fix) ✅ — ancak çok büyük veri setlerinde hâlâ risk var

### BUG-W-06: Prayer Cache doğrulama eksik
- **Dosya:** `app.js` L601-603
- **Sorun:** `mikat-prayer-cache` localStorage'dan okunurken şehir değişikliği sonrası eski cache kullanılabilir
- **Risk:** Yanlış şehrin namaz vakitleri görünür

### BUG-W-07: `isRepeatDueOn` — `her_2_gunde` sabitleme mantığı
- **Dosya:** `app.js` L132-143
- **Sorun:** `her_2_gunde` kodu `ozel` ile aynı dalda; `rep === 'her_2_gunde'` zaman `interval=2` hardcode edilmiş ama `t.repInterval` değeri de okunuyor — çakışma potansiyeli var

### BUG-W-08: CSV export'ta encoding sorunu
- **Dosya:** `app.js` L452
- **Sorun:** `new Blob([csv], {type:'text/csv;charset=utf-8'})` — BOM (Byte Order Mark) yok, Excel Türkçe karakterleri düzgün göstermeyebilir
- **Çözüm:** `'\uFEFF' + csv` ekle (UTF-8 BOM)

---

## 5. 🔐 Güvenlik Analizi

### GÜVENLİK PUANI: 8.2 / 10

#### ✅ Güçlü Yönler

| Kontrol | Durum | Detay |
|---------|-------|-------|
| **Content Security Policy** | ✅ Var | `default-src 'self'`, `script-src 'self'`, `connect-src api.aladhan.com` |
| **XSS Koruması** | ✅ Güçlü | `esc()` + `safeText()` + `safeKey()` + `safeColor()` — tüm user input HTML-encoded |
| **Input Sanitization** | ✅ Kapsamlı | `sanitizeTask()`, `normalizeCats()`, `normalizeHabits()`, `sanitizeState()` |
| **Şifreleme Algoritması** | ✅ Güvenli | AES-256-GCM + PBKDF2-SHA256 (310.000 iterasyon) — Web Crypto API (native, donanım hızlandırmalı) |
| **Salt Randomness** | ✅ Güvenli | `crypto.getRandomValues(new Uint8Array(32))` — 256-bit güvenli rastgelelik |
| **IV Boyutu** | ✅ Doğru | 12 bayt (96-bit) — GCM için standart |
| **Format Validasyonu** | ✅ Var | `MK1:` prefix kontrolü, `safeColor()` regex, `safeKey()` whitelist |
| **HTTPS Zorunluluğu** | ⚠️ Belirtilmemiş | CSP var ama HSTS yok — sunucu tarafı ayar gerekli |
| **localStorage Şifresiz** | ⚠️ Kabul edilmiş | Tüm veriler plaintext saklanıyor — cihaz fiziksel erişimi riski |

#### ⚠️ Düşük Riskler

| Kontrol | Sorun | Öneri |
|---------|-------|-------|
| **GPS Koordinatları localStorage'da** | Lat/lng plaintext saklanıyor (`S.lat`, `S.lng`) | Koordinatları storage'a yazmaktan kaçın veya sil |
| **`decData()` HT4/HT5 formatı** | Farklı iterasyon sayılarıyla şifrelenmiş eski backup'lar kabul ediliyor | Legacy format için iterasyon sayısını belge/doğrula |
| **Şifre doğrulama** | `doExport()` sadece `pw.length >= 6` kontrol ediyor | Minimum güç kontrolü ekle (büyük+küçük+rakam) |
| **`auto-backup` şifresiz** | `mikat-auto-backup` key'i şifresiz JSON saklıyor | Belgelere "auto-backup güvensiz" notu ekle |
| **PBKDF2 iterasyon sayısı 310.000** | Yavaş cihazlarda ~1-2 sn gecikme | Kabul edilebilir — 2024 NIST tavsiyesi 600.000, artırılabilir |

#### ❌ Kritik Sorunlar
**Yok** — Ciddi XSS, SQL injection veya kriptografik zafiyet tespit edilmedi.

---

## 6. ⚡ Performans Analizi

| Metrik | Değer | Yorum |
|--------|-------|-------|
| **Toplam JS** | 82 KB (minify edilmemiş) | Kabul edilebilir — framework yok |
| **Toplam CSS** | 54 KB | Kapsamlı ama büyük |
| **DOM güncelleme** | Manuel `innerHTML` | React/Vue'ya göre yavaş ama bundle'sız |
| **Debounce** | ✅ `debouncedSave()` — 300ms | Aşırı yazım azaltılmış |
| **API Cache** | ✅ Günlük prayer cache | Gereksiz API çağrısı önleniyor |
| **SW Cache** | ✅ Cache-first statik dosyalar | Hızlı sayfa yüklemesi |
| **Render döngüsü** | `render()` her işlemde tüm listeyi yeniden render ediyor | 3000+ görevde yavaşlayabilir — virtual list gerekebilir |

---

## 7. 🔄 Sıradaki Yapılacaklar (Öneriler)

### Yüksek Öncelik
- [ ] **W-TODO-01:** `app.js.bak` dosyasını sil ve `.gitignore`'a `*.bak` ekle
- [ ] **W-TODO-02:** BUG-W-03 — Yanlış zamanlı bildirim mantığını düzelt (5 sn sabit delay kaldır)
- [ ] **W-TODO-03:** CSV export'a UTF-8 BOM ekle (Türkçe Excel uyumluluğu)
- [ ] **W-TODO-04:** Prayer cache'e şehir+tarih validation ekle

### Orta Öncelik
- [ ] **W-TODO-05:** GPS koordinatlarını localStorage'a yazma — sadece session bazlı tut
- [ ] **W-TODO-06:** Şifre gücü göstergesi ekle (export modal'da)
- [ ] **W-TODO-07:** `app.js` minify + gzip — 82 KB → ~25 KB hedeflenebilir
- [ ] **W-TODO-08:** Virtual scroll ekle — 3000+ görev performansı için

### Düşük Öncelik
- [ ] **W-TODO-09:** Günün Ayeti/Hadisi/Duası için dinamik veri kaynağı (sabit liste yerine)
- [ ] **W-TODO-10:** Dark/Light tema CSS değişkenlerini sistem tercihine (`prefers-color-scheme`) otomatik bağla
- [ ] **W-TODO-11:** Service Worker push notification desteği (sunucu gerektirir)
- [ ] **W-TODO-12:** Analytics grafiklerini gerçek library ile (Chart.js vb.) güçlendir

---
