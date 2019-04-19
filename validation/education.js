const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateEducationInput = data => {
  let errors = {};

  let { institution, qualification, fieldofstudy, from } = data;

  institution = !isEmpty(institution) ? institution : "";
  qualification = !isEmpty(qualification) ? qualification : "";
  fieldofstudy = !isEmpty(fieldofstudy) ? fieldofstudy : "";
  from = !isEmpty(from) ? from : "";

  if (Validator.isEmpty(institution)) {
    errors.institution = "Institution field is required";
  }

  if (Validator.isEmpty(qualification)) {
    errors.qualification = "Qualification field is required";
  }

  if (Validator.isEmpty(fieldofstudy)) {
    errors.fieldofstudy = "Field of study is required";
  }

  if (Validator.isEmpty(from)) {
    errors.from = "From date is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
