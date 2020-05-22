const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const telephoneInput = document.getElementById("telephone");
const emailInput = document.getElementById("email");

/**
 * 
 * VALIDATORS
 *  
 */

// Can only contain letters a-z in lowercase
function isValidUsername(username) {
  return /^[a-z]+$/.test(username);
};

// Must contain a lowercase, uppercase letter and a number
function isValidPassword(password) {
  return /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password)
};

// The telephone number must be in the format of (555) 555-5555
function isValidTelephone(telephone) {
  return /\D*\d{3}\D*\D*\d{3}\D*\d{4}\D*/.test(telephone);
};

// Must be a valid email address
function isValidEmail(email) {
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
};


/* 

Validate any hex value

function isValidHex(text) {
  const hexRegEx = /^#[0-9a-f]{6}$/i
}
*/

/**
 * 
 * FORMATTING FUNCTIONS
 * 
 */

function formatTelephone(text) {
  let regex = /\D*(\d{3})\D*\D*(\d{3})\D*(\d{4})\D*/
  let replacement = '($1) $2-$2';
  return text.replace(regex, replacement);
};

/**
 * 
 * SET UP EVENTS
 * 
 */

function showOrHideTip(show, element) {
  // show element when show is true, hide when false
  if (show) {
    element.style.display = "inherit";
  } else {
    element.style.display = "none";
  }
}

function createListener(validator) {
  return e => {
    const text = e.target.value;
    const valid = validator(text);
    const showTip = text !== "" && !valid;
    const tooltip = e.target.nextElementSibling;
    showOrHideTip(showTip, tooltip);
  };
}

usernameInput.addEventListener("input", createListener(isValidUsername));

passwordInput.addEventListener("input", createListener(isValidPassword));

telephoneInput.addEventListener("input", createListener(isValidTelephone));

telephoneInput.addEventListener("blur", (e) => {
    e.target.value = formatTelephone(e.target.value);
});

emailInput.addEventListener("input", createListener(isValidEmail));
