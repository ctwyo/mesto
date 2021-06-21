const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

const resetValidation = (popup) => {
    const inputElement = Array.from(popup.querySelectorAll(config.inputSelector));
    const errorElement = Array.from(popup.querySelectorAll(config.inputError));

    inputElement.forEach((input) => {
        input.classList.remove(config.inputErrorClass);
    });
  
    errorElement.forEach((error) => {
        error.classList.remove(config.errorClass);
    });
}

const disableButton = () => {
    const popup = document.querySelector('.popup_open');
    const btn = popup.querySelector(config.submitButton);
    btn.classList.add(config.inactiveButton);
};

const hasinvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const buttonActivity = (inputList, button, config) => {
    if (hasinvalidInput(inputList)) {
        button.classList.add(config.inactiveButton);
        button.setAttribute('disabled', 'true');
    } else {
        button.classList.remove(config.inactiveButton);
        button.removeAttribute('disabled', 'true');
    }
}

const checkInputValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }
};

const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const button = formElement.querySelector(config.submitButton);
    buttonActivity(inputList, button, config);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, config)
            buttonActivity(inputList, button, config);
        });
    });
};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, config);
    });
};