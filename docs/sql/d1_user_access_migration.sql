PRAGMA foreign_keys = ON;

ALTER TABLE users ADD COLUMN access_role TEXT;
ALTER TABLE users ADD COLUMN tier_source TEXT;
ALTER TABLE users ADD COLUMN tier_updated_at TEXT;
ALTER TABLE users ADD COLUMN monthly_income_idr INTEGER;
ALTER TABLE users ADD COLUMN total_assets_idr INTEGER;
ALTER TABLE users ADD COLUMN monthly_business_revenue_idr INTEGER;
ALTER TABLE users ADD COLUMN business_name TEXT;
ALTER TABLE users ADD COLUMN business_type TEXT;
ALTER TABLE users ADD COLUMN business_url TEXT;
ALTER TABLE users ADD COLUMN business_verified_self_at TEXT;

UPDATE users
SET
  income_tier = COALESCE(income_tier, 'tier-0-survival'),
  access_role = COALESCE(
    access_role,
    CASE income_tier
      WHEN 'tier-4-legacy' THEN 'legacy'
      WHEN 'tier-3-asset-builder' THEN 'asset_builder'
      WHEN 'tier-2-scaler' THEN 'scaler'
      WHEN 'tier-1-hustler' THEN 'hustler'
      ELSE 'survival'
    END
  ),
  tier_source = COALESCE(tier_source, 'migration_self_heal'),
  tier_updated_at = COALESCE(tier_updated_at, CURRENT_TIMESTAMP),
  updated_at = CURRENT_TIMESTAMP;

CREATE INDEX IF NOT EXISTS idx_users_access_role ON users(access_role);

CREATE TABLE IF NOT EXISTS user_tier_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  clerk_user_id TEXT NOT NULL,
  previous_tier TEXT,
  assigned_tier TEXT NOT NULL,
  access_role TEXT NOT NULL,
  source TEXT NOT NULL,
  quiz_type TEXT NOT NULL,
  metadata_json TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (clerk_user_id) REFERENCES users(clerk_user_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_user_tier_events_user_created ON user_tier_events(clerk_user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_tier_events_assigned_tier ON user_tier_events(assigned_tier);
