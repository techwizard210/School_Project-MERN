const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.userid = !isEmpty(data.userid) ? data.userid : "";
    data.email = !isEmpty(data.email) ? data.email:"";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirmpassword = !isEmpty(data.confirmpassword) ? data.confirmpassword : "";
    data.name = !isEmpty(data.name) ? data.name : "";


    if (Validator.isEmpty(data.name)){
        errors.name = "Name field is required";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
      } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
      }

    if (Validator.isEmpty(data.userid)) {
        errors.userid = "UserID field is required";
    }

    if (Validator.isEmpty(data.password)) {
        errors.confirmpassword = "Password field is required";
    }

    if (!Validator.isLength(data.password, { min:6, max: 30})) {
        errors.password = "Password must be at least 6 characters";
    }

    if (!Validator.equals(data.password, data.confirmpassword)){
        errors.confirmpassword = "Passwords must match";
    }

    return {
        errors, 
        isValid: isEmpty(errors)
    };
};