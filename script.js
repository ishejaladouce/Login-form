document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("signup-form");
  const alertBox = document.getElementById("form-alert");

  const firstNameInput = document.getElementById("first-name");
  const middleNameInput = document.getElementById("middle-name");
  const lastNameInput = document.getElementById("last-name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const addressInput = document.getElementById("address");
  const phoneInput = document.getElementById("phone");
  const dobInput = document.getElementById("dob");

  // Show error message
  function showError(input, message) {
    const formGroup = input.closest(".form-group");
    formGroup.classList.add("error");
    const small = formGroup.querySelector("small");
    small.textContent = message;
    small.style.visibility = "visible";
  }

  // Clear error message
  function clearError(input) {
    const formGroup = input.closest(".form-group");
    formGroup.classList.remove("error");
    const small = formGroup.querySelector("small");
    small.textContent = "";
    small.style.visibility = "hidden";
  }

  // Top alert
  function showAlert(message, type = "success") {
    alertBox.textContent = message;
    alertBox.style.display = "block";
    alertBox.style.backgroundColor = type === "success" ? "#c8f7c5" : "#ffc4c4";
    alertBox.style.color = type === "success" ? "#2b7a0b" : "#c00";
    setTimeout(() => {
      alertBox.style.display = "none";
    }, 3000);
  }

  // VALIDATIONS 

  // Name validation (letters only)
  function validateNameInput(input, fieldName, required = true) {
    const value = input.value.trim();
    const regex = /^[A-Za-z]+$/; 

    if (!value && required) {
      showError(input, `${fieldName} is required`);
      return false;
    }
    if (value && !regex.test(value)) {
      showError(input, `${fieldName} must contain only letters`);
      return false;
    }
    clearError(input);
    return true;
  }

  function validateAllNames() {
    const firstValid = validateNameInput(firstNameInput, "First Name");
    const middleValid = validateNameInput(
      middleNameInput,
      "Middle Name",
      false
    );
    const lastValid = validateNameInput(lastNameInput, "Last Name");
    return firstValid && middleValid && lastValid;
  }

  // Email Validation
  function validateEmail() {
    const value = emailInput.value.trim().toLowerCase();
    const firstName = firstNameInput.value.trim().toLowerCase();
    const lastName = lastNameInput.value.trim().toLowerCase();

    if (!value) {
      showError(emailInput, "Email is required");
      return false;
    }

    if (!firstName || !lastName) {
      showError(emailInput, "Fill in First and Last Name first");
      return false;
    }
    const expectedEmail = `${firstName.charAt(0)}.${lastName}@example.com`;
    if (value !== expectedEmail) {
      showError(emailInput, `Email must be in the format: ${expectedEmail}`);
      return false;
    }
    clearError(emailInput);
    return true;
  }

  // Password Validation
  function validatePassword() {
    const value = passwordInput.value.trim();
    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

    if (!value) {
      showError(passwordInput, "Password is required");
      return false;
    }
    if (!regex.test(value)) {
      showError(
        passwordInput,
        "Password must be ≥12 chars with upper, lower, number & special char"
      );
      return false;
    }
    clearError(passwordInput);
    return true;
  }

  // Address Validation
  function validateAddress() {
    const value = addressInput.value.trim();
    if (!value) {
      showError(addressInput, "Address is required");
      return false;
    }
    if (value.length < 3) {
      showError(addressInput, "Address seems too short");
      return false;
    }
    clearError(addressInput);
    return true;
  }

  // Phone validation (Rwandan format: +2507XXXXXXXX)
  function validatePhone() {
    const value = phoneInput.value.trim();
    const regex = /^\+2507\d{8}$/;

    if (!value) {
      showError(phoneInput, "Phone number is required");
      return false;
    }
    if (!regex.test(value)) {
      showError(
        phoneInput,
        "Phone must be in the Rwandan format +2507XXXXXXXX"
      );
      return false;
    }
    clearError(phoneInput);
    return true;
  }

  // DOB Validation
  function validateDOB() {
    const value = dobInput.value.trim();
    const dobRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    if (!value) {
      showError(dobInput, "Date of Birth is required");
      return false;
    }
    if (!dobRegex.test(value)) {
      showError(dobInput, "Use format: MM/DD/YYYY");
      return false;
    }
    clearError(dobInput);
    return true;
  }

  // === EVENTS ===
  [
    firstNameInput,
    middleNameInput,
    lastNameInput,
    emailInput,
    passwordInput,
    addressInput,
    phoneInput,
    dobInput,
  ].forEach((input) => {
    input.addEventListener("blur", function () {
      switch (input.id) {
        case "first-name":
          validateNameInput(firstNameInput, "First Name");
          break;
        case "middle-name":
          validateNameInput(middleNameInput, "Middle Name", false);
          break;
        case "last-name":
          validateNameInput(lastNameInput, "Last Name");
          break;
        case "email":
          validateEmail();
          break;
        case "password":
          validatePassword();
          break;
        case "address":
          validateAddress();
          break;
        case "phone":
          validatePhone();
          break;
        case "dob":
          validateDOB();
          break;
      }
    });

    input.addEventListener("input", function () {
      clearError(input);
    });
  });

  // === SUBMIT ===
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isNamesValid = validateAllNames();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isAddressValid = validateAddress();
    const isPhoneValid = validatePhone();
    const isDOBValid = validateDOB();

    if (
      isNamesValid &&
      isEmailValid &&
      isPasswordValid &&
      isAddressValid &&
      isPhoneValid &&
      isDOBValid
    ) {
      showAlert("Information saved successfully", "success");
      form.reset();
    } else {
      showAlert("Please fix the errors before submitting", "error");
    }
  });
});
