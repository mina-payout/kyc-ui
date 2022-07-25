(() => {
  'use strict';

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');
  const continueBtn = document.getElementById('continue-btn');
  const indexForm = document.forms['indexForm'];

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      'submit',
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        const email = document.indexForm.email.value;
        const publicKey = document.indexForm.publicKey.value;
        window.sessionStorage.setItem('userEmail', email);
        window.sessionStorage.setItem('userPublicKey', publicKey);
        form.classList.add('was-validated');
        continueBtn.classList.remove('btn-primary');
        continueBtn.classList.add('btn-dark');
      },
      false
    );
  });
})();
