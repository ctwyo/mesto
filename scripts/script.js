let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('#name');
let jobInput = document.querySelector('#job');
let openPopup = document.querySelector('.profile__edit');
let profileName = document.querySelector('.profile__header');
let profileJob = document.querySelector('.profile__comment');
let closePopup = document.querySelector('.popup__close-btn');

function togglePopup() {
    if (!popup.classList.contains('.popup_open')) {
        nameInput.value = profileName.textContent;
        jobInput.value = profileJob.textContent;
    }
    popup.classList.toggle('popup_open');
}

function formSubmitHandler  (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup();
}

openPopup.addEventListener('click', togglePopup);
closePopup.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);