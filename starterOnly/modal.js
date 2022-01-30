function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM ELEMENTS - GENERALS
const modal = document.querySelector(".modal");
const modalBtn = document.querySelectorAll(".modal-btn");
const form = document.getElementById("reserve");
const close = document.querySelector(".close");
const modalThanks = document.querySelector(".modal-thanks");
// DOM ELEMENTS - FORM FIELDS (champs formulaires)
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthDate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const city = document.querySelector("input[type=radio]");
const cgv = document.querySelector("input[type=checkbox]");
// DOM ELEMENTS - VALIDATION ELEMENTS (élements de validation)
const input = document.querySelectorAll(".text-control");
const fieldMessage = document.querySelectorAll(".field-message");
const errorMessageSubmit = document.getElementById("error-message-submit");
// DOM ELEMENTS - DISPLAY OF ERROR MESSAGES
const displayErrorFirstName = document.getElementById("first-message");
const displayErrorLastName = document.getElementById("last-message");
const displayErrorEmail = document.getElementById("email-message");
const displayErrorDate = document.getElementById("birthdate-message");
const displayErrorQuantity = document.getElementById("quantity-message");
const displayErrorCity = document.getElementById("city-message");
const displayErrorCgv = document.getElementById("cgv-message");

// REGEX - REGULAR EXPRESSIONS FOR FIELDS RULES
const regexName = /[a-zA-Z]{2,}/g;
const regexEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexDate =
  /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
const regexQuantity = /^(0|[1-9][0-9]?|)$/;

// FIELD ERROR MESSAGES
let msgNameError = "Veuillez entrer 2 caractères ou plus dans ce champ.";
let msgEmailError = "Veuillez entrer une adresse mail valide.";
let msgDateError =
  "Vous devez entrer votre date de naissance selon le format JJ/MM/AAAA.";
let msgQuantityError = "Vous devez indiquer un chiffre entre 0 et 99.";
let msgCityError = "Vous devez choisir une ville.";
let msgCgvError = "Vous devez lire et accepter les conditions d'utilisation.";
let msgSubmitError =
  "Veuillez remplir tous les champs pour valider votre inscription.";

// LAUNCH MODAL EVENT
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// LAUNCH MODAL FORM
function launchModal() {
  modal.style.display = "block";
}

// CLOSING MODAL FORM
function closeModal() {
  modal.style.display = "none";
}
close.addEventListener("click", closeModal);

// LAUNCH THANKS MODAL FORM
function openThanksModal() {
  modal.style.display = "none";
  modalThanks.style.display = "block";
}

// CONDITIONS FOR VALIDATING THE ENTRY OF ELEMENTS
class fieldValidationConditions {
  // classe regroupant les conditions de validation des champs
  constructor(fieldName, fieldRules, fieldDisplay, messageElementError) {
    this.fieldName = fieldName; // attribut : nom du champ à valider
    this.fieldRules = fieldRules; // attribut : règles du champ à valider
    this.fieldDisplay = fieldDisplay; // attribut : affichage du champ valide ou invalide
    this.messageElementError = messageElementError; // attribut : message d'erreur du champ invalide
  }
}

const firstFieldConditions = new fieldValidationConditions( // instance de la classe : conditions du champs prénom
  firstName,
  regexName,
  displayErrorFirstName,
  msgNameError
);
const lastFieldConditions = new fieldValidationConditions( // instance de la classe : conditions du champs nom
  lastName,
  regexName,
  displayErrorLastName,
  msgNameError
);
const emailFieldConditions = new fieldValidationConditions( // instance de la classe : conditions du champs email
  email,
  regexEmail,
  displayErrorEmail,
  msgEmailError
);
const dateFieldConditions = new fieldValidationConditions( // instance de la classe : conditions du champs date de naissance
  birthDate,
  regexDate,
  displayErrorDate,
  msgDateError
);
const quantityFieldConditions = new fieldValidationConditions( // instance de la classe : conditions du champs quantité
  quantity,
  regexQuantity,
  displayErrorQuantity,
  msgQuantityError
);

