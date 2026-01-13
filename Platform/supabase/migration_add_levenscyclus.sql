-- =============================================
-- MIGRATIE: Voeg levenscyclus en werkfase toe
-- =============================================
-- Gebruik dit als je al een inspanningen tabel hebt
-- en de oude 'fase' kolom wilt vervangen
-- =============================================

-- Stap 1: Voeg nieuwe kolommen toe (als ze niet bestaan)
ALTER TABLE inspanningen
ADD COLUMN IF NOT EXISTS levenscyclus VARCHAR(50)
CHECK (levenscyclus IN ('verkennen', 'opbouwen', 'uitvoeren', 'afbouwen'));

ALTER TABLE inspanningen
ADD COLUMN IF NOT EXISTS werkfase INTEGER
CHECK (werkfase >= 1 AND werkfase <= 4);

-- Stap 2: Migreer bestaande data (als je een 'fase' kolom had)
-- UPDATE inspanningen SET levenscyclus = 'opbouwen' WHERE fase = 'Fundament';
-- UPDATE inspanningen SET levenscyclus = 'uitvoeren' WHERE fase = 'Implementatie';
-- UPDATE inspanningen SET levenscyclus = 'afbouwen' WHERE fase = 'Verankering';

-- Stap 3: Verwijder oude kolom (optioneel)
-- ALTER TABLE inspanningen DROP COLUMN IF EXISTS fase;

-- Stap 4: Voeg index toe
CREATE INDEX IF NOT EXISTS idx_inspanningen_levenscyclus ON inspanningen(levenscyclus);
