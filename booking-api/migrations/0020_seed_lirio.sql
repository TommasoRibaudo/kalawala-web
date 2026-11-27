-- Seed Casa Lirio ([NMT] Lirio, Smoobu apartment 3591242), the Namaitami
-- suite in the Musa Villas compound in Playa Chiquita next to Areka, Plumeria
-- and Giulia. Mirrors the Areka row in 0010_seed_properties.sql and the
-- Lirio entry in src/propertyCatalog.ts — keep all three in sync.
--
-- Idempotent like 0010: re-running it updates the row in place.

insert into properties (
  id,
  smoobu_apartment_id,
  canonical_slug,
  english_slug,
  spanish_slug,
  display_name_en,
  display_name_es,
  guest_capacity,
  thumbnail_url,
  amenities
) values
  (
    'd82e8c11-7b76-4061-bddf-df6256ac6b07',
    3591242,
    'Lirio',
    'Lirio',
    'LirioES',
    'Lirio',
    'Lirio',
    2,
    'https://drive.google.com/thumbnail?id=1a3HkaDeqSTwUOXsIBjwj84KrYqP6jPSL&sz=w1000',
    '[{"code":"bath","label":"Private equipped bathroom"},{"code":"kitchen","label":"Private equipped kitchenette"},{"code":"ac","label":"A/C"},{"code":"wifi","label":"WiFi"},{"code":"parking","label":"Private unfenced parking"}]'::jsonb
  )
on conflict (id) do update set
  smoobu_apartment_id = excluded.smoobu_apartment_id,
  canonical_slug = excluded.canonical_slug,
  english_slug = excluded.english_slug,
  spanish_slug = excluded.spanish_slug,
  display_name_en = excluded.display_name_en,
  display_name_es = excluded.display_name_es,
  guest_capacity = excluded.guest_capacity,
  thumbnail_url = excluded.thumbnail_url,
  amenities = excluded.amenities,
  is_active = true,
  updated_at = now();
