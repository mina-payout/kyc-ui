const selectedCountry = sessionStorage.getItem('countySelected');

$(function () {
  let selectedCountryName = selectedCountry.slice(0, 2).toLowerCase();

  $.getJSON(`/assets/json/${selectedCountryName}.json`, (data) => {
    const formFields = document.getElementById('formFields');
    const jsonObj = data['properties']['PersonInfo']['properties'];
    const requiredKeys = data['properties']['PersonInfo']['required'];
    const keys = Object.keys(jsonObj);

    keys.map((key) => {
      const field = jsonObj[key];
      formFields.innerHTML += ` 
              <div class="col">
                <div  class="form-floating">
                  <input
                    type= "${field.type === 'string' ? 'text' : 'number'}"
                    class="form-control w-100"
                    id="${key}"
                    placeholder="name@example.com"
                    ${requiredKeys.includes(key) ? 'required' : ''}
                  />
                  <label for="${key}">${field.label}</label>
                </div>
              </div>
          `;
    });
  });
});

(() => {
  'use strict';

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');
  const continueBtn = document.getElementById('continue-btn');

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      'submit',
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated');

        continueBtn.classList.remove('btn-primary');
        continueBtn.classList.add('btn-dark');
      },
      false
    );
  });
})();
