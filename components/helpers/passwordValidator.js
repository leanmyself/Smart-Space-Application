function passwordValidator(password) {
  const check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  if (!password) return "Password can't be empty."
  return ''
}

function passwordValidatorProfile(password) {
  const hasUppercase = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasLength = password.length >= 8;
  let errorMessage = "";

  if (!hasUppercase) {
    errorMessage += "Password must contain at least one uppercase letter.\n";
  }

  if (!hasDigit) {
    errorMessage += "Password must contain at least one digit.\n";
  }

  if (!hasLength) {
    errorMessage += "Password must have a length of 8 or more characters.\n";
  }

  if (password.length === 0) {
    return ''; // Empty password is considered valid
  }

  if (errorMessage !== "") {
    return errorMessage;
  } else {
    return "";
  }
}

function passwordValidatorSignup(password) {
  const hasUppercase = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasLength = password.length >= 8;
  let errorMessage = "";

  if (!password) {
    return "Password can't be empty.";
  }

  if (!hasUppercase) {
    errorMessage += "Password must contain at least one uppercase letter.\n";
  }

  if (!hasDigit) {
    errorMessage += "Password must contain at least one digit.\n";
  }

  if (!hasLength) {
    errorMessage += "Password must have a length of 8 or more characters.\n";
  }

  if (errorMessage !== "") {
    return errorMessage;
  } else {
    return "";
  }
}


export { passwordValidator, passwordValidatorSignup, passwordValidatorProfile };