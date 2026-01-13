-- =============================================
-- KLANT IN BEELD - Seed Data
-- =============================================
-- Voer dit script uit NA schema.sql
-- =============================================

-- Baten
INSERT INTO baten (type, domein, naam, beschrijving, indicator, huidige_waarde, doel_waarde, eigenaar, status) VALUES
('domein', 'Mens', 'Verhoogde medewerkerstevredenheid', 'Medewerkers ervaren meer betekenisvol klantcontact', 'MTO-score klanttevredenheid', '6.8', '7.5', 'HR-directeur', 'in_progress'),
('domein', 'Proces', 'Uniforme klantprocessen', 'Alle sectoren werken volgens dezelfde klantstandaard', '% processen gestandaardiseerd', '40%', '90%', 'Procesmanager', 'pending'),
('domein', 'Systeem', 'Integraal klantbeeld', 'Eenduidig CRM met 360 klantoverzicht', 'Datakwaliteitsscore', '65%', '95%', 'IT-manager', 'pending'),
('domein', 'Cultuur', 'Klantgerichte mindset', 'Organisatiebrede focus op klantwaarde', 'Cultuurmeting klantfocus', '6.2', '7.8', 'Directie', 'pending'),
('sector', NULL, 'NPS verbetering PO', 'Hogere klanttevredenheid in primair onderwijs', 'NPS score PO', '+15', '+35', 'Sectorhoofd PO', 'in_progress');

-- Inspanningen (met levenscyclus en werkfase)
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
('Onvoldoende datakwaliteit', 'Klantdata is verspreid en onbetrouwbaar, waardoor 360 klantbeeld niet lukt', 'Technisch', 4, 3, 'Data & Tech manager', 'Data governance framework, data quality tooling, opschonactie', 'Handmatige data-opschoning per sector', 'in_behandeling', 'dalend', '2025-09-20', '2026-01-20');

-- Issues
INSERT INTO issues (titel, beschrijving, categorie, prioriteit, impact, impact_omschrijving, eigenaar, oplossing, status, datum_gemeld, escalatie_nodig) VALUES
('Onduidelijke RACI voor klantcontact', 'Het is niet duidelijk wie verantwoordelijk is voor klantcontact bij sectoroverstijgende vragen', 'Organisatie', 'hoog', 'Stakeholder relatie', 'Klanten krijgen tegenstrijdige informatie, langere doorlooptijden', 'Programmamanager', 'RACI matrix opstellen en communiceren naar alle betrokkenen', 'in_behandeling', '2025-12-01', FALSE),
('Budget voor training onvoldoende', 'Het gereserveerde budget voor klantgerichtheidstraining is onvoldoende voor alle medewerkers', 'Budget', 'midden', 'Kostenverhoging', 'EUR 50.000 extra budget nodig of training in fases uitrollen', 'HR-directeur', 'Extra budget aanvragen of gefaseerde uitrol plannen', 'wacht_op_besluit', '2025-12-15', TRUE);
