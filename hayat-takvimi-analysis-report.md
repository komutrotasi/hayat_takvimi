# Hayat Takvimi - Detaylı Analiz Raporu

## Genel Bakış
- Dosya: `hayat-takvimi.html`
- Tür: Tek dosyalık web uygulaması (HTML + CSS + JavaScript)
- Amaç: görev yönetimi, ibadet takibi, alışkanlık izleme, odaklanma sayacı, takvim ve şifreli yedekleme.
- Depolama: `localStorage` tabanlı, `ht6` anahtarını kullanıyor. Ayrıca eski `ht5` desteği var.

## Yapı
### HTML
- Üst bar: görünüm sekmeleri, saat, tema, bildirim ve ayarlar.
- Sol panel: günlük özet, kategori kartları, tüm görevler filtresi.
- Orta panel: görevler, analitik ve takvim görünümleri.
- Sağ panel: odak sayacı, kategori süreleri, alışkanlık listesi.
- Modal bileşenler: görev ekleme/düzenleme, kategori yönetimi, ayarlar, alışkanlık düzenleme, onay dialogları, PWA banner ve toast bildirimleri.

### CSS
- Koyu ve açık tema desteği: `body.dark` ve `body.light`.
- Değişken tabanlı renk sistemi.
- Modern kart tabanlı UI, flex/grid düzeni.
- Mobil uyumluluk 780px altı için tek sütun düzeni.
- Modal, toast, takvim, alışkanlık kartları için kapsamlı stiller.

## JavaScript Fonksiyonelliği
### Veri modeli
- Global state: `S`
- Varsayılan kategoriler: `DEFAULT_CATS`
- Varsayılan alışkanlıklar: `DEFAULT_HABITS`
- Veri normalizasyonu: `normalizeCats`, `normalizeHabits`, `sanitizeTask`, `sanitizeState`

### LocalStorage
- `load()` fonksiyonu `ht6` verisini okuyor.
- `save()` fonksiyonu veriyi normalize edip kaydediyor.
- Eski sürüm için `ht5` desteği var.

### Tema
- `applyTheme()` ve `toggleTheme()` ile tema değiştirme.
- Timer ring renkleri tema değişimine bağlı.

### Şifreli Yedekleme
- AES-256-GCM + PBKDF2 kullanılıyor.
- `doExport()` ve `doImport()` şifreli aktarıma izin veriyor.
- `copyExp()` ve `dlExp()` ile veriyi kopyalama/indirme desteği.

### Ses ve Bildirimler
- Web Audio API ile ses çalma.
- Bildirim desteği tarayıcı üzerinden aktif/pasif hale getirilebilir.
- Namaz vakitleri ve kişisel görev hatırlatıcıları için schedule mantığı bulundu.

### Namaz Vakitleri
- `fetchPrayerTimes()` fonksiyonu `api.aladhan.com` API'sine bağlanarak canlı vakitleri getiriyor.
- API başarısızsa varsayılan sabit vakitler kullanılıyor.
- `renderNamaz()` ve `renderDailyZikir()` ile bilgi gösterimi.

### Otomatik Günlük Sıfırlama
- `autoReset()` fonksiyonu `lastReset` kontrolü yaparak tekrar görevlerini günlük temizliyor.
- Tekrar türleri: `gunluk`, `haftalik`, `aylik`.

### Görev Yönetimi
- CRUD: `openAdd()`, `openEdit()`, `saveTask()`, `toggleTask()`, `confirmDel()`.
- Alt görev desteği: `addSub()`, `toggleSub()`, `renderSubPrev()`.
- Hızlı ekleme: `quickAdd()`; `#kategori` etiketiyle kategori seçimi.
- Filtreler: tümü, bekleyen, tamamlanan, bugün.
- Sıralama seçenekleri: öncelik, tarih, eklenme, isim.
- Görev kartları kategorilere göre renkli ve bilgi dolu.

### Takvim
- Aylık takvim görünümü `renderCalendar()` ile oluşturuluyor.
- Seçili gün ve ay bilgisi gösteriliyor.
- Görev sayısına göre takvim hücrelerinde dot gösterimi.
- Çift tıklama ile belirli güne görev ekleme.

### Analitik
- Görev sayıları, tamamlanan, gecikmiş, odak süreleri, pomodoro verileri.
- `habitSeriesHtml()` ve `catSeriesHtml()` ile alışkanlık ve kategori seri kartları.

### Alışkanlıklar
- 7 günlük alışkanlık takibi.
- `streak()`, `habitRate()`, `longestStreak()` hesaplamaları.
- Alışkanlık ekleme/düzenleme/silme modalı.

### Pomodoro / Odak Sayacı
- `setPreset()`, `timerToggle()`, `timerReset()`, `drawTimer()`.
- Tamamlanan seanslar `timerSess` kaydına, kategori süreleri `catTime` kaydına yazılıyor.

### PWA Desteği
- `beforeinstallprompt` ile yükleme bannerı.
- Service Worker blob kaydı.

## Güvenlik Değerlendirmesi
- `esc()` fonksiyonu temel XSS koruması sağlar.
- `safeText`, `safeKey`, `safeColor` ile input doğrulaması yapılmış.
- Şifreleme için tarayıcı kripto API'si kullanılıyor.
- LocalStorage kullanımı nedeniyle tarayıcı depolama sınırlarına dikkat edilmeli.

## Potansiyel İyileştirmeler
- `taskOccursOn()` fonksiyonu haftalık görevlere yalnızca 7 günlük periyot bazlı yaklaşım kullanıyor; tekrar hesaplaması daha doğru olabilir.
- `scheduleNotifs()` görev hatırlatıcılarını sabit 5 saniye gecikmeyle gösteriyor; bu davranış daha esnek hale getirilebilir.
- Takvimde çift tıklama mobil cihazlarda tercih edilmeyebilir.
- `clearDone()` tamamlanmış görevleri silmiyor, sadece işaretlerini sıfırlıyor; adlandırma netleştirilebilir.
- `dailyReset()` ve `trackingReset()` confirm/prompt kullanıyor; daha özelleştirilmiş modal onayları daha iyi UX sağlar.

## Sonuç
Bu proje, üretkenlik ve ibadet alışkanlıklarını bir arada takip eden kapsamlı bir PWA/yerel uygulama örneğidir. Kod, geniş özellik seti, yerel veri yönetimi, şifreli veri aktarımı ve PWA destekleriyle zengin bir yapıya sahip.
