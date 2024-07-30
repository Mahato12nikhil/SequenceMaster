export interface UserSchema {
  phone: string;
  _id?: string;
  isActive: boolean;
}
export interface RenewTokenPayload {
  refreshToken: string;
}
export interface RenewTokenResponse {
  success: boolean;
  data: {
    token: string;
    refreshToken: string;
    user: UserSchema;
  };
}
export interface OtpResponse {
  success: boolean;
  message: string;
}
