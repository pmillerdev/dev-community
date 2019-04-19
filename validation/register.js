const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateRegisterInput = data => {
  let errors = {};

  if (!Validator.isLength(data.name, { min: 5, max: 30 })) {
    errors.name = "Name must be between 5 and 30 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
