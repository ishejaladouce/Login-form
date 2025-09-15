document.addEventListener('DOMContentLoaded', function () {

   const form = document.getElementById('signup-form');
   const alertBox = document.getElementById('form-alert');

   const nameInput = document.getElementById('name');
   const emailInput = document.getElementById('email');
   const passwordInput = document.getElementById('password');
   const addressInput = document.getElementById('address');
   const phoneInput = document.getElementById('phone');

   // Show error message
   function showError(input, message) {
      const formGroup = input.closest('.form-group');
      formGroup.classList.add('error');
      const small = formGroup.querySelector('small');
      small.textContent = message;
      small.style.visibility = 'visible';
   }

   // Clear error message
   function clearError(input) {
      const formGroup = input.closest('.form-group');
      formGroup.classList.remove('error');
      const small = formGroup.querySelector('small');
      small.textContent = '';
      small.style.visibility = 'hidden';
   }

   // Top alert
   function showAlert(message, type = 'success') {
      alertBox.textContent = message;
      alertBox.style.display = 'block';
      alertBox.style.backgroundColor = type === 'success' ? '#c8f7c5' : '#ffc4c4';
      alertBox.style.color = type === 'success' ? '#2b7a0b' : '#c00';
      setTimeout(() => { alertBox.style.display = 'none'; }, 3000);
   }

   // Validations
   function validateName() {
      const value = nameInput.value.trim();
      if (!value) { showError(nameInput, 'Name is required'); return false; }
      if (value.length < 2) { showError(nameInput, 'Name must be at least 2 characters'); return false; }
      clearError(nameInput); return true;
   }

   function validateEmail() {
      const value = emailInput.value.trim();
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) { showError(emailInput, 'Email is required'); return false; }
      if (!regex.test(value)) { showError(emailInput, 'Enter a valid email'); return false; }
      clearError(emailInput); return true;
   }

   function validatePassword() {
      const value = passwordInput.value.trim();
      if (!value) { showError(passwordInput, 'Password is required'); return false; }
      if (value.length < 6) { showError(passwordInput, 'Password must be at least 6 characters'); return false; }
      clearError(passwordInput); return true;
   }

   function validateAddress() {
      const value = addressInput.value.trim();
      if (!value) { showError(addressInput, 'Address is required'); return false; }
      if (value.length < 3) { showError(addressInput, 'Address seems too short'); return false; }
      clearError(addressInput); return true;
   }

   function validatePhone() {
      const value = phoneInput.value.trim();
      const regex = /^\+?\d{8,15}$/; // Only digits, optional +
      if (!value) { showError(phoneInput, 'Phone number is required'); return false; }
      if (!regex.test(value)) { showError(phoneInput, 'Enter a valid phone number'); return false; }
      clearError(phoneInput); return true;
   }

   // Blur and input events
   [nameInput, emailInput, passwordInput, addressInput, phoneInput].forEach(input => {
      input.addEventListener('blur', function() {
         switch(input.id){
            case 'name': validateName(); break;
            case 'email': validateEmail(); break;
            case 'password': validatePassword(); break;
            case 'address': validateAddress(); break;
            case 'phone': validatePhone(); break;
         }
      });
      input.addEventListener('input', function(){ clearError(input); });
   });

   // Submit event
   form.addEventListener('submit', function(e) {
      e.preventDefault();

      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isPasswordValid = validatePassword();
      const isAddressValid = validateAddress();
      const isPhoneValid = validatePhone();

      if (isNameValid && isEmailValid && isPasswordValid && isAddressValid && isPhoneValid) {
         showAlert('Information saved successfully', 'success');
         form.reset();
      } else {
         showAlert('Please fix the errors before submitting', 'error');
      }
   });

});
