// jwt-payload.interface.ts

import { Profiles } from './profiles.interface';

export interface JwtPayload {
    userId: string;
  /*   userEmail: string; */
    userProfiles: Profiles[];
}
