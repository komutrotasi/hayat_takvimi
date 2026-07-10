
'use strict';

/* ── RENK PALETİ ── */
const COLOR_PALETTE=[
  {hex:'#e8b84b',bg:'rgba(232,184,75,.12)'},
  {hex:'#fb923c',bg:'rgba(251,146,60,.12)'},
  {hex:'#3ecfb0',bg:'rgba(62,207,176,.12)'},
  {hex:'#5b9cf6',bg:'rgba(91,156,246,.12)'},
  {hex:'#a78bfa',bg:'rgba(167,139,250,.12)'},
  {hex:'#f06878',bg:'rgba(240,104,120,.12)'},
  {hex:'#4ade80',bg:'rgba(74,222,128,.12)'},
  {hex:'#f472b6',bg:'rgba(244,114,182,.12)'},
  {hex:'#38bdf8',bg:'rgba(56,189,248,.12)'},
  {hex:'#a3e635',bg:'rgba(163,230,53,.12)'},
  {hex:'#e879f9',bg:'rgba(232,121,249,.12)'},
  {hex:'#9aa0b8',bg:'rgba(154,160,184,.12)'},
];

/* ── VARSAYILAN KATEGORİLER ── */
const DEFAULT_CATS = {
  dini:     {l:'Dini Görevler',  i:'🤲',c:'#e8b84b',bg:'rgba(232,184,75,.12)'},
  kuran:    {l:'Kuran & Zikir',  i:'📖',c:'#fb923c',bg:'rgba(251,146,60,.12)'},
  platform: {l:'bilisimcihocam', i:'💻',c:'#3ecfb0',bg:'rgba(62,207,176,.12)'},
  okul:     {l:'Öğretmenlik',    i:'🎓',c:'#5b9cf6',bg:'rgba(91,156,246,.12)'},
  aile:     {l:'Aile',           i:'❤️',c:'#a78bfa',bg:'rgba(167,139,250,.12)'},
  kitap:    {l:'Kitap & Gelişim',i:'📚',c:'#f06878',bg:'rgba(240,104,120,.12)'},
  diger:    {l:'Diğer',          i:'📌',c:'#9aa0b8',bg:'rgba(154,160,184,.12)'},
};

/* ── VARSAYILAN ALIŞKANLIKLAR ── */
const DEFAULT_HABITS = [
  {id:'s_zikir', l:'🌅 Sabah Zikirleri'},
  {id:'a_zikir', l:'🌆 Akşam Zikirleri'},
  {id:'kuran',   l:'📖 Kuran Tilâveti'},
  {id:'kitap',   l:'📚 Kitap Okuma'},
  {id:'yuruyus', l:'🚶 Yürüyüş'},
  {id:'su',      l:'💧 Su (8 bardak)'},
];

/* ── ZİKİR LİSTESİ ── */
const DAILY_ZIKIR=[
  {t:'Subhânallâh',             n:'33 defa'},
  {t:'Elhamdülillâh',           n:'33 defa'},
  {t:'Allâhu Ekber',            n:'33 defa'},
  {t:'Lâ ilâhe illallâh',       n:'100 defa'},
  {t:'Estağfirullâh',           n:'100 defa'},
  {t:'Yâ Hayyu Yâ Kayyûm',      n:'21 defa'},
  {t:'Lâ havle velâ kuvvete illâ billâh', n:'21 defa'},
  {t:'Sübhânallâhi ve bihamdihî',n:'100 defa'},
  {t:'Allâhümme salli alâ seyyidinâ Muhammed',n:'33 defa'},
  {t:'Hasbiyallâhu lâ ilâhe illâ Hû',n:'7 defa'},
  {t:'Rabbi zidnî ilmâ',        n:'21 defa'},
  {t:'Yâ Latîf',                n:'129 defa'},
  {t:'Yâ Rahmân Yâ Rahîm',      n:'33 defa'},
  {t:'Sübhânellâhi velhamdülillâhi ve lâ ilâhe illallâhu vallâhu ekber',n:'33 defa'},
  {t:'Hasbünallâhu ve ni\'mel vekîl',n:'33 defa'},
  {t:'Rabbenâ âtinâ fid-dünyâ haseneten…',n:'7 defa'},
  {t:'Yâ Fettâh',               n:'33 defa'},
  {t:'Yâ Vedûd',                n:'33 defa'},
  {t:'Bismillâhirrahmânirrahîm', n:'100 defa'},
  {t:'Elhamdülillâhi alâ külli hâl',n:'33 defa'},
];

/* ── NAMAZ VAKİTLERİ (varsayılan — API yoksa) ── */
let PRAYERS = [
  {n:'Sabah',  t:'05:30', h:5},
  {n:'Öğle',   t:'12:15', h:12},
  {n:'İkindi', t:'15:30', h:15},
  {n:'Akşam',  t:'18:45', h:18},
  {n:'Yatsı',  t:'20:15', h:20},
];

/* ── DURUM ── */
let CATS   = {...DEFAULT_CATS};
let HABITS = [...DEFAULT_HABITS];

let S = {
  tasks:[], prayers:{}, habits:{}, zikirDone:{},
  catTime:{}, timerSess:{}, theme:'dark',
  cats:null, habitDefs:null, lastReset:'',
  notifEnabled:false, namazCity:'Konya',
  autoBackup:false, lastBackup:'',
  lat:null, lng:null,
};

let editId = null, tmpSubs = [], activeCat = null, statusF = 'all';
let editCatKey = null, selectedColor = COLOR_PALETTE[0];
let selectedDate = today();
let _habitEditIdx = null;
const expandedTasks = new Set();

/* ── YARDIMCI ── */
function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function gid() { return Date.now().toString(36) + Math.random().toString(36).slice(2,6); }
function dOff(n) {
  const d = new Date(); d.setDate(d.getDate() - n);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function dayOfYear() {
  const n = new Date(), s = new Date(n.getFullYear(), 0, 0);
  return Math.floor((n - s) / 86400000);
}
function parseYmd(s) {
  return /^\d{4}-\d{2}-\d{2}$/.test(s || '') ? new Date(s + 'T00:00:00') : null;
}
function diffDays(a,b) {
  return Math.floor((b - a) / 86400000);
}
function isRepeatDueOn(t, dayStr) {
  const d = parseYmd(dayStr);
  if (!d) return false;
  const dow = d.getDay();
  const dom = d.getDate();
  const rep = t.rep;
  if (rep === 'gunluk') return true;
  if (rep === 'haftalik') {
    const days = Array.isArray(t.repDays) && t.repDays.length ? t.repDays : [1];
    return days.includes(dow);
  }
  if (rep === 'aylik') {
    const days = Array.isArray(t.repDays) && t.repDays.length ? t.repDays : [1];
    return days.includes(dom);
  }
  if (rep === 'ay_son') {
    const last = new Date(d.getFullYear(), d.getMonth()+1, 0).getDate();
    return dom === last;
  }
  if (rep === 'her_2_gunde' || rep === 'ozel') {
    const interval = rep === 'her_2_gunde' ? 2 : (Number.isInteger(t.repInterval) && t.repInterval > 1 ? t.repInterval : 2);
    const start = parseYmd(t.due) || parseYmd(t.created) || parseYmd(today());
    if (!start) return false;
    const diff = diffDays(start, d);
    if (diff < 0 || diff % interval !== 0) return false;
    if (rep === 'ozel' && t.repEnd) {
      const end = parseYmd(t.repEnd);
      if (end && d > end) return false;
    }
    return true;
  }
  return false;
}
function fmtSec(s) {
  const h = Math.floor(s/3600), m = Math.floor((s%3600)/60);
  return h ? `${h}sa ${m}dk` : `${m}dk`;
}

/* ── XSS KORUMALARI ── */
function esc(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}
function safeText(s, max=500) {
  return String(s ?? '').replace(/[\u0000-\u001f\u007f]/g,'').trim().slice(0, max);
}
function safeKey(k) {
  return String(k ?? '').toLowerCase().replace(/\s+/g,'_')
    .replace(/[^a-z0-9_]/g,'').slice(0,32) || ('cat_'+gid());
}
function safeColor(v, fallback='#9aa0b8') {
  v = String(v ?? '').trim();
  if (/^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(v)) return v;
  if (/^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(\s*,\s*(0|1|0?\.\d+))?\s*\)$/.test(v)) return v;
  if (/^var\(--[a-zA-Z0-9_-]+\)$/.test(v)) return v;
  return fallback;
}

/* ── NORMALİZASYON ── */
function normalizeCats(src) {
  const out = {};
  const base = (src && typeof src === 'object' && !Array.isArray(src)) ? src : DEFAULT_CATS;
  Object.entries(base).slice(0,80).forEach(([rawKey, raw]) => {
    const key = safeKey(rawKey);
    const c = (raw && typeof raw === 'object') ? raw : {};
    const color = safeColor(c.c, '#9aa0b8');
    out[key] = {
      l: safeText(c.l || 'Kategori', 60),
      i: safeText(c.i || '📌', 8),
      c: color,
      bg: safeColor(c.bg, color + '20'),
    };
  });
  return Object.keys(out).length ? out : JSON.parse(JSON.stringify(DEFAULT_CATS));
}
function normalizeHabits(src) {
  const arr = Array.isArray(src) ? src : DEFAULT_HABITS;
  const seen = new Set();
  return arr.slice(0, 50).map((h, i) => {
    const raw = (h && typeof h === 'object') ? h : {};
    let id = safeKey(raw.id || ('h_'+i));
    while (seen.has(id)) id = 'h_' + gid();
    seen.add(id);
    return { id, l: safeText(raw.l || 'Alışkanlık', 80) };
  });
}
function sanitizeTask(t) {
  const firstCat = Object.keys(CATS)[0] || 'diger';
  const raw = (t && typeof t === 'object') ? t : {};
  return {
    id:          safeText(raw.id || gid(), 40),
    name:        safeText(raw.name || 'Adsız görev', 300),
    cat:         CATS[raw.cat] ? raw.cat : firstCat,
    pri:         ['yuksek','orta','dusuk'].includes(raw.pri) ? raw.pri : 'orta',
    due:         /^\d{4}-\d{2}-\d{2}$/.test(raw.due || '') ? raw.due : '',
    rep:             ['yok','gunluk','her_2_gunde','haftalik','aylik','ay_son','ozel'].includes(raw.rep) ? raw.rep : 'yok',
    repDays:         Array.isArray(raw.repDays) ? raw.repDays.filter(n => Number.isInteger(n)) : [],
    repInterval:     Number.isInteger(raw.repInterval) && raw.repInterval > 1 ? raw.repInterval : null,
    repEnd:          /^\d{4}-\d{2}-\d{2}$/.test(raw.repEnd || '') ? raw.repEnd : '',
    reminderTime:    /^\d{2}:\d{2}$/.test(raw.reminderTime || '') ? raw.reminderTime : '',
    reminderRepeat:  ['none','once','daily','weekly'].includes(raw.reminderRepeat) ? raw.reminderRepeat : 'none',
    est:             String(raw.est || '').replace(/[^0-9]/g,'').slice(0,4),
    tag:             safeText(raw.tag || '', 40),
    note:            safeText(raw.note || '', 3000),
    subs:            Array.isArray(raw.subs) ? raw.subs.slice(0,80).map(s => ({
                       id:   safeText(s?.id || gid(), 40),
                       text: safeText(s?.text || '', 600),
                       done: !!(s?.done),
                     })) : [],
    done:        !!(raw.done),
    created:     raw.created || new Date().toISOString(),
    completedAt: raw.completedAt || null,
  };
}
function sanitizeState(raw) {
  const def = {
    tasks:[], prayers:{}, habits:{}, zikirDone:{},
    catTime:{}, timerSess:{}, theme:'dark',
    cats:null, habitDefs:null, lastReset:'',
    notifEnabled:false, namazCity:'Konya',
    autoBackup:false, lastBackup:'',
    lat:null, lng:null,
  };
  const st = Object.assign(def, (raw && typeof raw === 'object') ? raw : {});
  st.theme        = st.theme === 'light' ? 'light' : 'dark';
  st.namazCity    = safeText(st.namazCity || 'Konya', 40) || 'Konya';
  st.notifEnabled = !!(st.notifEnabled);
  st.autoBackup   = !!(st.autoBackup);
  st.lastBackup   = safeText(st.lastBackup || '', 40);
  st.lat          = typeof st.lat === 'number' ? st.lat : null;
  st.lng          = typeof st.lng === 'number' ? st.lng : null;
  st.lastReset    = /^\d{4}-\d{2}-\d{2}$/.test(st.lastReset || '') ? st.lastReset : '';
  st.cats        = normalizeCats(st.cats || CATS);  CATS = st.cats;
  st.habitDefs   = normalizeHabits(st.habitDefs || HABITS); HABITS = st.habitDefs;
  st.tasks       = Array.isArray(st.tasks) ? st.tasks.slice(0,3000).map(sanitizeTask) : [];
  ['prayers','habits','zikirDone','catTime','timerSess'].forEach(k => {
    if (!st[k] || typeof st[k] !== 'object' || Array.isArray(st[k])) st[k] = {};
  });
  return st;
}

