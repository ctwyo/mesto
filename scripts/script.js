let openPopup = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__close-btn');
let popupButton = document.querySelector('.popup__button');
let profileName = document.querySelector('.profile__header');
let profileComment = document.querySelector('.profile__comment');
let popupName = document.getElementById('name');
let popupJob = document.getElementById('job');

openPopup.addEventListener('click', toggleClass);
closePopup.addEventListener('click', toggleClass);

function toggleClass() {
    popup.classList.toggle('popup_open');
    popupName.value = profileName.textContent;
    popupJob.value = profileComment.textContent;
}

popupButton.addEventListener('click', function() {
    profileName.textContent = popupName.value;
    profileComment.textContent = popupJob.value;
    toggleClass();
})
