const result = document.getElementById("result");
const checkBtn = document.getElementById("check-btn");
const userInput = document.getElementById("text-input");

const isPalindrome = input => {
  if (userInput.value === ""){
    alert("Please input a value");
    return;
  }
  const cleanInput = userInput.value.replace(/[^A-Za-z0-9]/gi, '').toLowerCase();
  const revInput = [...cleanInput].reverse().join("");
  if (revInput === cleanInput){
    result.style.display = "block";
    result.innerText = `${userInput.value} is a palindrome`;
  }else {
    result.style.display = "block"
    result.innerText = `${userInput.value} is not a palindrome`;
    
  }
  
};

checkBtn.addEventListener("click", isPalindrome);
