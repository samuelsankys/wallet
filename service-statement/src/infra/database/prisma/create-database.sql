
CREATE TABLE IF NOT EXISTS public.statements (
  id UUID PRIMARY KEY, 
  wallet_id UUID NOT NULL, 
  transaction_id UUID NOT NULL,
  transaction_type VARCHAR(50) NOT NULL,
  transaction_at TIMESTAMP NOT NULL, 
  amount NUMERIC(15, 2) NOT NULL, 
  after_balance NUMERIC(15, 2), 
  status VARCHAR(50) NOT NULL, 
  external_reference VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