/* ── DEPOLAMA ── */
function load() {
  try {
    const raw = localStorage.getItem('ht6');
    if (raw) Object.assign(S, sanitizeState(JSON.parse(raw)));
    else {
      // v5 → v6 geçiş
      const old = localStorage.getItem('ht5');
      if (old) Object.assign(S, sanitizeState(JSON.parse(old)));
    }
    CATS   = normalizeCats(S.cats || CATS);
    HABITS = normalizeHabits(S.habitDefs || HABITS);
    S.cats = CATS; S.habitDefs = HABITS;
  } catch(e) {
    console.warn('Kayıt okunamadı:', e);
    toast('Kayıt okunamadı; varsayılan verilerle açıldı.', 'w');
  }
}
function save() {
  try {
    S.cats = normalizeCats(CATS);
    S.habitDefs = normalizeHabits(HABITS);
    // H-02: S nesnesini yeni bir referansla değil, mevcut nesneyi güncelleyerek sakla
    Object.assign(S, sanitizeState({...S}));
    localStorage.setItem('ht6', JSON.stringify(S));
    maybeAutoBackup();
    return true;
  } catch(e) {
    console.error('Kayıt hatası:', e);
    toast('Kayıt yapılamadı. Tarayıcı depolama alanını kontrol edin.', 'e');
    return false;
  }
}

/* save() için debounce — hızlı ardışık değişikliklerde yazım azaltılır */
let _saveTimer = null;
function debouncedSave() {
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(save, 300);
}

/* ── TEMA ── */
function applyTheme(t) {
  document.body.className = t;
  document.getElementById('themeBtn').textContent = t === 'dark' ? '☀️' : '🌙';
  const ring = document.getElementById('timerRing');
  if (ring) {
    ring.setAttribute('stroke', t === 'dark' ? '#3ecfb0' : '#0a7860');
    ring.previousElementSibling?.setAttribute('stroke', t === 'dark' ? '#2c3550' : '#d8ddf0');
  }
}
function toggleTheme() { S.theme = S.theme === 'dark' ? 'light' : 'dark'; applyTheme(S.theme); save(); }

/* ── KRİPTO (AES-256-GCM + PBKDF2) ── */
async function deriveKey(pw, salt) {
  const enc = new TextEncoder();
  const km = await crypto.subtle.importKey('raw', enc.encode(pw), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    {name:'PBKDF2', salt, iterations:310000, hash:'SHA-256'},
    km, {name:'AES-GCM', length:256}, false, ['encrypt','decrypt']
  );
}
// H-10: Büyük veri setlerinde stack overflow önlemek için chunk-based base64
function uint8ToBase64(bytes) {
  let binary = '';
  const chunkSize = 8192;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}
async function encData(data, pw) {
  const enc  = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(32));
  const iv   = crypto.getRandomValues(new Uint8Array(12));
  const key  = await deriveKey(pw, salt);
  const ct   = await crypto.subtle.encrypt({name:'AES-GCM', iv}, key, enc.encode(JSON.stringify(data)));
  const out  = new Uint8Array(44 + ct.byteLength);
  out.set(salt); out.set(iv, 32); out.set(new Uint8Array(ct), 44);
  return 'HT6:' + uint8ToBase64(out);
}
async function decData(str, pw) {
  if (!str.startsWith('HT6:') && !str.startsWith('HT5:') && !str.startsWith('HT4:'))
    throw new Error('Geçersiz format');
  const buf = new Uint8Array(atob(str.slice(4)).split('').map(c => c.charCodeAt(0)));
  const key = await deriveKey(pw, buf.slice(0, 32));
  const dec = await crypto.subtle.decrypt({name:'AES-GCM', iv:buf.slice(32,44)}, key, buf.slice(44));
  return JSON.parse(new TextDecoder().decode(dec));
}
async function doExport() {
  const pw = document.getElementById('epw').value.trim();
  const pw2= document.getElementById('epw2').value.trim();
  if (!pw)  { toast('Şifre girin', 'e'); return; }
  if (pw.length < 6) { toast('En az 6 karakter', 'e'); return; }
  if (pw !== pw2)    { toast('Şifreler eşleşmiyor!', 'e'); return; }
  try {
    const enc = await encData(S, pw);
    document.getElementById('expOut').value = enc;
    document.getElementById('expR').style.display   = 'block';
    document.getElementById('copybtn').style.display = 'block';
    document.getElementById('dlbtn').style.display   = 'block';
    toast('Veri şifrelendi! Güvenli bir yere kaydedin.', 's');
  } catch(e) { toast('Hata: ' + e.message, 'e'); }
}
async function doImport() {
  const pw   = document.getElementById('ipw').value.trim();
  const raw  = document.getElementById('idata').value.trim();
  if (!pw)  { toast('Şifre girin', 'e'); return; }
  if (!raw) { toast('Veri yapıştırın', 'e'); return; }
  try {
    const dec = await decData(raw, pw);
    Object.assign(S, sanitizeState(dec));
    CATS = normalizeCats(S.cats); HABITS = normalizeHabits(S.habitDefs);
    save(); render(); renderSelects();
    toast('Veriler başarıyla yüklendi!', 's');
    document.getElementById('idata').value = '';
    document.getElementById('ipw').value   = '';
  } catch(e) { toast('Şifre yanlış veya veri bozuk!', 'e'); }
}
function copyExp() {
  const v = document.getElementById('expOut').value;
  if (!v) return;
  navigator.clipboard.writeText(v).then(() => toast('Kopyalandı!', 's'));
}
function dlExp() {
  const v = document.getElementById('expOut').value;
  if (!v) return;
  const a = document.createElement('a');
  a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(v);
  a.download = 'hayat-takvimi-' + today() + '.htbak';
  a.click();
  toast('İndiriliyor...', 'i');
}
function detectLocation() {
  if (!navigator.geolocation) { toast('Tarayıcı konumu desteklemiyor', 'e'); return; }
  navigator.geolocation.getCurrentPosition(pos => {
    S.lat = pos.coords.latitude;
    S.lng = pos.coords.longitude;
    save();
    renderSettings();
    toast(`Konum bulundu: ${S.lat.toFixed(4)}, ${S.lng.toFixed(4)}`, 's');
  }, err => {
    toast('Konum alınamadı: ' + err.message, 'e');
  }, {timeout:15000, enableHighAccuracy:true});
}
function saveNamazCity() {
  const city = document.getElementById('namazCityInput').value.trim();
  if (!city) { toast('Şehir girin', 'e'); return; }
  S.namazCity = city;
  save();
  fetchPrayerTimes();
  renderSettings();
  toast('Namaz şehri kaydedildi: ' + city, 's');
}
function toggleAutoBackup(enabled) {
  S.autoBackup = !!enabled;
  save();
  renderSettings();
  toast(S.autoBackup ? 'Otomatik yedekleme etkin' : 'Otomatik yedekleme kapatıldı', S.autoBackup ? 's' : 'i');
}
function maybeAutoBackup() {
  // H-01: Sadece backup key'ine yaz; ht6'ya tekrar yazmak save() döngüsüne neden olur
  if (!S.autoBackup) return;
  const ts = new Date().toISOString();
  const backup = {ts, data: JSON.parse(JSON.stringify(S))};
  localStorage.setItem('ht6-auto-backup', JSON.stringify(backup));
  S.lastBackup = ts;
  // Not: ht6 anahtarına tekrar yazmıyoruz — save() zaten yazdı
}
function doExportJson() {
  const data = JSON.stringify(S, null, 2);
  const blob = new Blob([data], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `hayat-takvimi-${today()}.json`;
  a.click();
  toast('JSON indiriliyor...', 's');
}
function doExportCsv() {
  const rows = [['id','ad','kategori','öncelik','tarih','hatırlatıcı','hatırlama','tekrar','etiket','not','durum']];
  S.tasks.forEach(t => {
    rows.push([
      t.id,
      t.name,
      t.cat,
      t.pri,
      t.due || '',
      t.reminderTime || '',
      t.reminderRepeat || '',
      t.rep || '',
      t.tag || '',
      t.note || '',
      t.done ? 'tamamlandı' : 'beklemede'
    ]);
  });
  const csv = rows.map(r => r.map(v => `"${String(v||'').replace(/"/g,'""')}"`).join(',')).join('\r\n');
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `hayat-takvimi-${today()}.csv`;
  a.click();
  toast('CSV indiriliyor...', 's');
}
function restoreBackup() {
  const raw = localStorage.getItem('ht6-auto-backup');
  if (!raw) { toast('Otomatik yedek bulunamadı', 'e'); return; }
  let backup;
  try { backup = JSON.parse(raw); } catch(e) { toast('Yedek okunamadı: ' + e.message, 'e'); return; }
  if (!backup || !backup.data) { toast('Geçersiz yedek dosyası', 'e'); return; }
  const ts = backup.ts ? new Date(backup.ts).toLocaleString('tr-TR') : '—';
  showConfirm(
    '💾 Yedekten Geri Yükle',
    'Otomatik yedekten geri yükleyelim mi?',
    'Yedek tarihi: ' + ts,
    '✅ Geri Yükle',
    () => {
      try {
        Object.assign(S, sanitizeState(backup.data));
        CATS = normalizeCats(S.cats); HABITS = normalizeHabits(S.habitDefs);
        S.cats = CATS; S.habitDefs = HABITS;
        save(); render(); renderSelects(); renderSettings();
        toast('Yedek geri yüklendi', 's');
      } catch(e) { toast('Yedek yüklenemedi: ' + e.message, 'e'); }
    }
  );
}
function cTab(t, el) {
  document.querySelectorAll('.ctab').forEach(x => x.classList.remove('on'));
  el.classList.add('on');
  ['cexp','cimp'].forEach(id => document.getElementById(id).style.display = 'none');
  document.getElementById('c'+t).style.display = 'block';
}

/* ── SES ── */
let audioCtx = null;
function unlockAudio() {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    g.gain.value = 0.0001; o.connect(g); g.connect(audioCtx.destination);
    o.start(); o.stop(audioCtx.currentTime + 0.02);
  } catch(e) {}
}
function playSound(kind = 'bell') {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const now   = audioCtx.currentTime;
    const freqs = kind === 'prayer' ? [660,880,660] : kind === 'done' ? [523,659,784] : [880,660];
    freqs.forEach((f, i) => {
      const o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(f, now + i*.16);
      g.gain.setValueAtTime(0.0001, now + i*.16);
      g.gain.exponentialRampToValueAtTime(0.16, now + i*.16 + .02);
      g.gain.exponentialRampToValueAtTime(0.0001, now + i*.16 + .14);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(now + i*.16); o.stop(now + i*.16 + .15);
    });
  } catch(e) {}
}

