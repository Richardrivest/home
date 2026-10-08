-- Didáctica Universitaria design-system database (SQLite).
-- Built from tokens/tokens.json and src/components.meta.json by scripts/build-db.mjs.

CREATE TABLE IF NOT EXISTS system (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS theme (
  id       TEXT PRIMARY KEY,
  name     TEXT NOT NULL,
  position INTEGER NOT NULL
);

-- Colour tokens: one row per token, one value row per theme.
CREATE TABLE IF NOT EXISTS color_token (
  name     TEXT PRIMARY KEY,
  usage    TEXT,
  position INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS color_value (
  token TEXT NOT NULL REFERENCES color_token(name) ON DELETE CASCADE,
  theme TEXT NOT NULL REFERENCES theme(id) ON DELETE CASCADE,
  value TEXT NOT NULL,
  PRIMARY KEY (token, theme)
);

-- Spacing, radius, stroke, shadow and any other family (themed values stored as JSON).
CREATE TABLE IF NOT EXISTS dimension_token (
  family   TEXT NOT NULL,
  name     TEXT PRIMARY KEY,
  value    TEXT NOT NULL,
  usage    TEXT,
  position INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS font_family (
  key   TEXT PRIMARY KEY,
  stack TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS type_style (
  name           TEXT PRIMARY KEY,
  type_group     TEXT NOT NULL,
  family         TEXT NOT NULL REFERENCES font_family(key),
  font_size      TEXT NOT NULL,
  line_height    TEXT,
  font_weight    INTEGER,
  font_style     TEXT,
  letter_spacing TEXT,
  sample         TEXT,
  usage          TEXT,
  position       INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS component (
  name       TEXT PRIMARY KEY,
  comp_group TEXT NOT NULL,
  summary    TEXT NOT NULL,
  position   INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS component_prop (
  component   TEXT NOT NULL REFERENCES component(name) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  type        TEXT NOT NULL,
  required    INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  PRIMARY KEY (component, name)
);

-- The seven didactic boxes, with their Lucide icon (single-ink SVG).
CREATE TABLE IF NOT EXISTS box_type (
  kind      TEXT PRIMARY KEY,
  title     TEXT NOT NULL,
  component TEXT NOT NULL REFERENCES component(name),
  icon      TEXT NOT NULL,
  icon_svg  TEXT NOT NULL,
  placement TEXT,
  position  INTEGER NOT NULL
);

-- Bloom's revised taxonomy used by every “Objetivos” box.
CREATE TABLE IF NOT EXISTS bloom_level (
  id    TEXT PRIMARY KEY,
  level INTEGER NOT NULL UNIQUE,
  name  TEXT NOT NULL,
  verbs TEXT NOT NULL
);

-- Flat view: every colour in every theme.
CREATE VIEW IF NOT EXISTS color_matrix AS
  SELECT ct.name AS token, t.id AS theme, cv.value, ct.usage
  FROM color_token ct
  JOIN theme t
  JOIN color_value cv ON cv.token = ct.name AND cv.theme = t.id
  ORDER BY ct.position, t.position;
