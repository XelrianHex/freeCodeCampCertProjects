const results = document.getElementById("results-div");
const userInput = document.getElementById("user-input");
const validBtn = document.getElementById("check-btn");
const resetBtn = document.getElementById("clear-btn");

const validPhone = (input) => {
  const regex = /^(1?\s?)?(\(\d{3}\)\s?|\d{3}[\s-]?)\d{3}[\s-]?\d{4}$/
  const check = regex.test(userInput.value);
  if (check) {
    results.innerText = `Valid US number: ${userInput.value}`
    results.style.backgroundColor = "green";
  } else {
    results.innerText = `Invalid US number: ${userInput.value}`
    results.style.backgroundColor = "red";
  }
}

resetBtn.addEventListener("click", () => {
  results.innerText = "";
  results.style.backgroundColor = "darkslategray";
  userInput.value = "";
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    validBtn.click();
  }
});

validBtn.addEventListener("click", (input) => {
  if (userInput.value === "") {
    alert("Please provide a phone number")
    } else {
      validPhone();
  }
});
