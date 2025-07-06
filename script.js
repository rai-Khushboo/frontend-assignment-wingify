document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-container");
  const emailInput = document.getElementById("email");
  const dateInput = document.getElementById("date");
  const monthSelect = document.getElementById("month");
  const yearSelect = document.getElementById("year");
  const departmentSelect = document.getElementById("department");
  const submitBtn = document.querySelector(".submit-btn");
  const dateSelector = document.querySelector(".date-selector");
  const productDemo = document.getElementById("product-demo");
  const radioInputs = document.querySelectorAll('input[type="radio"]');

  // Helper function to reset form
  function resetForm() {
    emailInput.value = "";
    dateInput.value = "";
    monthSelect.value = "";
    yearSelect.value = "";
    departmentSelect.value = "";
    productDemo.value = "";
    // Reset radio buttons to default (first option)
    radioInputs[0].checked = true;
    radioInputs[1].checked = false;
  }

  // Helper to show error for single inputs
  function showError(input, message) {
    input.classList.add("error");
    let errorElem = input.nextElementSibling;
    if (!errorElem || !errorElem.classList.contains("error-message")) {
      errorElem = document.createElement("div");
      errorElem.className = "error-message";
      input.parentNode.appendChild(errorElem);
    }
    errorElem.textContent = message;
  }

  // Helper to show error for date group
  function showDateError(message) {
    dateInput.classList.add("error");
    monthSelect.classList.add("error");
    yearSelect.classList.add("error");
    
    // Check if error message already exists
    let errorElem = dateSelector.nextElementSibling;
    if (!errorElem || !errorElem.classList.contains("error-message")) {
      errorElem = document.createElement("div");
      errorElem.className = "error-message";
      dateSelector.parentNode.appendChild(errorElem);
    }
    errorElem.textContent = message;
  }

  // Helper to clear error for single inputs
  function clearError(input) {
    input.classList.remove("error");
    const errorElem = input.parentNode.querySelector(".error-message");
    if (errorElem) {
      errorElem.remove();
    }
  }

  // Helper to clear error for date group
  function clearDateError() {
    dateInput.classList.remove("error");
    monthSelect.classList.remove("error");
    yearSelect.classList.remove("error");
    
    const errorElem = dateSelector.parentNode.querySelector(".error-message");
    if (errorElem) {
      errorElem.remove();
    }
  }

  // Email validation
  function isValidEmail(email) {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  }

  // Date validation
  function isValidDate(d, m, y) {
    if (!d || !m || !y) return false;
    
    const date = new Date(`${y}-${m}-${d}`);
    return (
      date.getFullYear() == y &&
      date.getMonth() + 1 == parseInt(m) &&
      date.getDate() == parseInt(d)
    );
  }

  // Main validation on button click
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault(); // prevent default form submit
    let isValid = true;

    // Email check
    if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, "Please add valid email address");
      isValid = false;
    } else {
      clearError(emailInput);
    }

    const day = dateInput.value.trim();
    const month = monthSelect.value;
    const year = yearSelect.value;
    if (!isValidDate(day, month, year)) {
      showDateError("Please enter valid date");
      isValid = false;
    } else {
      clearDateError();
    }

    // Department check
    if (departmentSelect.value === "") {
      showError(departmentSelect, "Please select a field");
      isValid = false;
    } else {
      clearError(departmentSelect);
    }

    if (isValid) {
      // Reset form if all validations pass
      resetForm();
    }
  });
});