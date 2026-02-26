-- ClubHub Schema
-- Queen's Commerce Club Directory

-- ─────────────────────────────────────────
-- clubs
-- ─────────────────────────────────────────
create table clubs (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  full_name       text not null,
  slug            text not null unique,
  category        text not null,
  description     text,
  instagram_url   text,
  hiring_status   text not null default 'none'
                    check (hiring_status in ('confirmed', 'estimated', 'none')),
  is_urgent       boolean not null default false,
  march_hiring    boolean not null default false,
  search_vector   tsvector,
  created_at      timestamptz not null default now()
);

-- Full-text search index
create index clubs_search_vector_idx on clubs using gin(search_vector);

-- Function to keep search_vector up to date
create or replace function clubs_search_vector_update()
returns trigger as $$
begin
  new.search_vector :=
    setweight(to_tsvector('english', coalesce(new.name, '')),        'A') ||
    setweight(to_tsvector('english', coalesce(new.full_name, '')),   'B') ||
    setweight(to_tsvector('english', coalesce(new.category, '')),    'C') ||
    setweight(to_tsvector('english', coalesce(new.description, '')), 'D');
  return new;
end;
$$ language plpgsql;

create trigger clubs_search_vector_trigger
before insert or update on clubs
for each row execute function clubs_search_vector_update();


-- ─────────────────────────────────────────
-- team_members
-- ─────────────────────────────────────────
create table team_members (
  id          uuid primary key default gen_random_uuid(),
  club_id     uuid not null references clubs(id) on delete cascade,
  name        text not null,
  role        text,
  role_type   text,
  year        text,
  is_incoming boolean not null default false,
  created_at  timestamptz not null default now()
);

create index team_members_club_id_idx on team_members(club_id);


-- ─────────────────────────────────────────
-- timeline_events
-- ─────────────────────────────────────────
create table timeline_events (
  id           uuid primary key default gen_random_uuid(),
  club_id      uuid not null references clubs(id) on delete cascade,
  event_name   text not null,
  event_date   text,
  is_urgent    boolean not null default false,
  is_confirmed boolean not null default false,
  created_at   timestamptz not null default now()
);

create index timeline_events_club_id_idx on timeline_events(club_id);