/* ── BİLDİRİMLER ── */
let notifTimers = [];
function toggleNotifications() {
  if (!('Notification' in window)) { toast('Tarayıcınız bildirimleri desteklemiyor', 'e'); return; }
  if (S.notifEnabled) {
    S.notifEnabled = false;
    notifTimers.forEach(clearTimeout); notifTimers = [];
    document.getElementById('notifBtn').classList.remove('on');
    save(); toast('Bildirimler kapatıldı', 'i');
  } else {
    Notification.requestPermission().then(p => {
      if (p === 'granted') {
        S.notifEnabled = true;
        unlockAudio(); playSound('done');
        document.getElementById('notifBtn').classList.add('on');
        scheduleNotifs(); save(); toast('Bildirimler açıldı! 🔔', 's');
      } else { toast('Bildirim izni verilmedi', 'w'); }
    });
  }
}
function scheduleNotifs() {
  notifTimers.forEach(clearTimeout); notifTimers = [];
  if (!S.notifEnabled) return;
  const now = new Date(), nowMin = now.getHours()*60 + now.getMinutes();
  PRAYERS.forEach(p => {
    const [h,m] = p.t.split(':').map(Number);
    const diff = (h*60+m - nowMin) * 60000;
    if (diff > 0 && diff < 86400000) {
      notifTimers.push(setTimeout(() => {
        if (S.notifEnabled && Notification.permission === 'granted') {
          playSound('prayer');
          new Notification('🕌 ' + p.n + ' Vakti', {body: p.t + ' — Namaz vakti geldi', tag: 'namaz-'+p.n});
        }
      }, diff));
    }
  });
  S.tasks.filter(t => !t.done).forEach(task => {
    if (task.reminderTime && task.reminderRepeat && task.reminderRepeat !== 'none') {
      const [h,m] = task.reminderTime.split(':').map(Number);
      const remindAt = new Date();
      remindAt.setHours(h, m, 0, 0);
      const diff = remindAt - now;
      if (diff > 0 && diff < 86400000) {
        // H-07: Operatör önceliği netleştirildi — her koşul ayrı paranteze alındı
        const valid = (task.reminderRepeat === 'daily')
          || (task.reminderRepeat === 'weekly' && (new Date(task.due+'T00:00:00').getDay() === now.getDay() || !task.due))
          || (task.reminderRepeat === 'once' && task.due === today());
        if (valid) {
          notifTimers.push(setTimeout(() => {
            if (S.notifEnabled && Notification.permission === 'granted' && !task.done) {
              playSound('bell');
              new Notification('⏰ Görev Hatırlatıcı', {body: task.name, tag: 'task-'+task.id});
            }
          }, diff));
        }
      }
    } else if (task.due === today()) {
      notifTimers.push(setTimeout(() => {
        if (S.notifEnabled && Notification.permission === 'granted' && !task.done) {
          playSound('bell');
          new Notification('📋 Görev Hatırlatıcı', {body: task.name, tag: 'task-'+task.id});
        }
      }, 5000));
    }
  });
}
function updateNotifBtn() { document.getElementById('notifBtn').classList.toggle('on', !!S.notifEnabled); }

