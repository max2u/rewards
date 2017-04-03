import { UserDetailsResponse } from './UserDetailsResponse';

export class UserAuthenticationResponse extends UserDetailsResponse{
  token: string;
  expiration: any;
}

