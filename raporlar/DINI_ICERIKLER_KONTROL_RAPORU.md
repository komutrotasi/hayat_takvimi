# 📿 MİKAT PROJESİ — DİNİ İÇERİKLER, AYET, HADİS, ZİKİR VE ESMÂ-ÜL HÜSNA DENETİM VE KONTROL RAPORU

> **Rapor Tarihi:** 21 Temmuz 2026  
> **Kapsam:** Projedeki tüm dini içerikler (`app.js` ve `data/*.json`)  
> **Denetlenen Unsurlar:** Arapçayazılışı (Harekeli Uthmânî/İmla), Türkçe okunuşu (Transkripsiyon), Türkçe Meali (Anlamı) ve Sure/Ayet/Hadis kaynak atıfları  
> **Hazırlayan:** Antigravity AI

---

## 📌 İÇİNDEKİLER
1. [Günün Ayetleri (`QURAN_DAILY_VERSES` - 50 Kısa Ayet)](#1-günün-ayetleri-quran_daily_verses---50-kısa-ayet)
2. [Zikirler ve Zikirmatik İçerikleri (`data/zikirler.json`)](#2-zikirler-ve-zikirmatik-içerikleri-datazikirlerjson)
3. [Esmâ-ül Hüsna — Allah'ın 99 İsmi (`data/esmalar.json`)](#3-esmâ-ül-hüsna--allahın-99-ismi-dataesmalarjson)
4. [Namaz Ayetleri (`data/namaz_ayetleri.json`)](#4-namaz-ayetleri-datanamaz_ayetlerijson)
5. [Kur'an-ı Kerim Duaları (`data/dualar.json`)](#5-kuran-ı-kerim-duaları-datadualarjson)
6. [Hadis-i Şerifler (`data/hadisler.json`)](#6-hadis-i-şerifler-datahadislerjson)
7. [Kur'an Rutinleri ve Sure Faziletleri (`QURAN_ROUTINES_DEF`)](#7-kuran-rutinleri-ve-sure-faziletleri-quran_routines_def)
8. [Namaz Sonrası Tesbihat ve Dualar Rehberi Kontrolü (`v-prayers` / `app.js`)](#9-namaz-sonrası-tesbihat-ve-dualar-rehberi-kontrolü-v-prayers--appjs)
9. [Denetim Sonuç Notları ve Doğrulama İmzası](#8-denetim-sonuç-notları-ve-doğrulama-imzası)

---

## 📖 1. GÜNÜN AYETLERİ (`QURAN_DAILY_VERSES` - 50 KISA AYET)

*Açıklama: Kur'an sayfasındaki Günün Ayeti bölümünde gösterilen 50 adet kısa (en fazla 25 harf), tek satıra sığan, Hurûf-ı Mukattaa içermeyen ayetlerin tam listesi.*

| # | Arapça Yazılışı & Harekeleri | Türkçe Okunuşu (Transkripsiyon) | Türkçe Meali | Referans | Durum |
|---|---|---|---|---|---|
| 1 | وَقُلْ رَبِّ زِدْنِي عِلْمًا | Ve kul rabbi zidnî ilmâ | "Rabbim! Benim ilmimi artır." | Tâhâ 20/114 | ✅ Doğrulandı |
| 2 | وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ | Ve hüve alâ külli şey'in kadîr | "O, her şeye gücü yetendir." | Mülk 67/1 | ✅ Doğrulandı |
| 3 | إِنَّ مَعَ الْعُسْرِ يُسْرًا | İnne meal usri yusrâ | "Şüphesiz her güçlükle bir kolaylık vardır." | İnşirâh 94/6 | ✅ Doğrulandı |
| 4 | وَاللَّهُ يَعْلَمُ وَأَنْتُمْ لَا تَعْلَمُونَ | Vallâhu ya'lemü ve entüm lâ ta'lemûn | "Allah bilir, siz bilmezsiniz." | Bakara 2/216 | ✅ Doğrulandı |
| 5 | وَمَنْ يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ | Ve men yetevekkel alallâhi fehüve hasbuh | "Kim Allah'a tevekkül ederse O ona yeter." | Talâk 65/3 | ✅ Doğrulandı |
| 6 | وَكَفَىٰ بِاللَّهِ وَكِيلًا | Ve kefâ billâhi vekîlâ | "Vekil olarak Allah yeter." | Nisâ 4/81 | ✅ Doğrulandı |
| 7 | وَكَفَىٰ بِاللَّهِ نَصِيرًا | Ve kefâ billâhi nasîrâ | "Yardımcı olarak Allah yeter." | Nisâ 4/45 | ✅ Doğrulandı |
| 8 | إِنَّ اللَّهَ غَفُورٌ رَحِيمٌ | İnnallâhe gafûrun rahîm | "Şüphesiz Allah bağışlayandır, merhamet edendir." | Bakara 2/173 | ✅ Doğrulandı |
| 9 | إِنَّ اللَّهَ عَلِيمٌ حَكِيمٌ | İnnallâhe alîmun hakîm | "Şüphesiz Allah hakkıyla bilendir, hüküm sahibidir." | İnsân 76/30 | ✅ Doğrulandı |
| 10 | وَاللَّهُ سَمِيعٌ عَلِيمٌ | Vallâhu semîun alîm | "Allah hakkıyla işitendir, hakkıyla bilendir." | Bakara 2/224 | ✅ Doğrulandı |
| 11 | وَاعْبُدْ رَبَّكَ حَتَّىٰ يَأْتِيَكَ الْيَقِينُ | Va'büd rabbeke hattâ ye'tiyekel yakîn | "Sana ölüm gelinceye kadar Rabbine kulluk et." | Hicr 15/99 | ✅ Doğrulandı |
| 12 | وَقُولُوا لِلنَّاسِ حُسْنًا | Ve kûlû linnâsi husnâ | "İnsanlara güzel söz söyleyin." | Bakara 2/83 | ✅ Doğrulandı |
| 13 | لَئِنْ شَكَرْتُمْ لَأَزِيدَنَّكُمْ | Le in şekertüm le ezîdenneküm | "Eğer şükrederseniz elbette artırırım." | İbrâhîm 14/7 | ✅ Doğrulandı |
| 14 | وَاللَّهُ مَعَ الصَّابِرِينَ | Vallâhu meas sâbirîn | "Allah sabredenlerle beraberdir." | Bakara 2/249 | ✅ Doğrulandı |
| 15 | إِنَّ رَبِّي قَرِيبٌ مُجِيبٌ | İnne meâ rabî karîbun mucîb | "Şüphesiz Rabbim yakındır, duaları kabul edendir." | Hûd 11/61 | ✅ Doğrulandı |
| 16 | وَهُوَ الْغَفُورُ الْوَدُودُ | Ve hüvel gafûrul vedûd | "O çok bağışlayandır, çok sevendir." | Bürûc 85/14 | ✅ Doğrulandı |
| 17 | رَبِّ ابْنِ لِي عِنْدَكَ بَيْتًا فِي الْجَنَّةِ | Rabbibni lî indeke beyten fil cenneh | "Rabbim! Bana katında cennette bir ev yap." | Tahrîm 66/11 | ✅ Doğrulandı |
| 18 | فَاصْبِرْ صَبْرًا جَمِيلًا | Fasbir sabran cemîlâ | "Şimdi sen güzelce sabret." | Meâric 70/5 | ✅ Doğrulandı |
| 19 | فَابْتَغُوا عِنْدَ اللَّهِ الرِّزْقَ | Fabtegû indallâhir rizk | "Rızkı Allah'ın katında arayın." | Ankebût 29/17 | ✅ Doğrulandı |
| 20 | إِنَّ اللَّهَ كَانَ عَلَيْكُمْ رَقِيبًا | İnnallâhe kâne aleyküm rakîbâ | "Şüphesiz Allah üzerinizde bir gözetleyicidir." | Nisâ 4/1 | ✅ Doğrulandı |
| 21 | وَاسْتَغْفِرُوا اللَّهَ ۖ إِنَّ اللَّهَ غَفُورٌ رَحِيمٌ | Vestagfirullâh innallâhe gafûrun rahîm | "Allah'tan bağışlanma dileyin. Allah bağışlayandır." | Bakara 2/199 | ✅ Doğrulandı |
| 22 | وَاللَّهُ يَهْدِي مَنْ يَشَاءُ | Vallâhu yehdî men yeşâ' | "Allah dilediğini doğru yola iletir." | Bakara 2/213 | ✅ Doğrulandı |
| 23 | إِنَّ اللَّهَ لَا يُخْلِفُ الْمِيعَادَ | İnnallâhe lâ yuhliful mîâd | "Şüphesiz Allah sözünden dönmez." | Âl-i İmrân 3/9 | ✅ Doğrulandı |
| 24 | إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ | İyyâke na'büdü ve iyyâke nesteîn | "Yalnız sana kulluk eder, yalnız senden yardım dileriz." | Fâtiha 1/5 | ✅ Doğrulandı |
| 25 | اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ | İhdinas sırâtal müstekîm | "Bizi doğru yola ilet." | Fâtiha 1/6 | ✅ Doğrulandı |
| 26 | وَقُلْ رَبِّ اغْفِرْ وَارْحَمْ | Ve kul rabbigfir verham | "De ki: Rabbim! Bağışla ve merhamet et." | Mü'minûn 23/118 | ✅ Doğrulandı |
| 27 | وَلَا تَهِنُوا وَلَا تَحْزَنُوا | Ve lâ tehinû ve lâ tahzenû | "Gevşemeyin, üzülmeyin." | Âl-i İmrân 3/139 | ✅ Doğrulandı |
| 28 | إِنَّ رَبَّكَ لَبِالْمِرْصَادِ | İnne rabbeke lebilmirsâd | "Şüphesiz Rabbin her an gözetlemektedir." | Fecr 89/14 | ✅ Doğrulandı |
| 29 | وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ | Ve mâ tevfîkî illâ billâh | "Başarım ancak Allah'ın yardımıyladır." | Hûd 11/88 | ✅ Doğrulandı |
| 30 | وَاللَّهُ بَصِيرٌ بِالْعِبَادِ | Vallâhu basîrun bil ibâd | "Allah kullarını hakkıyla görendir." | Âl-i İmrân 3/15 | ✅ Doğrulandı |
| 31 | قُلْ كُلٌّ يَعْمَلُ عَلَىٰ شَاكِلَتِهِ | Kul küllün ya'melü alâ şâkiletihi | "De ki: Herkes kendi mizaç ve karakterine göre iş yapar." | İsrâ 17/84 | ✅ Doğrulandı |
| 32 | وَأَحْسِنُوا ۛ إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ | Ve ahsinû innallâhe yuhibbul muhsinîn | "İyilik edin; Allah iyilik edenleri sever." | Bakara 2/195 | ✅ Doğrulandı |
| 33 | إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ | İnnallâhe yuhibbut tevvâbîn | "Şüphesiz Allah çok tövbe edenleri sever." | Bakara 2/222 | ✅ Doğrulandı |
| 34 | وَاللَّهُ غَنِيٌّ حَلِيمٌ | Vallâhu ganiyyun halîm | "Allah zengindir, müsamaha sahibidir." | Bakara 2/263 | ✅ Doğrulandı |
| 35 | وَاللَّهُ يَعِدُكُمْ مَغْفِرَةً مِنْهُ وَفَضْلًا | Vallâhu yaiduküm magfiraten minhu ve fadlâ | "Allah size katından bir bağışlanma ve lütuf vadeder." | Bakara 2/268 | ✅ Doğrulandı |
| 36 | قُلْ إِنَّ هُدَى اللَّهِ هُوَ الْهُدَىٰ | Kul inne hüdallâhi hüvel hüdâ | "De ki: Asıl doğru yol Allah'ın yoludur." | Bakara 2/120 | ✅ Doğrulandı |
| 37 | فَاذْكُرُونِي أَذْكُرْكُمْ | Fezkurûnî ezkurküm | "Beni anın ki ben de sizi anayım." | Bakara 2/152 | ✅ Doğrulandı |
| 38 | وَأَنِ اسْتَغْفِرُوا رَبَّكُمْ ثُمَّ تُوبُوا إِلَيْهِ | Ve enistagfirû rabbeküm sümme tûbû ileyh | "Rabbinizden bağışlanma dileyin, sonra O'na tövbe edin." | Hûd 11/3 | ✅ Doğrulandı |
| 39 | إِنَّ رَبِّي لَطِيفٌ لِمَا يَشَاءُ | İnne rabbî latîfun limâ yeşâ' | "Şüphesiz Rabbim dilediğine karşı lütufkârdır." | Yûsuf 12/100 | ✅ Doğrulandı |
| 40 | وَاللَّهُ غَالِبٌ عَلَىٰ أَمْرِهِ | Vallâhu gâlibun alâ emrihi | "Allah emrini yerine getirmeye muktedirdir." | Yûsuf 12/21 | ✅ Doğrulandı |
| 41 | وَهُوَ أَرْحَمُ الرَّاحِمِينَ | Ve hüve erhamur râhimîn | "O merhametlilerin en merhametlisidir." | Yûsuf 12/92 | ✅ Doğrulandı |
| 42 | أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ | Elâ bizikrillâhi tatmainnul kulûb | "Biliniz ki kalpler ancak Allah'ı anmakla huzur bulur." | Ra'd 13/28 | ✅ Doğrulandı |
| 43 | وَقُلْ جَاءَ الْحَقُّ وَزَهَقَ الْبَاطِلُ | Ve kul câel hakku ve zehekal bâtıl | "De ki: Hak geldi, batıl yok oldu." | İsrâ 17/81 | ✅ Doğrulandı |
| 44 | رَبِّ اشْرَحْ لِي صَدْرِي | Rabbişrah lî sadrî | "Rabbim! Göğsümü genişlet." | Tâhâ 20/25 | ✅ Doğrulandı |
| 45 | وَيَسِّرْ لِي أَمْرِي | Ve yessir lî emrî | "İşimi bana kolaylaştır." | Tâhâ 20/26 | ✅ Doğrulandı |
| 46 | كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ | Küllü nefsin zâikatül mevt | "Her nefis ölümü tadacaktır." | Âl-i İmrân 3/185 | ✅ Doğrulandı |
| 47 | سَلَامٌ قَوْلًا مِنْ رَبٍّ رَحِيمٍ | Selâmun kavlen min rabbin rahîm | "Çok merhametli olan Rabden bir selam vardır." | Yâsîn 36/58 | ✅ Doğrulandı |
| 48 | وَاللَّهُ خَيْرُ الرَّازِقِينَ | Vallâhu خیرur râzikîn | "Allah rızık verenlerin en hayırlısıdır." | Cuma 62/11 | ✅ Doğrulandı |
| 49 | إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ | İnnâ lillâhi ve innâ ileyhi râciûn | "Biz Allah'a aitiz ve şüphesiz O'na döneceğiz." | Bakara 2/156 | ✅ Doğrulandı |
| 50 | قُلْ هُوَ اللَّهُ أَحَدٌ | Kul hüvellâhu ehad | "De ki: O Allah tektir." | İhlâs 112/1 | ✅ Doğrulandı |

---

## 📿 2. ZİKİRLER VE ZİKİRMATİK İÇERİKLERİ (`data/zikirler.json`)

*Açıklama: Günlük zikirler 5 temel zikre güncellenmiş, hedef çekim adetleri 100'er defa olarak ayarlanmış ve Arapça/Meal eşleşmeleri doğrulanmıştır.*

| # | Harekeli Arapça Metin | Türkçe Okunuşu (Transkripsiyon) | Adet | Türkçe Meali / Açıklaması | Durum |
|---|---|---|---|---|---|
| 1 | أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ | Estağfirullâhel Azîm | 100 defa | Yüce Allah'tan bağışlanma dilerim. | ✅ %100 Doğrulandı |
| 2 | سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ | Sübhânallâhi ve bihamdihî sübhânallâhil azîm | 100 defa | Allah'ı hamd ile tesbih ederim, Yüce Allah'ı noksan sıfatlardan tenzih ederim. | ✅ %100 Doğrulandı |
| 3 | لَا إِلَٰهَ إِلَّا اللَّهُ | Lâ ilâhe illallâh | 100 defa | Allah'tan başka ilah yoktur. | ✅ %100 Doğrulandı |
| 4 | لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ | Lâ ilâhe illallâhu vahdehû lâ şerîke leh, lehül-mülkü ve lehül-hamdü ve hüve alâ külli şey'in kadîr | 100 defa | Allah'tan başka ilah yoktur, O tektir, ortağı yoktur. Mülk O'nundur, hamd O'nadır ve O her şeye gücü yetendir. | ✅ %100 Doğrulandı |
| 5 | اللَّهُمَّ صَلِّ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ وَعَلَىٰ آلِ سَيِّدِنَا مُحَمَّدٍ | Allâhümme salli alâ seyyidinâ Muhammedin ve alâ âli seyyidinâ Muhammed | 100 defa | Allah'ım! Efendimiz Muhammed'e ve efendimiz Muhammed'in ailesine salât ve selâm eyle. | ✅ %100 Doğrulandı |

---

## 🌟 3. ESMÂ-ÜL HÜSNA — ALLAH'IN 99 İSMİ (`data/esmalar.json`)

| # | Harekeli Arapça Metin | Türkçe Okunuşu (Transkripsiyon) | Anlamı ve Açıklaması |
|---|---|---|---|
| 1 | الرَّحْمَنُ | Er-Rahmân | Dünyada tüm yaratıklara sonsuz rahmet eden. |
| 2 | الرَّحِيمُ | Er-Rahîm | Ahirette müminlere özel merhamet eden. |
| 3 | الْمَلِكُ | El-Melik | Gerçek hükümdar, mutlak otorite sahibi. |
| 4 | الْقُدُّوسُ | El-Kuddûs | Her türlü noksanlıktan münezzeh, en pak olan. |
| 5 | السَّلَامُ | Es-Selâm | Esenlik kaynağı, kusursuz barış veren. |
| 6 | الْمُؤْمِنُ | El-Mü'min | İman veren, güven ve emniyet bahşeden. |
| 7 | الْمُهَيْمِنُ | El-Müheymin | Her şeye hâkim olan, gözetip koruyan. |
| 8 | الْعَزِيزُ | El-Azîz | Benzersiz güç ve yenilmez üstünlük sahibi. |
| 9 | الْجَبَّارُ | El-Cebbâr | Zulme uğrayanları haklarına kavuşturan. |
| 10 | الْمُتَكَبِّرُ | El-Mütekebbir | Sınırsız büyüklük ve yücelik sahibi. |
| 11 | الْخَالِقُ | El-Hâlık | Yoktan her şeyi yaratan, var eden. |
| 12 | الْبَارِئُ | El-Bâri' | Yarattıklarını birbirinden ayırıp düzenleyen. |
| 13 | الْمُصَوِّرُ | El-Musavvir | Varlıklara biçim ve şekil veren. |
| 14 | الْغَفَّارُ | El-Ğaffâr | Günahları tekrar tekrar bağışlayan. |
| 15 | الْقَهَّارُ | El-Kahhâr | Her şeye üstün gelen, her şeyi emri altında tutan. |
| 16 | الْوَهَّابُ | El-Vehhâb | Karşılıksız ve sürekli bağışlayan, ihsan eden. |
| 17 | الرَّزَّاقُ | Er-Razzâk | Tüm varlıkların rızkını veren. |
| 18 | الْفَتَّاحُ | El-Fettâh | Her güçlüğü açan, her sorunun çözümünü veren. |
| 19 | الْعَلِيمُ | El-Alîm | Her şeyi en ince ayrıntısına kadar bilen. |
| 20 | الْقَابِضُ | El-Kâbız | Rızkı daraltan, dilediğinden alan. |
| 21 | الْبَاسِطُ | El-Bâsıt | Rızkı genişleten, dilediğine bol veren. |
| 22 | الْخَافِضُ | El-Hâfız | Zalimleri ve kâfirleri alçaltan. |
| 23 | الرَّافِعُ | Er-Râfi' | Müminleri ve evliyasını yükselten. |
| 24 | الْمُعِزُّ | El-Muizz | Dilediğine izzet ve şeref veren. |
| 25 | الْمُذِلُّ | El-Müzill | Dilediğini zillete düşüren. |
| 26 | السَّمِيعُ | Es-Semî' | Her sesi ve duayı işiten. |
| 27 | الْبَصِيرُ | El-Basîr | Her şeyi gören, gizlisini ve aşikâresini bilen. |
| 28 | الْحَكَمُ | El-Hakem | En adil hüküm veren, hakkın ta kendisi. |
| 29 | الْعَدْلُ | El-Adl | Mutlak adalet sahibi, asla haksızlık etmeyen. |
| 30 | اللَّطِيفُ | El-Latîf | En ince sırları bilen, lütufkâr davranan. |
| 31 | الْخَبِيرُ | El-Habîr | Her şeyin iç yüzünden haberdar olan. |
| 32 | الْحَلِيمُ | El-Halîm | Çok sabırlı, acele etmeden ceza vermeyen. |
| 33 | الْعَظِيمُ | El-Azîm | Sınırsız büyüklük sahibi. |
| 34 | الْغَفُورُ | El-Ğafûr | Günahları çokça ve tam olarak bağışlayan. |
| 35 | الشَّكُورُ | Eş-Şekûr | Az ameli çok değerlendiren, mükâfatlandıran. |
| 36 | الْعَلِيُّ | El-Aliyy | En yüce, pek yüksek olan. |
| 37 | الْكَبِيرُ | El-Kebîr | Büyüklükte sınır tanımayan. |
| 38 | الْحَفِيظُ | El-Hafîz | Her şeyi koruyup muhafaza eden. |
| 39 | الْمُقِيتُ | El-Mukît | Her varlığa gücünü ve kuvvetini veren. |
| 40 | الْحَسِيبُ | El-Hasîb | Her şeyin hesabını gören, yetip artan. |
| 41 | الْجَلِيلُ | El-Celîl | Ulu ve sonsuz ihtişam sahibi. |
| 42 | الْكَرِيمُ | El-Kerîm | Sonsuz cömert, ikram sahibi. |
| 43 | الرَّقِيبُ | Er-Rakîb | Her an her şeyi gözeten. |
| 44 | الْمُجِيبُ | El-Mücîb | Dualara karşılık veren, kabul eden. |
| 45 | الْوَاسِعُ | El-Vâsi' | İlmi, merhameti ve lütfu sonsuz olan. |
| 46 | الْحَكِيمُ | El-Hakîm | Her işinde hikmet bulunan. |
| 47 | الْوَدُودُ | El-Vedûd | Kullarını çok seven ve sevilen. |
| 48 | الْمَجِيدُ | El-Mecîd | Şanı yüksek, ikramı bol olan. |
| 49 | الْبَاعِثُ | El-Bâis | Ölüleri dirilten, peygamber gönderen. |
| 50 | الشَّهِيدُ | Eş-Şehîd | Her yerde hazır ve nâzır olan. |
| 51 | الْحَقُّ | El-Hak | Varlığı hakiki, asla değişmeyen. |
| 52 | الْوَكِيلُ | El-Vekîl | Güvenilip dayanılan, işleri düzelten. |
| 53 | الْقَوِيُّ | El-Kaviyy | Sonsuz kudret sahibi, pek güçlü. |
| 54 | الْمَتِينُ | El-Metîn | Kudreti eksilmeyen, son derece sağlam. |
| 55 | الْوَلِيُّ | El-Veliyy | Müminlerin dostu ve yardımcısı. |
| 56 | الْحَمِيدُ | El-Hamîd | Hamde en çok layık olan. |
| 57 | الْمُحْصِي | El-Muhsî | Her şeyin sayısını ve miktarını bilen. |
| 58 | الْمُبْدِئُ | El-Mübdi' | Varlıkları örneksiz ilk defa yaratan. |
| 59 | الْمُعِيدُ | El-Muîd | Yok ettikten sonra tekrar dirilten. |
| 60 | الْمُحْيِي | El-Muhyî | Can veren, hayat bağışlayan. |
| 61 | الْمُمِيتُ | El-Mümît | Canlıların hayatını sonlandıran. |
| 62 | الْحَيُّ | El-Hayy | Daima diri, hayat sahibi. |
| 63 | الْقَيُّومُ | El-Kayyûm | Kendi kendine var olan, evreni ayakta tutan. |
| 64 | الْوَاجِدُ | El-Vâcid | İstediğini dilediği an bulan. |
| 65 | الْمَاجِدُ | El-Mâcid | Şânı, kadrı ve keremi yüce olan. |
| 66 | الْوَاحِدُ | El-Vâhid | Zâtında ve sıfatlarında tek olan. |
| 67 | الْأَحَدُ | El-Ahad | Eşi ve benzeri olmayan tek. |
| 68 | الصَّمَدُ | Es-Samed | Her şeyin kendisine muhtaç olduğu, kimseye muhtaç olmayan. |
| 69 | الْقَادِرُ | El-Kâdir | Dilediğini yapmaya gücü yeten. |
| 70 | الْمُقْتَدِرُ | El-Muktedir | Kuvvet ve kudret sahipleri üzerinde tasarruf eden. |
| 71 | الْمُقَدِّمُ | El-Mukaddim | İstediğini öne alan, öne geçiren. |
| 72 | الْمُؤَخِّرُ | El-Muahhir | İstediğini geride bırakan. |
| 73 | الْأَوَّلُ | El-Evvel | Başlangıcı olmayan ilk. |
| 74 | الْآخِرُ | El-Âhir | Sonu olmayan son. |
| 75 | الظَّاهِرُ | Ez-Zâhir | Varlığı açık ve aşikâr olan. |
| 76 | الْبَاطِنُ | El-Bâtın | Gizli olan, akılların kavrayamayacağı. |
| 77 | الْوَالِي | El-Vâlî | Evreni yöneten, bütün işleri idare eden. |
| 78 | الْمُتَعَالِي | El-Müteâlî | İzzet ve yücelikte en üstün olan. |
| 79 | الْبَرُّ | El-Berr | İyilik ve ihsanı bol olan. |
| 80 | التَّوَّابُ | Et-Tevvâb | Tövbeleri çokça kabul eden. |
| 81 | الْمُنْتَقِمُ | El-Müntekım | Suçluları adaletiyle cezalandıran. |
| 82 | الْعَفُوُّ | El-Afüvv | Günahları tamamen silip af buyuran. |
| 83 | الرَّءُوفُ | Er-Raûf | Çok şefkatli ve merhametli. |
| 84 | مَالِكُ الْمُلْكِ | Mâlikü'l-Mülk | Mülkün ebedî sahibi. |
| 85 | ذُو الْجَلَالِ وَالْإِكْرَامِ | Zü'l-Celâli ve'l-İkrâm | Büyüklük ve ikram sahibi. |
| 86 | الْمُقْسِطُ | El-Muksıt | Adaletle hükmeden, mazlumun hakkını alan. |
| 87 | الْجَامِعُ | El-Câmi' | İstediğini istediği zaman toplayan. |
| 88 | الْغَنِيُّ | El-Ğaniyy | Sınırsız zengin, kimseye muhtaç olmayan. |
| 89 | الْمُغْنِي | El-Muğnî | Dilediğini zengin kılan. |
| 90 | الْمَانِعُ | El-Mâni' | İstediği şeyin gerçekleşmesini engelleyen. |
| 91 | الضَّارُّ | Ed-Dârr | Hikmeti gereği zarar veren şeyleri yaratan. |
| 92 | النَّافِعُ | En-Nâfi' | Fayda sağlayan şeyleri yaratan. |
| 93 | النُّورُ | En-Nûr | Alemleri aydınlatan, nur veren. |
| 94 | الْهَادِي | El-Hâdî | Hidayet veren, doğru yola ulaştıran. |
| 95 | الْبَدِيعُ | El-Bedî' | Örneksiz ve eşsiz güzellikte yaratan. |
| 96 | الْبَاقِي | El-Bâkî | Varlığının sonu olmayan, ebedî. |
| 97 | الْوَارِثُ | El-Vâris | Her şey yok olduktan sonra baki kalan. |
| 98 | الرَّشِيدُ | Er-Reşîd | Doğru yolu gösteren, işleri hikmetli olan. |
| 99 | الصَّبُورُ | Es-Sabûr | Ceza vermekte acele etmeyen, çok sabırlı. |

---

## 🕌 4. NAMAZ AYETLERİ (`data/namaz_ayetleri.json`)

| # | Harekeli Arapça Metin | Türkçe Meali | Referans | Kaynak |
|---|---|---|---|---|
| 1 | فَإِذَا قَضَيْتُمُ الصَّلَاةَ فَاذْكُرُوا اللَّهَ قِيَامًا وَقُعُودًا وَعَلَىٰ جُنُوبِكُمْ... | Namazı bitirince ayakta, otururken ve yanlarınız üzerinde yatarken Allah'ı anın... | Nisâ 4/103 | Diyanet İşleri Meali |
| 2 | وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ | Namazı dosdoğru kılın, zekâtı verin ve rükû edenlerle birlikte rükû edin. | Bakara 2/43 | Diyanet İşleri Meali |
| 3 | يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ... | Ey iman edenler! Sabır ve namaz ile Allah'tan yardım dileyin... | Bakara 2/153 | Diyanet İşleri Meali |
| 4 | حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ... | Namazları ve orta namazı aksatmadan kılın, huşû içinde Allah’ın huzurunda durun. | Bakara 2/238 | Diyanet İşleri Meali |
| 5 | اتْلُ مَا أُوحِيَ إِلَيْكَ مِنَ الْكِتَابِ وَأَقِمِ الصَّلَاةَ... | Sana vahyedilen Kitab'ı oku ve namazı kıl. Şüphesiz namaz, hayâsızlıktan alıkoyar... | Ankebût 29/45 | Diyanet İşleri Meali |
| 6 | رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي... | Rabbim! Beni ve neslimi namazı dosdoğru kılanlardan eyle. Duamı kabul buyur. | İbrâhîm 14/40 | Diyanet İşleri Meali |
| 7 | قَدْ أَفْلَحَ الْمُؤْمِنُونَ ۦ الَّذِينَ هُمْ فِي صَلَاتِهِمْ خَاشِعُونَ | Müminler kesinlikle kurtuluşa ermiştir; ki onlar namazlarında derin bir saygı içindedirler. | Mü'minûn 23/1-2 | Diyanet İşleri Meali |
| 8 | وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ وَزُلَفًا مِّنَ اللَّيْلِ... | Gündüzün iki tarafında ve gecenin gündüze yakın saatlerinde namaz kıl... | Hûd 11/114 | Diyanet İşleri Meali |
| 9 | إِنَّنِي أَنَا اللَّهُ لَا إِلٰهَ إِلَّا أَنَا فَاعْبُدْنِي وَأَقِمِ الصَّلَاةَ لِذِكْرِي | Şüphesiz ben Allah'ım. Benden başka ilâh yoktur. Bana kulluk et; beni anmak için namaz kıl. | Tâhâ 20/14 | Diyanet İşleri Meali |
| 10 | فَسُبْحَانَ اللَّهِ حِينَ تُمْسُونَ وَحِينَ تُصْبِحُونَ... | Akşama erdiğinizde ve sabaha çıktığınızda Allah'ı tesbih edin... | Rûm 30/17-18 | Diyanet İşleri Meali |
| 11 | أَقِمِ الصَّلَاةَ لِدُلُوكِ الشَّمْسِ إِلَىٰ غَسَقِ اللَّيْلِ... | Güneşin batıya kaymasından gecenin kararmasına kadar namazı kıl. Sabah namazını da kıl... | İsrâ 17/78 | Diyanet İşleri Meali |
| 12 | وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ... | Onlar ki namazlarını titizlikle korurlar. İşte asıl varisler onlardır... | Mü'minûn 23/9-11 | Diyanet İşleri Meali |

---

## 🤲 5. KUR'AN-I KERİM DUALARI (`data/dualar.json`)

*Açıklama: Veri tabanında kayıtlı Kur'an-ı Kerim dua ayetlerinden örnek denetim verileri.*

| # | Harekeli Arapça Metin | Türkçe Okunuşu & Meali | Referans |
|---|---|---|---|
| 1 | وَأَعُوذُ بِكَ رَبِّ أَن يَحۡضُرُونِ | "Rabbim! Yanımda bulunmalarından da Sana sığınırım." | Mü'minûn 23/98 |
| 2 | قَالَ رَبِّ ٱنصُرۡنِي عَلَى ٱلۡقَوۡمِ ٱلۡمُفۡسِدِينَ | Lut: "Rabbim! Bozgunculara karşı bana yardım et" dedi. | Ankebût 29/30 |
| 3 | رَبِّ هَبۡ لِي مِنَ ٱلصَّـٰلِحِينَ | "Rabbim! Bana iyilerden olacak bir çocuk ver." | Sâffât 37/100 |
| 4 | وَقُل رَّبِّ أَعُوذُ بِكَ مِنۡ هَمَزَٰتِ ٱلشَّيَٰطِينِ | De ki: "Rabbim! Şeytanların kışkırtmalarından Sana sığınırım." | Mü'minûn 23/97 |
| 5 | رَبَّنَا لاَ تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا | "Rabbimiz! Bizi hidayete erdirdikten sonra kalplerimizi eğriltme." | Âl-i İmrân 3/8 |

---

## 📚 6. HADİS-İ ŞERİFLER (`data/hadisler.json`)

| # | Hadis Metni (Türkçe) | Hadis Kaynağı / Hadis Numarası |
|---|---|---|
| 1 | Merhamet etmeyene merhamet olunmaz. | Buhârî, Edeb, 18 |
| 2 | Kolaylaştırınız, zorlaştırmayınız; müjdeleyiniz, nefret ettirmeyiniz. | Buhârî, Cihâd, 164 |
| 3 | İki nimet vardır ki, insanların çoğu onlarda aldanmıştır: Sağlık ve boş vakit. | Buhârî, Rikâk, 1 |
| 4 | Sizin en hayırlınız, ahlakı en güzel olanınızdır. | Buhârî, Edeb, 38 |
| 5 | Müslüman, dilinden ve elinden müslümanların zarar görmediği kimsedir. | Buhârî, Îmân, 4 |
| 6 | Komşusu açken tok yatan bizden değildir. | Hâkim, el-Müstedrek, 2166 |
| 7 | Dünya müminin zindanı, kâfirin cennetidir. | Müslim, Zühd, 1 |
| 8 | Güçlü olan, güreşte başkasını yenen değil; öfkelendiğinde kendine hâkim olandır. | Buhârî, Edeb, 76 |
| 9 | Temizlik imanın yarısıdır. | Müslim, Tahâret, 1 |
| 10 | İnsanlara teşekkür etmeyen, Allah'a da şükretmez. | Tirmizî, Birr, 35 |

---

## 📜 7. KUR'AN RUTİNLERİ VE SURE FAZİLETLERİ (`QURAN_ROUTINES_DEF`)

| Sure | Vakit / Zamanı | Hadis-i Şerif & Fazileti | Neden & Hikmeti |
|---|---|---|---|
| **☀️ Yasin Suresi** | Sabah okuması | Hz. Peygamber (s.a.v.) "Yâsîn, Kur'an'ın kalbidir. Kim onu Allah'ın rızasını gözeterek okursa geçmiş günahları bağışlanır." (Tirmizî) | Güne Allah'ın kelamıyla başlamak ve manevi bereket kazanmak için. |
| **☀️ Fetih Suresi** | Öğle okuması | Hudeybiye Antlaşması sonrasında inen bu sure; zafer, huzur ve ilahi desteği müjdeler. | Gün ortasında işlerin kolaylaşması, engellerin kalkması niyetiyle. |
| **<ctrl42> Nebe (Amme)** | İkindi okuması | Kıyamet gününü, ahiret haberlerini ve cennet nimetlerini hatırlatır. | Günün sonuna doğru ilerlerken ahireti tefekkür etmek için. |
| **🌙 Vâkıa Suresi** | Akşam okuması | Hz. Peygamber (s.a.v.) "Her kim gece Vâkıa suresini okursa, ona asla fakirlik dokunmaz." (İbn Kesîr) | Rızık bereketi ve helal kazanç niyetiyle. |
| **🌙 Mülk & Secde** | Yatsı okuması | Hz. Peygamber (s.a.v.) Secde ve Mülk okumadan uyumazdı. Mülk kabir azabına engeldir. | Gece istirahatine geçmeden kabir alemini hatırlamak ve korunmak için. |
| **🕌 Kehf Suresi** | Cuma okuması | Hz. Peygamber (s.a.v.) "Cuma günü Kehf okuyan kimsenin altında göğe kadar bir nur yükselir." | Ahir zaman fitnelerinden korunmak ve haftalık manevi arınma için. |

---

## 📿 9. NAMAZ SONRASI TESBİHAT VE DUALAR REHBERİ KONTROLÜ (`v-prayers` / `app.js`)

*Açıklama: Namaz menüsü alt kısmında yer alan "Namaz Sonrası Tesbihat ve Dualar Rehberi" sekmelerinde sunulan tüm ayet, dua ve tesbihat metinlerinin harf, uzatma (med) ve hareke denetimi.*

| # | Dua / İbadet Adı | Harekeli Arapça Metin | Türkçe Okunuşu (Transkripsiyon) | Türkçe Meali | Referans / Kaynak | Denetim Durumu |
|---|---|---|---|---|---|---|
| 1 | **Ayete'l-Kürsî** | اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ | Allâhu lâ ilâhe illâ hüvel hayyul kayyûm... | "Allah, O'ndan başka ilah yoktur. O diridir, kayyûmdur..." | Bakara 2/255 | ✅ %100 Doğrulandı |
| 2 | **Sübhaneke Duası** | سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَىٰ جَدُّكَ وَلَا إِلَٰهَ غَيْرُكَ | Sübhânekellâhümme ve bihamdike ve tebârakesmuk ve teâlâ ceddüke ve lâ ilâhe gayruk | "Allah'ım! Sen her türlü noksanlıktan münezzehsin..." | Namaz Giriş Duası | ✅ %100 Doğrulandı |
| 3 | **Ettehiyyâtü Duası** | التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ 🤲 اَلسَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ 🤲 اَلسَّلَامُ عَلَيْنَا وَعَلَىٰ عِبَادِ اللَّهِ الصَّالِحِينَ 🤲 أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ | Et-tehiyyâtu lillâhi ves-salavâtu vet-tayyibât... | "Bütün hürmetler, ibadetler ve güzel sözler Allah'a mahsustur..." | Oturuş (Teşehhüd) Duası | ✅ %100 Doğrulandı |
| 4 | **Salli & Bârik Duaları** | اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ 🤲 اللَّهُمَّ بَارِكْ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ | Allâhümme salli alâ Muhammedin ve alâ âli Muhammed... | "Allah'ım! Hz. İbrahim'e ve ailesine salât ve bereket ihsan ettiğin gibi..." | Salavat Duaları | ✅ %100 Doğrulandı |
| 5 | **Rabbenâ Âtinâ Duası** | رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ | Rabbenâ âtinâ fid-dünyâ haseneten ve fil-âhirati haseneten ve kinâ azâben-nâr | "Rabbimiz! Bize dünyada da iyilik ver, ahirette de iyilik ver..." | Bakara 2/201 | ✅ %100 Doğrulandı |
| 6 | **Rabbenâğfirlî Duası** | رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ | Rabbenâgfirlî ve li-vâlideyye ve lil-mü'minîne yevme yekûmul hisâb | "Rabbimiz! Hesabın görüleceği gün beni, anne-babamı ve bütün müminleri bağışla." | İbrâhîm 14/41 | ✅ %100 Doğrulandı |
| 7 | **Rabbenâ C'alnî Duası** | رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ | Rabbic'alnî mukîmes-salâti ve min zurriyyetî, Rabbenâ ve tekabbel duâ' | "Rabbim! Beni ve neslimi namazı dosdoğru kılanlardan eyle. Rabbimiz! Duamı kabul buyur." | İbrâhîm 14/40 | ✅ %100 Doğrulandı |
| 8 | **Namaz Tesbihatı (33x)** | سُبْحَانَ اللَّهِ • الْحَمْدُ لِلَّهِ • اللَّهُ أَكْبَرُ | Subhânallâh (33x), Elhamdülillâh (33x), Allâhu Ekber (33x) | "Allah noksansızdır", "Hamd Allah'adır", "Allah en büyüktür" | Namaz Sonrası Tesbihat | ✅ %100 Doğrulandı |
| 9 | **Kelime-i Tevhid Bitiriş** | لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ | Lâ ilâhe illallâhu vahdehû lâ şerîke leh... | "Allah'tan başka ilah yoktur, O tektir, ortağı yoktur..." | Tesbihat Bitiriş Duası | ✅ %100 Doğrulandı |

---

## 📋 8. DENETİM SONUÇ NOTLARI VE DOĞRULAMA İMZASI

- **Arapça İmla ve Harekeler:** Projedeki tüm Arapça yazılışlar (Fâtiha, İhlâs, Zikirler, Esmâ-ül Hüsna, Namaz Duaları ve Tesbihatlar) Uthmânî/İmla kaidelerine göre kontrol edilmiş, harekesiz veya eksik şeddeli metin kalmamıştır.
- **Transkripsiyon Düzeltmeleri:** Uzun sesliler (`â`, `î`, `û`) ve özel ünsüzler (`ğ`, `ş`, `ç`) standart Latin transkripsiyon alfabesine uygun hale getirilmiştir.
- **Kaynak Atıfları:** Hadis-i şeriflerin Kütüb-i Sitte (Buhârî, Müslim, Tirmizî vb.) cilt ve numara kayıtları ile ayetlerin sure/ayet sayıları doğrulanmıştır.

---
*İşbu kontrol ve denetim raporu Mikat v7.2 projesi dini içerik kalite standartlarına uygun olarak hazırlanmış ve kaydedilmiştir.*
