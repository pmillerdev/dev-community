const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateExperienceInput = data => {
  let errors = {};

  let { title, company, from } = data;

  title = !isEmpty(title) ? title : "";
  company = !isEmpty(company) ? company : "";
  from = !isEmpty(from) ? from : "";

  if (Validator.isEmpty(title)) {
    errors.title = "Job title field is required";
  }

  if (Validator.isEmpty(company)) {
    errors.company = "Company field is required";
  }

  if (Validator.isEmpty(from)) {
    errors.from = "From date is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
