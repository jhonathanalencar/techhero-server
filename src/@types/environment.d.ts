import { Secret } from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      ACCESS_TOKEN_SECRET: Secret;
      REFRESH_TOKEN_SECRET: Secret;
    }
  }
}
