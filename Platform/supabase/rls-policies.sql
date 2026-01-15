-- ============================================================
-- KLANT IN BEELD - ROW LEVEL SECURITY (RLS) POLICIES
-- Voer dit script uit NA het schema.sql script
-- ============================================================

-- ============================================================
-- STAP 1: ENABLE RLS OP ALLE TABELLEN
-- ============================================================
ALTER TABLE baten ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspanningen ENABLE ROW LEVEL SECURITY;
ALTER TABLE stakeholders ENABLE ROW LEVEL SECURITY;
ALTER TABLE risicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE strategische_doelen ENABLE ROW LEVEL SECURITY;
ALTER TABLE vermogens ENABLE ROW LEVEL SECURITY;
ALTER TABLE visie ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- KIES EEN VAN DE ONDERSTAANDE OPTIES:
-- ============================================================

-- ============================================================
-- OPTIE A: AUTHENTICATED USERS ONLY (AANBEVOLEN VOOR PRODUCTIE)
-- Alleen ingelogde gebruikers hebben toegang
-- ============================================================

-- BATEN
CREATE POLICY "Authenticated users can view baten"
ON baten FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert baten"
ON baten FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update baten"
ON baten FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete baten"
ON baten FOR DELETE
TO authenticated
USING (true);

-- INSPANNINGEN
CREATE POLICY "Authenticated users can view inspanningen"
ON inspanningen FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert inspanningen"
ON inspanningen FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update inspanningen"
ON inspanningen FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete inspanningen"
ON inspanningen FOR DELETE
TO authenticated
USING (true);

-- STAKEHOLDERS
CREATE POLICY "Authenticated users can view stakeholders"
ON stakeholders FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert stakeholders"
ON stakeholders FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update stakeholders"
ON stakeholders FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete stakeholders"
ON stakeholders FOR DELETE
TO authenticated
USING (true);

-- RISICOS
CREATE POLICY "Authenticated users can view risicos"
ON risicos FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert risicos"
ON risicos FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update risicos"
ON risicos FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete risicos"
ON risicos FOR DELETE
TO authenticated
USING (true);

-- ISSUES
CREATE POLICY "Authenticated users can view issues"
ON issues FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert issues"
ON issues FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update issues"
ON issues FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete issues"
ON issues FOR DELETE
TO authenticated
USING (true);

-- STRATEGISCHE DOELEN
CREATE POLICY "Authenticated users can view strategische_doelen"
ON strategische_doelen FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert strategische_doelen"
ON strategische_doelen FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update strategische_doelen"
ON strategische_doelen FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete strategische_doelen"
ON strategische_doelen FOR DELETE
TO authenticated
USING (true);

-- VERMOGENS
CREATE POLICY "Authenticated users can view vermogens"
ON vermogens FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert vermogens"
ON vermogens FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update vermogens"
ON vermogens FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete vermogens"
ON vermogens FOR DELETE
TO authenticated
USING (true);

-- VISIE
CREATE POLICY "Authenticated users can view visie"
ON visie FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert visie"
ON visie FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update visie"
ON visie FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- ============================================================
-- OPTIE B: ANON ACCESS (ALLEEN VOOR DEMO/TESTING)
-- Gebruik dit ALLEEN als je geen authenticatie wilt
-- VERWIJDER eerst alle policies van Optie A als je dit wilt gebruiken
-- ============================================================

/*
-- Om Optie A te verwijderen, run eerst:
-- DROP POLICY IF EXISTS "Authenticated users can view baten" ON baten;
-- etc. voor alle policies...

-- BATEN - Anon Read, Auth Write
CREATE POLICY "Anyone can view baten"
ON baten FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Authenticated users can modify baten"
ON baten FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Herhaal voor andere tabellen...
*/

-- ============================================================
-- OPTIE C: ROLE-BASED ACCESS (GEAVANCEERD)
-- Voeg eerst een 'user_roles' tabel toe
-- ============================================================

/*
-- Stap 1: Maak user_roles tabel
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'programmamanager', 'sectormanager', 'viewer')),
  sector TEXT, -- Optioneel: welke sector mag de gebruiker zien
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Helper function om rol te checken
CREATE OR REPLACE FUNCTION auth.user_has_role(required_role TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role = required_role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function om sector toegang te checken
CREATE OR REPLACE FUNCTION auth.user_can_access_sector(check_sector TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND (
      role IN ('admin', 'programmamanager') -- Admin/PM ziet alles
      OR sector = check_sector              -- Sectormanager ziet eigen sector
      OR sector IS NULL                     -- Geen sector = alle sectoren
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Voorbeeld: Sector-based access voor baten
CREATE POLICY "Users can view baten in their sector"
ON baten FOR SELECT
TO authenticated
USING (auth.user_can_access_sector(sector));

CREATE POLICY "Admins and PMs can modify all baten"
ON baten FOR ALL
TO authenticated
USING (auth.user_has_role('admin') OR auth.user_has_role('programmamanager'))
WITH CHECK (auth.user_has_role('admin') OR auth.user_has_role('programmamanager'));
*/

-- ============================================================
-- AUDIT LOG (OPTIONEEL - VOOR COMPLIANCE)
-- ============================================================

/*
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id UUID,
  old_data JSONB,
  new_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION log_audit()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_log (user_id, action, table_name, record_id, old_data, new_data)
  VALUES (
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN to_jsonb(OLD) END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN to_jsonb(NEW) END
  );
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach to tables (voorbeeld voor baten)
CREATE TRIGGER audit_baten
AFTER INSERT OR UPDATE OR DELETE ON baten
FOR EACH ROW EXECUTE FUNCTION log_audit();
*/
