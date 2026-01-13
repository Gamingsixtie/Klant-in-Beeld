-- =============================================
-- KLANT IN BEELD - Supabase Database Schema
-- =============================================
-- Methodologie: "Werken aan Programma's" (Prevaas & Van Loon)
--
-- Voer dit script uit in de Supabase SQL Editor:
-- https://supabase.com/dashboard/project/[PROJECT_ID]/sql
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABEL 1: BATEN
-- =============================================
CREATE TABLE IF NOT EXISTS baten (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type VARCHAR(50) NOT NULL CHECK (type IN ('domein', 'sector', 'organisatie')),
  domein VARCHAR(50),
  sector VARCHAR(100),
  naam VARCHAR(255) NOT NULL,
  beschrijving TEXT,
  indicator VARCHAR(255),
  huidige_waarde VARCHAR(100),
  doel_waarde VARCHAR(100),
  eigenaar VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS (Row Level Security)
ALTER TABLE baten ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all for authenticated users" ON baten FOR ALL USING (true);

-- =============================================
-- TABEL 2: INSPANNINGEN
-- =============================================
-- Levensloopcycli: verkennen → opbouwen → uitvoeren → afbouwen
-- Werkfases (per sector): 1=Identificeer, 2=Analyseer AS-IS, 3=Ontwerp TO-BE, 4=Implementeer
CREATE TABLE IF NOT EXISTS inspanningen (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type VARCHAR(50) NOT NULL CHECK (type IN ('project', 'proces', 'leer', 'systeem')),
  code VARCHAR(20) NOT NULL UNIQUE,
  naam VARCHAR(255) NOT NULL,
  beschrijving TEXT,
  domein VARCHAR(50) CHECK (domein IN ('Mens', 'Proces', 'Systeem', 'Cultuur')),
  eigenaar VARCHAR(255),
  leider VARCHAR(255),
  start_maand INTEGER NOT NULL CHECK (start_maand >= 1 AND start_maand <= 18),
  eind_maand INTEGER NOT NULL CHECK (eind_maand >= 1 AND eind_maand <= 18),
  status VARCHAR(50) DEFAULT 'planned' CHECK (status IN ('planned', 'in_progress', 'completed')),
  -- Levensloopcyclus conform methodologie
  levenscyclus VARCHAR(50) CHECK (levenscyclus IN ('verkennen', 'opbouwen', 'uitvoeren', 'afbouwen')),
  -- Werkfase per sector (1-4)
  werkfase INTEGER CHECK (werkfase >= 1 AND werkfase <= 4),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE inspanningen ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all for authenticated users" ON inspanningen FOR ALL USING (true);

-- =============================================
-- TABEL 3: STAKEHOLDERS
-- =============================================
CREATE TABLE IF NOT EXISTS stakeholders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  naam VARCHAR(255) NOT NULL,
  rol VARCHAR(100) NOT NULL,
  functie VARCHAR(255),
  verantwoordelijkheden TEXT[], -- PostgreSQL array type
  email VARCHAR(255),
  telefoon VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE stakeholders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all for authenticated users" ON stakeholders FOR ALL USING (true);

-- =============================================
-- TABEL 4: RISICOS
-- =============================================
CREATE TABLE IF NOT EXISTS risicos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  titel VARCHAR(255) NOT NULL,
  beschrijving TEXT,
  categorie VARCHAR(100) CHECK (categorie IN ('Organisatie', 'Technisch', 'Budget', 'Planning', 'Scope', 'Externe factoren')),
  kans INTEGER CHECK (kans >= 1 AND kans <= 5),
  impact INTEGER CHECK (impact >= 1 AND impact <= 5),
  score INTEGER GENERATED ALWAYS AS (kans * impact) STORED,
  eigenaar VARCHAR(255),
  mitigatie_maatregel TEXT,
  contingency_plan TEXT,
  status VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open', 'in_behandeling', 'gemitigeerd', 'geaccepteerd', 'gesloten')),
  trend VARCHAR(50) DEFAULT 'stabiel' CHECK (trend IN ('stijgend', 'stabiel', 'dalend')),
  datum_geidentificeerd DATE DEFAULT CURRENT_DATE,
  review_datum DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE risicos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all for authenticated users" ON risicos FOR ALL USING (true);

-- =============================================
-- TABEL 5: ISSUES
-- =============================================
CREATE TABLE IF NOT EXISTS issues (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  titel VARCHAR(255) NOT NULL,
  beschrijving TEXT,
  categorie VARCHAR(100) CHECK (categorie IN ('Organisatie', 'Technisch', 'Budget', 'Planning', 'Scope', 'Externe factoren')),
  prioriteit VARCHAR(50) DEFAULT 'midden' CHECK (prioriteit IN ('laag', 'midden', 'hoog', 'kritiek')),
  impact VARCHAR(100),
  impact_omschrijving TEXT,
  eigenaar VARCHAR(255),
  oplossing TEXT,
  status VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open', 'in_behandeling', 'wacht_op_besluit', 'opgelost', 'gesloten')),
  datum_gemeld DATE DEFAULT CURRENT_DATE,
  datum_opgelost DATE,
  escalatie_nodig BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE issues ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all for authenticated users" ON issues FOR ALL USING (true);

-- =============================================
-- TRIGGERS voor updated_at
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_baten_updated_at BEFORE UPDATE ON baten FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inspanningen_updated_at BEFORE UPDATE ON inspanningen FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_stakeholders_updated_at BEFORE UPDATE ON stakeholders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_risicos_updated_at BEFORE UPDATE ON risicos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_issues_updated_at BEFORE UPDATE ON issues FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- INDEXES voor performance
-- =============================================
CREATE INDEX IF NOT EXISTS idx_baten_status ON baten(status);
CREATE INDEX IF NOT EXISTS idx_baten_domein ON baten(domein);
CREATE INDEX IF NOT EXISTS idx_inspanningen_status ON inspanningen(status);
CREATE INDEX IF NOT EXISTS idx_inspanningen_domein ON inspanningen(domein);
CREATE INDEX IF NOT EXISTS idx_inspanningen_levenscyclus ON inspanningen(levenscyclus);
CREATE INDEX IF NOT EXISTS idx_risicos_status ON risicos(status);
CREATE INDEX IF NOT EXISTS idx_risicos_score ON risicos(score);
CREATE INDEX IF NOT EXISTS idx_issues_status ON issues(status);
CREATE INDEX IF NOT EXISTS idx_issues_prioriteit ON issues(prioriteit);