/* ── NAMAZ VAKİTLERİ ── */
async function fetchPrayerTimes() {
  try {
    const r = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(S.namazCity||'Konya')}&country=TR&method=13`);
    if (!r.ok) throw new Error('API hatası');
    const j = await r.json();
    const t = j.data.timings;
    PRAYERS = [
      {n:'Sabah',  t:t.Fajr.slice(0,5),    h:parseInt(t.Fajr)},
      {n:'Öğle',   t:t.Dhuhr.slice(0,5),   h:parseInt(t.Dhuhr)},
      {n:'İkindi', t:t.Asr.slice(0,5),      h:parseInt(t.Asr)},
      {n:'Akşam',  t:t.Maghrib.slice(0,5),  h:parseInt(t.Maghrib)},
      {n:'Yatsı',  t:t.Isha.slice(0,5),     h:parseInt(t.Isha)},
    ];
    // Günlük cache — aynı günde tekrar API çağrısını önler
    try { localStorage.setItem('ht6-prayer-cache', JSON.stringify({date: today(), prayers: PRAYERS})); } catch(e) {}
    document.getElementById('namazSource').textContent = '🌐 Canlı veri — ' + S.namazCity;
    renderNamaz();
    if (S.notifEnabled) scheduleNotifs();
  } catch(e) {
    document.getElementById('namazSource').textContent = '📡 Çevrimdışı — varsayılan saatler';
  }
}

/* ── OTOMATİK SIFIRLAMA ── */
function autoReset() {
  const td = today();
  if (S.lastReset === td) return;
  S.tasks.forEach(t => {
    if (isRepeatDueOn(t, td)) {
      t.done = false;
      t.completedAt = null;
    }
  });
  S.lastReset = td; save();
}

/* ── GÖREV BUGÜN MI? ── */
function isTaskDueToday(t) {
  const td = today();
  if (t.done) return false;
  if (t.due === td) return true;
  if (t.due && t.due < td) return true;
  if (!t.due) return isRepeatDueOn(t, td);
  return false;
}

/* ── TEKRAR GÜN SEÇİCİ ── */
const WEEK_DAYS = [
  {v:1,l:'Pt'},{v:2,l:'Sa'},{v:3,l:'Ça'},{v:4,l:'Pe'},
  {v:5,l:'Cu'},{v:6,l:'Ct'},{v:0,l:'Pz'}
];
function toggleRepDays(preselect) {
  const rep = document.getElementById('fRep').value;
  const row = document.getElementById('repDaysRow');
  const interval = document.getElementById('repIntervalRow');
  const end = document.getElementById('repEndRow');
  const picker = document.getElementById('repDaysPicker');
  const lbl = document.getElementById('repDaysLbl');
  row.style.display = 'none'; interval.style.display = 'none'; end.style.display = 'none';
  picker.innerHTML = '';
  if (rep === 'haftalik') {
    row.style.display = ''; lbl.textContent = 'Hangi Günler?';
    const sel = Array.isArray(preselect) ? preselect : [];
    picker.innerHTML = WEEK_DAYS.map(d =>
      `<button type="button" class="rep-day-btn${sel.includes(d.v)?' on':''}" data-val="${d.v}" onclick="this.classList.toggle('on')">${d.l}</button>`
    ).join('');
  } else if (rep === 'aylik') {
    row.style.display = ''; lbl.textContent = 'Ayın Kaçında?';
    const sel = Array.isArray(preselect) && preselect.length ? preselect : [1];
    picker.innerHTML = Array.from({length:31},(_,i)=>i+1).map(d =>
      `<button type="button" class="rep-month-btn${sel.includes(d)?' on':''}" data-val="${d}" onclick="selectMonthDay(this)">${d}</button>`
    ).join('');
  } else if (rep === 'ay_son') {
    end.style.display = '';
  } else if (rep === 'her_2_gunde') {
    interval.style.display = '';
    document.getElementById('fRepInterval').value = 2;
    end.style.display = '';
  } else if (rep === 'ozel') {
    interval.style.display = '';
    end.style.display = '';
  }
}
function selectMonthDay(btn) {
  btn.closest('#repDaysPicker').querySelectorAll('.rep-month-btn').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
}
function getRepDays(rep) {
  if (rep === 'haftalik')
    return Array.from(document.querySelectorAll('#repDaysPicker .rep-day-btn.on')).map(b => parseInt(b.dataset.val));
  if (rep === 'aylik') {
    const on = document.querySelector('#repDaysPicker .rep-month-btn.on');
    return on ? [parseInt(on.dataset.val)] : [1];
  }
  return [];
}

/* ── GÖREV CRUD ── */
function openAdd(catKey) {
  editId = null; tmpSubs = [];
  document.getElementById('mTitle').textContent = '✏️ Yeni Görev';
  ['fName','fNote','fDue','fTag','fReminder','fRepInterval','fRepEnd'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('fPri').value = 'orta';
  document.getElementById('fRep').value = 'yok';
  document.getElementById('fRemRep').value = 'none';
  document.getElementById('fEst').value = '';
  document.getElementById('fCat').value = catKey || activeCat || Object.keys(CATS)[0] || 'diger';
  document.getElementById('subPrev').innerHTML = '';
  toggleRepDays();
  document.getElementById('taskModal').classList.add('on');
  setTimeout(() => document.getElementById('fName').focus(), 80);
}
function openAddForSelectedDay() { openAdd(); document.getElementById('fDue').value = selectedDate || today(); }
function openEdit(id) {
  const t = S.tasks.find(x => x.id === id); if (!t) return;
  editId = id; tmpSubs = [...(t.subs || [])];
  document.getElementById('mTitle').textContent = '✏️ Görevi Düzenle';
  document.getElementById('fName').value = t.name;
  document.getElementById('fCat').value  = t.cat;
  document.getElementById('fPri').value  = t.pri;
  document.getElementById('fDue').value  = t.due || '';
  document.getElementById('fReminder').value = t.reminderTime || '';
  document.getElementById('fRemRep').value = t.reminderRepeat || 'none';
  document.getElementById('fRep').value  = t.rep || 'yok';
  document.getElementById('fRepInterval').value = t.repInterval || '';
  document.getElementById('fRepEnd').value = t.repEnd || '';
  document.getElementById('fEst').value  = t.est || '';
  document.getElementById('fTag').value  = t.tag || '';
  document.getElementById('fNote').value = t.note || '';
  toggleRepDays(t.repDays || []);
  renderSubPrev();
  document.getElementById('taskModal').classList.add('on');
  setTimeout(() => document.getElementById('fName').focus(), 80);
}
function closeModal(id) { document.getElementById(id).classList.remove('on'); }

/**
 * H-13: Generic confirm modal — native confirm() yerine PWA uyumlu dialog
 * @param {string} title   - Modal başlığı
 * @param {string} msg     - Ana mesaj (kalın)
 * @param {string} detail  - İsteğe bağlı detay metni (bosse gizlenir)
 * @param {string} okLabel - Onayla butonunun metni
 * @param {Function} onOk  - Onaylanma callback'i
 * @param {boolean} danger - true ise kırmızı .mdel, false ise yeşil .msave stili
 */
function showConfirm(title, msg, detail, okLabel, onOk, danger = false) {
  document.getElementById('confModalTitle').textContent = title;
  document.getElementById('confTxt').textContent = msg;
  const det = document.getElementById('confDetail');
  if (detail) { det.textContent = detail; det.style.display = ''; }
  else { det.textContent = ''; det.style.display = 'none'; }
  const btn = document.getElementById('confOk');
  btn.textContent = okLabel;
  btn.className = danger ? 'mdel' : 'msave';
  btn.onclick = () => { closeModal('confModal'); onOk(); };
  document.getElementById('confModal').classList.add('on');
}
function saveTask() {
  const name = document.getElementById('fName').value.trim();
  if (!name) { toast('Görev adı boş olamaz!', 'e'); return; }
  const rep = document.getElementById('fRep').value;
  const task = {
    id: editId || gid(), name,
    cat:  document.getElementById('fCat').value,
    pri:  document.getElementById('fPri').value,
    due:  document.getElementById('fDue').value,
    reminderTime:   document.getElementById('fReminder').value,
    reminderRepeat: document.getElementById('fRemRep').value,
    rep,  repDays: getRepDays(rep),
    repInterval:    parseInt(document.getElementById('fRepInterval').value, 10) || null,
    repEnd:         document.getElementById('fRepEnd').value,
    est:  document.getElementById('fEst').value,
    tag:  document.getElementById('fTag').value.trim(),
    note: document.getElementById('fNote').value.trim(),
    subs: tmpSubs.map(s => ({...s})),
    done: false, created: new Date().toISOString(), completedAt: null,
  };
  if (editId) {
    const i = S.tasks.findIndex(x => x.id === editId);
    if (i > -1) {
      task.done = S.tasks[i].done;
      task.completedAt = S.tasks[i].completedAt;
      task.created = S.tasks[i].created;
      S.tasks[i] = task;
    }
  } else { S.tasks.unshift(task); }
  save(); render(); closeModal('taskModal');
  toast(editId ? 'Güncellendi!' : 'Görev eklendi!', 's');
}
function toggleTask(id) {
  const t = S.tasks.find(x => x.id === id); if (!t) return;
  t.done = !t.done; t.completedAt = t.done ? new Date().toISOString() : null;
  save(); render();
}
function toggleSub(tid, si) {
  const t = S.tasks.find(x => x.id === tid); if (!t?.subs) return;
  t.subs[si].done = !t.subs[si].done; save(); render();
}
function confirmDel(id) {
  const t = S.tasks.find(x => x.id === id); if (!t) return;
  showConfirm(
    '🗑️ Görevi Sil',
    `“${t.name}” silinsin mi?`,
    '',
    '🗑️ Sil',
    () => { S.tasks = S.tasks.filter(x => x.id !== id); save(); render(); toast('Silindi.', 'i'); },
    true
  );
}
// H-05: İsim düzeltildi — fonksiyon siler değil, tamamlanmışları sıfırlar
function resetDoneTasks() {
  const n = S.tasks.filter(t => t.done).length;
  S.tasks.filter(t => t.done).forEach(t => {
    t.done = false; t.completedAt = null;
    t.subs?.forEach(s => s.done = false);
  });
  save(); render(); toast(`${n} tamamlanmış görev sıfırlandı.`, 'i');
}
// Geriye dönük uyumluluk için eski isim de çalışsın
const clearDone = resetDoneTasks;

/* ── ALT GÖREVLER ── */
function addSub() {
  const inp = document.getElementById('subInp');
  const v = inp.value.trim(); if (!v) return;
  tmpSubs.push({id:gid(), text:v, done:false}); inp.value = ''; renderSubPrev();
}
function removeSub(i) { tmpSubs.splice(i, 1); renderSubPrev(); }
function renderSubPrev() {
  document.getElementById('subPrev').innerHTML = tmpSubs.map((s,i) =>
    `<div class="sp-item"><span>☐ ${esc(s.text)}</span><button onclick="removeSub(${i})">✕</button></div>`
  ).join('');
}
document.getElementById('subInp').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); addSub(); } });

/* ── HIZLI EKLE ── */
function quickAdd() {
  const inp = document.getElementById('qaInp');
  let v = inp.value.trim(); if (!v) return;
  let cat = activeCat || Object.keys(CATS)[0] || 'diger';
  const m = v.match(/#(\w+)/);
  if (m && CATS[m[1]]) { cat = m[1]; v = v.replace(m[0], '').trim(); }
  if (!v) { toast('Görev adı boş olamaz!', 'e'); return; }
  S.tasks.unshift({
    id: gid(), name: v, cat, pri: 'orta',
    due: '', rep: 'yok', repDays: [], est: '', tag: '', note: '',
    subs: [], done: false, created: new Date().toISOString(), completedAt: null,
  });
  save(); render(); inp.value = ''; toast('Hızlı görev eklendi!', 's');
}
document.getElementById('qaInp').addEventListener('keydown', e => { if (e.key === 'Enter') quickAdd(); });

/* ── FİLTRELER ── */
function filterCat(cat) {
  activeCat = cat;
  document.getElementById('allcard').classList.toggle('on', !cat);
  document.querySelectorAll('.ccard').forEach(c => c.classList.remove('on'));
  // H-04: CSS.escape ile selector injection koruması
  if (cat) {
    const selector = '[data-cat="' + (CSS.escape ? CSS.escape(cat) : cat.replace(/"/g,'')) + '"]';
    const el = document.querySelector(selector);
    if (el) el.classList.add('on');
  }
  renderTasks(); updatePgHdr();
}
function setFilter(f, el) {
  statusF = f;
  document.querySelectorAll('.fchip').forEach(c => c.classList.remove('on'));
  el.classList.add('on'); renderTasks();
}

/* ── NAMAZ ── */
function toggleNamaz(n) {
  const d = today();
  if (!S.prayers[d]) S.prayers[d] = {};
  S.prayers[d][n] = !S.prayers[d][n];
  save(); renderNamaz(); renderDayProg();
}

/* ── ALIŞKANLIKLAR ── */
function toggleHabit(id, ds) {
  if (!S.habits[ds]) S.habits[ds] = {};
  S.habits[ds][id] = !S.habits[ds][id];
  save(); renderHabits();
  if (document.getElementById('v-analytics').classList.contains('on')) renderAnalytics();
}
function streak(id) {
  let s = 0;
  for (let i = 0; i < 365; i++) {
    if (S.habits[dOff(i)]?.[id]) s++; else break;
  }
  return s;
}

/* ── SAYAÇ ── */
// H-03: Timer Date.now() bazlı — arka plan tab'ında negatife düşmez
const T = {running:false, remain:1500, total:1500, iv:null, startedAt:null, pausedRemain:null};
function setPreset(m, el) {
  document.querySelectorAll('.tpre').forEach(b => b.classList.remove('on'));
  el.classList.add('on'); timerReset(); T.remain = m*60; T.total = m*60; drawTimer();
}
function timerToggle() {
  if (T.running) {
    clearInterval(T.iv); T.running = false;
    T.pausedRemain = T.remain;
    document.getElementById('tbstart').textContent = '▶ Devam';
    document.getElementById('tph').textContent = 'Duraklatıldı';
  } else {
    T.running = true;
    // Duraklatmadan devam ediyorsak kalan süreyi kullan
    const startRemain = (T.pausedRemain !== null) ? T.pausedRemain : T.remain;
    T.pausedRemain = null;
    T.startedAt = Date.now();
    const snapRemain = startRemain;
    document.getElementById('tbstart').textContent = '⏸ Duraklat';
    document.getElementById('tph').textContent = 'Odaklanıyor...';
    T.iv = setInterval(() => {
      const elapsed = Math.floor((Date.now() - T.startedAt) / 1000);
      T.remain = Math.max(0, snapRemain - elapsed);
      drawTimer();
      if (T.remain <= 0) {
        clearInterval(T.iv); T.running = false; T.startedAt = null;
        const d = today();
        if (!S.timerSess[d]) S.timerSess[d] = 0; S.timerSess[d]++;
        const cat = document.getElementById('timerCat').value;
        if (cat) {
          if (!S.catTime[d]) S.catTime[d] = {};
          S.catTime[d][cat] = (S.catTime[d][cat] || 0) + T.total;
        }
        save(); renderSessions(); renderCatTimes();
        document.getElementById('tbstart').textContent = '▶ Başlat';
        document.getElementById('tph').textContent = 'Tamamlandı 🎉';
        toast('Seans tamamlandı! 🎉', 's');
        playSound('done');
        if (S.notifEnabled && Notification.permission === 'granted')
          new Notification('⏱ Pomodoro Tamamlandı', {body:'Seans bitti! Molayı hak ettin. ☕', tag:'pomodoro'});
      }
    }, 250);
  }
}
function timerReset() {
  clearInterval(T.iv); T.running = false; T.remain = T.total;
  T.startedAt = null; T.pausedRemain = null;
  document.getElementById('tbstart').textContent = '▶ Başlat';
  document.getElementById('tph').textContent = 'Hazır'; drawTimer();
}
function drawTimer() {
  const m = String(Math.floor(T.remain/60)).padStart(2,'0');
  const s = String(T.remain%60).padStart(2,'0');
  document.getElementById('tnum').textContent = `${m}:${s}`;
  const circ = 2*Math.PI*44;
  document.getElementById('timerRing').style.strokeDashoffset = (circ*(1-T.remain/T.total)).toFixed(1);
  const cat = document.getElementById('timerCat').value;
  document.getElementById('timerCatLbl').textContent = cat && CATS[cat] ? `${CATS[cat].i} ${CATS[cat].l}` : '';
}
function renderSessions() {
  const n = S.timerSess[today()] || 0;
  document.getElementById('sdots').innerHTML =
    Array.from({length:4}, (_,i) => `<div class="sdot${i<n?' done':''}"></div>`).join('');
}

/* ── GÖRÜNÜM GEÇER ── */
function showView(v, el) {
  document.querySelectorAll('.view').forEach(x => x.classList.remove('on'));
  document.getElementById('v-'+v)?.classList.add('on');
  document.querySelectorAll('.tnav').forEach(t => t.classList.remove('on'));
  if (el) el.classList.add('on');
  if (v === 'analytics') renderAnalytics();
  if (v === 'calendar')  { renderCalendar(); renderNamaz(); renderHabits(); }
  if (v === 'tasks')     renderTasks();
}

/* ── KATEGORİ YÖNETİMİ ── */
function openSettings() {
  renderSettings();
  document.getElementById('settingsModal').classList.add('on');
}
function renderSettings() {
  document.getElementById('namazCityInput').value = S.namazCity || 'Konya';
  document.getElementById('autoBackupToggle').checked = !!S.autoBackup;
  const status = document.getElementById('backupStatus');
  if (status) {
    status.textContent = S.lastBackup
      ? 'Son yedek: ' + new Date(S.lastBackup).toLocaleString('tr-TR')
      : 'Henüz bir yedekleme yapılmadı.';
  }
  const coord = document.getElementById('locationStatus');
  if (coord) {
    coord.textContent = S.lat && S.lng
      ? `Konum: ${S.lat.toFixed(4)}, ${S.lng.toFixed(4)}`
      : 'Konum kaydedilmedi.';
  }
}
function openCatManager() {
  editCatKey = null; renderColorPresets(); renderCatList(); resetCatForm();
  document.getElementById('catModal').classList.add('on');
}
function renderColorPresets() {
  document.getElementById('colorPresets').innerHTML = COLOR_PALETTE.map((c,i) =>
    `<div class="color-preset${selectedColor.hex===c.hex?' sel':''}" style="background:${c.hex}" onclick="selectColor(${i})" title="${c.hex}"></div>`
  ).join('');
}
function selectColor(i) { selectedColor = COLOR_PALETTE[i]; renderColorPresets(); }
function renderCatList() {
  document.getElementById('catList').innerHTML = Object.entries(CATS).map(([k,c]) => `
    <div class="cat-item">
      <div class="cat-item-ico">${esc(c.i)}</div>
      <div style="width:11px;height:11px;border-radius:3px;background:${safeColor(c.c)};flex-shrink:0;border:2px solid var(--bd)"></div>
      <div class="cat-item-info">
        <div class="cat-item-name">${esc(c.l)}</div>
        <div class="cat-item-key">#${esc(k)}</div>
      </div>
      <div class="cat-item-acts">
        <button class="cat-act-btn" onclick="editCat('${k}')" title="Düzenle">✏️</button>
        ${Object.keys(CATS).length>1?`<button class="cat-act-btn del" onclick="deleteCat('${k}')" title="Sil">🗑️</button>`:''}
      </div>
    </div>`
  ).join('');
}
function editCat(key) {
  editCatKey = key;
  const c = CATS[key];
  document.getElementById('catIco').value  = c.i;
  document.getElementById('catName').value = c.l;
  document.getElementById('catKey').value  = key;
  document.getElementById('catKey').disabled = true;
  document.getElementById('catFormTitle').textContent = 'Kategori Düzenle: ' + c.l;
  const idx = COLOR_PALETTE.findIndex(p => p.hex === c.c);
  selectedColor = idx >= 0 ? COLOR_PALETTE[idx] : {hex:c.c, bg:c.bg};
  renderColorPresets();
}
function resetCatForm() {
  editCatKey = null;
  ['catIco','catName','catKey'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('catKey').disabled = false;
  document.getElementById('catFormTitle').textContent = 'Yeni Kategori Ekle';
  selectedColor = COLOR_PALETTE[0]; renderColorPresets();
}
function saveCat() {
  const ico  = document.getElementById('catIco').value.trim()  || '📌';
  const name = document.getElementById('catName').value.trim();
  let   key  = document.getElementById('catKey').value.trim()
    .toLowerCase().replace(/\s+/g,'_').replace(/[^a-z0-9_]/g,'');
  if (!name) { toast('Kategori adı boş olamaz', 'e'); return; }
  if (!key && !editCatKey) {
    key = name.toLowerCase()
      .replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ş/g,'s')
      .replace(/ı/g,'i').replace(/ö/g,'o').replace(/ç/g,'c')
      .replace(/[^a-z0-9_]/g,'').slice(0,20);
  }
  if (!key) { toast('Geçerli bir anahtar girin', 'e'); return; }
  if (!editCatKey && CATS[key]) { toast('Bu anahtar zaten kullanılıyor: #'+key, 'e'); return; }
  const hex = selectedColor.hex, bg = selectedColor.bg || hex+'20';
  if (editCatKey) {
    CATS[editCatKey] = {l:name, i:ico, c:hex, bg};
    toast('Kategori güncellendi', 's');
  } else {
    CATS[key] = {l:name, i:ico, c:hex, bg};
    toast('Kategori eklendi: #'+key, 's');
  }
  save(); render(); renderSelects(); renderCatList(); resetCatForm();
}
function deleteCat(key) {
  if (Object.keys(CATS).length <= 1) { toast('En az 1 kategori olmalı', 'e'); return; }
  const fallback = Object.keys(CATS).find(k => k !== key) || 'diger';
  showConfirm(
    '🗑️ Kategoriyi Sil',
    `“${CATS[key].l}” silinsin mi?`,
    `Bu kategorideki görevler “${CATS[fallback]?.l}” kategorisine taşınır.`,
    '🗑️ Sil',
    () => {
      S.tasks.forEach(t => { if (t.cat === key) t.cat = fallback; });
      delete CATS[key];
      save(); render(); renderSelects(); renderCatList();
      toast('Kategori silindi', 'i');
    },
    true
  );
}

/* ── RENDER: SELECT'LER ── */
function renderSelects() {
  const opts = Object.entries(CATS).map(([k,c]) =>
    `<option value="${esc(k)}">${esc(c.i)} ${esc(c.l)}</option>`
  ).join('');
  document.getElementById('fCat').innerHTML = opts;
  document.getElementById('timerCat').innerHTML = '<option value="">— Kategori seç —</option>' + opts;
}

/* ── RENDER: KATEGORİ KARTLARI ── */
function renderCatCards() {
  document.getElementById('allnum').textContent = S.tasks.length;
  document.getElementById('ccards').innerHTML = Object.entries(CATS).map(([k,c]) => {
    const tasks = S.tasks.filter(t => t.cat === k);
    const done  = tasks.filter(t => t.done).length;
    const pct   = tasks.length ? Math.round(done/tasks.length*100) : 0;
    const pend  = tasks.filter(t => !t.done).length;
    return `<div class="ccard${activeCat===k?' on':''}" data-cat="${k}" onclick="filterCat('${k}')">
      <div class="ccard-stripe" style="background:${safeColor(c.c)}"></div>
      <div class="ccard-top">
        <div class="ccard-ico" style="background:${safeColor(c.bg)}">${esc(c.i)}</div>
        <div class="ccard-nm" style="color:${safeColor(c.c)}">${esc(c.l)}</div>
        <div class="ccard-n" style="background:${safeColor(c.bg)};color:${safeColor(c.c)}">${pend}</div>
        <div class="ccard-acts">
          <button class="ccard-act" onclick="event.stopPropagation();openCatManagerTo('${k}')" title="Düzenle">✏️</button>
        </div>
      </div>
      <div class="ccard-sub">${done}/${tasks.length} tamamlandı</div>
      <div class="cbar"><div class="cbar-f" style="width:${pct}%;background:${safeColor(c.c)}"></div></div>
    </div>`;
  }).join('');
}
function openCatManagerTo(key) { openCatManager(); setTimeout(() => editCat(key), 50); }

/* ── RENDER: GÜNLÜK PANEL ── */
function renderDayProg() {
  const tdTasks = S.tasks.filter(isTaskDueToday);
  const total = tdTasks.length, done = tdTasks.filter(t => t.done).length;
  const pct = total ? Math.round(done/total*100) : 0;
  document.getElementById('dscore').textContent = pct + '%';
  document.getElementById('dmood').textContent = ['😴','😐','🙂','😊','🌟','🔥'][Math.min(5, Math.floor(pct/20))];
  document.getElementById('dpbars').innerHTML = Object.entries(CATS).map(([k,c]) => {
    const tasks = tdTasks.filter(t => t.cat === k);
    const d = tasks.filter(t => t.done).length;
    const p = tasks.length ? Math.round(d/tasks.length*100) : 0;
    return `<div class="prow">
      <div class="prow-ico">${esc(c.i)}</div>
      <div class="ptrack"><div class="pfill" style="width:${p}%;background:${safeColor(c.c)}"></div></div>
      <div class="ptxt">${d}/${tasks.length}</div>
    </div>`;
  }).join('');
  renderGeneralStatus(tdTasks);
}
function renderGeneralStatus(tdTasks) {
  const box = document.getElementById('genelDurum'); if (!box) return;
  const td = today();
  const total   = S.tasks.length;
  const done    = S.tasks.filter(t => t.done).length;
  const overdue = S.tasks.filter(t => t.due && t.due < td && !t.done).length;
  const rep     = S.tasks.filter(t => t.rep && t.rep !== 'yok').length;
  box.innerHTML = `
    <div class="gd-row"><span>📅 Bugünlük</span><b style="color:var(--gold)">${tdTasks.filter(t=>t.done).length}/${tdTasks.length}</b></div>
    <div class="gd-row"><span>📌 Toplam</span><b>${done}/${total}</b></div>
    <div class="gd-row"><span>⚠️ Geciken</span><b style="color:var(--rose)">${overdue}</b></div>
    <div class="gd-row"><span>🔁 Tekrarlanan</span><b>${rep}</b></div>`;
}

/* ── RENDER: NAMAZ ── */
function renderNamaz() {
  const d = today();
  const now = new Date();
  const nowMin = now.getHours()*60 + now.getMinutes();
  let curIdx = PRAYERS.length - 1;
  PRAYERS.forEach((p, i) => {
    const [h,m] = p.t.split(':').map(Number);
    if (nowMin >= h*60+m) curIdx = i;
  });
  const done = PRAYERS.filter(p => S.prayers[d]?.[p.n]).length;
  document.getElementById('namazCnt').textContent = `${done}/5`;
  // İbadet özeti
  const cnt = document.getElementById('ibadetCount');
  const bar = document.getElementById('ibadetBar');
  const msg = document.getElementById('ibadetMsg');
  if (cnt) cnt.textContent = `${done} / 5`;
  if (bar) bar.style.width = Math.max(0, done*20) + '%';
  if (msg) msg.textContent = ['Başlamak için ilk namazı kıl','Güzel başladın 👍','Devam et 💪','Yarısından fazlası 🔥','Son bir adım ✨','Bugünkü hedef tamamlandı 🎉'][done] || '';
  // Vakit ızgarası
  document.getElementById('namazGrid').innerHTML = PRAYERS.map((p, i) => {
    const isDone = !!(S.prayers[d]?.[p.n]);
    const isCur  = i === curIdx && !isDone;
    const [ph,pm] = p.t.split(':').map(Number);
    const diff = ph*60+pm - nowMin;
    const rem  = diff < 0 ? 'geçti' : `${Math.floor(diff/60)}s ${diff%60}dk`;
    return `<div class="nitem${isDone?' done':isCur?' cur':''}" onclick="toggleNamaz('${p.n}')">
      <div class="nn">${p.n}</div>
      <div class="nt">${p.t}</div>
      <div class="ns">${isDone?'✓ Kılındı':isCur?'⏰ Vakit':rem}</div>
    </div>`;
  }).join('');
  // Sonraki vakit
  const nextEl = document.getElementById('namazNext');
  if (nextEl) {
    let next = PRAYERS.find(p => { const [h,m]=p.t.split(':').map(Number); return h*60+m>nowMin; }) || PRAYERS[0];
    let [nh,nm] = next.t.split(':').map(Number);
    let diff = nh*60+nm - nowMin; if (diff <= 0) diff += 1440;
    const hh = String(Math.floor(diff/60)).padStart(2,'0');
    const mm = String(diff%60).padStart(2,'0');
    nextEl.innerHTML = `<div><div class="namaz-next-l">Sıradaki Vakit</div><div class="namaz-next-n">${next.n} · ${next.t}</div></div><div class="namaz-next-t">${hh}:${mm}</div>`;
  }
  renderDailyZikir();
  renderWeeklyIbadet();
}

/* ── RENDER: ZİKİR ── */
function renderDailyZikir() {
  const el  = document.getElementById('zikirText');
  const note= document.getElementById('zikirNote');
  const btn = document.getElementById('zikirBtn');
  if (!el || !btn) return;
  const z   = DAILY_ZIKIR[dayOfYear() % DAILY_ZIKIR.length];
  const ds  = today();
  const isDone = !!(S.zikirDone?.[ds]);
  el.textContent   = z.t;
  note.textContent = isDone ? 'Bugünkü zikir tamamlandı ✓' : 'Öneri: ' + z.n;
  btn.textContent  = isDone ? '✓ Tamamlandı' : 'Tamamla';
  btn.style.opacity= isDone ? '.6' : '1';
}
function completeDailyZikir() {
  const ds = today();
  if (!S.zikirDone) S.zikirDone = {};
  S.zikirDone[ds] = !S.zikirDone[ds];
  save(); renderDailyZikir(); renderWeeklyIbadet();
  toast(S.zikirDone[ds] ? 'Günün zikri tamamlandı' : 'Zikir işareti kaldırıldı', S.zikirDone[ds] ? 's' : 'i');
  if (S.zikirDone[ds]) playSound('done');
}

/* ── RENDER: HAFTALIK İBADET ── */
function renderWeeklyIbadet() {
  const box   = document.getElementById('weeklyIbadetDays');
  const score = document.getElementById('weeklyIbadetScore');
  if (!box || !score) return;
  const dnames = ['P','S','Ç','P','C','C','P'];
  let total = 0;
  const html = Array.from({length:7}, (_,i) => {
    const date = new Date(); date.setDate(date.getDate() - (6-i));
    const ds = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
    const cnt = PRAYERS.filter(p => S.prayers[ds]?.[p.n]).length;
    total += cnt;
    const pct = cnt/5*100;
    const idx = date.getDay() === 0 ? 6 : date.getDay() - 1;
    return `<div class="wi-day ${i===6?'today ':''} ${cnt===5?'full':''}" title="${ds} · ${cnt}/5">
      <div class="wi-bar"><div class="wi-fill" style="height:${Math.max(8,pct)}%"></div></div>
      <div class="wi-label">${dnames[idx]}</div>
    </div>`;
  }).join('');
  score.textContent = `${total}/35`;
  box.innerHTML = html;
}

/* ── RENDER: ALIŞKANLIKLAR ── */
function renderHabits() {
  const dnames = ['Pt','Sa','Ça','Pe','Cu','Ct','Pz'];
  const el = document.getElementById('habitList'); if (!el) return;
  el.innerHTML = HABITS.map((h, idx) => {
    const str  = streak(h.id);
    const dots = Array.from({length:7}, (_,i) => {
      const ds   = dOff(6-i);
      const isDone = !!(S.habits[ds]?.[h.id]);
      const isT  = i === 6;
      const d = new Date(); d.setDate(d.getDate() - (6-i));
      const dn = dnames[d.getDay() === 0 ? 6 : d.getDay()-1];
      return `<div class="habit-day-wrap">
        <div class="hdot${isDone?' done':''}${isT?' today':''}" onclick="toggleHabit('${h.id}','${ds}')" title="${ds}">${isDone?'✓':''}</div>
        <div class="habit-day-name">${dn}</div>
      </div>`;
    }).join('');
    return `<div class="hrow">
      <div class="htop">
        <div class="hnm">${esc(h.l)}</div>
        <div style="display:flex;align-items:center;gap:5px">
          <div class="hstr">🔥${str}</div>
          <div class="habit-actions">
            <button class="habit-btn" onclick="editHabitPrompt(${idx})" title="Düzenle">✎</button>
            <button class="habit-btn" onclick="deleteHabit(${idx})" title="Sil">×</button>
          </div>
        </div>
      </div>
      <div class="hdots2">${dots}</div>
    </div>`;
  }).join('');
}

/* ── ALIÞKANLIK MODAL ── */
function addHabitPrompt() {
  _habitEditIdx = -1;
  document.getElementById('habitModalTitle').textContent = '✨ Yeni Alışkanlık';
  document.getElementById('habitModalSub').textContent   = 'Başına emoji ekleyebilirsiniz';
  document.getElementById('habitModalInp').value = '';
  document.getElementById('habitModal').classList.add('on');
  setTimeout(() => document.getElementById('habitModalInp').focus(), 80);
}
function editHabitPrompt(idx) {
  const h = HABITS[idx]; if (!h) return;
  _habitEditIdx = idx;
  document.getElementById('habitModalTitle').textContent = '✏️ Alışkanlık Düzenle';
  document.getElementById('habitModalSub').textContent   = 'Adı güncelleyip kaydedin';
  document.getElementById('habitModalInp').value = h.l;
  document.getElementById('habitModal').classList.add('on');
  setTimeout(() => { const inp = document.getElementById('habitModalInp'); inp.focus(); inp.select(); }, 80);
}
function saveHabitModal() {
  const label = document.getElementById('habitModalInp').value.trim();
  if (!label) { document.getElementById('habitModalInp').style.borderColor = 'var(--rose)'; return; }
  document.getElementById('habitModalInp').style.borderColor = '';
  if (_habitEditIdx === -1) {
    HABITS.push({id:'h_'+gid(), l:label});
    toast('Alışkanlık eklendi', 's');
  } else {
    if (!HABITS[_habitEditIdx]) return;
    HABITS[_habitEditIdx].l = label;
    toast('Alışkanlık güncellendi', 's');
  }
  save(); renderHabits(); closeHabitModal();
}
function closeHabitModal() {
  document.getElementById('habitModal').classList.remove('on');
  document.getElementById('habitModalInp').style.borderColor = '';
  _habitEditIdx = null;
}
function deleteHabit(idx) {
  const h = HABITS[idx]; if (!h) return;
  document.getElementById('habitDelTxt').textContent = `"${h.l}" alışkanlığı silinsin mi?`;
  document.getElementById('habitDelOk').onclick = () => {
    HABITS.splice(idx, 1); save(); renderHabits();
    closeModal('habitDelModal'); toast('Alışkanlık silindi', 'i');
  };
  document.getElementById('habitDelModal').classList.add('on');
}

/* ── RENDER: KATEGORİ SÜRELERİ ── */
function renderCatTimes() {
  const d = today(), ct = S.catTime[d] || {};
  document.getElementById('catTimes').innerHTML = Object.entries(CATS).map(([k,c]) =>
    `<div class="ctrow">
      <div class="ct-ico">${esc(c.i)}</div>
      <div class="ct-nm" style="color:${safeColor(c.c)}">${esc(c.l)}</div>
      <div class="ct-v">${ct[k] ? fmtSec(ct[k]) : '—'}</div>
    </div>`
  ).join('');
}

/* ── RENDER: GÖREVLER ── */
function updatePgHdr() {
  const c = activeCat ? CATS[activeCat] : null;
  document.getElementById('pgTitle').textContent = c ? `${c.i} ${c.l}` : '🗂️ Tüm Görevler';
  const pend = S.tasks.filter(t => (activeCat ? t.cat === activeCat : true) && !t.done).length;
  document.getElementById('pgSub').textContent = c ? `${pend} bekleyen görev` : 'Tüm kategoriler';
}
function subStats(t) {
  const arr  = Array.isArray(t.subs) ? t.subs : [];
  const done = arr.filter(s => s?.done).length;
  return {done, total:arr.length, full:arr.length>0 && done===arr.length};
}
function toggleTaskExpand(id) {
  expandedTasks.has(id) ? expandedTasks.delete(id) : expandedTasks.add(id);
  renderTasks();
}
function renderTasks() {
  updatePgHdr();
  let tasks = S.tasks.slice();
  if (activeCat) tasks = tasks.filter(t => t.cat === activeCat);
  const q = (document.getElementById('searchInp').value || '').toLowerCase();
  if (q) tasks = tasks.filter(t =>
    t.name.toLowerCase().includes(q) || (t.note||'').toLowerCase().includes(q) || (t.tag||'').toLowerCase().includes(q)
  );
  if (statusF === 'pending') tasks = tasks.filter(t => !t.done);
  else if (statusF === 'done') tasks = tasks.filter(t => t.done);
  else if (statusF === 'today') tasks = tasks.filter(isTaskDueToday);
  const sortV = document.getElementById('sortSel').value;
  const po = {yuksek:0, orta:1, dusuk:2};
  tasks.sort((a,b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    if (sortV==='priority') return (po[a.pri]||1) - (po[b.pri]||1);
    if (sortV==='due') { if (!a.due&&!b.due) return 0; if (!a.due) return 1; if (!b.due) return -1; return a.due.localeCompare(b.due); }
    if (sortV==='name') return a.name.localeCompare(b.name, 'tr');
    return new Date(b.created) - new Date(a.created);
  });
  const pend = tasks.filter(t => !t.done), done = tasks.filter(t => t.done);
  const cont = document.getElementById('taskList');
  if (!tasks.length) {
    cont.innerHTML = `<div class="empty"><div class="empty-ico">📭</div><div class="empty-txt">Hiç görev bulunamadı.</div><button class="empty-btn" onclick="openAdd()">+ Görev Ekle</button></div>`;
    return;
  }
  let html = '';
  if (pend.length) html += `<div class="tg"><div class="tg-hdr"><div class="tg-lbl">Bekliyor</div><div class="tg-cnt">${pend.length}</div><div class="tg-ln"></div></div><div class="tcards">${pend.map(tHtml).join('')}</div></div>`;
  if (done.length) html += `<div class="tg"><div class="tg-hdr"><div class="tg-lbl">Tamamlandı</div><div class="tg-cnt">${done.length}</div><div class="tg-ln"></div></div><div class="tcards">${done.map(tHtml).join('')}</div></div>`;
  cont.innerHTML = html;
}
function tHtml(t) {
  const c  = CATS[t.cat] || Object.values(CATS)[0] || {l:'?',i:'📌',c:'#9aa0b8',bg:'rgba(154,160,184,.12)'};
  const pc = {yuksek:'#f06878', orta:'#e8b84b', dusuk:'#4ade80'};
  const pb = {yuksek:'rgba(240,104,120,.12)', orta:'rgba(232,184,75,.12)', dusuk:'rgba(74,222,128,.12)'};
  const pl = {yuksek:'Yüksek', orta:'Orta', dusuk:'Düşük'};
  const st = subStats(t);
  const isExpanded = expandedTasks.has(t.id);
  const hasLong    = st.total > 5;
  let dueH = '';
  if (t.due) {
    const diff = (new Date(t.due+'T12:00:00') - new Date()) / 86400000;
    const dc   = diff < 0 ? 'color:#f06878' : diff < 1 ? 'color:#fb923c' : diff < 3 ? 'color:#e8b84b' : 'color:var(--tx3)';
    dueH = `<span class="chip" style="background:transparent;${dc}">📅 ${new Date(t.due+'T12:00:00').toLocaleDateString('tr-TR',{day:'numeric',month:'short'})}</span>`;
  }
  const tagH = t.tag ? `<span class="chip" style="background:rgba(154,160,184,.12);color:var(--tx3)">#${esc(t.tag)}</span>` : '';
  const repLabels = {gunluk:'🔄 Her Gün', haftalik:'🔄 Haftalık', aylik:'🔄 Aylık', ay_son:'🔄 Ay Sonu', her_2_gunde:'🔄 Her 2 Günde Bir', ozel:'🔄 Özel'};
  let repH = '';
  if (t.rep && t.rep !== 'yok') {
    let repTxt = repLabels[t.rep] || '🔄';
    if (t.rep === 'haftalik' && Array.isArray(t.repDays) && t.repDays.length) {
      const dn = ['Pz','Pt','Sa','Ça','Pe','Cu','Ct'];
      repTxt = '🔄 ' + t.repDays.map(d => dn[d]).join(', ');
    } else if (t.rep === 'aylik' && Array.isArray(t.repDays) && t.repDays.length) {
      repTxt = '🔄 Her ayın ' + t.repDays[0] + '.';
    }
    repH = `<span class="chip" style="background:rgba(154,160,184,.08);color:var(--tx3)">${repTxt}</span>`;
  }
  const remH = t.reminderTime && t.reminderRepeat && t.reminderRepeat !== 'none'
    ? `<span class="chip" style="background:rgba(62,207,176,.12);color:#059669">⏰ ${esc(t.reminderTime)} ${esc(t.reminderRepeat)}</span>`
    : '';
  const estH   = t.est ? `<span class="chip" style="background:rgba(154,160,184,.08);color:var(--tx3)">⏱${esc(String(t.est))}dk</span>` : '';
  const progH  = st.total ? `<span class="chip task-progress${st.full?' full':''}">✓ ${st.done}/${st.total}</span>` : '';
  const subsH  = st.total ? `<div class="tc-subs">${t.subs.map((s,i) =>
    `<div class="sub-row" onclick="toggleSub('${t.id}',${i})"><div class="sub-chk${s.done?' done':''}"></div><span class="sub-txt${s.done?' done':''}">${esc(s.text)}</span></div>`
  ).join('')}${hasLong ? `<button class="sub-more" onclick="event.stopPropagation();toggleTaskExpand('${t.id}')">${isExpanded?'Kapat':'Devamını göster ('+st.total+')'}</button>` : ''}</div>` : '';

  return `<div class="tcard${t.done?' done':''}${hasLong?' has-long-subs':''}${isExpanded?' expanded':''}">
    <div class="tcard-st" style="background:${safeColor(c.c)}"></div>
    <div class="pri-dot" style="background:${pc[t.pri]||'#9aa0b8'}"></div>
    <div class="chk${t.done?' done':''}" onclick="toggleTask('${t.id}')"></div>
    <div class="tc-body">
      <div class="tc-title">${esc(t.name)}</div>
      <div class="tc-meta">
        <span class="chip" style="background:${safeColor(c.bg)};color:${safeColor(c.c)}">${esc(c.i)} ${esc(c.l)}</span>
        <span class="chip" style="background:${pb[t.pri]};color:${pc[t.pri]}">${pl[t.pri]}</span>
        ${progH}${dueH}${tagH}${repH}${remH}${estH}
      </div>
      ${t.note ? `<div class="tc-note">${esc(t.note)}</div>` : ''}
      ${subsH}
    </div>
    <div class="tc-side"><div class="tc-acts">
      <button class="tact edit" onclick="openEdit('${t.id}')" title="Düzenle">✏️</button>
      <button class="tact"      onclick="confirmDel('${t.id}')" title="Sil">🗑️</button>
    </div></div>
  </div>`;
}

