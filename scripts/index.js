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



const form = document.querySelector('.popup__form');
const nameInput = form.querySelector('#name');
const descriptionInput = form.querySelector('#description');
const submitBtn = form.querySelector('#submit');

const validateInput = (input, min, max) => {
   const errorMessage =
      input.parentNode.querySelector('.popup__error');
   if (input.validity.valueMissing) {
      errorMessage.textContent = 'Это обязательное поле';
      return false;
   }
   if (input.validity.tooShort) {
      errorMessage.textContent = `Минимальное количество символов: ${min}`;
      return false;
   }
   if (input.validity.tooLong) {
      errorMessage.textContent = `Максимальное количество символов:
${max}`;
      return false;
   }
   errorMessage.textContent = '';
   return true;
};
const toggleSubmitBtnState = () => {
   if (nameInput.validity.valid && descriptionInput.validity.valid) {
      submitBtn.disabled = false;
      submitBtn.classList.add('popup__send-btn_active');
   } else {
      submitBtn.disabled = true;
      submitBtn.classList.remove('popup__send-btn_active');
   }
};
nameInput.addEventListener('input', () => {
   validateInput(nameInput, 2, 40);
   toggleSubmitBtnState();
});
descriptionInput.addEventListener('input', () => {
   validateInput(descriptionInput, 2, 200);
   toggleSubmitBtnState();
});
form.addEventListener('submit', (event) => {
   event.preventDefault();
});


//____________________________
const popupFormPhoto = document.querySelector('.popup_open-photo .popup__form');
const inputNamePhoto = popupFormPhoto.querySelector('#name__photo');
const inputDescriptionPhoto = popupFormPhoto.querySelector('#description__photo');
const submitButtonPhoto = popupFormPhoto.querySelector('#submit__photo');

function checkInputValidity(input) {
   const errorElement = input.nextElementSibling;
   if (!input.validity.valid) {
      errorElement.textContent = input.validationMessage;
      errorElement.classList.add('popup__error_active');
   } else {
      errorElement.textContent = '';
      errorElement.classList.remove('popup__error_active');
   }
}

function toggleButtonState(button, isActive) {
   if (isActive) {
      button.classList.remove('popup__send-btn_inactive');
      button.disabled = false;
   } else {
      button.classList.add('popup__send-btn_inactive');
      button.disabled = true;
   }
}

function setEventListeners(form) {
   const inputs = form.querySelectorAll('.popup__profile');
   inputs.forEach((input) => {
      input.addEventListener('input', () => {
         checkInputValidity(input);
         toggleButtonState(submitButtonPhoto, form.checkValidity());
      });
   });
   form.addEventListener('submit', (evt) => {
      evt.preventDefault();
   });
}

function enableValidation(form) {
   setEventListeners(form);
   toggleButtonState(submitButtonPhoto, form.checkValidity());
}

enableValidation(popupFormPhoto);
