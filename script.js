document.addEventListener('DOMContentLoaded', function () {

   const form = document.getElementById('signup-form');
   const nameInput = document.getElementById('name')

   function showError(input, message){
    const formGroup = input.closest('.form-group');
    formGroup.classlist.add('error');
    const small = formGroup.querySelector('small');
    small.textcontent = message;
    small.style.visibility = 'visible';
   }

   function clearError(input) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.remove('error');
    const small = formGroup.queryselector('small');
    small.textcontent = '';
    small.style,visibility = 'hidden';
   }

   nameInput.addEventListener('blur', function(){
    validateName();
   });

   nameInput.addEventListener('input', function() {
    clearError(nameInput);
   });

   form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateName()) {
        alert('Information saved successfully');
        form.reset();
        clearError(nameInput);
    }
        else{
            alert('please fix the erros before submitting');
        }
    });

});