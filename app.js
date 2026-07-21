
'use strict';

/* ── RENK PALETİ ── */
const COLOR_PALETTE = [
  { hex: '#e8b84b', bg: 'rgba(232,184,75,.12)' },
  { hex: '#fb923c', bg: 'rgba(251,146,60,.12)' },
  { hex: '#3ecfb0', bg: 'rgba(62,207,176,.12)' },
  { hex: '#5b9cf6', bg: 'rgba(91,156,246,.12)' },
  { hex: '#a78bfa', bg: 'rgba(167,139,250,.12)' },
  { hex: '#f06878', bg: 'rgba(240,104,120,.12)' },
  { hex: '#4ade80', bg: 'rgba(74,222,128,.12)' },
  { hex: '#f472b6', bg: 'rgba(244,114,182,.12)' },
  { hex: '#38bdf8', bg: 'rgba(56,189,248,.12)' },
  { hex: '#a3e635', bg: 'rgba(163,230,53,.12)' },
  { hex: '#e879f9', bg: 'rgba(232,121,249,.12)' },
  { hex: '#9aa0b8', bg: 'rgba(154,160,184,.12)' },
];

/* ── VARSAYILAN KATEGORİLER ── */
const DEFAULT_CATS = {
  dini: { l: 'Dini Görevler', i: '🤲', c: '#e8b84b', bg: 'rgba(232,184,75,.12)' },
  kuran: { l: 'Kuran & Zikir', i: '📖', c: '#fb923c', bg: 'rgba(251,146,60,.12)' },
  platform: { l: 'bilisimcihocam', i: '💻', c: '#3ecfb0', bg: 'rgba(62,207,176,.12)' },
  okul: { l: 'Öğretmenlik', i: '🎓', c: '#5b9cf6', bg: 'rgba(91,156,246,.12)' },
  aile: { l: 'Aile', i: '❤️', c: '#a78bfa', bg: 'rgba(167,139,250,.12)' },
  kitap: { l: 'Kitap & Gelişim', i: '📚', c: '#f06878', bg: 'rgba(240,104,120,.12)' },
  diger: { l: 'Diğer', i: '📌', c: '#9aa0b8', bg: 'rgba(154,160,184,.12)' },
};

/* ── VARSAYILAN ALIŞKANLIKLAR ── */
const DEFAULT_HABITS = [
  { id: 's_zikir', l: '🌅 Sabah Zikirleri' },
  { id: 'a_zikir', l: '🌆 Akşam Zikirleri' },
  { id: 'kuran', l: '📖 Kuran Tilâveti' },
  { id: 'kitap', l: '📚 Kitap Okuma' },
  { id: 'yuruyus', l: '🚶 Yürüyüş' },
  { id: 'su', l: '💧 Su (8 bardak)' },
];

/* ── ZİKİR LİSTESİ ── */
let DAILY_ZIKIR = [
  { t: 'Subhânallâh', n: '33 defa' },
  { t: 'Elhamdülillâh', n: '33 defa' },
  { t: 'Allâhu Ekber', n: '33 defa' },
  { t: 'Lâ ilâhe illallâh', n: '100 defa' },
  { t: 'Estağfirullâh', n: '100 defa' },
  { t: 'Yâ Hayyu Yâ Kayyûm', n: '21 defa' },
  { t: 'Lâ havle velâ kuvvete illâ billâh', n: '21 defa' },
  { t: 'Sübhânallâhi ve bihamdihî', n: '100 defa' },
  { t: 'Allâhümme salli alâ seyyidinâ Muhammed', n: '33 defa' },
  { t: 'Hasbiyallâhu lâ ilâhe illâ Hû', n: '7 defa' },
  { t: 'Rabbi zidnî ilmâ', n: '21 defa' },
  { t: 'Yâ Latîf', n: '129 defa' },
  { t: 'Yâ Rahmân Yâ Rahîm', n: '33 defa' },
  { t: 'Sübhânellâhi velhamdülillâhi ve lâ ilâhe illallâhu vallâhu ekber', n: '33 defa' },
  { t: 'Hasbünallâhu ve ni\'mel vekîl', n: '33 defa' },
  { t: 'Rabbenâ âtinâ fid-dünyâ haseneten…', n: '7 defa' },
  { t: 'Yâ Fettâh', n: '33 defa' },
  { t: 'Yâ Vedûd', n: '33 defa' },
  { t: 'Bismillâhirrahmânirrahîm', n: '100 defa' },
  { t: 'Elhamdülillâhi alâ külli hâl', n: '33 defa' },
];

/* ── GÜNLÜK İÇERİK (data/*.json'dan yüklenir, yüklenene kadar fallback) ── */
let DAILY_AYATS = [
  { t: "Şüphesiz güçlükle beraber bir kolaylık vardır.", s: "İnşirâh 94/5" },
  { t: "Allah, hiç kimseye gücünün üstünde bir yük yüklemez.", s: "Bakara 2/286" },
];
let DAILY_HADITHS = [
  { t: "Merhamet etmeyene merhamet olunmaz.", s: "Buhârî, Edeb, 18" },
  { t: "Temizlik imanın yarısıdır.", s: "Müslim, Tahâret, 1" },
];
let DAILY_DUAS = [
  { t: "Rabbim! Göğsümü genişlet, işimi kolaylaştır.", s: "Tâhâ 20/25-26" },
  { t: "Rabbimiz! Bize dünyada da iyilik ver, ahirette de iyilik ver.", s: "Bakara 2/201" },
];
let ESMA_LIST = [
  { ar: "الرَّحْمَنُ", tr: "Er-Rahmân", m: "Dünyada tüm yaratıklara sonsuz rahmet eden." },
  { ar: "الرَّحِيمُ", tr: "Er-Rahîm", m: "Ahirette müminlere özel merhamet eden." },
  { ar: "الْمَلِكُ", tr: "El-Melik", m: "Gerçek hükümdar, mutlak otorite sahibi." },
  { ar: "الْقُدُّوسُ", tr: "El-Kuddûs", m: "Her türlü noksanlıktan münezzeh, en pak olan." },
  { ar: "السَّلَامُ", tr: "Es-Selâm", m: "Esenlik kaynağı, kusursuz barış veren." },
  { ar: "الْمُؤْمِنُ", tr: "El-Mü'min", m: "İman veren, güven ve emniyet bahşeden." },
  { ar: "الْمُهَيْمِنُ", tr: "El-Müheymin", m: "Her şeye hâkim olan, gözetip koruyan." },
  { ar: "الْعَزِيزُ", tr: "El-Azîz", m: "Benzersiz güç ve yenilmez üstünlük sahibi." },
  { ar: "الْجَبَّارُ", tr: "El-Cebbâr", m: "Zulme uğrayanları haklarına kavuşturan." },
  { ar: "الْمُتَكَبِّرُ", tr: "El-Mütekebbir", m: "Sınırsız büyüklük ve yücelik sahibi." },
  { ar: "الْخَالِقُ", tr: "El-Hâlık", m: "Yoktan her şeyi yaratan, var eden." },
  { ar: "الْبَارِئُ", tr: "El-Bâri'", m: "Yarattıklarını birbirinden ayırıp düzenleyen." },
  { ar: "الْمُصَوِّرُ", tr: "El-Musavvir", m: "Varlıklara biçim ve şekil veren." },
  { ar: "الْغَفَّارُ", tr: "El-Ğaffâr", m: "Günahları tekrar tekrar bağışlayan." },
  { ar: "الْقَهَّارُ", tr: "El-Kahhâr", m: "Her şeye üstün gelen, her şeyi emri altında tutan." },
  { ar: "الْوَهَّابُ", tr: "El-Vehhâb", m: "Karşılıksız ve sürekli bağışlayan, ihsan eden." },
  { ar: "الرَّزَّاقُ", tr: "Er-Razzâk", m: "Tüm varlıkların rızkını veren." },
  { ar: "الْفَتَّاحُ", tr: "El-Fettâh", m: "Her güçlüğü açan, her sorunun çözümünü veren." },
  { ar: "الْعَلِيمُ", tr: "El-Alîm", m: "Her şeyi en ince ayrıntısına kadar bilen." },
  { ar: "الْقَابِضُ", tr: "El-Kâbız", m: "Rızkı daraltan, dilediğinden alan." },
  { ar: "الْبَاسِطُ", tr: "El-Bâsıt", m: "Rızkı genişleten, dilediğine bol veren." },
  { ar: "الْخَافِضُ", tr: "El-Hâfız", m: "Zalimleri ve kâfirleri alçaltan." },
  { ar: "الرَّافِعُ", tr: "Er-Râfi'", m: "Müminleri ve evliyasını yükselten." },
  { ar: "الْمُعِزُّ", tr: "El-Muizz", m: "Dilediğine izzet ve şeref veren." },
  { ar: "الْمُذِلُّ", tr: "El-Müzill", m: "Dilediğini zillete düşüren." },
  { ar: "السَّمِيعُ", tr: "Es-Semî'", m: "Her sesi ve duayı işiten." },
  { ar: "الْبَصِيرُ", tr: "El-Basîr", m: "Her şeyi gören, gizlisini ve aşikâresini bilen." },
  { ar: "الْحَكَمُ", tr: "El-Hakem", m: "En adil hüküm veren, hakkın ta kendisi." },
  { ar: "الْعَدْلُ", tr: "El-Adl", m: "Mutlak adalet sahibi, asla haksızlık etmeyen." },
  { ar: "اللَّطِيفُ", tr: "El-Latîf", m: "En ince sırları bilen, lütufkâr davranan." },
  { ar: "الْخَبِيرُ", tr: "El-Habîr", m: "Her şeyin iç yüzünden haberdar olan." },
  { ar: "الْحَلِيمُ", tr: "El-Halîm", m: "Çok sabırlı, acele etmeden ceza vermeyen." },
  { ar: "الْعَظِيمُ", tr: "El-Azîm", m: "Sınırsız büyüklük sahibi." },
  { ar: "الْغَفُورُ", tr: "El-Ğafûr", m: "Günahları çokça ve tam olarak bağışlayan." },
  { ar: "الشَّكُورُ", tr: "Eş-Şekûr", m: "Az ameli çok değerlendiren, mükâfatlandıran." },
  { ar: "الْعَلِيُّ", tr: "El-Aliyy", m: "En yüce, pek yüksek olan." },
  { ar: "الْكَبِيرُ", tr: "El-Kebîr", m: "Büyüklükte sınır tanımayan." },
  { ar: "الْحَفِيظُ", tr: "El-Hafîz", m: "Her şeyi koruyup muhafaza eden." },
  { ar: "الْمُقِيتُ", tr: "El-Mukît", m: "Her varlığa gücünü ve kuvvetini veren." },
  { ar: "الْحَسِيبُ", tr: "El-Hasîb", m: "Her şeyin hesabını gören, yetip artan." },
  { ar: "الْجَلِيلُ", tr: "El-Celîl", m: "Ulu ve sonsuz ihtişam sahibi." },
  { ar: "الْكَرِيمُ", tr: "El-Kerîm", m: "Sonsuz cömert, ikram sahibi." },
  { ar: "الرَّقِيبُ", tr: "Er-Rakîb", m: "Her şeyi gözetip takip eden." },
  { ar: "الْمُجِيبُ", tr: "El-Mücîb", m: "Duaları kabul eden, çağrıya cevap veren." },
  { ar: "الْوَاسِعُ", tr: "El-Vâsi'", m: "Rahmeti ve ilmi her şeyi kuşatan." },
  { ar: "الْحَكِيمُ", tr: "El-Hakîm", m: "En derin hikmet sahibi, her işi yerli yerinde." },
  { ar: "الْوَدُودُ", tr: "El-Vedûd", m: "Kullarını seven, sevilmeye layık." },
  { ar: "الْمَجِيدُ", tr: "El-Mecîd", m: "Yüce şeref ve sonsuz kerem sahibi." },
  { ar: "الْبَاعِثُ", tr: "El-Bâis", m: "Ölüleri dirilten, peygamberler gönderen." },
  { ar: "الشَّهِيدُ", tr: "Eş-Şehîd", m: "Her zaman ve her yerde hâzır ve nâzır." },
  { ar: "الْحَقُّ", tr: "El-Hak", m: "Varlığı zorunlu olan gerçek, değişmeyen." },
  { ar: "الْوَكِيلُ", tr: "El-Vekîl", m: "Her şeyin vekilliğini üstlenen, güvenilir." },
  { ar: "الْقَوِيُّ", tr: "El-Kaviyy", m: "Sonsuz güç ve kuvvet sahibi." },
  { ar: "الْمَتِينُ", tr: "El-Metîn", m: "Sağlamlıkta ve güçte rakipsiz." },
  { ar: "الْوَلِيُّ", tr: "El-Veliyy", m: "Müminlerin dostu ve yardımcısı." },
  { ar: "الْحَمِيدُ", tr: "El-Hamîd", m: "Her türlü övgü ve hamd'e layık olan." },
  { ar: "الْمُحْصِي", tr: "El-Muhsî", m: "Her şeyi sayıp kaydeden." },
  { ar: "الْمُبْدِئُ", tr: "El-Mübdi'", m: "Yaratmaya başlayan, ilk var eden." },
  { ar: "الْمُعِيدُ", tr: "El-Muîd", m: "Yok olanı yeniden var eden." },
  { ar: "الْمُحْيِي", tr: "El-Muhyî", m: "Hayat veren, canlılık bağışlayan." },
  { ar: "الْمُمِيتُ", tr: "El-Mümît", m: "Ölümü yaratan, her canlıyı öldüren." },
  { ar: "الْحَيُّ", tr: "El-Hayy", m: "Ebedî hayat sahibi, her zaman diri." },
  { ar: "الْقَيُّومُ", tr: "El-Kayyûm", m: "Kendi kendine var olan, her şeyi ayakta tutan." },
  { ar: "الْوَاجِدُ", tr: "El-Vâcid", m: "Her şeyi bulan, hiçbir şey kendisine gizli kalmayan." },
  { ar: "الْمَاجِدُ", tr: "El-Mâcid", m: "Şeref ve büyüklük sahibi." },
  { ar: "الْوَاحِدُ", tr: "El-Vâhid", m: "Tek olan, ortağı ve benzeri bulunmayan." },
  { ar: "الأَحَدُ", tr: "El-Ehad", m: "Mutlak birlik sahibi, bölünmez." },
  { ar: "الصَّمَدُ", tr: "Es-Samed", m: "Her şey ona muhtaç, o hiçbir şeye muhtaç değil." },
  { ar: "الْقَادِرُ", tr: "El-Kâdir", m: "Her şeye güç yetiren, sonsuz kudret sahibi." },
  { ar: "الْمُقْتَدِرُ", tr: "El-Muktedir", m: "Dilediği her şeyi yapmaya muktedir." },
  { ar: "الْمُقَدِّمُ", tr: "El-Mukaddim", m: "Dilediğini öne geçiren, yükselten." },
  { ar: "الْمُؤَخِّرُ", tr: "El-Muahhir", m: "Dilediğini geri bırakan, geciktiren." },
  { ar: "الأَوَّلُ", tr: "El-Evvel", m: "Başlangıcı olmayan, her şeyden önce var olan." },
  { ar: "الآخِرُ", tr: "El-Âhir", m: "Sonu olmayan, her şeyden sonra da var olan." },
  { ar: "الظَّاهِرُ", tr: "Ez-Zâhir", m: "Varlığının delilleri her yerde açıkça görünen." },
  { ar: "الْبَاطِنُ", tr: "El-Bâtın", m: "Akılların kavrayamayacağı kadar gizli olan." },
  { ar: "الْوَالِي", tr: "El-Vâlî", m: "Tüm evreni yöneten ve idare eden." },
  { ar: "الْمُتَعَالِي", tr: "El-Müteâlî", m: "Sıfatlarıyla her şeyin üzerinde yükselen." },
  { ar: "الْبَرُّ", tr: "El-Berr", m: "İyilik ve lütuf kaynağı." },
  { ar: "التَّوَّابُ", tr: "Et-Tevvâb", m: "Tövbeleri kabul eden, dönüşü kolaylaştıran." },
  { ar: "الْمُنْتَقِمُ", tr: "El-Müntakim", m: "Haksızlıkları cezalandıran." },
  { ar: "الْعَفُوُّ", tr: "El-Afüvv", m: "Günahları affeden, silen." },
  { ar: "الرَّؤُوفُ", tr: "Er-Raûf", m: "Çok şefkatli, yumuşak davranan." },
  { ar: "مَالِكُ الْمُلْكِ", tr: "Mâlikü'l-Mülk", m: "Mülkün ve hükümranlığın gerçek sahibi." },
  { ar: "ذُو الْجَلَالِ وَالإِكْرَامِ", tr: "Zü'l-Celâl", m: "Büyüklük ve ikram sahibi." },
  { ar: "الْمُقْسِطُ", tr: "El-Muksît", m: "Adaletli davranan, hakkaniyetle hükmeden." },
  { ar: "الْجَامِعُ", tr: "El-Câmi'", m: "Her şeyi bir araya getiren, toplayan." },
  { ar: "الْغَنِيُّ", tr: "El-Ğaniyy", m: "Hiçbir şeye muhtaç olmayan, zenginliği sonsuz." },
  { ar: "الْمُغْنِي", tr: "El-Muğnî", m: "Zenginlik ve yeterlilik veren." },
  { ar: "الْمَانِعُ", tr: "El-Mâni'", m: "Dilediğini engelleyen, zarar dokundurmayan." },
  { ar: "الضَّارُّ", tr: "Ed-Dârr", m: "Hikmeti gereği zarar verebilen." },
  { ar: "النَّافِعُ", tr: "En-Nâfi'", m: "Fayda veren, yararlı kılan." },
  { ar: "النُّورُ", tr: "En-Nûr", m: "Gökleri ve yeri nurlandıran." },
  { ar: "الْهَادِي", tr: "El-Hâdî", m: "Doğru yolu gösteren, hidayet eden." },
  { ar: "الْبَدِيعُ", tr: "El-Bedî'", m: "Eşsiz ve benzersiz biçimde yaratan." },
  { ar: "الْبَاقِي", tr: "El-Bâkî", m: "Ebedî olarak var olan, yok olmayan." },
  { ar: "الْوَارِثُ", tr: "El-Vâris", m: "Her şeyin gerçek varisi, sonunda her şey ona döner." },
  { ar: "الرَّشِيدُ", tr: "Er-Reşîd", m: "Doğru yolu gösteren, işleri en güzel şekilde yürüten." },
  { ar: "الصَّبُورُ", tr: "Es-Sabûr", m: "Son derece sabırlı, acele etmeden muamele eden." }
];

/* ── NAMAZ VAKİTLERİ (varsayılan — API yoksa) ── */
let PRAYERS = [
  { n: 'Sabah', t: '05:30', h: 5 },
  { n: 'Öğle', t: '12:15', h: 12 },
  { n: 'İkindi', t: '15:30', h: 15 },
  { n: 'Akşam', t: '18:45', h: 18 },
  { n: 'Yatsı', t: '20:15', h: 20 },
];

/* ── DURUM ── */
let CATS = { ...DEFAULT_CATS };
let HABITS = [...DEFAULT_HABITS];

let SUNRISE_TIME = null;
let IMSAK_TIME = null;
let AUTH_USER = null;

let S = {
  tasks: [], prayers: {}, habits: {}, zikirDone: {}, nafile: {}, qada: {},
  catTime: {}, timerSess: {}, theme: 'dark',
  cats: null, habitDefs: null, lastReset: '',
  notifEnabled: false, namazCity: 'Konya',
  autoBackup: false, lastBackup: '',
  lat: null, lng: null,
};

const NAMAZ_DAILY_AYATS = [
  {
    ar: "حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ وَقُومُوا لِلَّهِ قَانِتِينَ",
    t: "Namazlara ve orta namaza devam edin. Allah'a saygı ve bağlılık içinde namaz kılın.",
    s: "Bakara 2/238"
  },
  {
    ar: "وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ",
    t: "Namazı kılın, zekatı verin ve rüku edenlerle birlikte rüku edin.",
    s: "Bakara 2/43"
  },
  {
    ar: "إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا",
    t: "Şüphesiz namaz, müminler üzerine belirli vakitlerde yazılmış bir farzdır.",
    s: "Nisâ 4/103"
  },
  {
    ar: "وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ وَزُلَفًا مِنَ اللَّيْلِ",
    t: "Gecenin iki tarafında ve gündüzün saçaklarında namaz kıl.",
    s: "Hûd 11/114"
  },
  {
    ar: "وَسَبِّحْ بِحَمْدِ رَبِّكَ قَبْلَ طُلُوعِ الشَّمْسِ وَقَبْلَ غُرُوبِهَا",
    t: "Güneşin doğmasından önce ve batmasından önce Rabbini hamd ile tesbih et.",
    s: "Tâhâ 20/130"
  },
  {
    ar: "أَقِمِ الصَّلَاةَ لِدُلُوكِ الشَّمْسِ إِلَىٰ غَسَقِ اللَّيْلِ وَقُرْآنَ الْفَجْرِ",
    t: "Güneşin batıya yönelmesinden gecenin karanlığına kadar namaz kıl. Sabah kuranını da unutma.",
    s: "İsrâ 17/78"
  },
  {
    ar: "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ وَإِنَّهَا لَكَبِيرَةٌ إِلَّا عَلَى الْخَاشِعِينَ",
    t: "Sabır ve namazla Allah'tan yardım isteyin. Şüphesiz bu, huşu duyanlardan başkasına ağır gelir.",
    s: "Bakara 2/45"
  },
  {
    ar: "اتْلُ مَا أُوحِيَ إِلَيْكَ مِنَ الْكِتَابِ وَأَقِمِ الصَّلَاةَ ۖ إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنْكَرِ",
    t: "Kitaptan sana vahyedileni oku ve namazı kıl. Şüphesiz namaz, kötülüklerden ve hayâsızlıktan alıkoyar.",
    s: "Ankebût 29/45"
  },
  {
    ar: "قَدْ أَفْلَحَ الْمُؤْمِنُونَ الَّذِينَ هُمْ فِي صَلَاتِهِمْ خَاشِعُونَ",
    t: "Müminler kesinlikle kurtuluşa ermişlerdir; onlar ki namazlarında huşu içindedirler.",
    s: "Mü'minûn 23/1-2"
  },
  {
    ar: "وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ أُولَٰئِكَ هُمْ الْوَارِثُونَ",
    t: "Onlar ki namazlarını titizlikle korurlar. İşte varis olacaklar onlardır.",
    s: "Mü'minûn 23/9-10"
  }
];

let editId = null, tmpSubs = [], activeCat = null, statusF = 'all';
let editCatKey = null, selectedColor = COLOR_PALETTE[0];
let selectedDate = today();
let _habitEditIdx = null;
const expandedTasks = new Set();

