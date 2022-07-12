const selectedCountry = sessionStorage.getItem("countySelected")
const verifyLocation = document.getElementById("locationInfo")
const personInfo = document.getElementById("personInfo")


console.log(sessionStorage.getItem("countySelected"))

$(function () {

  let selectedCountryName = selectedCountry.slice(0, 2).toLowerCase();
  console.log(selectedCountry.slice(0, 2).toLowerCase())

  $.getJSON(`http://minakycservicedev-env.eba-zmicm36h.us-east-1.elasticbeanstalk.com/KYCService/getRecommendedfields?countryCode=${selectedCountryName}`, (data) => {

    const formFields = document.getElementById("formFields")
    const formFieldsAddress = document.getElementById("formFieldsAddress")


    if (data["properties"]["PersonInfo"]) {

      // PersonInfo
      const jsonObj = data["properties"]["PersonInfo"]["properties"]
      const requiredKeys = data["properties"]["PersonInfo"]["required"]
      const keys = Object.keys(jsonObj)


      keys.map((key) => {

        const field = jsonObj[key]
        formFields.innerHTML += ` 
            <div class="col">
              <div  class="form-floating">
                <input
                  type= "${field.type === "string" ? "text" : "number"}"
                  class="form-control w-100"
                  id="${key}"
                  placeholder="name@example.com"
                  ${requiredKeys.includes(key) ? "required" : ""}
                />
                <label class="text-black-50 fs-6" for="${key}">${field.label}</label>
              </div>
            </div>
        `
      })
    }
    else {
      personInfo.classList.add("d-none")
    }


    if (data["properties"]["Location"]) {


      // Location
      const jsonObjLoc = data["properties"]["Location"]["properties"]
      const requiredKeysLoc = data["properties"]["Location"]["required"]
      const keysLoc = Object.keys(jsonObjLoc)


      keysLoc.map((key) => {

        const field = jsonObjLoc[key]
        formFieldsAddress.innerHTML += ` 
              <div class="col">
                <div  class="form-floating ">
                  <input
                    type= "${field.type === "string" ? "text" : "number"}"
                    class="form-control w-100 "
                    id="${key}"
                    placeholder="name@example.com"
                    ${requiredKeysLoc.includes(key) ? "required" : ""}
                  />
                  <label class="text-black-50 fs-6 " for="${key}">${field.label}</label>
                </div>
              </div>
          `
      })
    }
    else {
      verifyLocation.classList.add("d-none")
    }



  }, (error) => {
    console.error(error)
    window.location.reload()
  });
});





(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')
  const continueBtn = document.getElementById("continue-btn")

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')

      continueBtn.classList.remove('btn-primary')
      continueBtn.classList.add('btn-dark')
    }, false)
  })

})()


setTimeout(() => {
  document.getElementById('loading-spinner').classList.add('d-none')
}, 2000);




