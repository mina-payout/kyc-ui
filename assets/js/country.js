
const initialize = async () => {

    sessionStorage.clear()
    //API REQUEST 
    fetch('http://minakycservicedev-env.eba-zmicm36h.us-east-1.elasticbeanstalk.com/KYCService/getCountryCodes/', {
        mode: "cors",
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })

        .then(response => response.json())
        .then(response => {
            const body = response
            const responseKey = Object.keys(body)
            const responseValue = Object.values(body)

            // 
            responseValue.map((country, index) => {
                const option = document.createElement("option")
                option.innerHTML = country
                option.value = responseKey[index]

                const li1 = document.body.appendChild(option)
                dropDown.appendChild(li1)
                li1.classList.add('list-group-item', 'bg-light')
            })

        })
        .catch((error) => {
            console.log(error);
        })
}
initialize()

const dropDown = document.getElementById("dropDown")

dropDown.onchange = (e) => {
    errorDiv.classList.add("d-none")

    sessionStorage.setItem("countySelected", e.target.value)
}



const button = document.getElementById("continue-btn")
const errorDiv = document.getElementById("errorDiv")


button.onclick = (event) => {
    const selectedCountry = sessionStorage.getItem("countySelected")
    const form = document.getElementById("selectedCountryForm")
    if (!form.checkValidity() || selectedCountry === 'Countries' || selectedCountry === null) {
        errorDiv.classList.remove("d-none")
        event.preventDefault()
        event.stopPropagation()
    }
    else {
        console.log("form  vaild", form)
        button.href = "/verifiy.html"
    
    }

}

