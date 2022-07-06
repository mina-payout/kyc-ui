const countryList = [

    "Australia",
    "India",
    "USA"

];



const dropDown = document.getElementById("dropDown")


countryList.map((country, index) => {

    //mapCountry.innerHTML = country

    const option = document.createElement("option")
    option.innerHTML = country
    option.value = countryList[index]
    const li1 = document.body.appendChild(option)
    dropDown.appendChild(li1)
    li1.classList.add('list-group-item', 'bg-light')



})

dropDown.onchange = (e) => {
    sessionStorage.setItem("countySelected", e.target.value)
}





