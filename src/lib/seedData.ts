import { Locale, Localized } from "./utils";

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

export const categoriesSeed = [
  { slug: "smart-locks", name: { ru: "Умные замки", kk: "Ақылды құлыптар", en: "Smart locks" }, description: { ru: "Электронные дверные замки", kk: "Электронды есік құлптары", en: "Electronic door locks" } },
  { slug: "accessories", name: { ru: "Аксессуары", kk: "Аксессуарлар", en: "Accessories" }, description: { ru: "RFID-карты, батарейки, крепления", kk: "RFID-карталар, батареялар, бекіткіштер", en: "RFID cards, batteries, mounts" } },
];

export const sampleProducts: ProductSeed[] = [
  {
    slug: "aqara-a100",
    brand: "Aqara",
    model: "A100",
    price: 189000,
    currency: "KZT",
    oldPrice: 219000,
    name: { ru: "Aqara A100", kk: "Aqara A100", en: "Aqara A100" },
    shortDescription: { ru: "Умный замок с Face ID и Wi-Fi", kk: "Wi-Fi және Face ID бар ақылды құлып", en: "Smart lock with Face ID and Wi-Fi" },
    description: { ru: "Премиальный замок Aqara A100 с распознаванием лиц, отпечатком пальца, PIN-кодом и удалённым доступом.", kk: "Жүзді тану, саусақ ізін, PIN-кодты және қашықтан қол жеткізуді қолдайтын премиум Aqara A100 құлыпы.", en: "Premium Aqara A100 lock with face recognition, fingerprint, PIN code and remote access." },
    thumbnail: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582050134757-565e361a89ef?auto=format&fit=crop&w=1200&q=80",
    ],
    features: [
      { ru: "Face Recognition", kk: "Жүзді тану", en: "Face Recognition" },
      { ru: "Fingerprint", kk: "Саусақ ізі", en: "Fingerprint" },
      { ru: "Wi-Fi + Bluetooth", kk: "Wi-Fi + Bluetooth", en: "Wi-Fi + Bluetooth" },
      { ru: "Temporary passwords", kk: "Уақытша парольдер", en: "Temporary passwords" },
      { ru: "Auto lock", kk: "Автобекіту", en: "Auto lock" },
    ],
    specifications: [
      { key: { ru: "Тип установки", kk: "Орнату түрі", en: "Installation type" }, value: { ru: "На входную дверь 35-60 мм", kk: "Кіріс есігі 35-60 мм", en: "Front door 35-60 mm" } },
      { key: { ru: "Питание", kk: "Қорек", en: "Power" }, value: { ru: "8 батареек AA", kk: "8 AA батарея", en: "8 AA batteries" } },
      { key: { ru: "Материалы", kk: "Материалдар", en: "Materials" }, value: { ru: "Алюминий + закаленное стекло", kk: "Алюминий + қатайтылған әйнек", en: "Aluminum + tempered glass" } },
      { key: { ru: "Подключение", kk: "Қосылу", en: "Connectivity" }, value: { ru: "Wi-Fi, Bluetooth 5.0", kk: "Wi-Fi, Bluetooth 5.0", en: "Wi-Fi, Bluetooth 5.0" } },
    ],
    stock: 14,
    rating: 4.9,
    reviewCount: 42,
    colors: ["Чёрный", "Серебристый"],
    tags: ["Face Recognition", "WiFi", "Fingerprint"],
    installationVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    manualPDF: "/uploads/manual-aqara-a100.pdf",
    firmware: "/uploads/firmware-aqara-a100.bin",
    isPopular: true,
    isNew: true,
    availability: "in_stock",
    warrantyMonths: 24,
    relatedSlugs: ["yale-lyra", "xiaomi-m30"],
  },
  {
    slug: "yale-lyra",
    brand: "Yale",
    model: "Lyra Smart",
    price: 149000,
    currency: "KZT",
    name: { ru: "Yale Lyra Smart", kk: "Yale Lyra Smart", en: "Yale Lyra Smart" },
    shortDescription: { ru: "Надёжный замок с PIN и RFID", kk: "PIN және RFID арқылы сенімді құлып", en: "Reliable lock with PIN and RFID" },
    description: { ru: "Yale Lyra Smart — классический внешний вид, современная начинка: PIN, карта, приложение, авто-запирание.", kk: "Yale Lyra Smart — классикалық сыртқы түр, заманауи мүмкіндіктер: PIN, карта, қолданба, авто-бекіту.", en: "Yale Lyra Smart — classic design, modern internals: PIN, card, app, auto-lock." },
    thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582050134757-565e361a89ef?auto=format&fit=crop&w=1200&q=80",
    ],
    features: [
      { ru: "PIN code", kk: "PIN код", en: "PIN code" },
      { ru: "RFID card", kk: "RFID карта", en: "RFID card" },
      { ru: "Mobile app", kk: "Мобильдік қолданба", en: "Mobile app" },
      { ru: "Auto lock", kk: "Автобекіту", en: "Auto lock" },
      { ru: "Battery backup", kk: "Резервті қорек", en: "Battery backup" },
    ],
    specifications: [
      { key: { ru: "Толщина двери", kk: "Есік қалыңдығы", en: "Door thickness" }, value: { ru: "38-55 мм", kk: "38-55 мм", en: "38-55 mm" } },
      { key: { ru: "Питание", kk: "Қорек", en: "Power" }, value: { ru: "4 батарейки AA", kk: "4 AA батарея", en: "4 AA batteries" } },
      { key: { ru: "Цвет", kk: "Түс", en: "Color" }, value: { ru: "Чёрный матовый", kk: "Қара мат", en: "Black matte" } },
    ],
    stock: 8,
    rating: 4.7,
    reviewCount: 28,
    colors: ["Чёрный"],
    tags: ["PIN", "RFID", "Bluetooth"],
    installationVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    manualPDF: "/uploads/manual-yale-lyra.pdf",
    firmware: "/uploads/firmware-yale-lyra.bin",
    isPopular: true,
    isNew: false,
    availability: "in_stock",
    warrantyMonths: 36,
    relatedSlugs: ["aqara-a100"],
  },
  {
    slug: "xiaomi-m30",
    brand: "Xiaomi",
    model: "Smart Door Lock M30",
    price: 129000,
    currency: "KZT",
    name: { ru: "Xiaomi Smart Door Lock M30", kk: "Xiaomi Smart Door Lock M30", en: "Xiaomi Smart Door Lock M30" },
    shortDescription: { ru: "Доступный умный замок с камерой", kk: "Камерамен қол жетімді ақылды құлып", en: "Affordable smart lock with camera" },
    description: { ru: "Xiaomi M30 — встроенная камера, удалённый просмотр, интеграция с умным домом и удобное приложение.", kk: "Xiaomi M30 — кірістірленген камера, қашықтан қарау, зәулет үй интеграциясы ыңғайлы қолданба.", en: "Xiaomi M30 — built-in camera, remote viewing, smart home integration and convenient app." },
    thumbnail: "https://images.unsplash.com/photo-1582050134757-565e361a89ef?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582050134757-565e361a89ef?auto=format&fit=crop&w=1200&q=80",
    ],
    features: [
      { ru: "Camera", kk: "Камера", en: "Camera" },
      { ru: "Fingerprint", kk: "Саусақ ізі", en: "Fingerprint" },
      { ru: "Wi-Fi", kk: "Wi-Fi", en: "Wi-Fi" },
      { ru: "Mobile app", kk: "Мобильдік қолданба", en: "Mobile app" },
      { ru: "Anti theft", kk: "Ұрлыққа қарсы", en: "Anti theft" },
    ],
    specifications: [
      { key: { ru: "Камера", kk: "Камера", en: "Camera" }, value: { ru: "2 Мп, угол 150°", kk: "2 МП, 150° бұрыш", en: "2MP, 150° angle" } },
      { key: { ru: "Питание", kk: "Қорек", en: "Power" }, value: { ru: "6 батареек AA", kk: "6 AA батарея", en: "6 AA batteries" } },
    ],
    stock: 23,
    rating: 4.6,
    reviewCount: 15,
    colors: ["Чёрный"],
    tags: ["Camera", "WiFi", "Fingerprint"],
    installationVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    manualPDF: "/uploads/manual-xiaomi-m30.pdf",
    firmware: "/uploads/firmware-xiaomi-m30.bin",
    isPopular: false,
    isNew: true,
    availability: "in_stock",
    warrantyMonths: 12,
    relatedSlugs: ["aqara-a100"],
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
  { productSlug: "aqara-a100", name: "Александр", rating: 5, text: { ru: "Отличный замок, установка заняла 40 минут.", kk: "Тамаша құлып, орнату 40 минутты алды.", en: "Great lock, installation took 40 minutes." }, avatar: "https://i.pravatar.cc/150?u=alex" },
  { productSlug: "yale-lyra", name: "Дана", rating: 5, text: { ru: "Красивый и надёжный. Очень довольна.", kk: "Әдемі және сенімді. Өте қуаныштымын.", en: "Beautiful and reliable. Very satisfied." }, avatar: "https://i.pravatar.cc/150?u=dana" },
];

export const casesSeed = [
  { slug: "office-almaty", title: { ru: "Офис в Алматы", kk: "Алматыдағы офис", en: "Office in Almaty" }, summary: { ru: "Установили 12 замков с удалённым доступом.", kk: "Қашықтан қол жеткізуімен 12 құлып орнатылды.", en: "Installed 12 locks with remote access." }, clientName: "ТОО Smart Office", location: "Алматы", rating: 5 },
];
