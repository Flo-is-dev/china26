/**
 * data.js — Source unique des données du voyage.
 *
 * Chaque ville et activité porte un `wikiTitle` (article en.wikipedia.org)
 * utilisé par `images.js` pour récupérer une vignette via la REST API
 * Wikipedia. Quand un lieu n'a pas d'article propre, le titre retombe sur
 * celui de la ville → la vignette de la ville sert d'illustration.
 *
 * Champs additionnels par lieu :
 *  - `cercle` : 1 (Centre) → 4 (Excursion journée). Sert au code couleur
 *    et à l'icône radar de distance dans la liste « Tous les lieux ».
 *  - `tags`   : étiquettes thématiques (unesco, tradition, modern, nature,
 *    food, show, night, temple, shopping, cable, photo, view, panda).
 *    Rendues en SVG par `panel.js` (cf. TAG_ICONS).
 *  - `conseil` : texte multi-ligne (séparateur \n), affiché avec
 *    `white-space: pre-line` ; ton pratique + second degré.
 */

export const tripData = {
    tripInfo: {
        title: "Chine : Un Voyage à travers l'Histoire et la Modernité",
        duration: "12 Jours",
        cities: ["Chengdu", "Chongqing", "Zhangjiajie", "Pékin"],
    },
    itineraireData: [
        {
            ville: "Chengdu",
            pinyin: "四川 - Chéngdū",
            couleur: "#2ecc71",
            wikiTitle: "Chengdu",
            masterListe: [
                {
                    id: 1,
                    nom: "Panda Base",
                    pinyin: "大熊猫繁育研究基地",
                    zone: "Cercle III (Excursion)",
                    cercle: 3,
                    temps: "45-60 min (Taxi/Métro+Bus)",
                    note: 10,
                    incontournable: true,
                    tags: ["panda", "nature", "photo"],
                    conseil:
                        "Ouverture à 7h30 pile, et pas une minute plus tard sous peine de pandas comateux.\n" +
                        "Dès 9h, ils auront décidé que la sieste est leur discipline olympique principale.\n" +
                        "Plus de 100 pensionnaires, dont une nursery où les bébés tiennent dans une paume.\n" +
                        "Entrée 55 yuans : moins cher qu'un café parisien pour un site classé UNESCO.\n" +
                        "Métro L3 jusqu'à Panda Avenue, puis bus 198 ou taxi (45 min depuis le centre).\n" +
                        "Évitez le week-end : la Chine entière y débarque avec marmaille en bandoulière.\n" +
                        "Prévoyez 3 heures minimum — vous ressortirez à reculons, vaguement émus.\n" +
                        "Bambous gratuits pour les pandas, peluches non remboursables pour vous.\n" +
                        "Les pandas roux du même parc sont plus actifs et tout aussi photogéniques.\n" +
                        "N'achetez pas le t-shirt « I love panda » — vous le mettrez, c'est dit.",
                    wikiTitle: "Chengdu_Research_Base_of_Giant_Panda_Breeding",
                },
                {
                    id: 2,
                    nom: "People's Park",
                    pinyin: "人民公园",
                    zone: "Cercle I (Centre)",
                    cercle: 1,
                    temps: "5 min (Métro L2)",
                    note: 10,
                    incontournable: true,
                    tags: ["tradition", "food"],
                    conseil:
                        "Le poumon civique de la ville : ici on vit, on flirte, on se marie par procuration.\n" +
                        "Le « marché aux mariages » : parents affichant leurs célibataires sur feuilles A4.\n" +
                        "Maison de thé Heming : 25 yuans la tasse, séjour illimité jusqu'à la nuit tombée.\n" +
                        "Massage d'oreilles au diapason (tuiyao) : 30 yuans, technique vieille de 600 ans.\n" +
                        "Nettoyage d'oreille à la plume inclus — sensations garanties, courage requis.\n" +
                        "Matin : taï-chi, danses, calligraphie à l'eau qui s'évapore en six minutes.\n" +
                        "Après-midi : mahjong à toute vitesse, opéra du Sichuan, philosophie au bord du lac.\n" +
                        "Balade en barque pour couples — les célibataires regardent en sirotant leur thé.\n" +
                        "Métro L2 station People's Park, sortie B : vous tombez littéralement dedans.\n" +
                        "Idéal pour comprendre que Chengdu vit à 0,7× la vitesse moyenne du pays.",
                    wikiTitle: "People%27s_Park_(Chengdu)",
                },
                {
                    id: 3,
                    nom: "Wenshu Yuan Monastery",
                    pinyin: "文殊院",
                    zone: "Cercle I (Centre)",
                    cercle: 1,
                    temps: "10 min (Métro L1)",
                    note: 10,
                    incontournable: true,
                    tags: ["temple", "tradition", "food"],
                    conseil:
                        "Seul temple bouddhiste encore actif à Chengdu, fondé sous les Tang en 605.\n" +
                        "Cinq pavillons, 300 statues, et des moines qui circulent vraiment — pas pour la photo.\n" +
                        "Restaurant végétarien attenant : la « viande » est en tofu mais y croit dur comme fer.\n" +
                        "80 yuans pour un banquet de huit plats imitant canard, porc et crevettes.\n" +
                        "Encens offert à l'entrée — un seul suffit, Bouddha n'aime pas les flambeurs.\n" +
                        "Salon de thé dans la cour intérieure : vapeur, calme et 15 yuans la théière.\n" +
                        "Métro L1 station Wenshu Monastery, sortie K : suivez l'odeur de jasmin.\n" +
                        "Quartier piéton autour avec papier rituel, librairies bouddhistes et nouilles.\n" +
                        "Ouvert 8h–17h, fermé le lundi — plan B : Daci si vous êtes déjà dans le coin.\n" +
                        "Tenue correcte exigée : le débardeur orange déclenchera un froncement monastique.",
                    wikiTitle: "Wenshu_Monastery",
                },
                {
                    id: 4,
                    nom: "Kuanzhai Alley",
                    pinyin: "宽窄巷子",
                    zone: "Cercle I (Centre)",
                    cercle: 1,
                    temps: "15 min (Métro L4)",
                    note: 9,
                    incontournable: false,
                    tags: ["tradition", "food", "shopping"],
                    conseil:
                        "Trois ruelles parallèles : « large », « étroite » et « la troisième » (vraiment).\n" +
                        "Architecture qing reconstituée — donc moitié authentique, moitié décor de cinéma.\n" +
                        "Très touristique mais incontournable pour la street food et les photos.\n" +
                        "Goûtez le danhong gao (gâteau brioché) et les nouilles dandan en marchant.\n" +
                        "Théiers traditionnels au long bec — cracheurs de feu inclus le soir venu.\n" +
                        "Évitez les boutiques « souvenirs » à 50 yuans — même panda, autre stand.\n" +
                        "Métro L4 station Kuanzhai Alley, sortie B : vous y êtes littéralement.\n" +
                        "Mieux à 9h ou après 21h — entre les deux, vous photographierez des nuques.\n" +
                        "Un Starbucks niché dans une cour qing — la Chine de 2026 résumée en un latte.\n" +
                        "Retour le soir pour les lanternes et les hutongs apaisés à la nuit tombée.",
                    wikiTitle: "Kuanzhai_Alley",
                },
                {
                    id: 5,
                    nom: "Daci Temple",
                    pinyin: "大慈寺",
                    zone: "Cercle I (Centre)",
                    cercle: 1,
                    temps: "10 min (Métro L2/L3)",
                    note: 8,
                    incontournable: false,
                    tags: ["temple", "modern", "shopping"],
                    conseil:
                        "Temple bouddhiste fondé sous les Tang, restauré, coincé entre deux Apple Stores.\n" +
                        "Le contraste résume Chengdu : 1 200 ans d'encens à côté du dernier iPhone.\n" +
                        "Entrée gratuite — une rareté en Chine pour un site historique de cette envergure.\n" +
                        "Xuanzang y a séjourné avant son voyage en Inde, immortalisé en Voyage en Occident.\n" +
                        "Taikoo Li juste à côté : luxe, parfait pour un thé puis un Gucci dans la foulée.\n" +
                        "À 17h, les bonzes chantent les sutras pendant que Louis Vuitton ferme ses portes.\n" +
                        "Photo culte : la pagode rouge avec un panneau publicitaire en arrière-plan.\n" +
                        "Métro L2/L3 station Chunxi Road, 5 min à pied, sortie I conseillée.\n" +
                        "Moins peuplé que Wenshu, plus authentique dans l'expérience spirituelle.\n" +
                        "Fermé à 21h, mais l'esplanade reste ouverte pour photographier les lanternes.",
                    wikiTitle: "Daci_Temple",
                },
                {
                    id: 6,
                    nom: "Anshun Bridge",
                    pinyin: "安顺廊桥",
                    zone: "Cercle I (Centre)",
                    cercle: 1,
                    temps: "15-20 min (Métro/Taxi)",
                    note: 8,
                    incontournable: false,
                    tags: ["tradition", "night", "photo"],
                    conseil:
                        "Pont couvert reconstruit en 2003 sur l'emplacement d'un original Yuan (1746).\n" +
                        "Ses lanternes rouges illuminent la rivière Jin et donnent un air de Hayao Miyazaki.\n" +
                        "Mieux après 19h30 : avant, c'est juste un pont. Après, c'est de la magie pure.\n" +
                        "Restaurant Lan Kwai Fong à l'étage : cuisine sichuanaise face à la rivière.\n" +
                        "Les mariés viennent y faire des photos — comptez 5 couples par soirée d'été.\n" +
                        "Métro L3 station East Gate Avenue, sortie A : 5 min à pied vers le nord-ouest.\n" +
                        "Gratuit, sauf si vous mangez à l'étage (300+ yuans pour deux personnes).\n" +
                        "Riveraine côté nord : terrasses-bar avec DJ et vue directe sur les lanternes.\n" +
                        "La rivière Jin sépare le centre historique du quartier branché de Jiuyanqiao.\n" +
                        "À combiner avec une promenade jusqu'à Jiuyanqiao Bar Street, 15 min à l'est.",
                    wikiTitle: "Anshun_Bridge",
                },
                {
                    id: 7,
                    nom: "Jiuyanqiao Bar Street",
                    pinyin: "九眼桥",
                    zone: "Cercle I (Centre)",
                    cercle: 1,
                    temps: "20 min",
                    note: 8,
                    incontournable: false,
                    tags: ["night", "food"],
                    conseil:
                        "« Pont aux Neuf Yeux » — 250 mètres de bars alignés le long de la rivière.\n" +
                        "Le Pigalle de Chengdu en plus rouge : néons, karaokés, Tsingtao à 25 yuans.\n" +
                        "Le plus animé : Lan Kwai Fong (côté pont Anshun), DJ et cocktails à 60 yuans.\n" +
                        "Le plus authentique : les bars locaux où le mahjong remplace le billard.\n" +
                        "Les étudiants de l'université du Sichuan viennent ici fuir la bibliothèque.\n" +
                        "Promenade en bord de rivière — gratuite, romantique, mégottée aux heures tardives.\n" +
                        "Évitez les rabatteurs proposant « girls bar » : c'est exactement ce que vous craignez.\n" +
                        "Le baijiu local à 50° vous fera regretter d'avoir essayé, le matin venu.\n" +
                        "Dernier métro L3 à 23h30 — au-delà, taxi Didi à 25 yuans pour le centre.\n" +
                        "Le matin c'est mort. Le soir, mini-Bangkok au bord d'une rivière chinoise.",
                    wikiTitle: "Chengdu",
                },
                {
                    id: 8,
                    nom: "Spectacle Traditionnel",
                    pinyin: "蜀风雅韵",
                    zone: "Cercle I (Centre)",
                    cercle: 1,
                    temps: "15-20 min",
                    note: 8,
                    incontournable: false,
                    tags: ["show", "tradition"],
                    conseil:
                        "Opéra du Sichuan : 90 minutes de cracheurs de feu, marionnettes et acrobates.\n" +
                        "Le clou du show : « Bian Lian », le changement de visage en 1/4 de seconde.\n" +
                        "Personne ne sait comment ils font — c'est un secret d'État, littéralement.\n" +
                        "Thé sichuanais servi pendant le spectacle : tasse à long bec, virtuosité comprise.\n" +
                        "Le nettoyage d'oreilles est aussi possible pendant — option exotique à tester.\n" +
                        "Shufeng Yayun Theatre : la salle la plus authentique, dans le parc Wenhua.\n" +
                        "Prix : 180 yuans en 1ère catégorie, billet à acheter sur Klook ou WeChat.\n" +
                        "Début à 20h, durée 1h30 — sortez à temps pour un dîner tardif vers 22h.\n" +
                        "Les touristes occidentaux sont placés devant — pas un avantage, ils transpirent.\n" +
                        "Évitez la version « tourist hotel » : moitié prix, dixième de la qualité.",
                    wikiTitle: "Sichuan_opera",
                },
                {
                    id: 9,
                    nom: "Yulin District",
                    pinyin: "玉林社区",
                    zone: "Cercle II (Proche)",
                    cercle: 2,
                    temps: "20 min (Métro L3)",
                    note: 8,
                    incontournable: false,
                    tags: ["food", "night"],
                    conseil:
                        "Le vieux Chengdu authentique — pas reconstruit, juste vieux pour de bon.\n" +
                        "Ruelles arborées, immeubles des années 80, restos où le menu est en chinois.\n" +
                        "Food street idéale : Yulin Lu, où les locaux mangent debout sur la chaussée.\n" +
                        "Plats à essayer : mapo tofu, chicken with red oil, hot pot familial.\n" +
                        "Comptez 50 yuans pour un repas complet — moins cher que tout le reste de la ville.\n" +
                        "Les bars Sichuan craft beer ont ouvert ici — mélange improbable mais réussi.\n" +
                        "Métro L3 station Yulin, sortie B : tournez à droite et tombez dans la fosse.\n" +
                        "Fraternité du quartier : grands-mères en pyjama et hipsters en flat cap voisinent.\n" +
                        "Idéal pour comprendre que Chengdu n'est pas qu'un parc à thème panda.\n" +
                        "Fermé tôt (22h pour les restos) — venez avant 21h sinon le hot pot vous filera.",
                    wikiTitle: "Chengdu",
                },
                {
                    id: 10,
                    nom: "Eastern Suburb Memory",
                    pinyin: "东郊记忆",
                    zone: "Cercle II (Proche)",
                    cercle: 2,
                    temps: "30-45 min (Taxi/Métro)",
                    note: 8,
                    incontournable: false,
                    tags: ["modern", "photo", "shopping"],
                    conseil:
                        "Ancienne usine d'électronique soviétique reconvertie en quartier créatif.\n" +
                        "Briques rouges, cheminées, peintures murales, et beaucoup, beaucoup de cafés.\n" +
                        "Galerie d'art contemporain avec entrée gratuite la plupart du temps.\n" +
                        "Magasins de design indépendants — vinyles, mode locale, librairies underground.\n" +
                        "Mariés et influenceurs s'y bousculent pour les photos « industrial chic ».\n" +
                        "Concerts du week-end plutôt rock, parfois électro, jamais pop chinoise mainstream.\n" +
                        "Métro L4 station Lijiawan, sortie B : 10 min de marche vers l'est.\n" +
                        "Resto-bars sur les anciennes voies ferrées — burger à 80 yuans, ambiance Brooklyn.\n" +
                        "L'endroit où Chengdu prouve qu'elle a une scène alternative qu'on ne soupçonne pas.\n" +
                        "Fermé le lundi, sinon 10h–22h — prévoyez 2-3 heures sur place.",
                    wikiTitle: "Chengdu",
                },
                {
                    id: 11,
                    nom: "Quartier Tech",
                    pinyin: "科技商业区",
                    zone: "Cercle I/II (Centre/Proche)",
                    cercle: 2,
                    temps: "10-20 min",
                    note: 8,
                    incontournable: false,
                    tags: ["modern", "shopping"],
                    conseil:
                        "Concentration de flagships : Huawei, Xiaomi, BYD, OPPO, Vivo, tous voisins.\n" +
                        "Taikoo Li : centre commercial luxe avec architecture qing modernisée.\n" +
                        "Chunxi Road : zone piétonne, néons, foule, exactement la Chine du 21e siècle.\n" +
                        "Le flagship Huawei est un musée de la technologie — entrée gratuite, démos sur place.\n" +
                        "Xiaomi laisse tester drones, robots et trottinettes pendant 30 min sans pression.\n" +
                        "BYD a un showroom de voitures électriques où on peut s'asseoir au volant.\n" +
                        "À 19h, les écrans LED géants diffusent des publicités holographiques en façade.\n" +
                        "Métro L2/L3 station Chunxi Road, sortie I — vous arrivez au cœur du chaos.\n" +
                        "Cafés panoramiques aux étages supérieurs — Starbucks Reserve à 80 yuans la tasse.\n" +
                        "Le samedi soir, comptez 200 000 personnes — on respire entre deux selfies.",
                    wikiTitle: "Taikoo_Li_Chengdu",
                },
                {
                    id: 12,
                    nom: "Luodai Ancient Town",
                    pinyin: "洛带古镇",
                    zone: "Cercle IV (Excursion Journée)",
                    cercle: 4,
                    temps: "1h-1h30 (Taxi/Bus)",
                    note: 9,
                    incontournable: false,
                    tags: ["tradition", "food"],
                    conseil:
                        "Village Hakka conservé à 30 km à l'est de Chengdu, fondé sous les Han.\n" +
                        "Architecture circulaire « tulou » unique en Chine continentale (généralement Fujian).\n" +
                        "Quatre clans Hakka y ont leur Guildhall, chacun avec son propre style architectural.\n" +
                        "Très peu touristique — vous croiserez plus de poules que d'Occidentaux.\n" +
                        "Goûtez les nouilles Hakka et le porc braisé — recettes vieilles de 400 ans.\n" +
                        "Opéra Hakka chaque dimanche après-midi sur la place du temple — gratuit.\n" +
                        "Taxi 80 yuans depuis le centre (1h), bus 219 depuis Wugui (1h30).\n" +
                        "Idéal en demi-journée pour fuir la foule du centre-ville et respirer.\n" +
                        "Les maisons sont encore habitées — respectez les linges qui sèchent.\n" +
                        "Fermez bien les portes des maisons-musées : il y a des chats qui s'évadent.",
                    wikiTitle: "Luodai",
                },
                {
                    id: 13,
                    nom: "Mount Qingcheng",
                    pinyin: "青城山",
                    zone: "Cercle IV (Excursion Journée)",
                    cercle: 4,
                    temps: "2h-2h30 (Métro+TGV)",
                    note: 10,
                    incontournable: true,
                    tags: ["unesco", "temple", "nature", "cable"],
                    conseil:
                        "Berceau du Taoïsme chinois, classé UNESCO, 36 sommets, 72 grottes au compteur.\n" +
                        "Laozi y aurait médité — ou pas, mais l'argument marketing reste imparable.\n" +
                        "Deux versants : Qingcheng avant (touristique, temples) et arrière (sauvage).\n" +
                        "Téléphérique pour le sommet : 60 yuans, 10 minutes, vue à couper le souffle.\n" +
                        "Temple Shangqing au sommet : moines taoïstes, encens millénaire, calme cosmique.\n" +
                        "Thé puerh servi dans des pavillons accrochés à la falaise — 50 yuans la théière.\n" +
                        "TGV depuis Chengdu : 35 min, station Qingchengshan, puis bus jusqu'à l'entrée.\n" +
                        "Entrée 90 yuans — réservez sur WeChat 3 jours avant le week-end estival.\n" +
                        "Prévoyez 6h sur place pour boucler les deux temples principaux et redescendre.\n" +
                        "Le pèlerinage à pied : 1 200 marches qui transforment vos mollets en bois dur.",
                    wikiTitle: "Mount_Qingcheng",
                },
            ],
            conseilsLogistiques: [
                "Utilisez le Métro pour les Cercles I et II.",
                "Prenez un Taxi tôt (7h) pour la Panda Base (Cercle III).",
                "Réservez les billets TGV pour QingchengShan plusieurs jours à l'avance.",
            ],
        },
        {
            ville: "Chongqing",
            pinyin: "重庆 - Chóngqìng",
            couleur: "#e74c3c",
            wikiTitle: "Chongqing",
            masterListe: [
                {
                    id: 1,
                    nom: "Hongyadong",
                    pinyin: "洪崖洞",
                    zone: "Cercle I (Centre)",
                    cercle: 1,
                    temps: "10 min (Marche)",
                    note: 10,
                    incontournable: true,
                    tags: ["night", "tradition", "photo"],
                    conseil:
                        "11 étages de boutiques empilés sur la falaise, façade en bois Tujia traditionnel.\n" +
                        "Voyage de Chihiro grandeur nature — sauf qu'ici on paie en WeChat Pay.\n" +
                        "Illuminé à 19h pile : courez, sinon le 1er à arriver photographie un mur noir.\n" +
                        "Le meilleur point de vue : pont Qiansimen côté nord, gratuit, panoramique.\n" +
                        "À l'intérieur : food court moyen, boutiques de souvenirs identiques partout.\n" +
                        "L'expérience est extérieure — entrez juste pour le hot pot du 4e étage si vraiment.\n" +
                        "Des ascenseurs gratuits relient les niveaux — les escaliers le sont aussi.\n" +
                        "Métro L1 station Xiaoshizi, sortie 4 : 5 min de marche jusqu'au fleuve.\n" +
                        "Foule monstre en été : 1h pour la photo, 2h pour la patience qui s'effrite.\n" +
                        "Descente vers le quai par escalator gratuit côté est — 7 niveaux d'un coup.",
                    wikiTitle: "Hongya_Cave",
                },
                {
                    id: 2,
                    nom: "Liziba Station",
                    pinyin: "李子坝",
                    zone: "Cercle II (Proche)",
                    cercle: 2,
                    temps: "20 min (Métro L2 Direct)",
                    note: 10,
                    incontournable: true,
                    tags: ["modern", "photo"],
                    conseil:
                        "Le métro qui traverse un immeuble — pas une légende urbaine, une réalité physique.\n" +
                        "Ligne L2, station au 6e étage d'un immeuble résidentiel construit avant le métro.\n" +
                        "Les habitants des étages 5 à 8 entendent les rames toutes les 4 minutes.\n" +
                        "Les rames sortent à 17 km/h — assez lent pour la photo, assez rapide pour effrayer.\n" +
                        "Descendez à la station, prenez le pont en face : la photo cliché vous attend.\n" +
                        "Meilleur créneau : 8h-10h ou 18h-20h, lumière rasante sur le béton et l'arbre.\n" +
                        "L'arbre devant l'immeuble est devenu une icône — surnom : « l'arbre Liziba ».\n" +
                        "Gratuit puisque dans le métro normal — billet 2 yuans, regard public 0 yuan.\n" +
                        "Une plateforme d'observation officielle a été construite côté ouest en 2020.\n" +
                        "Les Chinois s'amusent autant que les touristes — c'est universellement bizarre.",
                    wikiTitle: "Liziba_station",
                },
                {
                    id: 3,
                    nom: "Xiao Pi Cha Guan (Jiaotong)",
                    pinyin: "交通茶馆",
                    zone: "Cercle II (Proche)",
                    cercle: 2,
                    temps: "25-30 min (Taxi conseillé)",
                    note: 10,
                    incontournable: true,
                    tags: ["tradition", "food"],
                    conseil:
                        "Le salon de thé le plus brut de Chongqing — ouvert depuis les années 1940.\n" +
                        "Tabourets en bois, fumée d'opium d'autrefois remplacée par celle des cigarettes.\n" +
                        "Thé à 12 yuans la grosse théière — restez 6 heures, on vous oubliera tranquillement.\n" +
                        "Mahjong assourdissant, vieux qui crient, chats qui dorment sur les tables.\n" +
                        "L'endroit a été repeint pour un film — on a refait peindre en sale après pour l'âme.\n" +
                        "Venez l'après-midi pour l'ambiance, jamais le matin (vide) ni le soir (fermé).\n" +
                        "Pas de menu, pas de wifi, pas d'anglais — tendez 12 yuans et asseyez-vous.\n" +
                        "Métro L2 station Huangjueping, puis taxi 5 min ou marche 15 min en montée.\n" +
                        "Le lieu est aussi une institution culturelle — préservé par la municipalité.\n" +
                        "Ne demandez pas de carte bleue, ni d'eau plate, ni de rallonge USB — c'est non.",
                    wikiTitle: "Chongqing",
                },
                {
                    id: 4,
                    nom: "Jiefangbei & WFC",
                    pinyin: "解放碑 / WFC",
                    zone: "Cercle I (Centre)",
                    cercle: 1,
                    temps: "0-5 min",
                    note: 9,
                    incontournable: true,
                    tags: ["modern", "view", "shopping"],
                    conseil:
                        "Jiefangbei : « Monument de la Libération », tour de 27 m construite en 1947.\n" +
                        "Aujourd'hui noyée sous des gratte-ciel de 300 m — David vs Goliath urbain.\n" +
                        "Le centre commercial WFC fait 339 m, observation au 73e étage à 100 yuans.\n" +
                        "Vue circulaire à 360° sur les fleuves Yangzi et Jialing qui se rejoignent.\n" +
                        "Mieux au crépuscule (18h-19h en été) pour la transition jour/nuit.\n" +
                        "Au sol : zone piétonne énorme, plus animée que les Champs-Élysées un samedi.\n" +
                        "Métro L1/L2 station Jiaochangkou, sortie 7B — vous tombez sur le monument.\n" +
                        "WFC observation deck : billet sur Trip.com ou Klook, évite la queue à la caisse.\n" +
                        "Cafés panoramiques aux étages 60-72 si vous voulez la vue sans payer le deck.\n" +
                        "Évitez la pluie : le sommet est dans les nuages 1 jour sur 3 en saison humide.",
                    wikiTitle: "Jiefangbei_CBD",
                },
                {
                    id: 5,
                    nom: "Yangtze Cableway",
                    pinyin: "长江索道",
                    zone: "Cercle I (Centre)",
                    cercle: 1,
                    temps: "15 min (Métro Xiaoshizi)",
                    note: 9,
                    incontournable: true,
                    tags: ["cable", "view"],
                    conseil:
                        "Téléphérique vintage de 1987 traversant le Yangzi, 1 166 m en 4 minutes.\n" +
                        "Cabines rouges et blanches kitsch — les transports en commun version 1985.\n" +
                        "Prix : 30 yuans aller simple, 50 yuans aller-retour, billet sur place ou WeChat.\n" +
                        "File d'attente le week-end : 1h-2h. Réservez créneau matinal sur WeChat (mini-app).\n" +
                        "Vue panoramique sur les gratte-ciel de Yuzhong et le brouillard du fleuve.\n" +
                        "Deux stations : Xinhua Road (côté Yuzhong) et Shangxin Road (côté Nan'an).\n" +
                        "Métro L1/L6 station Xiaoshizi, sortie 8 : 5 min jusqu'à la station Xinhua.\n" +
                        "Le symbole de Chongqing avant Hongyadong — encore préféré par les locaux.\n" +
                        "L'autre rive (Nan'an) est moins touristique — restos chuandong à prix locaux.\n" +
                        "Fonctionne 7h30-22h, fermé exceptionnellement par tempête (rare en juillet).",
                    wikiTitle: "Yangtze_River_Cableway",
                },
                {
                    id: 6,
                    nom: "Spectacle Chongqing 1949",
                    pinyin: "重慶 1949 演出",
                    zone: "Cercle III (Excursion Demi-Journée)",
                    cercle: 3,
                    temps: "60-75 min (Métro+Taxi court)",
                    note: 10,
                    incontournable: true,
                    tags: ["show"],
                    conseil:
                        "Spectacle immersif sur la Chine de la Libération — 70 acteurs, scénographie folle.\n" +
                        "La scène elle-même est mobile : tournante, montante, descendante, parfois en feu.\n" +
                        "Durée 90 minutes, dialogues en chinois mais sous-titres anglais sur écran latéral.\n" +
                        "Théâtre Magical Theater à Liangjiang, 30 min taxi ou métro depuis le centre.\n" +
                        "Billetterie sur Trip.com : 220-450 yuans selon catégorie, 7 jours à l'avance.\n" +
                        "Ne convient pas aux moins de 8 ans — explosions, ambiance dramatique soutenue.\n" +
                        "Le directeur Zhang Yimou (cérémonie d'ouverture JO 2008) a inspiré le projet.\n" +
                        "Deux représentations par jour : 14h30 et 19h30, complet le week-end estival.\n" +
                        "Émotion pure même sans comprendre le chinois — vous pleurerez à la fin, c'est dit.\n" +
                        "Le meilleur spectacle live de Chine continentale, juste devant Impression Lijiang.",
                    wikiTitle: "Chongqing",
                },
                {
                    id: 7,
                    nom: "Shibati",
                    pinyin: "十八梯",
                    zone: "Cercle II (Proche)",
                    cercle: 2,
                    temps: "15 min (Métro Jiaochangkou)",
                    note: 9,
                    incontournable: false,
                    tags: ["tradition", "night", "food"],
                    conseil:
                        "« 18 marches » — quartier détruit en 2017, reconstruit en 2022 façon « ancien neuf ».\n" +
                        "Reproduction fidèle du Chongqing populaire des années 30 — sauf le wifi gratuit.\n" +
                        "300 boutiques, 60 restaurants, 20 cafés — version Disneyland du vieux quartier.\n" +
                        "Magnifique le soir avec lanternes rouges et vapeurs des soupes Sichuan.\n" +
                        "Goûtez les xiaomian (nouilles épicées à 12 yuans) — institution chongqingoise.\n" +
                        "Métro L1 station Jiaochangkou, sortie 8 : 5 min de marche vers l'est.\n" +
                        "Montée raide depuis le bas — comptez 15 min de marche pour atteindre le haut.\n" +
                        "Mieux le mercredi-jeudi soir, foule contenue, ambiance encore agréable.\n" +
                        "Les anciens résidents relogés viennent parfois voir leur ancien quartier — émouvant.\n" +
                        "Le vrai Shibati n'existe plus — celui-ci est plus propre, mais l'âme s'est échappée.",
                    wikiTitle: "Chongqing",
                },
                {
                    id: 8,
                    nom: "Mountain City Alley",
                    pinyin: "山城步道",
                    zone: "Cercle II (Proche)",
                    cercle: 2,
                    temps: "20 min (Métro Qixinggang)",
                    note: 9,
                    incontournable: false,
                    tags: ["tradition", "view", "photo"],
                    conseil:
                        "Sentier piéton de 1,5 km à flanc de falaise — l'authentique Chongqing préservé.\n" +
                        "Passe par 4 villages historiques, terrasses, escaliers, et vues sur le Yangzi.\n" +
                        "Les maisons accrochées à la falaise datent des années 30 et tiennent par miracle.\n" +
                        "Section la plus pittoresque : entre Qixinggang et Hongyadong (40 min de marche).\n" +
                        "Vu d'en bas : un mille-feuille architectural impossible à expliquer aux Européens.\n" +
                        "Fumée des cuisines familiales, linge qui sèche, conversations qui résonnent.\n" +
                        "Métro L1 station Qixinggang, sortie 1 : entrée du sentier face à la sortie.\n" +
                        "Gratuit, ouvert 24h/24, balade idéale au coucher du soleil ou à l'aube.\n" +
                        "Quelques cafés-bars apparaissent sur le tracé — terrasses-falaise, 50 yuans le café.\n" +
                        "Évitez la pluie — escaliers glissants, pas de garde-corps, pas Européen-friendly.",
                    wikiTitle: "Chongqing",
                },
                {
                    id: 9,
                    nom: "Ciqikou",
                    pinyin: "磁器口",
                    zone: "Cercle II (Proche)",
                    cercle: 2,
                    temps: "45-55 min (Métro L1 Direct)",
                    note: 9,
                    incontournable: false,
                    tags: ["tradition", "food", "shopping"],
                    conseil:
                        "Vieille ville préservée des Ming, célèbre pour la porcelaine (« cizi » = porcelaine).\n" +
                        "Maintenant : street food, souvenirs, et une foule qui justifie la moitié des restos.\n" +
                        "Maocai (hot pot solo) à 35 yuans — version Chongqing du fast food traditionnel.\n" +
                        "Goûter le qicengao (gâteau aux 7 couches) chez la grand-mère officielle, queue 30 min.\n" +
                        "Théiers traditionnels en bord du Jialing — calme miraculeux à 50 m de la foule.\n" +
                        "Métro L1 station Ciqikou, sortie 1A : 5 min de marche vers le fleuve.\n" +
                        "Visite 2-3h, idéale en demi-journée. Plus calme avant 11h ou après 19h.\n" +
                        "Ne ratez pas le « pont des amoureux » côté est — petite passerelle photogénique.\n" +
                        "Les guides en costume Ming sont des étudiants — sympas mais pas docteurs en histoire.\n" +
                        "Évitez le week-end : 80 000 visiteurs/jour selon les comptages municipaux.",
                    wikiTitle: "Ciqikou",
                },
                {
                    id: 10,
                    nom: "Kuixinglou",
                    pinyin: "魁星楼",
                    zone: "Cercle I (Centre)",
                    cercle: 1,
                    temps: "10 min",
                    note: 8,
                    incontournable: false,
                    tags: ["modern", "photo"],
                    conseil:
                        "L'immeuble qui a 22 étages côté nord et 0 côté sud — Chongqing en miniature.\n" +
                        "Entrée principale au « rez-de-chaussée » du 22e étage, sortie 22 étages plus bas.\n" +
                        "Magie urbanistique pure : escaliers + ascenseurs négocient avec la topographie.\n" +
                        "Le café au sommet (côté nord) : terrasse vue Yangzi à 80 yuans la boisson.\n" +
                        "Personne n'habite ici — c'est essentiellement un immeuble photogénique.\n" +
                        "Métro L6 station Datansi, sortie 4 : 5 min de marche vers l'est.\n" +
                        "Gratuit, ouvert 24h/24 sauf le café (8h-22h).\n" +
                        "Une énigme architecturale qui se comprend mieux en montant qu'en lisant Wikipedia.\n" +
                        "Les panneaux signalent « 1F » au 22e étage — vous prendrez 4 photos minimum.\n" +
                        "Combo idéal avec le téléphérique Yangzi : même secteur, 15 min de marche.",
                    wikiTitle: "Chongqing",
                },
                {
                    id: 11,
                    nom: "Quartier Tech",
                    pinyin: "科技商业区",
                    zone: "Cercle I (Centre)",
                    cercle: 1,
                    temps: "10 min",
                    note: 8,
                    incontournable: false,
                    tags: ["modern", "shopping"],
                    conseil:
                        "Concentré à Jiefangbei : Huawei flagship 2 étages, Xiaomi, OPPO, Vivo, BYD.\n" +
                        "Le Huawei store fait office de musée du smartphone — entrée gratuite.\n" +
                        "Xiaomi laisse tester robots aspirateurs, drones et trottinettes pendant 30 min.\n" +
                        "BYD montre ses voitures électriques — 200 000 yuans pour la version d'entrée.\n" +
                        "Plus dense qu'à Chengdu : tout est concentré sur 600 m de Min Quan Road.\n" +
                        "Les vendeurs parlent un anglais fonctionnel mais préfèrent vendre en chinois.\n" +
                        "Métro L1/L2 station Jiaochangkou, sortie 7B : vous y êtes immédiatement.\n" +
                        "Les écrans LED des façades diffusent des publicités holographiques — Blade Runner garanti.\n" +
                        "Le samedi soir : 200 000 personnes circulent ici — claustrophobie possible.\n" +
                        "Idéal pour comprendre que la Chine de 2026 a 5 ans d'avance sur l'Europe en tech.",
                    wikiTitle: "Jiefangbei_CBD",
                },
                {
                    id: 12,
                    nom: "Minxin Jiayuan Night Market",
                    pinyin: "民心佳园夜市",
                    zone: "Cercle III (Excursion Demi-Journée)",
                    cercle: 3,
                    temps: "60-75 min (Métro L3/Taxi)",
                    note: 9,
                    incontournable: false,
                    tags: ["food", "night"],
                    conseil:
                        "Marché de nuit local, à des kilomètres des centres touristiques — l'authentique pur jus.\n" +
                        "1 km de stands street food : barbecues, hot pot solo, jianbing, baozi, brochettes.\n" +
                        "Prix locaux : repas complet à 30 yuans, bière à 5 yuans, atmosphère à 0 yuan.\n" +
                        "Se remplit à partir de 19h, peak vers 22h, ferme à 2h du matin.\n" +
                        "Goûtez les brochettes de tofu fermenté — odeur infernale, goût étonnamment subtil.\n" +
                        "Les photographes culinaires viennent ici, pas à Hongyadong — c'est dire.\n" +
                        "Métro L3 station Tongjiayuan, puis taxi 10 yuans (15 min) — pas de métro plus proche.\n" +
                        "Personne ne parle anglais — pointez du doigt et souriez, ça marche très bien.\n" +
                        "L'expérience la plus immersive de Chongqing — vous repartirez en sueur et heureux.\n" +
                        "Le genre d'endroit dont vous parlerez encore dans 10 ans à vos enfants.",
                    wikiTitle: "Chongqing",
                },
                {
                    id: 13,
                    nom: "Spots Dystopiques",
                    pinyin: "Cyberpunk Views",
                    zone: "Cercle I (Centre)",
                    cercle: 1,
                    temps: "5-15 min",
                    note: 9,
                    incontournable: false,
                    tags: ["modern", "night", "photo", "view"],
                    conseil:
                        "Chongqing entière est cyberpunk — voici les 5 spots à ne pas rater.\n" +
                        "Pont Qiansimen de nuit : Hongyadong illuminé, brouillard, néons sur le Yangzi.\n" +
                        "WFC observation deck : 339 m de panoramique, gratte-ciel à perte de vue.\n" +
                        "Liziba Station : métro qui traverse un immeuble (Blade Runner officiel).\n" +
                        "Rouhongqiao Bridge : double pont à 80 m, voitures + métro + piétons + bateaux.\n" +
                        "Les lumières de la ville se reflètent sur le brouillard naturel du Yangzi.\n" +
                        "Mieux entre 19h-21h : néons allumés, foule encore présente, météo idéale.\n" +
                        "Évitez les rares jours sans brouillard — la magie tombe à 70%.\n" +
                        "Les drones sont interdits dans le centre-ville — pas de prises aériennes possibles.\n" +
                        "Le meilleur jour : pluie fine, brouillard épais, néons rouges et bleus partout.",
                    wikiTitle: "Chongqing",
                },
            ],
            conseilsLogistiques: [
                "Chongqing est verticale : utilisez les ascenseurs publics pour éviter les marches.",
                "Le Métro L2 (aérien) est une attraction en soi avec des vues superbes.",
                "Réservez le Téléphérique (Yangtze Cableway) sur WeChat tôt le matin.",
            ],
        },
        {
            ville: "Zhangjiajie",
            pinyin: "张家界 - Zhāngjiājiè",
            couleur: "#3498db",
            wikiTitle: "Zhangjiajie",
            masterListe: [
                {
                    id: 1,
                    nom: "Tianmen Shan",
                    pinyin: "天门山",
                    zone: "Cercle IV (Excursion Journée)",
                    cercle: 4,
                    temps: "4-5h (sur place)",
                    note: 10,
                    incontournable: true,
                    tags: ["nature", "cable", "view"],
                    conseil:
                        "Montagne de 1 519 m surnommée « Porte du Ciel » — trou naturel de 130 m de haut.\n" +
                        "Téléphérique le plus long du monde : 7,5 km, 28 minutes, gratuit avec billet d'entrée.\n" +
                        "999 marches pour monter au trou — challenge physique, vue à pleurer en haut.\n" +
                        "Pour les feignants : escalator dans la montagne, 12 niveaux successifs.\n" +
                        "Passerelles de verre de 60 m suspendues à flanc de falaise — vertige garanti.\n" +
                        "Billet 258 yuans sur place, 235 yuans en réservant 1 jour avant via Trip.com.\n" +
                        "Prévoyez la journée entière : entrée 9h, sortie pas avant 16h, brouillard inclus.\n" +
                        "Taxi du centre 30 min, télécabine ouvre 7h30, dernière entrée à 17h.\n" +
                        "Évitez les jours pluvieux — la montagne est dans les nuages 1 jour sur 2 en juillet.\n" +
                        "Les « 99 virages » de la route de montagne : autant prendre le téléphérique direct.",
                    wikiTitle: "Tianmen_Mountain",
                },
                {
                    id: 2,
                    nom: "Parc Avatar (Wulingyuan)",
                    pinyin: "武陵源 - Yuanjiajie",
                    zone: "Cercle IV (Excursion Journée)",
                    cercle: 4,
                    temps: "Journée complète",
                    note: 10,
                    incontournable: true,
                    tags: ["unesco", "nature", "view", "photo"],
                    conseil:
                        "Inspiration directe pour les montagnes flottantes du film — confirmé par James Cameron.\n" +
                        "3 000 pics de quartzite-grès s'élevant verticalement à 200-400 m de hauteur.\n" +
                        "Bailong Elevator : ascenseur extérieur de 326 m sur la falaise — le plus haut du monde.\n" +
                        "Mieux à 7h30 quand la brume serpente entre les pics — l'effet « Pandora » à 100%.\n" +
                        "Quatre zones principales : Yuanjiajie (Avatar), Yangjiajie, Tianzi, Suoxiyu (eau).\n" +
                        "Billet 248 yuans valable 4 jours — utilisez-en 2 minimum pour vraiment voir.\n" +
                        "Navettes gratuites entre les zones, mais lentes : prévoyez 3-4h de transport interne.\n" +
                        "Fiches randonnée disponibles — Golden Whip Stream à pied, le reste en télécabine.\n" +
                        "Nuit dans le parc à Wulingyuan village — réveil à 5h30 pour le lever de soleil.\n" +
                        "Les singes sont voleurs : tenez bien les sacs et ne mangez jamais devant eux.",
                    wikiTitle: "Wulingyuan",
                },
                {
                    id: 3,
                    nom: "Pont de Verre (Grand Canyon)",
                    pinyin: "张家界大峡谷玻璃桥",
                    zone: "Cercle IV (Excursion Journée)",
                    cercle: 4,
                    temps: "2-3h (sur place)",
                    note: 9,
                    incontournable: false,
                    tags: ["view", "nature", "photo"],
                    conseil:
                        "Le pont de verre le plus long du monde : 430 m, 300 m au-dessus du canyon.\n" +
                        "Verre triple-couche capable de supporter des charges militaires — théoriquement.\n" +
                        "Plus de 8 000 visiteurs/jour en été — réservation obligatoire 1-3 jours avant.\n" +
                        "Sensations garanties : si vous avez le vertige, tenez la rambarde, pas votre amour.\n" +
                        "Billet 138 yuans incluant le canyon en contrebas — comptez 4h sur le site.\n" +
                        "Le canyon en bas est aussi spectaculaire — cascades, ponts suspendus, balades nature.\n" +
                        "Surchaussures jetables fournies pour ne pas rayer le verre — aspect spatial assuré.\n" +
                        "Taxi depuis Wulingyuan 30 min, depuis le centre Zhangjiajie 50 min.\n" +
                        "Fermeture en cas d'orage — vérifiez la météo le matin avant le départ.\n" +
                        "Le verre est conçu pour résister aux fissures — pas à votre cœur qui s'arrête.",
                    wikiTitle: "Zhangjiajie_Glass_Bridge",
                },
                {
                    id: 4,
                    nom: "Rivière Golden Whip",
                    pinyin: "金鞭溪",
                    zone: "Cercle IV (Excursion Journée)",
                    cercle: 4,
                    temps: "2-3h (balade)",
                    note: 8,
                    incontournable: false,
                    tags: ["nature"],
                    conseil:
                        "Sentier plat de 7,5 km au pied des pics Avatar, le long d'une rivière limpide.\n" +
                        "2-3 heures de marche, niveau facile, ombragé même en plein été — climat tropical.\n" +
                        "Les singes sont les rois du sentier — comptez 50 individus sur le parcours.\n" +
                        "Attention aux sacs : ils ouvrent les zips, prennent les snacks, regardent moqueurs.\n" +
                        "Concombres glacés vendus 5 yuans par les vendeuses Tujia — rafraîchissement royal.\n" +
                        "Point de départ : entrée Forest Park, accessible avec le billet Wulingyuan.\n" +
                        "Fin du sentier : Bailong Elevator, idéal pour remonter sans crever en marchant.\n" +
                        "Panneaux d'info en chinois et anglais — l'histoire du dragon vert qui s'y baignait.\n" +
                        "L'eau est potable selon les locaux — vous décidez de leur faire confiance.\n" +
                        "La promenade idéale pour récupérer après une journée intense ailleurs dans le parc.",
                    wikiTitle: "Zhangjiajie_National_Forest_Park",
                },
            ],
            conseilsLogistiques: [
                "Zhangjiajie est très grand et fatigue : combinez transport et marche.",
                "Préparez de bonnes chaussures et de l'eau.",
                "Les zones panoramiques sont souvent brumeuses : vérifiez la météo.",
            ],
        },
        {
            ville: "Pékin",
            pinyin: "北京 - Běijīng",
            couleur: "#f1c40f",
            wikiTitle: "Forbidden_City",
            masterListe: [
                {
                    id: 1,
                    nom: "Cité Interdite",
                    pinyin: "故宫 - Gùgōng",
                    zone: "Cercle I (Centre)",
                    cercle: 1,
                    temps: "3-4h (sur place)",
                    note: 10,
                    incontournable: true,
                    tags: ["unesco", "tradition"],
                    conseil:
                        "9 999 pièces théoriques, 8 728 réelles — les Empereurs aimaient les chiffres ronds.\n" +
                        "Réservation OBLIGATOIRE 7 jours avant à minuit (heure chinoise) sur le mini-app WeChat.\n" +
                        "Créneau matinal recommandé (8h30) — lumière meilleure et foule moins dense.\n" +
                        "Billet 60 yuans hors saison, 40 yuans en hiver. Trésor impérial : +10 yuans.\n" +
                        "Prévoyez 3-4h minimum — sortez par la porte nord vers le parc Jingshan.\n" +
                        "Les gardes en uniforme militaire vous filment tout le temps — ne souriez pas trop.\n" +
                        "Certaines salles sont fermées en rotation — tablez sur 70% des sites accessibles.\n" +
                        "L'intérieur des palais est interdit : on regarde de l'extérieur à travers les vitres.\n" +
                        "Audioguide officiel à 40 yuans — meilleur que les guides Tencent ou tour guides.\n" +
                        "Les selfie sticks sont interdits — détectés aléatoirement, mais quand-même confisqués.",
                    wikiTitle: "Forbidden_City",
                },
                {
                    id: 2,
                    nom: "Grande Muraille (Mutianyu)",
                    pinyin: "慕田峪长城",
                    zone: "Cercle IV (Excursion Journée)",
                    cercle: 4,
                    temps: "60-90 min (Route)",
                    note: 10,
                    incontournable: true,
                    tags: ["unesco", "view", "cable", "nature"],
                    conseil:
                        "Mutianyu : section restaurée à 70 km au nord-est, plus calme que Badaling.\n" +
                        "Téléphérique pour monter (120 yuans aller-retour, 100 yuans aller simple).\n" +
                        "Descente en luge sur rail : 80 yuans, expérience absurde mais inoubliable.\n" +
                        "Luge interdite si vous tenez vos enfants sur les genoux — règle locale stricte.\n" +
                        "21 tours de garde sur 2,2 km — montez jusqu'à la tour 23 pour la photo cliché.\n" +
                        "Départ de Pékin : taxi 90 min ou bus DDX01 depuis Dongzhimen (2h, 50 yuans).\n" +
                        "Billet entrée 45 yuans + transport — total 250 yuans environ pour la journée.\n" +
                        "Évitez les week-ends — Mutianyu attire moins que Badaling mais reste fréquentée.\n" +
                        "L'automne (octobre) ou la fin du printemps (mai) offrent les meilleures conditions.\n" +
                        "Si vous touchez la muraille à 7 endroits différents, vous reviendrez en Chine — dixit.",
                    wikiTitle: "Mutianyu",
                },
                {
                    id: 3,
                    nom: "Hutongs",
                    pinyin: "胡同",
                    zone: "Cercle I (Centre)",
                    cercle: 1,
                    temps: "2-3h (Marche/Pousse-pousse)",
                    note: 9,
                    incontournable: true,
                    tags: ["tradition", "food"],
                    conseil:
                        "Ruelles traditionnelles de la dynastie Yuan (1271-1368) — 600 ans d'histoire urbaine.\n" +
                        "4 550 hutongs en 1949, 1 000 environ aujourd'hui — le reste sacrifié à la modernité.\n" +
                        "Nanluoguxiang : le plus touristique, 800 m de boutiques, restos, et selfie sticks.\n" +
                        "Wudaoying : alternative branchée, cafés indépendants, libraires, mode locale.\n" +
                        "Gulou-Houhai : ambiance lacustre, terrasses-bar, lanternes rouges le soir venu.\n" +
                        "Pousse-pousse à 100 yuans/heure, négociable à 60 yuans hors haute saison.\n" +
                        "Régalez-vous au stand de jianbing matinal — galette aux œufs, 15 yuans, 2 minutes.\n" +
                        "Métro L8 station Shichahai, sortie A : départ idéal vers Houhai puis Yandai Xie Jie.\n" +
                        "Le vrai authentique : ruelles non touristiques au sud-est de Drum Tower (Beiluogu).\n" +
                        "Évitez de visiter en taxi — vous raterez tout ce qui rend ces ruelles vivantes.",
                    wikiTitle: "Hutong",
                },
                {
                    id: 4,
                    nom: "Canard Laqué",
                    pinyin: "北京烤鸭 - Běijīng Kǎoyā",
                    zone: "Cercle I (Centre)",
                    cercle: 1,
                    temps: "2h (Dîner)",
                    note: 9,
                    incontournable: true,
                    tags: ["food", "tradition"],
                    conseil:
                        "Le plat impérial de Pékin, codifié à la cour Yuan (1330) puis perfectionné par Quanjude (1864).\n" +
                        "Quanjude (Wangfujing) : la version touristique, 388 yuans le canard, ambiance grand hôtel.\n" +
                        "Siji Minfu (multi-adresses) : version modernisée, 268 yuans, qualité supérieure selon locaux.\n" +
                        "Da Dong Roast Duck : version créative, 298 yuans, présentation gastronomique.\n" +
                        "Le canard est tranché à table en 108 morceaux — comptez 10 minutes de cérémonie.\n" +
                        "Servir avec galettes mandarines, sauce hoisin, concombre, oignon nouveau, sucre.\n" +
                        "La peau croustillante se mange seule, trempée dans le sucre — saveur surprenante.\n" +
                        "Les os finissent en bouillon servi en fin de repas — ne pas refuser, c'est le clou.\n" +
                        "Réservation obligatoire le week-end, 1-2 jours avant via Trip.com ou WeChat.\n" +
                        "Un canard nourrit 3-4 personnes — pas la peine d'en commander un par tête.",
                    wikiTitle: "Peking_duck",
                },
                {
                    id: 5,
                    nom: "Temple du Ciel",
                    pinyin: "天坛 - Tiāntán",
                    zone: "Cercle I (Centre)",
                    cercle: 1,
                    temps: "2h (sur place)",
                    note: 9,
                    incontournable: false,
                    tags: ["unesco", "temple", "tradition"],
                    conseil:
                        "Construit en 1420 sous Yongle pour les sacrifices impériaux à la divinité du Ciel.\n" +
                        "L'Empereur y priait pour de bonnes récoltes — fonction agricole avant tout cultuelle.\n" +
                        "La Salle de Prière des Bonnes Récoltes : pavillon circulaire bleu, 38 m de haut.\n" +
                        "Acoustique du Temple de l'Écho : un murmure d'un côté entendu de l'autre côté.\n" +
                        "Billet 35 yuans — incluant le parc qui mesure 4× la Cité Interdite (267 ha).\n" +
                        "Le matin (7h-9h), les seniors pékinois s'y entraînent au taï-chi, danses, calligraphie.\n" +
                        "Métro L5 station Tiantan East Gate, sortie A — entrée principale juste en face.\n" +
                        "Visite 2h pour le temple seul, 3-4h avec le parc et les salles annexes.\n" +
                        "Le « Mur de l'Écho » est légèrement décevant — les promesses de l'audioguide exagèrent.\n" +
                        "Évitez de venir le 1er octobre (fête nationale) — 100 000 visiteurs/jour estimés.",
                    wikiTitle: "Temple_of_Heaven",
                },
                {
                    id: 6,
                    nom: "Quartier moderne Sanlitun",
                    pinyin: "三里屯",
                    zone: "Cercle I (Centre)",
                    cercle: 1,
                    temps: "2-3h (Shopping/Soir)",
                    note: 8,
                    incontournable: false,
                    tags: ["modern", "shopping", "night"],
                    conseil:
                        "Quartier branché autour de l'ambassade USA, devenu le shopping-bar central de Pékin.\n" +
                        "Taikoo Li Sanlitun : centre commercial open-air, marques internationales et chinoises.\n" +
                        "The Bookworm : librairie-bar-restaurant, événements culturels et expats locaux.\n" +
                        "Nali Patio : courette intérieure avec restos et bars — moins touristique que Tai Koo Li.\n" +
                        "Les bars de Sanlitun Soho ferment à 4h — la vie nocturne la plus tardive de Pékin.\n" +
                        "Métro L10 station Tuanjiehu, sortie B : 10 min de marche vers le nord-ouest.\n" +
                        "Baijiu craft : essayez le Capital Spirits, premier bar à baijiu pour étrangers.\n" +
                        "Quartier expatrié français/coréen — vraies bouchées coréennes au Galaxie Soho.\n" +
                        "Les prix sont 50% plus élevés qu'à Wangfujing — qualité parfois identique.\n" +
                        "L'endroit où Pékin prouve qu'elle peut être Tokyo, sans le savoir vraiment.",
                    wikiTitle: "Sanlitun",
                },
                {
                    id: 7,
                    nom: "Parc Jingshan",
                    pinyin: "景山公园",
                    zone: "Cercle I (Centre)",
                    cercle: 1,
                    temps: "45-60 min",
                    note: 8,
                    incontournable: false,
                    tags: ["view", "tradition", "photo"],
                    conseil:
                        "Colline artificielle de 45,7 m juste au nord de la Cité Interdite — terre accumulée.\n" +
                        "Cette terre vient des douves creusées pour la Cité Interdite — recyclage impérial.\n" +
                        "Vue panoramique sur les toits dorés de la Cité Interdite — le cliché de Pékin.\n" +
                        "Le pavillon Wanchun au sommet abrite un Bouddha original Ming.\n" +
                        "L'Empereur Chongzhen s'y est pendu en 1644 quand les Mandchous sont entrés à Pékin.\n" +
                        "Billet 2 yuans — le rapport qualité-prix le plus indécent de toute la Chine.\n" +
                        "Métro L8 station Shichahai, sortie A : 10 min de marche vers le sud-ouest.\n" +
                        "Visite 1h max — montée 200 marches, descente par l'autre côté en pente douce.\n" +
                        "Mieux au coucher du soleil — la Cité Interdite prend des reflets dorés dignes d'un film.\n" +
                        "Combo parfait après la Cité Interdite : sortie nord puis Jingshan, 5 min à pied.",
                    wikiTitle: "Jingshan_Park",
                },
            ],
            conseilsLogistiques: [
                "Pour la Cité Interdite, réservez 7 jours avant à minuit (heure chinoise) !",
                "Utilisez le Métro de Pékin, très étendu et fiable.",
                "Mutianyu (Grande Muraille) est plus calme que Badaling.",
            ],
        },
    ],
};

