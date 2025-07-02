import pinataSDK from '@pinata/sdk';
import dotenv from 'dotenv';
import { UnauthorizedError } from '../errors/HttpErrors';

dotenv.config();

const pinataKey = process.env.PINATA_API_KEY!;
const pinataSecretKey = process.env.PINATA_SECRET_API_KEY!;

if (!pinataKey || !pinataSecretKey) {
  throw new UnauthorizedError('PINATA_API_KEY or PINATA_SECRET_API_KEY is not set');
}

const pinata = new pinataSDK(pinataKey, pinataSecretKey);

export default pinata;
