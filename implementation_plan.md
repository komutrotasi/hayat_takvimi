# 🗓️ Mikat — Kapsamlı Analiz & Yol Haritası

## 📊 Proje Genel Durumu

| Bileşen | Durum | Tamamlanma |
|---------|-------|-----------|
| **Web Sürümü** | 🟡 Fonksiyonel, hatalar var | ~85% |
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
- **Çözüm**: Header'a `🕌 Namaz` ve `🔥 Alışkanlıklar` butonları eklenerek bunları ayrı view'ler haline getireceğiz. Sol ve sağ paneller yerinde kalacak.

#### FB-03: Sol/Sağ Panel ve Arayüz Düzenlemesi
- **Sorun**: Sol taraftaki görev kategorileri sol panelde yer alıyor, sağ panelde ise alışkanlıklar yer alıyor.
- **Çözüm**: Sol paneldeki "Görev Kategorileri" bölümü "Görevler" menüsü/görünümü altına taşınacak. Sağ paneldeki "Alışkanlıklar" ise üst bar (header) alanına müstakil bir görünüm olarak taşınacak. Sağ ve sol ana paneller (diğer özet bilgileri ve odaklanma sayacı ile) yerinde kalmaya devam edecek.

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

### 🎨 FAZ 1 — Web Yeni Özellikler & İyileştirmeler

- `[x]` **1.1** Namaz Vakitleri → ayrı header menüsü (`🕌 Namaz`) + müstakil görünüm (view).
  - `[x]` **1.1.1** Günlük kılınma oranını gösteren **Yarım Daire Namaz İlerleme Grafiği** (Gauge Chart) ekle.
  - `[x]` **1.1.2** O anki vakte göre değişen **Vaktin Ayeti / Hadisi** (dinamik) kutusu ekle.
  - `[x]` **1.1.3** Teheccüd, Duha, Evvabin, Şükür namazlarını içeren **Nafile Namaz Takip Paneli** ekle.
  - `[x]` **1.1.4** Kerahet vakitlerini hesaplayıp kullanıcıyı uyaran **Kerahet Vakti Uyarı Bandı** ekle.
- `[x]` **1.2** Sol paneldeki Görev Kategorileri'ni "Görevler" menüsü altına taşı; sağ paneldeki Alışkanlıklar'ı ise üst bar (header) alanına müstakil bir menü/görünüm (`🔥 Alışkanlıklar`) olarak taşı. Sol ve sağ ana paneller yerinde kalacak.
- `[x]` **1.3** Takvim gün kartlarını renklendirme (görev yoğunluğuna göre ısı haritası/heat-map mantığı).
- `[x]` **1.4** Zikirmatik ve Kaza Takip iyileştirmeleri:
  - `[x]` **1.4.1** Zikirmatik için **Titreşim (Vibration API) ve Tık Sesi (Web Audio API)** efektleri ekle.
  - `[x]` **1.4.2** Kaza borçları için **Akıllı Bitiş Hesaplayıcı** ekle.
- `[x]` **1.5** Kullanıcı Deneyimi (UX) ve Görsel Wow-Factor:
  - `[x]` **1.5.1** Bir görev tamamlandığında ekranda tetiklenen **Şık Konfeti Animasyonu** ekle.
  - `[x]` **1.5.2** Masaüstü görünümde takvim gün hücrelerine **İlk 1-2 Görevin Başlıklarını** sığdır.
  - `[x]` **1.5.3** Arayüzü **Glassmorphism (Buzlu Cam - backdrop-filter)** teması ile modernize et ve yumuşak geçiş efektleri (micro-interactions) ekle.
- `[x]` **1.6** Web sürümünü `takvim.komutrotasi.com` subdomainine hazırla (CNAME)

---

### 🗄️ FAZ 2 — Backend (PHP + MySQL)

- `[ ]` **2.1** cPanel → MySQL → `mikat` veritabanı oluştur
- `[ ]` **2.2** SQL dosyasını yükle (6 tablo: users, tasks, habits, categories, timer_sessions, sync_log)
- `[ ]` **2.3** `api.komutrotasi.com` subdomain oluştur
- `[ ]` **2.4** PHP dosyaları yaz: `auth.php`, `tasks.php`, `habits.php`, `categories.php`, `sync.php`
- `[ ]` **2.5** JWT authentication (HS256, 24 saat geçerli)
- `[ ]` **2.6** Rate limiting (60 istek/dk / IP)
- `[ ]` **2.7** CORS sadece `takvim.komutrotasi.com`'a aç
- `[ ]` **2.8** API'yi test et (Postman/curl)

---

### 🌐 FAZ 3 — Web Bulut Entegrasyonu

- `[ ]` **3.1** Web'e Login/Register modalı ekle
- `[ ]` **3.2** Hibrit mod: Giriş yapmadan localStorage çalışır, login sonrası senkronize
- `[ ]` **3.3** `sync.js` servisi yaz: offline kuyruk + push/pull
- `[ ]` **3.4** CSP'ye `api.komutrotasi.com` `connect-src`'e ekle
- `[ ]` **3.5** Otomatik 5 dakikada bir senkronizasyon

---

### 🚀 FAZ 4 — Yayın & Dağıtım

- `[ ]` **4.1** Web sürümü `takvim.komutrotasi.com`'a yükle
- `[ ]` **4.2** SSL sertifikası kontrol et (Let's Encrypt)
- `[ ]` **4.3** Kullanıcı kayıt sayfası açılışı

---

## 🏗️ Nihai Mimari

```
takvim.komutrotasi.com   ←── Web Uygulaması (HTML/CSS/JS + PWA)
        │
        │  HTTPS + JWT
        ▼
api.komutrotasi.com      ←── PHP Backend
        │
        │  PDO + Prepared Statements
        ▼
MySQL Veritabanı         ←── Tüm kullanıcı verileri (cPanel)
```

---

## ⚠️ Önemli Kararlar

> [!IMPORTANT]
> **Hangi Fazdan Başlayalım?**
> Önerim: FAZ 0 (web güvenlik düzeltmeleri) → FAZ 1 (web yeni özellikler) → FAZ 2 (backend) sırasıyla gidelim.
> Onaylarsan hemen FAZ 0'a başlıyorum.

> [!NOTE]
> **Veri Göçü**: Web'deki `localStorage` verilerini bulut hesabına taşımak için "İlk kez giriş yap → Mevcut yerel veriyi buluta aktar" akışı tasarlanacak. Kullanıcı veri kaybetmez.
