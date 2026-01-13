-- Klant in Beeld Database Schema
-- Voer dit uit in Supabase SQL Editor

-- Baten tabel
CREATE TABLE IF NOT EXISTS baten (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT CHECK (type IN ('domein', 'sector')),
  domein TEXT,
  sector TEXT,
  naam TEXT NOT NULL,
  beschrijving TEXT,
  indicator TEXT,
  huidige_waarde TEXT,
  doel_waarde TEXT,
  eigenaar TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inspanningen tabel
CREATE TABLE IF NOT EXISTS inspanningen (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT CHECK (type IN ('project', 'proces', 'leer', 'systeem')),
  code TEXT,
  naam TEXT NOT NULL,
  beschrijving TEXT,
  domein TEXT,
  sector TEXT,
  eigenaar TEXT,
  leider TEXT,
  start_maand INT,
  eind_maand INT,
  status TEXT DEFAULT 'planned',
  fase TEXT,
  afhankelijkheden TEXT[],
  risicos TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stakeholders tabel
CREATE TABLE IF NOT EXISTS stakeholders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  naam TEXT NOT NULL,
  rol TEXT NOT NULL,
  functie TEXT,
  email TEXT,
  telefoon TEXT,
  sector TEXT,
  verantwoordelijkheden TEXT[],
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Risicos tabel
CREATE TABLE IF NOT EXISTS risicos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  beschrijving TEXT NOT NULL,
  domein TEXT,
  kans TEXT CHECK (kans IN ('laag', 'medium', 'hoog')),
  impact TEXT CHECK (impact IN ('laag', 'medium', 'hoog')),
  mitigatie TEXT,
  eigenaar TEXT,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- KPIs tabel
CREATE TABLE IF NOT EXISTS kpis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  baat_id UUID REFERENCES baten(id) ON DELETE CASCADE,
  maand INT,
  jaar INT,
  waarde TEXT,
  notitie TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Documenten tabel
CREATE TABLE IF NOT EXISTS documenten (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  naam TEXT NOT NULL,
  type TEXT,
  categorie TEXT,
  status TEXT,
  versie TEXT,
  path TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) inschakelen
ALTER TABLE baten ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspanningen ENABLE ROW LEVEL SECURITY;
ALTER TABLE stakeholders ENABLE ROW LEVEL SECURITY;
ALTER TABLE risicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpis ENABLE ROW LEVEL SECURITY;
ALTER TABLE documenten ENABLE ROW LEVEL SECURITY;

-- Policies voor publieke toegang (voor development)
-- In productie wil je dit beperken met authenticatie
CREATE POLICY "Allow all access to baten" ON baten FOR ALL USING (true);
CREATE POLICY "Allow all access to inspanningen" ON inspanningen FOR ALL USING (true);
CREATE POLICY "Allow all access to stakeholders" ON stakeholders FOR ALL USING (true);
CREATE POLICY "Allow all access to risicos" ON risicos FOR ALL USING (true);
CREATE POLICY "Allow all access to kpis" ON kpis FOR ALL USING (true);
CREATE POLICY "Allow all access to documenten" ON documenten FOR ALL USING (true);

-- Indexes voor betere performance
CREATE INDEX IF NOT EXISTS idx_baten_type ON baten(type);
CREATE INDEX IF NOT EXISTS idx_baten_domein ON baten(domein);
CREATE INDEX IF NOT EXISTS idx_inspanningen_type ON inspanningen(type);
CREATE INDEX IF NOT EXISTS idx_inspanningen_status ON inspanningen(status);
