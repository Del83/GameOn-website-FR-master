function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modal = document.querySelector(".modal");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const form = document.getElementById("reserve");
const prenom = document.getElementById("first");
const nom = document.getElementById("last");
const email = document.getElementById("email");
const birthDate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const close = document.querySelector(".close");
const message = document.querySelectorAll(".message");
const city = document.querySelector("input[type=radio]");
const cgv = document.querySelector("input[type=checkbox]");
const input = document.querySelectorAll(".text-control");
const modalThanks = document.querySelector(".modal-thanks");
const messageErrorSubmit = document.getElementById("validate-error-message");

// REGEX
const regexName = /[a-zA-Z]{2,}/g;
const regexEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexDate =
  /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
/*  /(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/; */
const regexQuantity = /^(0|[1-9][0-9]?|)$/;

// ERROR MESSAGE
let msgNameError = "Veuillez entrer 2 caractères ou plus dans ce champ.";
let msgEmailError = "Veuillez entrer une adresse mail valide.";
let msgDateError = "Vous devez entrer votre date de naissance.";
let msgQuantityError = "Vous devez indiquer un chiffre entre 0 et 99.";
let msgCityError = "Vous devez choisir une ville.";
let msgCgvError = "Vous devez lire et accepter les conditions d'utilisation.";
let msgChampVide = "Veuillez remplir ce champ pour valider votre inscription";
let msgSubmitError =
  "Veuillez remplir tous les champs et/ou accepter les conditions d'utilisation.";

// DOM Elements - affichage des messages d'erreur
const displayErrorPrenom = document.getElementById("first-message");
const displayErrorNom = document.getElementById("last-message");
const displayErrorEmail = document.getElementById("email-message");
const displayErrorDate = document.getElementById("birthdate-message");
const displayErrorQuantity = document.getElementById("quantity-message");
const displayErrorCity = document.getElementById("city-message");
const displayErrorCgv = document.getElementById("cgv-message");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modal.style.display = "block";
}

// fermeture du modal
function closeModal() {
  modal.style.display = "none";
}
close.addEventListener("click", closeModal);

// CONDITIONS DE VALIDATION DE SAISIE DES ELEMENTS NOM, PRENOM, EMAIL, DATE DE NAISSANCE
class ElementFormValid {
  constructor(elementForm, regexError, displayError, messageElementError) {
    this.elementForm = elementForm;
    this.regexError = regexError;
    this.displayError = displayError;
    this.messageElementError = messageElementError;
  }
}

const prenomValid = new ElementFormValid(
  prenom,
  regexName,
  displayErrorPrenom,
  msgNameError
);
const nomValid = new ElementFormValid(
  nom,
  regexName,
  displayErrorNom,
  msgNameError
);
const emailValid = new ElementFormValid(
  email,
  regexEmail,
  displayErrorEmail,
  msgEmailError
);
const dateValid = new ElementFormValid(
  birthDate,
  regexDate,
  displayErrorDate,
  msgDateError
);
const quantityValid = new ElementFormValid(
  quantity,
  regexQuantity,
  displayErrorQuantity,
  msgQuantityError
);

const validElementForm = (ElementFormValid) => {
  ElementFormValid.elementForm.addEventListener("input", (e) => {
    if (ElementFormValid.regexError.test(e.target.value)) {
      ElementFormValid.elementForm.classList.add("valid-message");
      ElementFormValid.elementForm.classList.remove("error-message");
      ElementFormValid.displayError.innerText = " ";
      isValid = true;
    } else {
      ElementFormValid.elementForm.classList.remove("valid-message");
      ElementFormValid.elementForm.classList.add("error-message");
      ElementFormValid.displayError.innerText =
        ElementFormValid.messageElementError;
      isValid = false;
    }
  });
};

validElementForm(prenomValid);
validElementForm(nomValid);
validElementForm(emailValid);
validElementForm(dateValid);
validElementForm(quantityValid);

// CONDTIONS GLOBALES DE VALIDATION DU FORMULAIRE
function validate() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!cgv.checked) {
      displayErrorCgv.innerText = msgCgvError;
    } else if (!city.checked) {
      displayErrorCity.innerText = msgCityError;
    } else if (
      message[0].textContent === msgNameError ||
      message[1].textContent === msgNameError ||
      message[2].textContent === msgEmailError ||
      message[3].textContent === msgDateError ||
      message[4].textContent === msgQuantityError
    ) {
      messageErrorSubmit.innerText = msgSubmitError;
    } else if (
      input[0].value == "" ||
      input[1].value == "" ||
      input[2].value == "" ||
      input[3].value == "" ||
      input[4].value == ""
    ) {
      messageErrorSubmit.innerText = "Un champ semble ne pas être rempli.";
    } else {
      openThanksModal();
      isValid = true;
    }
  });
}

validate();

function openThanksModal() {
  modal.style.display = "none";
  modalThanks.style.display = "block";
}