/* ── RENDER: TAKVİM ── */
function selectCalendarDay(ds) { selectedDate = ds; renderCalendar(); }
function renderCalendar() {
  const td  = today();
  if (!selectedDate) selectedDate = td;
  const sel = new Date(selectedDate + 'T12:00:00');
  const year= sel.getFullYear(), month = sel.getMonth();
  const first = new Date(year, month, 1);
  const start = new Date(first);
  start.setDate(first.getDate() - (first.getDay() === 0 ? 6 : first.getDay()-1));
  const dnames = ['PTS','SAL','ÇAR','PER','CUM','CMT','PAZ'];
  document.getElementById('calSub').textContent =
    new Date(selectedDate+'T12:00:00').toLocaleDateString('tr-TR',{day:'numeric',month:'long',year:'numeric',weekday:'long'}) + ' için planlama';
  const mt = document.getElementById('monthTitle');
  if (mt) mt.textContent = sel.toLocaleDateString('tr-TR', {month:'long', year:'numeric'});
  const heads = dnames.map(d => `<div class="mday-head">${d}</div>`).join('');
  const days  = Array.from({length:42}, (_,i) => {
    const d = new Date(start); d.setDate(start.getDate() + i);
    const ds   = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    const isT  = ds === td, isSel = ds === selectedDate, other = d.getMonth() !== month;
    const tasks= S.tasks.filter(t => t.due === ds);
    const dots = tasks.slice(0,6).map(t =>
      `<div class="wdot" style="background:${safeColor(CATS[t.cat]?.c||'#9aa0b8')};opacity:${t.done?1:.4}"></div>`
    ).join('');
    const label= tasks.length
      ? `<div class="wday-tasks">${tasks.length} görev</div>`
      : `<div class="wday-add">+ ekle</div>`;
    return `<div class="wday${isT?' today':''}${isSel?' sel':''}${other?' other':''}"
      onclick="selectCalendarDay('${ds}')"
      ondblclick="selectCalendarDay('${ds}');openAddForSelectedDay()">
      <div class="wday-n">${d.getDate()}</div>
      <div class="wdots">${dots}</div>
      ${label}
    </div>`;
  }).join('');
  document.getElementById('wgrid').innerHTML = heads + days;
}
function changeMonth(delta) {
  if (!selectedDate) selectedDate = today();
  const d = new Date(selectedDate + 'T12:00:00');
  const day = d.getDate(); d.setDate(1); d.setMonth(d.getMonth() + delta);
  const last = new Date(d.getFullYear(), d.getMonth()+1, 0).getDate();
  d.setDate(Math.min(day, last));
  selectedDate = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  renderCalendar();
}

