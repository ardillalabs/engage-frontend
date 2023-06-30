export interface UserSignUpDetails {
  full_name: string;
  user_name: string;
  phone_number: string;
  email: string;
  password: string;
}

export interface UserSignInDetails {
  email: string;
  password: string;
}

export interface UpdatePasswordDetails {
  currentPassword: string;
  newPassword: string;
}

export interface CreateNewPasswordDetails {
  newPassword: string;
  confirmPassword: string;
}

export interface UserInforUpdateDetails {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number: string;
  street: string;
  apartment: string;
  city: string;
  postal_code: string;
  country: string;
  dp?: any;
}
