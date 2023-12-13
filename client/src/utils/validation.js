const validUsernameRe = new RegExp(
  "^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{3,16}$"
);
const validPasswordRe = new RegExp(
  "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
);
const validEmailRe = new RegExp(
  "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
);
export const ValidiateProps = (propName, propValue) => {
  switch (propName) {
    case "username":
      return validUsernameRe.test(propValue);
    case "password":
      return validPasswordRe.test(propValue);
    case "email":
      return validEmailRe.test(propValue);
    case "confirmPassword":
      return validPasswordRe.test(propValue);
    default:
      break;
  }
};
export const ValidiatePassword = (password) => {
  return validPasswordRe.test(password);
};

export const ValidiateEmail = (email) => {
  return validEmailRe.test(email);
};
