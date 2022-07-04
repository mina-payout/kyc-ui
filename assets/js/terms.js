const acceptBtn = document.getElementById('accept-btn');
const errorText = document.getElementById('error-text');
const errorDiv = document.getElementById('error-div');
const continueBtn = document.getElementById('continue-btn');
const checkImg = document.getElementById('check-img');

let scrolled = false;

acceptBtn.onclick = () => {
  if (scrolled) {
    acceptBtn.classList.remove('bg-primary');
    acceptBtn.classList.add('bg-dark', 'bg-opacity-50', 'text-light');

    continueBtn.classList.remove('bg-dark', 'bg-opacity-50', 'text-light', 'disabled');
    continueBtn.classList.add('btn-primary');
  } else {
    errorText.classList.remove('d-none');
    errorDiv.classList.add('border-danger');
  }
};

errorDiv.onscroll = (e) => {
  if (errorDiv.offsetHeight + errorDiv.scrollTop >= errorDiv.scrollHeight) {
    scrolled = true;

    acceptBtn.classList.remove('bg-dark', 'bg-opacity-50', 'text-light');
    acceptBtn.classList.add('btn-primary');

    errorText.classList.add('d-none');

    errorDiv.classList.remove('border-danger');

    continueBtn.classList.remove();

    checkImg.classList.remove('d-none');
  }
};