/* ── RENDER: ANALİTİK ── */
function habitRate(id, days) {
  let done = 0;
  for (let i = 0; i < days; i++) if (S.habits[dOff(i)]?.[id]) done++;
  return {done, total:days, pct: Math.round(done/(days||1)*100)};
}
function longestStreak(id, days=365) {
  let best = 0, cur = 0;
  for (let i = days-1; i >= 0; i--) {
    if (S.habits[dOff(i)]?.[id]) { cur++; best = Math.max(best,cur); } else cur = 0;
  }
  return best;
}
function habitSeriesHtml() {
  if (!HABITS.length) return '';
  const cards = HABITS.map(h => {
    const r7   = habitRate(h.id, 7);
    const r30  = habitRate(h.id, 30);
    const cur  = streak(h.id);
    const best = longestStreak(h.id, 365);
    const dots = Array.from({length:7}, (_,i) => {
      const ds   = dOff(6-i);
      const isDone = !!(S.habits[ds]?.[h.id]);
      return `<div class="sc-day${isDone?' done':''}${ds===today()?' today':''}" title="${ds}">${isDone?'✓':''}</div>`;
    }).join('');
    return `<div class="series-card">
      <div class="sc-top"><div class="sc-name"><span class="sc-label">${esc(h.l)}</span></div><div class="sc-streak">🔥 ${cur}</div></div>
      <div class="sc-metrics">
        <div class="sc-metric"><strong>%${r7.pct}</strong><span>7 Gün</span></div>
        <div class="sc-metric"><strong>${best}</strong><span>En Uzun</span></div>
      </div>
      <div class="sc-prog"><div class="sc-fill" style="width:${r30.pct}%"></div></div>
      <div class="sc-sub">30 gün: ${r30.done}/${r30.total} · %${r30.pct}</div>
      <div class="sc-days">${dots}</div>
    </div>`;
  }).join('');
  return `<div class="series-title">🔥 Alışkanlık Serileri</div><div class="series-grid">${cards}</div>`;
}
// H-06: Haftalık tekrar repDays dizisini de kontrol ediyor
function taskOccursOn(t, ds) {
  if (t.due === ds) return true;
  const rep = t.rep || 'yok'; if (rep === 'yok') return false;
  const start = t.due || (t.created?.slice(0,10) || today());
  if (!start || ds < start || ds > today()) return false;
  const d1 = new Date(start+'T12:00:00'), d2 = new Date(ds+'T12:00:00');
  const diff = Math.round((d2-d1)/86400000); if (diff < 0) return false;
  if (rep === 'gunluk') return true;
  if (rep === 'haftalik') {
    // repDays varsa haftanın belirli günlerini kontrol et
    if (Array.isArray(t.repDays) && t.repDays.length) {
      return t.repDays.includes(d2.getDay());
    }
    return diff % 7 === 0;
  }
  if (rep === 'aylik') {
    if (Array.isArray(t.repDays) && t.repDays.length) {
      return t.repDays.includes(d2.getDate());
    }
    return d1.getDate() === d2.getDate();
  }
  if (rep === 'her_2_gunde') return diff % 2 === 0;
  if (rep === 'ozel' && t.repInterval > 1) return diff % t.repInterval === 0;
  return false;
}
function catSeriesHtml() {
  const cards = Object.entries(CATS).map(([k,c]) => {
    let streak2=0, best=0, cur2=0, done7=0, total7=0, done30=0, total30=0;
    const arr = Array.from({length:7},(_,i)=>dOff(6-i));
    const dots = arr.map((ds,i) => {
      const list  = S.tasks.filter(t => t.cat===k && taskOccursOn(t,ds));
      const done  = list.filter(t => (t.completedAt?.slice(0,10)===ds)||(t.due===ds&&t.done)).length;
      if (i >= 7-7) { done7+=done; total7+=list.length; }
      done30+=done; total30+=list.length;
      const cls = list.length===0?'':done===list.length?'done':'partial';
      return `<div class="sc-day ${cls}${ds===today()?' today':''}" title="${ds}">${done===list.length&&list.length?'✓':done||''}</div>`;
    }).join('');
    for (let i=0;i<30;i++){
      const list=S.tasks.filter(t=>t.cat===k&&taskOccursOn(t,dOff(i)));
      const dn=list.filter(t=>(t.completedAt?.slice(0,10)===dOff(i))||(t.due===dOff(i)&&t.done)).length;
      if(list.length>0&&dn===list.length){streak2++;best=Math.max(best,streak2);}else streak2=0;
    }
    const p7  = total7  ? Math.round(done7/total7*100)   : 0;
    const p30 = total30 ? Math.round(done30/total30*100) : 0;
    return `<div class="series-card">
      <div class="sc-top"><div class="sc-name"><span style="font-size:.95rem">${esc(c.i)}</span><span class="sc-label">${esc(c.l)}</span></div><div class="sc-streak">🔥 ${streak2}</div></div>
      <div class="sc-metrics">
        <div class="sc-metric"><strong>%${p7}</strong><span>7 Gün</span></div>
        <div class="sc-metric"><strong>${best}</strong><span>En Uzun</span></div>
      </div>
      <div class="sc-prog"><div class="sc-fill" style="width:${p30}%;background:${safeColor(c.c)}"></div></div>
      <div class="sc-sub">30 gün: ${done30}/${total30} · %${p30}</div>
      <div class="sc-days">${dots}</div>
    </div>`;
  }).join('');
  return `<div class="series-title">📈 Kategori Seri Takibi</div><div class="series-grid">${cards}</div>`;
}
function renderAnalytics() {
  const total  = S.tasks.length;
  const done   = S.tasks.filter(t => t.done).length;
  const over   = S.tasks.filter(t => t.due && t.due < today() && !t.done).length;
  const d      = today();
  const focus  = Object.values(S.catTime[d]||{}).reduce((a,b)=>a+b,0);
  const sess   = S.timerSess[d] || 0;
  const cards  = [
    {v:total,      l:'Toplam Görev',  c:'var(--tx)'},
    {v:done,       l:'Tamamlanan',    c:'var(--grn)', tr:'%'+Math.round(done/(total||1)*100)+' oran'},
    {v:total-done, l:'Bekleyen',      c:'var(--gold)'},
    {v:over,       l:'Geciken',       c:'var(--rose)'},
    {v:focus?fmtSec(focus):'0dk', l:'Bugün Odak', c:'var(--teal)'},
    {v:sess,       l:'Pomodoro',      c:'var(--pur)'},
  ];
  document.getElementById('agrid').innerHTML = cards.map(x =>
    `<div class="acard"><div class="aval" style="color:${x.c}">${x.v}</div><div class="albl">${x.l}</div>${x.tr?`<div class="atrend">${x.tr}</div>`:''}</div>`
  ).join('');
  document.getElementById('aperf').innerHTML = habitSeriesHtml() + catSeriesHtml();
}