/* Dates : arrivée en Chine le 26 juillet 2026, 12 jours.
   Chengdu J1-3 (26-28 juil) → Chongqing J4-5 (29-30 juil) →
   Zhangjiajie J6-8 (31 juil-2 août) → Pékin J9-12 (3-6 août). */
export const flexibleItinerary = {
    Chengdu: [
        {
            day: "Jour 1",
            date: "Dim. 26 juillet",
            subtitle: "Pandas & culture locale",
            placeIds: [1, 2, 6, 8],
        },
        {
            day: "Jour 2",
            date: "Lun. 27 juillet",
            subtitle: "Temples & saveurs",
            placeIds: [3, 4, 9],
        },
        {
            day: "Jour 3",
            date: "Mar. 28 juillet",
            subtitle: "Excursion Taoïste",
            placeIds: [13],
        },
    ],
    Chongqing: [
        {
            day: "Jour 4",
            date: "Mer. 29 juillet",
            subtitle: "La ville verticale",
            placeIds: [4, 5, 1, 13],
        },
        {
            day: "Jour 5",
            date: "Jeu. 30 juillet",
            subtitle: "Cyberpunk & authentique",
            placeIds: [2, 3, 7, 6],
        },
    ],
    Zhangjiajie: [
        {
            day: "Jour 6",
            date: "Ven. 31 juillet",
            subtitle: "Porte du Ciel",
            placeIds: [1],
        },
        {
            day: "Jour 7",
            date: "Sam. 1ᵉʳ août",
            subtitle: "Pics Avatar",
            placeIds: [2],
        },
        {
            day: "Jour 8",
            date: "Dim. 2 août",
            subtitle: "Au choix : pont de verre ou rivière",
            placeIds: [3, 4],
        },
    ],
    Pékin: [
        {
            day: "Jour 9",
            date: "Lun. 3 août",
            subtitle: "Le cœur impérial",
            placeIds: [1, 3, 4],
        },
        {
            day: "Jour 10",
            date: "Mar. 4 août",
            subtitle: "La Grande Muraille",
            placeIds: [2, 6],
        },
        {
            day: "Jours 11-12",
            date: "Mer. 5 — Jeu. 6 août",
            subtitle: "Flexibilité & contemplation",
            placeIds: [5, 7],
        },
    ],
};

/* Coordonnées : centres administratifs officiels (Wikipedia EN +
   gouvernements municipaux). Ordre cohérent avec ROUTE_ORDER pour
   les arcs et les étapes du panel. */
export const cityCoords = {
    Chengdu: { lat: 30.6595, lng: 104.0658 }, // 天府广场 — Tianfu Square
    Chongqing: { lat: 29.563, lng: 106.5516 }, // 渝中区 — Yuzhong District
    Zhangjiajie: { lat: 29.117, lng: 110.479 }, // 张家界市 — centre
    Pékin: { lat: 39.9042, lng: 116.4074 }, // 天安门 — Tiananmen
};

/** Ordre du voyage — utilisé pour tracer les arcs entre étapes successives. */
export const ROUTE_ORDER = ["Chengdu", "Chongqing", "Zhangjiajie", "Pékin"];
