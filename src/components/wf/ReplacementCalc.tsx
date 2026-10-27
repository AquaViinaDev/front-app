"use client";

import Link from "next/link";
import { useCallback, useState, type FormEvent } from "react";
import { useLocale } from "use-intl";
import { toast } from "react-toastify";
import { PhoneInput, TextInput, Button } from "@components/common";
import { sendReplacementOrder } from "@lib/api";
import { RoutesEnum } from "@types";
import formStyles from "@components/HomePage/components/CommunicationSection/CommunicationForm/CommunicationForm.module.scss";
import styles from "./ReplacementCalc.module.scss";

// Подбор по картинкам «на что похож ваш фильтр» (наши фото из каталога) → примерная цена замены → заявка с фото в Telegram.
// Цены — таблица «Цены на ЗАМЕНЫ/УСЛУГИ», строка «Всего» (по городу), листы FIL TEK и Green filter (28.10.2026):
//  закрытый тип (быстросъёмные колбы в корпусе): ROBEN / ASUS / PYRAMID;
//  открытый тип (колбы 10" на виду): Filtek 10" (открытые осмосы) / Green Filter (Польша).
// «Только предфильтры» = 3 колбы. 4 колбы или без бака при 5+ колбах — цену не считаем, «уточним».
type FilterType = "open" | "closed" | "magistral" | "undersink" | "unknown";
type Colbs = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "unknown";
type Tank = "yes" | "no" | "unknown";

const PRICES: Record<"open" | "closed", Record<string, [number, number]>> = {
  closed: { "3": [900, 970], "5": [800, 1350], "6": [1020, 1570], "7": [1290, 1840], "8": [1610, 2160] },
  open: { "3": [800, 820], "5": [1020, 1080], "6": [900, 1270], "7": [1170, 1170], "8": [1490, 1490] },
};

const estimateRange = (type: FilterType, colbs: Colbs, tank: Tank): [number, number] | null => {
  // Цены в таблице есть только для осмосов (кронштейн 10" и закрытый корпус); магистральный и под мойку — уточняем
  if (type !== "open" && type !== "closed") return null;
  if (colbs === "unknown") return null;
  if (colbs !== "3" && tank !== "yes") return null;
  return PRICES[type][colbs] ?? null;
};

// Что спрашиваем после выбора картинки: какие варианты числа колб и нужны ли вопросы про бак и насос
const FLOW: Record<FilterType, { colbs: Colbs[]; suggest?: Colbs; tank: boolean }> = {
  open: { colbs: ["3", "4", "5", "6", "7", "8"], suggest: "5", tank: true },
  closed: { colbs: ["3", "4", "5", "6", "7", "8"], suggest: "6", tank: true },
  magistral: { colbs: ["1", "2", "3"], tank: false },
  undersink: { colbs: ["1", "2", "3"], suggest: "3", tank: false },
  unknown: { colbs: [], tank: false },
};

const KINDS: { key: FilterType; img?: string }[] = [
  { key: "open", img: "/images/zamena/open.jpg" },
  { key: "closed", img: "/images/zamena/closed.jpg" },
  { key: "magistral", img: "/images/zamena/magistral.jpg" },
  { key: "undersink", img: "/images/zamena/undersink.jpg" },
  { key: "unknown" },
];

