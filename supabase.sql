-- WEB LIBRARY — AKIRA REN v4
-- Ejecuta TODO este archivo en Supabase > SQL Editor.

create table if not exists public.akira_ren_library (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

insert into public.akira_ren_library (id, data)
values ('akira-ren-main-library', '{}'::jsonb)
on conflict (id) do nothing;

alter table public.akira_ren_library enable row level security;

drop policy if exists "public read akira ren library" on public.akira_ren_library;
create policy "public read akira ren library" on public.akira_ren_library for select using (true);

drop policy if exists "public write akira ren library" on public.akira_ren_library;
create policy "public write akira ren library" on public.akira_ren_library for insert with check (true);
create policy "public update akira ren library" on public.akira_ren_library for update using (true) with check (true);

-- Almacenamiento permanente para imágenes, música y otros archivos subidos desde el dispositivo.
insert into storage.buckets (id,name,public)
values ('akira-ren-media','akira-ren-media',true)
on conflict (id) do update set public=true;

drop policy if exists "public read akira ren media" on storage.objects;
create policy "public read akira ren media" on storage.objects for select using (bucket_id='akira-ren-media');

drop policy if exists "public upload akira ren media" on storage.objects;
create policy "public upload akira ren media" on storage.objects for insert with check (bucket_id='akira-ren-media');

drop policy if exists "public update akira ren media" on storage.objects;
create policy "public update akira ren media" on storage.objects for update using (bucket_id='akira-ren-media') with check (bucket_id='akira-ren-media');

drop policy if exists "public delete akira ren media" on storage.objects;
create policy "public delete akira ren media" on storage.objects for delete using (bucket_id='akira-ren-media');
