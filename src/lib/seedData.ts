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

const emptyMedia = {
  installationVideo: "",
  manualPDF: "",
  firmware: "",
  availability: "in_stock",
  warrantyMonths: 24,
  currency: "KZT",
};

export const categoriesSeed = [
  { slug: "smart-locks", name: { ru: "Умные замки", kk: "Ақылды құлыптар", en: "Smart locks" }, description: { ru: "Электронные дверные замки", kk: "Электронды есік құлптары", en: "Electronic door locks" } },
  { slug: "accessories", name: { ru: "Аксессуары", kk: "Аксессуарлар", en: "Accessories" }, description: { ru: "RFID-карты, батарейки, крепления", kk: "RFID-карталар, батареялар, бекіткіштер", en: "RFID cards, batteries, mounts" } },
];

export const obsoleteProductSlugs = [
  "aqara-a100",
  "yale-lyra",
  "xiaomi-m30",
  "my-home-x9",
  "qleung-3d-face",
];

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
    slug: "s008",
    brand: "Tuya",
    model: "S008",
    price: 75000,
    name: L("S008", "S008", "S008"),
    shortDescription: L("Полуавтоматический замок Tuya / TTLock, IP68", "Tuya / TTLock жартылай автомат құлып, IP68", "Semi-automatic Tuya / TTLock lock, IP68"),
    description: L(
      "S008 — матовый чёрный умный замок с Tuya и TTLock. Открытие паролем, IC-картой и отпечатком на ручке. Класс защиты IP68, скрытая скважина и аварийное питание Type-C.",
      "S008 — Tuya және TTLock бар күңгірт қара ақылды құлып. Құпия сөз, IC-карта және тұтқадағы саусақ ізімен ашылады. IP68, жасырын кілт тесігі және Type-C авариялық қорек.",
      "S008 is a matte-black smart lock for Tuya and TTLock. Unlock with password, IC card or the handle fingerprint sensor. IP68, hidden keyhole and Type-C emergency power."
    ),
    thumbnail: "/products/s008.jpg",
    gallery: ["/products/s008.jpg"],
    features: [
      L("Отпечаток на ручке", "Тұтқадағы саусақ ізі", "Fingerprint on handle"),
      L("Пароль / IC-карта", "Құпия сөз / IC-карта", "Password / IC card"),
      L("Tuya и TTLock", "Tuya және TTLock", "Tuya and TTLock"),
      L("IP68", "IP68", "IP68"),
    ],
    specifications: [
      { key: L("Тип", "Түрі", "Type"), value: L("Полуавтоматический", "Жартылай автомат", "Semi-automatic") },
      { key: L("Приложение", "Қолданба", "App"), value: L("Tuya, TTLock", "Tuya, TTLock", "Tuya, TTLock") },
      { key: L("Защита", "Қорғаныс", "Protection"), value: L("IP68", "IP68", "IP68") },
    ],
    stock: 16,
    rating: 4.7,
    reviewCount: 12,
    colors: ["Чёрный"],
    tags: ["Fingerprint", "RFID", "Tuya", "IP68", "PIN"],
    isPopular: true,
    isNew: true,
    relatedSlugs: ["s009-black", "a11-ultra"],
    ...emptyMedia,
  },
  {
    slug: "s009-black",
    brand: "Tuya",
    model: "S009",
    price: 80000,
    name: L("S009 Black", "S009 Black", "S009 Black"),
    shortDescription: L("Чёрный замок с паролем, IC, отпечатком и Type-C", "Құпия сөз, IC, саусақ ізі және Type-C бар қара құлып", "Black lock with password, IC, fingerprint and Type-C"),
    description: L(
      "S009 Black — матовый замок с рычажной ручкой. Пароль, IC-карта, сканер отпечатка на оси ручки, скрытая скважина и Type-C. Внутри 4 отсека для батареек.",
      "S009 Black — рычаг тұтқалы күңгірт құлып. Құпия сөз, IC-карта, тұтқадағы саусақ ізі, жасырын кілт тесігі және Type-C. Ішінде 4 батарея бөлімі.",
      "S009 Black is a matte lever-handle lock. Password, IC card, fingerprint in the handle, hidden keyhole and Type-C. Four battery compartments inside."
    ),
    thumbnail: "/products/s009.jpg",
    gallery: ["/products/s009.jpg"],
    features: [
      L("Пароль и IC-карта", "Құпия сөз және IC-карта", "Password and IC card"),
      L("Отпечаток на ручке", "Тұтқадағы саусақ ізі", "Fingerprint on handle"),
      L("Type-C аварийное питание", "Type-C авариялық қорек", "Type-C emergency power"),
      L("4 батарейки", "4 батарея", "4 batteries"),
    ],
    specifications: [
      { key: L("Питание", "Қорек", "Power"), value: L("4 батарейки + Type-C", "4 батарея + Type-C", "4 batteries + Type-C") },
      { key: L("Цвет", "Түс", "Color"), value: L("Чёрный", "Қара", "Black") },
    ],
    stock: 14,
    rating: 4.6,
    reviewCount: 8,
    colors: ["Чёрный"],
    tags: ["Fingerprint", "RFID", "PIN", "Tuya"],
    isPopular: false,
    isNew: true,
    relatedSlugs: ["s008", "a11-ultra"],
    ...emptyMedia,
  },
  {
    slug: "a11-ultra",
    brand: "MY HOME",
    model: "A11 ULTRA",
    price: 90000,
    name: L("A11 ULTRA", "A11 ULTRA", "A11 ULTRA"),
    shortDescription: L("Распознавание лица и ладони, Tuya", "Жүз бен алақанды тану, Tuya", "Face and palm recognition, Tuya"),
    description: L(
      "A11 ULTRA — умный замок с распознаванием лица и ладони, отпечатком, PIN, RFID и приложением Tuya. До 12 месяцев от батареек. Kaspi RED и рассрочка 0-0-12.",
      "A11 ULTRA — жүз, алақан, саусақ ізі, PIN, RFID және Tuya қолданбасы бар құлып. Батареямен 12 айға дейін. Kaspi RED және 0-0-12.",
      "A11 ULTRA is a smart lock with face and palm recognition, fingerprint, PIN, RFID and the Tuya app. Up to 12 months on batteries. Kaspi RED and 0-0-12 installment."
    ),
    thumbnail: "/products/a11-ultra.jpg",
    gallery: ["/products/a11-ultra.jpg"],
    features: [
      L("Распознавание лица", "Жүзді тану", "Face recognition"),
      L("Распознавание ладони", "Алақанды тану", "Palm recognition"),
      L("Отпечаток пальца", "Саусақ ізі", "Fingerprint"),
      L("PIN / RFID / Tuya", "PIN / RFID / Tuya", "PIN / RFID / Tuya"),
    ],
    specifications: [
      { key: L("Приложение", "Қолданба", "App"), value: L("Tuya", "Tuya", "Tuya") },
      { key: L("Питание", "Қорек", "Power"), value: L("До 12 месяцев от батареек", "Батареямен 12 айға дейін", "Up to 12 months on batteries") },
    ],
    stock: 12,
    rating: 4.8,
    reviewCount: 15,
    colors: ["Чёрный"],
    tags: ["Face Recognition", "Palm", "Fingerprint", "RFID", "Tuya", "PIN"],
    isPopular: true,
    isNew: true,
    relatedSlugs: ["s958", "s008"],
    ...emptyMedia,
  },
  {
    slug: "s958",
    brand: "QLEUNG",
    model: "S958",
    price: 100000,
    name: L("QLEUNG S958", "QLEUNG S958", "QLEUNG S958"),
    shortDescription: L("3D Face Recognition и внутренний видеоэкран", "3D Face Recognition және ішкі бейнеэкран", "3D Face Recognition and indoor video screen"),
    description: L(
      "QLEUNG S958 — умный замок с 3D-распознаванием лица, сенсорной клавиатурой, отпечатком и цветным экраном внутри. Наружная камера работает как видеоглазок.",
      "QLEUNG S958 — 3D жүз тану, сенсорлық пернетақта, саусақ ізі және ішкі экраны бар құлып. Сыртқы камера бейнекөзшік ретінде жұмыс істейді.",
      "QLEUNG S958 is a smart lock with 3D face recognition, a touch keypad, fingerprint sensor and an indoor colour screen. The outdoor camera works as a video peephole."
    ),
    thumbnail: "/products/s958.jpg",
    gallery: ["/products/s958.jpg"],
    features: [
      L("3D Face Recognition", "3D Face Recognition", "3D Face Recognition"),
      L("Внутренний видеоэкран", "Ішкі бейнеэкран", "Indoor video screen"),
      L("Сенсорная клавиатура", "Сенсорлық пернетақта", "Touch keypad"),
      L("Отпечаток пальца", "Саусақ ізі", "Fingerprint"),
    ],
    specifications: [
      { key: L("Бренд", "Бренд", "Brand"), value: L("QLEUNG", "QLEUNG", "QLEUNG") },
      { key: L("Камера", "Камера", "Camera"), value: L("3D Face + внутренний монитор", "3D Face + ішкі монитор", "3D Face + indoor monitor") },
    ],
    stock: 9,
    rating: 4.8,
    reviewCount: 10,
    colors: ["Чёрный"],
    tags: ["Face Recognition", "Camera", "Fingerprint", "PIN"],
    isPopular: true,
    isNew: true,
    relatedSlugs: ["r15-pro", "q8-pro"],
    ...emptyMedia,
  },
  {
    slug: "r15-pro",
    brand: "MY HOME",
    model: "R15 PRO",
    price: 140000,
    name: L("R15 PRO", "R15 PRO", "R15 PRO"),
    shortDescription: L("Две камеры: видеоглазок внутри и AI-камера снаружи", "Екі камера: ішкі бейнекөзшік және сыртқы AI-камера", "Two cameras: indoor peephole and outdoor AI camera"),
    description: L(
      "R15 PRO — умный замок с двумя камерами. Снаружи AI-камера, дисплей и клавиатура, внутри цветной экран видеодомофона. Открытие лицом, отпечатком и PIN-кодом.",
      "R15 PRO — екі камералы ақылды құлып. Сыртында AI-камера мен пернетақта, ішінде түрлі-түсті экран. Жүз, саусақ ізі және PIN арқылы ашылады.",
      "R15 PRO is a dual-camera smart lock. Outside: AI camera, display and keypad. Inside: a colour video-intercom screen. Unlock with face, fingerprint or PIN."
    ),
    thumbnail: "/products/r15-pro.jpg",
    gallery: ["/products/r15-pro.jpg"],
    features: [
      L("2 камеры", "2 камера", "2 cameras"),
      L("AI-камера снаружи", "Сыртқы AI-камера", "Outdoor AI camera"),
      L("Внутренний видеоэкран", "Ішкі бейнеэкран", "Indoor video screen"),
      L("Отпечаток и PIN", "Саусақ ізі және PIN", "Fingerprint and PIN"),
    ],
    specifications: [
      { key: L("Камеры", "Камералар", "Cameras"), value: L("2 — снаружи и внутри", "2 — сыртында және ішінде", "2 — outdoor and indoor") },
    ],
    stock: 7,
    rating: 4.9,
    reviewCount: 9,
    colors: ["Тёмно-серый"],
    tags: ["Face Recognition", "Camera", "Fingerprint", "PIN"],
    isPopular: true,
    isNew: true,
    relatedSlugs: ["q8-pro", "s958"],
    ...emptyMedia,
  },
  {
    slug: "q8-pro",
    brand: "MY HOME",
    model: "Q8 PRO",
    price: 150000,
    name: L("Q8 PRO", "Q8 PRO", "Q8 PRO"),
    shortDescription: L("Две камеры, AI Face и Wi-Fi. Чёрный или бронза", "Екі камера, AI Face және Wi-Fi. Қара немесе қола", "Two cameras, AI Face and Wi-Fi. Black or bronze"),
    description: L(
      "Q8 PRO — замок с двумя камерами: AI-камера снаружи и цветной экран внутри. Отпечаток на ручке, Wi-Fi 2.4 GHz. Цвета: чёрный и бронза. 150 000 ₸ за любой цвет.",
      "Q8 PRO — екі камералы құлып: сыртында AI-камера, ішінде экран. Тұтқадағы саусақ ізі, Wi-Fi 2.4 GHz. Қара және қола. Кез келген түсі 150 000 ₸.",
      "Q8 PRO is a dual-camera lock: AI camera outside and a colour screen inside. Fingerprint on the handle, Wi-Fi 2.4 GHz. Black or bronze, 150,000 ₸ either colour."
    ),
    thumbnail: "/products/q8-pro-black.jpg",
    gallery: ["/products/q8-pro-black.jpg", "/products/q8-pro-bronze.jpg"],
    features: [
      L("2 камеры", "2 камера", "2 cameras"),
      L("AI Camera / Face", "AI Camera / Face", "AI Camera / Face"),
      L("Внутренний видеоэкран", "Ішкі бейнеэкран", "Indoor video screen"),
      L("Wi-Fi 2.4 GHz", "Wi-Fi 2.4 GHz", "Wi-Fi 2.4 GHz"),
    ],
    specifications: [
      { key: L("Камеры", "Камералар", "Cameras"), value: L("2", "2", "2") },
      { key: L("Связь", "Байланыс", "Connectivity"), value: L("Wi-Fi 2.4 GHz", "Wi-Fi 2.4 GHz", "Wi-Fi 2.4 GHz") },
      { key: L("Цвета", "Түстер", "Colors"), value: L("Чёрный, бронза", "Қара, қола", "Black, bronze") },
    ],
    stock: 10,
    rating: 4.9,
    reviewCount: 11,
    colors: ["Чёрный", "Бронза"],
    tags: ["Face Recognition", "Camera", "Fingerprint", "WiFi", "PIN"],
    isPopular: true,
    isNew: true,
    relatedSlugs: ["r15-pro", "sharp-h4-fv"],
    ...emptyMedia,
  },
  {
    slug: "sharp-h4-fv",
    brand: "SHARP",
    model: "H4-FV",
    price: 185000,
    name: L("SHARP H4", "SHARP H4", "SHARP H4"),
    shortDescription: L("3D Face ID, вены ладони, видеоглазок. Чёрный", "3D Face ID, алақан көктамыры, бейнекөзшік. Қара", "3D Face ID, palm vein, video peephole. Black"),
    description: L(
      "SHARP H4-FV — флагман с 3D Face ID, сканером вен ладони, отпечатком, PIN, RFID, ключом, Wi-Fi и AI-видеоглазком. Чёрный. Kaspi RED и рассрочка 0-0-12.",
      "SHARP H4-FV — 3D Face ID, алақан көктамыры, саусақ ізі, PIN, RFID, кілт, Wi-Fi және AI-бейнекөзшік. Қара. Kaspi RED және 0-0-12.",
      "SHARP H4-FV is a flagship lock with 3D Face ID, palm-vein scan, fingerprint, PIN, RFID, key, Wi-Fi and an AI peephole. Black. Kaspi RED and 0-0-12 installment."
    ),
    thumbnail: "/products/h4-fv-black.jpg",
    gallery: ["/products/h4-fv-black.jpg"],
    features: [
      L("3D Face ID", "3D Face ID", "3D Face ID"),
      L("Сканер вен ладони", "Алақан көктамыры", "Palm vein"),
      L("PIN / RFID / ключ", "PIN / RFID / кілт", "PIN / RFID / key"),
      L("Wi-Fi и AI-видеоглазок", "Wi-Fi және AI-бейнекөзшік", "Wi-Fi and AI peephole"),
    ],
    specifications: [
      { key: L("Модель", "Модель", "Model"), value: L("H4-FV", "H4-FV", "H4-FV") },
      { key: L("Цвет", "Түс", "Color"), value: L("Чёрный", "Қара", "Black") },
      { key: L("Оплата", "Төлем", "Payment"), value: L("Kaspi RED, 0-0-12", "Kaspi RED, 0-0-12", "Kaspi RED, 0-0-12") },
    ],
    stock: 6,
    rating: 5,
    reviewCount: 14,
    colors: ["Чёрный"],
    tags: ["Face Recognition", "Palm", "Fingerprint", "RFID", "WiFi", "Camera", "PIN"],
    isPopular: true,
    isNew: true,
    relatedSlugs: ["sharp-h4-gold", "q8-pro"],
    ...emptyMedia,
  },
  {
    slug: "sharp-h4-gold",
    brand: "SHARP",
    model: "H4-FV Gold",
    price: 195000,
    name: L("SHARP H4 Gold", "SHARP H4 Gold", "SHARP H4 Gold"),
    shortDescription: L("Та же H4-FV в бронзе / золоте", "Сол H4-FV, қола / алтын түсте", "The same H4-FV in bronze / gold"),
    description: L(
      "SHARP H4-FV Gold — бронзовая версия флагмана: 3D Facial Recognition AI Camera, AI peephole, карта и кнопки Open/Close внутри.",
      "SHARP H4-FV Gold — флагманның қола нұсқасы: 3D Facial Recognition AI Camera, AI peephole және карта.",
      "SHARP H4-FV Gold is the bronze flagship: 3D Facial Recognition AI Camera, AI peephole and card access."
    ),
    thumbnail: "/products/h4-fv-gold.jpg",
    gallery: ["/products/h4-fv-gold.jpg"],
    features: [
      L("3D Facial Recognition AI Camera", "3D Facial Recognition AI Camera", "3D Facial Recognition AI Camera"),
      L("AI peephole", "AI peephole", "AI peephole"),
      L("Бронза / золото", "Қола / алтын", "Bronze / gold"),
    ],
    specifications: [
      { key: L("Модель", "Модель", "Model"), value: L("H4-FV", "H4-FV", "H4-FV") },
      { key: L("Цвет", "Түс", "Color"), value: L("Бронза", "Қола", "Bronze") },
    ],
    stock: 4,
    rating: 5,
    reviewCount: 6,
    colors: ["Бронза"],
    tags: ["Face Recognition", "Palm", "Fingerprint", "RFID", "Camera", "PIN"],
    isPopular: false,
    isNew: true,
    relatedSlugs: ["sharp-h4-fv", "q8-pro"],
    ...emptyMedia,
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
  { productSlug: "a11-ultra", name: "Александр", rating: 5, text: { ru: "Отличный замок, установка заняла 40 минут.", kk: "Тамаша құлып, орнату 40 минутты алды.", en: "Great lock, installation took 40 minutes." }, avatar: "https://i.pravatar.cc/150?u=alex" },
  { productSlug: "sharp-h4-fv", name: "Дана", rating: 5, text: { ru: "Видеоглазок и Face ID — очень удобно. Довольна.", kk: "Бейнекөзшік пен Face ID — өте ыңғайлы. Қуаныштымын.", en: "Video peephole and Face ID are very convenient. Happy with it." }, avatar: "https://i.pravatar.cc/150?u=dana" },
];

export const casesSeed = [
  { slug: "office-almaty", title: { ru: "Офис в Алматы", kk: "Алматыдағы офис", en: "Office in Almaty" }, summary: { ru: "Установили 12 замков с удалённым доступом.", kk: "Қашықтан қол жеткізуімен 12 құлып орнатылды.", en: "Installed 12 locks with remote access." }, clientName: "ТОО Smart Office", location: "Алматы", rating: 5 },
];
