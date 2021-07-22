import { openModal, popupPhoto, photoPopupImg, figureCaption } from './index.js';

class Card {
    constructor(data, cardSelector) {
        this._cardSelector = cardSelector;
        this._name = data.name;
        this._link = data.link;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector('.template')
        .content
        .querySelector('.template__element')
        .cloneNode(true);

        return cardElement;
    }

    createCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.template__photo').src = `${this._link}`;
        this._element.querySelector('.template__photo').alt = `${this._name}`;
        this._element.querySelector('.template__caption').textContent = `${this._name}`;
        

        return this._element;
    }

    _likeButtonHandle(like) {
        like.target.classList.toggle('template__like_active');
    }

    _setDeleteCardListener(evt) {
        evt.target.closest('.template__element').remove();
    }

    _setOpenPhotoListener() {
        openModal(popupPhoto);
        photoPopupImg.src = this._element.querySelector('.template__photo').src;
        photoPopupImg.alt = this._element.querySelector('.template__photo').alt;
        figureCaption.textContent = this._element.querySelector('.template__caption').textContent;
    }

    _setEventListeners() {
        this._element.querySelector('.template__like').addEventListener('click', (evt) => {
            this._likeButtonHandle(evt);
        });

        this._element.querySelector('.template__trash').addEventListener('click', (evt) => {
            this._setDeleteCardListener(evt);
        });

        this._element.querySelector('.template__photo').addEventListener('click', () => {
             this._setOpenPhotoListener();
        });
    }
}

export default Card;