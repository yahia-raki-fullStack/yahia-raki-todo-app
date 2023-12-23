"use strict";
import Sortable from "sortablejs";
// Selecting form and input elements
const formEl = document.querySelector("#input");
const userInput = document.querySelector(".user--input");
const counter = document.querySelector(".count");

// Initializing counter from data attribute
let updateCounter = +counter.dataset.counter;

// Selecting UI elements
const listParent = document.querySelector(".user--toDos");

// Function to get trimmed user input value
function getUserInputValue() {
  return userInput.value.trim();
}

// Function to update the counter
function updateCounterF() {
  // Get trimmed user input value
  const userInputValue = getUserInputValue();

  // Check if the input is not empty
  if (userInputValue === "") return;

  // Increment the counter and update the UI
  updateCounter++;
  counter.textContent = updateCounter;
}

// Function to update the UI with user input
function updateUI() {
  // Get trimmed user input value
  const userInputValue = getUserInputValue();
  if (userInput.value === ``) return;

  // Creating HTML markup for a new list item
  const markup = `<li class="user--toDos--items">
    ${userInputValue} 
    <span class="delet-btn">X</span>
    <span class="hamburger-btn">&#9776;</span>
  </li>`;

  // Inserting the markup into the list
  listParent.insertAdjacentHTML("beforeend", markup);
  userInput.value = ``;
}

// Function to handle form submission
function getUserInput(e) {
  e.preventDefault();

  // Check if the counter is less than 20 before allowing the user to submit
  if (updateCounter < 20) {
    // Update the counter and UI
    updateCounterF();
    updateUI();
  } else {
    // Optionally, you can display a message to the user or handle the situation differently
    alert("You can't add more items. Please delete an item first.");
  }
}

// Event listener for form submission
formEl.addEventListener("submit", getUserInput);

// Event listener for delete buttons
const sortable = new Sortable(listParent);

// Event listener for delete buttons and hamburger buttons
listParent.addEventListener(`click`, function (e) {
  let XBtn = e.target.closest(`.delet-btn`);
  let hamburgerBtn = e.target.closest(`.hamburger-btn`);

  if (XBtn) {
    // Handle delete button click
    XBtn.closest(`li`).remove();
    updateCounter -= 1;
    counter.textContent = updateCounter;
  } else if (hamburgerBtn) {
    // Toggle sortable functionality
    sortable.option("disabled", !sortable.option("disabled"));
  }
});
