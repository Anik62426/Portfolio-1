const modals = document.querySelectorAll(".modal");
const modalButtons = document.querySelectorAll(".btn[data-modal]");
const closeBtns = document.querySelectorAll(".close");

modalButtons.forEach((btn) => {
  btn.onclick = function () {
    const modalId = this.getAttribute("data-modal");
    document.getElementById(modalId).style.display = "block";
  };
});

closeBtns.forEach((btn) => {
  btn.onclick = function () {
    this.closest(".modal").style.display = "none";
  };
});

window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
};

const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (validateForm()) {
    console.log("Form submitted:", {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value,
    });
    form.reset();
    alert("Message sent successfully!");
  }
});

function validateForm() {
  let isValid = true;

  if (nameInput.value.trim() === "") {
    setError(nameInput, "Name is required");
    isValid = false;
  } else {
    clearError(nameInput);
  }

  if (emailInput.value.trim() === "") {
    setError(emailInput, "Email is required");
    isValid = false;
  } else if (!isValidEmail(emailInput.value)) {
    setError(emailInput, "Please enter a valid email");
    isValid = false;
  } else {
    clearError(emailInput);
  }

  if (messageInput.value.trim() === "") {
    setError(messageInput, "Message is required");
    isValid = false;
  } else {
    clearError(messageInput);
  }

  return isValid;
}

function setError(input, message) {
  const formGroup = input.parentElement;
  const errorSpan = formGroup.querySelector(".error");
  errorSpan.innerText = message;
  formGroup.classList.add("error");
}

function clearError(input) {
  const formGroup = input.parentElement;
  const errorSpan = formGroup.querySelector(".error");
  errorSpan.innerText = "";
  formGroup.classList.remove("error");
}

function isValidEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
