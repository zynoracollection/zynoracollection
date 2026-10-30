-- Run this in Supabase SQL Editor.
create table if not exists public.products (
  id text primary key,
  name text not null,
  tagline text not null default '',
  description text not null default '',
  price integer not null default 0 check (price >= 0),
  original_price integer check (original_price is null or original_price >= 0),
  image_url text not null default '',
  video_url text,
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  badge text,
  collections text[] not null default '{}',
  sizes text[] not null default '{S,M,L,XL}',
  details text not null default '',
  fabric text not null default '',
  care text not null default '',
  delivery text not null default '',
  updated_at timestamptz not null default now()
);
alter table public.products add column if not exists stock_quantity integer not null default 0;
alter table public.products drop constraint if exists products_stock_quantity_check;
alter table public.products add constraint products_stock_quantity_check check (stock_quantity >= 0);

alter table public.products enable row level security;
drop policy if exists "Published products are public" on public.products;
create policy "Published products are public" on public.products for select using (true);
drop policy if exists "Authenticated admins can insert products" on public.products;
create policy "Authenticated admins can insert products" on public.products for insert to authenticated with check (true);
drop policy if exists "Authenticated admins can update products" on public.products;
create policy "Authenticated admins can update products" on public.products for update to authenticated using (true) with check (true);
drop policy if exists "Authenticated admins can delete products" on public.products;
create policy "Authenticated admins can delete products" on public.products for delete to authenticated using (true);

insert into public.products (id, name, tagline, description, price, original_price, image_url, badge, collections, sizes, details, fabric, care, delivery)
select 'aurelia-silk-suit', 'Aurelia Silk Suit', 'Crimson silk with regal gold detailing', 'A statement three-piece unstitched suit in rich crimson silk, with intricate gold embroidery and a matching organza dupatta.', 4000, 6000, '/images/products/aurelia-silk-suit.png', 'Limited Deal', '{festive,signature}', '{S,M,L,XL}', 'Aurelia is a three-piece unstitched suit for your own tailor to shape. The deep crimson fabric is covered in gold paisley embroidery and paired with a lightweight organza dupatta.', 'Shirt: embroidered raw silk. Dupatta: embroidered organza. Trouser: raw silk. The three-piece suit is unstitched.', 'Dry clean only. Do not wring or tumble dry. Iron on low heat with a cloth between the iron and the embroidery.', 'Free delivery on orders over Rs. 5,000. Orders are dispatched within 1–2 working days. Unused, unwashed items can be exchanged within 7 days.'
where not exists (select 1 from public.products where id = 'aurelia-silk-suit');

insert into public.products (id, name, tagline, description, price, original_price, image_url, badge, collections, sizes, details, fabric, care, delivery)
select 'noor-embroidered-suit', 'Noor Embroidered Suit', 'Ivory and emerald, made for celebrations', 'A three-piece embroidered suit in soft ivory lawn, finished with antique gold threadwork and a deep emerald dupatta.', 4000, 6000, '/images/products/noor-embroidered-suit.png', '33% Off', '{festive,embroidered}', '{S,M,L,XL}', 'The Noor suit pairs a straight-cut ivory shirt with tonal trousers and a sheer emerald dupatta. Antique gold embroidery runs along the neckline, sleeves and hem.', 'Shirt: embroidered lawn. Dupatta: embroidered chiffon. Trouser: cambric. The suit is stitched and ready to wear.', 'Dry clean only. Store the dupatta wrapped in tissue. Warm iron on the reverse side.', 'Free delivery on orders over Rs. 5,000. Orders dispatch within 1–2 working days. Unused, unwashed items can be exchanged within 7 days.'
where not exists (select 1 from public.products where id = 'noor-embroidered-suit');

insert into public.products (id, name, tagline, description, price, original_price, image_url, badge, collections, sizes, details, fabric, care, delivery)
select 'meher-chikankari-suit', 'Meher Chikankari Suit', 'Soft ivory chikankari for quieter occasions', 'A breathable ivory lawn suit with delicate chikankari threadwork and a matching embroidered dupatta.', 3500, 5200, '/images/products/meher-chikankari-suit.png', 'New', '{everyday,embroidered}', '{S,M,L,XL}', 'Meher is made for daytime events and long lunches. Tonal chikankari embroidery covers the front panel and sleeves.', 'Shirt: embroidered lawn. Dupatta: embroidered lawn. Trouser: cambric. The suit is stitched and ready to wear.', 'Gentle hand wash in cold water or dry clean. Do not bleach. Line dry in shade.', 'Free delivery on orders over Rs. 5,000. Orders dispatch within 1–2 working days. Unused, unwashed items can be exchanged within 7 days.'
where not exists (select 1 from public.products where id = 'meher-chikankari-suit');

insert into public.products (id, name, tagline, description, price, original_price, image_url, badge, collections, sizes, details, fabric, care, delivery)
select 'zara-printed-suit', 'Zara Printed Suit', 'A blue floral print for everyday plans', 'A vibrant blue three-piece with a hand-painted floral print and a lightly embellished neckline.', 2800, 4200, '/images/products/zara-printed-suit.png', 'Sale', '{everyday}', '{S,M,L,XL}', 'Zara brings colour to the everyday wardrobe with coral and gold florals, a decorated neckline and a coordinated printed dupatta.', 'Shirt: printed lawn. Dupatta: printed lawn. Trouser: cambric. The suit is stitched and ready to wear.', 'Hand wash separately in cold water. Do not bleach. Dry in shade.', 'Free delivery on orders over Rs. 5,000. Orders dispatch within 1–2 working days. Unused, unwashed items can be exchanged within 7 days.'
where not exists (select 1 from public.products where id = 'zara-printed-suit');

insert into storage.buckets (id, name, public) values ('product-media', 'product-media', true) on conflict (id) do nothing;
drop policy if exists "Public product media" on storage.objects;
create policy "Public product media" on storage.objects for select using (bucket_id = 'product-media');
drop policy if exists "Authenticated users upload product media" on storage.objects;
create policy "Authenticated users upload product media" on storage.objects for insert to authenticated with check (bucket_id = 'product-media');
drop policy if exists "Authenticated users update product media" on storage.objects;
create policy "Authenticated users update product media" on storage.objects for update to authenticated using (bucket_id = 'product-media');
