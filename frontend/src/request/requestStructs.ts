export interface CreateUserRequest {
  first_name:              string;
  last_name:               string;
  first_name_kana:         string;
  last_name_kana:          string;
  email:                   string;
  password:                string;
  birthday:                string;
  phone_number:            string;
  role_id:                 number;
  plan_id:                 number;
}