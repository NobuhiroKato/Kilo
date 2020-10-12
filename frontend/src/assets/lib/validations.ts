export interface ValidationReturn {
  value: string;
  error?: string;
}

export const nameValidation = (name:string) => {
  if (!name) return "必須項目です";
  if (name.length > 20) return "20文字以下で入力してください"
  return;
};

export const emailValidation = (email:string) => {
  if (!email) return "必須項目です";
  if (email.length > 191) return "191文字以下で入力してください";
  const regexp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!regexp.exec(email)) return "正しい形式で入力してください";
  return;
};

export const passwordValidation = (password:string) => {
  if (!password) return "必須項目です";
  if (password.length < 6) return "パスワードは6文字以上で入力してください";
  if (password.length > 191) return "パスワードは191文字以下で入力してください";
  return;
};

export const birthdayValidation = (birthday:string) => {
  if (!birthday) return "必須項目です";
  const regexp = /[0-9]{8}/;
  if (!regexp.exec(birthday)) return "正しい形式で入力してください";
  return;
};

export const phoneNumberValidation = (phoneNumber:string) => {
  if (!phoneNumber) return "必須項目です";
  return;
};