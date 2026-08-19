import { Localized } from "./utils";

export type CategorySeed = {
  slug: string;
  name: Localized;
  description?: Localized;
  image?: string;
};

export type ProductImage = { url: string; alt: string };

export type ProductSpec = {
  key: Localized;
  value: Localized;
};

export type ProductReview = {
  id: string;
  name: string;
  rating: number;
  text: Localized;
  avatar?: string;
};

export type ProductSeed = {
  slug: string;
  brand: string;
  model: string;
  price: number;
  currency: string;
  oldPrice?: number;
  name: Localized;
  shortDescription: Localized;
  description: Localized;
  thumbnail: string;
  gallery: string[];
  features: Localized[];
  specifications: ProductSpec[];
  stock: number;
  rating: number;
  reviewCount: number;
  colors: string[];
  tags: string[];
  installationVideo: string;
  manualPDF: string;
  firmware: string;
  isPopular: boolean;
  isNew: boolean;
  availability: string;
  warrantyMonths: number;
  relatedSlugs: string[];
  faq?: { question: Localized; answer: Localized }[];
  attributes?: { key: Localized; value: Localized }[];
};

const L = (ru: string, kk: string, en: string): Localized => ({ ru, kk, en });

export const categoriesSeed = [
  { slug: "smart-locks", name: { ru: "Умные замки", kk: "Ақылды құлыптар", en: "Smart locks" }, description: { ru: "Электронные дверные замки", kk: "Электронды есік құлптары", en: "Electronic door locks" } },
  { slug: "accessories", name: { ru: "Аксессуары", kk: "Аксессуарлар", en: "Accessories" }, description: { ru: "RFID-карты, батарейки, крепления", kk: "RFID-карталар, батареялар, бекіткіштер", en: "RFID cards, batteries, mounts" } },
];

export const obsoleteProductSlugs = ["aqara-a100", "yale-lyra", "xiaomi-m30"];

export function productScalarData(p: ProductSeed) {
  return {
    slug: p.slug,
    brand: p.brand,
    model: p.model,
    price: p.price,
    currency: p.currency,
    oldPrice: p.oldPrice ?? null,
    name: JSON.stringify(p.name),
    shortDescription: JSON.stringify(p.shortDescription),
    description: JSON.stringify(p.description),
    thumbnail: p.thumbnail,
    gallery: JSON.stringify(p.gallery),
    features: JSON.stringify(p.features),
    specifications: JSON.stringify(p.specifications),
    stock: p.stock,
    rating: p.rating,
    reviewCount: p.reviewCount,
    colors: JSON.stringify(p.colors),
    installationVideo: p.installationVideo,
    manualPDF: p.manualPDF,
    firmware: p.firmware,
    isPopular: p.isPopular,
    isNew: p.isNew,
    availability: p.availability,
    warrantyMonths: p.warrantyMonths,
    relatedSlugs: JSON.stringify(p.relatedSlugs),
  };
}

