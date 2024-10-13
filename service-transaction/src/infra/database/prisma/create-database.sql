
CREATE TABLE IF NOT EXISTS public.transaction (
  id UUID PRIMARY KEY, 
  wallet_id UUID NOT NULL, 
  type VARCHAR(50) NOT NULL, 
  amount NUMERIC(15, 2) NOT NULL, 
  after_balance NUMERIC(15, 2), 
  status VARCHAR(50) NOT NULL, 
  failing_reason TEXT, 
  external_reference VARCHAR, 
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
);