import { UserFromPayload } from "../auth/types";

// express.d.ts
declare global {
  namespace Express {
    export interface Request {
      user?: UserFromPayload;
    }
  }
}
