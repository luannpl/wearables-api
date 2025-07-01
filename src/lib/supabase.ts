import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { UnauthorizedError } from '../errors/HttpErrors';

dotenv.config();

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  throw new UnauthorizedError('Supabase env vars are not defined');
}

export const supabase = createClient(
  url,
  key
);
