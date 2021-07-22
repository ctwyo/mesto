
export default class FormValidator {
    constructor(config, formElement) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        //this._submitButton = config.submitButton;
        this._inactiveButton = config.inactiveButton;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._inputError = config.inputError;
        this._templateLike = config.templateLike;
        this._formElement = formElement;

        this._buttonElement = formElement.querySelector(config.submitButton);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        }


        _showInputError = (inputElement) => {
            const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
            inputElement.classList.add(this._inputErrorClass);
            errorElement.textContent = inputElement.validationMessage;
            errorElement.classList.add(this._errorClass);
        }

        _hideInputError = (inputElement) => {
            const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
            inputElement.classList.remove(this._inputErrorClass);
            errorElement.classList.remove(this._errorClass);
            errorElement.textContent = '';
        }

        // disableButton = () => {
        //     const popup = document.querySelector('.popup_open');
        //     const btn = popup.querySelector(this._inactiveButton);
        //     btn.classList.add(this._inactiveButton);
        // }

        _hasInvalidInput = () => {
            return this._inputList.some((inputElement) => {
                return !inputElement.validity.valid;
            });
        }

        _buttonActivity = () => {
            if (this._hasInvalidInput()) {
                this._buttonElement.classList.add(this._inactiveButton);
                this._buttonElement.setAttribute('disabled', 'true');
            } else {
                this._buttonElement.classList.remove(this._inactiveButton);
                this._buttonElement.removeAttribute('disabled', 'true');
            }
        }

        _checkInputValidity = (inputElement) => {
            if (!inputElement.validity.valid) {
                this._showInputError(inputElement);
            } else {
                this._hideInputError(inputElement);
                this._buttonActivity();
            }
        }

        _setEventListener = () => {
            const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
            this._buttonActivity();
            inputList.forEach((inputElement) => {
                inputElement.addEventListener('input', () => {
                    this._checkInputValidity(inputElement);
                    this._buttonActivity();
                })
            })
        }

        enableValidation = () => {
            const formList = Array.from(this._formElement.querySelectorAll(this._formSelector));
            formList.forEach((formElement) => {
                formElement.addEventListener('submit', function (evt) {
                    evt.preventDefault();
                });
                this._setEventListener();
            });
        }
}