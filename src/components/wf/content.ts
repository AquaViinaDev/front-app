// Тексты нового вида (RU/RO). Факты — только из наших источников (сайт aquaviina.md, таблица товара).
// Где факта нет — поле ask: блок показывается с пометкой «❓ уточнить у Эдуарда».

export type WfLocale = "ru" | "ro";

export const PHONE = "+373 67 177 889";
export const PHONE_HREF = "tel:+37367177889";
export const EMAIL = "aquaviinamd@gmail.com";
export const INSTAGRAM = "https://www.instagram.com/aqua_viina/";

// Категории каталога: адреса /types/<slug> уже существуют на сайте
export const CATEGORIES = [
  {
    slug: "osmoza-inversa",
    icon: "💧",
    ru: {
      name: "Системы обратного осмоса",
      text: "Самая глубокая очистка питьевой воды: убирает соли жёсткости, хлор, запахи и тяжёлые металлы. Отдельный кран на мойке.",
    },
    ro: {
      name: "Sisteme de osmoză inversă",
      text: "Cea mai profundă purificare a apei de băut: elimină duritatea, clorul, mirosurile și metalele grele. Robinet separat la chiuvetă.",
    },
  },
  {
    slug: "filtre-sub-chiuveta",
    icon: "🚰",
    ru: {
      name: "Проточные фильтры под мойку",
      text: "Компактная система для семьи из 2–4 человек: очищает воду от основных загрязнений без бака.",
    },
    ro: {
      name: "Filtre sub chiuvetă",
      text: "Sistem compact pentru o familie de 2–4 persoane: curăță apa de impuritățile principale, fără rezervor.",
    },
  },
  {
    slug: "prefiltre",
    icon: "🏠",
    ru: {
      name: "Магистральные фильтры",
      text: "Ставятся на вход воды в дом: защищают бойлер, стиральную и посудомоечную машины от песка и ржавчины.",
    },
    ro: {
      name: "Filtre magistrale",
      text: "Se montează la intrarea apei în casă: protejează boilerul, mașina de spălat rufe și vase de nisip și rugină.",
    },
  },
  {
    slug: "cartuse",
    icon: "🔄",
    ru: {
      name: "Сменные картриджи",
      text: "Картриджи для осмосов, проточных и магистральных фильтров: 10\", 20\", Big Blue, быстросъёмные.",
    },
    ro: {
      name: "Cartușe de schimb",
      text: "Cartușe pentru osmoză, filtre sub chiuvetă și magistrale: 10\", 20\", Big Blue, cu cuplare rapidă.",
    },
  },
  {
    slug: "accesorii",
    icon: "🔧",
    ru: {
      name: "Комплектующие",
      text: "Краны для питьевой воды, накопительные баки, насосы, корпуса, фитинги и ключи.",
    },
    ro: {
      name: "Accesorii",
      text: "Robinete pentru apă potabilă, rezervoare, pompe, carcase, fitinguri și chei.",
    },
  },
] as const;

// «Хиты»: id товаров сайта (цены и наличие подтягиваются из API в момент показа)
export const HIT_PRODUCT_IDS = [
  "eadcf9e5-3ae6-46f3-a327-3b9fbba213fb", // ROBEN Blue, 7 ступеней
  "6d91bded-abbf-4d81-941d-60ab0a30f64c", // ASUS Detox+, 6 ступеней
  "9833e08d-6915-45bf-8419-cae0bb82c743", // KRS 34, 5-8 ступеней
];

export const NAV = {
  ru: {
    catalog: "Каталог",
    allProducts: "Все товары",
    podbor: "Подбор фильтра",
    zamena: "Замена картриджей",
    services: "Установка",
    promos: "Предложения",
    articles: "Статьи",
    about: "О нас",
    contacts: "Контакты",
    callback: "Заказать звонок",
    topNote: "Фильтры для воды с установкой — Кишинёв и вся Молдова",
    brandNote: "Фильтры для воды",
    search: "Найти",
  },
  ro: {
    catalog: "Catalog",
    allProducts: "Toate produsele",
    podbor: "Alege filtrul",
    zamena: "Înlocuirea cartușelor",
    services: "Instalare",
    promos: "Oferte",
    articles: "Articole",
    about: "Despre noi",
    contacts: "Contacte",
    callback: "Sună-mă înapoi",
    topNote: "Filtre de apă cu instalare — Chișinău și toată Moldova",
    brandNote: "Filtre de apă",
    search: "Caută",
  },
};

