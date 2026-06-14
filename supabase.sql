-- Create waitlist table for MVP requests
create table waitlist (
  id uuid default uuid_generate_v4() primary key,
  email text not null unique,
  source text default 'headquarters',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table waitlist enable row level security;

-- Allow anonymous inserts (so people can join without logging in)
create policy "Allow anonymous inserts" on waitlist
  for insert
  to anon
  with check (true);

-- Only allow authenticated admin to read
create policy "Allow authenticated admin read" on waitlist
  for select
  to authenticated
  using (true);
