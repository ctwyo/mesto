import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './initial-cards.js';

export { openModal, popupPhoto, photoPopupImg, cardCaption,  figureCaption, config};

const openPopup = document.querySelector('.popup_open');
const popupPhoto = document.querySelector('.popup_type_open-photo');
//попап редактор
const popupEdit = document.querySelector('.popup_type_edit');
const editCloseBtn = popupEdit.querySelector('.popup__close-btn');
const editForm = popupEdit.querySelector('.popup__form');
const nameInput = popupEdit.querySelector('#name');
const jobInput = popupEdit.querySelector('#job');
const openEditPopupBtn = document.querySelector('.profile__edit');

//попап добавления
const popupNewCard = document.querySelector('.popup_type_new-card');
const newCardCloseBtn = popupNewCard.querySelector('.popup__close-btn');
const newCardForm = popupNewCard.querySelector('.popup__form');
const picNameInput = popupNewCard.querySelector('#title');
const picLinkInput = popupNewCard.querySelector('#link');
const openNewCardPopupBtn = document.querySelector('.profile__add-btn');

//PROFILE
const profileName = document.querySelector('.profile__header');
const profileJob = document.querySelector('.profile__comment');

//template
const template = document.querySelector('.template').content;

const templateList = document.querySelector('.template__element');
const deleteBtn = document.querySelector('.template__trash');
const elements = document.querySelector('.elements');
const cardCaption = template.querySelector('.template__photo');
const figureCaption = document.querySelector('.figure__caption');

//попап photo
const photoPopupImg = document.querySelector('.figure__photo');
const photoPopupCaption = document.querySelector('.template__caption');
const photoPopupCloseBtn = document.querySelector('.figure__close-btn');

const buttonSaveNewCard = popupNewCard.querySelector('.popup__button');
const popups = Array.from(document.querySelectorAll('.popup'))

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButton: '.popup__button',
    inactiveButton: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
    inputError: '.popup__input-error',
    templateLike: '.template__like'
};

function renderCard(item) {
  const card = new Card(item);
  const cardElement = card.createCard();
  elements.prepend(cardElement);
}

//input карточек
function submitAddCardForm(evt) {
  evt.preventDefault();
  
  const obj = {
    name: picNameInput.value,
    link: picLinkInput.value
  };

  renderCard(obj);
  closeModal(popupNewCard);
}

newCardForm.addEventListener('submit', submitAddCardForm);

//открытие попапов
function openModal(modal) {
  modal.classList.add('popup_open');
  document.addEventListener('keydown', closeByEsc);
}

//закрытие попапов
function closeModal(modal) {
  modal.classList.remove('popup_open');
  document.removeEventListener('keydown', closeByEsc);
}

function closeByEsc(evt) { // закрытие попапа по esc
  const popup = document.querySelector('.popup_open');
  if (evt.key === 'Escape') {
    closeModal(popup);
  }
}

popups.forEach((popup) => { // закрытие попапа по клику по оверлэю
  popup.addEventListener('mousedown', function(evt) {
    if (evt.target.classList.contains('popup_open')) {
      closeModal(popup);
    }
  });
});

//попап редактор
function openTypeEditPopup() { // открыть попап редактирования
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(popupEdit);
}

function submitEditProfileForm(evt) { // сохранить изменения профиля
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(popupEdit);
}

function resetForm(form) { // очистить форму
  form.reset();
 }

 function resetValidation(form) {
  const inputElement = Array.from(form.querySelectorAll(config.inputSelector));
  const errorElement = Array.from(form.querySelectorAll(config.inputError));
  
  inputElement.forEach((input) => {
      input.classList.remove(config.inputErrorClass);
  }); 
  errorElement.forEach((error) => {
      error.classList.remove(config.errorClass);
  });
 }

openEditPopupBtn.addEventListener('click', () => {
openTypeEditPopup();
resetValidation(editForm);
});
editCloseBtn.addEventListener('click', () => closeModal(popupEdit));
editForm.addEventListener('submit', submitEditProfileForm);

openNewCardPopupBtn.addEventListener('click', () => {
openModal(popupNewCard);
resetForm(newCardForm);
resetValidation(newCardForm);
});

newCardCloseBtn.addEventListener('click', () => {
  closeModal(popupNewCard);
});

photoPopupCloseBtn.addEventListener('click', () => closeModal(popupPhoto));

  //массив карточек
initialCards.forEach(function (item) {
  renderCard(item);
});

const editProfileValidation = new FormValidator(config, popupEdit);
editProfileValidation.enableValidation();

const editNewCardValidation = new FormValidator(config, popupNewCard);
editNewCardValidation.enableValidation();