export class UserAuthenticationRequest {

  deviceId: string;
  username: string;
  password: string;

  constructor(username: string, password: string, uuid : string) {
    this.deviceId = uuid;
    this.username = username;
    this.password = password;
  }
}
