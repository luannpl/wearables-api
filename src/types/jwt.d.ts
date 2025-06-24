export interface DecodedToken {
    id: string;
    email: string;
    role: 'admin' | 'client'; // ou outros roles que você tiver
    iat?: number;
    exp?: number;
  }
  