const T = {
  ru: {
    title: "Сколько стоит замена в вашем фильтре",
    sub: "Выберите картинку, похожую на ваш фильтр, и ответьте на пару вопросов — покажем примерную цену. Пришлите фото — назовём точную.",
    q1: "На что похож ваш фильтр?",
    kinds: {
      open: ["Осмос: колбы на кронштейне", "Большие колбы на виду, крышки откручиваются ключом. Есть бак"],
      closed: ["Осмос в закрытом корпусе", "Картриджи спрятаны в коробке-корпусе, меняются без ключа"],
      magistral: ["Магистральный фильтр", "1–3 большие колбы на трубе, на входе воды в квартиру или дом"],
      undersink: ["Проточный под мойку", "2–3 колбы под мойкой, без бака"],
      unknown: ["Не знаю — пришлю фото", "Сфотографируйте фильтр, мы сами определим"],
    } as Record<FilterType, [string, string]>,
    q2: "Сколько всего колб?",
    q2hint: "Считайте все колбы и цилиндры, включая мембрану. Бак не считайте.",
    suggest: "обычно",
    more: "8 и больше",
    q3: "Есть ли бак для воды?",
    q4: "Есть ли насос (моторчик для напора)?",
    yes: "Есть",
    no: "Нет",
    dontKnow: "Не знаю",
    step: (n: number, total: number) => `Шаг ${n} из ${total}`,
    back: "← Назад",
    resultTitle: "Примерная цена замены",
    range: (a: number, b: number) => (a === b ? `около ${a} лей` : `от ${a} до ${b} лей`),
    noPrice: "Цену уточним по телефону",
    noPriceText: "Для такого фильтра цена зависит от модели. Пришлите фото — подскажем точно.",
    note: "Картриджи + работа, по Кишинёву. За городом бывает на 100 лей дороже. Если картриджей на 700 лей и больше — работа бесплатно.",
    photo: "Фото фильтра (до 3 штук)",
    photoHint: "Сфотографируйте фильтр целиком — так мы точно поймём, какие картриджи нужны.",
    addPhoto: "Прикрепить фото",
    remove: "Убрать",
    send: "Отправить заявку",
    sending: "Отправляем…",
    ok: "Заявка отправлена! Перезвоним в ближайшее время.",
    err: "Не получилось отправить. Позвоните нам или попробуйте ещё раз.",
    tooMany: "Можно прикрепить не больше 3 фото",
    tooBig: "Фото больше 8 МБ — выберите другое",
    consent: "Я согласен(а) с обработкой персональных данных в соответствии с ",
    policy: "Политикой конфиденциальности",
    again: "Посчитать заново",
  },
  ro: {
    title: "Cât costă înlocuirea în filtrul tău",
    sub: "Alege imaginea care seamănă cu filtrul tău și răspunde la câteva întrebări — îți arătăm prețul aproximativ. Trimite o poză — îți spunem prețul exact.",
    q1: "Cu ce seamănă filtrul tău?",
    kinds: {
      open: ["Osmoză: carcase pe suport", "Carcase mari la vedere, capacele se deșurubează cu cheia. Are rezervor"],
      closed: ["Osmoză în carcasă închisă", "Cartușele sunt ascunse într-o cutie, se schimbă fără cheie"],
      magistral: ["Filtru magistral", "1–3 carcase mari pe țeavă, la intrarea apei în apartament sau casă"],
      undersink: ["Filtru sub chiuvetă", "2–3 carcase sub chiuvetă, fără rezervor"],
      unknown: ["Nu știu — trimit o poză", "Fotografiază filtrul, îl identificăm noi"],
    } as Record<FilterType, [string, string]>,
    q2: "Câte carcase are în total?",
    q2hint: "Numără toate carcasele și cilindrii, inclusiv membrana. Rezervorul nu se numără.",
    suggest: "de obicei",
    more: "8 sau mai multe",
    q3: "Are rezervor pentru apă?",
    q4: "Are pompă (motoraș pentru presiune)?",
    yes: "Da",
    no: "Nu",
    dontKnow: "Nu știu",
    step: (n: number, total: number) => `Pasul ${n} din ${total}`,
    back: "← Înapoi",
    resultTitle: "Prețul aproximativ al înlocuirii",
    range: (a: number, b: number) => (a === b ? `aproximativ ${a} lei` : `de la ${a} până la ${b} lei`),
    noPrice: "Prețul îl stabilim la telefon",
    noPriceText: "Pentru un astfel de filtru prețul depinde de model. Trimite o poză — îți spunem exact.",
    note: "Cartușe + lucrare, în Chișinău. În afara orașului poate fi cu 100 de lei mai scump. Dacă cartușele costă 700 de lei sau mai mult — lucrarea e gratuită.",
    photo: "Poze cu filtrul (până la 3)",
    photoHint: "Fotografiază filtrul întreg — așa înțelegem exact ce cartușe îți trebuie.",
    addPhoto: "Atașează o poză",
    remove: "Șterge",
    send: "Trimite cererea",
    sending: "Trimitem…",
    ok: "Cererea a fost trimisă! Te sunăm în curând.",
    err: "Nu s-a putut trimite. Sună-ne sau încearcă din nou.",
    tooMany: "Poți atașa cel mult 3 poze",
    tooBig: "Poza depășește 8 MB — alege alta",
    consent: "Sunt de acord cu prelucrarea datelor personale conform ",
    policy: "Politicii de confidențialitate",
    again: "Calculează din nou",
  },
};

