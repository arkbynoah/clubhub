-- Enable Row Level Security on all tables
-- Run this in the Supabase SQL editor to secure your live database

ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access (SELECT only)
CREATE POLICY "Public read access" ON clubs
  FOR SELECT USING (true);

CREATE POLICY "Public read access" ON team_members
  FOR SELECT USING (true);

CREATE POLICY "Public read access" ON timeline_events
  FOR SELECT USING (true);
