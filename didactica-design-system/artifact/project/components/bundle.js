/* @ds-bundle: {"format":4,"namespace":"Didactica","components":[{"name":"Page"},{"name":"TitlePage"},{"name":"TableOfContents"},{"name":"ChapterOpener"},{"name":"BoxLegend"},{"name":"Heading"},{"name":"Paragraph"},{"name":"BulletList"},{"name":"Cite"},{"name":"Quote"},{"name":"BlockQuote"},{"name":"KeyPoints"},{"name":"Objectives"},{"name":"Important"},{"name":"CommonMistake"},{"name":"Classroom"},{"name":"ThinkFurther"},{"name":"SelfCheck"},{"name":"Activities"},{"name":"ReferencesBox"},{"name":"AlignmentTable"},{"name":"Box"},{"name":"Icon"},{"name":"DataTable"},{"name":"Figure"},{"name":"Numbering"},{"name":"FigRef"},{"name":"ConceptWeb"},{"name":"CycleDiagram"},{"name":"Pyramid"},{"name":"ProcessFlow"},{"name":"GlossaryEntry"},{"name":"Reference"},{"name":"Term"},{"name":"Glossary"}]} */
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
    BlockQuote: () => BlockQuote,
    Box: () => Box,
    BoxLegend: () => BoxLegend,
    BulletList: () => BulletList,
    ChapterOpener: () => ChapterOpener,
    Cite: () => Cite,
    Classroom: () => Classroom,
    CommonMistake: () => CommonMistake,
    ConceptWeb: () => ConceptWeb,
    CycleDiagram: () => CycleDiagram,
    DataTable: () => DataTable,
    FigRef: () => FigRef,
    Figure: () => Figure,
    Glossary: () => Glossary,
    GlossaryEntry: () => GlossaryEntry,
    Heading: () => Heading,
    Icon: () => Icon,
    Important: () => Important,
    KeyPoints: () => KeyPoints,
    Numbering: () => Numbering,
    Objectives: () => Objectives,
    Page: () => Page,
    Paragraph: () => Paragraph,
    ProcessFlow: () => ProcessFlow,
    Pyramid: () => Pyramid,
    Quote: () => Quote,
    Reference: () => Reference,
    ReferencesBox: () => ReferencesBox,
    SelfCheck: () => SelfCheck,
    TableOfContents: () => TableOfContents,
    Term: () => Term,
    ThinkFurther: () => ThinkFurther,
    TitlePage: () => TitlePage,
    bloomLevel: () => bloomLevel,
    checkAlignment: () => checkAlignment,
    formatCitation: () => formatCitation,
    formatCitations: () => formatCitations,
    formatLocator: () => formatLocator,
    objectiveId: () => objectiveId
  });

  // src/components/Page.jsx
  var import_react = __toESM(require_react(), 1);
  function Page({ header, page, children, className = "" }) {
    return /* @__PURE__ */ import_react.default.createElement("section", { className: `du-page ${className}`.trim() }, header ? /* @__PURE__ */ import_react.default.createElement("p", { className: "du-running-header running" }, header) : null, children, page != null ? /* @__PURE__ */ import_react.default.createElement("p", { className: "du-page-footer running" }, "P\xE1gina ", page) : null);
  }

  // src/components/TitlePage.jsx
  var import_react2 = __toESM(require_react(), 1);
  function TitlePage({ kicker, title, subtitle, lede, ribbon, meta = [] }) {
    return /* @__PURE__ */ import_react2.default.createElement("header", { className: "du-title-page" }, kicker ? /* @__PURE__ */ import_react2.default.createElement("p", { className: "du-title-page__kicker cover-kicker" }, kicker) : null, /* @__PURE__ */ import_react2.default.createElement("h1", { className: "du-title-page__title cover-title" }, title), subtitle ? /* @__PURE__ */ import_react2.default.createElement("p", { className: "du-title-page__subtitle cover-subtitle" }, subtitle) : null, lede ? /* @__PURE__ */ import_react2.default.createElement("p", { className: "du-title-page__lede cover-lede" }, lede) : null, ribbon ? /* @__PURE__ */ import_react2.default.createElement("p", { className: "du-ribbon ribbon" }, ribbon) : null, meta.length ? /* @__PURE__ */ import_react2.default.createElement("div", { className: "du-title-page__meta" }, meta.map((line, i) => /* @__PURE__ */ import_react2.default.createElement("p", { key: i, className: "cover-meta" }, line))) : null);
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
  var import_react8 = __toESM(require_react(), 1);

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

  // src/components/Quote.jsx
  function Quote({ children, cite }) {
    return /* @__PURE__ */ import_react8.default.createElement(import_react8.default.Fragment, null, /* @__PURE__ */ import_react8.default.createElement("q", { className: "du-quote" }, children), cite ? /* @__PURE__ */ import_react8.default.createElement(import_react8.default.Fragment, null, " ", /* @__PURE__ */ import_react8.default.createElement("cite", { className: "du-cite" }, formatCitation(cite))) : null);
  }
  function BlockQuote({ children, cite }) {
    return /* @__PURE__ */ import_react8.default.createElement("blockquote", { className: "du-blockquote blockquote" }, children, cite ? /* @__PURE__ */ import_react8.default.createElement(import_react8.default.Fragment, null, " ", /* @__PURE__ */ import_react8.default.createElement("cite", { className: "du-cite" }, formatCitation(cite))) : null);
  }

  // src/components/Cite.jsx
  var import_react9 = __toESM(require_react(), 1);
  function Cite({ authors, year, page, locator, narrative = false, works }) {
    const text = works ? formatCitations(works) : formatCitation({ authors, year, page, locator }, { narrative });
    return /* @__PURE__ */ import_react9.default.createElement("cite", { className: "du-cite" }, text);
  }

  // src/components/Icon.jsx
  var import_react10 = __toESM(require_react(), 1);

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
    return /* @__PURE__ */ import_react10.default.createElement(
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
      parts.map(([tag, attrs], i) => import_react10.default.createElement(tag, { key: i, ...attrs }))
    );
  }

  // src/components/Boxes.jsx
  var import_react11 = __toESM(require_react(), 1);

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

  // src/components/Boxes.jsx
  var CONFIG = Object.fromEntries(boxes_config_default.map((b) => [b.kind, b]));
  function Box({ kind, title, children, extraHeader }) {
    const id = (0, import_react11.useId)();
    const cfg = CONFIG[kind] || CONFIG.important;
    return /* @__PURE__ */ import_react11.default.createElement("aside", { className: `du-box du-box--${cfg.kind} du-box--family-${cfg.family}`, "aria-labelledby": id }, /* @__PURE__ */ import_react11.default.createElement("div", { className: "du-box__header" }, /* @__PURE__ */ import_react11.default.createElement(Icon, { name: cfg.icon, className: "du-box__icon" }), /* @__PURE__ */ import_react11.default.createElement("p", { id, className: "du-box__title box-title" }, title || cfg.title), extraHeader), /* @__PURE__ */ import_react11.default.createElement("div", { className: "du-box__body box-body" }, children));
  }
  function KeyPoints({ items, before, title }) {
    return /* @__PURE__ */ import_react11.default.createElement(Box, { kind: "keypoints", title }, /* @__PURE__ */ import_react11.default.createElement("ul", { className: "du-box__list" }, items.map((it, i) => /* @__PURE__ */ import_react11.default.createElement("li", { key: i }, it))), before && before.length ? /* @__PURE__ */ import_react11.default.createElement("div", { className: "du-box__before" }, /* @__PURE__ */ import_react11.default.createElement("p", { className: "du-box__label" }, "Antes de leer:"), /* @__PURE__ */ import_react11.default.createElement("ul", { className: "du-box__list du-box__list--questions" }, before.map((q, i) => /* @__PURE__ */ import_react11.default.createElement("li", { key: i }, q)))) : null);
  }
  var LevelTag = ({ level }) => {
    const lvl = bloomLevel(level);
    return /* @__PURE__ */ import_react11.default.createElement("span", { className: "du-tag tag", title: lvl ? `Nivel ${lvl.level} de Bloom` : void 0 }, lvl ? `${lvl.level} \xB7 ${lvl.name}` : level);
  };
  function Objectives({ items, intro = "Al finalizar la unidad, usted ser\xE1 capaz de:", title }) {
    return /* @__PURE__ */ import_react11.default.createElement(Box, { kind: "objectives", title }, intro ? /* @__PURE__ */ import_react11.default.createElement("p", { className: "du-box__intro" }, intro) : null, /* @__PURE__ */ import_react11.default.createElement("ol", { className: "du-box__list du-box__list--objectives" }, items.map((it, i) => /* @__PURE__ */ import_react11.default.createElement("li", { key: i, id: `obj-${objectiveId(it, i)}` }, /* @__PURE__ */ import_react11.default.createElement("span", { className: "du-box__oid" }, objectiveId(it, i)), /* @__PURE__ */ import_react11.default.createElement(LevelTag, { level: it.level }), /* @__PURE__ */ import_react11.default.createElement("span", { className: "du-box__otext" }, it.text)))));
  }
  function Important({ term, children, title }) {
    return /* @__PURE__ */ import_react11.default.createElement(Box, { kind: "important", title }, term ? /* @__PURE__ */ import_react11.default.createElement("p", { className: "du-box__term" }, term) : null, /* @__PURE__ */ import_react11.default.createElement("div", { className: "du-box__text" }, children));
  }
  function CommonMistake({ misconception, correction, explanation, children, title }) {
    return /* @__PURE__ */ import_react11.default.createElement(Box, { kind: "mistake", title }, /* @__PURE__ */ import_react11.default.createElement("p", { className: "du-box__pair" }, /* @__PURE__ */ import_react11.default.createElement("span", { className: "du-box__label" }, "Creencia frecuente:"), " ", misconception), /* @__PURE__ */ import_react11.default.createElement("p", { className: "du-box__pair" }, /* @__PURE__ */ import_react11.default.createElement("span", { className: "du-box__label" }, "Lo que muestra la evidencia:"), " ", correction), explanation ? /* @__PURE__ */ import_react11.default.createElement("p", { className: "du-box__pair" }, /* @__PURE__ */ import_react11.default.createElement("span", { className: "du-box__label" }, "Por qu\xE9 no se sostiene:"), " ", explanation) : null, children ? /* @__PURE__ */ import_react11.default.createElement("div", { className: "du-box__text" }, children) : null);
  }
  var DISCIPLINES = { sociales: "Ciencias Sociales", salud: "Ciencias de la Salud", general: "Did\xE1ctica general" };
  function Classroom({ discipline, situation, decision, rationale, title }) {
    const tag = discipline ? /* @__PURE__ */ import_react11.default.createElement("span", { className: "du-tag tag du-box__discipline" }, DISCIPLINES[discipline] || discipline) : null;
    return /* @__PURE__ */ import_react11.default.createElement(Box, { kind: "example", title, extraHeader: tag }, /* @__PURE__ */ import_react11.default.createElement("p", { className: "du-box__pair" }, /* @__PURE__ */ import_react11.default.createElement("span", { className: "du-box__label" }, "Situaci\xF3n:"), " ", situation), /* @__PURE__ */ import_react11.default.createElement("p", { className: "du-box__pair" }, /* @__PURE__ */ import_react11.default.createElement("span", { className: "du-box__label" }, "Decisi\xF3n did\xE1ctica:"), " ", decision), rationale ? /* @__PURE__ */ import_react11.default.createElement("p", { className: "du-box__pair" }, /* @__PURE__ */ import_react11.default.createElement("span", { className: "du-box__label" }, "Fundamento:"), " ", rationale) : null);
  }
  function ThinkFurther({ questions, title }) {
    return /* @__PURE__ */ import_react11.default.createElement(Box, { kind: "thinking", title }, /* @__PURE__ */ import_react11.default.createElement("ol", { className: "du-box__list du-box__list--numbered" }, questions.map((q, i) => /* @__PURE__ */ import_react11.default.createElement("li", { key: i }, q))));
  }
  function SelfCheck({ items, title }) {
    return /* @__PURE__ */ import_react11.default.createElement(Box, { kind: "selfcheck", title }, /* @__PURE__ */ import_react11.default.createElement("ol", { className: "du-box__list du-box__list--numbered" }, items.map((it, i) => /* @__PURE__ */ import_react11.default.createElement("li", { key: i }, /* @__PURE__ */ import_react11.default.createElement("div", { className: "du-box__q" }, it.review ? /* @__PURE__ */ import_react11.default.createElement("span", { className: "du-tag tag" }, "Repaso \xB7 ", it.review) : null, /* @__PURE__ */ import_react11.default.createElement("span", null, it.question), /* @__PURE__ */ import_react11.default.createElement("details", { className: "du-box__answer" }, /* @__PURE__ */ import_react11.default.createElement("summary", null, "Ver respuesta"), /* @__PURE__ */ import_react11.default.createElement("p", null, it.answer)))))), /* @__PURE__ */ import_react11.default.createElement("div", { className: "du-box__key", "aria-hidden": "true" }, /* @__PURE__ */ import_react11.default.createElement("p", { className: "du-box__label" }, "Clave de respuestas"), /* @__PURE__ */ import_react11.default.createElement("ol", null, items.map((it, i) => /* @__PURE__ */ import_react11.default.createElement("li", { key: i }, it.answer)))));
  }
  var ACTIVITY_TYPES = { pregunta: "Pregunta", tarea: "Tarea", caso: "Caso", debate: "Debate" };
  function Activities({ items, title }) {
    return /* @__PURE__ */ import_react11.default.createElement(Box, { kind: "activities", title }, /* @__PURE__ */ import_react11.default.createElement("ol", { className: "du-box__list du-box__list--numbered" }, items.map((it, i) => {
      const obj = typeof it === "string" ? { text: it } : it;
      return /* @__PURE__ */ import_react11.default.createElement("li", { key: i }, /* @__PURE__ */ import_react11.default.createElement("div", { className: "du-box__q" }, /* @__PURE__ */ import_react11.default.createElement("span", { className: "du-box__tags" }, obj.type ? /* @__PURE__ */ import_react11.default.createElement("span", { className: "du-tag tag" }, ACTIVITY_TYPES[obj.type] || obj.type) : null, obj.level ? /* @__PURE__ */ import_react11.default.createElement(LevelTag, { level: obj.level }) : null, (obj.objectives || []).map((o) => /* @__PURE__ */ import_react11.default.createElement("a", { key: o, className: "du-tag du-tag--link tag", href: `#obj-${o}` }, o))), /* @__PURE__ */ import_react11.default.createElement("span", null, obj.text)));
    })));
  }
  function ReferencesBox({ children, title }) {
    return /* @__PURE__ */ import_react11.default.createElement(Box, { kind: "references", title }, /* @__PURE__ */ import_react11.default.createElement("div", { className: "du-box__refs" }, children));
  }
  function AlignmentTable({ objectives, activities, title = "Alineamiento de la unidad" }) {
    const { rows } = checkAlignment(objectives, activities);
    return /* @__PURE__ */ import_react11.default.createElement("figure", { className: "du-table-figure du-alignment" }, /* @__PURE__ */ import_react11.default.createElement("p", { className: "du-table-figure__title table-title" }, title), /* @__PURE__ */ import_react11.default.createElement("div", { className: "du-table-scroll" }, /* @__PURE__ */ import_react11.default.createElement("table", { className: "du-table du-table--concept" }, /* @__PURE__ */ import_react11.default.createElement("thead", null, /* @__PURE__ */ import_react11.default.createElement("tr", null, /* @__PURE__ */ import_react11.default.createElement("th", { scope: "col", className: "table-head" }, "Objetivo"), /* @__PURE__ */ import_react11.default.createElement("th", { scope: "col", className: "table-head" }, "Nivel"), /* @__PURE__ */ import_react11.default.createElement("th", { scope: "col", className: "table-head" }, "Actividades"), /* @__PURE__ */ import_react11.default.createElement("th", { scope: "col", className: "table-head" }, "Estado"))), /* @__PURE__ */ import_react11.default.createElement("tbody", null, rows.map((r) => /* @__PURE__ */ import_react11.default.createElement("tr", { key: r.id }, /* @__PURE__ */ import_react11.default.createElement("th", { scope: "row", className: "table-cell" }, r.id), /* @__PURE__ */ import_react11.default.createElement("td", { className: "table-cell" }, r.level ? r.level.name : "\u2014"), /* @__PURE__ */ import_react11.default.createElement("td", { className: "table-cell" }, r.activities.length ? r.activities.join(", ") : "\u2014"), /* @__PURE__ */ import_react11.default.createElement("td", { className: `table-cell ${r.problems.length ? "du-alignment__bad" : "du-alignment__ok"}` }, r.problems.length ? r.problems.join(" ") : "Alineado")))))));
  }
  function BoxLegend() {
    const families = [["open", "Al abrir la unidad"], ["text", "Dentro del texto"], ["close", "Al cerrar la unidad"]];
    return /* @__PURE__ */ import_react11.default.createElement("div", { className: "du-legend" }, families.map(([f, label]) => /* @__PURE__ */ import_react11.default.createElement("section", { key: f, className: "du-legend__family" }, /* @__PURE__ */ import_react11.default.createElement("p", { className: "du-legend__label chapter-kicker" }, label), /* @__PURE__ */ import_react11.default.createElement("ul", { className: "du-legend__list" }, boxes_config_default.filter((b) => b.family === f).map((b) => /* @__PURE__ */ import_react11.default.createElement("li", { key: b.kind, className: `du-legend__item du-box--${b.kind} du-box--family-${b.family}` }, /* @__PURE__ */ import_react11.default.createElement("span", { className: "du-legend__swatch" }, /* @__PURE__ */ import_react11.default.createElement(Icon, { name: b.icon, size: 18 })), /* @__PURE__ */ import_react11.default.createElement("span", { className: "du-legend__name box-title" }, b.title)))))));
  }

  // src/components/DataTable.jsx
  var import_react13 = __toESM(require_react(), 1);

  // src/components/Numbering.jsx
  var import_react12 = __toESM(require_react(), 1);
  var NumberingContext = (0, import_react12.createContext)({ figures: {}, tables: {} });
  function Numbering({ figures = [], tables = [], firstFigure = 1, firstTable = 1, children }) {
    const index = (ids, first) => Object.fromEntries(ids.map((id, i) => [id, i + first]));
    return /* @__PURE__ */ import_react12.default.createElement(NumberingContext.Provider, { value: { figures: index(figures, firstFigure), tables: index(tables, firstTable) } }, children);
  }
  function useNumber(kind, id) {
    const ctx = (0, import_react12.useContext)(NumberingContext);
    return id ? ctx[kind === "table" ? "tables" : "figures"][id] : void 0;
  }
  function FigRef({ to, paren = false }) {
    const ctx = (0, import_react12.useContext)(NumberingContext);
    const fig = ctx.figures[to];
    const tab = ctx.tables[to];
    const label = fig ? `Figura ${fig}` : tab ? `Tabla ${tab}` : `[referencia sin destino: ${to}]`;
    const text = paren ? `(v\xE9ase la ${label})` : label;
    return /* @__PURE__ */ import_react12.default.createElement("a", { className: "du-figref", href: `#${fig ? "fig" : "tab"}-${to}` }, text);
  }

  // src/components/DataTable.jsx
  function DataTable({ columns, rows, widths, number, id, title, note, rowHeader = false, filled = false }) {
    const auto = useNumber("table", id);
    number = number ?? auto;
    return /* @__PURE__ */ import_react13.default.createElement("figure", { className: "du-table-figure", id: id ? `tab-${id}` : void 0 }, number != null ? /* @__PURE__ */ import_react13.default.createElement("p", { className: "du-table-figure__number table-number" }, "Tabla ", number) : null, title ? /* @__PURE__ */ import_react13.default.createElement("p", { className: "du-table-figure__title table-title" }, title) : null, /* @__PURE__ */ import_react13.default.createElement("div", { className: "du-table-scroll" }, /* @__PURE__ */ import_react13.default.createElement("table", { className: `du-table${rowHeader ? " du-table--concept" : ""}${filled ? " du-table--filled" : ""}` }, widths ? /* @__PURE__ */ import_react13.default.createElement("colgroup", null, widths.map((w, i) => /* @__PURE__ */ import_react13.default.createElement("col", { key: i, style: { width: w } }))) : null, /* @__PURE__ */ import_react13.default.createElement("thead", null, /* @__PURE__ */ import_react13.default.createElement("tr", null, columns.map((c, i) => /* @__PURE__ */ import_react13.default.createElement("th", { key: i, scope: "col", className: "table-head" }, c)))), /* @__PURE__ */ import_react13.default.createElement("tbody", null, rows.map((row, r) => /* @__PURE__ */ import_react13.default.createElement("tr", { key: r }, row.map(
      (cell, c) => rowHeader && c === 0 ? /* @__PURE__ */ import_react13.default.createElement("th", { key: c, scope: "row", className: "table-cell" }, cell) : /* @__PURE__ */ import_react13.default.createElement("td", { key: c, className: "table-cell" }, cell)
    )))))), note ? /* @__PURE__ */ import_react13.default.createElement("p", { className: "du-note note" }, /* @__PURE__ */ import_react13.default.createElement("i", null, "Nota."), " ", note) : null);
  }

  // src/components/Figure.jsx
  var import_react14 = __toESM(require_react(), 1);
  function Figure({ number, id, title, note, children }) {
    const auto = useNumber("figure", id);
    number = number ?? auto;
    return /* @__PURE__ */ import_react14.default.createElement("figure", { className: "du-figure", id: id ? `fig-${id}` : void 0 }, number != null ? /* @__PURE__ */ import_react14.default.createElement("p", { className: "du-figure__number table-number" }, "Figura ", number) : null, title ? /* @__PURE__ */ import_react14.default.createElement("p", { className: "du-figure__title table-title" }, title) : null, /* @__PURE__ */ import_react14.default.createElement("div", { className: "du-figure__body" }, children), note ? /* @__PURE__ */ import_react14.default.createElement("p", { className: "du-note note" }, /* @__PURE__ */ import_react14.default.createElement("i", null, "Nota."), " ", note) : null);
  }

  // src/components/ConceptWeb.jsx
  var import_react15 = __toESM(require_react(), 1);

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

  // src/components/ConceptWeb.jsx
  var W = 680;
  var LH = 18;
  function Node({ x, y, lines, strong, detail = [] }) {
    const all = [...lines, ...detail];
    const w = Math.max(96, ...lines.map((l) => textWidth(l, 16)), ...detail.map((l) => textWidth(l, 14))) + 24;
    const h = all.length * LH + 16;
    const top = y - h / 2;
    return /* @__PURE__ */ import_react15.default.createElement("g", null, /* @__PURE__ */ import_react15.default.createElement("rect", { className: strong ? "du-dg-node du-dg-node--strong" : "du-dg-node", x: x - w / 2, y: top, width: w, height: h }), lines.map((l, i) => /* @__PURE__ */ import_react15.default.createElement("text", { key: i, className: `du-dg-text diagram-title${strong ? " du-dg-text--on-strong" : ""}`, x, y: top + 8 + LH * (i + 0.75), textAnchor: "middle" }, l)), detail.map((l, i) => /* @__PURE__ */ import_react15.default.createElement("text", { key: `d${i}`, className: "du-dg-text diagram-label", x, y: top + 8 + LH * (lines.length + i + 0.75), textAnchor: "middle" }, l)));
  }
  function ConceptWeb({ center, nodes, label }) {
    const n = nodes.length;
    const rows = nodes.map((nd) => wrap(nd.label, 18).length + (nd.detail ? wrap(nd.detail, 22).length : 0));
    const H2 = Math.max(360, 260 + Math.max(...rows, 1) * LH * 2);
    const cx = W / 2, cy = H2 / 2, rx = 250, ry = H2 / 2 - 30 - Math.max(...rows, 1) * LH / 2;
    const pos = nodes.map((_, i) => {
      const a = -Math.PI / 2 + 2 * Math.PI * i / n;
      return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
    });
    return /* @__PURE__ */ import_react15.default.createElement("svg", { className: "du-diagram", viewBox: `0 0 ${W} ${H2}`, role: "img", "aria-label": label || `Red conceptual: ${center}` }, pos.map(([x, y], i) => /* @__PURE__ */ import_react15.default.createElement("line", { key: i, className: "du-dg-edge", x1: cx, y1: cy, x2: x, y2: y })), /* @__PURE__ */ import_react15.default.createElement(Node, { x: cx, y: cy, lines: wrap(center, 16), strong: true }), nodes.map((nd, i) => /* @__PURE__ */ import_react15.default.createElement(Node, { key: i, x: pos[i][0], y: pos[i][1], lines: wrap(nd.label, 18), detail: nd.detail ? wrap(nd.detail, 22) : [] })), nodes.map((nd, i) => nd.relation ? /* @__PURE__ */ import_react15.default.createElement("g", { key: `r${i}` }, /* @__PURE__ */ import_react15.default.createElement("rect", { className: "du-dg-relation-bg", x: (cx + pos[i][0]) / 2 - textWidth(nd.relation, 14) / 2 - 4, y: (cy + pos[i][1]) / 2 - 10, width: textWidth(nd.relation, 14) + 8, height: 18 }), /* @__PURE__ */ import_react15.default.createElement("text", { className: "du-dg-relation", x: (cx + pos[i][0]) / 2, y: (cy + pos[i][1]) / 2 + 3, textAnchor: "middle" }, nd.relation)) : null));
  }

  // src/components/CycleDiagram.jsx
  var import_react16 = __toESM(require_react(), 1);
  var W2 = 680;
  var H = 420;
  var LH2 = 18;
  function CycleDiagram({ steps, center, label }) {
    const id = (0, import_react16.useId)().replace(/:/g, "");
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
    return /* @__PURE__ */ import_react16.default.createElement("svg", { className: "du-diagram", viewBox: `0 0 ${W2} ${H}`, role: "img", "aria-label": label || `Ciclo: ${steps.map((s) => s.title).join(", ")}` }, /* @__PURE__ */ import_react16.default.createElement("defs", null, /* @__PURE__ */ import_react16.default.createElement("marker", { id: `a${id}`, viewBox: "0 0 10 10", refX: "8", refY: "5", markerWidth: "7", markerHeight: "7", orient: "auto-start-reverse" }, /* @__PURE__ */ import_react16.default.createElement("path", { className: "du-dg-arrowhead", d: "M 0 0 L 10 5 L 0 10 z" }))), steps.map((_, i) => /* @__PURE__ */ import_react16.default.createElement("path", { key: i, className: "du-dg-edge du-dg-edge--arc", d: arc(i), markerEnd: `url(#a${id})` })), center ? wrap(center, 16).map((l, i, arr) => /* @__PURE__ */ import_react16.default.createElement("text", { key: i, className: "du-dg-text du-dg-text--muted diagram-title", x: cx, y: cy + (i - (arr.length - 1) / 2) * LH2 + 5, textAnchor: "middle" }, l)) : null, steps.map((s, i) => {
      const x = cx + R * Math.cos(ang(i)), y = cy + R * Math.sin(ang(i));
      const t = wrap(s.title, 16), d = s.text ? wrap(s.text, 20) : [];
      const w = Math.max(...t.map((l) => textWidth(l, 16)), ...d.map((l) => textWidth(l, 14)), 80) + 24;
      const h = (t.length + d.length) * LH2 + 16, top = y - h / 2;
      return /* @__PURE__ */ import_react16.default.createElement("g", { key: i }, /* @__PURE__ */ import_react16.default.createElement("rect", { className: "du-dg-node", x: x - w / 2, y: top, width: w, height: h }), t.map((l, j) => /* @__PURE__ */ import_react16.default.createElement("text", { key: j, className: "du-dg-text diagram-title", x, y: top + 8 + LH2 * (j + 0.75), textAnchor: "middle" }, l)), d.map((l, j) => /* @__PURE__ */ import_react16.default.createElement("text", { key: `d${j}`, className: "du-dg-text diagram-label", x, y: top + 8 + LH2 * (t.length + j + 0.75), textAnchor: "middle" }, l)));
    }));
  }

  // src/components/Pyramid.jsx
  var import_react17 = __toESM(require_react(), 1);
  var W3 = 680;
  var LH3 = 18;
  var LEVEL_H = 72;
  var PW = 330;
  function Pyramid({ levels, label }) {
    const n = levels.length;
    const H2 = n * LEVEL_H + 8;
    const cx = PW / 2 + 4;
    const halfAt = (y) => PW / 2 * (y / (n * LEVEL_H));
    return /* @__PURE__ */ import_react17.default.createElement("svg", { className: "du-diagram", viewBox: `0 0 ${W3} ${H2}`, role: "img", "aria-label": label || `Pir\xE1mide: ${levels.map((l) => l.title).join(", ")}` }, levels.map((lv, i) => {
      const y1 = i * LEVEL_H, y2 = (i + 1) * LEVEL_H - 4;
      const pts = [[cx - halfAt(y1), y1 + 4], [cx + halfAt(y1), y1 + 4], [cx + halfAt(y2 + 4), y2 + 4], [cx - halfAt(y2 + 4), y2 + 4]];
      const ramp = Math.min(i + 1 + Math.max(0, 4 - n), 4);
      const t = wrap(lv.title, i === 0 ? 10 : 18);
      const d = lv.text ? wrap(lv.text, 40) : [];
      const mid = (y1 + y2) / 2 + 4;
      return /* @__PURE__ */ import_react17.default.createElement("g", { key: i }, /* @__PURE__ */ import_react17.default.createElement("polygon", { className: `du-dg-ramp du-dg-ramp--${ramp}`, points: pts.map((p) => p.join(",")).join(" ") }), t.map((l, j) => /* @__PURE__ */ import_react17.default.createElement("text", { key: j, className: `du-dg-text diagram-title du-dg-on-ramp--${ramp}`, x: cx, y: mid + (j - (t.length - 1) / 2) * LH3 + 5, textAnchor: "middle" }, l)), /* @__PURE__ */ import_react17.default.createElement("line", { className: "du-dg-leader", x1: cx + halfAt(mid) + 8, y1: mid, x2: PW + 24, y2: mid }), d.map((l, j) => /* @__PURE__ */ import_react17.default.createElement("text", { key: `d${j}`, className: "du-dg-text diagram-label", x: PW + 32, y: mid + (j - (d.length - 1) / 2) * LH3 + 5 }, l)));
    }));
  }

  // src/components/ProcessFlow.jsx
  var import_react18 = __toESM(require_react(), 1);
  function ProcessFlow({ steps, label }) {
    return /* @__PURE__ */ import_react18.default.createElement("ol", { className: "du-flow", "aria-label": label }, steps.map((s, i) => /* @__PURE__ */ import_react18.default.createElement("li", { key: i, className: "du-flow__step" }, /* @__PURE__ */ import_react18.default.createElement("span", { className: "du-flow__num diagram-title", "aria-hidden": "true" }, i + 1), /* @__PURE__ */ import_react18.default.createElement("span", { className: "du-flow__title diagram-title" }, s.title), s.text ? /* @__PURE__ */ import_react18.default.createElement("span", { className: "du-flow__text diagram-label" }, s.text) : null)));
  }

  // src/components/GlossaryEntry.jsx
  var import_react19 = __toESM(require_react(), 1);
  function GlossaryEntry({ term, id, children }) {
    return /* @__PURE__ */ import_react19.default.createElement("p", { className: "du-glossary glossary", id: id ? `gl-${id}` : void 0 }, /* @__PURE__ */ import_react19.default.createElement("dfn", { className: "du-glossary__term" }, term, ":"), " ", children);
  }

  // src/components/Glossary.jsx
  var import_react20 = __toESM(require_react(), 1);
  function Glossary({ entries }) {
    const sorted = [...entries].sort((a, b) => a.term.localeCompare(b.term, "es", { sensitivity: "base" }));
    return /* @__PURE__ */ import_react20.default.createElement("div", { className: "du-glossary-list" }, sorted.map((e) => /* @__PURE__ */ import_react20.default.createElement(GlossaryEntry, { key: e.id, id: e.id, term: e.term }, e.definition)));
  }
  function Term({ to, children }) {
    return /* @__PURE__ */ import_react20.default.createElement("a", { className: "du-term", href: `#gl-${to}` }, children);
  }

  // src/components/Reference.jsx
  var import_react21 = __toESM(require_react(), 1);
  function Reference({ children }) {
    return /* @__PURE__ */ import_react21.default.createElement("p", { className: "du-reference reference" }, children);
  }
  return __toCommonJS(index_exports);
})();
