import { UserRoles } from '@/models';

declare global {
  namespace Express {
    export interface Request {
      user: {
        name: string;
        email: string;
        roles: UserRoles[];
      };
    }
  }
}
