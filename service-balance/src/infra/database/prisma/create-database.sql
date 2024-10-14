
CREATE TABLE IF NOT EXISTS public.balances (
  wallet_id UUID NOT NULL, 
  balance NUMERIC(15, 2) NOT NULL,
);