/* ── YARDIMCI ── */
function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function gid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
function dOff(n) {
  const d = new Date(); d.setDate(d.getDate() - n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function dayOfYear() {
  const n = new Date(), s = new Date(n.getFullYear(), 0, 0);
  return Math.floor((n - s) / 86400000);
}
function initDailyQuotes() {
  const dayIdx = dayOfYear();
  const ayat = DAILY_AYATS[dayIdx % DAILY_AYATS.length];
  const hadis = DAILY_HADITHS[dayIdx % DAILY_HADITHS.length];
  const dua = DAILY_DUAS[dayIdx % DAILY_DUAS.length];

  const ayatText = document.getElementById('dailyAyatText');
  const ayatArabic = document.getElementById('dailyAyatArabic');
  const ayatSrc = document.getElementById('dailyAyatSrc');
  const hadisText = document.getElementById('dailyHadisText');
  const hadisSrc = document.getElementById('dailyHadisSrc');
  const duaText = document.getElementById('dailyDuaText');
  const duaSrc = document.getElementById('dailyDuaSrc');

  if (ayatText && ayatSrc && ayat) {
    if (ayatArabic) ayatArabic.textContent = ayat.ar || '';
    ayatText.textContent = ayat.t || '';
    ayatSrc.textContent = ayat.s || '';
  }
  if (hadisText && hadisSrc && hadis) {
    hadisText.textContent = hadis.t || '';
    hadisSrc.textContent = hadis.s || '';
  }
  if (duaText && duaSrc && dua) {
    duaText.textContent = dua.t || '';
    duaSrc.textContent = dua.s || '';
  }
  renderEsma();
  renderDailyZikir();
}
function parseYmd(s) {
  return /^\d{4}-\d{2}-\d{2}$/.test(s || '') ? new Date(s + 'T00:00:00') : null;
}
function diffDays(a, b) {
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
    const last = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
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
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
  return h ? `${h}sa ${m}dk` : `${m}dk`;
}

/* ── XSS KORUMALARI ── */
function esc(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
function safeText(s, max = 500) {
  return String(s ?? '').replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, max);
}
function safeKey(k) {
  return String(k ?? '').toLowerCase().replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '').slice(0, 32) || ('cat_' + gid());
}
function safeColor(v, fallback = '#9aa0b8') {
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
  Object.entries(base).slice(0, 80).forEach(([rawKey, raw]) => {
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
    let id = safeKey(raw.id || ('h_' + i));
    while (seen.has(id)) id = 'h_' + gid();
    seen.add(id);
    return { id, l: safeText(raw.l || 'Alışkanlık', 80) };
  });
}
function sanitizeTask(t) {
  const firstCat = Object.keys(CATS)[0] || 'diger';
  const raw = (t && typeof t === 'object') ? t : {};
  return {
    id: safeText(raw.id || gid(), 40),
    name: safeText(raw.name || 'Adsız görev', 300),
    cat: CATS[raw.cat] ? raw.cat : firstCat,
    pri: ['yuksek', 'orta', 'dusuk'].includes(raw.pri) ? raw.pri : 'orta',
    due: /^\d{4}-\d{2}-\d{2}$/.test(raw.due || '') ? raw.due : '',
    rep: ['yok', 'gunluk', 'her_2_gunde', 'haftalik', 'aylik', 'ay_son', 'ozel'].includes(raw.rep) ? raw.rep : 'yok',
    repDays: Array.isArray(raw.repDays) ? raw.repDays.filter(n => Number.isInteger(n)) : [],
    repInterval: Number.isInteger(raw.repInterval) && raw.repInterval > 1 ? raw.repInterval : null,
    repEnd: /^\d{4}-\d{2}-\d{2}$/.test(raw.repEnd || '') ? raw.repEnd : '',
    reminderTime: /^\d{2}:\d{2}$/.test(raw.reminderTime || '') ? raw.reminderTime : '',
    reminderRepeat: ['none', 'once', 'daily', 'weekly'].includes(raw.reminderRepeat) ? raw.reminderRepeat : 'none',
    est: String(raw.est || '').replace(/[^0-9]/g, '').slice(0, 4),
    tag: safeText(raw.tag || '', 40),
    note: safeText(raw.note || '', 3000),
    subs: Array.isArray(raw.subs) ? raw.subs.slice(0, 80).map(s => ({
      id: safeText(s?.id || gid(), 40),
      text: safeText(s?.text || '', 600),
      done: !!(s?.done),
    })) : [],
    done: !!(raw.done),
    created: raw.created || new Date().toISOString(),
    completedAt: typeof raw.completedAt === 'string' ? raw.completedAt : null,
  };
}
function sanitizeState(raw) {
  const def = {
    tasks: [], prayers: {}, habits: {}, zikirDone: {}, nafile: {}, qada: {},
    catTime: {}, timerSess: {}, theme: 'dark',
    cats: null, habitDefs: null, lastReset: '',
    notifEnabled: false, namazCity: 'Konya',
    autoBackup: false, lastBackup: '',
    lat: null, lng: null,
  };
  const st = Object.assign(def, (raw && typeof raw === 'object') ? raw : {});
  st.theme = st.theme === 'light' ? 'light' : 'dark';
  st.namazCity = safeText(st.namazCity || 'Konya', 40) || 'Konya';
  st.notifEnabled = !!(st.notifEnabled);
  st.autoBackup = !!(st.autoBackup);
  st.lastBackup = safeText(st.lastBackup || '', 40);
  st.lat = typeof st.lat === 'number' ? st.lat : null;
  st.lng = typeof st.lng === 'number' ? st.lng : null;
  st.lastReset = /^\d{4}-\d{2}-\d{2}$/.test(st.lastReset || '') ? st.lastReset : '';
  st.cats = normalizeCats(st.cats || CATS); CATS = st.cats;
  st.habitDefs = normalizeHabits(st.habitDefs || HABITS); HABITS = st.habitDefs;
  st.tasks = Array.isArray(st.tasks) ? st.tasks.slice(0, 3000).map(sanitizeTask) : [];
  ['prayers', 'habits', 'zikirDone', 'catTime', 'timerSess', 'nafile', 'qada'].forEach(k => {
    if (!st[k] || typeof st[k] !== 'object' || Array.isArray(st[k])) st[k] = {};
  });
  ['sabah', 'ogle', 'ikindi', 'aksam', 'yatsi', 'vitir'].forEach(k => {
    st.qada[k] = Number.isInteger(st.qada[k]) && st.qada[k] >= 0 ? st.qada[k] : 0;
  });
  if (!st.quran || typeof st.quran !== 'object') {
    st.quran = { surah: 1, surahName: 'Fâtiha', page: 1, ayah: 1, routines: {} };
  }
  return st;
}

/* ── DEPOLAMA (GÜVENLİ BROWSER STORAGE SARMALAYICISI) ── */
const safeStorage = {
  _mem: {},
  getItem(key) {
    try {
      const v = localStorage.getItem(key);
      return v !== null ? v : (this._mem[key] || null);
    } catch (e) {
      return this._mem[key] || null;
    }
  },
  setItem(key, val) {
    const sVal = String(val);
    this._mem[key] = sVal;
    try {
      localStorage.setItem(key, sVal);
    } catch (e) { }
  },
  removeItem(key) {
    delete this._mem[key];
    try {
      localStorage.removeItem(key);
    } catch (e) { }
  }
};

function load() {
  try {
    const raw = safeStorage.getItem('mikat');
    if (raw) Object.assign(S, sanitizeState(JSON.parse(raw)));
    else {
      // v5/v6 → mikat geçiş
      const old = safeStorage.getItem('mikat-v5');
      if (old) Object.assign(S, sanitizeState(JSON.parse(old)));
    }
    CATS = normalizeCats(S.cats || CATS);
    HABITS = normalizeHabits(S.habitDefs || HABITS);
    S.cats = CATS; S.habitDefs = HABITS;
  } catch (e) {
    console.warn('Kayıt okunamadı:', e);
  }
}
function save() {
  try {
    S.cats = normalizeCats(CATS);
    S.habitDefs = normalizeHabits(HABITS);
    // H-02: S nesnesini yeni bir referansla değil, mevcut nesneyi güncelleyerek sakla
    Object.assign(S, sanitizeState({ ...S }));
    safeStorage.setItem('mikat', JSON.stringify(S));
    maybeAutoBackup();
    return true;
  } catch (e) {
    console.error('Kayıt hatası:', e);
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
async function deriveKey(pw, salt, iterations = 600000) {
  const enc = new TextEncoder();
  const km = await crypto.subtle.importKey('raw', enc.encode(pw), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    km, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']
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
  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(32));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(pw, salt, 600000);
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(JSON.stringify(data)));
  const out = new Uint8Array(44 + ct.byteLength);
  out.set(salt); out.set(iv, 32); out.set(new Uint8Array(ct), 44);
  return 'MK1:' + uint8ToBase64(out);
}
async function decData(str, pw) {
  const prefix = str.slice(0, 4);
  if (prefix !== 'MK1:' && prefix !== 'HT6:' && prefix !== 'HT5:' && prefix !== 'HT4:')
    throw new Error('Geçersiz format');

  if (prefix === 'HT4:' || prefix === 'HT5:' || prefix === 'HT6:') {
    toast('Uyarı: Eski yedekleme formatı (HT4/HT5/HT6). Lütfen yeni Mikat yedeği alın.', 'w');
  }

  const buf = new Uint8Array(atob(str.slice(4)).split('').map(c => c.charCodeAt(0)));
  const salt = buf.slice(0, 32);
  const iv = buf.slice(32, 44);
  const ct = buf.slice(44);

  try {
    const key = await deriveKey(pw, salt, 600000);
    const dec = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
    return JSON.parse(new TextDecoder().decode(dec));
  } catch (e) {
    try {
      const key = await deriveKey(pw, salt, 310000);
      const dec = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
      return JSON.parse(new TextDecoder().decode(dec));
    } catch (e2) {
      throw new Error('Şifre yanlış veya veri bozuk');
    }
  }
}
async function doExport() {
  const pw = document.getElementById('epw').value.trim();
  const pw2 = document.getElementById('epw2').value.trim();
  if (!pw) { toast('Şifre girin', 'e'); return; }
  if (pw.length < 6) { toast('En az 6 karakter', 'e'); return; }
  if (pw !== pw2) { toast('Şifreler eşleşmiyor!', 'e'); return; }
  try {
    const enc = await encData(S, pw);
    document.getElementById('expOut').value = enc;
    document.getElementById('expR').style.display = 'block';
    document.getElementById('copybtn').style.display = 'block';
    document.getElementById('dlbtn').style.display = 'block';
    toast('Veri şifrelendi! Güvenli bir yere kaydedin.', 's');
  } catch (e) { toast('Hata: ' + e.message, 'e'); }
}
async function doImport() {
  const pw = document.getElementById('ipw').value.trim();
  const raw = document.getElementById('idata').value.trim();
  if (!pw) { toast('Şifre girin', 'e'); return; }
  if (!raw) { toast('Veri yapıştırın', 'e'); return; }
  try {
    const dec = await decData(raw, pw);
    Object.assign(S, sanitizeState(dec));
    CATS = normalizeCats(S.cats); HABITS = normalizeHabits(S.habitDefs);
    save(); render(); renderSelects();
    toast('Veriler başarıyla yüklendi!', 's');
    document.getElementById('idata').value = '';
    document.getElementById('ipw').value = '';
  } catch (e) { toast('Şifre yanlış veya veri bozuk!', 'e'); }
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
  a.download = 'mikat-' + today() + '.htbak';
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
  }, { timeout: 15000, enableHighAccuracy: true });
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
  // H-01: Sadece backup key'ine yaz; mikat'a tekrar yazmak save() döngüsüne neden olur
  if (!S.autoBackup) return;
  const ts = new Date().toISOString();
  const backup = { ts, data: JSON.parse(JSON.stringify(S)) };
  localStorage.setItem('mikat-auto-backup', JSON.stringify(backup));
  S.lastBackup = ts;
  // Not: mikat anahtarına tekrar yazmıyoruz — save() zaten yazdı
}
function doExportJson() {
  const data = JSON.stringify(S, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `mikat-${today()}.json`;
  a.click();
  toast('JSON indiriliyor...', 's');
}
function doExportCsv() {
  const rows = [['id', 'ad', 'kategori', 'öncelik', 'tarih', 'hatırlatıcı', 'hatırlama', 'tekrar', 'etiket', 'not', 'durum']];
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
  const csv = rows.map(r => r.map(v => `"${String(v || '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `mikat-${today()}.csv`;
  a.click();
  toast('CSV indiriliyor...', 's');
}
function restoreBackup() {
  const raw = localStorage.getItem('mikat-auto-backup');
  if (!raw) { toast('Otomatik yedek bulunamadı', 'e'); return; }
  let backup;
  try { backup = JSON.parse(raw); } catch (e) { toast('Yedek okunamadı: ' + e.message, 'e'); return; }
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
      } catch (e) { toast('Yedek yüklenemedi: ' + e.message, 'e'); }
    }
  );
}
function cTab(t, el) {
  document.querySelectorAll('.ctab').forEach(x => x.classList.remove('on'));
  el.classList.add('on');
  ['cexp', 'cimp'].forEach(id => document.getElementById(id).style.display = 'none');
  document.getElementById('c' + t).style.display = 'block';
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
  } catch (e) { }
}
function playSound(kind = 'bell') {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const now = audioCtx.currentTime;
    const freqs = kind === 'prayer' ? [660, 880, 660] : kind === 'done' ? [523, 659, 784] : [880, 660];
    freqs.forEach((f, i) => {
      const o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(f, now + i * .16);
      g.gain.setValueAtTime(0.0001, now + i * .16);
      g.gain.exponentialRampToValueAtTime(0.16, now + i * .16 + .02);
      g.gain.exponentialRampToValueAtTime(0.0001, now + i * .16 + .14);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(now + i * .16); o.stop(now + i * .16 + .15);
    });
  } catch (e) { }
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
  const now = new Date(), nowMin = now.getHours() * 60 + now.getMinutes();
  PRAYERS.forEach(p => {
    const [h, m] = p.t.split(':').map(Number);
    const diff = (h * 60 + m - nowMin) * 60000;
    if (diff > 0 && diff < 86400000) {
      notifTimers.push(setTimeout(() => {
        if (S.notifEnabled && Notification.permission === 'granted') {
          playSound('prayer');
          new Notification('🕌 ' + p.n + ' Vakti', { body: p.t + ' — Namaz vakti geldi', tag: 'namaz-' + p.n });
        }
      }, diff));
    }
  });
  S.tasks.filter(t => !t.done).forEach(task => {
    if (task.reminderTime && task.reminderRepeat && task.reminderRepeat !== 'none') {
      const [h, m] = task.reminderTime.split(':').map(Number);
      const remindAt = new Date();
      remindAt.setHours(h, m, 0, 0);
      const diff = remindAt - now;
      if (diff > 0 && diff < 86400000) {
        // H-07: Operatör önceliği netleştirildi — her koşul ayrı paranteze alındı
        const valid = (task.reminderRepeat === 'daily')
          || (task.reminderRepeat === 'weekly' && (new Date(task.due + 'T00:00:00').getDay() === now.getDay() || !task.due))
          || (task.reminderRepeat === 'once' && task.due === today());
        if (valid) {
          notifTimers.push(setTimeout(() => {
            if (S.notifEnabled && Notification.permission === 'granted' && !task.done) {
              playSound('bell');
              new Notification('⏰ Görev Hatırlatıcı', { body: task.name, tag: 'task-' + task.id });
            }
          }, diff));
        }
      }
    }
  });
}
function updateNotifBtn() { document.getElementById('notifBtn').classList.toggle('on', !!S.notifEnabled); }

/* ── NAMAZ VAKİTLERİ ── */
async function fetchPrayerTimes() {
  try {
    // Önce cache kontrol et — aynı gün + aynı şehir ise API'ye gitme
    try {
      const cached = JSON.parse(localStorage.getItem('mikat-prayer-cache') || 'null');
      if (cached && cached.date === today() && cached.city === (S.namazCity || 'Konya')) {
        PRAYERS = cached.prayers;
        SUNRISE_TIME = cached.sunrise || null;
        IMSAK_TIME = cached.imsak || null;
        document.getElementById('namazSource').textContent = '📦 Önbellekten — ' + S.namazCity;
        renderNamaz();
        renderHeaderPrayerVakit();
        initHeaderAssistant();
        if (S.notifEnabled) scheduleNotifs();
        return;
      }
    } catch (e) { }

    const r = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(S.namazCity || 'Konya')}&country=TR&method=13`);
    if (!r.ok) throw new Error('API hatası');
    const j = await r.json();
    const t = j.data.timings;
    SUNRISE_TIME = t.Sunrise.slice(0, 5);
    IMSAK_TIME = t.Imsak ? t.Imsak.slice(0, 5) : null;
    PRAYERS = [
      { n: 'Sabah', t: t.Fajr.slice(0, 5), h: parseInt(t.Fajr) },
      { n: 'Öğle', t: t.Dhuhr.slice(0, 5), h: parseInt(t.Dhuhr) },
      { n: 'İkindi', t: t.Asr.slice(0, 5), h: parseInt(t.Asr) },
      { n: 'Akşam', t: t.Maghrib.slice(0, 5), h: parseInt(t.Maghrib) },
      { n: 'Yatsı', t: t.Isha.slice(0, 5), h: parseInt(t.Isha) },
    ];
    // Günlük cache — aynı günde tekrar API çağrısını önler
    try { localStorage.setItem('mikat-prayer-cache', JSON.stringify({ date: today(), city: S.namazCity || 'Konya', prayers: PRAYERS, sunrise: SUNRISE_TIME, imsak: IMSAK_TIME })); } catch (e) { }
    document.getElementById('namazSource').textContent = '🌐 Canlı veri — ' + S.namazCity;
    renderNamaz();
    renderHeaderPrayerVakit();
    initHeaderAssistant();
    if (S.notifEnabled) scheduleNotifs();
  } catch (e) {
    document.getElementById('namazSource').textContent = '📡 Çevrimdışı — varsayılan saatler';
    renderHeaderPrayerVakit();
    initHeaderAssistant();
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

function isTaskForToday(t) {
  if (!t || typeof t !== 'object') return false;
  const td = today();
  const cAt = typeof t.completedAt === 'string' ? t.completedAt : '';
  if (t.done) {
    if (cAt && cAt.substring(0, 10) === td) return true;
    if (t.due === td) return true;
    if (!t.due && isRepeatDueOn(t, td)) return true;
    return false;
  }
  if (t.due === td) return true;
  if (t.due && t.due < td) return true;
  if (!t.due) return isRepeatDueOn(t, td);
  return false;
}

/* ── TEKRAR GÜN SEÇİCİ ── */
const WEEK_DAYS = [
  { v: 1, l: 'Pt' }, { v: 2, l: 'Sa' }, { v: 3, l: 'Ça' }, { v: 4, l: 'Pe' },
  { v: 5, l: 'Cu' }, { v: 6, l: 'Ct' }, { v: 0, l: 'Pz' }
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
      `<button type="button" class="rep-day-btn${sel.includes(d.v) ? ' on' : ''}" data-val="${d.v}" onclick="this.classList.toggle('on')">${d.l}</button>`
    ).join('');
  } else if (rep === 'aylik') {
    row.style.display = ''; lbl.textContent = 'Ayın Kaçında?';
    const sel = Array.isArray(preselect) && preselect.length ? preselect : [1];
    picker.innerHTML = Array.from({ length: 31 }, (_, i) => i + 1).map(d =>
      `<button type="button" class="rep-month-btn${sel.includes(d) ? ' on' : ''}" data-val="${d}" onclick="selectMonthDay(this)">${d}</button>`
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
  ['fName', 'fNote', 'fDue', 'fTag', 'fReminder', 'fRepInterval', 'fRepEnd'].forEach(id => document.getElementById(id).value = '');
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
  document.getElementById('fCat').value = t.cat;
  document.getElementById('fPri').value = t.pri;
  document.getElementById('fDue').value = t.due || '';
  document.getElementById('fReminder').value = t.reminderTime || '';
  document.getElementById('fRemRep').value = t.reminderRepeat || 'none';
  document.getElementById('fRep').value = t.rep || 'yok';
  document.getElementById('fRepInterval').value = t.repInterval || '';
  document.getElementById('fRepEnd').value = t.repEnd || '';
  document.getElementById('fEst').value = t.est || '';
  document.getElementById('fTag').value = t.tag || '';
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
    cat: document.getElementById('fCat').value,
    pri: document.getElementById('fPri').value,
    due: document.getElementById('fDue').value,
    reminderTime: document.getElementById('fReminder').value,
    reminderRepeat: document.getElementById('fRemRep').value,
    rep, repDays: getRepDays(rep),
    repInterval: parseInt(document.getElementById('fRepInterval').value, 10) || null,
    repEnd: document.getElementById('fRepEnd').value,
    est: document.getElementById('fEst').value,
    tag: document.getElementById('fTag').value.trim(),
    note: document.getElementById('fNote').value.trim(),
    subs: tmpSubs.map(s => ({ ...s })),
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
  if (t.done) triggerConfetti();
  save();
  // Sadece ilgili bölümleri render et — tüm sayfayı yeniden çizme (ticker animasyonunu bozar)
  renderTasks();
  renderCatCards();
  renderDayProg();
  if (document.getElementById('v-habits')?.classList.contains('on') || document.getElementById('v-analytics')?.classList.contains('on')) renderAnalytics();
}
function toggleSub(tid, si) {
  const t = S.tasks.find(x => x.id === tid); if (!t?.subs) return;
  t.subs[si].done = !t.subs[si].done;
  save();
  renderTasks();
  renderDayProg();
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
  tmpSubs.push({ id: gid(), text: v, done: false }); inp.value = ''; renderSubPrev();
}
function removeSub(i) { tmpSubs.splice(i, 1); renderSubPrev(); }
function renderSubPrev() {
  document.getElementById('subPrev').innerHTML = tmpSubs.map((s, i) =>
    `<div class="sp-item"><span>☐ ${esc(s.text)}</span><button onclick="removeSub(${i})">✕</button></div>`
  ).join('');
}
document.getElementById('subInp')?.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); addSub(); } });

function toggleFabQuickAdd() {
  const pop = document.getElementById('fabPopover');
  const btn = document.getElementById('fabBtn');
  if (!pop) return;
  const isOff = pop.style.display === 'none' || !pop.style.display;
  pop.style.display = isOff ? 'block' : 'none';
  if (btn) btn.classList.toggle('on', isOff);
  if (isOff) {
    setTimeout(() => document.getElementById('qaInp')?.focus(), 80);
  }
}

function appendFabTag(tag) {
  const inp = document.getElementById('qaInp');
  if (!inp) return;
  if (!inp.value.includes(tag)) {
    inp.value = (inp.value + ' ' + tag).trim() + ' ';
  }
  inp.focus();
}

/* ── HIZLI EKLE ── */
function quickAdd() {
  const inp = document.getElementById('qaInp') || document.getElementById('unifiedInput');
  if (!inp) return;
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
  const pop = document.getElementById('fabPopover');
  if (pop && pop.style.display !== 'none') toggleFabQuickAdd();
}
(document.getElementById('qaInp') || document.getElementById('unifiedInput'))?.addEventListener('keydown', e => { if (e.key === 'Enter') quickAdd(); });

