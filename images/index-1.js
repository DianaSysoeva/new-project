const profileEditButton = document.querySelector('.profile__edit-bnt');
const profilePopup = document.querySelector('.popup_open-profile');
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');


function openPopup(popup) {
   popup.classList.add('popup_opened');

}

function closePopup(popup) {
   popup.classList.remove('popup_opened');
}

function fillProfileInputs() {
   inputFormName.value = nameProfile.textContent;
   inputFormDescription.value = descriptionProfile.textContent;
}


profileEditButton.addEventListener('click', () => {
   openPopup(profilePopup);
   fillProfileInputs();

})

const closeButtons = document.querySelectorAll('.popup__close-btn');
closeButtons.forEach((button) => {
   const popup = button.closest('.popup');
   button.addEventListener('click', () => closePopup(popup));
});


// --------------------------------------Попап с именем-----------------------

const profileForm = document.forms["popup__form-profile"];
const inputFormName = document.querySelector('.popup__profile_edit_name');
const inputFormDescription = document.querySelector('.popup__profile_edit_description');

function handleProfileSubmit(evt) {
   evt.preventDefault();
   nameProfile.textContent = inputFormName.value;
   descriptionProfile.textContent = inputFormDescription.value;
   closePopup(profilePopup);
}
profileForm.addEventListener('submit', handleProfileSubmit);




// --------------------------------------Добавление данных для формирования карочки---

const popUpPhoto = document.querySelector('.popup_open-photo');
const popUpAddPhotoButton = document.querySelector('.profile__add-btn');

popUpAddPhotoButton.addEventListener('click', () => {
   openPopup(popUpPhoto);
});

//------------------------------------- Формирование карточки ---------------

const cardsList = document.querySelector('.elements');

const cardTemplate = document.querySelector('#element').content;

function createCard(photoValue, nameValue) {
   const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
   const cardImage = cardElement.querySelector('.element__photo');
   const cardTitle = cardElement.querySelector('.element__city');
   const cardLikeButton = cardElement.querySelector('.element__heart');
   const cardDeleteButton = cardElement.querySelector('.element__trash');

   cardTitle.textContent = nameValue;
   cardImage.src = photoValue;
   cardImage.alt = nameValue;

   cardLikeButton.addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__heart_active');
   });

   cardDeleteButton.addEventListener('click', function (evt) {
      evt.target.closest('.element').remove();
   });

   cardImage.addEventListener('click', function (evt) {
      setImagePopupPhoto(photoValue, nameValue);
   });
   return cardElement;
}

function addCard(nameValue, photoValue) {
   const cardElement = createCard(nameValue, photoValue);
   cardsList.prepend(cardElement);
}


// -------------------------------------формирование карточек по умолчанию----------

const formPhoto = document.forms["popup__form-photo"];
const photo = document.querySelector('.popup__profile_add_photo');
const description = document.querySelector('.popup__profile_add_description');
formPhoto.addEventListener('submit', function (evt) {
   evt.preventDefault();
   addCard(photo.value, description.value);
   evt.target.reset();
   closePopup(popUpPhoto);
});


const initialCards = [
   ['./images/karachaevo.jpg', 'Карачаево-Черкессия'],
   ['./images/altay.jpg', 'Алтай'],
   ['./images/Donbuy.png', 'Кабардино-Балкария'],
   ['./images/crimea.jpg', 'Крым'],
   ['./images/baikal.jpg', 'Байкал'],
   ['./images/smolensk.jpg', 'Смоленск']
];

initialCards.map((item) => {
   addCard(item[0], item[1], cardsList);
});

//------------------------------------Открытие фотограии из карочки-----------

const popupIncreasePhoto = document.querySelector('.popup_mod-dark');

const popupPhotoElement = popupIncreasePhoto.querySelector(".increase-img__photo-view");
const popupPhotoDescription = popupIncreasePhoto.querySelector(".increase-img__name-view");

function setImagePopupPhoto(photoValue, nameValue) {
   openPopup(popupIncreasePhoto);
   popupPhotoElement.src = photoValue;
   popupPhotoElement.alt = nameValue;
   popupPhotoDescription.textContent = nameValue;
}



// const form = document.querySelector('.popup__form');
// const nameInput = form.querySelector('#name');
// const descriptionInput = form.querySelector('#description');
// const submitBtn = form.querySelector('#submit');

// const validateInput = (input, min, max) => {
//    const errorMessage =
//       input.parentNode.querySelector('.popup__error');
//    if (input.validity.valueMissing) {
//       errorMessage.textContent = 'Это обязательное поле';
//       return false;
//    }
//    if (input.validity.tooShort) {
//       errorMessage.textContent = `Минимальное количество символов: ${min}`;
//       return false;
//    }
//    if (input.validity.tooLong) {
//       errorMessage.textContent = `Максимальное количество символов:
// ${max}`;
//       return false;
//    }
//    errorMessage.textContent = '';
//    return true;
// };
// const toggleSubmitBtnState = () => {
//    if (nameInput.validity.valid && descriptionInput.validity.valid) {
//       submitBtn.disabled = false;
//       submitBtn.classList.add('popup__send-btn_active');
//    } else {
//       submitBtn.disabled = true;
//       submitBtn.classList.remove('popup__send-btn_active');
//    }
// };
// nameInput.addEventListener('input', () => {
//    validateInput(nameInput, 2, 40);
//    toggleSubmitBtnState();
// });
// descriptionInput.addEventListener('input', () => {
//    validateInput(descriptionInput, 2, 200);
//    toggleSubmitBtnState();
// });
// form.addEventListener('submit', (event) => {
//    event.preventDefault();
// });


