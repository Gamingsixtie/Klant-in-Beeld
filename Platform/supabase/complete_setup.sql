-- =============================================
-- KLANT IN BEELD - COMPLETE SETUP
-- =============================================
-- Dit script doet ALLES in één keer:
-- 1. Verwijdert oude tabellen
-- 2. Maakt nieuwe tabellen aan
-- 3. Voegt testdata toe
-- =============================================

-- STAP 1: ALLES VERWIJDEREN
DROP TABLE IF EXISTS issues CASCADE;
DROP TABLE IF EXISTS risicos CASCADE;
DROP TABLE IF EXISTS stakeholders CASCADE;
DROP TABLE IF EXISTS inspanningen CASCADE;
DROP TABLE IF EXISTS baten CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- STAP 2: UUID EXTENSIE
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- STAP 3: TABELLEN AANMAKEN

-- BATEN
CREATE TABLE baten (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  domein VARCHAR(50),
  sector VARCHAR(100),
  naam VARCHAR(255) NOT NULL,
  beschrijving TEXT,
  indicator VARCHAR(255),
  huidige_waarde VARCHAR(100),
  doel_waarde VARCHAR(100),
  eigenaar VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- INSPANNINGEN
CREATE TABLE inspanningen (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  code VARCHAR(20) NOT NULL UNIQUE,
  naam VARCHAR(255) NOT NULL,
  beschrijving TEXT,
  domein VARCHAR(50),
  eigenaar VARCHAR(255),
  leider VARCHAR(255),
  start_maand INTEGER NOT NULL,
  eind_maand INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'planned',
  levenscyclus VARCHAR(50),
  werkfase INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- STAKEHOLDERS
CREATE TABLE stakeholders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  naam VARCHAR(255) NOT NULL,
  rol VARCHAR(100) NOT NULL,
  functie VARCHAR(255),
  verantwoordelijkheden TEXT[],
  email VARCHAR(255),
  telefoon VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RISICOS
CREATE TABLE risicos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  titel VARCHAR(255) NOT NULL,
  beschrijving TEXT,
  categorie VARCHAR(100),
  kans INTEGER,
  impact INTEGER,
  score INTEGER GENERATED ALWAYS AS (kans * impact) STORED,
  eigenaar VARCHAR(255),
  mitigatie_maatregel TEXT,
  contingency_plan TEXT,
  status VARCHAR(50) DEFAULT 'open',
  trend VARCHAR(50) DEFAULT 'stabiel',
  datum_geidentificeerd DATE DEFAULT CURRENT_DATE,
  review_datum DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ISSUES
CREATE TABLE issues (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  titel VARCHAR(255) NOT NULL,
  beschrijving TEXT,
  categorie VARCHAR(100),
  prioriteit VARCHAR(50) DEFAULT 'midden',
  impact VARCHAR(100),
  impact_omschrijving TEXT,
  eigenaar VARCHAR(255),
  oplossing TEXT,
  status VARCHAR(50) DEFAULT 'open',
  datum_gemeld DATE DEFAULT CURRENT_DATE,
  datum_opgelost DATE,
  escalatie_nodig BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- STAP 4: RLS POLICIES
ALTER TABLE baten ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspanningen ENABLE ROW LEVEL SECURITY;
ALTER TABLE stakeholders ENABLE ROW LEVEL SECURITY;
ALTER TABLE risicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE issues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all" ON baten FOR ALL USING (true);
CREATE POLICY "Allow all" ON inspanningen FOR ALL USING (true);
CREATE POLICY "Allow all" ON stakeholders FOR ALL USING (true);
CREATE POLICY "Allow all" ON risicos FOR ALL USING (true);
CREATE POLICY "Allow all" ON issues FOR ALL USING (true);

-- STAP 5: TRIGGERS
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

-- STAP 6: INDEXES
CREATE INDEX idx_baten_status ON baten(status);
CREATE INDEX idx_inspanningen_status ON inspanningen(status);
CREATE INDEX idx_inspanningen_levenscyclus ON inspanningen(levenscyclus);
CREATE INDEX idx_risicos_status ON risicos(status);
CREATE INDEX idx_issues_status ON issues(status);

-- STAP 7: TESTDATA

-- Baten
INSERT INTO baten (type, domein, naam, beschrijving, indicator, huidige_waarde, doel_waarde, eigenaar, status) VALUES
('domein', 'Mens', 'Verhoogde medewerkerstevredenheid', 'Medewerkers ervaren meer betekenisvol klantcontact', 'MTO-score klanttevredenheid', '6.8', '7.5', 'HR-directeur', 'in_progress'),
('domein', 'Proces', 'Uniforme klantprocessen', 'Alle sectoren werken volgens dezelfde klantstandaard', '% processen gestandaardiseerd', '40%', '90%', 'Procesmanager', 'pending'),
('domein', 'Systeem', 'Integraal klantbeeld', 'Eenduidig CRM met 360 klantoverzicht', 'Datakwaliteitsscore', '65%', '95%', 'IT-manager', 'pending'),
('domein', 'Cultuur', 'Klantgerichte mindset', 'Organisatiebrede focus op klantwaarde', 'Cultuurmeting klantfocus', '6.2', '7.8', 'Directie', 'pending'),
('sector', NULL, 'NPS verbetering PO', 'Hogere klanttevredenheid in primair onderwijs', 'NPS score PO', '+15', '+35', 'Sectorhoofd PO', 'in_progress');

-- Inspanningen
INSERT INTO inspanningen (type, code, naam, beschrijving, domein, eigenaar, leider, start_maand, eind_maand, status, levenscyclus, werkfase) VALUES
('project', 'P-001', 'CRM Selectie & Implementatie', 'Selecteren en implementeren van nieuw CRM-systeem', 'Systeem', 'IT-manager', 'Projectleider IT', 1, 9, 'in_progress', 'opbouwen', 2),
('project', 'P-002', 'Klantreisanalyse', 'In kaart brengen van alle klantreizen per sector', 'Proces', 'Procesmanager', 'Business Analist', 2, 5, 'planned', 'opbouwen', 2),
('proces', 'PR-001', 'Klachtenprocedure optimaliseren', 'Stroomlijnen en verbeteren van klachtenafhandeling', 'Proces', 'Kwaliteitsmanager', 'Proceseigenaar', 3, 8, 'planned', 'uitvoeren', 3),
('leer', 'L-001', 'Training Klantgericht Werken', 'Organisatiebrede training klantgerichtheid', 'Mens', 'HR-directeur', 'L&D Manager', 4, 12, 'planned', 'uitvoeren', 4),
('systeem', 'S-001', 'Data-integratie klantgegevens', 'Koppelen van alle systemen met klantdata', 'Systeem', 'Data Manager', 'Integratie Architect', 6, 14, 'planned', 'uitvoeren', 3);

-- Stakeholders
INSERT INTO stakeholders (naam, rol, functie, verantwoordelijkheden) VALUES
('Directie', 'Opdrachtgever', 'Algemeen Directeur', ARRAY['Strategische richting', 'Budgetgoedkeuring', 'Escalatiepunt']),
('Sponsorgroep', 'Sponsorgroep', 'MT-leden', ARRAY['Draagvlak creeren', 'Middelen vrijmaken', 'Besluitvorming']),
('Jan de Vries', 'Programma-eigenaar', 'Directeur Klantrelaties', ARRAY['Baten realiseren', 'Stakeholders managen', 'Programmasturing']),
('Pim de Burger', 'Programmamanager', 'Senior Programmamanager', ARRAY['Dagelijkse leiding programma', 'Planning en voortgangsrapportage', 'Coordineert en bewaakt samenhang', 'Voorzitter Programmaraad', 'Escaleert issues naar Programma-eigenaar']);

-- Risicos
INSERT INTO risicos (titel, beschrijving, categorie, kans, impact, eigenaar, mitigatie_maatregel, contingency_plan, status, trend, datum_geidentificeerd, review_datum) VALUES
('Weerstand tegen verandering', 'Medewerkers verzetten zich tegen nieuwe klantgerichte werkwijze', 'Organisatie', 4, 4, 'Programmamanager', 'Betrekken medewerkers bij ontwerp, quick wins tonen, training en coaching', 'Extra communicatie en individuele gesprekken met key influencers', 'in_behandeling', 'stabiel', '2025-09-15', '2026-01-15'),
('CRM implementatie vertraagt', 'Technische complexiteit of leveranciersproblemen vertragen CRM-implementatie', 'Technisch', 3, 4, 'IT-manager', 'Strakke planning met buffers, regelmatig leveranciersoverleg', 'Tijdelijke workaround met bestaande systemen', 'open', 'stabiel', '2025-10-01', '2026-02-01'),
('Onvoldoende datakwaliteit', 'Klantdata is verspreid en onbetrouwbaar, waardoor 360 klantbeeld niet lukt', 'Technisch', 4, 3, 'Data en Tech manager', 'Data governance framework, data quality tooling, opschonactie', 'Handmatige data-opschoning per sector', 'in_behandeling', 'dalend', '2025-09-20', '2026-01-20');

-- Issues
INSERT INTO issues (titel, beschrijving, categorie, prioriteit, impact, impact_omschrijving, eigenaar, oplossing, status, datum_gemeld, escalatie_nodig) VALUES
('Onduidelijke RACI voor klantcontact', 'Het is niet duidelijk wie verantwoordelijk is voor klantcontact bij sectoroverstijgende vragen', 'Organisatie', 'hoog', 'Stakeholder relatie', 'Klanten krijgen tegenstrijdige informatie, langere doorlooptijden', 'Programmamanager', 'RACI matrix opstellen en communiceren naar alle betrokkenen', 'in_behandeling', '2025-12-01', FALSE),
('Budget voor training onvoldoende', 'Het gereserveerde budget voor klantgerichtheidstraining is onvoldoende voor alle medewerkers', 'Budget', 'midden', 'Kostenverhoging', 'EUR 50.000 extra budget nodig of training in fases uitrollen', 'HR-directeur', 'Extra budget aanvragen of gefaseerde uitrol plannen', 'wacht_op_besluit', '2025-12-15', TRUE);

-- KLAAR!
SELECT 'Setup compleet! Tabellen aangemaakt: baten, inspanningen, stakeholders, risicos, issues' as status;
