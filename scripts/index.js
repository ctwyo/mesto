const popup = document.querySelector('.popup');
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
    inputError: '.popup__input-error'
};

enableValidation(config);

function renderCard(name, link) {
  elements.prepend(createCard(name, link));
}
function createCard(name, link) {
  const card = template.querySelector('.template__element').cloneNode(true);
  const cardCaption = card.querySelector('.template__caption');
  const cardPhoto = card.querySelector('.template__photo');
  cardCaption.textContent = name;
  cardPhoto.src = link;
  cardPhoto.alt = name;
  
  const like = card.querySelector('.template__like');
  like.addEventListener('click', likeButtonHandle);

  setDeleteCardListener(card);
  setOpenPhotoListener(card);

  return card;
}

//input карточек
function submitAddCardForm(evt) {
  evt.preventDefault();
  renderCard(picNameInput.value, picLinkInput.value);
  closeModal(popupNewCard);
}

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

function likeButtonHandle(like) { // like
  like.target.classList.toggle('template__like_active');
}

function setDeleteCardListener(card) { // удалить карточку
  card.querySelector('.template__trash').addEventListener('click', function(evt) {
    evt.target.closest('.template__element').remove();
  });
}

function setOpenPhotoListener(photo) { // октрытие картинки
  photo.querySelector('.template__photo').addEventListener('click', function(evt) {
    openModal(popupPhoto);
    photoPopupImg.src = evt.target.src;
    cardCaption.textContent = evt.target.alt;
    figureCaption.textContent = cardCaption.textContent;
    photoPopupImg.alt = cardCaption.textContent;
  });
}

function resetForm(form) {
  form.reset();
  resetValidation(form);
  disableButton();
}

openEditPopupBtn.addEventListener('click', () => {
openTypeEditPopup();
});
editCloseBtn.addEventListener('click', () => closeModal(popupEdit));
editForm.addEventListener('submit', submitEditProfileForm);

openNewCardPopupBtn.addEventListener('click', () => {
openModal(popupNewCard);
resetForm(newCardForm);
});

newCardCloseBtn.addEventListener('click', () => {
  closeModal(popupNewCard);
});
newCardForm.addEventListener('submit', submitAddCardForm);

photoPopupCloseBtn.addEventListener('click', () => closeModal(popupPhoto));

//массив карточек
initialCards.forEach(function (item) {
  renderCard(item.name, item.link);
});