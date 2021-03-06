const selectedCountry = sessionStorage.getItem('countySelected');
const verifyLocation = document.getElementById('locationInfo');
const communicationInfo = document.getElementById('communicationInfo');
const personInfo = document.getElementById('personInfo');
const anchorTag = document.getElementById('anchorTag');
const userEmail = window.sessionStorage.getItem('userEmail');
const userPublicKey = window.sessionStorage.getItem('userPublicKey');

let resultData;

$(function () {
  let selectedCountryName = selectedCountry.slice(0, 2).toLowerCase();
  console.log(selectedCountry.slice(0, 2).toLowerCase());

  //API REQUEST
  fetch(`http://minakycservicedev-env.eba-zmicm36h.us-east-1.elasticbeanstalk.com/KYCService/getRecommendedfields?countryCode=${selectedCountryName}`, {
    mode: 'cors',
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then(async (response) => {
      if (response.status === 200) {
        const data = await response.json();
        resultData = data;

        const formFields = document.getElementById('formFields');
        const formFieldsAddress = document.getElementById('formFieldsAddress');
        const formFieldsCommunication = document.getElementById('formFieldsCommunication');

        //PersonInfo
        if (data['properties']['PersonInfo']) {
          // PersonInfo
          const jsonObj = data['properties']['PersonInfo']['properties'];
          const requiredKeys = data['properties']['PersonInfo']['required'];
          const keys = Object.keys(jsonObj);

          keys.map((key) => {
            const field = jsonObj[key];
            formFields.innerHTML += ` 
              <div class="col">
                <div  class="form-floating">
                  <input
                    type= "${field.type}"
                    class="form-control w-100"
                    id="${key}"
                    placeholder="name@example.com"
                    ${requiredKeys.includes(key) ? 'required' : ''}
                  
                  />
                  <label class="text-black-50 fs-6" for="${key}">${field.label}</label>
                </div>
              </div>
          `;
          });
        } else {
          personInfo.classList.add('d-none');
        }

        //Location
        if (data['properties']['Location']) {
          // Location
          const jsonObjLoc = data['properties']['Location']['properties'];
          const requiredKeysLoc = data['properties']['Location']['required'];
          const keysLoc = Object.keys(jsonObjLoc);

          keysLoc.map((key) => {
            const field = jsonObjLoc[key];
            formFieldsAddress.innerHTML += ` 
                <div class="col">
                  <div  class="form-floating ">
                    <input
                      type= "${field.type === 'string' ? 'text' : 'number'}"
                      class="form-control w-100 "
                      id="${key}"
                      placeholder="name@example.com"
                      ${requiredKeysLoc.includes(key) ? 'required' : ''}
                    />
                    <label class="text-black-50 fs-6 " for="${key}">${field.label}</label>
                  </div>
                </div>
            `;
          });
        } else {
          verifyLocation.classList.add('d-none');
        }

        //Communication
        if (data['properties']['Communication']) {
          const jsonObjCom = data['properties']['Communication']['properties'];
          const requiredKeysCom = data['properties']['Communication']['required'];
          const keysCom = Object.keys(jsonObjCom);

          keysCom.map((key) => {
            const field = jsonObjCom[key];
            formFieldsCommunication.innerHTML += ` 
                <div class="col">
                  <div  class="form-floating ">
                    <input
                      type= "${field.type === 'string' ? 'text' : 'number'}"
                      class="form-control w-100 "
                      id="${key}"
                      placeholder="name@example.com"
                      ${requiredKeysCom.includes(key) ? 'required' : ''}
                    />
                    <label class="text-black-50 fs-6 " for="${key}">${field.label}</label>
                  </div>
                </div>
            `;
          });
          document.getElementById('EmailAddress').value = userEmail;
        } else {
          communicationInfo.classList.add('d-none');
        }
      } else {
        new Toaster('Something went Wrong');
      }
      document.getElementById('loading-spinner').classList.add('d-none');
    })
    .catch((error) => {
      new Toaster('Something went Wrong');

      document.getElementById('loading-spinner').classList.add('d-none');
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

const formSubmit = () => {
  let jsonObject = {};

  jsonObject.CountryCode = selectedCountry.slice(0, 2).toUpperCase();
  jsonObject.PublicKey = userPublicKey;
  jsonObject.PublicKEmailAddressey = userEmail;
  jsonObject.DataFields = {};

  // PersonInfo
  jsonObject.DataFields.PersonInfo = {};

  if (resultData['properties']['PersonInfo']) {
    const jsonObj = resultData['properties']['PersonInfo']['properties'];
    const keys = Object.keys(jsonObj);
    keys.map((key) => {
      const inputKey = document.getElementById(key);
      jsonObject.DataFields.PersonInfo[inputKey.id] = inputKey.value;
    });
  }

  // Location
  jsonObject.DataFields.Location = {};

  if (resultData['properties']['Location']) {
    const jsonObjLoc = resultData['properties']['Location']['properties'];
    const keysLoc = Object.keys(jsonObjLoc);
    keysLoc.map((key) => {
      const inputKey = document.getElementById(key);
      jsonObject.DataFields.Location[inputKey.id] = inputKey.value;
    });
  }

  // Communication
  jsonObject.DataFields.Communication = {};

  if (resultData['properties']['Communication']) {
    const jsonObjCom = resultData['properties']['Communication']['properties'];
    const keysLoc = Object.keys(jsonObjCom);
    keysLoc.map((key) => {
      const inputKey = document.getElementById(key);
      jsonObject.DataFields.Communication[inputKey.id] = inputKey.value;
    });
  }

  //API REQUEST
  fetch('http://minakycservicedev-env.eba-zmicm36h.us-east-1.elasticbeanstalk.com/KYCService/verifyKYCService/', {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonObject),
  })
    // .then((response) => response.json())
    .then((response) => {
      anchorTag.href = 'trulioEmbedId.html';
      console.log('trulioEmbedId:', response);
      anchorTag.click();
    })
    .catch((error) => {
      alert('Something Went Wrong!!!');
      console.log(error);
    });

  console.log(jsonObject);
};
