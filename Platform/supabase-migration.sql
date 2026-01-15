-- =====================================================
-- SUPABASE MIGRATIE: Strategische Doelen, Vermogens, Visie
-- =====================================================
-- Voer dit script uit in de Supabase SQL Editor:
-- https://supabase.com/dashboard/project/itgrssnozolvvsdgyfkr/sql/new
-- =====================================================

-- ==================== STRATEGISCHE DOELEN ====================
CREATE TABLE IF NOT EXISTS strategische_doelen (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titel TEXT NOT NULL,
  beschrijving TEXT,
  indicator TEXT,
  huidige_waarde TEXT,
  doel_waarde TEXT,
  prioriteit TEXT DEFAULT 'medium' CHECK (prioriteit IN ('high', 'medium', 'low')),
  tijdshorizon TEXT,
  eigenaar TEXT,
  status TEXT DEFAULT 'actief' CHECK (status IN ('actief', 'bereikt', 'gepauzeerd', 'vervallen')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS voor strategische_doelen
ALTER TABLE strategische_doelen ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous access to strategische_doelen" ON strategische_doelen
  FOR ALL USING (true) WITH CHECK (true);

-- ==================== VERMOGENS ====================
CREATE TABLE IF NOT EXISTS vermogens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  naam TEXT NOT NULL,
  beschrijving TEXT,
  type TEXT CHECK (type IN ('Inhoudelijk', 'Organisatorisch', 'Technisch', 'Cultureel', 'Menselijk')),
  domein TEXT CHECK (domein IN ('Mens', 'Proces', 'Systeem', 'Cultuur')),
  volwassenheid_huidig INTEGER DEFAULT 1 CHECK (volwassenheid_huidig >= 1 AND volwassenheid_huidig <= 5),
  volwassenheid_doel INTEGER DEFAULT 3 CHECK (volwassenheid_doel >= 1 AND volwassenheid_doel <= 5),
  gekoppelde_doelen TEXT[] DEFAULT '{}',
  gekoppelde_inspanningen TEXT[] DEFAULT '{}',
  gekoppelde_baten TEXT[] DEFAULT '{}',
  eigenaar TEXT,
  status TEXT DEFAULT 'gepland' CHECK (status IN ('gepland', 'in_ontwikkeling', 'operationeel', 'volwassen')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS voor vermogens
ALTER TABLE vermogens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous access to vermogens" ON vermogens
  FOR ALL USING (true) WITH CHECK (true);

-- ==================== VISIE ====================
CREATE TABLE IF NOT EXISTS visie (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1), -- Slechts één record
  programma_visie TEXT,
  missie TEXT,
  horizon TEXT,
  bron_document TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS voor visie
ALTER TABLE visie ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous access to visie" ON visie
  FOR ALL USING (true) WITH CHECK (true);

-- ==================== UPDATE TRIGGERS ====================
-- Functie voor automatische updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers voor updated_at
DROP TRIGGER IF EXISTS update_strategische_doelen_updated_at ON strategische_doelen;
CREATE TRIGGER update_strategische_doelen_updated_at
  BEFORE UPDATE ON strategische_doelen
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_vermogens_updated_at ON vermogens;
CREATE TRIGGER update_vermogens_updated_at
  BEFORE UPDATE ON vermogens
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_visie_updated_at ON visie;
CREATE TRIGGER update_visie_updated_at
  BEFORE UPDATE ON visie
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==================== INITIËLE DATA (optioneel) ====================
-- Uncomment om de initiële visie toe te voegen:

-- INSERT INTO visie (programma_visie, missie, horizon, bron_document)
-- VALUES (
--   'Cito zet de klant centraal in alles wat we doen',
--   'Wij helpen onderwijsprofessionals om leerlingen beter te begrijpen en te ondersteunen door betrouwbare toetsen en inzichten te bieden die aansluiten bij hun behoeften.',
--   '2025-2027',
--   'Cito Strategie 2025-2027'
-- )
-- ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- KLAAR! Na uitvoering werkt data persistentie voor:
-- - Strategische Doelen
-- - Vermogens (Capabilities)
-- - Visie
-- =====================================================