export const HOME = {
  ru: {
    heroBadge: "Бесплатная доставка от 1000 лей",
    heroTitle: "Фильтры для воды в Молдове —",
    heroAccent: "чистая вода для вашего дома",
    heroText:
      "Поможем подобрать фильтр под вашу воду и бюджет. Обратный осмос, проточные и магистральные фильтры, сменные картриджи. Установим и будем обслуживать.",
    heroPrimary: "Подобрать фильтр за 1 минуту",
    heroSecondary: "Перейти в каталог",
    heroBullets: [
      "Установка бесплатно, если фильтр куплен у нас",
      "Доставка по Кишинёву и всей Молдове",
      "Напомним о замене картриджей",
      "Бесплатная консультация по телефону",
    ],
    catalogEyebrow: "Каталог",
    catalogTitle: "Каталог систем очистки воды",
    catalogText: "Выберите решение для дома или подберите сменные картриджи",
    catalogMore: "Смотреть варианты",
    brandsEyebrow: "Бренды",
    brandsTitle: "Бренды, с которыми мы работаем",
    brandsText: "Оборудование и картриджи от производителей, которые продаём сами",
    expertiseEyebrow: "Почему мы",
    expertiseTitle: "Доверьте чистую воду нам",
    expertise: [
      {
        icon: "🎯",
        title: "Подбор под вашу воду",
        text: "Спросим про дом, семью и воду — посоветуем систему, которая нужна, а не самую дорогую.",
      },
      {
        icon: "🛠",
        title: "Установка за час",
        text: "Мастер ставит фильтр примерно за 1 час и проверяет герметичность. Гарантия на работы — 6 месяцев.",
      },
      {
        icon: "🔄",
        title: "Обслуживание",
        text: "Раз в полгода напоминаем о замене картриджей и приезжаем в удобный день.",
      },
      {
        icon: "🚚",
        title: "Доставка по Молдове",
        text: "Привозим по Кишинёву и отправляем по всей стране. Бесплатно — от 1000 лей.",
      },
    ],
    hitsEyebrow: "Хиты продаж",
    hitsTitle: "Готовые решения для чистой воды",
    hitsText: "Системы обратного осмоса, которые выбирают чаще всего",
    hitsAll: "Все предложения",
    serviceEyebrow: "Сервис",
    serviceTitle: "От подбора до обслуживания",
    serviceText:
      "Помогаем на каждом шаге — от выбора системы до плановой замены картриджей.",
    serviceItems: [
      {
        title: "Установка фильтра",
        text: "Бесплатно, если фильтр куплен у нас. Сторонние системы — от 500 лей. Около 1 часа.",
      },
      {
        title: "Замена картриджей",
        text: "Мастер привозит подходящие картриджи, меняет их и проверяет систему. От 540 лей.",
      },
      {
        title: "Вызов мастера",
        text: "200 лей по городу, 300 лей за городом.",
      },
      {
        title: "Гарантия на работы",
        text: "6 месяцев на установку и подключение.",
      },
    ],
    serviceCta: "Заказать установку",
    articlesEyebrow: "Статьи",
    articlesTitle: "Полезно знать о воде и фильтрах",
    articlesText: "Фильтры, обслуживание и очистка воды — простым языком",
    articlesAll: "Все статьи",
    reviewsEyebrow: "Отзывы",
    reviewsTitle: "Что говорят наши клиенты",
    reviewsAsk: "Отзывы — взять настоящие из Google-профиля (имя, дата, текст) или убрать блок",
    faqEyebrow: "Вопросы",
    faqTitle: "Отвечаем на частые вопросы",
    ctaTitle: "Не знаете, какой фильтр выбрать?",
    ctaText: "Оставьте имя и телефон — перезвоним и подскажем, какой фильтр подойдёт именно вам.",
  },
  ro: {
    heroBadge: "Livrare gratuită de la 1000 lei",
    heroTitle: "Filtre de apă în Moldova —",
    heroAccent: "apă curată pentru casa ta",
    heroText:
      "Te ajutăm să alegi filtrul potrivit pentru apa și bugetul tău. Osmoză inversă, filtre sub chiuvetă și magistrale, cartușe de schimb. Instalăm și ne ocupăm de întreținere.",
    heroPrimary: "Alege filtrul în 1 minut",
    heroSecondary: "Vezi catalogul",
    heroBullets: [
      "Instalare gratuită pentru filtrele cumpărate de la noi",
      "Livrare în Chișinău și în toată Moldova",
      "Îți amintim când e timpul să schimbi cartușele",
      "Consultație gratuită la telefon",
    ],
    catalogEyebrow: "Catalog",
    catalogTitle: "Catalogul sistemelor de filtrare",
    catalogText: "Alege soluția potrivită pentru casă sau găsește cartușe de schimb",
    catalogMore: "Vezi variantele",
    brandsEyebrow: "Branduri",
    brandsTitle: "Brandurile cu care lucrăm",
    brandsText: "Echipamente și cartușe de la producătorii pe care îi vindem direct",
    expertiseEyebrow: "De ce noi",
    expertiseTitle: "Lasă apa curată în grija noastră",
    expertise: [
      {
        icon: "🎯",
        title: "Alegere după apa ta",
        text: "Întrebăm despre casă, familie și apă — și recomandăm sistemul de care ai nevoie, nu pe cel mai scump.",
      },
      {
        icon: "🛠",
        title: "Instalare într-o oră",
        text: "Meșterul montează filtrul în aproximativ o oră și verifică etanșeitatea. Garanție pentru lucrări — 6 luni.",
      },
      {
        icon: "🔄",
        title: "Întreținere",
        text: "O dată la șase luni îți amintim de schimbarea cartușelor și venim într-o zi convenabilă.",
      },
      {
        icon: "🚚",
        title: "Livrare în Moldova",
        text: "Livrăm în Chișinău și expediem în toată țara. Gratuit — de la 1000 lei.",
      },
    ],
    hitsEyebrow: "Cele mai vândute",
    hitsTitle: "Soluții gata pentru apă curată",
    hitsText: "Sistemele de osmoză inversă alese cel mai des",
    hitsAll: "Toate ofertele",
    serviceEyebrow: "Service",
    serviceTitle: "De la alegere până la întreținere",
    serviceText: "Te ajutăm la fiecare pas — de la alegerea sistemului până la schimbarea planificată a cartușelor.",
    serviceItems: [
      {
        title: "Instalarea filtrului",
        text: "Gratuit pentru filtrele cumpărate de la noi. Sisteme din alte surse — de la 500 lei. Aproximativ o oră.",
      },
      {
        title: "Înlocuirea cartușelor",
        text: "Meșterul aduce cartușele potrivite, le schimbă și verifică sistemul. De la 540 lei.",
      },
      {
        title: "Deplasarea meșterului",
        text: "200 lei în oraș, 300 lei în afara orașului.",
      },
      {
        title: "Garanție pentru lucrări",
        text: "6 luni pentru instalare și conectare.",
      },
    ],
    serviceCta: "Comandă instalarea",
    articlesEyebrow: "Articole",
    articlesTitle: "Util de știut despre apă și filtre",
    articlesText: "Filtre, întreținere și purificarea apei — pe înțelesul tuturor",
    articlesAll: "Toate articolele",
    reviewsEyebrow: "Recenzii",
    reviewsTitle: "Ce spun clienții noștri",
    reviewsAsk: "Recenzii — de luat cele reale din profilul Google (nume, dată, text) sau de scos blocul",
    faqEyebrow: "Întrebări",
    faqTitle: "Răspundem la întrebările frecvente",
    ctaTitle: "Nu știi ce filtru să alegi?",
    ctaText: "Lasă numele și telefonul — te sunăm și îți spunem ce filtru ți se potrivește.",
  },
};