const MAX_FILES = 3;
const MAX_SIZE = 8 * 1024 * 1024;

const ReplacementCalc = () => {
  const locale = useLocale() === "ro" ? "ro" : "ru";
  const t = T[locale];

  const [type, setType] = useState<FilterType | null>(null);
  const [colbs, setColbs] = useState<Colbs | null>(null);
  const [tank, setTank] = useState<Tank | null>(null);
  const [pump, setPump] = useState<Tank | null>(null);
  const [name, setName] = useState<string | null>("");
  const [phone, setPhone] = useState<string | null>("");
  const [files, setFiles] = useState<File[]>([]);
  const [accepted, setAccepted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const flow = type ? FLOW[type] : null;
  // Какие вопросы остались для выбранного вида фильтра
  const steps: Array<"kind" | "colbs" | "tank" | "pump"> = ["kind"];
  if (flow && flow.colbs.length) steps.push("colbs");
  if (flow && flow.tank) steps.push("tank", "pump");
  const current =
    type === null
      ? "kind"
      : flow!.colbs.length && colbs === null
        ? "colbs"
        : flow!.tank && tank === null
          ? "tank"
          : flow!.tank && pump === null
            ? "pump"
            : "result";
  const stepIndex = current === "result" ? steps.length : steps.indexOf(current);

  const range = type && current === "result" ? estimateRange(type, colbs ?? "unknown", tank ?? "unknown") : null;
  const estimateText = range ? t.range(range[0], range[1]) : t.noPrice;

  const back = () => {
    if (pump !== null) setPump(null);
    else if (tank !== null) setTank(null);
    else if (colbs !== null) setColbs(null);
    else setType(null);
  };

  const reset = () => {
    setType(null);
    setColbs(null);
    setTank(null);
    setPump(null);
    setSent(false);
  };

  const addFiles = useCallback(
    (list: FileList | null) => {
      if (!list) return;
      const next = [...files];
      for (const file of Array.from(list)) {
        if (next.length >= MAX_FILES) {
          toast.error(t.tooMany);
          break;
        }
        if (file.size > MAX_SIZE) {
          toast.error(t.tooBig);
          continue;
        }
        next.push(file);
      }
      setFiles(next);
    },
    [files, t]
  );

  const canSend = !!name && !!phone && phone.length > 10 && accepted && !sending;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSend || !type) return;
    const form = new FormData();
    form.append("name", name!);
    form.append("phone", phone!);
    form.append("filterType", type);
    form.append("colbs", colbs ?? "unknown");
    form.append("tank", tank ?? "unknown");
    form.append("pump", pump ?? "unknown");
    form.append("estimate", estimateText);
    form.append("locale", locale);
    form.append("page", typeof window !== "undefined" ? window.location.pathname : "");
    files.forEach((file) => form.append("photos", file));
    setSending(true);
    try {
      await sendReplacementOrder(form, locale);
      toast.success(t.ok);
      setSent(true);
      setName("");
      setPhone("");
      setFiles([]);
      setAccepted(false);
    } catch {
      toast.error(t.err);
    } finally {
      setSending(false);
    }
  };

  const option = (label: string, onClick: () => void, highlight = false, sub?: string) => (
    <button
      type="button"
      className={`${styles.option} ${highlight ? styles.optionSuggested : ""}`}
      onClick={onClick}
      key={label}
    >
      <span>
        <strong>{label}</strong>
        {sub ? <small>{sub}</small> : null}
      </span>
    </button>
  );

  const yesNo = (set: (v: Tank) => void) => (
    <div className={styles.optionsGrid}>
      {option(t.yes, () => set("yes"))}
      {option(t.no, () => set("no"))}
      {option(t.dontKnow, () => set("unknown"))}
    </div>
  );

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>{t.title}</h2>
      <p className={styles.sub}>{t.sub}</p>

      {current !== "result" ? (
        <div className={styles.card}>
          {current !== "kind" && <p className={styles.progress}>{t.step(stepIndex + 1, steps.length)}</p>}
          {current !== "kind" && (
            <div className={styles.bar}>
              <span style={{ width: `${(stepIndex / steps.length) * 100}%` }} />
            </div>
          )}

          {current === "kind" && (
            <>
              <h3 className={styles.question}>{t.q1}</h3>
              <div className={styles.gallery}>
                {KINDS.map((kind) => (
                  <button
                    type="button"
                    key={kind.key}
                    className={styles.kind}
                    onClick={() => setType(kind.key)}
                  >
                    {kind.img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={kind.img} alt={t.kinds[kind.key][0]} loading="lazy" />
                    ) : (
                      <span className={styles.kindPhoto}>📷</span>
                    )}
                    <strong>{t.kinds[kind.key][0]}</strong>
                    <small>{t.kinds[kind.key][1]}</small>
                  </button>
                ))}
              </div>
            </>
          )}

          {current === "colbs" && flow && (
            <>
              <h3 className={styles.question}>{t.q2}</h3>
              <p className={styles.hint}>{t.q2hint}</p>
              <div className={styles.optionsGrid}>
                {flow.colbs.map((n) =>
                  option(
                    n === "8" ? t.more : n,
                    () => setColbs(n),
                    flow.suggest === n,
                    flow.suggest === n ? t.suggest : undefined
                  )
                )}
                {option(t.dontKnow, () => setColbs("unknown"))}
              </div>
            </>
          )}

          {current === "tank" && (
            <>
              <h3 className={styles.question}>{t.q3}</h3>
              {yesNo(setTank)}
            </>
          )}

          {current === "pump" && (
            <>
              <h3 className={styles.question}>{t.q4}</h3>
              {yesNo(setPump)}
            </>
          )}

          {current !== "kind" && (
            <button type="button" className={styles.back} onClick={back}>
              {t.back}
            </button>
          )}
        </div>
      ) : (
        <div className={styles.card}>
          <p className={styles.progress}>{t.resultTitle}</p>
          <p className={styles.price}>{estimateText}</p>
          <p className={styles.note}>{range ? t.note : t.noPriceText}</p>

          {sent ? (
            <button type="button" className={styles.back} onClick={reset}>
              {t.again}
            </button>
          ) : (
            <form className={formStyles.form} onSubmit={submit}>
              <div className={styles.photos}>
                <p className={styles.photoTitle}>{t.photo}</p>
                <p className={styles.hint}>{t.photoHint}</p>
                <div className={styles.thumbs}>
                  {files.map((file, i) => (
                    <div className={styles.thumb} key={`${file.name}-${i}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={URL.createObjectURL(file)} alt="" />
                      <button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))}>
                        {t.remove}
                      </button>
                    </div>
                  ))}
                  {files.length < MAX_FILES && (
                    <label className={styles.addPhoto}>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          addFiles(e.target.files);
                          e.target.value = "";
                        }}
                      />
                      <span>📷 {t.addPhoto}</span>
                    </label>
                  )}
                </div>
              </div>
              <TextInput required value={name} onChange={(v: string | null) => setName(v ?? "")} />
              <PhoneInput value={phone} onChange={(v: string | null) => setPhone(v ?? "")} />
              <label className={formStyles.consentLabel}>
                <input
                  className={formStyles.checkbox}
                  type="checkbox"
                  checked={accepted}
                  onChange={(event) => setAccepted(event.target.checked)}
                />
                <span className={formStyles.consentText}>
                  {t.consent}
                  <Link
                    className={formStyles.policyLink}
                    href={`/${locale}${RoutesEnum.PrivacyPolicy}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.policy}
                  </Link>
                </span>
              </label>
              <Button className={formStyles.button} disabled={!canSend}>
                {sending ? t.sending : t.send}
              </Button>
              <button type="button" className={styles.back} onClick={back}>
                {t.back}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default ReplacementCalc;
