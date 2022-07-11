const selectedCountry = sessionStorage.getItem("countySelected")

console.log(sessionStorage.getItem("countySelected"))

$(function () {

  let selectedCountryName = selectedCountry.slice(0, 2).toLowerCase();
  console.log(selectedCountry.slice(0, 2).toLowerCase())

  $.getJSON(`/assets/json/in.json`, (data) => {

    const formFields = document.getElementById("formFields")
    const formFieldsAddress = document.getElementById("formFieldsAddress")

    // PersonInfo
    const jsonObj = data["properties"]["PersonInfo"]["properties"]
    const requiredKeys = data["properties"]["PersonInfo"]["required"]

    // Location
    const jsonObjLoc = data["properties"]["Location"]["properties"]
    const requiredKeysLoc = data["properties"]["Location"]["required"]

    console.log(data.id)

    const keys = Object.keys(jsonObj)
    const keysLoc = Object.keys(jsonObjLoc)


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