export const FAQ = {
  ru: [
    {
      q: "Какие фильтры для воды вы продаёте?",
      a: "Системы обратного осмоса, проточные фильтры под мойку, магистральные фильтры, сменные картриджи и комплектующие.",
    },
    {
      q: "Есть ли доставка по Молдове?",
      a: "Да, доставляем по Кишинёву и по всей Молдове. Бесплатная доставка — от 1000 лей.",
    },
    {
      q: "Входит ли установка в стоимость?",
      a: "Если фильтр куплен у нас — установка бесплатная. Установка сторонних систем — от 500 лей, вызов мастера 200 лей по городу и 300 лей за городом.",
    },
    {
      q: "Как часто менять картриджи?",
      a: "Раз в полгода мы сами напоминаем о замене и приезжаем в удобный день. Точный срок зависит от системы и качества воды — подскажем по вашей модели.",
    },
    {
      q: "Можно ли вернуть фильтр?",
      a: "Да, в течение 14 дней, если фильтр не устанавливали и не использовали, в заводской упаковке.",
      ask: "Проверить формулировку возврата по закону РМ",
    },
  ],
  ro: [
    {
      q: "Ce filtre de apă vindeți?",
      a: "Sisteme de osmoză inversă, filtre sub chiuvetă, filtre magistrale, cartușe de schimb și accesorii.",
    },
    {
      q: "Livrați în toată Moldova?",
      a: "Da, livrăm în Chișinău și în toată Moldova. Livrarea este gratuită de la 1000 lei.",
    },
    {
      q: "Instalarea este inclusă în preț?",
      a: "Dacă filtrul este cumpărat de la noi — instalarea este gratuită. Instalarea sistemelor din alte surse — de la 500 lei, deplasarea meșterului 200 lei în oraș și 300 lei în afara orașului.",
    },
    {
      q: "Cât de des trebuie schimbate cartușele?",
      a: "O dată la șase luni îți amintim noi și venim într-o zi convenabilă. Termenul exact depinde de sistem și de calitatea apei — îți spunem pentru modelul tău.",
    },
    {
      q: "Pot returna filtrul?",
      a: "Da, în 14 zile, dacă filtrul nu a fost instalat și folosit și este în ambalajul original.",
      ask: "De verificat formularea returului conform legii RM",
    },
  ],
};