const controlValidationConditions = (fieldValidationConditions) => {
  // fonction contrôlant la validité des conditions
  fieldValidationConditions.fieldName.addEventListener("input", (e) => {
    // fonction écoutant les champs du formulaire à chaque changement
    if (fieldValidationConditions.fieldRules.test(e.target.value)) {
      // condition testant la valeur de chaque champs avec la règle à valider
      // SI CONDITION REMPLIE
      fieldValidationConditions.fieldName.classList.add("valid-message"); // insertion d'une classe dans le DOM pour ajouter une bordure verte autour du champ valide
      fieldValidationConditions.fieldName.classList.remove("error-message"); // suppression de la classe dans le DOM ajoutant la bordure rouge du champ invalide
      fieldValidationConditions.fieldDisplay.innerText = " "; // insertion d'un texte vide sous le champ valide (condition de la fonction de validation du formulaire)
      isValid = true;
    } else {
      // SI CONDITION NON REMPLIE
      fieldValidationConditions.fieldName.classList.remove("valid-message"); // suppression de la classe rajoutant la bordure verte
      fieldValidationConditions.fieldName.classList.add("error-message"); // insertion d'une classe dans le DOM pour ajouter une bordure rouge autour du champ invalide
      fieldValidationConditions.fieldDisplay.innerText =
        fieldValidationConditions.messageElementError; // insertion d'un message d'erreur sous le champ invalide (condition de la fonction de validation du formulaire)
      isValid = false;
    }
  });
};

controlValidationConditions(firstFieldConditions); // appel de la fonction : contrôle du champ prénom
controlValidationConditions(lastFieldConditions); // appel de la fonction : contrôle du champ nom
controlValidationConditions(emailFieldConditions); // appel de la fonction : contrôle du champ email
controlValidationConditions(dateFieldConditions); // appel de la fonction : contrôle du champ date de naissance
controlValidationConditions(quantityFieldConditions); // appel de la fonction : contrôle du champ quantité

// CONDTIONS GLOBALES DE VALIDATION DU FORMULAIRE
function formValidation() {
  // fonction validant le formulaire
  form.addEventListener("submit", (e) => {
    // fonction écoutant le bouton d'envoi du formulaire
    e.preventDefault(); // utilisation de cette methode pour annuler l'action par défaut du bouton d'envoi du formulaire

    // CGV FIELD VALIDATION CONDITION
    if (!cgv.checked) {
      // condition testant le cochage du bouton-radio CGV (si le bouton-radio n'est pas coché, alors ...)
      displayErrorCgv.innerText = msgCgvError; // insertion d'un message d'erreur sous le champ invalide (bouton-radio non coché)
      // TOURNAMENT CITIES FIELD VALIDATION CONDITION
    } else if (!city.checked) {
      // condition testant le cochage d'un des boutons-radio ville du tournois (si le bouton-radio n'est pas coché, alors ...)
      displayErrorCity.innerText = msgCityError; // insertion d'un message d'erreur sous le champ invalide (bouton-radio non coché)
      // CONDITION COMPARING MESSAGES BELOW FIELDS
    } else if (
      fieldMessage[0].textContent === msgNameError || // comparaison du message sous le champ prénom
      fieldMessage[1].textContent === msgNameError || // comparaison du message sous le champ nom
      fieldMessage[2].textContent === msgEmailError || // comparaison du message sous le champ email
      fieldMessage[3].textContent === msgDateError || // comparaison du message sous le champ date de naissance
      fieldMessage[4].textContent === msgQuantityError // comparaison du message sous le champ quantité
    ) {
      errorMessageSubmit.innerText = msgSubmitError; // insertion d'un message d'erreur dans l'en-tête du formulaire indiquant au client de remplir tout les champs pour valider l'inscription
      // CONDITION TESTING IF A FIELD IS EMPTY
    } else if (
      input[0].value == "" || // comparaison du champ prénom si vide
      input[1].value == "" || // comparaison du champ nom si vide
      input[2].value == "" || // comparaison du champ email si vide
      input[3].value == "" || // comparaison du champ date de naissance si vide
      input[4].value == "" // comparaison du champ quantité si vide
    ) {
      errorMessageSubmit.innerText = msgSubmitError; // insertion d'un message d'erreur dans l'en-tête du formulaire indiquant au client de remplir tout les champs pour valider l'inscription
      // IF NO CONDITION INVALIDATE THE FORM
    } else {
      openThanksModal(); // appel de la fonction ouvrant le modal de remerciement
      isValid = true; // formulaire validé
    }
  });
}

formValidation(); // appel de la fonction validant le formulaire
