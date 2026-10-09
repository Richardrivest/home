/* @ds-bundle: {"format":4,"namespace":"Didactica","components":[{"name":"Page"},{"name":"TitlePage"},{"name":"TableOfContents"},{"name":"ChapterOpener"},{"name":"BoxLegend"},{"name":"Heading"},{"name":"Paragraph"},{"name":"BulletList"},{"name":"Bibliography"},{"name":"Cite"},{"name":"Quote"},{"name":"BlockQuote"},{"name":"KeyPoints"},{"name":"Objectives"},{"name":"Important"},{"name":"CommonMistake"},{"name":"Classroom"},{"name":"ThinkFurther"},{"name":"SelfCheck"},{"name":"Activities"},{"name":"ReferencesBox"},{"name":"AlignmentTable"},{"name":"Box"},{"name":"Icon"},{"name":"DataTable"},{"name":"Figure"},{"name":"Numbering"},{"name":"FigRef"},{"name":"ConceptWeb"},{"name":"CycleDiagram"},{"name":"Pyramid"},{"name":"ProcessFlow"},{"name":"TreeDiagram"},{"name":"ConceptMap"},{"name":"MindMap"},{"name":"VennDiagram"},{"name":"QuadrantMatrix"},{"name":"Timeline"},{"name":"Fishbone"},{"name":"Spectrum"},{"name":"Funnel"},{"name":"Staircase"},{"name":"NestedCircles"},{"name":"Iceberg"},{"name":"GlossaryEntry"},{"name":"Reference"},{"name":"Term"},{"name":"Glossary"}]} */
window.Didactica = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // global:react
  var require_react = __commonJS({
    "global:react"(exports, module) {
      module.exports = window.React;
    }
  });

  // src/index.js
  var index_exports = {};
  __export(index_exports, {
    Activities: () => Activities,
    AlignmentTable: () => AlignmentTable,
    BLOOM: () => BLOOM,
    Bibliography: () => Bibliography,
    BlockQuote: () => BlockQuote,
    Box: () => Box,
    BoxLegend: () => BoxLegend,
    BulletList: () => BulletList,
    ChapterOpener: () => ChapterOpener,
    Cite: () => Cite,
    Classroom: () => Classroom,
    CommonMistake: () => CommonMistake,
    ConceptMap: () => ConceptMap,
    ConceptWeb: () => ConceptWeb,
    CycleDiagram: () => CycleDiagram,
    DataTable: () => DataTable,
    FigRef: () => FigRef,
    Figure: () => Figure,
    Fishbone: () => Fishbone,
    Funnel: () => Funnel,
    Glossary: () => Glossary,
    GlossaryEntry: () => GlossaryEntry,
    Heading: () => Heading,
    Iceberg: () => Iceberg,
    Icon: () => Icon,
    Important: () => Important,
    KeyPoints: () => KeyPoints,
    MindMap: () => MindMap,
    NestedCircles: () => NestedCircles,
    Numbering: () => Numbering,
    Objectives: () => Objectives,
    Page: () => Page,
    Paragraph: () => Paragraph,
    ProcessFlow: () => ProcessFlow,
    Pyramid: () => Pyramid,
    QuadrantMatrix: () => QuadrantMatrix,
    Quote: () => Quote,
    Reference: () => Reference,
    ReferencesBox: () => ReferencesBox,
    SelfCheck: () => SelfCheck,
    Spectrum: () => Spectrum,
    Staircase: () => Staircase,
    TableOfContents: () => TableOfContents,
    Term: () => Term,
    ThinkFurther: () => ThinkFurther,
    Timeline: () => Timeline,
    TitlePage: () => TitlePage,
    TreeDiagram: () => TreeDiagram,
    VennDiagram: () => VennDiagram,
    authorList: () => authorList2,
    bloomLevel: () => bloomLevel,
    checkAlignment: () => checkAlignment,
    formatCitation: () => formatCitation,
    formatCitations: () => formatCitations,
    formatLocator: () => formatLocator,
    objectiveId: () => objectiveId,
    orderWorks: () => orderWorks,
    referenceSegments: () => referenceSegments,
    referenceText: () => referenceText,
    yearLabels: () => yearLabels
  });

  // src/components/Page.jsx
  var import_react = __toESM(require_react(), 1);
  function Page({ header, page, children, className = "" }) {
    return /* @__PURE__ */ import_react.default.createElement("section", { className: `du-page ${className}`.trim() }, header ? /* @__PURE__ */ import_react.default.createElement("p", { className: "du-running-header running" }, header) : null, children, page != null ? /* @__PURE__ */ import_react.default.createElement("p", { className: "du-page-footer running" }, "P\xE1gina ", page) : null);
  }

  // src/components/TitlePage.jsx
  var import_react2 = __toESM(require_react(), 1);

  // src/boxes.config.json
  var boxes_config_default = [
    { kind: "keypoints", family: "open", title: "Puntos Clave", icon: "key-round", component: "KeyPoints", placement: "Opens each unit, right after the unit title and lead." },
    { kind: "objectives", family: "open", title: "Objetivos", icon: "target", component: "Objectives", placement: "Right after \u201CPuntos Clave\u201D." },
    { kind: "important", family: "text", title: "Importante", icon: "star", component: "Important", placement: "In the text, for a key concept or definition." },
    { kind: "mistake", family: "text", title: "Error Frecuente", icon: "triangle-alert", component: "CommonMistake", placement: "In the text, next to the idea it corrects." },
    { kind: "example", family: "text", title: "En el Aula", icon: "school", component: "Classroom", placement: "In the text, after the concept it applies." },
    { kind: "thinking", family: "close", title: "Para Seguir Pensando", icon: "message-circle-question", component: "ThinkFurther", placement: "Closing sequence, first." },
    { kind: "selfcheck", family: "close", title: "Autoevaluaci\xF3n", icon: "list-checks", component: "SelfCheck", placement: "Closing sequence, after \u201CPara Seguir Pensando\u201D." },
    { kind: "activities", family: "close", title: "Actividades", icon: "pencil-line", component: "Activities", placement: "Closing sequence, after \u201CAutoevaluaci\xF3n\u201D, followed by the alignment table." },
    { kind: "references", family: "close", title: "Referencias", icon: "book-open-text", component: "ReferencesBox", placement: "Closes each unit." }
  ];

  // src/components/TitlePage.jsx
  var VARIANTS = ["mosaic", "band", "motif", "editorial"];
  function Slot({ text, className }) {
    const placeholder = /^\[.*\]$/.test(String(text).trim());
    return /* @__PURE__ */ import_react2.default.createElement("p", { className: `${className}${placeholder ? " du-placeholder" : ""}` }, text);
  }
  function Mosaic() {
    return /* @__PURE__ */ import_react2.default.createElement("div", { className: "du-cover-mosaic", "aria-hidden": "true" }, boxes_config_default.map((b) => /* @__PURE__ */ import_react2.default.createElement("span", { key: b.kind, className: "du-cover-mosaic__cell", style: { background: `var(--${b.kind}-accent)` } })));
  }
  function Motif() {
    return /* @__PURE__ */ import_react2.default.createElement("svg", { className: "du-cover-motif", viewBox: "0 0 400 400", "aria-hidden": "true", focusable: "false" }, [200, 155, 110, 65].map((r, i) => /* @__PURE__ */ import_react2.default.createElement("circle", { key: r, cx: "400", cy: "400", r: r * 2, className: `du-dg-ramp--${4 - i}` })));
  }
  function TitlePage({ variant = "mosaic", bleed = false, volume, kicker, title, subtitle, lede, ribbon, credits = [], meta = [] }) {
    const v = VARIANTS.includes(variant) ? variant : "mosaic";
    const head = /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null, v === "editorial" && volume != null ? /* @__PURE__ */ import_react2.default.createElement("p", { className: "du-cover-volume", "aria-hidden": "true" }, String(volume).padStart(2, "0")) : null, kicker ? /* @__PURE__ */ import_react2.default.createElement("p", { className: "du-title-page__kicker cover-kicker" }, kicker) : null, /* @__PURE__ */ import_react2.default.createElement("h1", { className: "du-title-page__title cover-title" }, title), v !== "band" ? /* @__PURE__ */ import_react2.default.createElement("span", { className: "du-cover-rule", "aria-hidden": "true" }) : null);
    return /* @__PURE__ */ import_react2.default.createElement("header", { className: `du-title-page du-title-page--${v}${bleed ? " du-title-page--bleed" : ""}` }, v === "mosaic" ? /* @__PURE__ */ import_react2.default.createElement(Mosaic, null) : null, v === "motif" ? /* @__PURE__ */ import_react2.default.createElement(Motif, null) : null, /* @__PURE__ */ import_react2.default.createElement("div", { className: "du-title-page__top" }, v === "band" ? /* @__PURE__ */ import_react2.default.createElement("div", { className: "du-cover-band" }, head) : head, subtitle ? /* @__PURE__ */ import_react2.default.createElement("p", { className: "du-title-page__subtitle cover-subtitle" }, subtitle) : null, lede ? /* @__PURE__ */ import_react2.default.createElement("p", { className: "du-title-page__lede cover-lede" }, lede) : null), /* @__PURE__ */ import_react2.default.createElement("div", { className: "du-title-page__bottom" }, ribbon ? /* @__PURE__ */ import_react2.default.createElement("p", { className: "du-ribbon ribbon" }, ribbon) : null, credits.length ? /* @__PURE__ */ import_react2.default.createElement("div", { className: "du-title-page__credits" }, credits.map((line, i) => /* @__PURE__ */ import_react2.default.createElement(Slot, { key: i, text: line, className: "cover-credit" }))) : null, meta.length ? /* @__PURE__ */ import_react2.default.createElement("div", { className: "du-title-page__meta" }, meta.map((line, i) => /* @__PURE__ */ import_react2.default.createElement(Slot, { key: i, text: line, className: "cover-meta" }))) : null));
  }

  // src/components/TableOfContents.jsx
  var import_react3 = __toESM(require_react(), 1);
  function TableOfContents({ title = "\xCDndice", entries }) {
    return /* @__PURE__ */ import_react3.default.createElement("nav", { "aria-label": title }, /* @__PURE__ */ import_react3.default.createElement("h2", { className: "du-toc-title toc-title" }, title), /* @__PURE__ */ import_react3.default.createElement("ol", { className: "du-toc" }, entries.map((e, i) => /* @__PURE__ */ import_react3.default.createElement("li", { key: i, className: `du-toc__entry du-toc__entry--${e.level || 1} body` }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "du-toc__title" }, e.title), /* @__PURE__ */ import_react3.default.createElement("span", { className: "du-toc__leader", "aria-hidden": "true" }), /* @__PURE__ */ import_react3.default.createElement("span", { className: "du-toc__page" }, e.page)))));
  }

  // src/components/ChapterOpener.jsx
  var import_react4 = __toESM(require_react(), 1);
  function ChapterOpener({ number, title, lead, id }) {
    return /* @__PURE__ */ import_react4.default.createElement("header", { className: "du-chapter" }, number != null ? /* @__PURE__ */ import_react4.default.createElement("p", { className: "du-chapter__kicker chapter-kicker" }, "Unidad ", number) : null, /* @__PURE__ */ import_react4.default.createElement("h1", { id, className: "du-chapter__title h1" }, title), lead ? /* @__PURE__ */ import_react4.default.createElement("p", { className: "du-chapter__lead lead" }, lead) : null);
  }

  // src/components/Heading.jsx
  var import_react5 = __toESM(require_react(), 1);
  var TAGS = { 1: "h1", 2: "h2", 3: "h3" };
  function Heading({ level = 2, children, id }) {
    const l = TAGS[level] ? level : 2;
    const Tag = TAGS[l];
    return /* @__PURE__ */ import_react5.default.createElement(Tag, { id, className: `du-h${l} h${l}` }, children);
  }

  // src/components/Paragraph.jsx
  var import_react6 = __toESM(require_react(), 1);
  function Paragraph({ children }) {
    return /* @__PURE__ */ import_react6.default.createElement("p", { className: "du-body body" }, children);
  }

  // src/components/BulletList.jsx
  var import_react7 = __toESM(require_react(), 1);
  function BulletList({ items }) {
    return /* @__PURE__ */ import_react7.default.createElement("ul", { className: "du-list" }, items.map((item, i) => {
      const text = typeof item === "string" ? item : item.text;
      const sub = typeof item === "string" ? null : item.items;
      return /* @__PURE__ */ import_react7.default.createElement("li", { key: i, className: "du-list__item list-item" }, text, sub && sub.length ? /* @__PURE__ */ import_react7.default.createElement(BulletList, { items: sub }) : null);
    }));
  }

  // src/components/Quote.jsx
  var import_react10 = __toESM(require_react(), 1);

  // src/components/Cite.jsx
  var import_react9 = __toESM(require_react(), 1);

  // src/cite.js
  var authorList = (authors, joiner) => {
    const a = [].concat(authors);
    if (a.length >= 3) return `${a[0]} et al.`;
    if (a.length === 2) return `${a[0]} ${joiner} ${a[1]}`;
    return a[0] ?? "";
  };
  var formatLocator = ({ page, locator }) => {
    if (locator) return locator;
    if (page == null || page === "") return "";
    const p = String(page).trim().replace(/\s*[-–]\s*/, "\u2013");
    return `${p.includes("\u2013") ? "pp." : "p."} ${p}`;
  };
  var tail = (w) => [w.year, formatLocator(w)].filter(Boolean).join(", ");
  function formatCitation(work, { narrative = false } = {}) {
    if (narrative) return `${authorList(work.authors, "y")} (${tail(work)})`;
    return `(${authorList(work.authors, "&")}, ${tail(work)})`;
  }
  function formatCitations(works) {
    const sorted = [...works].sort((x, y) => String([].concat(x.authors)[0]).localeCompare(String([].concat(y.authors)[0]), "es"));
    return `(${sorted.map((w) => `${authorList(w.authors, "&")}, ${tail(w)}`).join("; ")})`;
  }

  // src/components/Bibliography.jsx
  var import_react8 = __toESM(require_react(), 1);

  // src/references.js
  var initials = (given = "") => given.trim().split(/\s+/).filter(Boolean).map(
    (part) => part.split("-").map((p) => /^[A-ZÁÉÍÓÚÑÜ]\.?$/u.test(p) ? p.replace(/\.?$/, ".") : `${p[0].toUpperCase()}.`).join("-")
  ).join(" ");
  var nameInverted = (a) => a.literal ? a.literal : `${a.family}, ${initials(a.given)}`.replace(/, $/, "") + (a.suffix ? `, ${a.suffix}` : "");
  var nameDirect = (a) => a.literal ? a.literal : `${initials(a.given)} ${a.family}`.trim();
  var surname = (a) => a.literal || a.family;
  function authorList2(authors) {
    const names = authors.map(nameInverted);
    if (names.length === 1) return names[0];
    if (names.length <= 20) return `${names.slice(0, -1).join(", ")}, & ${names[names.length - 1]}`;
    return `${names.slice(0, 19).join(", ")}, . . . ${names[names.length - 1]}`;
  }
  var end = (s) => /[.?!]$/.test(s) ? s : `${s}.`;
  var dash = (p) => String(p).replace(/\s*[-–]\s*/, "\u2013");
  var doiUrl = (w) => w.doi ? `https://doi.org/${w.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//, "")}` : w.url || "";
  function referenceSegments(w, yearLabel = w.year ?? "s. f.") {
    const seg = [];
    const t = (text, italic = false) => text && seg.push({ text, italic });
    const authors = w.authors && w.authors.length ? authorList2(w.authors) : null;
    const date = w.type === "web" && w.date ? `${yearLabel}, ${w.date}` : yearLabel;
    if (authors) t(`${end(authors)} (${date}). `);
    const ed = w.edition ? ` (${w.edition}.\xAA ed.)` : "";
    switch (w.type) {
      case "article": {
        if (!authors) t(`${end(w.title)} (${date}). `);
        else t(`${end(w.title)} `);
        t(`${w.journal}${w.volume ? `, ${w.volume}` : ""}`, true);
        t(`${w.issue ? `(${w.issue})` : ""}${w.pages ? `, ${dash(w.pages)}` : ""}${w.articleNumber ? `, Art\xEDculo ${w.articleNumber}` : ""}.`);
        break;
      }
      case "chapter": {
        if (!authors) t(`${end(w.title)} (${date}). `);
        else t(`${end(w.title)} `);
        const eds = (w.editors || []).map(nameDirect);
        const edList = eds.length > 1 ? `${eds.slice(0, -1).join(", ")} & ${eds[eds.length - 1]}` : eds[0];
        t(edList ? `En ${edList} (${eds.length > 1 ? "Eds." : "Ed."}), ` : "En ");
        t(w.container, true);
        t(` (${[w.edition ? `${w.edition}.\xAA ed.` : "", w.pages ? `pp. ${dash(w.pages)}` : ""].filter(Boolean).join(", ")}). ${end(w.publisher || "")}`.replace(" (). ", ". "));
        break;
      }
      case "web": {
        if (!authors) {
          t(w.title, true);
          t(`. (${date}). `);
        } else {
          t(w.title, true);
          t(". ");
        }
        if (w.site) t(`${end(w.site)} `);
        break;
      }
      default: {
        if (!authors) {
          t(w.title, true);
          t(`${ed}. (${date}). `);
        } else {
          t(w.title, true);
          t(`${ed}. `);
        }
        if (w.publisher) t(`${end(w.publisher)} `);
      }
    }
    const link = doiUrl(w);
    if (link) t(seg.length && !seg[seg.length - 1].text.endsWith(" ") ? ` ${link}` : link);
    const last = seg[seg.length - 1];
    if (last) last.text = last.text.replace(/\s+$/, "");
    return seg;
  }
  var referenceText = (w, yearLabel) => referenceSegments(w, yearLabel).map((s) => s.text).join("");
  var normal = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  var sortKey = (w) => normal((w.authors && w.authors.length ? w.authors.map(nameInverted).join(" ") : w.title) || "");
  function orderWorks(works) {
    return [...works].sort((a, b) => sortKey(a).localeCompare(sortKey(b), "es") || String(a.year ?? "").localeCompare(String(b.year ?? "")) || normal(a.title).localeCompare(normal(b.title), "es"));
  }
  function yearLabels(works) {
    const groups = /* @__PURE__ */ new Map();
    for (const w of orderWorks(works)) {
      const k = `${sortKey(w)}|${w.year ?? "s. f."}`;
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k).push(w);
    }
    const labels = {};
    for (const list of groups.values()) {
      list.forEach((w, i) => {
        labels[w.id] = `${w.year ?? "s. f."}${list.length > 1 ? (w.year ? "" : "-") + String.fromCharCode(97 + i) : ""}`;
      });
    }
    return labels;
  }

  // src/components/Bibliography.jsx
  var BibliographyContext = (0, import_react8.createContext)(null);
  function Bibliography({ works, children }) {
    const cited = (0, import_react8.useRef)(/* @__PURE__ */ new Set());
    cited.current = /* @__PURE__ */ new Set();
    const byId = Object.fromEntries(works.map((w) => [w.id, w]));
    const labels = yearLabels(works);
    return /* @__PURE__ */ import_react8.default.createElement(BibliographyContext.Provider, { value: { byId, labels, cited: cited.current, works } }, children);
  }
  var useBibliography = () => (0, import_react8.useContext)(BibliographyContext);
  function resolveWork(bib, ref) {
    if (!ref || !ref.id) return ref;
    const w = bib && bib.byId[ref.id];
    if (!w) return { authors: [`[obra sin registrar: ${ref.id}]`], year: "", page: ref.page, locator: ref.locator };
    bib.cited.add(ref.id);
    return { authors: (w.authors || []).map(surname), year: bib.labels[w.id], page: ref.page, locator: ref.locator };
  }

  // src/components/Cite.jsx
  function useCitationText({ narrative = false, works, ...work }) {
    const bib = useBibliography();
    if (works) return formatCitations(works.map((w) => resolveWork(bib, w)));
    return formatCitation(resolveWork(bib, work), { narrative });
  }
  function Cite(props) {
    return /* @__PURE__ */ import_react9.default.createElement("cite", { className: "du-cite" }, useCitationText(props));
  }

  // src/components/Quote.jsx
  function Quote({ children, cite }) {
    const citeText = useCitationText(cite || {});
    return /* @__PURE__ */ import_react10.default.createElement(import_react10.default.Fragment, null, /* @__PURE__ */ import_react10.default.createElement("q", { className: "du-quote" }, children), cite ? /* @__PURE__ */ import_react10.default.createElement(import_react10.default.Fragment, null, " ", /* @__PURE__ */ import_react10.default.createElement("cite", { className: "du-cite" }, citeText)) : null);
  }
  function BlockQuote({ children, cite }) {
    const citeText = useCitationText(cite || {});
    return /* @__PURE__ */ import_react10.default.createElement("blockquote", { className: "du-blockquote blockquote" }, children, cite ? /* @__PURE__ */ import_react10.default.createElement(import_react10.default.Fragment, null, " ", /* @__PURE__ */ import_react10.default.createElement("cite", { className: "du-cite" }, citeText)) : null);
  }

  // src/components/Icon.jsx
  var import_react11 = __toESM(require_react(), 1);

  // src/icons.generated.js
  var ICONS = {
    "key-round": [
      [
        "path",
        {
          "d": "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
        }
      ],
      [
        "circle",
        {
          "cx": "16.5",
          "cy": "7.5",
          "r": ".5",
          "fill": "currentColor"
        }
      ]
    ],
    "target": [
      [
        "circle",
        {
          "cx": "12",
          "cy": "12",
          "r": "10"
        }
      ],
      [
        "circle",
        {
          "cx": "12",
          "cy": "12",
          "r": "6"
        }
      ],
      [
        "circle",
        {
          "cx": "12",
          "cy": "12",
          "r": "2"
        }
      ]
    ],
    "star": [
      [
        "path",
        {
          "d": "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
        }
      ]
    ],
    "triangle-alert": [
      [
        "path",
        {
          "d": "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"
        }
      ],
      [
        "path",
        {
          "d": "M12 9v4"
        }
      ],
      [
        "path",
        {
          "d": "M12 17h.01"
        }
      ]
    ],
    "school": [
      [
        "path",
        {
          "d": "M14 22v-4a2 2 0 1 0-4 0v4"
        }
      ],
      [
        "path",
        {
          "d": "m18 10 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7.382a1 1 0 0 1 .553-.894L6 10"
        }
      ],
      [
        "path",
        {
          "d": "M18 5v17"
        }
      ],
      [
        "path",
        {
          "d": "m4 6 7.106-3.553a2 2 0 0 1 1.788 0L20 6"
        }
      ],
      [
        "path",
        {
          "d": "M6 5v17"
        }
      ],
      [
        "circle",
        {
          "cx": "12",
          "cy": "9",
          "r": "2"
        }
      ]
    ],
    "message-circle-question": [
      [
        "path",
        {
          "d": "M7.9 20A9 9 0 1 0 4 16.1L2 22Z"
        }
      ],
      [
        "path",
        {
          "d": "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
        }
      ],
      [
        "path",
        {
          "d": "M12 17h.01"
        }
      ]
    ],
    "list-checks": [
      [
        "path",
        {
          "d": "m3 17 2 2 4-4"
        }
      ],
      [
        "path",
        {
          "d": "m3 7 2 2 4-4"
        }
      ],
      [
        "path",
        {
          "d": "M13 6h8"
        }
      ],
      [
        "path",
        {
          "d": "M13 12h8"
        }
      ],
      [
        "path",
        {
          "d": "M13 18h8"
        }
      ]
    ],
    "pencil-line": [
      [
        "path",
        {
          "d": "M12 20h9"
        }
      ],
      [
        "path",
        {
          "d": "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"
        }
      ],
      [
        "path",
        {
          "d": "m15 5 3 3"
        }
      ]
    ],
    "book-open-text": [
      [
        "path",
        {
          "d": "M12 7v14"
        }
      ],
      [
        "path",
        {
          "d": "M16 12h2"
        }
      ],
      [
        "path",
        {
          "d": "M16 8h2"
        }
      ],
      [
        "path",
        {
          "d": "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
        }
      ],
      [
        "path",
        {
          "d": "M6 12h2"
        }
      ],
      [
        "path",
        {
          "d": "M6 8h2"
        }
      ]
    ]
  };

  // src/components/Icon.jsx
  function Icon({ name, size = 20, label, className = "" }) {
    const parts = ICONS[name];
    if (!parts) return null;
    return /* @__PURE__ */ import_react11.default.createElement(
      "svg",
      {
        className: `du-icon ${className}`.trim(),
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        role: label ? "img" : void 0,
        "aria-label": label,
        "aria-hidden": label ? void 0 : "true",
        focusable: "false"
      },
      parts.map(([tag, attrs], i) => import_react11.default.createElement(tag, { key: i, ...attrs }))
    );
  }

  // src/components/Boxes.jsx
  var import_react13 = __toESM(require_react(), 1);

  // src/bloom.js
  var BLOOM = [
    { id: "recordar", level: 1, name: "Recordar", verbs: ["definir", "enumerar", "identificar", "nombrar", "reconocer", "recuperar"] },
    { id: "comprender", level: 2, name: "Comprender", verbs: ["explicar", "describir", "clasificar", "resumir", "ejemplificar", "interpretar"] },
    { id: "aplicar", level: 3, name: "Aplicar", verbs: ["aplicar", "utilizar", "resolver", "implementar", "ejecutar", "demostrar"] },
    { id: "analizar", level: 4, name: "Analizar", verbs: ["analizar", "comparar", "distinguir", "organizar", "diferenciar", "relacionar"] },
    { id: "evaluar", level: 5, name: "Evaluar", verbs: ["evaluar", "juzgar", "fundamentar", "valorar", "argumentar", "criticar"] },
    { id: "crear", level: 6, name: "Crear", verbs: ["dise\xF1ar", "elaborar", "planificar", "producir", "construir", "formular"] }
  ];
  var bloomLevel = (id) => BLOOM.find((b) => b.id === String(id).toLowerCase()) || null;

  // src/alignment.js
  var objectiveId = (o, i) => o.id || `O${i + 1}`;
  function checkAlignment(objectives, activities) {
    const ids = objectives.map(objectiveId);
    const rows = objectives.map((o, i) => ({ id: ids[i], level: bloomLevel(o.level), text: o.text, activities: [], problems: [] }));
    const issues = [];
    activities.forEach((a, n) => {
      const num = n + 1;
      for (const ref of a.objectives || []) {
        const row = rows.find((r) => r.id === ref);
        if (!row) {
          issues.push(`Actividad ${num}: el objetivo ${ref} no existe.`);
          continue;
        }
        row.activities.push(num);
        const al = bloomLevel(a.level);
        if (al && row.level && al.level < row.level.level) {
          const msg = `Actividad ${num} (${al.name}) est\xE1 por debajo del nivel de ${ref} (${row.level.name}).`;
          row.problems.push(msg);
          issues.push(msg);
        }
      }
    });
    for (const r of rows) if (!r.activities.length) {
      const msg = `${r.id} no tiene ninguna actividad.`;
      r.problems.push(msg);
      issues.push(msg);
    }
    return { rows, issues };
  }

  // src/components/Reference.jsx
  var import_react12 = __toESM(require_react(), 1);
  function Reference({ children }) {
    return /* @__PURE__ */ import_react12.default.createElement("p", { className: "du-reference reference" }, children);
  }

  // src/components/Boxes.jsx
  var CONFIG = Object.fromEntries(boxes_config_default.map((b) => [b.kind, b]));
  function Box({ kind, title, children, extraHeader }) {
    const id = (0, import_react13.useId)();
    const cfg = CONFIG[kind] || CONFIG.important;
    return /* @__PURE__ */ import_react13.default.createElement("aside", { className: `du-box du-box--${cfg.kind} du-box--family-${cfg.family}`, "aria-labelledby": id }, /* @__PURE__ */ import_react13.default.createElement("div", { className: "du-box__header" }, /* @__PURE__ */ import_react13.default.createElement(Icon, { name: cfg.icon, className: "du-box__icon" }), /* @__PURE__ */ import_react13.default.createElement("p", { id, className: "du-box__title box-title" }, title || cfg.title), extraHeader), /* @__PURE__ */ import_react13.default.createElement("div", { className: "du-box__body box-body" }, children));
  }
  function KeyPoints({ items, before, title }) {
    return /* @__PURE__ */ import_react13.default.createElement(Box, { kind: "keypoints", title }, /* @__PURE__ */ import_react13.default.createElement("ul", { className: "du-box__list" }, items.map((it, i) => /* @__PURE__ */ import_react13.default.createElement("li", { key: i }, it))), before && before.length ? /* @__PURE__ */ import_react13.default.createElement("div", { className: "du-box__before" }, /* @__PURE__ */ import_react13.default.createElement("p", { className: "du-box__label" }, "Antes de leer:"), /* @__PURE__ */ import_react13.default.createElement("ul", { className: "du-box__list du-box__list--questions" }, before.map((q, i) => /* @__PURE__ */ import_react13.default.createElement("li", { key: i }, q)))) : null);
  }
  var LevelTag = ({ level }) => {
    const lvl = bloomLevel(level);
    return /* @__PURE__ */ import_react13.default.createElement("span", { className: "du-tag tag", title: lvl ? `Nivel ${lvl.level} de Bloom` : void 0 }, lvl ? `${lvl.level} \xB7 ${lvl.name}` : level);
  };
  function Objectives({ items, intro = "Al finalizar la unidad, usted ser\xE1 capaz de:", title }) {
    return /* @__PURE__ */ import_react13.default.createElement(Box, { kind: "objectives", title }, intro ? /* @__PURE__ */ import_react13.default.createElement("p", { className: "du-box__intro" }, intro) : null, /* @__PURE__ */ import_react13.default.createElement("ol", { className: "du-box__list du-box__list--objectives" }, items.map((it, i) => /* @__PURE__ */ import_react13.default.createElement("li", { key: i, id: `obj-${objectiveId(it, i)}`, "data-level": it.level }, /* @__PURE__ */ import_react13.default.createElement("span", { className: "du-box__oid" }, objectiveId(it, i)), /* @__PURE__ */ import_react13.default.createElement("span", { className: "du-box__otext" }, it.text)))));
  }
  function Important({ term, children, title }) {
    return /* @__PURE__ */ import_react13.default.createElement(Box, { kind: "important", title }, term ? /* @__PURE__ */ import_react13.default.createElement("p", { className: "du-box__term" }, term) : null, /* @__PURE__ */ import_react13.default.createElement("div", { className: "du-box__text" }, children));
  }
  function CommonMistake({ misconception, correction, explanation, children, title }) {
    return /* @__PURE__ */ import_react13.default.createElement(Box, { kind: "mistake", title }, /* @__PURE__ */ import_react13.default.createElement("p", { className: "du-box__pair" }, /* @__PURE__ */ import_react13.default.createElement("span", { className: "du-box__label" }, "Creencia frecuente:"), " ", misconception), /* @__PURE__ */ import_react13.default.createElement("p", { className: "du-box__pair" }, /* @__PURE__ */ import_react13.default.createElement("span", { className: "du-box__label" }, "Lo que muestra la evidencia:"), " ", correction), explanation ? /* @__PURE__ */ import_react13.default.createElement("p", { className: "du-box__pair" }, /* @__PURE__ */ import_react13.default.createElement("span", { className: "du-box__label" }, "Por qu\xE9 no se sostiene:"), " ", explanation) : null, children ? /* @__PURE__ */ import_react13.default.createElement("div", { className: "du-box__text" }, children) : null);
  }
  var DISCIPLINES = { sociales: "Ciencias Sociales", salud: "Ciencias de la Salud", general: "Did\xE1ctica general" };
  function Classroom({ discipline, situation, decision, rationale, title }) {
    const tag = discipline ? /* @__PURE__ */ import_react13.default.createElement("span", { className: "du-tag tag du-box__discipline" }, DISCIPLINES[discipline] || discipline) : null;
    return /* @__PURE__ */ import_react13.default.createElement(Box, { kind: "example", title, extraHeader: tag }, /* @__PURE__ */ import_react13.default.createElement("p", { className: "du-box__pair" }, /* @__PURE__ */ import_react13.default.createElement("span", { className: "du-box__label" }, "Situaci\xF3n:"), " ", situation), /* @__PURE__ */ import_react13.default.createElement("p", { className: "du-box__pair" }, /* @__PURE__ */ import_react13.default.createElement("span", { className: "du-box__label" }, "Decisi\xF3n did\xE1ctica:"), " ", decision), rationale ? /* @__PURE__ */ import_react13.default.createElement("p", { className: "du-box__pair" }, /* @__PURE__ */ import_react13.default.createElement("span", { className: "du-box__label" }, "Fundamento:"), " ", rationale) : null);
  }
  function ThinkFurther({ questions, revisit, title }) {
    return /* @__PURE__ */ import_react13.default.createElement(Box, { kind: "thinking", title }, /* @__PURE__ */ import_react13.default.createElement("ol", { className: "du-box__list du-box__list--numbered" }, questions.map((q, i) => /* @__PURE__ */ import_react13.default.createElement("li", { key: i }, q))), revisit && revisit.length ? /* @__PURE__ */ import_react13.default.createElement("div", { className: "du-box__before du-box__revisit" }, /* @__PURE__ */ import_react13.default.createElement("p", { className: "du-box__label" }, "Vuelva a las preguntas del comienzo:"), /* @__PURE__ */ import_react13.default.createElement("ul", { className: "du-box__list du-box__list--questions" }, revisit.map((q, i) => /* @__PURE__ */ import_react13.default.createElement("li", { key: i }, q))), /* @__PURE__ */ import_react13.default.createElement("p", { className: "du-box__hint" }, "\xBFResponder\xEDa hoy lo mismo que antes de leer la unidad? \xBFQu\xE9 cambi\xF3 y por qu\xE9?")) : null);
  }
  function SelfCheck({ items, title }) {
    return /* @__PURE__ */ import_react13.default.createElement(Box, { kind: "selfcheck", title }, /* @__PURE__ */ import_react13.default.createElement("ol", { className: "du-box__list du-box__list--numbered" }, items.map((it, i) => /* @__PURE__ */ import_react13.default.createElement("li", { key: i }, /* @__PURE__ */ import_react13.default.createElement("div", { className: "du-box__q" }, it.review ? /* @__PURE__ */ import_react13.default.createElement("span", { className: "du-tag tag" }, "Repaso \xB7 ", it.review) : null, /* @__PURE__ */ import_react13.default.createElement("span", null, it.question), /* @__PURE__ */ import_react13.default.createElement("details", { className: "du-box__answer" }, /* @__PURE__ */ import_react13.default.createElement("summary", null, "Ver respuesta"), /* @__PURE__ */ import_react13.default.createElement("p", null, it.answer)))))), /* @__PURE__ */ import_react13.default.createElement("div", { className: "du-box__key", "aria-hidden": "true" }, /* @__PURE__ */ import_react13.default.createElement("p", { className: "du-box__label" }, "Clave de respuestas"), /* @__PURE__ */ import_react13.default.createElement("ol", null, items.map((it, i) => /* @__PURE__ */ import_react13.default.createElement("li", { key: i }, it.answer)))));
  }
  var ACTIVITY_TYPES = { pregunta: "Pregunta", tarea: "Tarea", caso: "Caso", debate: "Debate" };
  function Activities({ items, title }) {
    return /* @__PURE__ */ import_react13.default.createElement(Box, { kind: "activities", title }, /* @__PURE__ */ import_react13.default.createElement("ol", { className: "du-box__list du-box__list--numbered" }, items.map((it, i) => {
      const obj = typeof it === "string" ? { text: it } : it;
      return /* @__PURE__ */ import_react13.default.createElement("li", { key: i }, /* @__PURE__ */ import_react13.default.createElement("div", { className: "du-box__q" }, /* @__PURE__ */ import_react13.default.createElement("span", { className: "du-box__tags" }, obj.type ? /* @__PURE__ */ import_react13.default.createElement("span", { className: "du-tag tag" }, ACTIVITY_TYPES[obj.type] || obj.type) : null, obj.level ? /* @__PURE__ */ import_react13.default.createElement(LevelTag, { level: obj.level }) : null, (obj.objectives || []).map((o) => /* @__PURE__ */ import_react13.default.createElement("a", { key: o, className: "du-tag du-tag--link tag", href: `#obj-${o}` }, o))), /* @__PURE__ */ import_react13.default.createElement("span", null, obj.text)));
    })));
  }
  function ReferencesBox({ children, title, auto = false, all = false }) {
    const bib = useBibliography();
    let content = children;
    if ((auto || all) && bib) {
      const works = orderWorks(all ? bib.works : bib.works.filter((w) => bib.cited.has(w.id)));
      content = works.map((w) => /* @__PURE__ */ import_react13.default.createElement(Reference, { key: w.id }, referenceSegments(w, bib.labels[w.id]).map((sg, i) => sg.italic ? /* @__PURE__ */ import_react13.default.createElement("i", { key: i }, sg.text) : /* @__PURE__ */ import_react13.default.createElement(import_react13.default.Fragment, { key: i }, sg.text))));
    }
    return /* @__PURE__ */ import_react13.default.createElement(Box, { kind: "references", title }, /* @__PURE__ */ import_react13.default.createElement("div", { className: "du-box__refs" }, content));
  }
  function AlignmentTable({ objectives, activities, title = "Alineamiento de la unidad" }) {
    const { rows } = checkAlignment(objectives, activities);
    return /* @__PURE__ */ import_react13.default.createElement("figure", { className: "du-table-figure du-alignment" }, /* @__PURE__ */ import_react13.default.createElement("p", { className: "du-table-figure__title table-title" }, title), /* @__PURE__ */ import_react13.default.createElement("div", { className: "du-table-scroll" }, /* @__PURE__ */ import_react13.default.createElement("table", { className: "du-table du-table--concept" }, /* @__PURE__ */ import_react13.default.createElement("thead", null, /* @__PURE__ */ import_react13.default.createElement("tr", null, /* @__PURE__ */ import_react13.default.createElement("th", { scope: "col", className: "table-head" }, "Objetivo"), /* @__PURE__ */ import_react13.default.createElement("th", { scope: "col", className: "table-head" }, "Nivel"), /* @__PURE__ */ import_react13.default.createElement("th", { scope: "col", className: "table-head" }, "Actividades"), /* @__PURE__ */ import_react13.default.createElement("th", { scope: "col", className: "table-head" }, "Estado"))), /* @__PURE__ */ import_react13.default.createElement("tbody", null, rows.map((r) => /* @__PURE__ */ import_react13.default.createElement("tr", { key: r.id }, /* @__PURE__ */ import_react13.default.createElement("th", { scope: "row", className: "table-cell" }, r.id), /* @__PURE__ */ import_react13.default.createElement("td", { className: "table-cell" }, r.level ? r.level.name : "\u2014"), /* @__PURE__ */ import_react13.default.createElement("td", { className: "table-cell" }, r.activities.length ? r.activities.join(", ") : "\u2014"), /* @__PURE__ */ import_react13.default.createElement("td", { className: `table-cell ${r.problems.length ? "du-alignment__bad" : "du-alignment__ok"}` }, r.problems.length ? r.problems.join(" ") : "Alineado")))))));
  }
  function BoxLegend() {
    const families = [["open", "Al abrir la unidad"], ["text", "Dentro del texto"], ["close", "Al cerrar la unidad"]];
    return /* @__PURE__ */ import_react13.default.createElement("div", { className: "du-legend" }, families.map(([f, label]) => /* @__PURE__ */ import_react13.default.createElement("section", { key: f, className: "du-legend__family" }, /* @__PURE__ */ import_react13.default.createElement("p", { className: "du-legend__label chapter-kicker" }, label), /* @__PURE__ */ import_react13.default.createElement("ul", { className: "du-legend__list" }, boxes_config_default.filter((b) => b.family === f).map((b) => /* @__PURE__ */ import_react13.default.createElement("li", { key: b.kind, className: `du-legend__item du-box--${b.kind} du-box--family-${b.family}` }, /* @__PURE__ */ import_react13.default.createElement("span", { className: "du-legend__swatch" }, /* @__PURE__ */ import_react13.default.createElement(Icon, { name: b.icon, size: 18 })), /* @__PURE__ */ import_react13.default.createElement("span", { className: "du-legend__name box-title" }, b.title)))))));
  }

  // src/components/DataTable.jsx
  var import_react15 = __toESM(require_react(), 1);

  // src/components/Numbering.jsx
  var import_react14 = __toESM(require_react(), 1);
  var NumberingContext = (0, import_react14.createContext)({ figures: {}, tables: {} });
  function Numbering({ figures = [], tables = [], firstFigure = 1, firstTable = 1, children }) {
    const index = (ids, first) => Object.fromEntries(ids.map((id, i) => [id, i + first]));
    return /* @__PURE__ */ import_react14.default.createElement(NumberingContext.Provider, { value: { figures: index(figures, firstFigure), tables: index(tables, firstTable) } }, children);
  }
  function useNumber(kind, id) {
    const ctx = (0, import_react14.useContext)(NumberingContext);
    return id ? ctx[kind === "table" ? "tables" : "figures"][id] : void 0;
  }
  function FigRef({ to, paren = false }) {
    const ctx = (0, import_react14.useContext)(NumberingContext);
    const fig = ctx.figures[to];
    const tab = ctx.tables[to];
    const label = fig ? `Figura ${fig}` : tab ? `Tabla ${tab}` : `[referencia sin destino: ${to}]`;
    const text = paren ? `(v\xE9ase la ${label})` : label;
    return /* @__PURE__ */ import_react14.default.createElement("a", { className: "du-figref", href: `#${fig ? "fig" : "tab"}-${to}` }, text);
  }

  // src/components/DataTable.jsx
  function DataTable({ columns, rows, widths, number, id, title, note, rowHeader = false, filled = false }) {
    const auto = useNumber("table", id);
    number = number ?? auto;
    return /* @__PURE__ */ import_react15.default.createElement("figure", { className: "du-table-figure", id: id ? `tab-${id}` : void 0 }, number != null ? /* @__PURE__ */ import_react15.default.createElement("p", { className: "du-table-figure__number table-number" }, "Tabla ", number) : null, title ? /* @__PURE__ */ import_react15.default.createElement("p", { className: "du-table-figure__title table-title" }, title) : null, /* @__PURE__ */ import_react15.default.createElement("div", { className: "du-table-scroll" }, /* @__PURE__ */ import_react15.default.createElement("table", { className: `du-table${rowHeader ? " du-table--concept" : ""}${filled ? " du-table--filled" : ""}` }, widths ? /* @__PURE__ */ import_react15.default.createElement("colgroup", null, widths.map((w, i) => /* @__PURE__ */ import_react15.default.createElement("col", { key: i, style: { width: w } }))) : null, /* @__PURE__ */ import_react15.default.createElement("thead", null, /* @__PURE__ */ import_react15.default.createElement("tr", null, columns.map((c, i) => /* @__PURE__ */ import_react15.default.createElement("th", { key: i, scope: "col", className: "table-head" }, c)))), /* @__PURE__ */ import_react15.default.createElement("tbody", null, rows.map((row, r) => /* @__PURE__ */ import_react15.default.createElement("tr", { key: r }, row.map(
      (cell, c) => rowHeader && c === 0 ? /* @__PURE__ */ import_react15.default.createElement("th", { key: c, scope: "row", className: "table-cell" }, cell) : /* @__PURE__ */ import_react15.default.createElement("td", { key: c, className: "table-cell" }, cell)
    )))))), note ? /* @__PURE__ */ import_react15.default.createElement("p", { className: "du-note note" }, /* @__PURE__ */ import_react15.default.createElement("i", null, "Nota."), " ", note) : null);
  }

  // src/components/Figure.jsx
  var import_react16 = __toESM(require_react(), 1);
  function Figure({ number, id, title, note, children }) {
    const auto = useNumber("figure", id);
    number = number ?? auto;
    return /* @__PURE__ */ import_react16.default.createElement("figure", { className: "du-figure", id: id ? `fig-${id}` : void 0 }, number != null ? /* @__PURE__ */ import_react16.default.createElement("p", { className: "du-figure__number table-number" }, "Figura ", number) : null, title ? /* @__PURE__ */ import_react16.default.createElement("p", { className: "du-figure__title table-title" }, title) : null, /* @__PURE__ */ import_react16.default.createElement("div", { className: "du-figure__body" }, children), note ? /* @__PURE__ */ import_react16.default.createElement("p", { className: "du-note note" }, /* @__PURE__ */ import_react16.default.createElement("i", null, "Nota."), " ", note) : null);
  }

  // src/components/ConceptWeb.jsx
  var import_react18 = __toESM(require_react(), 1);

  // src/diagram-utils.js
  function wrap(text, max) {
    const words = String(text).split(/\s+/);
    const lines = [];
    let line = "";
    for (const w of words) {
      if (!line) line = w;
      else if ((line + " " + w).length <= max) line += " " + w;
      else {
        lines.push(line);
        line = w;
      }
    }
    if (line) lines.push(line);
    return lines;
  }
  var textWidth = (s, px = 14) => s.length * px * 0.5;

  // src/components/diagrams/parts.jsx
  var import_react17 = __toESM(require_react(), 1);
  var LH = 18;
  function DiagramFrame({ width, height, label, warn, list, children }) {
    return /* @__PURE__ */ import_react17.default.createElement("div", { className: "du-diagram-wrap" }, /* @__PURE__ */ import_react17.default.createElement(DiagramScroll, { label }, /* @__PURE__ */ import_react17.default.createElement("svg", { className: "du-diagram", viewBox: `0 0 ${width} ${height}`, role: "img", "aria-label": label, "data-warn": warn || void 0 }, children)), /* @__PURE__ */ import_react17.default.createElement(DiagramText, null, /* @__PURE__ */ import_react17.default.createElement("div", { className: "du-diagram-list" }, list)));
  }
  function DiagramScroll({ label, children }) {
    return /* @__PURE__ */ import_react17.default.createElement(import_react17.default.Fragment, null, /* @__PURE__ */ import_react17.default.createElement("div", { className: "du-diagram-scroll", tabIndex: 0, role: "group", "aria-label": label }, children), /* @__PURE__ */ import_react17.default.createElement("p", { className: "du-diagram-hint", "aria-hidden": "true" }, "Desliz\xE1 para ver el diagrama completo \u2192"));
  }
  function DiagramText({ children }) {
    return /* @__PURE__ */ import_react17.default.createElement("details", { className: "du-diagram-text" }, /* @__PURE__ */ import_react17.default.createElement("summary", { className: "diagram-label" }, "Ver como texto"), children);
  }
  function useArrow() {
    const id = `ar${(0, import_react17.useId)().replace(/:/g, "")}`;
    const defs = /* @__PURE__ */ import_react17.default.createElement("defs", null, /* @__PURE__ */ import_react17.default.createElement("marker", { id, viewBox: "0 0 10 10", refX: "9", refY: "5", markerWidth: "7", markerHeight: "7", orient: "auto-start-reverse" }, /* @__PURE__ */ import_react17.default.createElement("path", { className: "du-dg-arrowhead", d: "M 0 0 L 10 5 L 0 10 z" })));
    return [defs, `url(#${id})`];
  }
  function boxSize(title, text, chars = 16, minW = 90) {
    const t = wrap(title, chars);
    const d = text ? wrap(text, chars + 4) : [];
    const w = Math.max(minW, ...t.map((l) => textWidth(l, 16)), ...d.map((l) => textWidth(l, 14))) + 24;
    return { t, d, w, h: (t.length + d.length) * LH + 16 };
  }
  function NodeBox({ x, y, title, text, strong = false, chars = 16, minW, className = "" }) {
    const { t, d, w, h } = boxSize(title, text, chars, minW);
    const top = y - h / 2;
    return /* @__PURE__ */ import_react17.default.createElement("g", { className }, /* @__PURE__ */ import_react17.default.createElement("rect", { className: strong ? "du-dg-node du-dg-node--strong" : "du-dg-node", x: x - w / 2, y: top, width: w, height: h }), t.map((l, i) => /* @__PURE__ */ import_react17.default.createElement("text", { key: i, className: `du-dg-text diagram-title${strong ? " du-dg-text--on-strong" : ""}`, x, y: top + 8 + LH * (i + 0.75), textAnchor: "middle" }, l)), d.map((l, i) => /* @__PURE__ */ import_react17.default.createElement("text", { key: `d${i}`, className: `du-dg-text diagram-label${strong ? " du-dg-text--on-strong" : ""}`, x, y: top + 8 + LH * (t.length + i + 0.75), textAnchor: "middle" }, l)));
  }
  function Lines({ x, y, lines, anchor = "start", className = "diagram-label", muted = false, title = false }) {
    const cls = title && !className.includes("diagram-title") ? `diagram-title ${className.replace("diagram-label", "")}`.trim() : className;
    return lines.map((l, i) => /* @__PURE__ */ import_react17.default.createElement("text", { key: i, className: `du-dg-text ${cls}${muted ? " du-dg-text--muted" : ""}`, x, y: y + i * LH, textAnchor: anchor }, l));
  }
  function EdgeLabel({ x, y, text }) {
    const w = textWidth(text, 14) + 10;
    return /* @__PURE__ */ import_react17.default.createElement("g", null, /* @__PURE__ */ import_react17.default.createElement("rect", { className: "du-dg-relation-bg", x: x - w / 2, y: y - 11, width: w, height: 20 }), /* @__PURE__ */ import_react17.default.createElement("text", { className: "du-dg-relation", x, y: y + 4, textAnchor: "middle" }, text));
  }
  var rampFor = (i, n, darkFirst = true) => {
    const k = n <= 1 ? 1 : Math.round((darkFirst ? i : n - 1 - i) * 3 / (n - 1)) + 1;
    return Math.min(4, Math.max(1, k));
  };

  // src/components/ConceptWeb.jsx
  var W = 680;
  var LH2 = 18;
  function Node({ x, y, lines, strong, detail = [] }) {
    const all = [...lines, ...detail];
    const w = Math.max(96, ...lines.map((l) => textWidth(l, 16)), ...detail.map((l) => textWidth(l, 14))) + 24;
    const h = all.length * LH2 + 16;
    const top = y - h / 2;
    return /* @__PURE__ */ import_react18.default.createElement("g", null, /* @__PURE__ */ import_react18.default.createElement("rect", { className: strong ? "du-dg-node du-dg-node--strong" : "du-dg-node", x: x - w / 2, y: top, width: w, height: h }), lines.map((l, i) => /* @__PURE__ */ import_react18.default.createElement("text", { key: i, className: `du-dg-text diagram-title${strong ? " du-dg-text--on-strong" : ""}`, x, y: top + 8 + LH2 * (i + 0.75), textAnchor: "middle" }, l)), detail.map((l, i) => /* @__PURE__ */ import_react18.default.createElement("text", { key: `d${i}`, className: "du-dg-text diagram-label", x, y: top + 8 + LH2 * (lines.length + i + 0.75), textAnchor: "middle" }, l)));
  }
  function ConceptWeb({ center, nodes, label }) {
    const long = nodes.filter((nd) => wrap(nd.label, 18).length > 3).map((nd) => nd.label);
    const n = nodes.length;
    const rows = nodes.map((nd) => wrap(nd.label, 18).length + (nd.detail ? wrap(nd.detail, 22).length : 0));
    const H6 = Math.max(360, 260 + Math.max(...rows, 1) * LH2 * 2);
    const cx = W / 2, cy = H6 / 2, rx = 250, ry = H6 / 2 - 30 - Math.max(...rows, 1) * LH2 / 2;
    const pos = nodes.map((_, i) => {
      const a = -Math.PI / 2 + 2 * Math.PI * i / n;
      return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
    });
    const aria = label || `Red conceptual: ${center}`;
    return /* @__PURE__ */ import_react18.default.createElement("div", { className: "du-diagram-wrap" }, /* @__PURE__ */ import_react18.default.createElement(DiagramScroll, { label: aria }, /* @__PURE__ */ import_react18.default.createElement("svg", { className: "du-diagram", viewBox: `0 0 ${W} ${H6}`, role: "img", "aria-label": aria, "data-warn": long.length ? `label-long: ${long.join(" | ")}` : void 0 }, pos.map(([x, y], i) => /* @__PURE__ */ import_react18.default.createElement("line", { key: i, className: "du-dg-edge", x1: cx, y1: cy, x2: x, y2: y })), /* @__PURE__ */ import_react18.default.createElement(Node, { x: cx, y: cy, lines: wrap(center, 16), strong: true }), nodes.map((nd, i) => /* @__PURE__ */ import_react18.default.createElement(Node, { key: i, x: pos[i][0], y: pos[i][1], lines: wrap(nd.label, 18), detail: nd.detail ? wrap(nd.detail, 22) : [] })), nodes.map((nd, i) => nd.relation ? /* @__PURE__ */ import_react18.default.createElement("g", { key: `r${i}` }, /* @__PURE__ */ import_react18.default.createElement("rect", { className: "du-dg-relation-bg", x: (cx + pos[i][0]) / 2 - textWidth(nd.relation, 14) / 2 - 4, y: (cy + pos[i][1]) / 2 - 10, width: textWidth(nd.relation, 14) + 8, height: 18 }), /* @__PURE__ */ import_react18.default.createElement("text", { className: "du-dg-relation", x: (cx + pos[i][0]) / 2, y: (cy + pos[i][1]) / 2 + 3, textAnchor: "middle" }, nd.relation)) : null))), /* @__PURE__ */ import_react18.default.createElement(DiagramText, null, /* @__PURE__ */ import_react18.default.createElement("div", { className: "du-diagram-list" }, /* @__PURE__ */ import_react18.default.createElement("p", { className: "du-diagram-list__center diagram-title" }, center), /* @__PURE__ */ import_react18.default.createElement("ul", null, nodes.map((nd, i) => /* @__PURE__ */ import_react18.default.createElement("li", { key: i, className: "diagram-label" }, nd.relation ? /* @__PURE__ */ import_react18.default.createElement("span", { className: "du-diagram-list__rel" }, nd.relation, " ") : null, /* @__PURE__ */ import_react18.default.createElement("strong", null, nd.label), nd.detail ? /* @__PURE__ */ import_react18.default.createElement("span", { className: "du-diagram-list__detail" }, " \xB7 ", nd.detail) : null))))));
  }

  // src/components/CycleDiagram.jsx
  var import_react19 = __toESM(require_react(), 1);
  var W2 = 680;
  var H = 420;
  var LH3 = 18;
  function CycleDiagram({ steps, center, label }) {
    const id = (0, import_react19.useId)().replace(/:/g, "");
    const n = steps.length;
    const cx = W2 / 2, cy = H / 2, R = 155;
    const ang = (i) => -Math.PI / 2 + 2 * Math.PI * i / n;
    const gap = Math.min(0.42, Math.PI / n * 0.7);
    const arc = (i) => {
      const a1 = ang(i) + gap, a2 = ang(i + 1) - gap;
      const p = (a) => [cx + R * Math.cos(a), cy + R * Math.sin(a)];
      const [x1, y1] = p(a1), [x2, y2] = p(a2);
      return `M ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2}`;
    };
    const aria = label || `Ciclo: ${steps.map((s) => s.title).join(", ")}`;
    return /* @__PURE__ */ import_react19.default.createElement("div", { className: "du-diagram-wrap" }, /* @__PURE__ */ import_react19.default.createElement(DiagramScroll, { label: aria }, /* @__PURE__ */ import_react19.default.createElement("svg", { className: "du-diagram", viewBox: `0 0 ${W2} ${H}`, role: "img", "aria-label": aria }, /* @__PURE__ */ import_react19.default.createElement("defs", null, /* @__PURE__ */ import_react19.default.createElement("marker", { id: `a${id}`, viewBox: "0 0 10 10", refX: "8", refY: "5", markerWidth: "7", markerHeight: "7", orient: "auto-start-reverse" }, /* @__PURE__ */ import_react19.default.createElement("path", { className: "du-dg-arrowhead", d: "M 0 0 L 10 5 L 0 10 z" }))), steps.map((_, i) => /* @__PURE__ */ import_react19.default.createElement("path", { key: i, className: "du-dg-edge du-dg-edge--arc", d: arc(i), markerEnd: `url(#a${id})` })), center ? wrap(center, 16).map((l, i, arr) => /* @__PURE__ */ import_react19.default.createElement("text", { key: i, className: "du-dg-text du-dg-text--muted diagram-title", x: cx, y: cy + (i - (arr.length - 1) / 2) * LH3 + 5, textAnchor: "middle" }, l)) : null, steps.map((s, i) => {
      const x = cx + R * Math.cos(ang(i)), y = cy + R * Math.sin(ang(i));
      const t = wrap(s.title, 16), d = s.text ? wrap(s.text, 20) : [];
      const w = Math.max(...t.map((l) => textWidth(l, 16)), ...d.map((l) => textWidth(l, 14)), 80) + 24;
      const h = (t.length + d.length) * LH3 + 16, top = y - h / 2;
      return /* @__PURE__ */ import_react19.default.createElement("g", { key: i }, /* @__PURE__ */ import_react19.default.createElement("rect", { className: "du-dg-node", x: x - w / 2, y: top, width: w, height: h }), t.map((l, j) => /* @__PURE__ */ import_react19.default.createElement("text", { key: j, className: "du-dg-text diagram-title", x, y: top + 8 + LH3 * (j + 0.75), textAnchor: "middle" }, l)), d.map((l, j) => /* @__PURE__ */ import_react19.default.createElement("text", { key: `d${j}`, className: "du-dg-text diagram-label", x, y: top + 8 + LH3 * (t.length + j + 0.75), textAnchor: "middle" }, l)));
    }))), /* @__PURE__ */ import_react19.default.createElement(DiagramText, null, /* @__PURE__ */ import_react19.default.createElement("div", { className: "du-diagram-list" }, center ? /* @__PURE__ */ import_react19.default.createElement("p", { className: "du-diagram-list__center diagram-title" }, center) : null, /* @__PURE__ */ import_react19.default.createElement("ol", { className: "du-diagram-list__cycle" }, steps.map((s, i) => /* @__PURE__ */ import_react19.default.createElement("li", { key: i, className: "diagram-label" }, /* @__PURE__ */ import_react19.default.createElement("strong", null, s.title), s.text ? /* @__PURE__ */ import_react19.default.createElement("span", { className: "du-diagram-list__detail" }, " \xB7 ", s.text) : null))), /* @__PURE__ */ import_react19.default.createElement("p", { className: "du-diagram-list__note diagram-label" }, "\u21BB Despu\xE9s del paso ", steps.length, ", el ciclo vuelve al paso 1."))));
  }

  // src/components/Pyramid.jsx
  var import_react20 = __toESM(require_react(), 1);
  var W3 = 680;
  var LH4 = 18;
  var LEVEL_H = 72;
  var PW = 330;
  function Pyramid({ levels, label }) {
    const n = levels.length;
    const H6 = n * LEVEL_H + 8;
    const cx = PW / 2 + 4;
    const halfAt = (y) => PW / 2 * (y / (n * LEVEL_H));
    const longApex = levels[0] && wrap(levels[0].title, 10).length > 1;
    const aria = label || `Pir\xE1mide: ${levels.map((l) => l.title).join(", ")}`;
    return /* @__PURE__ */ import_react20.default.createElement("div", { className: "du-diagram-wrap" }, /* @__PURE__ */ import_react20.default.createElement(DiagramScroll, { label: aria }, /* @__PURE__ */ import_react20.default.createElement("svg", { className: "du-diagram", viewBox: `0 0 ${W3} ${H6}`, role: "img", "aria-label": aria, "data-warn": longApex ? `label-long: ${levels[0].title}` : void 0 }, levels.map((lv, i) => {
      const y1 = i * LEVEL_H, y2 = (i + 1) * LEVEL_H - 4;
      const pts = [[cx - halfAt(y1), y1 + 4], [cx + halfAt(y1), y1 + 4], [cx + halfAt(y2 + 4), y2 + 4], [cx - halfAt(y2 + 4), y2 + 4]];
      const ramp = Math.min(i + 1 + Math.max(0, 4 - n), 4);
      const t = wrap(lv.title, i === 0 ? 10 : 18);
      const d = lv.text ? wrap(lv.text, 40) : [];
      const mid = (y1 + y2) / 2 + 4;
      return /* @__PURE__ */ import_react20.default.createElement("g", { key: i }, /* @__PURE__ */ import_react20.default.createElement("polygon", { className: `du-dg-ramp du-dg-ramp--${ramp}`, points: pts.map((p) => p.join(",")).join(" ") }), t.map((l, j) => /* @__PURE__ */ import_react20.default.createElement("text", { key: j, className: `du-dg-text diagram-title du-dg-on-ramp--${ramp}`, x: cx, y: mid + (j - (t.length - 1) / 2) * LH4 + 5, textAnchor: "middle" }, l)), /* @__PURE__ */ import_react20.default.createElement("line", { className: "du-dg-leader", x1: cx + halfAt(mid) + 8, y1: mid, x2: PW + 24, y2: mid }), d.map((l, j) => /* @__PURE__ */ import_react20.default.createElement("text", { key: `d${j}`, className: "du-dg-text diagram-label", x: PW + 32, y: mid + (j - (d.length - 1) / 2) * LH4 + 5 }, l)));
    }))), /* @__PURE__ */ import_react20.default.createElement(DiagramText, null, /* @__PURE__ */ import_react20.default.createElement("ol", { className: "du-diagram-list du-diagram-list--pyramid" }, levels.map((lv, i) => {
      const ramp = Math.min(i + 1 + Math.max(0, 4 - n), 4);
      return /* @__PURE__ */ import_react20.default.createElement("li", { key: i, className: `du-diagram-list__level du-dg-bar--${ramp}` }, /* @__PURE__ */ import_react20.default.createElement("strong", { className: `diagram-title du-dg-on-bar--${ramp}` }, lv.title), lv.text ? /* @__PURE__ */ import_react20.default.createElement("span", { className: "diagram-label" }, lv.text) : null);
    }))));
  }

  // src/components/ProcessFlow.jsx
  var import_react21 = __toESM(require_react(), 1);
  function ProcessFlow({ steps, label }) {
    return /* @__PURE__ */ import_react21.default.createElement("ol", { className: "du-flow", "aria-label": label }, steps.map((s, i) => /* @__PURE__ */ import_react21.default.createElement("li", { key: i, className: "du-flow__step" }, /* @__PURE__ */ import_react21.default.createElement("span", { className: "du-flow__num diagram-title", "aria-hidden": "true" }, i + 1), /* @__PURE__ */ import_react21.default.createElement("span", { className: "du-flow__title diagram-title" }, s.title), s.text ? /* @__PURE__ */ import_react21.default.createElement("span", { className: "du-flow__text diagram-label" }, s.text) : null)));
  }

  // src/components/GlossaryEntry.jsx
  var import_react22 = __toESM(require_react(), 1);
  function GlossaryEntry({ term, id, children }) {
    return /* @__PURE__ */ import_react22.default.createElement("p", { className: "du-glossary glossary", id: id ? `gl-${id}` : void 0 }, /* @__PURE__ */ import_react22.default.createElement("dfn", { className: "du-glossary__term" }, term, ":"), " ", children);
  }

  // src/components/Glossary.jsx
  var import_react23 = __toESM(require_react(), 1);
  function Glossary({ entries }) {
    const sorted = [...entries].sort((a, b) => a.term.localeCompare(b.term, "es", { sensitivity: "base" }));
    return /* @__PURE__ */ import_react23.default.createElement("div", { className: "du-glossary-list" }, sorted.map((e) => /* @__PURE__ */ import_react23.default.createElement(GlossaryEntry, { key: e.id, id: e.id, term: e.term }, e.definition)));
  }
  function Term({ to, children }) {
    return /* @__PURE__ */ import_react23.default.createElement("a", { className: "du-term", href: `#gl-${to}` }, children);
  }

  // src/components/diagrams/TreeDiagram.jsx
  var import_react24 = __toESM(require_react(), 1);
  var SLOT = 150;
  var LEVEL = 110;
  var listOf = (n) => /* @__PURE__ */ import_react24.default.createElement("li", { key: n.label }, /* @__PURE__ */ import_react24.default.createElement("strong", null, n.label), n.detail ? /* @__PURE__ */ import_react24.default.createElement("span", { className: "du-diagram-list__detail" }, " \xB7 ", n.detail) : null, n.children && n.children.length ? /* @__PURE__ */ import_react24.default.createElement("ul", null, n.children.map(listOf)) : null);
  function TreeDiagram({ root, label, direction = "auto" }) {
    let leaf = 0;
    let maxDepth = 0;
    const place = (node, depth) => {
      maxDepth = Math.max(maxDepth, depth);
      const kids = (node.children || []).map((c) => place(c, depth + 1));
      const x = kids.length ? (kids[0].x + kids[kids.length - 1].x) / 2 : (leaf++ + 0.5) * SLOT;
      return { ...node, x, depth, kids, size: boxSize(node.label, node.detail, 14) };
    };
    const tree = place(root, 0);
    const across = direction === "right" || direction === "auto" && leaf * SLOT > 680;
    if (across) return /* @__PURE__ */ import_react24.default.createElement(TreeAcross, { tree, leaves: leaf, depth: maxDepth, root, label, listOf });
    const W14 = Math.max(680, leaf * SLOT);
    const off = (W14 - leaf * SLOT) / 2;
    const H6 = (maxDepth + 1) * LEVEL + 10;
    const nodes = [];
    const edges = [];
    const walk = (n) => {
      const y = 50 + n.depth * LEVEL;
      nodes.push(/* @__PURE__ */ import_react24.default.createElement(NodeBox, { key: nodes.length, x: n.x + off, y, title: n.label, text: n.detail, strong: n.depth === 0, chars: 14 }));
      for (const k of n.kids) {
        const y2 = 50 + k.depth * LEVEL;
        const mid = (y + y2) / 2;
        edges.push(/* @__PURE__ */ import_react24.default.createElement("path", { key: edges.length, className: "du-dg-edge", d: `M ${n.x + off} ${y + n.size.h / 2} V ${mid} H ${k.x + off} V ${y2 - k.size.h / 2}` }));
        walk(k);
      }
    };
    walk(tree);
    return /* @__PURE__ */ import_react24.default.createElement(
      DiagramFrame,
      {
        width: W14,
        height: H6,
        label: label || `Jerarqu\xEDa: ${root.label}`,
        warn: maxDepth > 3 || leaf > 8 ? `label-long: \xE1rbol de ${leaf} hojas y ${maxDepth + 1} niveles; div\xEDdalo` : null,
        list: /* @__PURE__ */ import_react24.default.createElement("ul", { className: "du-diagram-list__tree" }, listOf(root))
      },
      edges,
      nodes
    );
  }
  function TreeAcross({ tree, depth, root, label }) {
    const W14 = 680;
    const col = W14 / (depth + 1);
    const chars = Math.max(10, Math.floor((col - 40) / 8.5));
    let y = 10;
    const nodes = [];
    const edges = [];
    const place = (n) => {
      const size = boxSize(n.label, n.detail, chars);
      const kids = (n.children || []).map(place);
      let cy;
      if (kids.length) cy = (kids[0].cy + kids[kids.length - 1].cy) / 2;
      else {
        cy = y + size.h / 2;
        y += size.h + 14;
      }
      return { ...n, size, kids, cy };
    };
    const t = place(tree);
    const H6 = y;
    const walk = (n, d) => {
      const cx = col * d + col / 2;
      nodes.push(/* @__PURE__ */ import_react24.default.createElement(NodeBox, { key: nodes.length, x: cx, y: n.cy, title: n.label, text: n.detail, strong: d === 0, chars }));
      for (const k of n.kids) {
        const kx = col * (d + 1) + col / 2;
        const mid = (cx + n.size.w / 2 + kx - k.size.w / 2) / 2;
        edges.push(/* @__PURE__ */ import_react24.default.createElement("path", { key: edges.length, className: "du-dg-edge", d: `M ${cx + n.size.w / 2} ${n.cy} H ${mid} V ${k.cy} H ${kx - k.size.w / 2}` }));
        walk(k, d + 1);
      }
    };
    walk(t, 0);
    return /* @__PURE__ */ import_react24.default.createElement(
      DiagramFrame,
      {
        width: W14,
        height: H6,
        label: label || `Jerarqu\xEDa: ${root.label}`,
        warn: depth > 3 ? `label-long: \xE1rbol de ${depth + 1} niveles; div\xEDdalo` : null,
        list: /* @__PURE__ */ import_react24.default.createElement("ul", { className: "du-diagram-list__tree" }, listOf(root))
      },
      edges,
      nodes
    );
  }

  // src/components/diagrams/ConceptMap.jsx
  var import_react25 = __toESM(require_react(), 1);
  var W4 = 680;
  var ROW = 130;
  function ConceptMap({ nodes, links, label }) {
    const [defs, arrow] = useArrow();
    const levels = [...new Set(nodes.map((n) => n.level ?? 0))].sort((a, b) => a - b);
    const pos = {};
    levels.forEach((lv, r) => {
      const row = nodes.filter((n) => (n.level ?? 0) === lv);
      row.forEach((n, i) => {
        pos[n.id] = { x: W4 * (i + 1) / (row.length + 1), y: 50 + r * ROW, ...boxSize(n.label, n.detail, 14), n };
      });
    });
    const H6 = 50 + (levels.length - 1) * ROW + 60;
    const crowded = levels.some((lv) => nodes.filter((n) => (n.level ?? 0) === lv).length > 4);
    const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
    return /* @__PURE__ */ import_react25.default.createElement(
      DiagramFrame,
      {
        width: W4,
        height: H6,
        label: label || "Mapa conceptual",
        warn: crowded ? "label-long: m\xE1s de 4 conceptos en un nivel" : null,
        list: /* @__PURE__ */ import_react25.default.createElement("ul", null, links.map((l, i) => /* @__PURE__ */ import_react25.default.createElement("li", { key: i }, /* @__PURE__ */ import_react25.default.createElement("strong", null, byId[l.from]?.label), " ", /* @__PURE__ */ import_react25.default.createElement("span", { className: "du-diagram-list__rel" }, "\u2014 ", l.label, " \u2192"), " ", /* @__PURE__ */ import_react25.default.createElement("strong", null, byId[l.to]?.label))))
      },
      defs,
      links.map((l, i) => {
        const a = pos[l.from], b = pos[l.to];
        if (!a || !b) return null;
        const same = a.y === b.y;
        const x1 = same ? a.x + Math.sign(b.x - a.x) * a.w / 2 : a.x, y1 = same ? a.y : a.y + Math.sign(b.y - a.y) * a.h / 2;
        const x2 = same ? b.x - Math.sign(b.x - a.x) * b.w / 2 : b.x, y2 = same ? b.y : b.y - Math.sign(b.y - a.y) * b.h / 2;
        return /* @__PURE__ */ import_react25.default.createElement("line", { key: i, className: "du-dg-edge", x1, y1, x2, y2, markerEnd: arrow });
      }),
      nodes.map((n) => /* @__PURE__ */ import_react25.default.createElement(NodeBox, { key: n.id, x: pos[n.id].x, y: pos[n.id].y, title: n.label, text: n.detail, strong: (n.level ?? 0) === levels[0], chars: 14 })),
      links.map((l, i) => {
        const a = pos[l.from], b = pos[l.to];
        return a && b && l.label ? /* @__PURE__ */ import_react25.default.createElement(EdgeLabel, { key: `l${i}`, x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, text: l.label }) : null;
      })
    );
  }

  // src/components/diagrams/MindMap.jsx
  var import_react26 = __toESM(require_react(), 1);
  var W5 = 680;
  var CX = 340;
  function MindMap({ center, branches, label }) {
    const right = branches.slice(0, Math.ceil(branches.length / 2));
    const left = branches.slice(Math.ceil(branches.length / 2));
    const blockH = (b) => Math.max(boxSize(b.label, null, 14).h, (b.items || []).flatMap((it) => wrap(it, 15)).length * LH + (b.items || []).length * 4) + 24;
    const H6 = Math.max(260, Math.max(right.reduce((a, b) => a + blockH(b), 0), left.reduce((a, b) => a + blockH(b), 0)) + 20);
    const CY2 = H6 / 2;
    const side = (list, dir) => {
      const total = list.reduce((a, b) => a + blockH(b), 0);
      let y = CY2 - total / 2;
      return list.map((b, i) => {
        const h = blockH(b);
        const by = y + h / 2;
        y += h;
        const bx = CX + dir * 132;
        const bw = boxSize(b.label, null, 14, 96).w;
        const lines = (b.items || []).map((it) => wrap(it, 15));
        const count = lines.flat().length + (lines.length - 1) * 0.25;
        let ty = by - count * LH / 2 + 13;
        const tx = CX + dir * (132 + bw / 2 + 22);
        return /* @__PURE__ */ import_react26.default.createElement("g", { key: `${dir}${i}` }, /* @__PURE__ */ import_react26.default.createElement("path", { className: "du-dg-edge", d: `M ${CX + dir * 60} ${CY2} C ${CX + dir * 90} ${CY2}, ${bx - dir * (bw / 2 + 30)} ${by}, ${bx - dir * bw / 2} ${by}` }), lines.length ? /* @__PURE__ */ import_react26.default.createElement("line", { className: "du-dg-leader", x1: bx + dir * bw / 2, y1: by, x2: tx - dir * 8, y2: by }) : null, /* @__PURE__ */ import_react26.default.createElement(NodeBox, { x: bx, y: by, title: b.label, chars: 14, minW: 96 }), lines.map((ls, j) => {
          const el = /* @__PURE__ */ import_react26.default.createElement(Lines, { key: j, x: tx, y: ty, lines: ls.map((l, k) => k === 0 ? `\u2022 ${l}` : `  ${l}`), anchor: dir > 0 ? "start" : "end" });
          ty += ls.length * LH + 4;
          return el;
        }));
      });
    };
    return /* @__PURE__ */ import_react26.default.createElement(
      DiagramFrame,
      {
        width: W5,
        height: H6,
        label: label || `Mapa mental: ${center}`,
        list: /* @__PURE__ */ import_react26.default.createElement(import_react26.default.Fragment, null, /* @__PURE__ */ import_react26.default.createElement("p", { className: "du-diagram-list__center diagram-title" }, center), /* @__PURE__ */ import_react26.default.createElement("ul", null, branches.map((b, i) => /* @__PURE__ */ import_react26.default.createElement("li", { key: i }, /* @__PURE__ */ import_react26.default.createElement("strong", null, b.label), b.items && b.items.length ? /* @__PURE__ */ import_react26.default.createElement("ul", null, b.items.map((it, j) => /* @__PURE__ */ import_react26.default.createElement("li", { key: j }, it))) : null))))
      },
      side(right, 1),
      side(left, -1),
      /* @__PURE__ */ import_react26.default.createElement(NodeBox, { x: CX, y: CY2, title: center, strong: true, chars: 12, minW: 110 })
    );
  }

  // src/components/diagrams/VennDiagram.jsx
  var import_react27 = __toESM(require_react(), 1);
  var SETS2 = { W: 680, H: 380, c: [[265, 200], [415, 200]], r: 150, at: { a: [185, 200], b: [495, 200], ab: [340, 200] }, labels: [[200, 34], [480, 34]] };
  var SETS3 = { W: 680, H: 470, c: [[280, 190], [400, 190], [340, 295]], r: 130, at: { a: [225, 160], b: [455, 160], c: [340, 360], ab: [340, 138], ac: [256, 270], bc: [424, 270], abc: [340, 222] }, labels: [[175, 44], [505, 44], [340, 456]] };
  var NAMES = { a: 0, b: 1, c: 2 };
  function VennDiagram({ sets, regions = {}, label }) {
    const L = sets.length === 3 ? SETS3 : SETS2;
    const chars = sets.length === 3 ? 12 : 16;
    const regionName = (k) => k.length === 1 ? `Solo ${sets[NAMES[k]]}` : k.split("").map((c) => sets[NAMES[c]]).join(" y ");
    return /* @__PURE__ */ import_react27.default.createElement(
      DiagramFrame,
      {
        width: L.W,
        height: L.H,
        label: label || `Diagrama de Venn: ${sets.join(", ")}`,
        list: /* @__PURE__ */ import_react27.default.createElement("ul", null, Object.keys(L.at).filter((k) => regions[k] && regions[k].length).map((k) => /* @__PURE__ */ import_react27.default.createElement("li", { key: k }, /* @__PURE__ */ import_react27.default.createElement("strong", null, regionName(k), ":"), " ", regions[k].join("; "))))
      },
      L.c.slice(0, sets.length).map(([x, y], i) => /* @__PURE__ */ import_react27.default.createElement("circle", { key: i, className: `du-dg-venn du-dg-venn--${i + 1}`, cx: x, cy: y, r: L.r })),
      sets.map((s, i) => /* @__PURE__ */ import_react27.default.createElement(Lines, { key: i, x: L.labels[i][0], y: L.labels[i][1], lines: wrap(s, 22), anchor: "middle", title: true })),
      Object.entries(L.at).map(([k, [x, y]]) => {
        const items = (regions[k] || []).flatMap((it) => wrap(it, chars));
        return items.length ? /* @__PURE__ */ import_react27.default.createElement(Lines, { key: k, x, y: y - (items.length - 1) * LH / 2 + 5, lines: items, anchor: "middle" }) : null;
      })
    );
  }

  // src/components/diagrams/QuadrantMatrix.jsx
  var import_react28 = __toESM(require_react(), 1);
  var W6 = 680;
  var H2 = 460;
  var X0 = 110;
  var X1 = 660;
  var Y0 = 20;
  var Y1 = 400;
  function QuadrantMatrix({ xAxis, yAxis, quadrants, label }) {
    const mx = (X0 + X1) / 2, my = (Y0 + Y1) / 2;
    const cells = [[X0, Y0], [mx, Y0], [X0, my], [mx, my]];
    const names = [`${yAxis.high} \xB7 ${xAxis.low}`, `${yAxis.high} \xB7 ${xAxis.high}`, `${yAxis.low} \xB7 ${xAxis.low}`, `${yAxis.low} \xB7 ${xAxis.high}`];
    return /* @__PURE__ */ import_react28.default.createElement(
      DiagramFrame,
      {
        width: W6,
        height: H2,
        label: label || `Matriz: ${yAxis.label} por ${xAxis.label}`,
        list: /* @__PURE__ */ import_react28.default.createElement("ul", null, quadrants.map((q, i) => /* @__PURE__ */ import_react28.default.createElement("li", { key: i }, /* @__PURE__ */ import_react28.default.createElement("span", { className: "du-diagram-list__rel" }, names[i], ":"), " ", /* @__PURE__ */ import_react28.default.createElement("strong", null, q.title), q.text ? /* @__PURE__ */ import_react28.default.createElement("span", { className: "du-diagram-list__detail" }, " \xB7 ", q.text) : null)))
      },
      cells.map(([x, y], i) => {
        const q = quadrants[i] || {};
        const t = wrap(q.title || "", 22);
        const d = q.text ? wrap(q.text, 30) : [];
        return /* @__PURE__ */ import_react28.default.createElement("g", { key: i }, /* @__PURE__ */ import_react28.default.createElement("rect", { className: `du-dg-quad du-dg-quad--${i === 1 ? "strong" : "plain"}`, x: x + 3, y: y + 3, width: (X1 - X0) / 2 - 6, height: (Y1 - Y0) / 2 - 6 }), /* @__PURE__ */ import_react28.default.createElement(Lines, { x: x + (X1 - X0) / 4, y: y + (Y1 - Y0) / 4 - (t.length + d.length - 1) * LH / 2 + 5, lines: t, anchor: "middle", title: true }), /* @__PURE__ */ import_react28.default.createElement(Lines, { x: x + (X1 - X0) / 4, y: y + (Y1 - Y0) / 4 - (t.length + d.length - 1) * LH / 2 + 5 + t.length * LH, lines: d, anchor: "middle", muted: true }));
      }),
      /* @__PURE__ */ import_react28.default.createElement("line", { className: "du-dg-axis", x1: X0, y1: Y1, x2: X1, y2: Y1 }),
      /* @__PURE__ */ import_react28.default.createElement("line", { className: "du-dg-axis", x1: X0, y1: Y1, x2: X0, y2: Y0 }),
      /* @__PURE__ */ import_react28.default.createElement(Lines, { x: X0, y: Y1 + 22, lines: [xAxis.low], anchor: "start", muted: true }),
      /* @__PURE__ */ import_react28.default.createElement(Lines, { x: X1, y: Y1 + 22, lines: [xAxis.high], anchor: "end", muted: true }),
      /* @__PURE__ */ import_react28.default.createElement(Lines, { x: mx, y: Y1 + 46, lines: [`${xAxis.label} \u2192`], anchor: "middle", title: true }),
      /* @__PURE__ */ import_react28.default.createElement(Lines, { x: X0 - 10, y: Y1 - 4, lines: [yAxis.low], anchor: "end", muted: true }),
      /* @__PURE__ */ import_react28.default.createElement(Lines, { x: X0 - 10, y: Y0 + 14, lines: [yAxis.high], anchor: "end", muted: true }),
      /* @__PURE__ */ import_react28.default.createElement("text", { className: "du-dg-text diagram-title", x: 30, y: my, textAnchor: "middle", transform: `rotate(-90 30 ${my})` }, `${yAxis.label} \u2192`)
    );
  }

  // src/components/diagrams/Timeline.jsx
  var import_react29 = __toESM(require_react(), 1);
  var W7 = 680;
  var INSET = 82;
  function Timeline({ events, label }) {
    const n = events.length;
    const x = (i) => n === 1 ? W7 / 2 : INSET + i * (W7 - 2 * INSET) / (n - 1);
    const chars = Math.min(18, Math.max(12, Math.floor((W7 - 2 * INSET) / Math.max(1, n - 1) * 1.7 / 7.5)));
    const lines = (e) => wrap(e.title, chars).length + (e.text ? wrap(e.text, chars + 2).length : 0);
    const most = (k) => Math.max(1, ...events.filter((_, i) => i % 2 === k).map(lines));
    const AXIS = 34 + most(0) * LH + 34;
    const H6 = AXIS + 56 + most(1) * LH;
    return /* @__PURE__ */ import_react29.default.createElement(
      DiagramFrame,
      {
        width: W7,
        height: H6,
        label: label || "L\xEDnea de tiempo",
        warn: n > 8 ? "label-long: m\xE1s de 8 hitos; divida la l\xEDnea de tiempo" : null,
        list: /* @__PURE__ */ import_react29.default.createElement("ol", { className: "du-diagram-list__timeline" }, events.map((e, i) => /* @__PURE__ */ import_react29.default.createElement("li", { key: i }, /* @__PURE__ */ import_react29.default.createElement("strong", null, e.date), " \xB7 ", e.title, e.text ? /* @__PURE__ */ import_react29.default.createElement("span", { className: "du-diagram-list__detail" }, " \u2014 ", e.text) : null)))
      },
      /* @__PURE__ */ import_react29.default.createElement("line", { className: "du-dg-edge", x1: 20, y1: AXIS, x2: W7 - 20, y2: AXIS }),
      events.map((e, i) => {
        const up = i % 2 === 0;
        const t = wrap(e.title, chars);
        const d = e.text ? wrap(e.text, chars + 2) : [];
        const block = [...t, ...d].length;
        const y0 = up ? AXIS - 34 - (block - 1) * LH : AXIS + 56;
        return /* @__PURE__ */ import_react29.default.createElement("g", { key: i }, /* @__PURE__ */ import_react29.default.createElement("line", { className: "du-dg-leader", x1: x(i), y1: AXIS, x2: x(i), y2: up ? AXIS - 28 : AXIS + 28 }), /* @__PURE__ */ import_react29.default.createElement("circle", { className: "du-dg-dot", cx: x(i), cy: AXIS, r: 7 }), /* @__PURE__ */ import_react29.default.createElement("text", { className: "du-dg-text diagram-title du-dg-date", x: x(i), y: up ? AXIS + 26 : AXIS - 16, textAnchor: "middle" }, e.date), /* @__PURE__ */ import_react29.default.createElement(Lines, { x: x(i), y: y0, lines: t, anchor: "middle", title: true }), /* @__PURE__ */ import_react29.default.createElement(Lines, { x: x(i), y: y0 + t.length * LH, lines: d, anchor: "middle", muted: true }));
      })
    );
  }

  // src/components/diagrams/Fishbone.jsx
  var import_react30 = __toESM(require_react(), 1);
  var W8 = 680;
  var H3 = 440;
  var SPINE = 220;
  var EFFECT_X = 540;
  function Fishbone({ effect, causes, label }) {
    const [defs, arrow] = useArrow();
    const cols = Math.ceil(causes.length / 2);
    const step = (EFFECT_X - 40) / cols;
    const eff = wrap(effect, 14);
    return /* @__PURE__ */ import_react30.default.createElement(
      DiagramFrame,
      {
        width: W8,
        height: H3,
        label: label || `Diagrama de causas: ${effect}`,
        list: /* @__PURE__ */ import_react30.default.createElement(import_react30.default.Fragment, null, /* @__PURE__ */ import_react30.default.createElement("p", { className: "du-diagram-list__center diagram-title" }, "Efecto: ", effect), /* @__PURE__ */ import_react30.default.createElement("ul", null, causes.map((c, i) => /* @__PURE__ */ import_react30.default.createElement("li", { key: i }, /* @__PURE__ */ import_react30.default.createElement("strong", null, c.category), c.items && c.items.length ? /* @__PURE__ */ import_react30.default.createElement("ul", null, c.items.map((it, j) => /* @__PURE__ */ import_react30.default.createElement("li", { key: j }, it))) : null))))
      },
      defs,
      /* @__PURE__ */ import_react30.default.createElement("line", { className: "du-dg-edge", x1: 20, y1: SPINE, x2: EFFECT_X - 4, y2: SPINE, markerEnd: arrow }),
      /* @__PURE__ */ import_react30.default.createElement("rect", { className: "du-dg-node du-dg-node--strong", x: EFFECT_X, y: SPINE - (eff.length * LH + 16) / 2, width: W8 - EFFECT_X - 6, height: eff.length * LH + 16 }),
      /* @__PURE__ */ import_react30.default.createElement(Lines, { x: (EFFECT_X + W8 - 6) / 2, y: SPINE - (eff.length - 1) * LH / 2 + 5, lines: eff, anchor: "middle", title: true, className: "diagram-title du-dg-text--on-strong" }),
      causes.map((c, i) => {
        const up = i % 2 === 0;
        const col = Math.floor(i / 2);
        const bx = 40 + col * step + step * 0.55;
        const ey = up ? 40 : H3 - 40;
        const ex = bx - 70;
        const items = (c.items || []).slice(0, 3);
        return /* @__PURE__ */ import_react30.default.createElement("g", { key: i }, /* @__PURE__ */ import_react30.default.createElement("line", { className: "du-dg-edge", x1: ex, y1: ey, x2: bx, y2: SPINE }), /* @__PURE__ */ import_react30.default.createElement(Lines, { x: ex, y: up ? ey - 12 : ey + 24, lines: wrap(c.category, 18), anchor: "middle", title: true }), items.map((it, j) => {
          const f = (j + 1) / (items.length + 1);
          const px = ex + (bx - ex) * f, py = ey + (SPINE - ey) * f;
          return /* @__PURE__ */ import_react30.default.createElement("g", { key: j }, /* @__PURE__ */ import_react30.default.createElement("line", { className: "du-dg-leader", x1: px, y1: py, x2: px - 14, y2: py }), /* @__PURE__ */ import_react30.default.createElement(Lines, { x: px - 18, y: py + 5, lines: wrap(it, 16).slice(0, 2), anchor: "end" }));
        }));
      })
    );
  }

  // src/components/diagrams/Spectrum.jsx
  var import_react31 = __toESM(require_react(), 1);
  var W9 = 680;
  var X02 = 60;
  var X12 = 620;
  var BAR = 170;
  function Spectrum({ left, right, points = [], label }) {
    const id = `sp${(0, import_react31.useId)().replace(/:/g, "")}`;
    const sorted = [...points].sort((a, b) => a.position - b.position);
    const H6 = 290;
    return /* @__PURE__ */ import_react31.default.createElement(
      DiagramFrame,
      {
        width: W9,
        height: H6,
        label: label || `Continuo entre ${left} y ${right}`,
        list: /* @__PURE__ */ import_react31.default.createElement(import_react31.default.Fragment, null, /* @__PURE__ */ import_react31.default.createElement("p", { className: "du-diagram-list__note diagram-label" }, "De ", /* @__PURE__ */ import_react31.default.createElement("strong", null, left), " a ", /* @__PURE__ */ import_react31.default.createElement("strong", null, right), ":"), /* @__PURE__ */ import_react31.default.createElement("ol", null, sorted.map((p, i) => /* @__PURE__ */ import_react31.default.createElement("li", { key: i }, /* @__PURE__ */ import_react31.default.createElement("strong", null, p.label), p.text ? /* @__PURE__ */ import_react31.default.createElement("span", { className: "du-diagram-list__detail" }, " \xB7 ", p.text) : null, " ", /* @__PURE__ */ import_react31.default.createElement("span", { className: "du-diagram-list__rel" }, "(", p.position < 0.4 ? `m\xE1s cerca de ${left}` : p.position > 0.6 ? `m\xE1s cerca de ${right}` : "en el centro", ")")))))
      },
      /* @__PURE__ */ import_react31.default.createElement("defs", null, /* @__PURE__ */ import_react31.default.createElement("linearGradient", { id, x1: "0", x2: "1", y1: "0", y2: "0" }, /* @__PURE__ */ import_react31.default.createElement("stop", { offset: "0%", className: "du-dg-stop--a" }), /* @__PURE__ */ import_react31.default.createElement("stop", { offset: "100%", className: "du-dg-stop--b" }))),
      /* @__PURE__ */ import_react31.default.createElement("rect", { x: X02, y: BAR - 12, width: X12 - X02, height: 24, rx: 12, fill: `url(#${id})`, className: "du-dg-spectrum" }),
      /* @__PURE__ */ import_react31.default.createElement(Lines, { x: X02, y: 28, lines: [`\u2190 ${left}`], anchor: "start", title: true }),
      /* @__PURE__ */ import_react31.default.createElement(Lines, { x: X12, y: 28, lines: [`${right} \u2192`], anchor: "end", title: true }),
      sorted.map((p, i) => {
        const x = X02 + p.position * (X12 - X02);
        const up = i % 2 === 0;
        const t = wrap(p.label, 16);
        const d = p.text ? wrap(p.text, 20) : [];
        const y0 = up ? BAR - 40 - (t.length + d.length - 1) * LH : BAR + 56;
        return /* @__PURE__ */ import_react31.default.createElement("g", { key: i }, /* @__PURE__ */ import_react31.default.createElement("line", { className: "du-dg-leader", x1: x, y1: up ? BAR - 14 : BAR + 14, x2: x, y2: up ? BAR - 32 : BAR + 38 }), /* @__PURE__ */ import_react31.default.createElement("circle", { className: "du-dg-dot", cx: x, cy: BAR, r: 8 }), /* @__PURE__ */ import_react31.default.createElement(Lines, { x, y: y0, lines: t, anchor: "middle", title: true }), /* @__PURE__ */ import_react31.default.createElement(Lines, { x, y: y0 + t.length * LH, lines: d, anchor: "middle", muted: true }));
      })
    );
  }

  // src/components/diagrams/Funnel.jsx
  var import_react32 = __toESM(require_react(), 1);
  var W10 = 680;
  var LEVEL2 = 70;
  var FW = 380;
  var CX2 = 200;
  function Funnel({ stages, label }) {
    const n = stages.length;
    const H6 = n * LEVEL2 + 10;
    const half = (y) => FW / 2 * (1 - 0.6 * (y / (n * LEVEL2)));
    return /* @__PURE__ */ import_react32.default.createElement(
      DiagramFrame,
      {
        width: W10,
        height: H6,
        label: label || `Embudo: ${stages.map((s) => s.title).join(", ")}`,
        list: /* @__PURE__ */ import_react32.default.createElement("ol", { className: "du-diagram-list du-diagram-list--pyramid" }, stages.map((s, i) => {
          const r = rampFor(i, n, false);
          return /* @__PURE__ */ import_react32.default.createElement("li", { key: i, className: `du-diagram-list__level du-dg-bar--${r}` }, /* @__PURE__ */ import_react32.default.createElement("strong", { className: `diagram-title du-dg-on-bar--${r}` }, s.title), s.text ? /* @__PURE__ */ import_react32.default.createElement("span", { className: "diagram-label" }, s.text) : null);
        }))
      },
      stages.map((s, i) => {
        const y1 = i * LEVEL2 + 4, y2 = (i + 1) * LEVEL2;
        const r = rampFor(i, n, false);
        const mid = (y1 + y2) / 2;
        const t = wrap(s.title, 22);
        const d = s.text ? wrap(s.text, 30) : [];
        return /* @__PURE__ */ import_react32.default.createElement("g", { key: i }, /* @__PURE__ */ import_react32.default.createElement("polygon", { className: `du-dg-ramp du-dg-ramp--${r}`, points: `${CX2 - half(y1)},${y1} ${CX2 + half(y1)},${y1} ${CX2 + half(y2)},${y2} ${CX2 - half(y2)},${y2}` }), /* @__PURE__ */ import_react32.default.createElement(Lines, { x: CX2, y: mid - (t.length - 1) * LH / 2 + 5, lines: t, anchor: "middle", title: true, className: `diagram-title du-dg-on-ramp--${r}` }), d.length ? /* @__PURE__ */ import_react32.default.createElement("line", { className: "du-dg-leader", x1: CX2 + half(mid) + 8, y1: mid, x2: CX2 + FW / 2 + 24, y2: mid }) : null, /* @__PURE__ */ import_react32.default.createElement(Lines, { x: CX2 + FW / 2 + 32, y: mid - (d.length - 1) * LH / 2 + 5, lines: d }));
      })
    );
  }

  // src/components/diagrams/Staircase.jsx
  var import_react33 = __toESM(require_react(), 1);
  var W11 = 680;
  function Staircase({ steps, label }) {
    const n = steps.length;
    const sw = (W11 - 20) / n;
    const rise = 46;
    const base = 110;
    const H6 = base + (n - 1) * rise + 20;
    return /* @__PURE__ */ import_react33.default.createElement(
      DiagramFrame,
      {
        width: W11,
        height: H6,
        label: label || `Escalera: ${steps.map((s) => s.title).join(", ")}`,
        list: /* @__PURE__ */ import_react33.default.createElement("ol", { className: "du-diagram-list du-diagram-list--pyramid" }, [...steps].reverse().map((s, k) => {
          const i = n - 1 - k;
          const r = rampFor(i, n, false);
          return /* @__PURE__ */ import_react33.default.createElement("li", { key: i, className: `du-diagram-list__level du-dg-bar--${r}` }, /* @__PURE__ */ import_react33.default.createElement("strong", { className: `diagram-title du-dg-on-bar--${r}` }, i + 1, ". ", s.title), s.text ? /* @__PURE__ */ import_react33.default.createElement("span", { className: "diagram-label" }, s.text) : null);
        }))
      },
      steps.map((s, i) => {
        const h = base + i * rise;
        const x = 10 + i * sw;
        const y = H6 - 10 - h;
        const r = rampFor(i, n, false);
        const chars = Math.max(9, Math.floor(sw / 9));
        const t = wrap(s.title, chars);
        const d = s.text ? wrap(s.text, chars + 2) : [];
        return /* @__PURE__ */ import_react33.default.createElement("g", { key: i }, /* @__PURE__ */ import_react33.default.createElement("rect", { className: `du-dg-ramp du-dg-ramp--${r}`, x: x + 2, y, width: sw - 4, height: h }), /* @__PURE__ */ import_react33.default.createElement(Lines, { x: x + sw / 2, y: y + 22, lines: t, anchor: "middle", title: true, className: `diagram-title du-dg-on-ramp--${r}` }), /* @__PURE__ */ import_react33.default.createElement(Lines, { x: x + sw / 2, y: y + 24 + t.length * LH, lines: d, anchor: "middle", className: `diagram-label du-dg-on-ramp--${r}` }));
      })
    );
  }

  // src/components/diagrams/NestedCircles.jsx
  var import_react34 = __toESM(require_react(), 1);
  var W12 = 680;
  var H4 = 440;
  var CX3 = 210;
  var CY = 220;
  var RMAX = 200;
  function NestedCircles({ layers, label }) {
    const n = layers.length;
    const r = (i) => RMAX * (i + 1) / n;
    const legendH = layers.reduce((a, l) => a + (1 + (l.text ? wrap(l.text, 26).length : 0)) * LH + 12, 0);
    const textY = (i) => CY - (r(i) + (i ? r(i - 1) : 0)) / 2;
    return /* @__PURE__ */ import_react34.default.createElement(
      DiagramFrame,
      {
        width: W12,
        height: H4,
        label: label || `Niveles anidados: ${layers.map((l) => l.title).join(" dentro de ")}`,
        list: /* @__PURE__ */ import_react34.default.createElement("ul", { className: "du-diagram-list__nested" }, [...layers].reverse().map((l, k) => /* @__PURE__ */ import_react34.default.createElement("li", { key: k, style: { marginLeft: `${k * 12}px` } }, /* @__PURE__ */ import_react34.default.createElement("strong", null, l.title), l.text ? /* @__PURE__ */ import_react34.default.createElement("span", { className: "du-diagram-list__detail" }, " \xB7 ", l.text) : null)))
      },
      [...layers].map((_, k) => n - 1 - k).map((i) => {
        const ramp = rampFor(i, n, true);
        return /* @__PURE__ */ import_react34.default.createElement("circle", { key: i, className: `du-dg-ramp du-dg-ramp--${ramp} du-dg-ring`, cx: CX3, cy: CY, r: r(i) });
      }),
      layers.map((l, i) => {
        const ramp = rampFor(i, n, true);
        const y = i === 0 ? CY + 5 : textY(i) + 5;
        return /* @__PURE__ */ import_react34.default.createElement("text", { key: i, className: `du-dg-text diagram-title du-dg-on-ramp--${ramp}`, x: CX3, y, textAnchor: "middle" }, l.title);
      }),
      (() => {
        let ly = CY - legendH / 2 + 14;
        return [...layers].map((l, i) => ({ l, i })).reverse().map(({ l, i }) => {
          const d = l.text ? wrap(l.text, 26) : [];
          const ramp = rampFor(i, n, true);
          const y = ly;
          ly += (1 + d.length) * LH + 12;
          return /* @__PURE__ */ import_react34.default.createElement("g", { key: `k${i}` }, /* @__PURE__ */ import_react34.default.createElement("rect", { className: `du-dg-ramp du-dg-ramp--${ramp}`, x: 440, y: y - 12, width: 14, height: 14, rx: 2 }), /* @__PURE__ */ import_react34.default.createElement("text", { className: "du-dg-text diagram-title", x: 462, y }, l.title), /* @__PURE__ */ import_react34.default.createElement(Lines, { x: 462, y: y + LH, lines: d, muted: true }));
        });
      })()
    );
  }

  // src/components/diagrams/Iceberg.jsx
  var import_react35 = __toESM(require_react(), 1);
  var W13 = 680;
  var H5 = 440;
  var SEA = 150;
  function Iceberg({ visible, hidden, visibleTitle = "Lo visible", hiddenTitle = "Lo que no se ve", label }) {
    const vis = visible.flatMap((v) => wrap(`\u2022 ${v}`, 34));
    const hid = hidden.flatMap((v) => wrap(`\u2022 ${v}`, 34));
    return /* @__PURE__ */ import_react35.default.createElement(
      DiagramFrame,
      {
        width: W13,
        height: H5,
        label: label || `Iceberg: ${visibleTitle} y ${hiddenTitle}`,
        list: /* @__PURE__ */ import_react35.default.createElement(import_react35.default.Fragment, null, /* @__PURE__ */ import_react35.default.createElement("p", { className: "du-diagram-list__note diagram-title" }, visibleTitle), /* @__PURE__ */ import_react35.default.createElement("ul", null, visible.map((v, i) => /* @__PURE__ */ import_react35.default.createElement("li", { key: i }, v))), /* @__PURE__ */ import_react35.default.createElement("p", { className: "du-diagram-list__note diagram-title" }, hiddenTitle), /* @__PURE__ */ import_react35.default.createElement("ul", null, hidden.map((v, i) => /* @__PURE__ */ import_react35.default.createElement("li", { key: i }, v))))
      },
      /* @__PURE__ */ import_react35.default.createElement("rect", { className: "du-dg-water", x: 0, y: SEA, width: W13, height: H5 - SEA }),
      /* @__PURE__ */ import_react35.default.createElement("polygon", { className: "du-dg-ice", points: `150,30 205,85 235,${SEA} 300,${SEA + 60} 285,330 205,${H5 - 20} 110,370 60,260 85,${SEA} 110,80` }),
      /* @__PURE__ */ import_react35.default.createElement("line", { className: "du-dg-sea", x1: 0, y1: SEA, x2: W13, y2: SEA }),
      /* @__PURE__ */ import_react35.default.createElement(Lines, { x: 340, y: 44, lines: [visibleTitle], title: true }),
      /* @__PURE__ */ import_react35.default.createElement(Lines, { x: 340, y: 44 + LH + 4, lines: vis }),
      /* @__PURE__ */ import_react35.default.createElement(Lines, { x: 340, y: SEA + 40, lines: [hiddenTitle], title: true }),
      /* @__PURE__ */ import_react35.default.createElement(Lines, { x: 340, y: SEA + 40 + LH + 4, lines: hid })
    );
  }
  return __toCommonJS(index_exports);
})();