export const sampleProducts: ProductSeed[] = [
  {
    slug: "my-home-x9",
    brand: "MY HOME",
    model: "X9",
    price: 95000,
    currency: "KZT",
    name: L("MY HOME X9", "MY HOME X9", "MY HOME X9"),
    shortDescription: L(
      "Умный замок с распознаванием лица и ладони, управление через Tuya",
      "Жүз бен алақанды тану бар ақылды құлып, Tuya арқылы басқару",
      "Smart lock with face and palm recognition, Tuya app control"
    ),
    description: L(
      "MY HOME X9 — умный замок с быстрым распознаванием лица, ладони и отпечатка пальца. Открытие по PIN-коду, RFID-карте и приложению Tuya. До 12 месяцев работы от одного комплекта батареек, уведомления в реальном времени. Доступна рассрочка Kaspi RED 0-0-12.",
      "MY HOME X9 — жүзді, алақанды және саусақ ізін жылдам танитын ақылды құлып. PIN-код, RFID-карта және Tuya қолданбасы арқылы ашылады. Бір батарея жиынтығымен 12 айға дейін жұмыс істейді, нақты уақыттағы хабарламалар. Kaspi RED 0-0-12 бөліп төлеу бар.",
      "MY HOME X9 is a smart lock with fast face, palm and fingerprint recognition. Unlock with PIN, RFID card or the Tuya app. Up to 12 months on one battery set, real-time notifications. Kaspi RED 0-0-12 installment available."
    ),
    thumbnail: "/products/x9.png",
    gallery: ["/products/x9.png"],
    features: [
      L("Распознавание лица", "Жүзді тану", "Face recognition"),
      L("Распознавание ладони", "Алақанды тану", "Palm recognition"),
      L("Отпечаток пальца", "Саусақ ізі", "Fingerprint"),
      L("PIN-код", "PIN-код", "PIN code"),
      L("RFID-карта", "RFID карта", "RFID card"),
      L("Управление через Tuya", "Tuya арқылы басқару", "Tuya app control"),
      L("До 12 месяцев от батареи", "Батареямен 12 айға дейін", "Up to 12 months battery life"),
    ],
    specifications: [
      { key: L("Способы открытия", "Ашу тәсілдері", "Unlock methods"), value: L("Лицо, ладонь, отпечаток, PIN, RFID, приложение", "Жүз, алақан, саусақ ізі, PIN, RFID, қолданба", "Face, palm, fingerprint, PIN, RFID, app") },
      { key: L("Приложение", "Қолданба", "App"), value: L("Tuya", "Tuya", "Tuya") },
      { key: L("Питание", "Қорек", "Power"), value: L("До 12 месяцев от батареек", "Батареямен 12 айға дейін", "Up to 12 months on batteries") },
      { key: L("Оплата", "Төлем", "Payment"), value: L("Kaspi RED, рассрочка 0-0-12", "Kaspi RED, 0-0-12 бөліп төлеу", "Kaspi RED, 0-0-12 installment") },
    ],
    stock: 12,
    rating: 4.9,
    reviewCount: 18,
    colors: ["Чёрный"],
    tags: ["Face Recognition", "Palm", "Fingerprint", "RFID", "Tuya", "PIN"],
    installationVideo: "",
    manualPDF: "",
    firmware: "",
    isPopular: true,
    isNew: true,
    availability: "in_stock",
    warrantyMonths: 24,
    relatedSlugs: ["sharp-h4-fv", "s008"],
  },
  {
    slug: "sharp-h4-fv",
    brand: "SHARP",
    model: "H4-FV",
    price: 185000,
    currency: "KZT",
    name: L("SHARP H4-FV", "SHARP H4-FV", "SHARP H4-FV"),
    shortDescription: L(
      "Премиум замок с 3D Face ID, ладонью и видеоглазком",
      "3D Face ID, алақан және бейнекөзшік бар премиум құлып",
      "Premium lock with 3D Face ID, palm vein and video peephole"
    ),
    description: L(
      "SHARP H4-FV — флагманский умный замок с 3D-распознаванием лица, сканером вен ладони, отпечатком, PIN-кодом, RFID-картой и механическим ключом. Встроенный AI-видеоглазок, Wi-Fi модуль и уведомления в реальном времени. Цвета: чёрный, бронза и чёрный с rose gold. Kaspi RED и рассрочка 0-0-12.",
      "SHARP H4-FV — 3D жүз тану, алақан көктамырын сканерлеу, саусақ ізі, PIN, RFID-карта және механикалық кілті бар флагмандық ақылды құлып. Кірістірілген AI-бейнекөзшік, Wi-Fi және нақты уақыттағы хабарламалар. Түстері: қара, қола және rose gold. Kaspi RED және 0-0-12 бөліп төлеу.",
      "SHARP H4-FV is a flagship smart lock with 3D face recognition, palm-vein scan, fingerprint, PIN, RFID card and a mechanical key. Built-in AI peephole, Wi-Fi and real-time alerts. Finishes: black, bronze and black with rose gold. Kaspi RED and 0-0-12 installment."
    ),
    thumbnail: "/products/h4-fv-black.png",
    gallery: ["/products/h4-fv-black.png", "/products/h4-fv-gold.png", "/products/h4-fv-rose.png"],
    features: [
      L("3D Face ID", "3D Face ID", "3D Face ID"),
      L("Сканер вен ладони", "Алақан көктамыры", "Palm vein"),
      L("Отпечаток пальца", "Саусақ ізі", "Fingerprint"),
      L("PIN-код", "PIN-код", "PIN code"),
      L("RFID-карта", "RFID карта", "RFID card"),
      L("Механический ключ", "Механикалық кілт", "Mechanical key"),
      L("Wi-Fi и уведомления", "Wi-Fi және хабарламалар", "Wi-Fi and notifications"),
      L("AI-видеоглазок", "AI-бейнекөзшік", "AI video peephole"),
    ],
    specifications: [
      { key: L("Модель", "Модель", "Model"), value: L("H4-FV", "H4-FV", "H4-FV") },
      { key: L("Камера", "Камера", "Camera"), value: L("3D Facial Recognition AI Camera, AI peephole", "3D Facial Recognition AI Camera, AI peephole", "3D Facial Recognition AI Camera, AI peephole") },
      { key: L("Связь", "Байланыс", "Connectivity"), value: L("Wi-Fi 2.4 GHz", "Wi-Fi 2.4 GHz", "Wi-Fi 2.4 GHz") },
      { key: L("Цвета", "Түстер", "Colors"), value: L("Чёрный, бронза, rose gold", "Қара, қола, rose gold", "Black, bronze, rose gold") },
      { key: L("Оплата", "Төлем", "Payment"), value: L("Kaspi RED, рассрочка 0-0-12", "Kaspi RED, 0-0-12 бөліп төлеу", "Kaspi RED, 0-0-12 installment") },
    ],
    stock: 8,
    rating: 5,
    reviewCount: 11,
    colors: ["Чёрный", "Бронза", "Rose gold"],
    tags: ["Face Recognition", "Palm", "Fingerprint", "RFID", "WiFi", "Camera", "PIN"],
    installationVideo: "",
    manualPDF: "",
    firmware: "",
    isPopular: true,
    isNew: true,
    availability: "in_stock",
    warrantyMonths: 24,
    relatedSlugs: ["my-home-x9", "qleung-3d-face"],
  },
  {
    slug: "s008",
    brand: "Tuya",
    model: "S008",
    price: 0,
    currency: "KZT",
    name: L("S008", "S008", "S008"),
    shortDescription: L(
      "Надёжный замок Tuya / TTLock с IP68, отпечатком и Type-C",
      "IP68, саусақ ізі және Type-C бар сенімді Tuya / TTLock құлыпы",
      "Reliable Tuya / TTLock lock with IP68, fingerprint and Type-C"
    ),
    description: L(
      "S008 — умный замок с приложением Tuya и TTLock. Открытие паролем, IC-картой и отпечатком пальца на ручке. Класс защиты IP68, скрытая скважина и аварийное питание Type-C. 4 отсека для батареек.",
      "S008 — Tuya және TTLock қолданбалары бар ақылды құлып. Құпия сөз, IC-карта және тұтқадағы саусақ ізімен ашылады. IP68 қорғаныс, жасырын кілт тесігі және Type-C авариялық қорек. 4 батарея бөлімі.",
      "S008 is a smart lock for Tuya and TTLock. Unlock with password, IC card or the fingerprint sensor on the handle. IP68 rating, hidden keyhole and Type-C emergency power. Four battery compartments."
    ),
    thumbnail: "/products/s008.png",
    gallery: ["/products/s008.png"],
    features: [
      L("Отпечаток на ручке", "Тұтқадағы саусақ ізі", "Fingerprint on handle"),
      L("Пароль / IC-карта", "Құпия сөз / IC-карта", "Password / IC card"),
      L("Tuya и TTLock", "Tuya және TTLock", "Tuya and TTLock"),
      L("IP68", "IP68", "IP68"),
      L("Type-C аварийное питание", "Type-C авариялық қорек", "Type-C emergency power"),
      L("Скрытая скважина", "Жасырын кілт тесігі", "Hidden keyhole"),
    ],
    specifications: [
      { key: L("Приложение", "Қолданба", "App"), value: L("Tuya, TTLock / Tongtong lock", "Tuya, TTLock / Tongtong lock", "Tuya, TTLock / Tongtong lock") },
      { key: L("Защита", "Қорғаныс", "Protection"), value: L("IP68", "IP68", "IP68") },
      { key: L("Питание", "Қорек", "Power"), value: L("4 батарейки + Type-C", "4 батарея + Type-C", "4 batteries + Type-C") },
      { key: L("Цвет", "Түс", "Color"), value: L("Чёрный матовый", "Қара мат", "Matte black") },
    ],
    stock: 15,
    rating: 4.7,
    reviewCount: 9,
    colors: ["Чёрный"],
    tags: ["Fingerprint", "RFID", "Tuya", "IP68", "PIN"],
    installationVideo: "",
    manualPDF: "",
    firmware: "",
    isPopular: true,
    isNew: true,
    availability: "in_stock",
    warrantyMonths: 24,
    relatedSlugs: ["my-home-x9", "sharp-h4-fv"],
  },
  {
    slug: "qleung-3d-face",
    brand: "QLEUNG",
    model: "3D Face",
    price: 0,
    currency: "KZT",
    name: L("QLEUNG 3D Face", "QLEUNG 3D Face", "QLEUNG 3D Face"),
    shortDescription: L(
      "3D-распознавание лица и внутренний видеоэкран",
      "3D жүз тану және ішкі бейнеэкран",
      "3D face recognition with indoor video screen"
    ),
    description: L(
      "QLEUNG — умный замок с модулем 3D Face Recognition, сенсорной клавиатурой и цветным экраном на внутренней панели. Наружная камера работает как видеоглазок: вы видите гостя, не открывая дверь.",
      "QLEUNG — 3D Face Recognition модулі, сенсорлық пернетақта және ішкі панельдегі түрлі-түсті экраны бар ақылды құлып. Сыртқы камера бейнекөзшік ретінде жұмыс істейді: есікті ашпай қонақты көресіз.",
      "QLEUNG is a smart lock with a 3D Face Recognition module, touch keypad and a colour indoor screen. The outdoor camera works as a video peephole so you can see visitors without opening the door."
    ),
    thumbnail: "/products/qleung.png",
    gallery: ["/products/qleung.png"],
    features: [
      L("3D Face Recognition", "3D Face Recognition", "3D Face Recognition"),
      L("Внутренний видеоэкран", "Ішкі бейнеэкран", "Indoor video screen"),
      L("Сенсорная клавиатура", "Сенсорлық пернетақта", "Touch keypad"),
      L("Видеоглазок", "Бейнекөзшік", "Video peephole"),
    ],
    specifications: [
      { key: L("Бренд", "Бренд", "Brand"), value: L("QLEUNG", "QLEUNG", "QLEUNG") },
      { key: L("Камера", "Камера", "Camera"), value: L("3D Face Recognition + внутренний монитор", "3D Face Recognition + ішкі монитор", "3D Face Recognition + indoor monitor") },
      { key: L("Цвет", "Түс", "Color"), value: L("Чёрный", "Қара", "Black") },
    ],
    stock: 6,
    rating: 4.8,
    reviewCount: 7,
    colors: ["Чёрный"],
    tags: ["Face Recognition", "Camera", "Fingerprint", "PIN"],
    installationVideo: "",
    manualPDF: "",
    firmware: "",
    isPopular: false,
    isNew: true,
    availability: "in_stock",
    warrantyMonths: 24,
    relatedSlugs: ["sharp-h4-fv", "my-home-x9"],
  },
];

