
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY, 
  wallet_id UUID NOT NULL, 
  event_id UUID NOT NULL,
  type VARCHAR(50) NOT NULL, 
  amount NUMERIC(15, 2) NOT NULL, 
  after_balance NUMERIC(15, 2), 
  status VARCHAR(50) NOT NULL, 
  failing_reason TEXT, 
  external_reference VARCHAR,
  is_sync  BOOLEAN DEFAULT false, 
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY, 
  wallet_id UUID NOT NULL, 
  type VARCHAR(50) NOT NULL, 
  amount NUMERIC(15, 2) NOT NULL, 
  source VARCHAR(50) NOT NULL, 
  metadata TEXT, 
  timestamp TIMESTAMP
);