// //____________________________
// const popupFormPhoto = document.querySelector('.popup_open-photo .popup__form');
// const inputNamePhoto = popupFormPhoto.querySelector('#name__photo');
// const inputDescriptionPhoto = popupFormPhoto.querySelector('#description__photo');
// const submitButtonPhoto = popupFormPhoto.querySelector('#submit__photo');

// function checkInputValidity(input) {
//    const errorElement = input.nextElementSibling;
//    if (!input.validity.valid) {
//       errorElement.textContent = input.validationMessage;
//       errorElement.classList.add('popup__error_active');
//    } else {
//       errorElement.textContent = '';
//       errorElement.classList.remove('popup__error_active');
//    }
// }

// function toggleButtonState(button, isActive) {
//    if (isActive) {
//       button.classList.remove('popup__send-btn_inactive');
//       button.disabled = false;
//    } else {
//       button.classList.add('popup__send-btn_inactive');
//       button.disabled = true;
//    }
// }

// function setEventListeners(form) {
//    const inputs = form.querySelectorAll('.popup__profile');
//    inputs.forEach((input) => {
//       input.addEventListener('input', () => {
//          checkInputValidity(input);
//          toggleButtonState(submitButtonPhoto, form.checkValidity());
//       });
//    });
//    form.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//    });
// }

// function enableValidation(form) {
//    setEventListeners(form);
//    toggleButtonState(submitButtonPhoto, form.checkValidity());
// }

// enableValidation(popupFormPhoto);

// const formProfile = document.querySelector('.popup_open-profile .popup__form');
// const inputName = formProfile.querySelector('#name');
// const inputDescription = formProfile.querySelector('#description');
// const submitButtonProfile = formProfile.querySelector('#submit');

// const checkInputValidity = (input) => {
//    const errorElement = input.nextElementSibling;
//    errorElement.textContent = input.validationMessage;
//    errorElement.classList.toggle('popup__error_active', !input.validity.valid);
// }
// const toggleButtonState = (button, isActive) => {
//    button.disabled = !isActive;
//    button.classList.toggle('popup__send-btn_inactive', !isActive);
// }
// const setEventListeners = (form) => {
//    form.addEventListener('input', (event) => {
//       checkInputValidity(event.target);
//       toggleButtonState(submitButtonProfile, form.checkValidity());
//    });
//    form.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//    });
// }
// const enableValidation = (form) => {
//    setEventListeners(form);
//    toggleButtonState(submitButtonProfile, form.checkValidity());
// }
// enableValidation(formProfile);


// // Для формы добавления фотографии
// const formPhoto1 = document.querySelector('.popup_open-photo .popup__form');
// const inputNamePhoto = formPhoto1.querySelector('#name__photo');
// const inputDescriptionPhoto = formPhoto1.querySelector('#description__photo');
// const submitButtonPhoto = formPhoto1.querySelector('#submit__photo');


// const checkInputValidityPhoto = (input) => {
//    const errorElement = input.nextElementSibling;
//    errorElement.textContent = input.validationMessage;
//    errorElement.classList.toggle('popup__error_active', !input.validity.valid);
// }
// const toggleButtonStatePhoto = (button, isActive) => {
//    button.disabled = !isActive;
//    button.classList.toggle('popup__send-btn_inactive', !isActive);
// }
// const setEventListenersPhoto = (form) => {
//    form.addEventListener('input', (event) => {
//       checkInputValidityPhoto(event.target);
//       toggleButtonStatePhoto(submitButtonPhoto, form.checkValidity());
//    });
//    form.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//    });
// }
// const enableValidationPhoto = (form) => {
//    setEventListenersPhoto(form);
//    toggleButtonStatePhoto(submitButtonPhoto, form.checkValidity());
// }
// enableValidationPhoto(formPhoto1);

// ///-----------------------------------------------------

// // Функция для закрытия попапов при нажатии ESC
// function closePopupByEscKey(event) {
//    const popup = document.querySelector('.popup_opened');
//    if (event.key === 'Escape' && popup) {
//       closePopup(popup);
//    }
// }

// // Функция для закрытия попапов при клике на пустой области экрана
// function closePopupByOverlayClick(event) {
//    const popup = document.querySelector('.popup_opened');
//    if (event.target === popup) {
//       closePopup(popup);
//    }
// }

// // Добавляем обработчики событий на весь документ
// document.addEventListener('keydown', closePopupByEscKey);
// document.addEventListener('click', closePopupByOverlayClick);


