export class UserVerificationRequest {
  deviceId: string;
  id: string;
  code: string;

  constructor(code: string, id: string, deviceId: string) {
    this.deviceId = deviceId;
    this.id = id;
    this.code = code;
  }
}
