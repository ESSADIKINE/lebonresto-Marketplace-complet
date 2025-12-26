-- Create Refresh Tokens Table
CREATE TABLE IF NOT EXISTS customer_refresh_tokens (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  token_hash text NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  revoked_at timestamptz,
  user_agent text,
  ip text
);

-- Create OTPs Table
CREATE TABLE IF NOT EXISTS customer_otps (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  otp_hash text NOT NULL,
  purpose text NOT NULL, -- 'verify', 'reset'
  expires_at timestamptz NOT NULL,
  attempts int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  consumed_at timestamptz
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_customer_refresh_tokens_customer_id ON customer_refresh_tokens(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_otps_customer_id ON customer_otps(customer_id);

-- Add is_verified and phone to customers if not exists (based on requirements, customers table exists but confirming verified column)
ALTER TABLE customers ADD COLUMN IF NOT EXISTS is_verified boolean DEFAULT false;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS last_login timestamptz;