// const formProfile = document.querySelector('.popup_open-profile .popup__form');
// const inputName = formProfile.querySelector('#name');
// const inputDescription = formProfile.querySelector('#description');

//________________

//Проверка полей на валидацию

const checkInputValidity = (input) => {
   const errorElement = input.nextElementSibling;
   errorElement.textContent = input.validationMessage;
   errorElement.classList.toggle('popup__error_active', !input.validity.valid);
}

//переключение кнопки 

// const toggleButtonState = (button, isActive) => {
//    button.disabled = !isActive;
//    button.classList.toggle('popup__send-btn_inactive', !isActive);
// }

//

// const setEventListeners = (form, button) => {
//    form.addEventListener('input', (event) => {
//       checkInputValidity(event.target);
//       toggleButtonState(button, form.checkValidity());
//    });
//    form.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//    });
// }
// проверка на валидацию всей формы

// const enableValidation = (form, button) => {
//    setEventListeners(form, button);
//    toggleButtonState(button, form.checkValidity());
// }

// проверка валидации  полей формы профайла
const submitButtonProfile = profileForm.querySelector('.popup__send-btn');

// enableValidation(profileForm, submitButtonProfile);


// Для формы добавления фотографии

// const formPhoto1 = document.querySelector('.popup_open-photo .popup__form');
// const inputNamePhoto = formPhoto1.querySelector('#name__photo');
// const inputDescriptionPhoto = formPhoto1.querySelector('#description__photo');
const submitButtonPhoto = formPhoto.querySelector('.popup__send-btn');

// const setEventListenersPhoto = (form) => {
//    form.addEventListener('input', (event) => {
//       checkInputValidity(event.target);
//       toggleButtonState(submitButtonPhoto, form.checkValidity());
//    });
// }
// const enableValidationPhoto = (form) => {
//    setEventListenersPhoto(form);
//    toggleButtonState(submitButtonPhoto, form.checkValidity());
// }

//проверка на валидацию полей формы фото в карточке

// enableValidation(formPhoto, submitButtonPhoto);

///-----------------------------------------------------
// const enableValidation = (settings) => {
//    const defaultSettings = {
//      formSelector: '.popup__form',
//      inputSelector: '.popup__profile',
//      submitButtonSelector: '.popup__send-btn',
//      inactiveButtonClass: 'popup__send-btn_inactive',
//      inputErrorClass: 'popup__error',
//      errorClass: 'popup__error_active'
//    };
//    const finalSettings = Object.assign({}, defaultSettings, settings);
//    const forms = document.querySelectorAll(finalSettings.formSelector);
//    forms.forEach((form) => {
//      setEventListeners(form, finalSettings.submitButtonSelector, finalSettings);
//      toggleButtonState(form.querySelector(finalSettings.submitButtonSelector), form.checkValidity(), finalSettings);
//    });
//  };



const setEventListeners = (form, buttonSelector, settings) => {
   form.addEventListener('input', (event) => {
      checkInputValidity(event.target, settings);
      toggleButtonState(form.querySelector(buttonSelector), form.checkValidity(), settings);
   });
   form.addEventListener('submit', (evt) => {
      evt.preventDefault();
   });
};

const toggleButtonState = (button, isActive, settings) => {
   button.disabled = !isActive;
   button.classList.toggle(settings.inactiveButtonClass, !isActive);
};

const enableValidation = (settings) => {
   const defaultSettings = {
      formSelector: '.popup__form',
      inputSelector: '.popup__profile',
      submitButtonSelector: '.popup__send-btn',
      inactiveButtonClass: 'popup__send-btn_inactive',
      inputErrorClass: 'popup__error',
      errorClass: 'popup__error_active'
   };

   const finalSettings = {};
   for (let prop in defaultSettings) {
      finalSettings[prop] = settings[prop] || defaultSettings[prop];
   }

   const forms = document.querySelectorAll(finalSettings.formSelector);
   forms.forEach((form) => {
      setEventListeners(form, finalSettings.submitButtonSelector, finalSettings);
      toggleButtonState(form.querySelector(finalSettings.submitButtonSelector), form.checkValidity(), finalSettings);
   });
};

enableValidation({
   formSelector: '.popup__form',
   inputSelector: '.popup__profile',
   submitButtonSelector: '.popup__send-btn',
   inactiveButtonClass: 'popup__send-btn_inactive',
   inputErrorClass: 'popup__error',
   errorClass: 'popup__error_active'
});


// Функция для закрытия попапов при нажатии ESC
function closePopupByEscKey(event) {
   const popup = document.querySelector('.popup_opened');
   if (event.key === 'Escape' && popup) {
      closePopup(popup);
   }
}

// Функция для закрытия попапов при клике на пустой области экрана
function closePopupByOverlayClick(event) {
   const popup = document.querySelector('.popup_opened');
   if (event.target === popup) {
      closePopup(popup);
   }
}

// Добавляем обработчики событий на весь документ
document.addEventListener('keydown', closePopupByEscKey);
document.addEventListener('click', closePopupByOverlayClick);


