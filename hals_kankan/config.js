// ================================================================
//  CONFIG.JS — Connexion Supabase
//  Maison Médicale HALS-GUINÉE
// ================================================================
//
//  CE FICHIER CONTIENT UNIQUEMENT LA CONNEXION À SUPABASE.
//  Les paramètres de la pharmacie (nom, adresse, téléphone,
//  OrangeMoney, mot de passe, logo...) se modifient directement
//  dans l'application : Admin → ⚙️ Paramètres → Sauvegarder.
//
// ================================================================
//
//  COMMENT REMPLIR CE FICHIER :
//  1. Allez sur https://supabase.com → connectez-vous
//  2. Ouvrez votre projet
//  3. Cliquez sur ⚙️ Project Settings → API
//  4. Copiez "Project URL"  → collez dans  url:  ci-dessous
//  5. Copiez "anon public"  → collez dans  key:  ci-dessous
//  6. Sauvegardez ce fichier
//  7. Mettez config.js et le fichier HTML dans le même dossier
//
// ================================================================

const SUPABASE_CONFIG = {

  // Exemple : "https://abcdefghijkl.supabase.co"
  url: "https://zwbtowkblnotdameaxgs.supabase.co",

  // Cle publique anon
  key: "sb_publishable_5s8B2vKZgvgY6rubY7qjZw_rT4aFDve",

};

// ================================================================
//  SQL À EXÉCUTER UNE SEULE FOIS DANS SUPABASE
//
//  Comment faire :
//  1. Ouvrez votre projet Supabase
//  2. Cliquez sur "SQL Editor" dans le menu gauche
//  3. Cliquez "New Query"
//  4. Copiez-collez tout le SQL ci-dessous
//  5. Cliquez "Run" (▶)
//  6. C'est fait ! Les tables sont créées automatiquement.
// ================================================================
/*

-- TABLE PRODUITS
CREATE TABLE IF NOT EXISTS products (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text        NOT NULL,
  price       numeric     NOT NULL DEFAULT 0,
  stock       integer     DEFAULT 0,
  category    text        DEFAULT '',
  description text        DEFAULT '',
  img         text        DEFAULT '',
  created_at  timestamptz DEFAULT now()
);

-- TABLE COMMANDES
CREATE TABLE IF NOT EXISTS orders (
  id          text        PRIMARY KEY,
  client_name text        NOT NULL,
  phone       text        NOT NULL,
  address     text        NOT NULL,
  ref_orange  text        DEFAULT '',
  note        text        DEFAULT '',
  items       jsonb       NOT NULL DEFAULT '[]',
  total       numeric     NOT NULL DEFAULT 0,
  status      text        DEFAULT 'attente',
  created_at  timestamptz DEFAULT now()
);

-- TABLE CATÉGORIES DE MÉDICAMENTS
CREATE TABLE IF NOT EXISTS categories (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text        NOT NULL UNIQUE,
  description text        DEFAULT '',
  color       text        DEFAULT '#006B45',
  created_at  timestamptz DEFAULT now()
);

-- Catégories par défaut
INSERT INTO categories (name, description, color) VALUES
  ('Antidouleur',      'Médicaments contre la douleur',           '#DC2626'),
  ('Antipaludéen',     'Traitement du paludisme',                 '#059669'),
  ('Antibiotique',     'Médicaments contre les infections',       '#2563EB'),
  ('Vitamines',        'Compléments vitamines et minéraux',       '#D97706'),
  ('Antiparasitaire',  'Traitement des parasites',                '#7C3AED'),
  ('Cardiovasculaire', 'Médicaments pour le cœur',                '#DB2777'),
  ('Digestif',         'Médicaments pour la digestion',           '#0891B2'),
  ('Dermatologie',     'Soins de la peau',                        '#006B45')
ON CONFLICT (name) DO NOTHING;

ALTER TABLE categories DISABLE ROW LEVEL SECURITY;

-- TABLE PARAMÈTRES (gérée depuis Admin → Paramètres)
CREATE TABLE IF NOT EXISTS settings (
  key   text PRIMARY KEY,
  value text DEFAULT ''
);

-- Valeurs par défaut des paramètres
INSERT INTO settings (key, value) VALUES
  ('name',    'Maison Médicale HALS-GUINÉE'),
  ('address', 'Gn-Kankan-Kabada I'),
  ('contact', '622940262'),
  ('email',   'Camaraibrahima353@gmail.com'),
  ('om',      '+224620434420'),
  ('pwd',     'admin2024'),
  ('logo',    '')
ON CONFLICT (key) DO NOTHING;

-- Accès public (pas de restriction)
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders   DISABLE ROW LEVEL SECURITY;
ALTER TABLE settings DISABLE ROW LEVEL SECURITY;

-- Bucket pour stocker les images produits et logo
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT DO NOTHING;

-- Autoriser l'accès aux images
CREATE POLICY "Images publiques" ON storage.objects
  FOR ALL USING (bucket_id = 'images');

*/

// ================================================================
//  NE MODIFIEZ PAS CE QUI SUIT
// ================================================================

// Vérifie si les credentials sont bien remplis
function configEstPrete() {
  return (
    typeof SUPABASE_CONFIG !== 'undefined' &&
    SUPABASE_CONFIG.url.includes('.supabase.co') &&
    SUPABASE_CONFIG.key.length > 20 &&
    SUPABASE_CONFIG.url.startsWith('https://') &&
    SUPABASE_CONFIG.key.length > 20
  );
}
