PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  clerk_user_id TEXT PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  image_url TEXT,
  birthday_date TEXT,
  birthday_locked_at TEXT,
  whatsapp_country TEXT,
  whatsapp_country_code TEXT,
  whatsapp_national_number TEXT,
  whatsapp_e164 TEXT,
  income_tier TEXT,
  access_role TEXT,
  tier_source TEXT,
  tier_updated_at TEXT,
  monthly_income_idr INTEGER,
  total_assets_idr INTEGER,
  monthly_business_revenue_idr INTEGER,
  business_name TEXT,
  business_type TEXT,
  business_url TEXT,
  business_verified_self_at TEXT,
  quiz_result_json TEXT,
  last_article_slug TEXT,
  last_article_read_at TEXT,
  last_seen_at TEXT DEFAULT CURRENT_TIMESTAMP,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_income_tier ON users(income_tier);
CREATE INDEX IF NOT EXISTS idx_users_access_role ON users(access_role);
CREATE INDEX IF NOT EXISTS idx_users_last_article ON users(last_article_slug);
CREATE INDEX IF NOT EXISTS idx_users_birthday_month ON users(substr(birthday_date, 6, 5));

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

CREATE TABLE IF NOT EXISTS user_article_reads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  clerk_user_id TEXT NOT NULL,
  article_slug TEXT NOT NULL,
  article_tier TEXT,
  read_percent INTEGER DEFAULT 0,
  first_read_at TEXT DEFAULT CURRENT_TIMESTAMP,
  last_read_at TEXT DEFAULT CURRENT_TIMESTAMP,
  completed_at TEXT,
  source_path TEXT,
  FOREIGN KEY (clerk_user_id) REFERENCES users(clerk_user_id) ON DELETE CASCADE,
  UNIQUE (clerk_user_id, article_slug)
);

CREATE INDEX IF NOT EXISTS idx_article_reads_user_last ON user_article_reads(clerk_user_id, last_read_at DESC);
CREATE INDEX IF NOT EXISTS idx_article_reads_slug ON user_article_reads(article_slug);

CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  clerk_user_id TEXT,
  email TEXT,
  customer_name TEXT,
  phone_e164 TEXT,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_type TEXT NOT NULL DEFAULT 'course',
  course_slug TEXT,
  amount_idr INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'IDR',
  merchant_order_id TEXT UNIQUE NOT NULL,
  duitku_reference TEXT,
  duitku_payment_method TEXT,
  duitku_payment_code TEXT,
  duitku_payment_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  raw_create_response TEXT,
  raw_callback_response TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  paid_at TEXT,
  FOREIGN KEY (clerk_user_id) REFERENCES users(clerk_user_id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_orders_user_created ON orders(clerk_user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_course ON orders(course_slug);

CREATE TABLE IF NOT EXISTS course_enrollments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  clerk_user_id TEXT NOT NULL,
  course_slug TEXT NOT NULL,
  order_id INTEGER,
  access_status TEXT NOT NULL DEFAULT 'active',
  access_source TEXT NOT NULL DEFAULT 'purchase',
  enrolled_at TEXT DEFAULT CURRENT_TIMESTAMP,
  expires_at TEXT,
  FOREIGN KEY (clerk_user_id) REFERENCES users(clerk_user_id) ON DELETE CASCADE,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL,
  UNIQUE (clerk_user_id, course_slug)
);

CREATE TABLE IF NOT EXISTS course_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  clerk_user_id TEXT NOT NULL,
  course_slug TEXT NOT NULL,
  module_slug TEXT NOT NULL,
  module_title TEXT,
  progress_percent INTEGER DEFAULT 0,
  completed_at TEXT,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (clerk_user_id) REFERENCES users(clerk_user_id) ON DELETE CASCADE,
  UNIQUE (clerk_user_id, course_slug, module_slug)
);

CREATE INDEX IF NOT EXISTS idx_course_progress_user_course ON course_progress(clerk_user_id, course_slug);

CREATE TABLE IF NOT EXISTS user_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  clerk_user_id TEXT,
  event_name TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  metadata_json TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (clerk_user_id) REFERENCES users(clerk_user_id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_user_events_user_created ON user_events(clerk_user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_events_name ON user_events(event_name);
