-- Run once in the Supabase SQL editor for the project used by Vercel.
alter table public.pakka_interactions
  add column if not exists input_tokens integer,
  add column if not exists output_tokens integer,
  add column if not exists visitor_id uuid;

create index if not exists pakka_interactions_visitor_id_idx
  on public.pakka_interactions (visitor_id);