export const BRANDS = [
  { name: "FILTEK", href: "/brands/fil-tek", note: { ru: "Турция · осмосы и картриджи", ro: "Turcia · osmoză și cartușe" } },
  { name: "GREEN FILTER", href: "/brands/green-filter", note: { ru: "Польша · фильтры и мембраны", ro: "Polonia · filtre și membrane" } },
];

export const FOOTER = {
  ru: {
    about: "Фильтры для воды с установкой и обслуживанием в Кишинёве и по всей Молдове.",
    catalog: "Каталог",
    info: "Информация",
    contacts: "Контакты",
    phones: "Телефон",
    email: "E-mail",
    hours: "График",
    hoursValue: "Понедельник–Пятница 8:00–18:00",
    city: "Кишинёв, Молдова",
    privacy: "Политика конфиденциальности",
    warranty: "Гарантия и возврат",
    rights: "Все права защищены.",
  },
  ro: {
    about: "Filtre de apă cu instalare și întreținere în Chișinău și în toată Moldova.",
    catalog: "Catalog",
    info: "Informații",
    contacts: "Contacte",
    phones: "Telefon",
    email: "E-mail",
    hours: "Program",
    hoursValue: "Luni–Vineri 8:00–18:00",
    city: "Chișinău, Moldova",
    privacy: "Politica de confidențialitate",
    warranty: "Garanție și retur",
    rights: "Toate drepturile rezervate.",
  },
};
