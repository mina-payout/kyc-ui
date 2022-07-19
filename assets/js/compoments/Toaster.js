class Toaster {
    constructor(message) {
        document.getElementsByTagName('body')[0].classList.add("position-relative")
        document.getElementsByTagName('body')[0].classList.add("opacity-50")
        const errorDiv = document.getElementById('errorDiv')


        document.getElementsByTagName('body')[0].innerHTML = `
        <div  class="position-absolute w-100 top-50 left-0 d-flex justify-content-center " >
            <div id="errorDiv" class="toast align-items-center text-danger show"  role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                ${message}
                </div>
                <button id="closeButton" type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            </div>
        </div>
        ` + document.getElementsByTagName('body')[0].innerHTML


        const closeButton = document.getElementById('closeButton')
        closeButton.onclick = (e) => {
           
            document.getElementsByTagName('body')[0].classList.remove("opacity-50")
            errorDiv.classList.remove('show')
        }

        


    }
}