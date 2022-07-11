
const initialize = async () => {


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
    sessionStorage.setItem("countySelected", e.target.value)
}