export const articlesSeed = [
  {
    slug: "install-door-lock",
    categorySlug: "smart-locks",
    title: { ru: "Как установить умный замок", kk: "Ақылды құлыпты қалай орнату керек", en: "How to install a smart lock" },
    coverImage: "https://images.unsplash.com/photo-1581578731117-104f2a6b8722?auto=format&fit=crop&w=1200&q=80",
    content: { ru: "Пошаговая инструкция...", kk: "Қадамдық нұсқаулық...", en: "Step by step guide..." },
    estimatedMinutes: 6,
    tags: ["установка"],
  },
];

export const videosSeed = [
  {
    slug: "install-overview",
    title: { ru: "Обзор установки", kk: "Орнату шолуы", en: "Installation overview" },
    description: { ru: "Краткий обзор процесса установки", kk: "Орнату процесіне қысқаша шолу", en: "Quick installation overview" },
    youtubeId: "dQw4w9WgXcQ",
    videoUrl: undefined,
    thumbnail: undefined,
    tags: ["install"],
  },
];

export const faqsSeed = [
  {
    question: { ru: "Подойдёт ли замок к моей двери?", kk: "Құлып менің есігіме сәйкес келе ме?", en: "Will the lock fit my door?" },
    answer: { ru: "Большинство замков подходят для дверей толщиной 35-60 мм.", kk: "Көбісі 35-60 мм қалыңдығындағы есіктерге сәйкес келеді.", en: "Most locks fit doors 35-60 mm thick." },
  },
  {
    question: { ru: "Сколько служат батарейки?", kk: "Батареялар қанша уақытқа жетеді?", en: "How long do batteries last?" },
    answer: { ru: "От 6 до 12 месяцев при среднем использовании.", kk: "Орташа пайдалануда 6-12 ай.", en: "6 to 12 months with average use." },
  },
  {
    question: { ru: "Есть ли гарантия?", kk: "Кепілдік бар ма?", en: "Is there a warranty?" },
    answer: { ru: "Да, от 1 до 3 лет в зависимости от модели.", kk: "Иә, модельге байланысты 1-3 жыл.", en: "Yes, from 1 to 3 years depending on model." },
  },
];

export const reviewsSeed = [
  { productSlug: "my-home-x9", name: "Александр", rating: 5, text: { ru: "Отличный замок, установка заняла 40 минут.", kk: "Тамаша құлып, орнату 40 минутты алды.", en: "Great lock, installation took 40 minutes." }, avatar: "https://i.pravatar.cc/150?u=alex" },
  { productSlug: "sharp-h4-fv", name: "Дана", rating: 5, text: { ru: "Видеоглазок и Face ID — очень удобно. Довольна.", kk: "Бейнекөзшік пен Face ID — өте ыңғайлы. Қуаныштымын.", en: "Video peephole and Face ID are very convenient. Happy with it." }, avatar: "https://i.pravatar.cc/150?u=dana" },
];

export const casesSeed = [
  { slug: "office-almaty", title: { ru: "Офис в Алматы", kk: "Алматыдағы офис", en: "Office in Almaty" }, summary: { ru: "Установили 12 замков с удалённым доступом.", kk: "Қашықтан қол жеткізуімен 12 құлып орнатылды.", en: "Installed 12 locks with remote access." }, clientName: "ТОО Smart Office", location: "Алматы", rating: 5 },
];
