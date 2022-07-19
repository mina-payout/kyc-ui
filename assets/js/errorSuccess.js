const errorSuccessPopUp = ( message, status) => {
    return (
        <div class="toast align-items-center text-success" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${message} 
                </div>
                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    )
}

export default errorSuccessPopUp