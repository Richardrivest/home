/* @ds-bundle: {"format":4,"namespace":"Didactica","components":[{"name":"Page"},{"name":"TitlePage"},{"name":"TableOfContents"},{"name":"Heading"},{"name":"Paragraph"},{"name":"ConceptBox"},{"name":"DataTable"},{"name":"BulletList"},{"name":"GlossaryEntry"},{"name":"Reference"}]} */
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
    BulletList: () => BulletList,
    ConceptBox: () => ConceptBox,
    DataTable: () => DataTable,
    GlossaryEntry: () => GlossaryEntry,
    Heading: () => Heading,
    Page: () => Page,
    Paragraph: () => Paragraph,
    Reference: () => Reference,
    TableOfContents: () => TableOfContents,
    TitlePage: () => TitlePage
  });

  // src/components/Page.jsx
  var import_react = __toESM(require_react(), 1);
  function Page({ header, page, children, className = "" }) {
    return /* @__PURE__ */ import_react.default.createElement("section", { className: `du-page ${className}`.trim() }, header ? /* @__PURE__ */ import_react.default.createElement("p", { className: "du-running-header running" }, header) : null, children, page != null ? /* @__PURE__ */ import_react.default.createElement("p", { className: "du-page-footer running" }, "P\xE1gina ", page) : null);
  }

  // src/components/TitlePage.jsx
  var import_react2 = __toESM(require_react(), 1);
  function TitlePage({ kicker, title, subtitle, lede, ribbon, meta = [] }) {
    return /* @__PURE__ */ import_react2.default.createElement("header", { className: "du-title-page" }, kicker ? /* @__PURE__ */ import_react2.default.createElement("p", { className: "du-title-page__kicker cover-kicker" }, kicker) : null, /* @__PURE__ */ import_react2.default.createElement("h1", { className: "du-title-page__title cover-title" }, title), subtitle ? /* @__PURE__ */ import_react2.default.createElement("p", { className: "du-title-page__subtitle cover-subtitle" }, subtitle) : null, lede ? /* @__PURE__ */ import_react2.default.createElement("p", { className: "du-title-page__lede cover-lede" }, lede) : null, ribbon ? /* @__PURE__ */ import_react2.default.createElement("p", { className: "du-ribbon ribbon" }, ribbon) : null, meta.map((line, i) => /* @__PURE__ */ import_react2.default.createElement("p", { key: i, className: "du-title-page__meta cover-meta" }, line)));
  }

  // src/components/TableOfContents.jsx
  var import_react3 = __toESM(require_react(), 1);
  function TableOfContents({ title = "\xCDndice", entries }) {
    return /* @__PURE__ */ import_react3.default.createElement("nav", { "aria-label": title }, /* @__PURE__ */ import_react3.default.createElement("h2", { className: "du-toc-title toc-title" }, title), /* @__PURE__ */ import_react3.default.createElement("ol", { className: "du-toc" }, entries.map((e, i) => /* @__PURE__ */ import_react3.default.createElement("li", { key: i, className: `du-toc__entry du-toc__entry--${e.level || 1} body` }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "du-toc__title" }, e.title), /* @__PURE__ */ import_react3.default.createElement("span", { className: "du-toc__leader", "aria-hidden": "true" }), /* @__PURE__ */ import_react3.default.createElement("span", { className: "du-toc__page" }, e.page)))));
  }

  // src/components/Heading.jsx
  var import_react4 = __toESM(require_react(), 1);
  var TAGS = { 1: "h1", 2: "h2", 3: "h3" };
  function Heading({ level = 1, children, id }) {
    const Tag = TAGS[level] || "h1";
    const l = TAGS[level] ? level : 1;
    return /* @__PURE__ */ import_react4.default.createElement(Tag, { id, className: `du-h${l} h${l}` }, children);
  }

  // src/components/Paragraph.jsx
  var import_react5 = __toESM(require_react(), 1);
  function Paragraph({ children }) {
    return /* @__PURE__ */ import_react5.default.createElement("p", { className: "du-body body" }, children);
  }

  // src/components/ConceptBox.jsx
  var import_react6 = __toESM(require_react(), 1);
  function ConceptBox({ term, label = "Concepto clave", children }) {
    return /* @__PURE__ */ import_react6.default.createElement("aside", { className: "du-concept", "aria-label": `${label}: ${term}` }, /* @__PURE__ */ import_react6.default.createElement("p", { className: "du-concept__label concept-label" }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "du-concept__prefix" }, label), " \u2014 ", term), /* @__PURE__ */ import_react6.default.createElement("p", { className: "du-concept__body concept-body" }, children));
  }

  // src/components/DataTable.jsx
  var import_react7 = __toESM(require_react(), 1);
  function DataTable({ columns, rows, widths, number, caption }) {
    return /* @__PURE__ */ import_react7.default.createElement("figure", { className: "du-table-figure" }, /* @__PURE__ */ import_react7.default.createElement("table", { className: "du-table" }, widths ? /* @__PURE__ */ import_react7.default.createElement("colgroup", null, widths.map((w, i) => /* @__PURE__ */ import_react7.default.createElement("col", { key: i, style: { width: w } }))) : null, /* @__PURE__ */ import_react7.default.createElement("thead", null, /* @__PURE__ */ import_react7.default.createElement("tr", null, columns.map((c, i) => /* @__PURE__ */ import_react7.default.createElement("th", { key: i, scope: "col", className: "table-head" }, c)))), /* @__PURE__ */ import_react7.default.createElement("tbody", null, rows.map((row, r) => /* @__PURE__ */ import_react7.default.createElement("tr", { key: r }, row.map((cell, c) => /* @__PURE__ */ import_react7.default.createElement("td", { key: c, className: "table-cell" }, cell)))))), caption ? /* @__PURE__ */ import_react7.default.createElement("figcaption", { className: "du-caption caption" }, number != null ? `Tabla ${number}. ` : "", caption) : null);
  }

  // src/components/BulletList.jsx
  var import_react8 = __toESM(require_react(), 1);
  function BulletList({ items }) {
    return /* @__PURE__ */ import_react8.default.createElement("ul", { className: "du-list" }, items.map((item, i) => {
      const text = typeof item === "string" ? item : item.text;
      const sub = typeof item === "string" ? null : item.items;
      return /* @__PURE__ */ import_react8.default.createElement("li", { key: i, className: "du-list__item list-item" }, text, sub && sub.length ? /* @__PURE__ */ import_react8.default.createElement(BulletList, { items: sub }) : null);
    }));
  }

  // src/components/GlossaryEntry.jsx
  var import_react9 = __toESM(require_react(), 1);
  function GlossaryEntry({ term, children }) {
    return /* @__PURE__ */ import_react9.default.createElement("p", { className: "du-glossary glossary" }, /* @__PURE__ */ import_react9.default.createElement("dfn", { className: "du-glossary__term" }, term, ":"), " ", children);
  }

  // src/components/Reference.jsx
  var import_react10 = __toESM(require_react(), 1);
  function Reference({ children }) {
    return /* @__PURE__ */ import_react10.default.createElement("p", { className: "du-reference reference" }, children);
  }
  return __toCommonJS(index_exports);
})();
