export class UserPreRegisterRequest {
  
  deviceId: string;
  email: string;
  phone: string;

  constructor(email: string, phone: string, uuid : string) {
    this.deviceId = uuid;
    this.email = email;
    this.phone = phone;
  }
}