/* ── RENDER: SAAT ── */
function renderClock() {
  const n = new Date();
  document.getElementById('clockEl').textContent = n.toLocaleTimeString('tr-TR');
  const dn = ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'];
  document.getElementById('dateEl').textContent = dn[n.getDay()] + ', ' + n.toLocaleDateString('tr-TR',{day:'numeric',month:'long'});
}

/* ── TOAST ── */
function toast(msg, type) {
  const icons = {s:'✅',e:'❌',i:'ℹ️',w:'⚠️'};
  const tc = document.getElementById('tc');
  const el = document.createElement('div');
  el.className = 'toast ' + type;
  el.innerHTML = `<span>${esc(icons[type]||'')}</span><span>${esc(msg)}</span>`;
  tc.appendChild(el);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('show')));
  setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 320); }, 2800);
}

/* ── SIFIRLAMA PANELİ ── */
function dailyReset() {
  showConfirm(
    '↺ Günlük Sıfırla',
    'Bugünün işaretleri sıfırlansın mı?',
    '• Görev işaretleri (tekrarlı & bugünlük)\n• Namaz, zikir, alışkanlık tikleri temizlenir\n• Görevler ve kategoriler korunur',
    '↺ Sıfırla',
    () => {
      const td = today(); let n = 0;
      S.tasks.forEach(t => { if (isTaskDueToday(t) && t.done) { t.done=false; t.completedAt=null; t.subs?.forEach(s=>s.done=false); n++; } });
      if (S.prayers)   delete S.prayers[td];
      if (S.habits)    delete S.habits[td];
      if (S.zikirDone) delete S.zikirDone[td];
      save(); render(); toast(`Günlük işaretler sıfırlandı. Görev: ${n}`, 's');
    },
    false
  );
}
function trackingReset() {
  showConfirm(
    '📊 Takip Verilerini Sıfırla',
    'Takip verileri sıfırlansın mı?',
    'Silinir: Alışkanlık geçmişi, namaz, zikir, odaklanma süreleri\nKalır: Görevler, kategoriler, alışkanlık isimleri',
    '📊 Sıfırla',
    () => {
      S.prayers={}; S.habits={}; S.zikirDone={}; S.catTime={}; S.timerSess={};
      S.tasks.forEach(t => t.completedAt=null);
      save(); render(); toast('Takip verileri sıfırlandı.', 's');
    },
    true
  );
}
function factoryReset() {
  // H-13: prompt() kaldırıldı — factoryModal (text input) kullanılıyor
  const inp = document.getElementById('factoryConfirmInp');
  if (inp) inp.value = '';
  const btn = document.getElementById('factoryOkBtn');
  if (btn) { btn.disabled = true; btn.style.opacity = '0.4'; btn.style.cursor = 'not-allowed'; }
  document.getElementById('factoryModal').classList.add('on');
  setTimeout(() => inp?.focus(), 80);
}
function factoryCheckInput(inp) {
  const ok = inp.value === 'SIFIRLA';
  const btn = document.getElementById('factoryOkBtn');
  btn.disabled = !ok;
  btn.style.opacity = ok ? '1' : '0.4';
  btn.style.cursor  = ok ? 'pointer' : 'not-allowed';
}
function doFactoryReset() {
  closeModal('factoryModal');
  localStorage.removeItem('ht6'); localStorage.removeItem('ht5');
  CATS   = JSON.parse(JSON.stringify(DEFAULT_CATS));
  HABITS = JSON.parse(JSON.stringify(DEFAULT_HABITS));
  S = {tasks:[], prayers:{}, habits:{}, zikirDone:{}, catTime:{}, timerSess:{},
       theme:'dark', cats:null, habitDefs:null, lastReset:'', notifEnabled:false, namazCity:'Konya',
       autoBackup:false, lastBackup:'', lat:null, lng:null};
  selectedDate = today(); activeCat = null; statusF = 'all';
  applyTheme('dark'); save(); render(); renderSelects();
  toast('Fabrika ayarlarına dönüldü.', 's');
}

