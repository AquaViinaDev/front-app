// Статьи (RU/RO). Тематика — как в блоге filterpmr.md, тексты наши, под Кишинёв и Молдову.
// Блок: ["h2", текст] | ["p", текст] | ["ul", [пункты]]

export type ArticleBlock = ["h2" | "p", string] | ["ul", string[]];

export type Article = {
  slug: string;
  tag: { ru: string; ro: string };
  date: string;
  ru: { title: string; description: string; body: ArticleBlock[] };
  ro: { title: string; description: string; body: ArticleBlock[] };
};

export const ARTICLES: Article[] = [
  {
    slug: "kak-vybrat-filtr-dlya-vody",
    tag: { ru: "Выбор", ro: "Alegere" },
    date: "2026-10-28",
    ru: {
      title: "Как выбрать фильтр для воды для квартиры или дома",
      description:
        "Обратный осмос, проточный фильтр под мойку или магистральный — разбираем, что подойдёт именно вам в Кишинёве и по Молдове.",
      body: [
        ["p", "Фильтр выбирают не по цене и не по количеству ступеней, а по задаче: что именно вы хотите получить — вкусную питьевую воду, защиту техники от накипи и ржавчины или и то и другое."],
        ["h2", "1. Для питья и готовки — обратный осмос"],
        ["p", "Система обратного осмоса ставится под мойку и даёт отдельный кран с питьевой водой. Мембрана задерживает соли жёсткости, хлор, запахи и тяжёлые металлы. Это самый глубокий уровень очистки для дома и самый частый выбор семей с детьми."],
        ["ul", ["Нужно место под мойкой для бака и корпусов.", "Если напор в доме слабый, выбирайте модель с насосом.", "Картриджи меняют по графику — мы напоминаем об этом сами."]],
        ["h2", "2. Проще и компактнее — проточный фильтр"],
        ["p", "Проточный фильтр под мойку чистит воду от основных загрязнений и не требует бака. Подходит, если вода в целом нормальная и нужен простой вариант для семьи из 2–4 человек."],
        ["h2", "3. Для всего дома — магистральный фильтр"],
        ["p", "Магистральный фильтр ставят на входе воды в дом. Он задерживает песок и ржавчину и защищает бойлер, стиральную и посудомоечную машины. Для питья он не предназначен — его часто ставят вместе с осмосом."],
        ["h2", "Что учесть перед покупкой"],
        ["ul", ["Сколько человек пьёт воду дома.", "Есть ли место под мойкой.", "Какой напор воды в квартире или доме.", "Есть ли накипь в чайнике и ржавчина в воде."]],
        ["p", "Не уверены — пройдите подбор фильтра на сайте или позвоните нам: подскажем бесплатно."],
      ],
    },
    ro: {
      title: "Cum alegi un filtru de apă pentru apartament sau casă",
      description:
        "Osmoză inversă, filtru sub chiuvetă sau filtru magistral — vedem ce ți se potrivește în Chișinău și în toată Moldova.",
      body: [
        ["p", "Filtrul nu se alege după preț sau după numărul de trepte, ci după scop: vrei apă bună de băut, protecție pentru electrocasnice împotriva calcarului și ruginii, sau ambele."],
        ["h2", "1. Pentru băut și gătit — osmoza inversă"],
        ["p", "Sistemul de osmoză inversă se montează sub chiuvetă și are un robinet separat pentru apa potabilă. Membrana reține sărurile de duritate, clorul, mirosurile și metalele grele. Este cel mai profund nivel de purificare pentru casă și alegerea cea mai frecventă a familiilor cu copii."],
        ["ul", ["E nevoie de loc sub chiuvetă pentru rezervor și carcase.", "Dacă presiunea apei e slabă, alege un model cu pompă.", "Cartușele se schimbă periodic — îți amintim noi."]],
        ["h2", "2. Mai simplu și compact — filtrul sub chiuvetă"],
        ["p", "Filtrul sub chiuvetă curăță apa de impuritățile principale și nu are nevoie de rezervor. E potrivit dacă apa e în general bună și vrei o soluție simplă pentru o familie de 2–4 persoane."],
        ["h2", "3. Pentru toată casa — filtrul magistral"],
        ["p", "Filtrul magistral se montează la intrarea apei în casă. Reține nisipul și rugina și protejează boilerul, mașina de spălat rufe și vase. Nu este destinat apei de băut — de obicei se pune împreună cu osmoza."],
        ["h2", "Ce să iei în calcul înainte de cumpărare"],
        ["ul", ["Câte persoane beau apă acasă.", "Dacă ai loc sub chiuvetă.", "Ce presiune a apei ai în apartament sau casă.", "Dacă ai calcar în ceainic și rugină în apă."]],
        ["p", "Nu ești sigur? Folosește alegerea filtrului de pe site sau sună-ne — te sfătuim gratuit."],
      ],
    },
  },
  {
    slug: "mify-ob-obratnom-osmose",
    tag: { ru: "Технологии", ro: "Tehnologii" },
    date: "2026-10-28",
    ru: {
      title: "5 мифов об обратном осмосе",
      description:
        "«Мёртвая вода», «вымывает минералы», «засоряется за неделю» — разбираем популярные мифы и объясняем, как на самом деле работает осмос.",
      body: [
        ["h2", "Миф 1. Осмос делает воду «мёртвой»"],
        ["p", "Вода после осмоса — это чистая вода без лишних солей и примесей. Многие системы ставят на выходе минерализатор, который добавляет кальций и магний для вкуса."],
        ["h2", "Миф 2. Без минералов из воды организм страдает"],
        ["p", "Основную часть минералов человек получает с едой, а не с водой. Если хочется привычного вкуса — выбирайте систему с минерализатором."],
        ["h2", "Миф 3. Фильтр забивается за неделю"],
        ["p", "Перед мембраной стоят предфильтры: они задерживают песок, ржавчину и хлор и берегут мембрану. При своевременной замене картриджей система спокойно работает годами."],
        ["h2", "Миф 4. Осмос сливает много воды"],
        ["p", "Часть воды действительно уходит в дренаж — так мембрана очищает себя. Современные системы делают это экономнее, а сама вода в Молдове относительно недорогая по сравнению с покупкой бутилированной."],
        ["h2", "Миф 5. Установка сложная и с ремонтом"],
        ["p", "Система ставится под мойку примерно за час. Если фильтр куплен у нас, установка бесплатная."],
      ],
    },
    ro: {
      title: "5 mituri despre osmoza inversă",
      description:
        "„Apă moartă”, „spală mineralele”, „se înfundă într-o săptămână” — demontăm miturile populare și explicăm cum funcționează de fapt osmoza.",
      body: [
        ["h2", "Mitul 1. Osmoza face apa „moartă”"],
        ["p", "Apa după osmoză este apă curată, fără săruri și impurități în exces. Multe sisteme au la ieșire un mineralizator care adaugă calciu și magneziu pentru gust."],
        ["h2", "Mitul 2. Fără minerale din apă organismul suferă"],
        ["p", "Cea mai mare parte a mineralelor o luăm din mâncare, nu din apă. Dacă vrei gustul obișnuit, alege un sistem cu mineralizator."],
        ["h2", "Mitul 3. Filtrul se înfundă într-o săptămână"],
        ["p", "Înaintea membranei sunt prefiltrele: ele rețin nisipul, rugina și clorul și protejează membrana. Cu schimbarea la timp a cartușelor, sistemul funcționează ani de zile."],
        ["h2", "Mitul 4. Osmoza consumă multă apă"],
        ["p", "O parte din apă merge într-adevăr la scurgere — așa se curăță membrana. Sistemele moderne o fac mai economic, iar apa de la robinet costă mult mai puțin decât cea îmbuteliată."],
        ["h2", "Mitul 5. Instalarea e complicată"],
        ["p", "Sistemul se montează sub chiuvetă în aproximativ o oră. Dacă filtrul e cumpărat de la noi, instalarea este gratuită."],
      ],
    },
  },
  {
    slug: "kak-ponyat-chto-membranu-pora-menyat",
    tag: { ru: "Обслуживание", ro: "Întreținere" },
    date: "2026-10-28",
    ru: {
      title: "Как понять, что мембрану пора менять",
      description:
        "Признаки износа мембраны обратного осмоса и почему не стоит менять её только по календарю.",
      body: [
        ["p", "Мембрана — главный и самый дорогой элемент осмоса. Срок её службы зависит от качества воды и от того, вовремя ли меняются предфильтры."],
        ["h2", "Признаки, что мембрана устала"],
        ["ul", ["Вода стала невкусной или появилась накипь в чайнике.", "Тестер TDS показывает, что солей в очищенной воде стало заметно больше.", "Бак наполняется дольше обычного."]],
        ["h2", "Почему не только по сроку"],
        ["p", "Если предфильтры меняются вовремя, мембрана служит дольше. Поэтому сначала проверяют воду и систему, а потом решают, нужна ли замена."],
        ["h2", "Как мы это делаем"],
        ["p", "При плановой замене картриджей мастер проверяет систему. Если мембрана ещё работает — не меняем её зря."],
      ],
    },
    ro: {
      title: "Cum îți dai seama că e timpul să schimbi membrana",
      description:
        "Semnele de uzură a membranei de osmoză inversă și de ce nu merită s-o schimbi doar după calendar.",
      body: [
        ["p", "Membrana este elementul principal și cel mai scump al osmozei. Durata ei de viață depinde de calitatea apei și de schimbarea la timp a prefiltrelor."],
        ["h2", "Semne că membrana e obosită"],
        ["ul", ["Apa are alt gust sau a apărut calcar în ceainic.", "Testerul TDS arată mult mai multe săruri în apa filtrată.", "Rezervorul se umple mai greu decât de obicei."]],
        ["h2", "De ce nu doar după termen"],
        ["p", "Dacă prefiltrele se schimbă la timp, membrana rezistă mai mult. De aceea întâi verificăm apa și sistemul, apoi decidem dacă e nevoie de înlocuire."],
        ["h2", "Cum procedăm noi"],
        ["p", "La schimbarea planificată a cartușelor meșterul verifică sistemul. Dacă membrana încă funcționează bine, nu o schimbăm degeaba."],
      ],
    },
  },
  {
    slug: "kak-proverit-bak-obratnogo-osmosa",
    tag: { ru: "Инструкция", ro: "Instrucțiune" },
    date: "2026-10-28",
    ru: {
      title: "Как проверить бак обратного осмоса",
      description:
        "Если из крана с чистой водой идёт слабая струя — возможно, дело в баке. Рассказываем, что проверить.",
      body: [
        ["p", "Накопительный бак хранит очищенную воду, чтобы она шла из крана быстро. Внутри бака — мембрана и воздушная камера с давлением."],
        ["h2", "Признаки проблем с баком"],
        ["ul", ["Слабая струя из крана с чистой водой.", "Вода быстро заканчивается, хотя система работала давно.", "Бак кажется тяжёлым, даже когда воды из крана нет."]],
        ["h2", "Что можно проверить самому"],
        ["ul", ["Открыт ли кран на баке.", "Не перегнута ли трубка от бака к крану.", "Давно ли менялись предфильтры — забитые картриджи тоже снижают напор."]],
        ["p", "Давление воздуха в баке проверяют манометром на пустом баке. Если не хотите разбираться сами — вызовите мастера, он проверит бак при замене картриджей."],
      ],
    },
    ro: {
      title: "Cum verifici rezervorul osmozei inverse",
      description:
        "Dacă din robinetul de apă curată curge un jet slab, problema poate fi la rezervor. Îți spunem ce să verifici.",
      body: [
        ["p", "Rezervorul păstrează apa filtrată ca să curgă repede din robinet. În interior are o membrană și o cameră de aer sub presiune."],
        ["h2", "Semne că rezervorul are probleme"],
        ["ul", ["Jet slab din robinetul de apă curată.", "Apa se termină repede, deși sistemul a funcționat mult timp.", "Rezervorul pare greu chiar și când din robinet nu mai curge apă."]],
        ["h2", "Ce poți verifica singur"],
        ["ul", ["Dacă robinetul de pe rezervor este deschis.", "Dacă tubul de la rezervor la robinet nu e îndoit.", "Când au fost schimbate prefiltrele — cartușele înfundate scad și ele presiunea."]],
        ["p", "Presiunea aerului din rezervor se verifică cu un manometru, pe rezervorul gol. Dacă nu vrei să te ocupi singur — cheamă meșterul, el verifică rezervorul la schimbarea cartușelor."],
      ],
    },
  },
];

export const findArticle = (slug: string) => ARTICLES.find((article) => article.slug === slug);
