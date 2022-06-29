const acceptBtn = document.getElementById("accept-btn")
const errorText = document.getElementById("error-text")
const errorDiv = document.getElementById("error-div")
const continueBtn = document.getElementById("continue-btn")
const checkImg = document.getElementById("check-img")

let scrolled = false


acceptBtn.onclick = () => {
    if(scrolled){

    }
    else{
        errorText.classList.remove("d-none")
        errorDiv.classList.add("border-danger")
        
        acceptBtn.classList.remove("bg-primary")
        acceptBtn.classList.add("btn-dark")
    }

}



errorDiv.onscroll = (e) => {
    if ((errorDiv.offsetHeight + errorDiv.scrollTop) >= errorDiv.scrollHeight) {
        scrolled = true
        continueBtn.classList.remove("bg-dark","bg-opacity-50","text-light","disabled")
        continueBtn.classList.add("btn-primary")
        
        
        checkImg.classList.remove("d-none")


        
    }

}