/* ── FİLTRELER ── */
function filterCat(cat) {
  activeCat = cat;
  const allCard = document.getElementById('allcard');
  if (allCard) allCard.classList.toggle('on', !cat);
  renderCatCards();
  renderTasks();
  updatePgHdr();
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
  if (document.getElementById('v-habits')?.classList.contains('on') || document.getElementById('v-analytics')?.classList.contains('on')) renderAnalytics();
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
const T = { running: false, remain: 1500, total: 1500, iv: null, startedAt: null, pausedRemain: null };
function setPreset(m, el) {
  document.querySelectorAll('.tpre').forEach(b => b.classList.remove('on'));
  el.classList.add('on'); timerReset(); T.pausedRemain = null; T.remain = m * 60; T.total = m * 60; drawTimer();
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
          new Notification('⏱ Pomodoro Tamamlandı', { body: 'Seans bitti! Molayı hak ettin. ☕', tag: 'pomodoro' });
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
  const m = String(Math.floor(T.remain / 60)).padStart(2, '0');
  const s = String(T.remain % 60).padStart(2, '0');
  document.getElementById('tnum').textContent = `${m}:${s}`;
  const circ = 2 * Math.PI * 44;
  document.getElementById('timerRing').style.strokeDashoffset = (circ * (1 - T.remain / T.total)).toFixed(1);
  const cat = document.getElementById('timerCat').value;
  document.getElementById('timerCatLbl').textContent = cat && CATS[cat] ? `${CATS[cat].i} ${CATS[cat].l}` : '';
}
function renderSessions() {
  const n = S.timerSess[today()] || 0;
  document.getElementById('sdots').innerHTML =
    Array.from({ length: 4 }, (_, i) => `<div class="sdot${i < n ? ' done' : ''}"></div>`).join('');
}

/* ── GÖRÜNÜM GEÇER ── */
function showView(v, el) {
  document.querySelectorAll('.view').forEach(x => x.classList.remove('on'));
  document.getElementById('v-' + v)?.classList.add('on');

  // Sync menu items in vertical sidebar menu, mobile nav, and header (menu-item-vertical, menu-item, mb-nav-item)
  document.querySelectorAll('.menu-item-vertical, .menu-item, .mb-nav-item').forEach(t => {
    const oc = t.getAttribute('onclick') || '';
    t.classList.toggle('on', oc.includes(`'${v}'`));
  });

  if (v === 'analytics' || v === 'habits') { renderHabits(); renderAnalytics(); }
  if (v === 'calendar') { renderCalendar(); }
  if (v === 'prayers') { renderNamaz(); }
  if (v === 'zikir') { renderEsma(); renderDailyZikir(); renderZikirView(); }
  if (v === 'tasks') { renderCatCards(); renderTasks(); renderSessions(); renderCatTimes(); drawTimer(); }
  if (v === 'quran') { renderQuranView(); }
}

/* ── AKILLI TAHTA MODU VE TAM EKRAN ── */
function toggleSmartboardMode() {
  document.body.classList.toggle('smartboard-mode');
  const isSb = document.body.classList.contains('smartboard-mode');
  safeStorage.setItem('mikat_smartboard', isSb ? '1' : '0');
  toast(isSb ? '🖥️ Akıllı Tahta Modu Açıldı (Büyük Yazı/Buton)' : '💻 Normal Ekran Moduna Geçildi', 'i');
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => {
      toast('⛶ Tam Ekran Modu', 's');
    }).catch(err => {
      toast('Tam ekran modu açılamadı', 'e');
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

function toggleMenuDropdown() {
  const dp = document.getElementById('hamburgerDropdown');
  if (dp) dp.classList.toggle('on');
}

function selectMenu(view, btn) {
  showView(view);
  document.querySelectorAll('.menu-item').forEach(x => x.classList.remove('on'));
  btn.classList.add('on');
  document.getElementById('hamburgerDropdown')?.classList.remove('on');
}

// Close dropdown on outside click
window.addEventListener('click', function (e) {
  if (!e.target.closest('.hamburger-btn') && !e.target.closest('.hamburger-dropdown')) {
    document.getElementById('hamburgerDropdown')?.classList.remove('on');
  }
});

/* ── KATEGORİ YÖNETİMİ ── */
function openSettings() {
  renderSettings();
  document.getElementById('settingsModal')?.classList.add('on');
}
function renderSettings() {
  const cityInp = document.getElementById('namazCityInput');
  if (cityInp) cityInp.value = S.namazCity || 'Konya';

  const autoB = document.getElementById('autoBackupToggle');
  if (autoB) autoB.checked = !!S.autoBackup;

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
  document.getElementById('colorPresets').innerHTML = COLOR_PALETTE.map((c, i) =>
    `<div class="color-preset${selectedColor.hex === c.hex ? ' sel' : ''}" style="background:${c.hex}" onclick="selectColor(${i})" title="${c.hex}"></div>`
  ).join('');
}
function selectColor(i) { selectedColor = COLOR_PALETTE[i]; renderColorPresets(); }
function renderCatList() {
  document.getElementById('catList').innerHTML = Object.entries(CATS).map(([k, c]) => `
    <div class="cat-item">
      <div class="cat-item-ico">${esc(c.i)}</div>
      <div style="width:11px;height:11px;border-radius:3px;background:${safeColor(c.c)};flex-shrink:0;border:2px solid var(--bd)"></div>
      <div class="cat-item-info">
        <div class="cat-item-name">${esc(c.l)}</div>
        <div class="cat-item-key">#${esc(k)}</div>
      </div>
      <div class="cat-item-acts">
        <button class="cat-act-btn" onclick="editCat('${k}')" title="Düzenle">✏️</button>
        ${Object.keys(CATS).length > 1 ? `<button class="cat-act-btn del" onclick="deleteCat('${k}')" title="Sil">🗑️</button>` : ''}
      </div>
    </div>`
  ).join('');
}
function editCat(key) {
  editCatKey = key;
  const c = CATS[key];
  document.getElementById('catIco').value = c.i;
  document.getElementById('catName').value = c.l;
  document.getElementById('catKey').value = key;
  document.getElementById('catKey').disabled = true;
  document.getElementById('catFormTitle').textContent = 'Kategori Düzenle: ' + c.l;
  const idx = COLOR_PALETTE.findIndex(p => p.hex === c.c);
  selectedColor = idx >= 0 ? COLOR_PALETTE[idx] : { hex: c.c, bg: c.bg };
  renderColorPresets();
}
function resetCatForm() {
  editCatKey = null;
  ['catIco', 'catName', 'catKey'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('catKey').disabled = false;
  document.getElementById('catFormTitle').textContent = 'Yeni Kategori Ekle';
  selectedColor = COLOR_PALETTE[0]; renderColorPresets();
}
function saveCat() {
  const ico = document.getElementById('catIco').value.trim() || '📌';
  const name = document.getElementById('catName').value.trim();
  let key = document.getElementById('catKey').value.trim()
    .toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
  if (!name) { toast('Kategori adı boş olamaz', 'e'); return; }
  if (!key && !editCatKey) {
    key = name.toLowerCase()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
      .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .replace(/[^a-z0-9_]/g, '').slice(0, 20);
  }
  if (!key) { toast('Geçerli bir anahtar girin', 'e'); return; }
  if (!editCatKey && CATS[key]) { toast('Bu anahtar zaten kullanılıyor: #' + key, 'e'); return; }
  const hex = selectedColor.hex, bg = selectedColor.bg || hex + '20';
  if (editCatKey) {
    CATS[editCatKey] = { l: name, i: ico, c: hex, bg };
    toast('Kategori güncellendi', 's');
  } else {
    CATS[key] = { l: name, i: ico, c: hex, bg };
    toast('Kategori eklendi: #' + key, 's');
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
  const opts = Object.entries(CATS).map(([k, c]) =>
    `<option value="${esc(k)}">${esc(c.i)} ${esc(c.l)}</option>`
  ).join('');

  const fCatEl = document.getElementById('fCat');
  if (fCatEl) fCatEl.innerHTML = opts;

  const timerCatEl = document.getElementById('timerCat');
  if (timerCatEl) timerCatEl.innerHTML = '<option value="">— Kategori seç —</option>' + opts;

  const batchCatEl = document.getElementById('batchDefaultCat');
  if (batchCatEl) batchCatEl.innerHTML = opts;

  const bulkCatEl = document.getElementById('bulkCatSel');
  if (bulkCatEl) bulkCatEl.innerHTML = '<option value="" disabled selected>📂 Kategori Değiştir...</option>' + opts;

  const filterSelEl = document.getElementById('catFilterSel');
  if (filterSelEl) {
    let fOpts = `<option value="" ${!activeCat ? 'selected' : ''}>📂 Tüm Kategoriler (${S.tasks.length})</option>`;
    Object.entries(CATS).forEach(([k, c]) => {
      const pend = S.tasks.filter(t => t.cat === k && !t.done).length;
      fOpts += `<option value="${esc(k)}" ${activeCat === k ? 'selected' : ''}>${esc(c.i)} ${esc(c.l)} (${pend})</option>`;
    });
    filterSelEl.innerHTML = fOpts;
  }
}

/* ── RENDER: KATEGORİ KARTLARI / DÜŞEN MENÜ ── */
function renderCatCards() {
  const allNumEl = document.getElementById('allnum');
  if (allNumEl) allNumEl.textContent = S.tasks.length;

  const selEl = document.getElementById('catFilterSel');
  if (selEl) {
    let opts = `<option value="" ${!activeCat ? 'selected' : ''}>📂 Tüm Kategoriler (${S.tasks.length})</option>`;
    Object.entries(CATS).forEach(([k, c]) => {
      const tasks = S.tasks.filter(t => t.cat === k);
      const pend = tasks.filter(t => !t.done).length;
      opts += `<option value="${k}" ${activeCat === k ? 'selected' : ''}>${c.i} ${c.l} (${pend})</option>`;
    });
    selEl.innerHTML = opts;
  }

  const cardsEl = document.getElementById('ccards');
  if (cardsEl) {
    cardsEl.innerHTML = Object.entries(CATS).map(([k, c]) => {
      const tasks = S.tasks.filter(t => t.cat === k);
      const pend = tasks.filter(t => !t.done).length;
      const isSel = activeCat === k;
      return `<div class="cat-pill${isSel ? ' on' : ''}" data-cat="${k}" onclick="filterCat('${k}')" style="${isSel ? `border-color:${safeColor(c.c)};background:${safeColor(c.bg)};color:${safeColor(c.c)};` : ''}">
        <span class="cat-pill-ico">${esc(c.i)}</span>
        <span class="cat-pill-nm" style="${isSel ? `color:${safeColor(c.c)};` : ''}">${esc(c.l)}</span>
        <span class="cat-pill-n" style="${isSel ? `background:${safeColor(c.c)};color:${safeColor(c.bg)};` : `background:${safeColor(c.bg)};color:${safeColor(c.c)};`}">${pend}</span>
        <button class="ccard-act" onclick="event.stopPropagation();openCatManagerTo('${k}')" style="background:none;border:none;margin-left:4px;font-size:0.6rem;cursor:pointer;padding:0;" title="Düzenle">✏️</button>
      </div>`;
    }).join('');
  }
}
function openCatManagerTo(key) { openCatManager(); setTimeout(() => editCat(key), 50); }

/* ── RENDER: GÜNLÜK PANEL ── */
function renderDayProg() {
  const tdTasks = S.tasks.filter(isTaskForToday);
  const total = tdTasks.length, done = tdTasks.filter(t => t.done).length;
  const pct = total ? Math.round(done / total * 100) : 0;

  // Mood ve oran güncelleme (Ticker Sağ Köşe)
  const mood = ['😴', '😐', '🙂', '😊', '🌟', '🔥'][Math.min(5, Math.floor(pct / 20))];
  const tickerMoodEl = document.getElementById('tickerMood');
  if (tickerMoodEl) {
    tickerMoodEl.innerHTML = `<span>${mood}</span> <strong style="color:var(--teal);">${pct}%</strong>`;
  }

  const itemsHtml = Object.entries(CATS).map(([k, c]) => {
    const tasks = tdTasks.filter(t => t.cat === k);
    const d = tasks.filter(t => t.done).length;
    return `<div class="ticker-item">
      <span>${esc(c.i)}</span>
      <span style="font-weight:700; color:var(--tx);">${esc(c.l)}:</span>
      <span style="color:var(--gold); font-weight:700;">${d}/${tasks.length}</span>
    </div>`;
  }).join('');

  // Ticker içeriğini sadece değişmişse güncelle — animasyonun sıfırlanmasını önler
  const tickerContainer = document.getElementById('dpbarsTicker');
  if (tickerContainer) {
    const newHtml = `<div class="ticker-items-container">${itemsHtml}${itemsHtml}${itemsHtml}</div>`;
    // Önceki içerikle karşılaştır; değişmişse güncelle
    if (tickerContainer.getAttribute('data-last') !== itemsHtml) {
      tickerContainer.setAttribute('data-last', itemsHtml);
      tickerContainer.innerHTML = newHtml;
    }
  }

  renderGeneralStatus(tdTasks);
}
function renderGeneralStatus(tdTasks) {
  const box = document.getElementById('genelDurum'); if (!box) return;
  const td = today();
  const total = S.tasks.length;
  const done = S.tasks.filter(t => t.done).length;
  const overdue = S.tasks.filter(t => t.due && t.due < td && !t.done).length;
  const rep = S.tasks.filter(t => t.rep && t.rep !== 'yok').length;
  box.innerHTML = `
    <div class="gd-row"><span>📅 Bugünlük</span><b style="color:var(--gold)">${tdTasks.filter(t => t.done).length}/${tdTasks.length}</b></div>
    <div class="gd-row"><span>📌 Toplam</span><b>${done}/${total}</b></div>
    <div class="gd-row"><span>⚠️ Geciken</span><b style="color:var(--rose)">${overdue}</b></div>
    <div class="gd-row"><span>🔁 Tekrarlanan</span><b>${rep}</b></div>`;
}

/* ── RENDER: NAMAZ ── */
function renderNamaz() {
  const d = today();
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  let curIdx = PRAYERS.length - 1;
  PRAYERS.forEach((p, i) => {
    const [h, m] = p.t.split(':').map(Number);
    if (nowMin >= h * 60 + m) curIdx = i;
  });
  const done = PRAYERS.filter(p => S.prayers[d]?.[p.n]).length;
  const countEl = document.getElementById('namazCnt');
  if (countEl) countEl.textContent = `${done}/5`;

  const hoverTitleEl = document.getElementById('dialHoverTitle');
  if (hoverTitleEl && (!hoverTitleEl.style.opacity || hoverTitleEl.style.opacity === '1')) {
    hoverTitleEl.innerHTML = getDefaultDialTitle();
  }

  // ── Vakit Kadranı Güncelleme (Geliştirilmiş) ──
  const dialSectors = document.getElementById('dialSectors');
  const dialSeparators = document.getElementById('dialSeparators');
  const dialHours = document.getElementById('dialHours');
  const dialMarkers = document.getElementById('dialMarkers');
  const dialGlow = document.getElementById('dialGlow');

  if (dialSectors && PRAYERS && PRAYERS.length === 5) {
    const timeToMin = t => t.split(':').map(Number).reduce((a, b) => a * 60 + b);

    // Vakitleri dakikaya çevir
    const imsakMin = IMSAK_TIME ? timeToMin(IMSAK_TIME) : null;
    const fMin = timeToMin(PRAYERS[0].t);
    const oMin = timeToMin(PRAYERS[1].t);
    const iMin = timeToMin(PRAYERS[2].t);
    const aMin = timeToMin(PRAYERS[3].t);
    const yMin = timeToMin(PRAYERS[4].t);
    const sunMin = SUNRISE_TIME ? timeToMin(SUNRISE_TIME) : fMin + 50;

    const minToTime = m => {
      const h = Math.floor(((m % 1440) + 1440) % 1440 / 60);
      const min = Math.floor(((m % 1440) + 1440) % 1440 % 60);
      return String(h).padStart(2, '0') + ':' + String(min).padStart(2, '0');
    };

    // Sabah namazı merkezli göreli dakika (kadranın 0 noktası sol kenar = Sabah vakti)
    const getRel = m => ((m - fMin) % 1440 + 1440) % 1440;

    // Mevcut aktif sektörü bul
    const nowTotal = now.getHours() * 60 + now.getMinutes();
    let activeSectorName = '';
    if (imsakMin !== null && nowTotal >= imsakMin && nowTotal < fMin) activeSectorName = 'İmsak';
    else if (nowTotal >= fMin && nowTotal < sunMin) activeSectorName = 'Sabah';
    else if (nowTotal >= sunMin && nowTotal < sunMin + 45) activeSectorName = 'Kerahet';
    else if (nowTotal >= sunMin + 45 && nowTotal < sunMin + 90) activeSectorName = 'İşrak';
    else if (nowTotal >= sunMin + 90 && nowTotal < oMin - 20) activeSectorName = 'Kuşluk';
    else if (nowTotal >= oMin - 20 && nowTotal < oMin) activeSectorName = 'Kerahet';
    else if (nowTotal >= oMin && nowTotal < iMin) activeSectorName = 'Öğle';
    else if (nowTotal >= iMin && nowTotal < aMin - 45) activeSectorName = 'İkindi';
    else if (nowTotal >= aMin - 45 && nowTotal < aMin) activeSectorName = 'Kerahet';
    else if (nowTotal >= aMin && nowTotal < aMin + 25) activeSectorName = 'Akşam';
    else if (nowTotal >= aMin + 25 && nowTotal < yMin) activeSectorName = 'Evvabîn';
    else if (nowTotal >= yMin && nowTotal < yMin + 120) activeSectorName = 'Yatsı';
    else activeSectorName = 'Teheccüd';

    // Sektör tanımları — zengin renkler, aktif sektör öne çıkar
    const sectors = [
      { name: 'İmsak', s: imsakMin !== null ? imsakMin : fMin - 60, e: fMin, c: '#1e0a3c', stroke: '#7c3aed', glow: '#7c3aed' },
      { name: 'Sabah', s: fMin, e: sunMin, c: '#3d2600', stroke: '#f59e0b', glow: '#f59e0b' },
      { name: 'Kerahet', s: sunMin, e: sunMin + 45, c: '#3d0f0f', stroke: '#ef4444', glow: '#ef4444' },
      { name: 'İşrak', s: sunMin + 45, e: sunMin + 90, c: '#3a2900', stroke: '#fde047', glow: '#fde047' },
      { name: 'Kuşluk', s: sunMin + 90, e: oMin - 20, c: '#2e1a00', stroke: '#fb923c', glow: '#fb923c' },
      { name: 'Kerahet', s: oMin - 20, e: oMin, c: '#3d0f0f', stroke: '#ef4444', glow: '#ef4444' },
      { name: 'Öğle', s: oMin, e: iMin, c: '#002920', stroke: '#10b981', glow: '#10b981' },
      { name: 'İkindi', s: iMin, e: aMin - 45, c: '#2e1200', stroke: '#f97316', glow: '#f97316' },
      { name: 'Kerahet', s: aMin - 45, e: aMin, c: '#3d0f0f', stroke: '#ef4444', glow: '#ef4444' },
      { name: 'Akşam', s: aMin, e: aMin + 25, c: '#2d0520', stroke: '#ec4899', glow: '#ec4899' },
      { name: 'Evvabîn', s: aMin + 25, e: yMin, c: '#1a073d', stroke: '#a78bfa', glow: '#a78bfa' },
      { name: 'Yatsı', s: yMin, e: yMin + 120, c: '#060f28', stroke: '#60a5fa', glow: '#60a5fa' },
      { name: 'Teheccüd', s: yMin + 120, e: imsakMin !== null ? imsakMin : fMin, c: '#0f0620', stroke: '#818cf8', glow: '#818cf8' },
    ];

    // Sektör yolu çiz (dolgu + kenar çizgisi ile)
    // glowColor: aktif sektörde parlama rengi (döngüden iletilir)
    const drawAnnularSector = (cx, cy, r_in, r_out, startMin, endMin, fillColor, strokeColor, glowColor, name, isActive) => {
      let rs = getRel(startMin);
      let re = getRel(endMin);
      if (re <= rs) re += 1440;
      if ((re - rs) <= 0) return '';

      const startAngle = 180 + (rs / 1440) * 180;
      const endAngle = 180 + (re / 1440) * 180;
      const startRad = startAngle * Math.PI / 180;
      const endRad = endAngle * Math.PI / 180;
      const largeArc = (endAngle - startAngle) > 180 ? 1 : 0;

      const x1o = cx + r_out * Math.cos(startRad), y1o = cy + r_out * Math.sin(startRad);
      const x2o = cx + r_out * Math.cos(endRad), y2o = cy + r_out * Math.sin(endRad);
      const x1i = cx + r_in * Math.cos(startRad), y1i = cy + r_in * Math.sin(startRad);
      const x2i = cx + r_in * Math.cos(endRad), y2i = cy + r_in * Math.sin(endRad);

      const durationMins = endMin >= startMin ? endMin - startMin : endMin + 1440 - startMin;
      const dh = Math.floor(durationMins / 60), dm = durationMins % 60;
      const durStr = (dh ? `${dh}sa ` : '') + (dm || !dh ? `${dm}dk` : '');
      const rangeStr = `${minToTime(startMin)}-${minToTime(endMin)} (${durStr.trim()})`;

      // Aktif sektörde güçlü parlama efekti
      const activeStyle = isActive
        ? `opacity:1; filter:brightness(1.7) drop-shadow(0 0 6px ${glowColor}) drop-shadow(0 0 12px ${glowColor}40);`
        : 'opacity:0.72; filter:brightness(1.0);';

      // rangeStr için HTML attribute güvenliği: tek tırnak sorununu önlemek için da ta-* attr kullan
      const path = `<path
        d="M ${x1o} ${y1o} A ${r_out} ${r_out} 0 ${largeArc} 1 ${x2o} ${y2o} L ${x2i} ${y2i} A ${r_in} ${r_in} 0 ${largeArc} 0 ${x1i} ${y1i} Z"
        fill="${fillColor}"
        stroke="${strokeColor}"
        stroke-width="${isActive ? 1.6 : 0.7}"
        style="cursor:pointer; transition: opacity 0.25s, filter 0.25s; ${activeStyle}"
        data-sector="${name}" data-range="${rangeStr}" data-color="${strokeColor}"
        onmouseenter="window.setDialHoverTitle(this.dataset.sector,this.dataset.range,this.dataset.color)"
        onmouseleave="window.clearDialHoverTitle()"
        ontouchstart="window.setDialHoverTitle(this.dataset.sector,this.dataset.range,this.dataset.color);event.preventDefault()"
        ontouchend="setTimeout(()=>window.clearDialHoverTitle(),2500)"
      />`;
      return path;
    };

    // Sektör etiketi — kadran içinde yazı gösterilmiyor (hover tooltip ile gösteriliyor)
    const drawSectorLabel = () => '';

    // Ayırıcı çizgiler
    const drawSeparatorLine = (min, color = 'rgba(255,255,255,0.18)', w = 1) => {
      const rMin = getRel(min);
      const angle = 180 + (rMin / 1440) * 180;
      const rad = angle * Math.PI / 180;
      return `<line
        x1="${100 + 44 * Math.cos(rad)}" y1="${110 + 44 * Math.sin(rad)}"
        x2="${100 + 82 * Math.cos(rad)}" y2="${110 + 82 * Math.sin(rad)}"
        stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;
    };

    // Namaz vakti işaret noktası (bezel üzerinde)
    const drawMarkerDot = (min, color, label) => {
      const rMin = getRel(min);
      const angle = 180 + (rMin / 1440) * 180;
      const rad = angle * Math.PI / 180;
      const r = 87.5;
      const x = 100 + r * Math.cos(rad);
      const y = 110 + r * Math.sin(rad);
      return `<circle cx="${x}" cy="${y}" r="3.2" fill="${color}" stroke="rgba(0,0,0,0.5)" stroke-width="0.6"
        style="filter: drop-shadow(0 0 3px ${color});"
        onmouseenter="window.setDialHoverTitle('${label}','${minToTime(min)}')"
        onmouseleave="window.clearDialHoverTitle()"
        ontouchstart="window.setDialHoverTitle('${label}','${minToTime(min)}');event.preventDefault()"
        ontouchend="setTimeout(()=>window.clearDialHoverTitle(),2000)"
      />`;
    };

    // Güneş doğuş/batış ikonu (küçük metin)
    const drawSunIcon = (min, icon) => {
      const rMin = getRel(min);
      const angle = 180 + (rMin / 1440) * 180;
      const rad = angle * Math.PI / 180;
      const r = 74;
      const x = 100 + r * Math.cos(rad);
      const y = 110 + r * Math.sin(rad);
      let textRot = angle + 90;
      if (textRot > 90 && textRot < 270) textRot += 180;
      return `<text x="${x}" y="${y}" font-size="7" text-anchor="middle" dominant-baseline="central"
        transform="rotate(${textRot} ${x} ${y})" style="pointer-events:none;">${icon}</text>`;
    };

    // Çiz: sektörler (etiket yok — hover tooltip kullanılıyor)
    dialSectors.innerHTML = sectors.map(sec => {
      const isActive = sec.name === activeSectorName;
      return drawAnnularSector(100, 110, 44, 82, sec.s, sec.e, sec.c, sec.stroke, sec.glow, sec.name, isActive);
    }).join('');

    // Çiz: ayırıcı çizgiler
    if (dialSeparators) {
      const sepMins = [fMin, sunMin, oMin, iMin, aMin, yMin];
      if (imsakMin !== null) sepMins.push(imsakMin);
      dialSeparators.innerHTML = sepMins.map(m => drawSeparatorLine(m)).join('');
    }

    // Çiz: saat tikleri (halka üzerinde) + numaralar (dışarıda, koyu renkte)
    if (dialHours) {
      // Sabah vakti saatini referans olarak al
      const fHour = Math.floor(fMin / 60);
      // Her 2 saatte bir label göster, sabah vaktinden başla
      const labelHours = [];
      for (let i = 0; i < 12; i++) {
        labelHours.push((fHour + i * 2) % 24);
      }
      let hoursHtml = '';
      // Tick çizgileri
      for (let h = 0; h < 24; h++) {
        const relMin = getRel(h * 60);
        const angle = 180 + (relMin / 1440) * 180;
        const rad = angle * Math.PI / 180;
        const isMaj = h % 2 === 0;
        const rStart = isMaj ? 79.5 : 81;
        const rEnd = 84;
        hoursHtml += `<line
          x1="${100 + rStart * Math.cos(rad)}" y1="${110 + rStart * Math.sin(rad)}"
          x2="${100 + rEnd * Math.cos(rad)}" y2="${110 + rEnd * Math.sin(rad)}"
          stroke="rgba(164,207,206,0.4)" stroke-width="${isMaj ? 1.3 : 0.65}"/>`;
      }
      // Saat numaraları — daire dışında, koyu renkte
      labelHours.forEach(h => {
        const relMin = getRel(h * 60);
        const angle = 180 + (relMin / 1440) * 180;
        const rad = angle * Math.PI / 180;
        const x = 100 + 95 * Math.cos(rad);
        const y = 110 + 95 * Math.sin(rad);
        hoursHtml += `<text x="${x}" y="${y}" fill="#0c3d3a" font-size="7.5" font-family="'Outfit',sans-serif"
          font-weight="800" text-anchor="middle" dominant-baseline="central">${String(h).padStart(2, '0')}</text>`;
      });
      dialHours.innerHTML = hoursHtml;
    }

    // Çiz: namaz vakti marker noktaları + güneş ikonları
    if (dialMarkers) {
      const markerColors = {
        'Sabah': '#fbbf24',
        'Öğle': '#34d399',
        'İkindi': '#fb923c',
        'Akşam': '#f472b6',
        'Yatsı': '#60a5fa',
        'İmsak': '#a78bfa',
        'Güneş': '#fde047',
        'Akşam☀': '#f97316',
      };
      let markerHtml = '';
      const prayerMins = [
        { min: fMin, label: 'Sabah', color: markerColors['Sabah'] },
        { min: oMin, label: 'Öğle', color: markerColors['Öğle'] },
        { min: iMin, label: 'İkindi', color: markerColors['İkindi'] },
        { min: aMin, label: 'Akşam', color: markerColors['Akşam'] },
        { min: yMin, label: 'Yatsı', color: markerColors['Yatsı'] },
      ];
      if (imsakMin !== null) prayerMins.unshift({ min: imsakMin, label: 'İmsak', color: markerColors['İmsak'] });

      markerHtml += prayerMins.map(pm => drawMarkerDot(pm.min, pm.color, pm.label)).join('');
      markerHtml += drawSunIcon(sunMin, '🌅');
      markerHtml += drawSunIcon(aMin + 5, '🌇');
      dialMarkers.innerHTML = markerHtml;
    }

    // İlk iğne + geri sayım güncellemesi
    updateDialCountdownAndNeedle();
  }

  // İbadet özeti
  const cnt = document.getElementById('ibadetCount');
  const bar = document.getElementById('ibadetBar');
  const msg = document.getElementById('ibadetMsg');
  if (cnt) cnt.textContent = `${done} / 5`;
  if (bar) bar.style.width = Math.max(0, done * 20) + '%';
  if (msg) msg.textContent = ['Başlamak için ilk namazı kıl', 'Güzel başladın 👍', 'Devam et 💪', 'Yarısından fazlası 🔥', 'Son bir adım ✨', 'Bugünkü hedef tamamlandı 🎉'][done] || '';

  // Farz Namaz Tikleme Listesi (Namaz Vakitleri & Tikleme Kartı)
  const checklistEl = document.getElementById('namazChecklist');
  if (checklistEl && PRAYERS && PRAYERS.length === 5) {
    checklistEl.innerHTML = PRAYERS.map((p, i) => {
      const isDone = !!(S.prayers[d]?.[p.n]);
      const isCur = i === curIdx && !isDone;
      const highlightStyle = isCur ? 'border-color: var(--gold); background: rgba(212,175,55,0.06);' : '';
      const textStyle = isCur ? 'color: var(--gold); font-weight: 800;' : 'color: var(--tx2);';
      const labelStyle = isDone ? 'text-decoration: line-through; opacity: 0.5; color: var(--tx3);' : textStyle;

      return `<div class="namaz-check-row" onclick="toggleNamaz('${p.n}')" style="display:flex; align-items:center; justify-content:space-between; padding: 6px 8px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.04); cursor:pointer; transition: all var(--tr); ${highlightStyle}">
        <div style="display:flex; align-items:center; gap:8px;">
          <input type="checkbox" ${isDone ? 'checked' : ''} style="pointer-events:none; accent-color:var(--teal);" />
          <span style="font-size:0.78rem; font-weight:600; ${labelStyle}">${p.n}</span>
        </div>
        <span style="font-size:0.72rem; font-family:'JetBrains Mono',monospace; opacity:0.65; ${textStyle}">${p.t}</span>
      </div>`;
    }).join('');
  }

  // Kadran altı vakit şeridi kaldırıldı — kadran büyütüldü

  // Sonraki vakit (Kaldırıldı)
  renderDailyZikir();
  renderWeeklyIbadet();
  renderNafile();
  renderKerahet();
  renderVaktinQuote();
  renderEsma();
  renderQada();
  renderHeaderPrayerVakit();
  renderPrayerTimeline();
}

/* 🔒 [DOKUNULMAZ / KİLİTLİ ALAN] GÜNÜN VAKİT ZAMAN ŞERİDİ (24 SAAT DETAYLI TÜM VAKİTLER) ── */
function renderPrayerTimeline() {
  const container = document.getElementById('prayerTimelineCard');
  if (!container || !PRAYERS || PRAYERS.length !== 5) return;

  const rulerEl = document.getElementById('timelineHourRuler');
  const segEl = document.getElementById('timelineSegments');
  const labelEl = document.getElementById('timelineLabels');
  const needleEl = document.getElementById('timelineNeedle');
  const timeEl = document.getElementById('timelineCurrentTime');

  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;

  if (timeEl) {
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    timeEl.textContent = `${hh}:${mm}:${ss}`;
  }

  const toMin = t => {
    if (!t) return 0;
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };

  const minToTime = m => {
    const h = Math.floor(((m % 1440) + 1440) % 1440 / 60);
    const min = Math.floor(((m % 1440) + 1440) % 1440 % 60);
    return String(h).padStart(2, '0') + ':' + String(min).padStart(2, '0');
  };

  const imsakMin = IMSAK_TIME ? toMin(IMSAK_TIME) : null;
  const fMin = toMin(PRAYERS[0].t); // Sabah
  const oMin = toMin(PRAYERS[1].t); // Öğle
  const iMin = toMin(PRAYERS[2].t); // İkindi
  const aMin = toMin(PRAYERS[3].t); // Akşam
  const yMin = toMin(PRAYERS[4].t); // Yatsı
  const sunMin = SUNRISE_TIME ? toMin(SUNRISE_TIME) : fMin + 50; // Güneş

  const timelineStartMin = imsakMin !== null ? imsakMin : fMin - 60;
  const relNow = nowMin >= timelineStartMin ? nowMin - timelineStartMin : (1440 - timelineStartMin) + nowMin;

  // 1. Canlı kırmızı ibre (%0 - %100 24 Saat)
  if (needleEl) {
    const needlePct = Math.max(0, Math.min(100, (relNow / 1440) * 100));
    needleEl.style.left = `${needlePct}%`;
  }

  // Ana Vakitler ve Entegre Nafile Vakit Sektörleri (00:00 - 24:00)
  const sectors = [
    { name: 'İmsak', icon: '🌌', s: imsakMin !== null ? imsakMin : fMin - 60, e: fMin, bg: '#3b0764', border: '#c084fc', txt: '#f3e8ff' },
    { name: 'Sabah', icon: '🌅', s: fMin, e: sunMin, bg: '#854d0e', border: '#fbbf24', txt: '#ffffff' },
    { name: 'Kerahet', icon: '⚠️', s: sunMin, e: sunMin + 45, bg: '#991b1b', border: '#f87171', txt: '#fee2e2' },
    { name: 'İşrak', icon: '✨', s: sunMin + 45, e: sunMin + 90, bg: '#a16207', border: '#fef08a', txt: '#ffffff' },
    { name: 'Kuşluk (Duha)', icon: '☀️', s: sunMin + 90, e: oMin - 45, bg: '#c2410c', border: '#ffedd5', txt: '#ffffff' },
    { name: 'Kerahet', icon: '⚠️', s: oMin - 45, e: oMin, bg: '#991b1b', border: '#f87171', txt: '#fee2e2' },
    { name: 'Öğle', icon: '🕌', s: oMin, e: iMin, bg: '#047857', border: '#34d399', txt: '#ffffff' },
    { name: 'İkindi', icon: '🌆', s: iMin, e: aMin - 45, bg: '#ea580c', border: '#fed7aa', txt: '#ffffff' },
    { name: 'Kerahet', icon: '⚠️', s: aMin - 45, e: aMin, bg: '#991b1b', border: '#f87171', txt: '#fee2e2' },
    { name: 'Akşam (Evvabîn)', icon: '🌇', s: aMin, e: yMin, bg: 'linear-gradient(90deg, #be185d 0%, #be185d 30%, #6b21a8 100%)', border: '#f472b6', txt: '#ffffff' },
    { name: 'Yatsı (Teheccüd)', icon: '🌙', s: yMin, e: imsakMin !== null ? imsakMin + 1440 : fMin + 1440, bg: 'linear-gradient(90deg, #1d4ed8 0%, #1d4ed8 45%, #4338ca 100%)', border: '#60a5fa', txt: '#ffffff' },
  ];

  const descMap = {
    'İmsak': 'Sahur vakti biter, İmsak / Sabah namazı başlar',
    'Sabah': 'Güneş doğana kadar kılınabilen Sabah namazı vakti',
    'Kerahet': 'Mekruh vakit',
    'İşrak': 'Güneş yükseldikten sonra kılınan İşrak namazı vakti',
    'Kuşluk (Duha)': 'Kuşluk (Duha) nafile namazı vakti',
    'Öğle': 'Öğle namazı vakti',
    'İkindi': 'İkindi namazı vakti',
    'Akşam (Evvabîn)': 'Akşam namazı vakti ve Akşamdan sonra kılınan Evvabîn nafile namazı dönemi',
    'Yatsı (Teheccüd)': 'Yatsı, Vitir ve Gece yarısından sonra kılınan Teheccüd nafile namazı dönemi'
  };

  const cacheKey = PRAYERS[0].t;

  // 2. 24 Saatlik 13 Sektörlük Barı Çiz (Tüm Genişlik boyunca)
  if (segEl && (!segEl.children.length || segEl.dataset.updated !== cacheKey)) {
    segEl.dataset.updated = cacheKey;

    segEl.innerHTML = sectors.map(sec => {
      let startRel = sec.s >= timelineStartMin ? sec.s - timelineStartMin : (1440 - timelineStartMin) + sec.s;
      let endRel = sec.e >= timelineStartMin ? sec.e - timelineStartMin : (1440 - timelineStartMin) + sec.e;
      if (endRel <= startRel) endRel += 1440;
      let dur = endRel - startRel;
      const w = (dur / 1440) * 100;
      const startTimeStr = minToTime(sec.s);
      const endTimeStr = minToTime(sec.e);
      const desc = descMap[sec.name] || '';

      const isCurrent = relNow >= startRel && relNow < endRel;
      const activeHighlight = isCurrent ? 'outline: 3px solid #fbbf24; outline-offset: -3px; z-index: 5; box-shadow: inset 0 0 14px rgba(251,191,36,0.7);' : '';

      let labelText = '';
      let fontSize = '0.80rem';

      if (sec.name === 'Kerahet') {
        labelText = sec.icon;
        fontSize = '0.72rem';
      } else if (w < 3.5) {
        labelText = sec.icon;
        fontSize = '0.72rem';
      } else if (w < 6.5) {
        labelText = `${sec.icon} ${sec.name}`;
        fontSize = '0.75rem';
      } else {
        labelText = `${sec.icon} ${sec.name} <span style="opacity:0.95; font-family:'JetBrains Mono',monospace; font-size:0.70rem; font-weight:800; color:#fff;">(${startTimeStr})</span>`;
        fontSize = '0.82rem';
      }

      return `<div onmouseenter="hoverTimelineSector(event, '${sec.icon} ${sec.name}', '${startTimeStr}', '${endTimeStr}', '${desc}', '${sec.border}')" onmousemove="moveTimelineSector(event)" onmouseleave="resetTimelineHover()" style="width: ${w}%; background: ${sec.bg}; height: 100%; position: relative; border-right: 1.5px solid ${sec.border}; box-sizing: border-box; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 0 2px; cursor: pointer; ${activeHighlight}" title="${sec.name}: ${startTimeStr} - ${endTimeStr}">
        <span style="font-size: ${fontSize}; font-weight: 900; color: ${sec.txt}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-shadow: 0 1px 4px #000, 0 0 6px #000, 0 0 2px #000; pointer-events: none; max-width: 100%; text-align: center;">
          ${labelText}
        </span>
      </div>`;
    }).join('');
  }

  // 3. Dynamic Ruler (5 Sektörlük Pencerenin Zaman Tıkları)
  if (rulerEl && (!rulerEl.children.length || rulerEl.dataset.updated !== currentKey)) {
    rulerEl.dataset.updated = currentKey;
    let accumulatedMins = 0;
    const rulerTicks = [];

    visibleSectors.forEach((sec) => {
      const sMin = ((sec.s % 1440) + 1440) % 1440;
      const pct = (accumulatedMins / windowDuration) * 100;
      rulerTicks.push({ pct, time: minToTime(sMin) });
      accumulatedMins += sec.duration;
    });
    const endMin = ((visibleSectors[visibleSectors.length - 1].e % 1440) + 1440) % 1440;
    rulerTicks.push({ pct: 100, time: minToTime(endMin) });

    rulerEl.innerHTML = rulerTicks.map(t =>
      `<div style="position: absolute; left: ${t.pct}%; transform: translateX(-50%); opacity: 0.9; font-weight: 800; font-family: 'JetBrains Mono', monospace; font-size: 0.64rem; color: #e2e8f0;">${t.time}</div>`
    ).join('');
  }

  // 4. Dynamic Vakit Noktaları & Etiketleri (Pencere İçi Vakitler)
  if (labelEl && (!labelEl.children.length || labelEl.dataset.updated !== currentKey)) {
    labelEl.dataset.updated = currentKey;
    const allMarkers = [
      { icon: '🌅', name: 'İmsak', time: IMSAK_TIME || PRAYERS[0].t, min: imsakMin !== null ? imsakMin : fMin - 60 },
      { icon: '☀️', name: 'Güneş', time: SUNRISE_TIME || '--:--', min: sunMin },
      { icon: '🕌', name: 'Öğle', time: PRAYERS[1].t, min: oMin },
      { icon: '🌆', name: 'İkindi', time: PRAYERS[2].t, min: iMin },
      { icon: '🌇', name: 'Akşam', time: PRAYERS[3].t, min: aMin },
      { icon: '🌙', name: 'Yatsı', time: PRAYERS[4].t, min: yMin },
    ];

    const visibleMarkers = allMarkers.filter(m => {
      const mMin = ((m.min % 1440) + 1440) % 1440;
      const rel = mMin >= winStartMin ? mMin - winStartMin : (1440 - winStartMin) + mMin;
      return rel >= 0 && rel <= windowDuration;
    });

    labelEl.innerHTML = visibleMarkers.map(m => {
      const mMin = ((m.min % 1440) + 1440) % 1440;
      const rel = mMin >= winStartMin ? mMin - winStartMin : (1440 - winStartMin) + mMin;
      const pct = (rel / windowDuration) * 100;
      return `<div style="position: absolute; left: ${pct}%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; text-align: center;">
        <div style="width: 2px; height: 6px; background: var(--gold); margin-bottom: 2px;"></div>
        <div style="font-size: 0.62rem; font-weight: 800; color: var(--tx); white-space: nowrap;">${m.icon} ${m.name}</div>
        <div style="font-size: 0.58rem; font-family: 'JetBrains Mono', monospace; font-weight: 800; color: var(--gold);">${m.time}</div>
      </div>`;
    }).join('');
  }
}

window.hoverTimelineSector = function (event, titleStr, startStr, endStr, descStr, colorHex) {
  const accent = colorHex || '#fbbf24';

  // 1. Sabit Hover Başlık Varsa Güncelle
  const el = document.getElementById('timelineHoverTitle');
  if (el) {
    el.style.borderColor = accent;
    el.style.boxShadow = `0 0 12px ${accent}80`;
    el.style.background = '#0f172a';
    el.style.color = '#f8fafc';
    el.innerHTML = `
      <span style="font-weight:900; color:${accent}; text-transform:uppercase; font-size:0.70rem;">${titleStr}</span>
      <span style="font-family:'JetBrains Mono',monospace; color:#ffffff; font-weight:800; font-size:0.66rem;">(${startStr} - ${endStr})</span>
      ${descStr ? `<span style="color:#cbd5e1; font-weight:600; font-size:0.64rem; margin-left:4px;">— ${descStr}</span>` : ''}
    `;
  }

  // 2. Gezici Koyu Pop-up Tooltip (Koyu zemin + Açık renk yazı)
  const pop = document.getElementById('timelineFloatingTooltip');
  if (pop) {
    pop.style.display = 'block';
    pop.style.borderColor = accent;
    pop.style.boxShadow = `0 8px 24px ${accent}60, 0 4px 14px rgba(0,0,0,0.8)`;
    pop.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
        <span style="font-size:0.92rem; font-weight:900; color:${accent}; text-transform:uppercase;">${titleStr}</span>
        <span style="font-family:'JetBrains Mono',monospace; font-size:0.76rem; font-weight:800; color:#ffffff; background:rgba(255,255,255,0.12); padding:2px 8px; border-radius:6px;">${startStr} - ${endStr}</span>
      </div>
      ${descStr ? `<div style="font-size:0.74rem; font-weight:600; color:#cbd5e1; line-height:1.35; max-width:280px;">${descStr}</div>` : ''}
    `;
    if (event) window.moveTimelineSector(event);
  }
};

window.moveTimelineSector = function (event) {
  const pop = document.getElementById('timelineFloatingTooltip');
  if (!pop || pop.style.display === 'none') return;
  const w = pop.offsetWidth || 220;
  const h = pop.offsetHeight || 60;
  let left = event.clientX - w / 2;
  let top = event.clientY - h - 14;
  left = Math.max(10, Math.min(window.innerWidth - w - 10, left));
  if (top < 10) top = event.clientY + 20;
  pop.style.left = left + 'px';
  pop.style.top = top + 'px';
};

function renderCatCards() {
  const el = document.getElementById('catCards');
  if (!el) return;
}

function renderDayProg() {
  const fill = document.getElementById('ibadetBar');
  const msg = document.getElementById('ibadetMsg');
  const cnt = document.getElementById('namazCnt');
  if (!cnt && !fill) return;
  const d = today();
  const nDone = PRAYERS.filter(p => S.prayers?.[d]?.[p.n]).length;
  if (cnt) cnt.textContent = `${nDone}/5`;
  if (fill) fill.style.width = `${(nDone / 5) * 100}%`;
  if (msg) msg.textContent = nDone === 5 ? 'Tüm namazlar kılındı 🎉' : `${5 - nDone} vakit kaldı`;
}

function renderEsma() {
  const arEl = document.getElementById('esmaArabic');
  const meanEl = document.getElementById('esmaMeaning');
  if (!arEl) return;

  const list = (Array.isArray(ESMA_LIST) && ESMA_LIST.length) ? ESMA_LIST : [
    { ar: "الرَّحْمَنُ", tr: "Er-Rahmân", m: "Dünyada tüm yaratıklara sonsuz rahmet eden." }
  ];

  const dayIdx = typeof dayOfYear === 'function' ? dayOfYear() : 0;
  const esma = list[dayIdx % list.length] || list[0];

  arEl.innerHTML = `<div style="font-family:'Amiri',serif; font-size:clamp(1.5rem, 2vw, 2.2rem); color:var(--gold); line-height:1.3; font-weight:700; text-align:right; word-break:break-word; max-width:100%; direction:rtl;">${esma.ar || ''}</div>`;
  if (meanEl) meanEl.textContent = esma.m || '';
}

function renderDailyZikir() {
  const textEl = document.getElementById('zikirText');
  const noteEl = document.getElementById('zikirNote');
  const countLbl = document.getElementById('zikirCountLabel');
  if (!textEl) return;

  const list = (Array.isArray(DAILY_ZIKIR) && DAILY_ZIKIR.length) ? DAILY_ZIKIR : [
    { ar: "اللَّهُ أَكْبَرُ", tr: "Allahû Ekber", m: "Allah en büyüktür.", n: "33 defa" }
  ];

  const dayIdx = typeof dayOfYear === 'function' ? dayOfYear() : 0;
  const zikir = list[dayIdx % list.length] || list[0];

  if (countLbl) countLbl.textContent = zikir.n || '33 defa';

  const displayHtml = zikir.ar
    ? `<div style="font-family:'Amiri',serif; font-size:clamp(1.4rem, 1.8vw, 2rem); color:var(--teal); line-height:1.4; direction:rtl; text-align:right; font-weight:700; word-break:break-word; max-width:100%;">${zikir.ar}</div>
       <div style="font-size:0.95rem; font-weight:800; color:var(--teal); text-align:right; margin-top:2px;">${zikir.t || zikir.tr || ''}</div>`
    : `<div style="font-size:0.95rem; font-weight:800; color:var(--tx); text-align:right;">${zikir.t || zikir.tr || zikir.m || ''}</div>`;

  textEl.innerHTML = displayHtml;
  if (noteEl) noteEl.textContent = zikir.m ? zikir.m : '';
}

/* ── RENDER: GÖREVLER ── */

window.resetTimelineHover = function () {
  const pop = document.getElementById('timelineFloatingTooltip');
  if (pop) {
    pop.style.display = 'none';
  }

  const el = document.getElementById('timelineHoverTitle');
  if (!el) return;
  el.style.borderColor = 'rgba(255,255,255,0.2)';
  el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.5)';
  el.style.background = '#0f172a';
  el.style.color = '#f8fafc';

  let curP = { n: 'Namaz', t: '--:--' };
  if (PRAYERS && PRAYERS.length === 5) {
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();
    let curIdx = PRAYERS.length - 1;
    PRAYERS.forEach((p, i) => {
      const [h, m] = p.t.split(':').map(Number);
      if (nowMin >= h * 60 + m) curIdx = i;
    });
    curP = PRAYERS[curIdx];
  }
  const pIcons = { 'Sabah': '🌅', 'Öğle': '☀️', 'İkindi': '🌤️', 'Akşam': '🌇', 'Yatsı': '🌙' };
  const icon = pIcons[curP.n] || '🕌';

  el.innerHTML = `<span style="color:#fbbf24; font-weight:900; font-size:0.70rem;">${icon} AKTİF VAKİT: ${curP.n.toUpperCase()}</span> <span style="color:#ffffff; font-weight:800; font-family:'JetBrains Mono',monospace; font-size:0.66rem;">(${curP.t})</span>`;
};

/* ── RENDER: HEADER NAMAZ VAKİTLERİ (Premium Tasarım) ── */
function renderHeaderPrayer() { renderHeaderPrayerVakit(); } // eski ismi yönlendir

/* ── DIAL HOVER TOOLTIP ── */
function getDefaultDialTitle() {
  if (!PRAYERS || PRAYERS.length !== 5) return 'VAKİT KADRANI';
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  let curIdx = PRAYERS.length - 1;
  PRAYERS.forEach((p, i) => {
    const [h, m] = p.t.split(':').map(Number);
    if (nowMin >= h * 60 + m) curIdx = i;
  });
  const curP = PRAYERS[curIdx];
  const pIcons = { 'Sabah': '🌅', 'Öğle': '☀️', 'İkindi': '🌤️', 'Akşam': '🌇', 'Yatsı': '🌙' };
  const icon = pIcons[curP.n] || '🕌';
  return `<span style="color:var(--gold);font-weight:900;font-size:0.72rem;letter-spacing:0.06em;text-transform:uppercase;">${icon} AKTİF VAKİT: ${curP.n.toUpperCase()}</span><span style="color:var(--tx2);font-size:0.6rem;margin-left:8px;font-weight:600;">(${curP.t})</span>`;
}

window.setDialHoverTitle = function (name, rangeStr, color) {
  const el = document.getElementById('dialHoverTitle');
  if (!el) return;
  const accentColor = color || 'var(--gold)';
  el.innerHTML = `<span style="color:${accentColor};font-weight:900;font-size:0.72rem;letter-spacing:0.06em;text-transform:uppercase;">${name}</span><span style="color:var(--tx2);font-size:0.6rem;margin-left:8px;font-weight:600;">${rangeStr}</span>`;
  el.style.opacity = '1';
  el.style.transform = 'translateY(0)';
  el.style.background = 'var(--bg2)';
  el.style.borderColor = 'var(--bd)';
};
window.clearDialHoverTitle = function () {
  const el = document.getElementById('dialHoverTitle');
  if (!el) return;
  el.style.opacity = '0';
  el.style.transform = 'translateY(-4px)';
  setTimeout(() => {
    if (el.style.opacity === '0') {
      el.innerHTML = getDefaultDialTitle();
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  }, 250);
};
// İlk render
(function () {
  const el = document.getElementById('dialHoverTitle');
  if (el) {
    el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    el.innerHTML = getDefaultDialTitle();
  }
})();

/* ── RENDER: ZİKİR ── */

function completeDailyZikir() {
  const ds = today();
  if (!S.zikirDone) S.zikirDone = {};
  S.zikirDone[ds] = !S.zikirDone[ds];
  save(); renderDailyZikir(); renderWeeklyIbadet();
  toast(S.zikirDone[ds] ? 'Günün zikri tamamlandı' : 'Zikir işareti kaldırıldı', S.zikirDone[ds] ? 's' : 'i');
  if (S.zikirDone[ds]) playSound('done');
}

let activeZikirTab = 'all';

function parseZikirTarget(z) {
  if (!z || !z.n) return 33;
  const m = String(z.n).match(/\d+/);
  return m ? parseInt(m[0], 10) : 33;
}

function switchZikirTab(tab, el) {
  activeZikirTab = tab;
  document.querySelectorAll('.zikir-tabs .fchip').forEach(c => c.classList.remove('on'));
  if (el) el.classList.add('on');
  renderZikirView();
}

function filterZikirView() {
  renderZikirView();
}

function tapCardZikir(idx) {
  const ds = today();
  if (!S.zikirCardCounts) S.zikirCardCounts = {};
  if (!S.zikirCardCounts[ds]) S.zikirCardCounts[ds] = {};

  const z = DAILY_ZIKIR[idx];
  const targetCnt = parseZikirTarget(z);

  const cur = S.zikirCardCounts[ds][idx] || 0;
  const newCnt = cur + 1;
  S.zikirCardCounts[ds][idx] = newCnt;

  save();
  playSound('bell');

  if (newCnt >= targetCnt && cur < targetCnt) {
    triggerConfetti();
    toast(`🎉 Zikir tamamlandı! Tamamlananlar sekmesine aktarıldı.`, 's');
  }

  renderZikirView();
}

function resetCardZikir(idx) {
  const ds = today();
  if (S.zikirCardCounts?.[ds]) {
    delete S.zikirCardCounts[ds][idx];
  }
  save();
  renderZikirView();
  toast('Zikir sıfırlandı, Günlük Zikirler sekmesine geri eklendi.', 'i');
}

function normTR(s) {
  if (!s) return '';
  return String(s)
    .toLowerCase()
    .replace(/â/g, 'a')
    .replace(/î/g, 'i')
    .replace(/û/g, 'u')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[-\s']/g, '');
}

function renderZikirView() {
  renderEsma();
  renderDailyZikir();

  const cont = document.getElementById('zikirGridContainer');
  if (!cont) return;

  const qInp = document.getElementById('searchZikirInp');
  const q = (qInp ? qInp.value : '').toLowerCase().trim();
  const nQ = normTR(q);

  const ds = today();
  const cardCounts = S.zikirCardCounts?.[ds] || {};

  const allZikirs = (DAILY_ZIKIR || []).map((z, i) => {
    const target = parseZikirTarget(z);
    const cnt = cardCounts[i] || 0;
    const isDone = cnt >= target;
    return { ...z, origIdx: i, target, cnt, isDone };
  });

  const pendingZikirs = allZikirs.filter(z => !z.isDone);
  const completedZikirs = allZikirs.filter(z => z.isDone);

  // Sayıcıları güncelle
  const zAll = pendingZikirs.length;
  const zDone = completedZikirs.length;
  const zEsma = ESMA_LIST ? ESMA_LIST.length : 99;

  const setZCnt = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  setZCnt('zcnt-all', zAll);
  setZCnt('zcnt-done', zDone);
  setZCnt('zcnt-esma', zEsma);

  let html = '';

  if (activeZikirTab === 'esma') {
    let list = ESMA_LIST || [];
    if (q) {
      list = list.filter(e =>
        normTR(e.tr).includes(nQ) ||
        (e.tr || '').toLowerCase().includes(q) ||
        (e.m || '').toLowerCase().includes(q) ||
        normTR(e.m).includes(nQ) ||
        (e.ar || '').includes(q)
      );
    }
    if (!list.length) {
      cont.innerHTML = `<div class="empty" style="grid-column:1/-1;"><div class="empty-ico">🔍</div><div class="empty-txt">Esmâ bulunamadı.</div></div>`;
      return;
    }
    html = list.map((e, idx) => `
      <div class="esma-item-card" style="text-align:right;">
        <div class="esma-card-hdr">
          <span class="esma-num">#${idx + 1}</span>
        </div>
        <div class="zikir-card-ar" style="text-align:right; direction:rtl;">${esc(e.ar || '')}</div>
        <div class="zikir-card-tr" style="text-align:right; font-weight:700; color:var(--gold); font-size:0.95rem; margin:2px 0;">${esc(e.tr || '')}</div>
        <div class="zikir-card-meaning" style="text-align:right;">${esc(e.m || '')}</div>
      </div>
    `).join('');
  } else if (activeZikirTab === 'done') {
    let list = completedZikirs;
    if (q) {
      list = list.filter(z =>
        normTR(z.t || z.tr).includes(nQ) ||
        ((z.t || z.tr) || '').toLowerCase().includes(q) ||
        (z.m || '').toLowerCase().includes(q) ||
        normTR(z.m).includes(nQ) ||
        (z.ar || '').includes(q)
      );
    }
    if (!list.length) {
      cont.innerHTML = `<div class="empty" style="grid-column:1/-1;"><div class="empty-ico">✅</div><div class="empty-txt">Henüz tamamlanan zikir yok.</div></div>`;
      return;
    }
    html = list.map(z => `
      <div class="zikir-item-card done" style="opacity:0.75; border-color:var(--grn); text-align:right;">
        <div>
          <div class="zikir-card-ar" style="text-align:right; direction:rtl;">${esc(z.ar || '')}</div>
          <div class="zikir-card-tr" style="text-align:right; font-weight:700; color:var(--teal); font-size:0.95rem; margin:2px 0;">${esc(z.t || z.tr || '')}</div>
          ${z.m ? `<div class="zikir-card-meaning" style="text-align:right;">${esc(z.m)}</div>` : ''}
        </div>
        <div class="zikir-card-foot">
          <span class="zikir-count-pill" style="background:var(--grnbg); color:var(--grn);">✅ Tamamlandı (${z.cnt}/${z.target})</span>
          <button class="zikir-tap-btn" onclick="resetCardZikir(${z.origIdx})" style="border-color:var(--bd); color:var(--tx2); background:var(--sf3);" title="Sıfırla ve listeye geri al">↺ Sıfırla</button>
        </div>
      </div>
    `).join('');
  } else {
    let list = pendingZikirs;
    if (q) {
      list = list.filter(z =>
        normTR(z.t || z.tr).includes(nQ) ||
        ((z.t || z.tr) || '').toLowerCase().includes(q) ||
        (z.m || '').toLowerCase().includes(q) ||
        normTR(z.m).includes(nQ) ||
        (z.ar || '').includes(q)
      );
    }
    if (!list.length) {
      cont.innerHTML = `<div class="empty" style="grid-column:1/-1;"><div class="empty-ico">🏆</div><div class="empty-txt">Tüm zikirler tamamlandı! 🎉</div></div>`;
      return;
    }
    html = list.map(z => `
      <div class="zikir-item-card" style="text-align:right;">
        <div>
          <div class="zikir-card-ar" style="text-align:right; direction:rtl;">${esc(z.ar || '')}</div>
          <div class="zikir-card-tr" style="text-align:right; font-weight:700; color:var(--teal); font-size:0.95rem; margin:2px 0;">${esc(z.t || z.tr || '')}</div>
          ${z.m ? `<div class="zikir-card-meaning" style="text-align:right;">${esc(z.m)}</div>` : ''}
        </div>
        <div class="zikir-card-foot">
          <span class="zikir-count-pill">🎯 Hedef: ${z.target}x ${z.cnt > 0 ? `(${z.cnt}/${z.target})` : ''}</span>
          <button class="zikir-tap-btn" onclick="tapCardZikir(${z.origIdx})">👆 Say (+1)</button>
        </div>
      </div>
    `).join('');
  }

  cont.innerHTML = html;
}

/* ── RENDER: HAFTALIK İBADET ── */
function renderWeeklyIbadet() {
  const box = document.getElementById('weeklyIbadetDays');
  const score = document.getElementById('weeklyIbadetScore');
  if (!box || !score) return;
  const dnames = ['P', 'S', 'Ç', 'P', 'C', 'C', 'P'];
  let total = 0;
  const html = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(); date.setDate(date.getDate() - (6 - i));
    const ds = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const cnt = PRAYERS.filter(p => S.prayers[ds]?.[p.n]).length;
    total += cnt;
    const pct = cnt / 5 * 100;
    const idx = date.getDay() === 0 ? 6 : date.getDay() - 1;
    return `<div class="wi-day ${i === 6 ? 'today ' : ''} ${cnt === 5 ? 'full' : ''}" title="${ds} · ${cnt}/5">
      <div class="wi-bar"><div class="wi-fill" style="height:${Math.max(8, pct)}%"></div></div>
      <div class="wi-label">${dnames[idx]}</div>
    </div>`;
  }).join('');
  score.textContent = `${total}/35`;
  box.innerHTML = html;
}

/* ── RENDER: ALIŞKANLIKLAR ── */
function renderHabits() {
  const dnames = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'];
  const containers = document.querySelectorAll('.habits-view-list');
  if (!containers.length) return;
  const html = HABITS.map((h, idx) => {
    const str = streak(h.id);
    const dots = Array.from({ length: 7 }, (_, i) => {
      const ds = dOff(6 - i);
      const isDone = !!(S.habits[ds]?.[h.id]);
      const isT = i === 6;
      const d = new Date(); d.setDate(d.getDate() - (6 - i));
      const dn = dnames[d.getDay() === 0 ? 6 : d.getDay() - 1];
      return `<div class="habit-day-wrap">
        <div class="hdot${isDone ? ' done' : ''}${isT ? ' today' : ''}" onclick="toggleHabit('${h.id}','${ds}')" title="${ds}">${isDone ? '✓' : ''}</div>
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
  containers.forEach(el => { el.innerHTML = html; });
}

/* ── ALIÞKANLIK MODAL ── */
function addHabitPrompt() {
  _habitEditIdx = -1;
  document.getElementById('habitModalTitle').textContent = '✨ Yeni Alışkanlık';
  document.getElementById('habitModalSub').textContent = 'Başına emoji ekleyebilirsiniz';
  document.getElementById('habitModalInp').value = '';
  document.getElementById('habitModal').classList.add('on');
  setTimeout(() => document.getElementById('habitModalInp').focus(), 80);
}
function editHabitPrompt(idx) {
  const h = HABITS[idx]; if (!h) return;
  _habitEditIdx = idx;
  document.getElementById('habitModalTitle').textContent = '✏️ Alışkanlık Düzenle';
  document.getElementById('habitModalSub').textContent = 'Adı güncelleyip kaydedin';
  document.getElementById('habitModalInp').value = h.l;
  document.getElementById('habitModal').classList.add('on');
  setTimeout(() => { const inp = document.getElementById('habitModalInp'); inp.focus(); inp.select(); }, 80);
}
function saveHabitModal() {
  const label = document.getElementById('habitModalInp').value.trim();
  if (!label) { document.getElementById('habitModalInp').style.borderColor = 'var(--rose)'; return; }
  document.getElementById('habitModalInp').style.borderColor = '';
  if (_habitEditIdx === -1) {
    HABITS.push({ id: 'h_' + gid(), l: label });
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
  document.getElementById('catTimes').innerHTML = Object.entries(CATS).map(([k, c]) =>
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
  const arr = Array.isArray(t.subs) ? t.subs : [];
  const done = arr.filter(s => s?.done).length;
  return { done, total: arr.length, full: arr.length > 0 && done === arr.length };
}
function toggleTaskExpand(id) {
  expandedTasks.has(id) ? expandedTasks.delete(id) : expandedTasks.add(id);
  renderTasks();
}
let selectedTaskIds = new Set();
let isSelectMode = false;
let currentVisibleTasks = [];

/* ── TOPLU İŞLEMLER VE ÇOKLU SEÇİM ── */
function toggleSelectMode() {
  isSelectMode = !isSelectMode;
  const btn = document.getElementById('btnToggleSelect');
  if (btn) btn.classList.toggle('btn-select-mode-active', isSelectMode);
  if (!isSelectMode) {
    selectedTaskIds.clear();
  }
  updateBulkDock();
  renderTasks();
}

function toggleTaskSelection(id, e) {
  if (e) e.stopPropagation();
  if (selectedTaskIds.has(id)) {
    selectedTaskIds.delete(id);
  } else {
    selectedTaskIds.add(id);
  }
  updateBulkDock();
  renderTasks();
}

function clearTaskSelection() {
  selectedTaskIds.clear();
  isSelectMode = false;
  const btn = document.getElementById('btnToggleSelect');
  if (btn) btn.classList.remove('btn-select-mode-active');
  updateBulkDock();
  renderTasks();
}

function toggleSelectAllVisible() {
  if (!currentVisibleTasks.length) return;
  const allSelected = currentVisibleTasks.every(t => selectedTaskIds.has(t.id));
  if (allSelected) {
    currentVisibleTasks.forEach(t => selectedTaskIds.delete(t.id));
  } else {
    currentVisibleTasks.forEach(t => selectedTaskIds.add(t.id));
  }
  updateBulkDock();
  renderTasks();
}

function updateBulkDock() {
  const dock = document.getElementById('bulkActionDock');
  const countEl = document.getElementById('bulkSelectedCount');
  const fchipSel = document.getElementById('fchipSelected');
  const btnSelAll = document.getElementById('btnSelectAllVis');

  if (countEl) countEl.textContent = selectedTaskIds.size;
  if (fchipSel) fchipSel.style.display = selectedTaskIds.size > 0 ? 'inline-block' : 'none';

  if (selectedTaskIds.size > 0 || isSelectMode) {
    if (dock) dock.style.display = 'flex';
  } else if (dock) {
    dock.style.display = 'none';
  }

  const catSel = document.getElementById('bulkCatSel');
  if (catSel) {
    let opts = '<option value="" disabled selected>📂 Kategori Değiştir...</option>';
    Object.entries(CATS).forEach(([k, c]) => {
      opts += `<option value="${k}">${c.i} ${c.l}</option>`;
    });
    catSel.innerHTML = opts;
  }

  if (btnSelAll && currentVisibleTasks.length) {
    const allSel = currentVisibleTasks.every(t => selectedTaskIds.has(t.id));
    btnSelAll.textContent = allSel ? '☒ Seçimi Kaldır' : '☑️ Tümünü Seç';
  }
}

/* ── TOPLU EYLEMLER (BULK ACTIONS) ── */
function bulkMarkDone(doneState) {
  if (!selectedTaskIds.size) { toast('Lütfen önce görev seçin.', 'i'); return; }
  let count = 0;
  S.tasks.forEach(t => {
    if (selectedTaskIds.has(t.id)) {
      t.done = doneState;
      t.completedAt = doneState ? new Date().toISOString() : null;
      count++;
    }
  });
  if (doneState) triggerConfetti();
  save(); render();
  toast(`${count} görev ${doneState ? 'tamamlandı' : 'sıfırlandı'}.`, 's');
}

function bulkChangeCategory(catKey) {
  if (!catKey || !CATS[catKey]) return;
  if (!selectedTaskIds.size) { toast('Lütfen önce görev seçin.', 'i'); return; }
  let count = 0;
  S.tasks.forEach(t => {
    if (selectedTaskIds.has(t.id)) {
      t.cat = catKey;
      count++;
    }
  });
  save(); render();
  toast(`${count} görevin kategorisi güncellendi.`, 's');
  const catSel = document.getElementById('bulkCatSel');
  if (catSel) catSel.selectedIndex = 0;
}

function bulkChangePriority(priKey) {
  if (!priKey) return;
  if (!selectedTaskIds.size) { toast('Lütfen önce görev seçin.', 'i'); return; }
  let count = 0;
  S.tasks.forEach(t => {
    if (selectedTaskIds.has(t.id)) {
      t.pri = priKey;
      count++;
    }
  });
  save(); render();
  toast(`${count} görevin önceliği güncellendi.`, 's');
  const priSel = document.getElementById('bulkPriSel');
  if (priSel) priSel.selectedIndex = 0;
}

function bulkSetDueDatePrompt() {
  if (!selectedTaskIds.size) { toast('Lütfen önce görev seçin.', 'i'); return; }
  const defaultVal = today();
  const dateStr = prompt('Seçili görevler için bitiş tarihi girin (YYYY-AA-GG veya boş bırakın):', defaultVal);
  if (dateStr === null) return;
  let count = 0;
  S.tasks.forEach(t => {
    if (selectedTaskIds.has(t.id)) {
      t.due = dateStr.trim();
      count++;
    }
  });
  save(); render();
  toast(`${count} görevin tarihi güncellendi.`, 's');
}

function bulkDeleteSelected() {
  if (!selectedTaskIds.size) { toast('Lütfen önce görev seçin.', 'i'); return; }
  const count = selectedTaskIds.size;
  showConfirm(
    '🗑️ Toplu Görev Silme',
    `Seçili ${count} görevi silmek istediğinize emin misiniz?`,
    'Bu işlem geri alınamaz.',
    '🗑️ Evet, Sil',
    () => {
      S.tasks = S.tasks.filter(t => !selectedTaskIds.has(t.id));
      selectedTaskIds.clear();
      save(); render();
      toast(`${count} görev silindi.`, 'i');
    },
    true
  );
}

/* ── TOPLU GÖREV EKLEME MODAL VE AYRIŞTIRICI ── */
function openBatchAddModal() {
  const sel = document.getElementById('batchDefaultCat');
  if (sel) {
    sel.innerHTML = Object.entries(CATS).map(([k, c]) =>
      `<option value="${k}">${c.i} ${c.l}</option>`
    ).join('');
    if (activeCat && CATS[activeCat]) sel.value = activeCat;
  }
  const inp = document.getElementById('batchTasksInput');
  if (inp) {
    inp.value = '';
    inp.oninput = () => {
      const lines = inp.value.split('\n').map(l => l.trim()).filter(Boolean);
      const cntEl = document.getElementById('batchLinesCount');
      if (cntEl) cntEl.textContent = `${lines.length} görev algılandı`;
    };
  }
  document.getElementById('batchTaskModal').classList.add('on');
  setTimeout(() => document.getElementById('batchTasksInput')?.focus(), 100);
}

function submitBatchAdd() {
  const inp = document.getElementById('batchTasksInput');
  const text = (inp ? inp.value : '').trim();
  if (!text) { toast('Lütfen en az bir görev yazın.', 'e'); return; }

  const defaultCat = document.getElementById('batchDefaultCat')?.value || 'diger';
  const defaultPri = document.getElementById('batchDefaultPri')?.value || 'orta';

  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  let addedCount = 0;

  lines.forEach(line => {
    let name = line;
    let cat = defaultCat;
    let pri = defaultPri;
    let due = '';

    const catMatch = name.match(/#([\wığüşöçİĞÜŞÖÇ]+)/i);
    if (catMatch) {
      const tag = catMatch[1].toLowerCase();
      const matchedKey = Object.keys(CATS).find(k => k.toLowerCase() === tag || CATS[k].l.toLowerCase().includes(tag));
      if (matchedKey) cat = matchedKey;
      name = name.replace(catMatch[0], '').trim();
    }

    const priMatch = name.match(/!([\wığüşöçİĞÜŞÖÇ]+)/i);
    if (priMatch) {
      const pTag = priMatch[1].toLowerCase();
      if (pTag.includes('yük') || pTag.includes('yuk')) pri = 'yuksek';
      else if (pTag.includes('or')) pri = 'orta';
      else if (pTag.includes('düş') || pTag.includes('dus')) pri = 'dusuk';
      name = name.replace(priMatch[0], '').trim();
    }

    const dueMatch = name.match(/@([\w\d\-]+)/i);
    if (dueMatch) {
      const dTag = dueMatch[1].toLowerCase();
      if (dTag.includes('bug') || dTag.includes('bugun')) due = today();
      else if (dTag.includes('yar') || dTag.includes('yarin')) due = dOff(-1);
      else if (/^\d{4}-\d{2}-\d{2}$/.test(dTag)) due = dTag;
      name = name.replace(dueMatch[0], '').trim();
    }

    if (name) {
      S.tasks.unshift({
        id: gid(), name, cat, pri, due,
        rep: 'yok', repDays: [], est: '', tag: '', note: '',
        subs: [], done: false, created: new Date().toISOString(), completedAt: null,
      });
      addedCount++;
    }
  });

  save(); render(); closeModal('batchTaskModal');
  toast(`${addedCount} toplu görev eklendi! 🎉`, 's');
}

/* ── RENDER: GÖREVLER ── */
function toggleTaskActionsMenu(e) {
  if (e) e.stopPropagation();
  const menu = document.getElementById('tasksActionsMenu');
  if (menu) menu.classList.toggle('on');
}

function toggleTaskFocusPanel() {
  const panel = document.getElementById('tasksFocusPanel');
  const btn = document.getElementById('btnFocusPanelToggle');
  if (!panel) return;
  const isHidden = panel.style.display === 'none' || !panel.style.display;
  panel.style.display = isHidden ? 'grid' : 'none';
  if (btn) btn.classList.toggle('on', isHidden);
  if (isHidden) {
    renderSessions();
    renderCatTimes();
    drawTimer();
  }
}

function toggleTaskHabitsPanel() {
  const panel = document.getElementById('tasksHabitsPanel');
  const btn = document.getElementById('btnHabitsPanelToggle');
  if (!panel) return;
  const isHidden = panel.style.display === 'none' || !panel.style.display;
  panel.style.display = isHidden ? 'block' : 'none';
  if (btn) btn.classList.toggle('on', isHidden);
  if (isHidden) {
    renderHabits();
  }
}

// Close actions menu when clicking outside
window.addEventListener('click', function (e) {
  if (!e.target.closest('.tasks-action-dropdown-wrap')) {
    document.getElementById('tasksActionsMenu')?.classList.remove('on');
  }
});

function updatePgHdr() {
  const c = activeCat ? CATS[activeCat] : null;
  document.getElementById('pgTitle').textContent = c ? `${c.i} ${c.l}` : '🗂️ Tüm Görevler';
  const pend = S.tasks.filter(t => (activeCat ? t.cat === activeCat : true) && !t.done).length;
  document.getElementById('pgSub').textContent = c ? `${pend} bekleyen görev` : 'Bekleyen ve tamamlanan görevlerinizi yönetin';

  // Günlük Görev İlerleme Barı Hesaplama (Sadece Bugüne Ait Görevler)
  const todayTasks = S.tasks.filter(t => (activeCat ? t.cat === activeCat : true) && isTaskForToday(t));
  const totalCnt = todayTasks.length;
  const doneCnt = todayTasks.filter(t => t.done).length;
  const pct = totalCnt > 0 ? Math.round((doneCnt / totalCnt) * 100) : 0;

  const valEl = document.getElementById('taskProgVal');
  const fillEl = document.getElementById('taskProgFill');
  if (valEl) valEl.textContent = totalCnt > 0 ? `%${pct} (${doneCnt}/${totalCnt})` : 'Bugün görev yok';
  if (fillEl) fillEl.style.width = `${totalCnt > 0 ? pct : 0}%`;
}

function subStats(t) {
  const arr = Array.isArray(t.subs) ? t.subs : [];
  const done = arr.filter(s => s?.done).length;
  return { done, total: arr.length, full: arr.length > 0 && done === arr.length };
}

function toggleTaskExpand(id) {
  expandedTasks.has(id) ? expandedTasks.delete(id) : expandedTasks.add(id);
  renderTasks();
}

function handleUnifiedInput(el) {
  renderTasks();
}

function quickAddUnified() {
  const inp = document.getElementById('unifiedInput') || document.getElementById('qaInp');
  if (!inp) return;
  let raw = inp.value.trim();
  if (!raw) { toast('Görev adı boş olamaz!', 'e'); return; }

  let name = raw;
  let cat = activeCat || Object.keys(CATS)[0] || 'diger';
  let pri = 'orta';
  let due = '';

  const catMatch = name.match(/#([\wığüşöçİĞÜŞÖÇ]+)/i);
  if (catMatch) {
    const tag = catMatch[1].toLowerCase();
    const matchedKey = Object.keys(CATS).find(k => k.toLowerCase() === tag || CATS[k].l.toLowerCase().includes(tag));
    if (matchedKey) cat = matchedKey;
    name = name.replace(catMatch[0], '').trim();
  }

  const priMatch = name.match(/!([\wığüşöçİĞÜŞÖÇ]+)/i);
  if (priMatch) {
    const pTag = priMatch[1].toLowerCase();
    if (pTag.includes('yük') || pTag.includes('yuk')) pri = 'yuksek';
    else if (pTag.includes('or')) pri = 'orta';
    else if (pTag.includes('düş') || pTag.includes('dus')) pri = 'dusuk';
    name = name.replace(priMatch[0], '').trim();
  }

  const dueMatch = name.match(/@([\w\d\-]+)/i);
  if (dueMatch) {
    const dTag = dueMatch[1].toLowerCase();
    if (dTag.includes('bug') || dTag.includes('bugun')) due = today();
    else if (dTag.includes('yar') || dTag.includes('yarin')) due = dOff(-1);
    else if (/^\d{4}-\d{2}-\d{2}$/.test(dTag)) due = dTag;
    name = name.replace(dueMatch[0], '').trim();
  }

  if (!name) { toast('Görev adı boş olamaz!', 'e'); return; }

  S.tasks.unshift({
    id: gid(), name, cat, pri, due,
    rep: 'yok', repDays: [], est: '', tag: '', note: '',
    subs: [], done: false, created: new Date().toISOString(), completedAt: null,
  });

  save(); render(); inp.value = '';
  toast('Hızlı görev eklendi! 🎉', 's');
}

function renderTasks() {
  updatePgHdr();
  let baseTasks = S.tasks.slice();
  if (activeCat) baseTasks = baseTasks.filter(t => t.cat === activeCat);

  const td = today();
  // Canlı Filtre Sayılarını Güncelle
  const cAll = baseTasks.length;
  const cPend = baseTasks.filter(t => !t.done).length;
  const cToday = baseTasks.filter(isTaskDueToday).length;
  const cDone = baseTasks.filter(t => t.done).length;
  const cOverdue = baseTasks.filter(t => t.due && !t.done && t.due < td).length;
  const cSel = selectedTaskIds.size;

  const setCnt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setCnt('cnt-all', cAll);
  setCnt('cnt-pending', cPend);
  setCnt('cnt-today', cToday);
  setCnt('cnt-done', cDone);
  setCnt('cnt-overdue', cOverdue);
  setCnt('cnt-selected', cSel);

  const overdueBtn = document.getElementById('fchip-overdue');
  if (overdueBtn) overdueBtn.style.display = cOverdue > 0 ? 'inline-flex' : 'none';

  let tasks = baseTasks.slice();
  const uInp = document.getElementById('unifiedInput') || document.getElementById('searchInp');
  const q = (uInp ? uInp.value : '').toLowerCase().trim();
  if (q) tasks = tasks.filter(t =>
    t.name.toLowerCase().includes(q) || (t.note || '').toLowerCase().includes(q) || (t.tag || '').toLowerCase().includes(q)
  );

  if (statusF === 'pending') tasks = tasks.filter(t => !t.done);
  else if (statusF === 'done') tasks = tasks.filter(t => t.done);
  else if (statusF === 'today') tasks = tasks.filter(isTaskDueToday);
  else if (statusF === 'overdue') tasks = tasks.filter(t => t.due && !t.done && t.due < td);
  else if (statusF === 'selected') tasks = tasks.filter(t => selectedTaskIds.has(t.id));

  currentVisibleTasks = tasks.slice();
  updateBulkDock();

  const sortEl = document.getElementById('sortSel');
  const sortV = sortEl ? sortEl.value : 'priority';
  const po = { yuksek: 0, orta: 1, dusuk: 2 };
  tasks.sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    if (sortV === 'priority') return (po[a.pri] || 1) - (po[b.pri] || 1);
    if (sortV === 'due') { if (!a.due && !b.due) return 0; if (!a.due) return 1; if (!b.due) return -1; return a.due.localeCompare(b.due); }
    if (sortV === 'name') return a.name.localeCompare(b.name, 'tr');
    if (sortV === 'cat') return (CATS[a.cat]?.l || '').localeCompare(CATS[b.cat]?.l || '', 'tr');
    return new Date(b.created) - new Date(a.created);
  });
  const cont = document.getElementById('taskList');
  if (!tasks.length) {
    cont.innerHTML = `<div class="empty"><div class="empty-ico">📭</div><div class="empty-txt">Bu filtrede görev bulunamadı.</div><button class="empty-btn" onclick="openAdd()">+ Yeni Görev Ekle</button></div>`;
    return;
  }
  let html = '';
  if (sortV === 'cat') {
    const groups = {};
    tasks.forEach(t => {
      const ck = t.cat || 'diger';
      if (!groups[ck]) groups[ck] = [];
      groups[ck].push(t);
    });
    Object.entries(groups).forEach(([ck, gTasks]) => {
      const c = CATS[ck] || { l: 'Diğer', i: '📌' };
      html += `<div class="task-group-cat-hdr">
        <span class="task-group-cat-ico">${c.i}</span>
        <span>${esc(c.l)}</span>
        <span class="task-group-cat-count">${gTasks.length}</span>
      </div>
      <div class="tcards">${gTasks.map(tHtml).join('')}</div>`;
    });
  } else {
    const pend = tasks.filter(t => !t.done), done = tasks.filter(t => t.done);
    if (pend.length) html += `<div class="tg"><div class="tg-hdr"><div class="tg-lbl">Bekliyor</div><div class="tg-cnt">${pend.length}</div><div class="tg-ln"></div></div><div class="tcards">${pend.map(tHtml).join('')}</div></div>`;
    if (done.length) html += `<div class="tg"><div class="tg-hdr"><div class="tg-lbl">Tamamlandı</div><div class="tg-cnt">${done.length}</div><div class="tg-ln"></div></div><div class="tcards">${done.map(tHtml).join('')}</div></div>`;
  }
  cont.innerHTML = html;
}

function tHtml(t) {
  const c = CATS[t.cat] || Object.values(CATS)[0] || { l: '?', i: '📌', c: '#9aa0b8', bg: 'rgba(154,160,184,.12)' };
  const pc = { yuksek: '#f06878', orta: '#e8b84b', dusuk: '#4ade80' };
  const pb = { yuksek: 'rgba(240,104,120,.12)', orta: 'rgba(232,184,75,.12)', dusuk: 'rgba(74,222,128,.12)' };
  const pl = { yuksek: '🔴 Yüksek', orta: 'Orta', dusuk: '🟢 Düşük' };
  const st = subStats(t);
  const isExpanded = expandedTasks.has(t.id);
  const hasLong = st.total > 5;
  const isSelected = selectedTaskIds.has(t.id);

  let dueH = '';
  if (t.due) {
    const diff = (new Date(t.due + 'T12:00:00') - new Date()) / 86400000;
    const dc = diff < 0 ? 'color:#f06878' : diff < 1 ? 'color:#fb923c' : diff < 3 ? 'color:#e8b84b' : 'color:var(--tx3)';
    dueH = `<span class="chip" style="background:transparent;${dc}">📅 ${new Date(t.due + 'T12:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}</span>`;
  }
  const tagH = t.tag ? `<span class="chip" style="background:rgba(154,160,184,.12);color:var(--tx3)">#${esc(t.tag)}</span>` : '';
  const repLabels = { gunluk: '🔄 Her Gün', haftalik: '🔄 Haftalık', aylik: '🔄 Aylık', ay_son: '🔄 Ay Sonu', her_2_gunde: '🔄 Her 2 Günde Bir', ozel: '🔄 Özel' };
  let repH = '';
  if (t.rep && t.rep !== 'yok') {
    let repTxt = repLabels[t.rep] || '🔄';
    if (t.rep === 'haftalik' && Array.isArray(t.repDays) && t.repDays.length) {
      const dn = ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'];
      repTxt = '🔄 ' + t.repDays.map(d => dn[d]).join(', ');
    } else if (t.rep === 'aylik' && Array.isArray(t.repDays) && t.repDays.length) {
      repTxt = '🔄 Her ayın ' + t.repDays[0] + '.';
    }
    repH = `<span class="chip" style="background:rgba(154,160,184,.08);color:var(--tx3)">${repTxt}</span>`;
  }
  const remH = t.reminderTime && t.reminderRepeat && t.reminderRepeat !== 'none'
    ? `<span class="chip" style="background:rgba(62,207,176,.12);color:#059669">⏰ ${esc(t.reminderTime)}</span>`
    : '';
  const estH = t.est ? `<span class="chip" style="background:rgba(154,160,184,.08);color:var(--tx3)">⏱${esc(String(t.est))}dk</span>` : '';
  const progH = st.total ? `<span class="chip task-progress${st.full ? ' full' : ''}">✓ ${st.done}/${st.total}</span>` : '';

  // Sadeleştirme: Standart ("Orta") öncelik rozetini gizle, sadece Yüksek ve Düşük olanları göster
  const priChipH = (t.pri === 'yuksek' || t.pri === 'dusuk')
    ? `<span class="chip" style="background:${pb[t.pri]};color:${pc[t.pri]}">${pl[t.pri]}</span>`
    : '';

  const subsH = st.total ? `<div class="tc-subs">
    <div style="height:3px; background:var(--sf3); border-radius:2px; margin-bottom:6px; overflow:hidden;">
      <div style="height:100%; width:${st.total ? (st.done / st.total) * 100 : 0}%; background:var(--teal); transition:width 0.3s ease;"></div>
    </div>
    ${t.subs.map((s, i) =>
    `<div class="sub-row" onclick="toggleSub('${t.id}',${i})"><div class="sub-chk${s.done ? ' done' : ''}"></div><span class="sub-txt${s.done ? ' done' : ''}">${esc(s.text)}</span></div>`
  ).join('')}${hasLong ? `<button class="sub-more" onclick="event.stopPropagation();toggleTaskExpand('${t.id}')">${isExpanded ? 'Kapat' : 'Devamını göster (' + st.total + ')'}</button>` : ''}
  </div>` : '';

  const selectChkHtml = (isSelectMode || selectedTaskIds.size > 0)
    ? `<div class="tcard-select-chk${isSelected ? ' on' : ''}" onclick="toggleTaskSelection('${t.id}', event)">${isSelected ? '✓' : ''}</div>`
    : '';

  return `<div class="tcard${t.done ? ' done' : ''}${isSelected ? ' selected' : ''}${hasLong ? ' has-long-subs' : ''}${isExpanded ? ' expanded' : ''}">
    ${selectChkHtml}
    <div class="tcard-st" style="background:${safeColor(c.c)}"></div>
    <div class="pri-dot" style="background:${pc[t.pri] || '#9aa0b8'}"></div>
    <div class="chk${t.done ? ' done' : ''}" onclick="toggleTask('${t.id}')"></div>
    <div class="tc-body">
      <div class="tc-title">${esc(t.name)}</div>
      <div class="tc-meta">
        <span class="chip" style="background:${safeColor(c.bg)};color:${safeColor(c.c)}">${esc(c.i)} ${esc(c.l)}</span>
        ${priChipH}${progH}${dueH}${tagH}${repH}${remH}${estH}
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

const ISLAMIC_HOLY_DAYS = {
  '2026-01-16': { title: 'Berat Kandili', icon: '🌙', color: '#fbbf24' },
  '2026-02-18': { title: 'Ramazan Başlangıcı', icon: '☪️', color: '#3ecfb0' },
  '2026-03-15': { title: 'Kadir Gecesi', icon: '✨', color: '#fbbf24' },
  '2026-03-20': { title: 'Ramazan Bayramı 1. Gün', icon: '🎉', color: '#3ecfb0' },
  '2026-03-21': { title: 'Ramazan Bayramı 2. Gün', icon: '🎉', color: '#3ecfb0' },
  '2026-03-22': { title: 'Ramazan Bayramı 3. Gün', icon: '🎉', color: '#3ecfb0' },
  '2026-05-27': { title: 'Kurban Bayramı 1. Gün', icon: '🐑', color: '#fbbf24' },
  '2026-05-28': { title: 'Kurban Bayramı 2. Gün', icon: '🐑', color: '#fbbf24' },
  '2026-05-29': { title: 'Kurban Bayramı 3. Gün', icon: '🐑', color: '#fbbf24' },
  '2026-05-30': { title: 'Kurban Bayramı 4. Gün', icon: '🐑', color: '#fbbf24' },
  '2026-06-16': { title: 'Hicri Yılbaşı 1448', icon: '🌙', color: '#a78bfa' },
  '2026-06-25': { title: 'Aşure Günü', icon: '🥣', color: '#fbbf24' },
  '2026-08-25': { title: 'Mevlid Kandili', icon: '✨', color: '#fbbf24' },
  '2026-12-17': { title: 'Regaip Kandili', icon: '🌙', color: '#fbbf24' }
};

function getHijriStr(dateObj) {
  try {
    return new Intl.DateTimeFormat('tr-TR-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(dateObj);
  } catch (e) {
    return '';
  }
}

function selectCalendarDay(ds) { selectedDate = ds; renderCalendar(); }

function openDayDetailModal(ds) {
  selectedDate = ds || selectedDate || today();
  renderCalendar();

  const modal = document.getElementById('dayDetailModal');
  if (!modal) return;

  const dateObj = new Date(selectedDate + 'T12:00:00');
  const dateStr = dateObj.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' });
  const hijriStr = getHijriStr(dateObj);

  document.getElementById('dayDetailTitle').textContent = `🗓️ ${dateStr}`;
  document.getElementById('dayDetailSub').textContent = hijriStr ? `🌙 ${hijriStr}` : 'Günün detaylı görev ve ibadet takibi';

  // 1. Görevler Listesi
  const tasks = S.tasks.filter(t => t.due === selectedDate);
  const taskListEl = document.getElementById('dayDetailTasksList');
  if (taskListEl) {
    if (!tasks.length) {
      taskListEl.innerHTML = `<div style="font-size:0.76rem; color:var(--tx3); text-align:center; padding:12px; border:1px dashed var(--bd); border-radius:8px;">Bu gün için henüz görev eklenmemiş.</div>`;
    } else {
      taskListEl.innerHTML = tasks.map(t => {
        const cat = CATS[t.cat] || { n: 'Genel', c: '#9aa0b8' };
        return `<div style="display:flex; align-items:center; justify-content:space-between; padding:7px 10px; background:var(--sf); border:1px solid var(--bd); border-radius:8px; font-size:0.78rem;">
          <div style="display:flex; align-items:center; gap:8px; min-width:0; flex:1;">
            <input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggleTask('${t.id}'); openDayDetailModal('${selectedDate}');" style="cursor:pointer; width:15px; height:15px;"/>
            <span style="font-weight:700; color:var(--tx); ${t.done ? 'text-decoration:line-through; opacity:0.6;' : ''} overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${esc(t.name)}</span>
          </div>
          <span style="background:${cat.c}22; color:${cat.c}; border:1px solid ${cat.c}44; padding:2px 6px; border-radius:6px; font-weight:800; font-size:0.68rem;">${esc(cat.n)}</span>
        </div>`;
      }).join('');
    }
  }

  // 2. Namaz Vakitleri & Durumu
  const prayersEl = document.getElementById('dayDetailPrayersList');
  if (prayersEl) {
    const dayPrayers = S.prayers[selectedDate] || {};
    prayersEl.innerHTML = PRAYERS.map(p => {
      const isDone = !!dayPrayers[p.n];
      return `<div style="padding:6px; background:${isDone ? 'rgba(5, 150, 105, 0.15)' : 'var(--sf)'}; border:1px solid ${isDone ? 'var(--grn)' : 'var(--bd)'}; border-radius:8px;">
        <div style="font-size:0.72rem; font-weight:800; color:var(--tx);">${p.t}</div>
        <div style="font-size:0.65rem; color:${isDone ? 'var(--grn)' : 'var(--tx3)'}; margin-top:2px;">${isDone ? '✅ Kılındı' : '⚪ Kılınmadı'}</div>
      </div>`;
    }).join('');
  }

  modal.classList.add('on');
}

function renderCalendar() {
  const td = today();
  if (!selectedDate) selectedDate = td;
  const sel = new Date(selectedDate + 'T12:00:00');
  const year = sel.getFullYear(), month = sel.getMonth();
  const first = new Date(year, month, 1);
  const start = new Date(first);
  start.setDate(first.getDate() - (first.getDay() === 0 ? 6 : first.getDay() - 1));
  const dnames = ['PTS', 'SAL', 'ÇAR', 'PER', 'CUM', 'CMT', 'PAZ'];
  const calSubEl = document.getElementById('calSub');
  if (calSubEl) {
    calSubEl.textContent =
      new Date(selectedDate + 'T12:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' }) + ' için planlama';
  }
  const mt = document.getElementById('monthTitle');
  if (mt) {
    const gregStr = sel.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });
    const hijriStr = getHijriStr(sel);
    mt.innerHTML = `${gregStr} ${hijriStr ? `<span style="font-size:0.80rem; color:var(--gold); font-weight:700; margin-left:8px; font-family:'Amiri', serif;">🌙 ${hijriStr}</span>` : ''}`;
  }
  const heads = dnames.map(d => `<div class="mday-head">${d}</div>`).join('');
  const days = Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start); d.setDate(start.getDate() + i);
    const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const isT = ds === td, isSel = ds === selectedDate, other = d.getMonth() !== month;
    const tasks = S.tasks.filter(t => t.due === ds);
    const pending = tasks.filter(t => !t.done).length;
    const allDone = tasks.length > 0 && pending === 0;
    const dots = tasks.slice(0, 6).map(t =>
      `<div class="wdot" style="background:${safeColor(CATS[t.cat]?.c || '#9aa0b8')};opacity:${t.done ? 1 : .4}"></div>`
    ).join('');

    // Görev yoğunluğu (heat-map) hesaplama
    let heatClass = '';
    if (tasks.length > 0) {
      if (tasks.length <= 2) heatClass = ' heat-1';
      else if (tasks.length <= 4) heatClass = ' heat-2';
      else heatClass = ' heat-3';
    }

    // Görev başlığı önizlemeleri (Masaüstü için)
    let titleLines = '';
    if (tasks.length > 0) {
      titleLines = `<div class="wday-task-titles-list">
        ${tasks.slice(0, 2).map(t => `<div class="wday-task-title-line${t.done ? ' done' : ''}">${esc(t.name)}</div>`).join('')}
        ${tasks.length > 2 ? `<div class="wday-task-more-line">+${tasks.length - 2} daha</div>` : ''}
      </div>`;
    }

    const hoverAttrs = tasks.length > 0
      ? ` onmouseenter="showCalTooltip(event, '${ds}')" onmouseleave="hideCalTooltip()"`
      : '';

    const holy = ISLAMIC_HOLY_DAYS[ds];
    const holyBadge = holy
      ? `<div class="wday-holy-badge" title="${esc(holy.title)}" style="background:${holy.color}22; color:${holy.color}; border:1px solid ${holy.color}55;">${holy.icon} ${esc(holy.title)}</div>`
      : '';

    return `<div class="wday${isT ? ' today' : ''}${isSel ? ' sel' : ''}${other ? ' other' : ''}${tasks.length ? ' has-tasks' : ''}${allDone ? ' all-done' : ''}${heatClass}"${hoverAttrs}
      onclick="selectCalendarDay('${ds}'); openDayDetailModal('${ds}');"
      ondblclick="selectCalendarDay('${ds}'); openDayDetailModal('${ds}');">
      <div class="wday-n">${d.getDate()}</div>
      ${holyBadge}
      <div class="wdots">${dots}</div>
      ${tasks.length ? `<div class="wday-tasks-count-mobile">${tasks.length} görev</div>` : `<button class="wday-add" onclick="event.stopPropagation();selectCalendarDay('${ds}');openAddForSelectedDay()">+ Ekle</button>`}
      ${titleLines}
    </div>`;
  }).join('');
  document.getElementById('wgrid').innerHTML = heads + days;
}

window.calTooltipTimeout = null;
window.currentHoveredWday = null;
window.currentHoveredDs = null;

function showCalTooltip(e, ds) {
  if (window.calTooltipTimeout) clearTimeout(window.calTooltipTimeout);
  window.currentHoveredWday = e.currentTarget;
  window.currentHoveredDs = ds;

  const tooltip = document.getElementById('calTooltip');
  if (!tooltip) return;

  const tasks = S.tasks.filter(t => t.due === ds);
  if (!tasks.length) {
    tooltip.style.display = 'none';
    return;
  }

  const dateObj = new Date(ds + 'T12:00:00');
  const dateStr = dateObj.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });

  let html = `<div class="cal-tt-header">${dateStr} Görevleri</div>`;
  html += `<div class="cal-tt-list">`;

  tasks.forEach(t => {
    const cat = CATS[t.cat] || { n: 'Genel', c: '#9aa0b8' };
    const priMap = {
      'yuksek': { icon: '🔴', label: 'Yüksek' },
      'orta': { icon: '🟡', label: 'Orta' },
      'dusuk': { icon: '🟢', label: 'Düşük' }
    };
    const pri = priMap[t.pri] || { icon: '⚪', label: 'Normal' };
    const doneClass = t.done ? ' done' : '';

    html += `
      <div class="cal-tt-item${doneClass}" onclick="toggleCalTooltipTask('${t.id}', event)">
        <span class="cal-tt-status">${t.done ? '✅' : '⬜'}</span>
        <div class="cal-tt-content">
          <div class="cal-tt-name">${esc(t.name)}</div>
          <div class="cal-tt-meta">
            <span class="cal-tt-cat" style="color: ${safeColor(cat.c)};"><span class="cal-tt-dot" style="background: ${safeColor(cat.c)};"></span>${esc(cat.n)}</span>
            <span class="cal-tt-pri">${pri.icon} ${pri.label}</span>
          </div>
        </div>
      </div>
    `;
  });

  html += `</div>`;

  tooltip.innerHTML = html;
  tooltip.style.display = 'block';

  const rect = e.currentTarget.getBoundingClientRect();

  let top = window.scrollY + rect.top - tooltip.offsetHeight - 10;
  let left = window.scrollX + rect.left + (rect.width - tooltip.offsetWidth) / 2;

  // Bounds checking
  if (rect.top - tooltip.offsetHeight - 10 < 0) {
    top = window.scrollY + rect.bottom + 10;
  }

  if (left < 10) {
    left = 10;
  } else if (left + tooltip.offsetWidth > window.innerWidth - 10) {
    left = window.innerWidth - tooltip.offsetWidth - 10;
  }

  tooltip.style.top = `${top}px`;
  tooltip.style.left = `${left}px`;
}

function hideCalTooltip() {
  window.calTooltipTimeout = setTimeout(() => {
    const tooltip = document.getElementById('calTooltip');
    if (tooltip) tooltip.style.display = 'none';
  }, 120);
}

function toggleCalTooltipTask(id, event) {
  if (event) event.stopPropagation();
  toggleTask(id);
  renderCalendar();
  if (window.currentHoveredWday && window.currentHoveredDs) {
    showCalTooltip({ currentTarget: window.currentHoveredWday }, window.currentHoveredDs);
  }
}

function changeMonth(delta) {
  if (!selectedDate) selectedDate = today();
  const d = new Date(selectedDate + 'T12:00:00');
  const day = d.getDate(); d.setDate(1); d.setMonth(d.getMonth() + delta);
  const last = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(day, last));
  selectedDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  renderCalendar();
}

/* ── RENDER: ANALİTİK ── */
function habitRate(id, days) {
  let done = 0;
  for (let i = 0; i < days; i++) if (S.habits[dOff(i)]?.[id]) done++;
  return { done, total: days, pct: Math.round(done / (days || 1) * 100) };
}
function longestStreak(id, days = 365) {
  let best = 0, cur = 0;
  for (let i = days - 1; i >= 0; i--) {
    if (S.habits[dOff(i)]?.[id]) { cur++; best = Math.max(best, cur); } else cur = 0;
  }
  return best;
}
function habitSeriesHtml() {
  if (!HABITS.length) return '';
  const cards = HABITS.map(h => {
    const r7 = habitRate(h.id, 7);
    const r30 = habitRate(h.id, 30);
    const cur = streak(h.id);
    const best = longestStreak(h.id, 365);
    const dots = Array.from({ length: 7 }, (_, i) => {
      const ds = dOff(6 - i);
      const isDone = !!(S.habits[ds]?.[h.id]);
      return `<div class="sc-day${isDone ? ' done' : ''}${ds === today() ? ' today' : ''}" title="${ds}">${isDone ? '✓' : ''}</div>`;
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
  const start = t.due || (t.created?.slice(0, 10) || today());
  if (!start || ds < start || ds > today()) return false;
  const d1 = new Date(start + 'T12:00:00'), d2 = new Date(ds + 'T12:00:00');
  const diff = Math.round((d2 - d1) / 86400000); if (diff < 0) return false;
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
  const cards = Object.entries(CATS).map(([k, c]) => {
    let streak2 = 0, best = 0, cur2 = 0, done7 = 0, total7 = 0, done30 = 0, total30 = 0;
    const arr = Array.from({ length: 7 }, (_, i) => dOff(6 - i));
    const dots = arr.map((ds, i) => {
      const list = S.tasks.filter(t => t.cat === k && taskOccursOn(t, ds));
      const done = list.filter(t => (t.completedAt?.slice(0, 10) === ds) || (t.due === ds && t.done)).length;
      if (i >= 7 - 7) { done7 += done; total7 += list.length; }
      done30 += done; total30 += list.length;
      const cls = list.length === 0 ? '' : done === list.length ? 'done' : 'partial';
      return `<div class="sc-day ${cls}${ds === today() ? ' today' : ''}" title="${ds}">${done === list.length && list.length ? '✓' : done || ''}</div>`;
    }).join('');
    for (let i = 0; i < 30; i++) {
      const list = S.tasks.filter(t => t.cat === k && taskOccursOn(t, dOff(i)));
      const dn = list.filter(t => (t.completedAt?.slice(0, 10) === dOff(i)) || (t.due === dOff(i) && t.done)).length;
      if (list.length > 0 && dn === list.length) { streak2++; best = Math.max(best, streak2); } else streak2 = 0;
    }
    const p7 = total7 ? Math.round(done7 / total7 * 100) : 0;
    const p30 = total30 ? Math.round(done30 / total30 * 100) : 0;
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
  const total = S.tasks.length;
  const done = S.tasks.filter(t => t.done).length;
  const over = S.tasks.filter(t => t.due && t.due < today() && !t.done).length;
  const d = today();
  const focus = Object.values(S.catTime[d] || {}).reduce((a, b) => a + b, 0);
  const sess = S.timerSess[d] || 0;

  // Bu ay verimlilik oranı
  const curMonth = d.substring(0, 7);
  const monthTasks = S.tasks.filter(t => t.due && t.due.startsWith(curMonth));
  const monthDone = monthTasks.filter(t => t.done).length;
  const monthPct = monthTasks.length ? Math.round((monthDone / monthTasks.length) * 100) : 0;

  const cards = [
    { v: total, l: 'Toplam Görev', c: 'var(--tx)' },
    { v: done, l: 'Tamamlanan', c: 'var(--grn)', tr: '%' + Math.round(done / (total || 1) * 100) + ' oran' },
    { v: total - done, l: 'Bekleyen', c: 'var(--gold)' },
    { v: over, l: 'Geciken', c: 'var(--rose)' },
    { v: focus ? fmtSec(focus) : '0dk', l: 'Bugün Odak', c: 'var(--teal)' },
    { v: `%${monthPct}`, l: 'Bu Ay Verimlilik', c: 'var(--gold)', tr: `${monthDone}/${monthTasks.length} görev` },
  ];
  document.getElementById('agrid').innerHTML = cards.map(x =>
    `<div class="acard"><div class="aval" style="color:${x.c}">${x.v}</div><div class="albl">${x.l}</div>${x.tr ? `<div class="atrend">${x.tr}</div>` : ''}</div>`
  ).join('');
  document.getElementById('aperf').innerHTML = habitSeriesHtml() + catSeriesHtml();
  renderWeeklyIbadet();
}

/* ── RENDER: SAAT ── */
function renderSmartAssistant() {
  const el = document.getElementById('headerAssistantMsg');
  if (!el) return;
  const now = new Date();
  const h = now.getHours();
  const td = today();
  const tdTasks = S.tasks.filter(isTaskForToday);
  const done = tdTasks.filter(t => t.done).length;
  const total = tdTasks.length;
  const pct = total ? Math.round(done / total * 100) : 0;
  const namazDone = PRAYERS.filter(p => S.prayers[td]?.[p.n]).length;

  let msg = '';
  if (h >= 4 && h < 6) msg = `🌅 Sabah namazı vakti • ${namazDone}/5 namaz`;
  else if (h >= 6 && h < 12) msg = `☀️ Günaydın! • ${done}/${total} görev tamamlandı`;
  else if (h >= 12 && h < 14) msg = `🕌 Öğle vakti • Bugün ${pct}% verimlilik`;
  else if (h >= 14 && h < 17) msg = `⚡ Öğleden sonra • ${total - done} görev bekliyor`;
  else if (h >= 17 && h < 20) msg = `🌇 Akşam üzeri • ${namazDone}/5 namaz kılındı`;
  else if (h >= 20 && h < 23) msg = `🌙 İyi akşamlar • ${pct}% tamamlandı`;
  else msg = `⭐ İyi geceler • Bugün ${done} görev tamamlandı`;

  if (el.textContent !== msg) el.textContent = msg;
}

function renderClock() {
  // Header namaz vakti göstergesini güncelle
  renderHeaderPrayerVakit();
  updateDialCountdownAndNeedle();
  renderPrayerTimeline();
}

function updateDialCountdownAndNeedle() {
  const dialNeedle = document.getElementById('dialNeedle');
  const dialCountdown = document.getElementById('dialCountdown');
  const dialLabel = document.getElementById('dialCountdownLabel');
  if (!PRAYERS || PRAYERS.length !== 5) return;

  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const nowSec = now.getSeconds();

  // ── İğne açısı (saniyeler dahil hassas) ──
  if (dialNeedle) {
    const totalMins = nowMin + nowSec / 60;
    const fMin = PRAYERS[0].t.split(':').map(Number).reduce((a, b) => a * 60 + b);
    const relativeMins = ((totalMins - fMin) % 1440 + 1440) % 1440;
    // Sol kenar = Sabah vakti (0°), sağ kenar = Sabah+24s (180°)
    const needleAngle = (relativeMins / 1440) * 180 - 90;
    dialNeedle.setAttribute('transform', `rotate(${needleAngle} 100 110)`);
  }

  // ── Geri sayım: aktif vakit adı + kalan süre ──
  if (dialCountdown) {
    const cur = nowMin * 60 + nowSec;
    const toS = t => t.split(':').map(Number).reduce((h, m) => (h * 60 + m) * 60);
    const fS = toS(PRAYERS[0].t);
    const sunS = SUNRISE_TIME ? SUNRISE_TIME.split(':').map(Number).reduce((h, m) => h * 60 + m) * 60 : fS + 3000;
    const oS = toS(PRAYERS[1].t);
    const iS = toS(PRAYERS[2].t);
    const aS = toS(PRAYERS[3].t);
    const yS = toS(PRAYERS[4].t);

    let targetS = 0, activeName = '';
    if (cur >= fS && cur < sunS) { targetS = sunS; activeName = 'Sabah'; }
    else if (cur >= sunS && cur < oS) { targetS = oS; activeName = 'Güneş'; }
    else if (cur >= oS && cur < iS) { targetS = iS; activeName = 'Öğle'; }
    else if (cur >= iS && cur < aS) { targetS = aS; activeName = 'İkindi'; }
    else if (cur >= aS && cur < yS) { targetS = yS; activeName = 'Akşam'; }
    else { targetS = fS + 86400; activeName = 'Sabah'; }

    let diff = targetS - cur;
    if (diff < 0) diff += 86400;

    const hh = String(Math.floor(diff / 3600)).padStart(2, '0');
    const mm = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
    const ss = String(diff % 60).padStart(2, '0');

    dialCountdown.innerHTML =
      `${hh}:${mm}<span style="font-size:0.65em;font-weight:900;vertical-align:super;margin-left:2px;" id="dialCountdownSec">${ss}</span>`;
    if (dialLabel) dialLabel.textContent = activeName + ' Vakti — Bitimine';
  }
}

/* ── SİDEBAR DİNAMİK NAMAZ VAKTİ KARTI ── */
function getCurrentPrayerInfo() {
  if (!PRAYERS || PRAYERS.length === 0) return null;

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const times = PRAYERS.map(p => {
    const [h, m] = p.t.split(':').map(Number);
    return { name: p.n, minutes: h * 60 + m, timeStr: p.t };
  });

  times.sort((a, b) => a.minutes - b.minutes);

  if (currentMinutes < times[0].minutes) {
    const yatsı = times[times.length - 1];
    const sabah = times[0];
    const diff = sabah.minutes - currentMinutes;
    return { current: yatsı.name, next: sabah.name, left: diff, nextTime: sabah.timeStr };
  }

  let currentIdx = -1;
  for (let i = 0; i < times.length; i++) {
    const start = times[i].minutes;
    const end = (i === times.length - 1) ? (24 * 60 + times[0].minutes) : times[i + 1].minutes;
    if (currentMinutes >= start && currentMinutes < end) {
      currentIdx = i;
      break;
    }
  }

  if (currentIdx !== -1) {
    const cur = times[currentIdx];
    const nextIdx = (currentIdx + 1) % times.length;
    const next = times[nextIdx];

    let diff = 0;
    if (nextIdx === 0) {
      diff = (24 * 60 - currentMinutes) + next.minutes;
    } else {
      diff = next.minutes - currentMinutes;
    }
    return { current: cur.name, next: next.name, left: diff, nextTime: next.timeStr };
  }

  return null;
}

function formatRemainingTime(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h > 0) {
    return `${h} sa ${m} dk`;
  }
  return `${m} dk`;
}

function renderHeaderPrayerVakit() {
  const container = document.getElementById('headerPrayerVakit');
  if (container) container.innerHTML = '';
}

/* ── AKILLI GÜNLÜK ASİSTAN ── */
let _assistantTimer = null;
let _assistantRotateTimer = null;
let _assistantIdx = 0;

function buildAssistantMessages() {
  const msgs = [];
  const td = today();

  // 1. Sonraki namaz vakti
  const info = getCurrentPrayerInfo();
  if (info) {
    const h = Math.floor(info.left / 60);
    const m = info.left % 60;
    const timeStr = h > 0 ? `${h} sa ${m} dk` : `${m} dk`;
    msgs.push({ icon: '🕌', text: `${info.next} vakti — ${timeStr} sonra (${info.nextTime})`, color: 'var(--teal)' });
  }

  // 2. Bugünkü görev özeti
  const todayTasks = S.tasks.filter(t => isTaskForToday(t));
  const doneTasks = todayTasks.filter(t => t.done);
  if (todayTasks.length > 0) {
    const pct = Math.round(doneTasks.length / todayTasks.length * 100);
    const emoji = pct === 100 ? '🏆' : pct >= 50 ? '📈' : '📋';
    msgs.push({ icon: emoji, text: `Bugün ${doneTasks.length}/${todayTasks.length} görev tamamlandı (%${pct})`, color: pct === 100 ? 'var(--gold)' : pct >= 50 ? 'var(--teal)' : 'var(--tx2)' });
  } else {
    msgs.push({ icon: '📋', text: 'Bugün için henüz görev yok — hadi bir şeyler ekle!', color: 'var(--tx3)' });
  }

  // 3. Namaz kılma durumu
  const prayedCount = PRAYERS.filter(p => S.prayers?.[td]?.[p.n]).length;
  if (prayedCount > 0) {
    const prayEmoji = prayedCount === 5 ? '✨' : prayedCount >= 3 ? '🙏' : '🕌';
    msgs.push({ icon: prayEmoji, text: `Bugün ${prayedCount}/5 namaz kılındı`, color: prayedCount === 5 ? 'var(--gold)' : 'var(--teal)' });
  }

  // 4. Alışkanlık durumu
  const habitToday = S.habits?.[td] || {};
  const habitDone = HABITS.filter(h => habitToday[h.id]).length;
  if (HABITS.length > 0) {
    const hPct = Math.round(habitDone / HABITS.length * 100);
    const hEmoji = habitDone === HABITS.length ? '🔥' : habitDone >= HABITS.length / 2 ? '⚡' : '💤';
    msgs.push({ icon: hEmoji, text: `Alışkanlıklar: ${habitDone}/${HABITS.length} tamamlandı`, color: habitDone === HABITS.length ? '#fb923c' : 'var(--tx2)' });
  }

  // 5. Acil görev uyarısı
  const overdueOrToday = S.tasks.filter(t => !t.done && t.due && t.due <= td && t.rep === 'yok');
  if (overdueOrToday.length > 0) {
    msgs.push({ icon: '⚠️', text: `${overdueOrToday.length} görevin son tarihi bugün veya geçti!`, color: '#fb923c' });
  }

  // 6. Zikir durumu
  if (S.zikirDone?.[td]) {
    msgs.push({ icon: '📿', text: 'Günlük zikir tamamlandı — mâşâllah!', color: 'var(--gold)' });
  }

  // 7. Motivasyon — tüm görevler bittiyse
  if (todayTasks.length > 0 && doneTasks.length === todayTasks.length) {
    msgs.push({ icon: '🏆', text: 'Bugünkü tüm görevleri bitirdin — harika iş!', color: 'var(--gold)' });
  }

  // Hiç mesaj yoksa genel karşılama
  if (msgs.length === 0) {
    msgs.push({ icon: '✨', text: 'Hoş geldin! Zamanını bereketlendir.', color: 'var(--teal)' });
  }

  return msgs;
}

function renderHeaderAssistant() {
  const el = document.getElementById('headerAssistantMsg');
  if (!el) return;

  const msgs = buildAssistantMessages();
  if (!msgs.length) return;

  _assistantIdx = _assistantIdx % msgs.length;
  const msg = msgs[_assistantIdx];

  // Fade-out → değiştir → fade-in
  el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  el.style.opacity = '0';
  el.style.transform = 'translateY(-3px)';
  setTimeout(() => {
    el.innerHTML = `<span style="font-size:0.95rem;">${msg.icon}</span> <span style="color:${msg.color}; font-weight:800;">${msg.text}</span>`;
    el.style.borderColor = msg.color + '50';
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, 300);
}

function tickHeaderAssistant() {
  const msgs = buildAssistantMessages();
  _assistantIdx = (_assistantIdx + 1) % (msgs.length || 1);
  renderHeaderAssistant();
}

function initHeaderAssistant() {
  // İlk render hemen
  _assistantIdx = 0;
  renderHeaderAssistant();
  // 6 saniyede bir döndür
  if (_assistantRotateTimer) clearInterval(_assistantRotateTimer);
  _assistantRotateTimer = setInterval(tickHeaderAssistant, 6000);
}

/* ── TOAST ── */
function toast(msg, type) {
  const icons = { s: '✅', e: '❌', i: 'ℹ️', w: '⚠️' };
  const tc = document.getElementById('tc');
  const el = document.createElement('div');
  el.className = 'toast ' + type;
  el.innerHTML = `<span>${esc(icons[type] || '')}</span><span>${esc(msg)}</span>`;
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
      S.tasks.forEach(t => { if (isTaskDueToday(t) && t.done) { t.done = false; t.completedAt = null; t.subs?.forEach(s => s.done = false); n++; } });
      if (S.prayers) delete S.prayers[td];
      if (S.habits) delete S.habits[td];
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
      S.prayers = {}; S.habits = {}; S.zikirDone = {}; S.catTime = {}; S.timerSess = {};
      S.tasks.forEach(t => t.completedAt = null);
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
  btn.style.cursor = ok ? 'pointer' : 'not-allowed';
}
function doFactoryReset() {
  closeModal('factoryModal');
  localStorage.removeItem('mikat'); localStorage.removeItem('mikat-v5');
  CATS = JSON.parse(JSON.stringify(DEFAULT_CATS));
  HABITS = JSON.parse(JSON.stringify(DEFAULT_HABITS));
  S = {
    tasks: [], prayers: {}, habits: {}, zikirDone: {}, catTime: {}, timerSess: {},
    theme: 'dark', cats: null, habitDefs: null, lastReset: '', notifEnabled: false, namazCity: 'Konya',
    autoBackup: false, lastBackup: '', lat: null, lng: null
  };
  selectedDate = today(); activeCat = null; statusF = 'all';
  applyTheme('dark'); save(); render(); renderSelects();
  toast('Fabrika ayarlarına dönüldü.', 's');
}

/* ── ANA RENDER ── */
function render() {
  try { renderSelects(); } catch (e) { }
  try { renderCatCards(); } catch (e) { }
  try { renderDayProg(); } catch (e) { }
  try { renderNamaz(); } catch (e) { }
  try { renderCalendar(); } catch (e) { }
  try { renderTasks(); } catch (e) { }
  try { renderHabits(); } catch (e) { }
  try { renderSessions(); } catch (e) { }
  try { renderCatTimes(); } catch (e) { }
  try { drawTimer(); } catch (e) { }
  try { initDailyQuotes(); } catch (e) { }
  try { renderEsma(); } catch (e) { }
  try { renderDailyZikir(); } catch (e) { }
  try { renderAuthCard(); } catch (e) { }
  try { renderHeaderAssistant(); } catch (e) { }
  if (document.getElementById('v-habits')?.classList.contains('on') || document.getElementById('v-analytics')?.classList.contains('on')) {
    try { renderAnalytics(); } catch (e) { }
  }
}

/* ── TOHUM VERİSİ ── */
function seed() {
  if (S.tasks.length > 0) return;
  const defs = [
    { name: 'Sabah namazını kıl', cat: 'dini', pri: 'yuksek', rep: 'gunluk', tag: 'namaz' },
    { name: 'Öğle namazını kıl', cat: 'dini', pri: 'yuksek', rep: 'gunluk', tag: 'namaz' },
    { name: 'İkindi namazını kıl', cat: 'dini', pri: 'yuksek', rep: 'gunluk', tag: 'namaz' },
    { name: 'Akşam namazını kıl', cat: 'dini', pri: 'yuksek', rep: 'gunluk', tag: 'namaz' },
    { name: 'Yatsı namazını kıl', cat: 'dini', pri: 'yuksek', rep: 'gunluk', tag: 'namaz' },
    // H-09: repDays:[5] = Cuma (0=Pazar,...,5=Cuma,6=Cumartesi)
    { name: 'Cuma namazına git', cat: 'dini', pri: 'yuksek', rep: 'haftalik', repDays: [5], tag: 'namaz' },
    { name: 'Sabah sünnetini kıl', cat: 'dini', pri: 'orta', rep: 'gunluk' },
    { name: 'Kuran tilâveti (min 1 sayfa)', cat: 'kuran', pri: 'yuksek', rep: 'gunluk', est: '15', note: 'Mümkünse sesli oku' },
    { name: 'Sabah zikirleri', cat: 'kuran', pri: 'yuksek', rep: 'gunluk', est: '10' },
    { name: 'Akşam zikirleri', cat: 'kuran', pri: 'yuksek', rep: 'gunluk', est: '10' },
    { name: 'Ayetel Kürsi', cat: 'kuran', pri: 'orta', rep: 'gunluk' },
    { name: 'İhlas-Felak-Nas (3 kez)', cat: 'kuran', pri: 'orta', rep: 'gunluk' },
    { name: '100 İstiğfar', cat: 'kuran', pri: 'orta', rep: 'gunluk' },
    { name: 'bilisimcihocam.com kontrol', cat: 'platform', pri: 'yuksek', rep: 'gunluk', est: '15', note: 'Yorum, mesaj, hata' },
    { name: 'Yeni blog yazısı', cat: 'platform', pri: 'orta', rep: 'haftalik', est: '90' },
    { name: 'Sosyal medya paylaşımı', cat: 'platform', pri: 'orta', rep: 'gunluk', est: '15' },
    { name: 'YouTube ders videosu', cat: 'platform', pri: 'orta', rep: 'haftalik', est: '120' },
    { name: 'Günlük ders planı hazırla', cat: 'okul', pri: 'yuksek', rep: 'gunluk', est: '15' },
    { name: 'Sınav soruları hazırla', cat: 'okul', pri: 'orta', rep: 'haftalik', est: '60' },
    { name: 'Öğrenci notları E-okul\'a işle', cat: 'okul', pri: 'orta', rep: 'haftalik', est: '30' },
    { name: 'Eşinle baş başa konuşma', cat: 'aile', pri: 'yuksek', rep: 'gunluk', est: '20' },
    { name: 'Çocuklarla oyun / sohbet', cat: 'aile', pri: 'yuksek', rep: 'gunluk', est: '45' },
    { name: 'Çocukların ödevlerine bak', cat: 'aile', pri: 'yuksek', rep: 'gunluk', est: '30' },
    { name: 'Anne-babayı ara', cat: 'aile', pri: 'yuksek', rep: 'gunluk', est: '10' },
    { name: 'Kitap oku (min 20 dk)', cat: 'kitap', pri: 'yuksek', rep: 'gunluk', est: '20' },
    { name: 'Podcast / sesli kitap', cat: 'kitap', pri: 'orta', rep: 'gunluk', est: '30', note: 'Yürüyüşte' },
    { name: 'Haftalık öğrendiklerini yaz', cat: 'kitap', pri: 'dusuk', rep: 'haftalik', est: '20' },
  ];
  S.tasks = defs.map(d => ({
    id: gid(), done: false, subs: [], created: new Date().toISOString(), completedAt: null,
    due: '', note: d.note || '', tag: d.tag || '', est: d.est || '',
    rep: d.rep || 'yok', repDays: d.repDays || [], pri: d.pri || 'orta', cat: d.cat || 'diger', name: d.name,
  }));
}

/* ── KEYBOARD KISAYOLLARI ── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    ['taskModal', 'confModal', 'catModal', 'settingsModal', 'habitModal', 'habitDelModal', 'factoryModal'].forEach(closeModal);
    closeHabitModal();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'n' && !e.shiftKey) { e.preventDefault(); openAdd(); }
});

/* ── SES KILIT AÇ ── */
document.addEventListener('click', unlockAudio, { once: true });

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
  localStorage.setItem('pwaDismissed', '1');
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
  }).catch(() => { });
}

/* ── NAFİLE, KERAHET, VAKTİN HADİSİ, KAZA HESAPLAMA ── */
const NAFILE_LIST = ['Teheccüd', 'Duha (Kuşluk)', 'Evvabin', 'Şükür Namazı'];
function renderNafile() {
  const d = today();
  const grid = document.getElementById('nafileGrid');
  if (!grid) return;
  if (!S.nafile) S.nafile = {};
  if (!S.nafile[d]) S.nafile[d] = {};
  grid.innerHTML = NAFILE_LIST.map(n => {
    const isDone = !!(S.nafile[d][n]);
    return `<div class="nafile-item${isDone ? ' done' : ''}" onclick="toggleNafile('${n}')">
      <div class="chk${isDone ? ' done' : ''}"></div>
      <div class="nn">${n}</div>
    </div>`;
  }).join('');
}
function toggleNafile(n) {
  const d = today();
  if (!S.nafile) S.nafile = {};
  if (!S.nafile[d]) S.nafile[d] = {};
  S.nafile[d][n] = !S.nafile[d][n];
  save();
  renderNafile();
}
function renderKerahet() {
  const banner = document.getElementById('kerahatBanner');
  if (!banner) return;
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const ogleTime = PRAYERS.find(p => p.n === 'Öğle')?.t;
  const aksamTime = PRAYERS.find(p => p.n === 'Akşam')?.t;
  let isKerahat = false;
  let msg = '';
  if (ogleTime) {
    const [oh, om] = ogleTime.split(':').map(Number);
    const ogleMin = oh * 60 + om;
    if (nowMin >= ogleMin - 45 && nowMin < ogleMin) {
      isKerahat = true;
      msg = '⚠️ Öğle kerahet vakti (İstiva): Öğle ezanına 45 dakikadan az kaldı. Namaz kılınması mekruhtur.';
    }
  }
  if (!isKerahat && aksamTime) {
    const [ah, am] = aksamTime.split(':').map(Number);
    const aksamMin = ah * 60 + am;
    if (nowMin >= aksamMin - 45 && nowMin < aksamMin) {
      isKerahat = true;
      msg = '⚠️ Akşam kerahet vakti (Güneş batışı): Akşam ezanına 45 dakikadan az kaldı. Sadece ikindi namazının farzı kılınabilir, nafile kılınmaz.';
    }
  }
  if (!isKerahat && SUNRISE_TIME) {
    const [sh, sm] = SUNRISE_TIME.split(':').map(Number);
    const sunriseMin = sh * 60 + sm;
    if (nowMin >= sunriseMin && nowMin < sunriseMin + 45) {
      isKerahat = true;
      msg = '⚠️ Sabah kerahet vakti (Güneş doğuşu): Güneş yeni doğdu. İlk 45 dakika namaz kılınması mekruhtur.';
    }
  }
  if (isKerahat) {
    banner.textContent = msg;
    banner.style.display = 'block';
  } else {
    banner.style.display = 'none';
  }
}
const VAKIT_QUOTES = {
  Sabah: {
    ar: "وَسَبِّحْ بِحَمْدِ رَبِّكَ قَبْلَ طُلُوعِ الشَّمْسِ وَقَبْلَ غُرُوبِهَا",
    t: "Güneşin doğmasından önce ve batmasından önce Rabbini hamd ile tesbih et.",
    s: "Tâhâ 20/130",
    h: "Sabah namazının iki rekat sünneti, dünyadan ve dünyadaki her şeyden daha hayırlıdır.",
    hs: "Buhârî, Salât, 12"
  },
  Öğle: {
    ar: "حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ",
    t: "Namazlara ve orta namaza devam edin.",
    s: "Bakara 2/238",
    h: "Öğle namazından önce kılınan dört rekatta gök kapıları açılır.",
    hs: "Tirmizî, Vitir, 9"
  },
  İkindi: {
    ar: "وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ",
    t: "Namazı kılın, zekatı verin ve rüku edenlerle birlikte rüku edin.",
    s: "Bakara 2/43",
    h: "İkindi namazını kaçıran kimsenin sanki ailesi ve malı elinden alınmış gibidir.",
    hs: "Buhârî, Mevâkît, 14"
  },
  Akşam: {
    ar: "وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ وَزُلَفًا مِنَ اللَّيْلِ",
    t: "Gecenin iki tarafında ve gündüzün saçaklarında namaz kıl.",
    s: "Hûd 11/114",
    h: "Akşam namazının farzından sonra kılınan iki rekat nafileyi aksatmayın.",
    hs: "Tirmizî, Salât, 203"
  },
  Yatsı: {
    ar: "إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا",
    t: "Şüphesiz namaz, müminler üzerine belirli vakitlerde yazılmış bir farzdır.",
    s: "Nisâ 4/103",
    h: "Yatsı namazını cemaatle kılan, gecenin yarısını ibadetle geçirmiş gibidir.",
    hs: "Müslim, Mesâcid, 260"
  }
};
let PRAYER_AYATS = [
  {
    ar: "إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا",
    t: "Şüphesiz namaz, müminler üzerine belirli vakitlerde yazılmış bir farzdır.",
    s: "Nisâ 4/103"
  },
  {
    ar: "وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ",
    t: "Namazı dosdoğru kılın, zekâtı verin ve rüku edenlerle birlikte rüku edin.",
    s: "Bakara 2/43"
  },
  {
    ar: "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ وَإِنَّهَا لَكَبِيرَةٌ إِلَّا عَلَى الْخَاشِعِينَ",
    t: "Sabır ve namazla Allah'tan yardım isteyin. Şüphesiz namaz, huşû duyanlardan başkasına ağır gelir.",
    s: "Bakara 2/45"
  },
  {
    ar: "حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ وَقُومُوا لِلَّهِ قَانِتِينَ",
    t: "Namazlara ve orta namaza devam edin. Allah'ın huzurunda saygı ve itaate durun.",
    s: "Bakara 2/238"
  },
  {
    ar: "اتْلُ مَا أُوحِيَ إِلَيْكَ مِنَ الْكِتَابِ وَأَقِمِ الصَّلَاةَ ۖ إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنْكَرِ",
    t: "Sana vahyedilen kitabı oku ve namazı dosdoğru kıl. Şüphesiz namaz, insanı hayasızlıktan ve kötülükten alıkoyar.",
    s: "Ankebût 29/45"
  },
  {
    ar: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
    t: "Rabbim! Beni ve neslimi namazı dosdoğru kılanlardan eyle. Rabbimiz! Duamı kabul buyur.",
    s: "İbrâhîm 14/40"
  },
  {
    ar: "قَدْ أَفْلَحَ الْمُؤْمِنُونَ ۦ الَّذِينَ هُمْ فِي صَلَاتِهِمْ خَاشِعُونَ",
    t: "Müminler kesinlikle kurtuluşa ermiştir; onlar ki namazlarında derin bir hürmet ve huşû içindedirler.",
    s: "Mü'minûn 23/1-2"
  },
  {
    ar: "وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ وَزُلَفًا مِنَ اللَّيْلِ ۚ إِنَّ الْحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ",
    t: "Gündüzün iki tarafında ve gecenin gündüze yakın saatlerinde namaz kıl. Şüphesiz iyilikler kötülükleri giderir.",
    s: "Hûd 11/114"
  },
  {
    ar: "وَأَقِمِ الصَّلَاةَ لِذِكْرِي",
    t: "Beni anmak ve hatırlamak için namazı dosdoğru kıl.",
    s: "Tâhâ 20/14"
  },
  {
    ar: "فَسُبْحَانَ اللَّهِ حِينَ تُمْسُونَ وَحِينَ تُصْبِحُونَ ۦ وَلَهُ الْحَمْدُ فِي السَّمَاوَاتِ وَالْأَرْضِ وَعَشِيًّا وَحِينَ تُظْهِرُونَ",
    t: "Akşama erdiğinizde ve sabaha çıktığınızda Allah'ı tesbih edin. Göklerde ve yerde, akşamleyin ve öğleye erdiğinizde hamd O'na mahsustur.",
    s: "Rûm 30/17-18"
  }
];

function renderVaktinQuote() {
  const card = document.getElementById('vaktinQuoteCard');
  const title = document.getElementById('vaktinQuoteTitle');
  const text = document.getElementById('vaktinQuoteText');
  const src = document.getElementById('vaktinQuoteSrc');
  const arabic = document.getElementById('vaktinQuoteArabic');
  if (!card || !title || !text || !src) return;

  const dayIdx = dayOfYear();
  const quote = PRAYER_AYATS[dayIdx % PRAYER_AYATS.length];

  title.innerHTML = `📖 GÜNÜN AYETİ`;
  if (arabic) {
    arabic.style.display = 'block';
    arabic.textContent = quote.ar || '';
  }
  text.textContent = quote.t;
  src.textContent = quote.s;
  card.style.borderLeftColor = 'var(--gold)';
}



function updateZikirDisplay() {
  const countEl = document.getElementById('zmCount');
  const arabicEl = document.getElementById('zmArabic');
  const trEl = document.getElementById('zmTr');
  const ring = document.getElementById('zmRing');
  const dots = document.querySelectorAll('.zm-phase-dot');

  if (countEl) countEl.textContent = `${zikirCount} / 33`;

  const phase = ZIKIR_PHASES[zikirPhase];
  if (arabicEl) {
    arabicEl.textContent = phase.a;
    arabicEl.style.direction = 'rtl';
    arabicEl.style.fontSize = '1.65rem';
    arabicEl.style.lineHeight = '1.6';
    arabicEl.style.fontFamily = "'Amiri', serif";
  }
  if (trEl) trEl.textContent = phase.t;

  if (dots.length === 3) {
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === zikirPhase);
    });
  }

  if (ring) {
    const pct = zikirCount / 33;
    const offset = 376.99 - (pct * 376.99);
    ring.style.strokeDashoffset = offset;
  }
}

/* ── GÜNLÜK İÇERİK YÜKLEME ── */
async function loadDailyContent() {
  try {
    const [rAyats, rNamazAyats, rHadiths, rDuas, rEsma, rZikir] = await Promise.all([
      fetch('./data/ayetler.json').then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('./data/namaz_ayetleri.json').then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('./data/hadisler.json').then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('./data/dualar.json').then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('./data/esmalar.json').then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('./data/zikirler.json').then(r => r.ok ? r.json() : null).catch(() => null)
    ]);

    if (rAyats && Array.isArray(rAyats) && rAyats.length) DAILY_AYATS = rAyats;
    if (rNamazAyats && Array.isArray(rNamazAyats) && rNamazAyats.length) PRAYER_AYATS = rNamazAyats;
    if (rHadiths && Array.isArray(rHadiths) && rHadiths.length) DAILY_HADITHS = rHadiths;
    if (rDuas && Array.isArray(rDuas) && rDuas.length) DAILY_DUAS = rDuas;
    if (rEsma && Array.isArray(rEsma) && rEsma.length) ESMA_LIST = rEsma;
    if (rZikir && Array.isArray(rZikir) && rZikir.length) DAILY_ZIKIR = rZikir;

    initDailyQuotes();
    renderVaktinQuote();
    renderEsma();
    renderDailyZikir();
  } catch (e) {
    console.warn('Günlük içerikler yüklenirken hata:', e);
  }
}
const QADA_NAMES = {
  sabah: 'Sabah',
  ogle: 'Öğle',
  ikindi: 'İkindi',
  aksam: 'Akşam',
  yatsi: 'Yatsı',
  vitir: 'Vitir (Vitir Vacip)'
};
function renderQada() {
  const box = document.getElementById('qadaBox');
  if (!box) return;
  if (!S.qada) S.qada = { sabah: 0, ogle: 0, ikindi: 0, aksam: 0, yatsi: 0, vitir: 0 };
  box.innerHTML = `
    <div class="qada-grid">
      ${Object.entries(QADA_NAMES).map(([k, name]) => {
    const count = S.qada[k] || 0;
    return `
          <div class="qada-row">
            <span class="qada-name">${name}</span>
            <div class="qada-controls">
              <button class="qada-btn minus" onclick="changeQada('${k}', -1)" ${count <= 0 ? 'disabled' : ''}>-</button>
              <span class="qada-count${count > 0 ? ' has-debt' : ''}">${count}</span>
              <button class="qada-btn plus" onclick="changeQada('${k}', 1)">+</button>
            </div>
          </div>
        `;
  }).join('')}
    </div>
  `;
  renderQadaCalculator();
}
function changeQada(k, diff) {
  if (!S.qada) S.qada = { sabah: 0, ogle: 0, ikindi: 0, aksam: 0, yatsi: 0, vitir: 0 };
  S.qada[k] = Math.max(0, (S.qada[k] || 0) + diff);
  save();
  renderQada();
}
function renderQadaCalculator() {
  const calc = document.getElementById('qadaCalculator');
  if (!calc) return;
  if (!S.qada) { calc.innerHTML = ''; return; }
  const totalDebts = Object.values(S.qada).reduce((a, b) => a + b, 0);
  if (totalDebts <= 0) {
    calc.innerHTML = `<div style="font-size:0.7rem;color:var(--grn);text-align:center;font-weight:600;">🎉 Kaza borcunuz bulunmamaktadır!</div>`;
    return;
  }
  const maxDebts = Math.max(...Object.values(S.qada));
  const date1 = new Date(); date1.setDate(date1.getDate() + maxDebts);
  const date1Str = date1.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  const halfDays = Math.ceil(maxDebts / 2);
  const date2 = new Date(); date2.setDate(date2.getDate() + halfDays);
  const date2Str = date2.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  calc.innerHTML = `
    <div style="font-size:0.6rem;text-transform:uppercase;color:var(--tx3);font-weight:800;margin-bottom:6px;">📈 Bitiş Öngörüsü</div>
    <div style="display:flex;flex-direction:column;gap:4px;font-size:0.68rem;color:var(--tx2);">
      <div>• Günde <strong>1'er vakit</strong> kaza ile: <span style="color:var(--gold);font-weight:700;">${maxDebts} gün</span> sonra (<span style="font-weight:600;">${date1Str}</span>)</div>
      <div>• Günde <strong>2'er vakit</strong> kaza ile: <span style="color:var(--teal);font-weight:700;">${halfDays} gün</span> sonra (<span style="font-weight:600;">${date2Str}</span>)</div>
    </div>
  `;
}

function toggleQadaPanel() {
  const panel = document.getElementById('qadaPanelContent');
  const icon = document.getElementById('qadaToggleIcon');
  if (!panel || !icon) return;

  if (panel.style.display === 'none') {
    panel.style.display = 'grid';
    icon.textContent = '▲ Gizle';
    icon.style.color = 'var(--rose)';
    icon.style.background = 'rgba(240,104,120,0.12)';
  } else {
    panel.style.display = 'none';
    icon.textContent = '▼ Göster';
    icon.style.color = 'var(--gold)';
    icon.style.background = 'var(--goldbg)';
  }
}

/* ── ZİKİRMATİK MANTIK & SES/TİTREŞİM EFEKTLERİ ── */
let zikirCount = 0;
let zikirPhase = 0; // 0: Sübhanallah, 1: Elhamdülillah, 2: Allahu Ekber
const ZIKIR_PHASES = [
  { a: 'سُبْحَانَ اللَّهِ', t: 'Sübhanallah' },
  { a: 'الْحَمْدُ لِلَّهِ', t: 'Elhamdülillah' },
  { a: 'اللَّهُ أَكْبَرُ', t: 'Allahu Ekber' }
];

function playClickSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.04);
  } catch (e) {
    console.warn('Audio Context failed', e);
  }
}

function playChimeSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08);
    osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) { }
}

function openZikirmatik() {
  const modal = document.getElementById('zikirmatikModal');
  if (modal) {
    modal.classList.add('on');
    resetZikirmatik();
  }
}

function closeZikirmatik() {
  const modal = document.getElementById('zikirmatikModal');
  if (modal) modal.classList.remove('on');
}

function resetZikirmatik() {
  zikirCount = 0;
  zikirPhase = 0;
  updateZikirDisplay();
}

function updateZikirDisplay() {
  const countEl = document.getElementById('zmCount');
  const arabicEl = document.getElementById('zmArabic');
  const trEl = document.getElementById('zmTr');
  const ring = document.getElementById('zmRing');
  const dots = document.querySelectorAll('.zm-phase-dot');

  if (countEl) countEl.textContent = `${zikirCount} / 33`;

  const phase = ZIKIR_PHASES[zikirPhase];
  if (arabicEl) arabicEl.textContent = phase.a;
  if (trEl) trEl.textContent = phase.t;

  if (dots.length === 3) {
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === zikirPhase);
    });
  }

  if (ring) {
    const pct = zikirCount / 33;
    const offset = 376.99 - (pct * 376.99);
    ring.style.strokeDashoffset = offset;
  }
}

function tapZikirmatik() {
  if (navigator.vibrate) {
    navigator.vibrate(35);
  }
  playClickSound();

  zikirCount++;
  if (zikirCount >= 33) {
    if (navigator.vibrate) {
      navigator.vibrate([80, 40, 80]);
    }
    playChimeSound();

    zikirCount = 0;
    zikirPhase++;
    if (zikirPhase >= 3) {
      zikirPhase = 0;
      toast('Tesbihat tamamlandı! Allah kabul etsun.', 's');
      triggerConfetti();
      if (navigator.vibrate) {
        navigator.vibrate([120, 40, 120, 40, 180]);
      }
    }
  }
  updateZikirDisplay();
}

/* Confetti animation */
function triggerConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);

  const colors = ['#3ecfb0', '#D4AF37', '#3b82f6', '#f43f5e', '#a855f7', '#10b981'];
  const particles = Array.from({ length: 80 }, () => ({
    x: window.innerWidth / 2,
    y: window.innerHeight + 10,
    vx: (Math.random() - 0.5) * 15,
    vy: -Math.random() * 15 - 10,
    size: Math.random() * 6 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    r: Math.random() * 360,
    vr: (Math.random() - 0.5) * 10,
    g: 0.4
  }));

  function anim() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    let active = false;
    particles.forEach(p => {
      p.vy += p.g;
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;
      if (p.y < window.innerHeight) active = true;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    if (active) requestAnimationFrame(anim);
    else canvas.remove();
  }
  requestAnimationFrame(anim);
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
window.addEventListener('online', updateOnlineStatus);
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
renderHeaderPrayerVakit();
initHeaderAssistant();
renderClock();
loadDailyContent();
// H-15: Saat saniyeyi gösterdiğinden 1s aralığı doğru; tarih güncellenmesi dakikada bir yeterli
setInterval(renderClock, 1000);
// Namaz vakitlerini ve header'ı dakikada bir güncelle
setInterval(() => { renderNamaz(); renderHeaderPrayerVakit(); renderHeaderAssistant(); }, 60000);
// Sabah 04:00'da namaz vakitlerini yeniden çek ve otomatik sıfırla
setInterval(() => {
  const now = new Date();
  if (now.getHours() === 4 && now.getMinutes() === 0) { fetchPrayerTimes(); autoReset(); }
}, 60000);
// Namaz vakitleri: önce localStorage cache'den dene, sonra otomatik konum + API
(function fetchPrayerWithCache() {
  try {
    const cached = localStorage.getItem('mikat-prayer-cache');
    if (cached) {
      const { date, city, prayers, sunrise, imsak } = JSON.parse(cached);
      if (date === today() && city === (S.namazCity || 'Konya') && Array.isArray(prayers)) {
        PRAYERS = prayers;
        SUNRISE_TIME = sunrise || null;
        IMSAK_TIME = imsak || null;
        document.getElementById('namazSource').textContent = '💾 Önbellek — ' + (S.namazCity || 'Konya');
        renderNamaz();
        renderHeaderPrayerVakit();
        initHeaderAssistant();
        if (S.notifEnabled) scheduleNotifs();
        return; // cache geçerli, API çağrısına gerek yok
      }
    }
  } catch (e) { }
  // Cache yok veya geçersiz — direkt varsayılan şehir (Konya) ile API'den çek
  fetchPrayerTimes();
})();

/**
 * İlk açılışta (cache yokken) konum iznini sessizce kontrol eder.
 * - İzin daha önce verilmişse: koordinatları güncelle + koordinatlı API çağrısı yap
 * - İzin verilmemişse veya desteklenmiyorsa: şehir adıyla normal API çağrısı yap
 * Kullanıcıya popup göstermez — sadece zaten verilmiş izni kullanır.
 */
function autoDetectAndFetch() {
  if (!navigator.geolocation) {
    fetchPrayerTimes();
    return;
  }
  // Permissions API destekleniyorsa izni kontrol et, desteklenmiyorsa direkt dene
  const tryGeo = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        // Konum başarılı — koordinatları sakla ve koordinatlı API çağrısı yap
        S.lat = pos.coords.latitude;
        S.lng = pos.coords.longitude;
        save();
        renderSettings();
        fetchPrayerTimesWithCoords(S.lat, S.lng);
      },
      () => {
        // Konum alınamadı (izin reddedildi veya timeout) — şehir adıyla devam et
        fetchPrayerTimes();
      },
      { timeout: 8000, maximumAge: 3600000, enableHighAccuracy: false }
    );
  };

  if (navigator.permissions) {
    navigator.permissions.query({ name: 'geolocation' }).then(result => {
      if (result.state === 'granted') {
        tryGeo(); // İzin zaten verilmiş — sessizce al
      } else {
        // İzin verilmemiş veya prompt bekliyor — kullanıcıya sormadan şehir ile devam et
        fetchPrayerTimes();
      }
    }).catch(() => fetchPrayerTimes());
  } else {
    // Permissions API yok — şehir adıyla devam et (güvenli taraf)
    fetchPrayerTimes();
  }
}

/**
 * Koordinat bazlı namaz vakti çekimi.
 * Şehir adı yerine lat/lng kullanır; daha hassas sonuç verir.
 */
async function fetchPrayerTimesWithCoords(lat, lng) {
  try {
    document.getElementById('namazSource').textContent = '📡 Konuma göre yükleniyor…';
    const r = await fetch(
      `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=13`
    );
    if (!r.ok) throw new Error('API hatası');
    const j = await r.json();
    const t = j?.data?.timings;
    if (!t?.Fajr || !t?.Dhuhr) throw new Error('Geçersiz API yanıtı');
    SUNRISE_TIME = t.Sunrise ? t.Sunrise.slice(0, 5) : null;
    IMSAK_TIME = t.Imsak ? t.Imsak.slice(0, 5) : null;
    PRAYERS = [
      { n: 'Sabah', t: t.Fajr.slice(0, 5), h: parseInt(t.Fajr) },
      { n: 'Öğle', t: t.Dhuhr.slice(0, 5), h: parseInt(t.Dhuhr) },
      { n: 'İkindi', t: t.Asr.slice(0, 5), h: parseInt(t.Asr) },
      { n: 'Akşam', t: t.Maghrib.slice(0, 5), h: parseInt(t.Maghrib) },
      { n: 'Yatsı', t: t.Isha.slice(0, 5), h: parseInt(t.Isha) },
    ];
    // Koordinat bazlı cache: city anahtarı olarak özel bir format kullan
    const coordKey = `${lat.toFixed(3)},${lng.toFixed(3)}`;
    try {
      localStorage.setItem('mikat-prayer-cache', JSON.stringify({
        date: today(), city: S.namazCity || 'Konya',
        prayers: PRAYERS, sunrise: SUNRISE_TIME, imsak: IMSAK_TIME
      }));
    } catch (e) { }
    document.getElementById('namazSource').textContent = '📍 Konuma göre — ' + (S.namazCity || 'Konya');
    renderNamaz();
    renderHeaderPrayerVakit();
    initHeaderAssistant();
    if (S.notifEnabled) scheduleNotifs();
  } catch (e) {
    // Koordinatlı API başarısız — şehir adıyla dene
    fetchPrayerTimes();
  }
}

/* ── BULUT HESAP & SENKRONİZASYON (MOCK AUTH) ── */

function renderAuthCard() {
  const card = document.getElementById('sidebarAuthCard');
  if (!card) return;

  if (AUTH_USER) {
    card.innerHTML = `
      <div style="font-size:0.6rem;text-transform:uppercase;color:var(--teal);font-weight:800;margin-bottom:6px;letter-spacing:0.06em;">👤 BULUT HESABI</div>
      <div style="display:flex;align-items:center;gap:8px;">
        <div style="width:32px;height:32px;border-radius:50%;background:var(--tealbg);color:var(--teal);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.9rem;flex-shrink:0;">
          ${AUTH_USER.name[0].toUpperCase()}
        </div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:0.78rem;font-weight:700;color:var(--tx);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${AUTH_USER.name}</div>
          <div style="font-size:0.56rem;color:var(--grn);font-weight:700;text-transform:uppercase;margin-top:1px;">Senkronize</div>
        </div>
        <button onclick="mockLogout()" style="background:none;border:none;color:var(--rose);font-size:0.7rem;cursor:pointer;font-weight:600;padding:2px 6px;">Çıkış</button>
      </div>
    `;
  } else {
    card.innerHTML = `
      <div style="font-size:0.6rem;text-transform:uppercase;color:var(--gold);font-weight:800;margin-bottom:6px;letter-spacing:0.06em;">🔒 BULUT HESABI</div>
      <form id="authForm" onsubmit="mockLogin(event)" style="display:flex;flex-direction:column;gap:6px;">
        <input type="email" id="authEmail" placeholder="E-posta" required style="width:100%;background:rgba(0,0,0,0.12);border:1px solid var(--bd);border-radius:6px;padding:6px 8px;font-size:0.72rem;color:var(--tx);outline:none;transition:border-color 0.2s;">
        <input type="password" id="authPassword" placeholder="Şifre" required style="width:100%;background:rgba(0,0,0,0.12);border:1px solid var(--bd);border-radius:6px;padding:6px 8px;font-size:0.72rem;color:var(--tx);outline:none;transition:border-color 0.2s;">
        <button type="submit" style="background:var(--teal);color:#fff;border:none;border-radius:6px;padding:6px;font-size:0.74rem;font-weight:700;cursor:pointer;transition:filter 0.2s;">Giriş Yap</button>
      </form>
    `;
  }
}

function mockLogin(e) {
  e.preventDefault();
  const email = document.getElementById('authEmail').value;
  const name = email.split('@')[0];
  AUTH_USER = { name: name, email: email };
  toast(`Bulut senkronizasyonu aktif: Hoş geldiniz ${name}!`, 's');
  renderAuthCard();
}

function mockLogout() {
  AUTH_USER = null;
  toast('Senkronizasyon kapatıldı. Oturum sonlandırıldı.', 'i');
  renderAuthCard();
}

/* ── GÜNLÜK KURAN MODÜLÜ ── */
const SURAHS = [
  { id: 1, n: 'Fâtiha', p: 1 }, { id: 2, n: 'Bakara', p: 2 }, { id: 3, n: 'Âl-i İmrân', p: 50 },
  { id: 4, n: 'Nisâ', p: 77 }, { id: 5, n: 'Mâide', p: 106 }, { id: 6, n: 'En\'âm', p: 128 },
  { id: 7, n: 'A\'râf', p: 151 }, { id: 8, n: 'Enfâl', p: 177 }, { id: 9, n: 'Tevbe', p: 187 },
  { id: 10, n: 'Yûnus', p: 208 }, { id: 11, n: 'Hûd', p: 221 }, { id: 12, n: 'Yûsuf', p: 235 },
  { id: 13, n: 'Ra\'d', p: 249 }, { id: 14, n: 'İbrâhîm', p: 255 }, { id: 15, n: 'Hicr', p: 262 },
  { id: 16, n: 'Nahl', p: 267 }, { id: 17, n: 'İsrâ', p: 282 }, { id: 18, n: 'Kehf', p: 293 },
  { id: 19, n: 'Meryem', p: 305 }, { id: 20, n: 'Tâhâ', p: 312 }, { id: 21, n: 'Enbiyâ', p: 322 },
  { id: 22, n: 'Hac', p: 332 }, { id: 23, n: 'Mü\'minûn', p: 342 }, { id: 24, n: 'Nûr', p: 350 },
  { id: 25, n: 'Furkân', p: 359 }, { id: 26, n: 'Şuarâ', p: 367 }, { id: 27, n: 'Neml', p: 377 },
  { id: 28, n: 'Kasas', p: 385 }, { id: 29, n: 'Ankebût', p: 396 }, { id: 30, n: 'Rûm', p: 404 },
  { id: 31, n: 'Lokmân', p: 411 }, { id: 32, n: 'Secde', p: 415 }, { id: 33, n: 'Ahzâb', p: 418 },
  { id: 34, n: 'Sebe\'', p: 428 }, { id: 35, n: 'Fâtır', p: 434 }, { id: 36, n: 'Yâsîn', p: 440 },
  { id: 37, n: 'Sâffât', p: 446 }, { id: 38, n: 'Sâd', p: 453 }, { id: 39, n: 'Zümer', p: 458 },
  { id: 40, n: 'Mü\'min (Gâfir)', p: 467 }, { id: 41, n: 'Fussilet', p: 477 }, { id: 42, n: 'Şûrâ', p: 483 },
  { id: 43, n: 'Zuhruf', p: 489 }, { id: 44, n: 'Duhân', p: 496 }, { id: 45, n: 'Câsiye', p: 499 },
  { id: 46, n: 'Ahkâf', p: 502 }, { id: 47, n: 'Muhammed', p: 507 }, { id: 48, n: 'Fetih', p: 511 },
  { id: 49, n: 'Hucurât', p: 515 }, { id: 50, n: 'Kâf', p: 518 }, { id: 51, n: 'Zâriyât', p: 520 },
  { id: 52, n: 'Tûr', p: 523 }, { id: 53, n: 'Necm', p: 526 }, { id: 54, n: 'Kamer', p: 528 },
  { id: 55, n: 'Rahmân', p: 531 }, { id: 56, n: 'Vâkıa', p: 534 }, { id: 57, n: 'Hadîd', p: 537 },
  { id: 58, n: 'Mücâdele', p: 542 }, { id: 59, n: 'Haşr', p: 545 }, { id: 60, n: 'Mümtehine', p: 549 },
  { id: 61, n: 'Saff', p: 551 }, { id: 62, n: 'Cuma', p: 553 }, { id: 63, n: 'Münâfikûn', p: 554 },
  { id: 64, n: 'Teğâbün', p: 556 }, { id: 65, n: 'Talâk', p: 558 }, { id: 66, n: 'Tahrîm', p: 560 },
  { id: 67, n: 'Mülk', p: 562 }, { id: 68, n: 'Kalem', p: 564 }, { id: 69, n: 'Hâkka', p: 566 },
  { id: 70, n: 'Meâric', p: 568 }, { id: 71, n: 'Nûh', p: 570 }, { id: 72, n: 'Cin', p: 572 },
  { id: 73, n: 'Müzzemmil', p: 574 }, { id: 74, n: 'Müddessir', p: 575 }, { id: 75, n: 'Kıyâme', p: 577 },
  { id: 76, n: 'İnsân', p: 578 }, { id: 77, n: 'Mürselât', p: 580 }, { id: 78, n: 'Nebe\'', p: 582 },
  { id: 79, n: 'Nâziât', p: 583 }, { id: 80, n: 'Abese', p: 585 }, { id: 81, n: 'Tekvîr', p: 586 },
  { id: 82, n: 'İnfıtâr', p: 587 }, { id: 83, n: 'Mutaffifîn', p: 587 }, { id: 84, n: 'İnşikâk', p: 589 },
  { id: 85, n: 'Bürûc', p: 590 }, { id: 86, n: 'Târık', p: 591 }, { id: 87, n: 'A\'lâ', p: 591 },
  { id: 88, n: 'Ğâşiye', p: 592 }, { id: 89, n: 'Fecr', p: 593 }, { id: 90, n: 'Beled', p: 594 },
  { id: 91, n: 'Şems', p: 595 }, { id: 92, n: 'Leyl', p: 595 }, { id: 93, n: 'Duhâ', p: 596 },
  { id: 94, n: 'İnşirâh', p: 596 }, { id: 95, n: 'Tîn', p: 597 }, { id: 96, n: 'Alak', p: 597 },
  { id: 97, n: 'Kadr', p: 598 }, { id: 98, n: 'Beyyine', p: 598 }, { id: 99, n: 'Zilzâl', p: 599 },
  { id: 100, n: 'Âdiyât', p: 599 }, { id: 101, n: 'Kâria', p: 600 }, { id: 102, n: 'Tekâsür', p: 600 },
  { id: 103, n: 'Asr', p: 601 }, { id: 104, n: 'Hümeze', p: 601 }, { id: 105, n: 'Fîl', p: 601 },
  { id: 106, n: 'Kureyş', p: 602 }, { id: 107, n: 'Mâûn', p: 602 }, { id: 108, n: 'Kevser', p: 602 },
  { id: 109, n: 'Kâfirûn', p: 603 }, { id: 110, n: 'Nasr', p: 603 }, { id: 111, n: 'Tebbet', p: 603 },
  { id: 112, n: 'İhlâs', p: 604 }, { id: 113, n: 'Felak', p: 604 }, { id: 114, n: 'Nâs', p: 604 }
];

const QURAN_DAILY_VERSES = [
  { ar: "وَقُلْ رَبِّ زِدْنِي عِلْمًا", tr: "\"Rabbim! Benim ilmimi artır.\"", ref: "Tâhâ 20/114" },
  { ar: "وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ", tr: "\"O, her şeye gücü yetendir.\"", ref: "Mülk 67/1" },
  { ar: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", tr: "\"Şüphesiz her güçlükle bir kolaylık vardır.\"", ref: "İnşirâh 94/6" },
  { ar: "وَاللَّهُ يَعْلَمُ وَأَنْتُمْ لَا تَعْلَمُونَ", tr: "\"Allah bilir, siz bilmezsiniz.\"", ref: "Bakara 2/216" },
  { ar: "وَمَنْ يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ", tr: "\"Kim Allah'a tevekkül ederse O ona yeter.\"", ref: "Talâk 65/3" },
  { ar: "وَكَفَىٰ بِاللَّهِ وَكِيلًا", tr: "\"Vekil olarak Allah yeter.\"", ref: "Nisâ 4/81" },
  { ar: "وَكَفَىٰ بِاللَّهِ نَصِيرًا", tr: "\"Yardımcı olarak Allah yeter.\"", ref: "Nisâ 4/45" },
  { ar: "إِنَّ اللَّهَ غَفُورٌ رَحِيمٌ", tr: "\"Şüphesiz Allah bağışlayandır, merhamet edendir.\"", ref: "Bakara 2/173" },
  { ar: "إِنَّ اللَّهَ عَلِيمٌ حَكِيمٌ", tr: "\"Şüphesiz Allah hakkıyla bilendir, hüküm sahibidir.\"", ref: "İnsân 76/30" },
  { ar: "وَاللَّهُ سَمِيعٌ عَلِيمٌ", tr: "\"Allah hakkıyla işitendir, hakkıyla bilendir.\"", ref: "Bakara 2/224" },
  { ar: "وَاعْبُدْ رَبَّكَ حَتَّىٰ يَأْتِيَكَ الْيَقِينُ", tr: "\"Sana ölüm gelinceye kadar Rabbine kulluk et.\"", ref: "Hicr 15/99" },
  { ar: "وَقُولُوا لِلنَّاسِ حُسْنًا", tr: "\"İnsanlara güzel söz söyleyin.\"", ref: "Bakara 2/83" },
  { ar: "لَئِنْ شَكَرْتُمْ لَأَزِيدَنَّكُمْ", tr: "\"Eğer şükrederseniz elbette artırırım.\"", ref: "İbrâhîm 14/7" },
  { ar: "وَاللَّهُ مَعَ الصَّابِرِينَ", tr: "\"Allah sabredenlerle beraberdir.\"", ref: "Bakara 2/249" },
  { ar: "إِنَّ رَبِّي قَرِيبٌ مُجِيبٌ", tr: "\"Şüphesiz Rabbim yakındır, duaları kabul edendir.\"", ref: "Hûd 11/61" },
  { ar: "وَهُوَ الْغَفُورُ الْوَدُودُ", tr: "\"O çok bağışlayandır, çok sevendir.\"", ref: "Bürûc 85/14" },
  { ar: "رَبِّ ابْنِ لِي عِنْدَكَ بَيْتًا فِي الْجَنَّةِ", tr: "\"Rabbim! Bana katında cennette bir ev yap.\"", ref: "Tahrîm 66/11" },
  { ar: "فَاصْبِرْ صَبْرًا جَمِيلًا", tr: "\"Şimdi sen güzelce sabret.\"", ref: "Meâric 70/5" },
  { ar: "فَابْتَغُوا عِنْدَ اللَّهِ الرِّزْقَ", tr: "\"Rızkı Allah'ın katında arayın.\"", ref: "Ankebût 29/17" },
  { ar: "إِنَّ اللَّهَ كَانَ عَلَيْكُمْ رَقِيبًا", tr: "\"Şüphesiz Allah üzerinizde bir gözetleyicidir.\"", ref: "Nisâ 4/1" },
  { ar: "وَاسْتَغْفِرُوا اللَّهَ ۖ إِنَّ اللَّهَ غَفُورٌ رَحِيمٌ", tr: "\"Allah'tan bağışlanma dileyin. Allah bağışlayandır.\"", ref: "Bakara 2/199" },
  { ar: "وَاللَّهُ يَهْدِي مَنْ يَشَاءُ", tr: "\"Allah dilediğini doğru yola iletir.\"", ref: "Bakara 2/213" },
  { ar: "إِنَّ اللَّهَ لَا يُخْلِفُ الْمِيعَادَ", tr: "\"Şüphesiz Allah sözünden dönmez.\"", ref: "Âl-i İmrân 3/9" },
  { ar: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", tr: "\"Yalnız sana kulluk eder, yalnız senden yardım dileriz.\"", ref: "Fâtiha 1/5" },
  { ar: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", tr: "\"Bizi doğru yola ilet.\"", ref: "Fâtiha 1/6" },
  { ar: "وَقُلْ رَبِّ اغْفِرْ وَارْحَمْ", tr: "\"De ki: Rabbim! Bağışla ve merhamet et.\"", ref: "Mü'minûn 23/118" },
  { ar: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا", tr: "\"Gevşemeyin, üzülmeyin.\"", ref: "Âl-i İmrân 3/139" },
  { ar: "إِنَّ رَبَّكَ لَبِالْمِرْصَادِ", tr: "\"Şüphesiz Rabbin her an gözetlemektedir.\"", ref: "Fecr 89/14" },
  { ar: "وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ", tr: "\"Başarım ancak Allah'ın yardımıyladır.\"", ref: "Hûd 11/88" },
  { ar: "وَاللَّهُ بَصِيرٌ بِالْعِبَادِ", tr: "\"Allah kullarını hakkıyla görendir.\"", ref: "Âl-i İmrân 3/15" },
  { ar: "قُلْ كُلٌّ يَعْمَلُ عَلَىٰ شَاكِلَتِهِ", tr: "\"De ki: Herkes kendi mizaç ve karakterine göre iş yapar.\"", ref: "İsrâ 17/84" },
  { ar: "وَأَحْسِنُوا ۛ إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ", tr: "\"İyilik edin; Allah iyilik edenleri sever.\"", ref: "Bakara 2/195" },
  { ar: "إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ", tr: "\"Şüphesiz Allah çok tövbe edenleri sever.\"", ref: "Bakara 2/222" },
  { ar: "وَاللَّهُ غَنِيٌّ حَلِيمٌ", tr: "\"Allah zengindir, müsamaha sahibidir.\"", ref: "Bakara 2/263" },
  { ar: "وَاللَّهُ يَعِدُكُمْ مَغْفِرَةً مِنْهُ وَفَضْلًا", tr: "\"Allah size katından bir bağışlanma ve lütuf vadeder.\"", ref: "Bakara 2/268" },
  { ar: "قُلْ إِنَّ هُدَى اللَّهِ هُوَ الْهُدَىٰ", tr: "\"De ki: Asıl doğru yol Allah'ın yoludur.\"", ref: "Bakara 2/120" },
  { ar: "فَاذْكُرُونِي أَذْكُرْكُمْ", tr: "\"Beni anın ki ben de sizi anayım.\"", ref: "Bakara 2/152" },
  { ar: "وَأَنِ اسْتَغْفِرُوا رَبَّكُمْ ثُمَّ تُوبُوا إِلَيْهِ", tr: "\"Rabbinizden bağışlanma dileyin, sonra O'na tövbe edin.\"", ref: "Hûd 11/3" },
  { ar: "إِنَّ رَبِّي لَطِيفٌ لِمَا يَشَاءُ", tr: "\"Şüphesiz Rabbim dilediğine karşı lütufkârdır.\"", ref: "Yûsuf 12/100" },
  { ar: "وَاللَّهُ غَالِبٌ عَلَىٰ أَمْرِهِ", tr: "\"Allah emrini yerine getirmeye muktedirdir.\"", ref: "Yûsuf 12/21" },
  { ar: "وَهُوَ أَرْحَمُ الرَّاحِمِينَ", tr: "\"O merhametlilerin en merhametlisidir.\"", ref: "Yûsuf 12/92" },
  { ar: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", tr: "\"Biliniz ki kalpler ancak Allah'ı anmakla huzur bulur.\"", ref: "Ra'd 13/28" },
  { ar: "وَقُلْ جَاءَ الْحَقُّ وَزَهَقَ الْبَاطِلُ", tr: "\"De ki: Hak geldi, batıl yok oldu.\"", ref: "İsrâ 17/81" },
  { ar: "رَبِّ اشْرَحْ لِي صَدْرِي", tr: "\"Rabbim! Göğsümü genişlet.\"", ref: "Tâhâ 20/25" },
  { ar: "وَيَسِّرْ لِي أَمْرِي", tr: "\"İşimi bana kolaylaştır.\"", ref: "Tâhâ 20/26" },
  { ar: "كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ", tr: "\"Her nefis ölümü tadacaktır.\"", ref: "Âl-i İmrân 3/185" },
  { ar: "سَلَامٌ قَوْلًا مِنْ رَبٍّ رَحِيمٍ", tr: "\"Çok merhametli olan Rabden bir selam vardır.\"", ref: "Yâsîn 36/58" },
  { ar: "وَاللَّهُ خَيْرُ الرَّازِقِينَ", tr: "\"Allah rızık verenlerin en hayırlısıdır.\"", ref: "Cuma 62/11" },
  { ar: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ", tr: "\"Biz Allah'a aitiz ve şüphesiz O'na döneceğiz.\"", ref: "Bakara 2/156" },
  { ar: "قُلْ هُوَ اللَّهُ أَحَدٌ", tr: "\"De ki: O Allah tektir.\"", ref: "İhlâs 112/1" }
];

const QURAN_ROUTINES_DEF = [
  {
    id: 'yasin',
    title: '☀️ Yasin Suresi',
    sub: 'Sabah okuması',
    fazilet: 'Hz. Peygamber (s.a.v.) "Yâsîn, Kur\'an\'ın kalbidir. Kim onu Allah\'ın rızasını gözeterek okursa geçmiş günahları bağışlanır." (Tirmizî, Dârimî)',
    neden: 'Güne Allah\'ın kelamıyla başlamak, günün manevi ferahlık ve bereketle geçmesi için sabah namazından sonra okunması gelenekleşmiştir.'
  },
  {
    id: 'fetih',
    title: '☀️ Fetih Suresi',
    sub: 'Öğle okuması',
    fazilet: 'Hudeybiye Antlaşması sonrasında inen bu sure; zafer, huzur, bağışlanma ve ilahi desteği müjdeler.',
    neden: 'Gün ortasında işlerin kolaylaşması, engellerin kalkması, başarı ve fetihler nasip olması niyetiyle öğle namazından sonra okunur.'
  },
  {
    id: 'nebe',
    title: '🌇 Nebe (Amme) Suresi',
    sub: 'İkindi okuması',
    fazilet: 'Kıyamet gününü, ahiret haberlerini, Allah\'ın kâinattaki kudretini ve cennet nimetlerini hatırlatır.',
    neden: 'Günün sonuna doğru ilerlerken dünya meşgalesinden sıyrılıp ahireti tefekkür etmek ve imanı taze tutmak amacıyla okunur.'
  },
  {
    id: 'vakia',
    title: '🌙 Vâkıa Suresi',
    sub: 'Akşam okuması',
    fazilet: 'Hz. Peygamber (s.a.v.) "Her kim gece Vâkıa suresini okursa, ona asla fakirlik dokunmaz." (İbn Kesîr, Beyhakî) buyurmuştur.',
    neden: 'Rızık bereketi, helal kazanç ve manevi darlıklardan korunmak amacıyla akşam ile yatsı arasında okunması tavsiye edilir.'
  },
  {
    id: 'mulk_secde',
    title: '🌙 Mülk & Secde Sureleri',
    sub: 'Yatsı okuması',
    fazilet: 'Hz. Peygamber (s.a.v.) Secde ve Mülk surelerini okumadan uyumazdı. Mülk suresi hakkında "O kabir azabına engel olur ve okuyanına şefaat eder" buyrulmuştur.',
    neden: 'Gece istirahatine geçmeden önce kabir alemini hatırlamak, korunmak ve uykuyu bereketlendirmek için yatsı sonrası okunur.'
  },
  {
    id: 'kehf',
    title: '🕌 Kehf Suresi',
    sub: 'Cuma günü okuması',
    fazilet: 'Hz. Peygamber (s.a.v.) "Cuma günü Kehf suresini okuyan kimsenin altından göğe kadar bir nur yükselir, iki cuma arası aydınlanır" buyurmuştur.',
    neden: 'Ahir zaman fitnelerinden korunmak ve haftalık manevi arınma sağlamak için Perşembe akşamından Cuma gün batımına kadar okunur.'
  }
];

let _currentVerseIdx = null;

function renderQuranView() {
  if (!S.quran) S.quran = { surah: 1, surahName: 'Fâtiha', page: 1, ayah: 1, routines: {} };

  // 1. Günün Ayeti Render (Günün tarihine göre otomatik seçilir)
  if (_currentVerseIdx === null) {
    const doy = typeof dayOfYear === 'function' ? dayOfYear() : new Date().getDate();
    _currentVerseIdx = doy % QURAN_DAILY_VERSES.length;
  }
  const v = QURAN_DAILY_VERSES[_currentVerseIdx % QURAN_DAILY_VERSES.length];
  const arEl = document.getElementById('quranVerseAr');
  const trEl = document.getElementById('quranVerseTr');
  const refEl = document.getElementById('quranVerseRef');
  if (arEl) arEl.textContent = v.ar;
  if (trEl) trEl.textContent = v.tr;
  if (refEl) refEl.textContent = v.ref;

  // 2. Akıllı Ayraç Render
  const sName = document.getElementById('bmSurahName');
  const pNum = document.getElementById('bmPageNum');
  const aNum = document.getElementById('bmAyahNum');
  if (sName) sName.textContent = S.quran.surahName || 'Fâtiha';
  if (pNum) pNum.textContent = `${S.quran.page || 1} / 604`;
  if (aNum) aNum.textContent = S.quran.ayah || 1;

  // Hatim İlerleme
  const pg = Math.min(604, Math.max(1, S.quran.page || 1));
  const pct = ((pg / 604) * 100).toFixed(1);
  const hVal = document.getElementById('hatimProgVal');
  const hFill = document.getElementById('hatimProgFill');
  if (hVal) hVal.textContent = `%${pct} (${pg}/604 Sayfa)`;
  if (hFill) hFill.style.width = `${pct}%`;

  // 3. Günlük Rutinler Render
  renderQuranRoutines();
}

function nextDailyVerse() {
  _currentVerseIdx = (_currentVerseIdx + 1) % QURAN_DAILY_VERSES.length;
  renderQuranView();
}

function copyVerseText() {
  const v = QURAN_DAILY_VERSES[_currentVerseIdx % QURAN_DAILY_VERSES.length];
  const text = `${v.ar}\n\n${v.tr}\n(${v.ref})`;
  navigator.clipboard.writeText(text).then(() => {
    toast('Ayet panoya kopyalandı!', 's');
  }).catch(() => {
    toast('Kopyalama başarısız', 'e');
  });
}

function incQuranPage(n) {
  if (!S.quran) S.quran = { surah: 1, surahName: 'Fâtiha', page: 1, ayah: 1, routines: {} };
  S.quran.page = Math.min(604, (S.quran.page || 1) + n);

  // Bulunduğu surenin adını sayfa numarasına göre güncelle
  const foundSurah = SURAHS.slice().reverse().find(s => s.p <= S.quran.page);
  if (foundSurah) {
    S.quran.surah = foundSurah.id;
    S.quran.surahName = foundSurah.n;
  }

  save();
  renderQuranView();
  toast(`Sayfa güncellendi: ${S.quran.page}. Sayfa (${S.quran.surahName})`, 's');
}

function renderQuranRoutines() {
  const listEl = document.getElementById('quranRoutinesList');
  const badgeEl = document.getElementById('quranRoutineBadge');
  if (!listEl) return;

  const tKey = today();
  if (!S.quran.routines) S.quran.routines = {};
  if (!S.quran.routines[tKey]) S.quran.routines[tKey] = {};
  const todayDone = S.quran.routines[tKey];

  let completedCount = 0;
  listEl.innerHTML = QURAN_ROUTINES_DEF.map(item => {
    const isDone = !!todayDone[item.id];
    if (isDone) completedCount++;
    return `
      <div class="qroutine-item ${isDone ? 'done' : ''}" onclick="toggleQuranRoutine('${item.id}')">
        <div class="qroutine-chk">${isDone ? '✓' : ''}</div>
        <div class="qroutine-text">
          <div class="qroutine-title">${item.title}</div>
          <div class="qroutine-sub">${item.sub}</div>
        </div>
        <button class="qroutine-info-btn" onclick="openSurahInfoModal('${item.id}', event)" title="Fazileti ve Vakit Açıklaması">ℹ️</button>
      </div>
    `;
  }).join('');

  if (badgeEl) {
    badgeEl.textContent = `${completedCount}/${QURAN_ROUTINES_DEF.length} Tamamlandı`;
  }
}

function openSurahInfoModal(id, e) {
  if (e) e.stopPropagation();
  const surah = QURAN_ROUTINES_DEF.find(s => s.id === id);
  if (!surah) return;

  const tEl = document.getElementById('sInfoTitle');
  const sEl = document.getElementById('sInfoSub');
  const fEl = document.getElementById('sInfoFazilet');
  const nEl = document.getElementById('sInfoNeden');

  if (tEl) tEl.textContent = surah.title;
  if (sEl) sEl.textContent = surah.sub;
  if (fEl) fEl.textContent = surah.fazilet;
  if (nEl) nEl.textContent = surah.neden;

  document.getElementById('surahInfoModal')?.classList.add('on');
}

function toggleQuranRoutine(id) {
  const tKey = today();
  if (!S.quran.routines) S.quran.routines = {};
  if (!S.quran.routines[tKey]) S.quran.routines[tKey] = {};

  S.quran.routines[tKey][id] = !S.quran.routines[tKey][id];
  save();
  renderQuranRoutines();
  if (S.quran.routines[tKey][id]) {
    toast('Rutin tamamlandı!', 's');
  }
}

function openBookmarkModal() {
  if (!S.quran) S.quran = { surah: 1, surahName: 'Fâtiha', page: 1, ayah: 1, routines: {} };

  const sel = document.getElementById('bmSurahSelect');
  if (sel) {
    sel.innerHTML = SURAHS.map(s => `<option value="${s.id}" ${s.id === S.quran.surah ? 'selected' : ''}>${s.id}. ${s.n} (Sayfa ${s.p})</option>`).join('');
  }

  const pInp = document.getElementById('bmPageInput');
  const aInp = document.getElementById('bmAyahInput');
  if (pInp) pInp.value = S.quran.page || 1;
  if (aInp) aInp.value = S.quran.ayah || 1;

  document.getElementById('bookmarkModal')?.classList.add('on');
}

function onSurahSelectChange() {
  const sel = document.getElementById('bmSurahSelect');
  if (!sel) return;
  const sId = parseInt(sel.value, 10);
  const surah = SURAHS.find(s => s.id === sId);
  if (surah) {
    const pInp = document.getElementById('bmPageInput');
    if (pInp) pInp.value = surah.p;
  }
}

function saveBookmarkModal() {
  const sel = document.getElementById('bmSurahSelect');
  const pInp = document.getElementById('bmPageInput');
  const aInp = document.getElementById('bmAyahInput');

  const sId = parseInt(sel?.value || '1', 10);
  const surah = SURAHS.find(s => s.id === sId);

  S.quran.surah = sId;
  S.quran.surahName = surah ? surah.n : 'Fâtiha';
  S.quran.page = Math.min(604, Math.max(1, parseInt(pInp?.value || '1', 10)));
  S.quran.ayah = Math.max(1, parseInt(aInp?.value || '1', 10));

  save();
  renderQuranView();
  closeModal('bookmarkModal');
  toast('Kaldığın yer kaydedildi!', 's');
}


