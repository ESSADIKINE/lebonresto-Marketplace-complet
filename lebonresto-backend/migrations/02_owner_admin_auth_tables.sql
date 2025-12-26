-- ==========================================
-- 1. OWNER AUTH TABLES
-- ==========================================

-- Owner Refresh Tokens
CREATE TABLE IF NOT EXISTS owner_refresh_tokens (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id uuid NOT NULL REFERENCES owners(id) ON DELETE CASCADE,
  token_hash text NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  revoked_at timestamptz,
  user_agent text,
  ip text
);

-- Owner OTPs
CREATE TABLE IF NOT EXISTS owner_otps (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id uuid NOT NULL REFERENCES owners(id) ON DELETE CASCADE,
  otp_hash text NOT NULL,
  purpose text NOT NULL, -- 'verify', 'reset'
  expires_at timestamptz NOT NULL,
  attempts int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  consumed_at timestamptz
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_owner_refresh_tokens_owner_id ON owner_refresh_tokens(owner_id);
CREATE INDEX IF NOT EXISTS idx_owner_otps_owner_id ON owner_otps(owner_id);

-- Add Columns to Owners
ALTER TABLE owners ADD COLUMN IF NOT EXISTS is_verified boolean DEFAULT false;
ALTER TABLE owners ADD COLUMN IF NOT EXISTS last_login timestamptz;


-- ==========================================
-- 2. ADMIN AUTH TABLES
-- ==========================================

-- Admin Refresh Tokens
CREATE TABLE IF NOT EXISTS admin_refresh_tokens (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id uuid NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
  token_hash text NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  revoked_at timestamptz,
  user_agent text,
  ip text
);

-- Admin OTPs
CREATE TABLE IF NOT EXISTS admin_otps (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id uuid NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
  otp_hash text NOT NULL,
  purpose text NOT NULL, -- 'login_2fa', 'reset'
  expires_at timestamptz NOT NULL,
  attempts int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  consumed_at timestamptz
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_admin_refresh_tokens_admin_id ON admin_refresh_tokens(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_otps_admin_id ON admin_otps(admin_id);

-- Add Columns to Admins
ALTER TABLE admins ADD COLUMN IF NOT EXISTS is_verified boolean DEFAULT true; -- Admins trusted by default usually
ALTER TABLE admins ADD COLUMN IF NOT EXISTS last_login timestamptz;
