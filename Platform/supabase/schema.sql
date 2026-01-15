-- ============================================================
-- KLANT IN BEELD - SUPABASE DATABASE SCHEMA
-- Voer dit script uit in je Supabase SQL Editor
-- Dashboard -> SQL Editor -> New Query -> Plak dit script
-- ============================================================

-- Stap 1: Schakel UUID extensie in (meestal al actief)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABEL: baten
-- ============================================================
CREATE TABLE IF NOT EXISTS baten (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sector TEXT NOT NULL,
  domein TEXT NOT NULL,
  naam TEXT NOT NULL,
  beschrijving TEXT,
  indicator TEXT,
  huidige_waarde TEXT,
  doel_waarde TEXT,
  eigenaar TEXT,
  status TEXT DEFAULT 'planned' CHECK (status IN ('planned', 'in_progress', 'completed', 'on_hold')),
  domein_impact JSONB DEFAULT '{}',
  gekoppeld_doel UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABEL: inspanningen
-- ============================================================
CREATE TABLE IF NOT EXISTS inspanningen (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT CHECK (type IN ('project', 'leer', 'proces', 'systeem', 'communicatie')),
  code TEXT,
  naam TEXT NOT NULL,
  beschrijving TEXT,
  sector TEXT,
  domein TEXT,
  eigenaar TEXT,
  leider TEXT,
  start_maand INTEGER,
  eind_maand INTEGER,
  status TEXT DEFAULT 'planned' CHECK (status IN ('planned', 'in_progress', 'completed', 'on_hold', 'cancelled')),
  levenscyclus TEXT,
  werkfase INTEGER,
  gekoppelde_baten TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABEL: stakeholders
-- ============================================================
CREATE TABLE IF NOT EXISTS stakeholders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  naam TEXT NOT NULL,
  rol TEXT,
  functie TEXT,
  email TEXT,
  telefoon TEXT,
  afdeling TEXT,
  belang TEXT CHECK (belang IN ('low', 'medium', 'high')),
  invloed TEXT CHECK (invloed IN ('low', 'medium', 'high')),
  notities TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABEL: risicos
-- ============================================================
CREATE TABLE IF NOT EXISTS risicos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titel TEXT NOT NULL,
  beschrijving TEXT,
  categorie TEXT,
  kans INTEGER CHECK (kans >= 1 AND kans <= 5),
  impact INTEGER CHECK (impact >= 1 AND impact <= 5),
  score INTEGER GENERATED ALWAYS AS (kans * impact) STORED,
  eigenaar TEXT,
  mitigatie TEXT,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_behandeling', 'gemitigeerd', 'geaccepteerd', 'gesloten')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABEL: issues
-- ============================================================
CREATE TABLE IF NOT EXISTS issues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titel TEXT NOT NULL,
  beschrijving TEXT,
  prioriteit TEXT CHECK (prioriteit IN ('low', 'medium', 'high', 'critical')),
  eigenaar TEXT,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_behandeling', 'opgelost', 'gesloten')),
  oplossing TEXT,
  datum_gemeld TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABEL: strategische_doelen
-- ============================================================
CREATE TABLE IF NOT EXISTS strategische_doelen (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titel TEXT NOT NULL,
  beschrijving TEXT,
  indicator TEXT,
  huidige_waarde TEXT,
  doel_waarde TEXT,
  prioriteit TEXT CHECK (prioriteit IN ('low', 'medium', 'high')),
  tijdshorizon TEXT,
  eigenaar TEXT,
  status TEXT DEFAULT 'actief' CHECK (status IN ('concept', 'actief', 'bereikt', 'geannuleerd')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABEL: vermogens (capabilities)
-- ============================================================
CREATE TABLE IF NOT EXISTS vermogens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  naam TEXT NOT NULL,
  beschrijving TEXT,
  type TEXT CHECK (type IN ('Inhoudelijk', 'Organisatorisch', 'Technisch', 'Cultureel', 'Menselijk')),
  domein TEXT,
  volwassenheid_huidig INTEGER CHECK (volwassenheid_huidig >= 1 AND volwassenheid_huidig <= 5),
  volwassenheid_doel INTEGER CHECK (volwassenheid_doel >= 1 AND volwassenheid_doel <= 5),
  gekoppelde_doelen TEXT[] DEFAULT '{}',
  gekoppelde_inspanningen TEXT[] DEFAULT '{}',
  gekoppelde_baten TEXT[] DEFAULT '{}',
  eigenaar TEXT,
  status TEXT DEFAULT 'gepland' CHECK (status IN ('gepland', 'in_ontwikkeling', 'operationeel', 'verouderd')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABEL: visie (single record)
-- ============================================================
CREATE TABLE IF NOT EXISTS visie (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  programma_visie TEXT,
  missie TEXT,
  horizon TEXT,
  bron_document TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all tables
CREATE TRIGGER update_baten_updated_at BEFORE UPDATE ON baten
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inspanningen_updated_at BEFORE UPDATE ON inspanningen
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stakeholders_updated_at BEFORE UPDATE ON stakeholders
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_risicos_updated_at BEFORE UPDATE ON risicos
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_issues_updated_at BEFORE UPDATE ON issues
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_strategische_doelen_updated_at BEFORE UPDATE ON strategische_doelen
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vermogens_updated_at BEFORE UPDATE ON vermogens
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_visie_updated_at BEFORE UPDATE ON visie
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- INDEXEN VOOR PERFORMANCE
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_baten_sector ON baten(sector);
CREATE INDEX IF NOT EXISTS idx_baten_status ON baten(status);
CREATE INDEX IF NOT EXISTS idx_inspanningen_sector ON inspanningen(sector);
CREATE INDEX IF NOT EXISTS idx_inspanningen_status ON inspanningen(status);
CREATE INDEX IF NOT EXISTS idx_risicos_score ON risicos(score DESC);
CREATE INDEX IF NOT EXISTS idx_risicos_status ON risicos(status);
CREATE INDEX IF NOT EXISTS idx_issues_prioriteit ON issues(prioriteit);
CREATE INDEX IF NOT EXISTS idx_issues_status ON issues(status);
