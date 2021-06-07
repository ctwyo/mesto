//карточки

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 
const popup = document.querySelector('.popup');
const popupPhoto = document.querySelector('.popup__type_open_photo');
//попап редактор
const popupEdit = document.querySelector('.popup_type_edit');
const editCloseBtn = popupEdit.querySelector('.popup__close-btn');
const editForm = popupEdit.querySelector('.popup__form');
const nameInput = popupEdit.querySelector('#name');
const jobInput = popupEdit.querySelector('#job');
const saveTypeEdit = popupEdit.querySelector('.popup__button');
const openEditPopupBtn = document.querySelector('.profile__edit');

//попап добавления
const popupNewCard = document.querySelector('.popup__type_new-card');
const newCardCloseBtn = popupNewCard.querySelector('.popup__close-btn');
const newCardForm = popupNewCard.querySelector('.popup__form');
const picNameInput = popupNewCard.querySelector('#title');
const picLinkInput = popupNewCard.querySelector('#link');
const saveNewCard = popupNewCard.querySelector('.popup__button');
const openNewCardPopupBtn = document.querySelector('.profile__add-btn');

//PROFILE
const profileName = document.querySelector('.profile__header');
const profileJob = document.querySelector('.profile__comment');

//template
const cardsTemplate = document.querySelector('#element').content;
const cardList = document.querySelector('.cards__elements');
const deleteBtn = document.querySelector('.cards__trash');

//попап photo
const photoPopupImg = document.querySelector('.figure__photo');
const photoPopupCaption = document.querySelector('.cards__caption');
const photoPopupCloseBtn = document.querySelector('.figure__close-btn');

//массив карточек
initialCards.forEach(function (item) {
  renderCard(item.name, item.link);
});

function renderCard(name, link) {
  cardList.prepend(createCard(name, link));
}
function createCard(name, link) {
  const card = cardsTemplate.cloneNode(true);
  card.querySelector('.cards__caption').textContent = name;
  card.querySelector('.cards__photo').src = link;
  card.querySelector('.cards__photo').alt = name;
  likeButtonHandle(card);
  deleteCard(card);
  openPhoto(card);
  return card;
}

//input карточек
function cardSubmitHandle(evt) {
  evt.preventDefault();
  renderCard(picNameInput.value, picLinkInput.value);
  toggleModal(popupNewCard);
}

//открытие закрытие попапов
function toggleModal(modal) {
  modal.classList.toggle('popup_open');
}

//попап редактор
function openTypeEditPopup() { // открыть попап редактирования
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  toggleModal(popupEdit);
}
function closeTypeEditPopup() { // закрыть попап редактор
  toggleModal(popupEdit);
}

function profileSubmitHandle(evt) { // сохранить изменения профиля
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  toggleModal(popupEdit);
}

function likeButtonHandle(like) { // like
  like.querySelector('.cards__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('cards__like_active');
  });
}

function deleteCard(card) { // удалить карточку
  card.querySelector('.cards__trash').addEventListener('click', function(evt) {
    evt.target.closest('.cards__item').remove();
  });
}

function closePhotoPopup (){ // закрыть попап картинки
  toggleModal(popupPhoto);
}

function openPhoto(photo) { // октрытие картинки
  photo.querySelector('.cards__photo').addEventListener('click', function(evt) {
    toggleModal(popupPhoto);
    photoPopupImg.src = evt.target.src;
    const cardCaption = document.querySelector('.cards__photo');
    cardCaption.textContent = evt.target.alt;
    const figureCaption = document.querySelector('.figure__caption');
    figureCaption.textContent = cardCaption.textContent;
  });
}

openEditPopupBtn.addEventListener('click', openTypeEditPopup);
editCloseBtn.addEventListener('click', closeTypeEditPopup);
editForm.addEventListener('submit', profileSubmitHandle);

openNewCardPopupBtn.addEventListener('click', () => toggleModal(popupNewCard));
newCardCloseBtn.addEventListener('click', () => toggleModal(popupNewCard));
newCardForm.addEventListener('submit', cardSubmitHandle);

photoPopupCloseBtn.addEventListener('click', closePhotoPopup);