PRAGMA foreign_keys = ON;

ALTER TABLE users ADD COLUMN quiz_result_r2_key TEXT;
ALTER TABLE users ADD COLUMN quiz_result_url TEXT;

ALTER TABLE user_tier_events ADD COLUMN metadata_r2_key TEXT;
ALTER TABLE user_tier_events ADD COLUMN metadata_url TEXT;

CREATE INDEX IF NOT EXISTS idx_users_quiz_result_url ON users(quiz_result_url);
CREATE INDEX IF NOT EXISTS idx_user_tier_events_metadata_url ON user_tier_events(metadata_url);