/* ── ANA RENDER ── */
function render() {
  renderCatCards();
  renderDayProg();
  renderNamaz();
  renderCalendar();
  renderTasks();
  renderHabits();
  renderSessions();
  renderCatTimes();
  drawTimer();
  if (document.getElementById('v-analytics').classList.contains('on')) renderAnalytics();
}

/* ── TOHUM VERİSİ ── */
function seed() {
  if (S.tasks.length > 0) return;
  const defs = [
    {name:'Sabah namazını kıl',         cat:'dini',     pri:'yuksek', rep:'gunluk',   tag:'namaz'},
    {name:'Öğle namazını kıl',          cat:'dini',     pri:'yuksek', rep:'gunluk',   tag:'namaz'},
    {name:'İkindi namazını kıl',        cat:'dini',     pri:'yuksek', rep:'gunluk',   tag:'namaz'},
    {name:'Akşam namazını kıl',         cat:'dini',     pri:'yuksek', rep:'gunluk',   tag:'namaz'},
    {name:'Yatsı namazını kıl',         cat:'dini',     pri:'yuksek', rep:'gunluk',   tag:'namaz'},
    // H-09: repDays:[5] = Cuma (0=Pazar,...,5=Cuma,6=Cumartesi)
    {name:'Cuma namazına git',          cat:'dini',     pri:'yuksek', rep:'haftalik', repDays:[5], tag:'namaz'},
    {name:'Sabah sünnetini kıl',        cat:'dini',     pri:'orta',   rep:'gunluk'},
    {name:'Kuran tilâveti (min 1 sayfa)',cat:'kuran',   pri:'yuksek', rep:'gunluk',   est:'15', note:'Mümkünse sesli oku'},
    {name:'Sabah zikirleri',            cat:'kuran',    pri:'yuksek', rep:'gunluk',   est:'10'},
    {name:'Akşam zikirleri',            cat:'kuran',    pri:'yuksek', rep:'gunluk',   est:'10'},
    {name:'Ayetel Kürsi',               cat:'kuran',    pri:'orta',   rep:'gunluk'},
    {name:'İhlas-Felak-Nas (3 kez)',    cat:'kuran',    pri:'orta',   rep:'gunluk'},
    {name:'100 İstiğfar',               cat:'kuran',    pri:'orta',   rep:'gunluk'},
    {name:'bilisimcihocam.com kontrol', cat:'platform', pri:'yuksek', rep:'gunluk',   est:'15', note:'Yorum, mesaj, hata'},
    {name:'Yeni blog yazısı',           cat:'platform', pri:'orta',   rep:'haftalik', est:'90'},
    {name:'Sosyal medya paylaşımı',     cat:'platform', pri:'orta',   rep:'gunluk',   est:'15'},
    {name:'YouTube ders videosu',       cat:'platform', pri:'orta',   rep:'haftalik', est:'120'},
    {name:'Günlük ders planı hazırla',  cat:'okul',     pri:'yuksek', rep:'gunluk',   est:'15'},
    {name:'Sınav soruları hazırla',     cat:'okul',     pri:'orta',   rep:'haftalik', est:'60'},
    {name:'Öğrenci notları E-okul\'a işle',cat:'okul',  pri:'orta',   rep:'haftalik', est:'30'},
    {name:'Eşinle baş başa konuşma',    cat:'aile',     pri:'yuksek', rep:'gunluk',   est:'20'},
    {name:'Çocuklarla oyun / sohbet',   cat:'aile',     pri:'yuksek', rep:'gunluk',   est:'45'},
    {name:'Çocukların ödevlerine bak',  cat:'aile',     pri:'yuksek', rep:'gunluk',   est:'30'},
    {name:'Anne-babayı ara',            cat:'aile',     pri:'yuksek', rep:'gunluk',   est:'10'},
    {name:'Kitap oku (min 20 dk)',       cat:'kitap',    pri:'yuksek', rep:'gunluk',   est:'20'},
    {name:'Podcast / sesli kitap',      cat:'kitap',    pri:'orta',   rep:'gunluk',   est:'30', note:'Yürüyüşte'},
    {name:'Haftalık öğrendiklerini yaz',cat:'kitap',    pri:'dusuk',  rep:'haftalik', est:'20'},
  ];
  S.tasks = defs.map(d => ({
    id:gid(), done:false, subs:[], created:new Date().toISOString(), completedAt:null,
    due:'', note:d.note||'', tag:d.tag||'', est:d.est||'',
    rep:d.rep||'yok', repDays:d.repDays||[], pri:d.pri||'orta', cat:d.cat||'diger', name:d.name,
  }));
}

/* ── KEYBOARD KISAYOLLARI ── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    ['taskModal','confModal','catModal','settingsModal','habitModal','habitDelModal','factoryModal'].forEach(closeModal);
    closeHabitModal();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'n' && !e.shiftKey) { e.preventDefault(); openAdd(); }
});

/* ── SES KILIT AÇ ── */
document.addEventListener('click', unlockAudio, {once: true});

/* ── PWA ── */
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault(); deferredPrompt = e;
  if (!localStorage.getItem('pwaDismissed'))
    document.getElementById('pwaBanner').classList.add('show');
});
function pwsInstall() {
  if (deferredPrompt) { deferredPrompt.prompt(); deferredPrompt.userChoice.then(() => { deferredPrompt = null; pwaDismiss(); }); }
}
function pwaDismiss() {
  document.getElementById('pwaBanner').classList.remove('show');
  localStorage.setItem('pwaDismissed','1');
}
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js').then(reg => {
    // Service Worker güncellemesi varsa kullanıcıyı bilgilendir
    reg.addEventListener('updatefound', () => {
      const newSW = reg.installing;
      if (!newSW) return;
      newSW.addEventListener('statechange', () => {
        if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
          toast('Yeni sürüm mevcut! Sayfayı yenileyin.', 'i');
        }
      });
    });
  }).catch(() => {});
}

/* ── ÇEVRİMDIŞI GÖSTERGESİ ── */
function updateOnlineStatus() {
  const banner = document.getElementById('offlineBanner');
  if (!banner) return;
  if (!navigator.onLine) {
    banner.style.display = 'block';
    requestAnimationFrame(() => banner.classList.add('show'));
  } else {
    banner.classList.remove('show');
    setTimeout(() => { if (banner.classList.contains('show') === false) banner.style.display = 'none'; }, 300);
  }
}
window.addEventListener('online',  updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
// Sayfa yüklenirken de kontrol et
updateOnlineStatus();

/* ═══════════════════════════════════════════
   BAŞLATMA
═══════════════════════════════════════════ */
load();
autoReset();
seed();
renderSelects();
renderColorPresets();
applyTheme(S.theme || 'dark');
updateNotifBtn();
if (S.notifEnabled && Notification.permission === 'granted') scheduleNotifs();
save();
render();
renderClock();
// H-15: Saat saniyeyi gösterdiğinden 1s aralığı doğru; tarih güncellenmesi dakikada bir yeterli
setInterval(renderClock, 1000);
// Namaz vakitlerini dakikada bir güncelle
setInterval(renderNamaz, 60000);
// Sabah 04:00'da namaz vakitlerini yeniden çek ve otomatik sıfırla
setInterval(() => {
  const now = new Date();
  if (now.getHours() === 4 && now.getMinutes() === 0) { fetchPrayerTimes(); autoReset(); }
}, 60000);
// Namaz vakitleri: önce localStorage cache'den dene, sonra API
(function fetchPrayerWithCache() {
  try {
    const cached = localStorage.getItem('ht6-prayer-cache');
    if (cached) {
      const { date, prayers } = JSON.parse(cached);
      if (date === today() && Array.isArray(prayers)) {
        PRAYERS = prayers;
        document.getElementById('namazSource').textContent = '💾 Önbellek — ' + (S.namazCity||'Konya');
        renderNamaz();
        if (S.notifEnabled) scheduleNotifs();
        return; // cache geçerli, API çağrısına gerek yok
      }
    }
  } catch(e) {}
  fetchPrayerTimes();
})();

