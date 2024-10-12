let price = 0;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

// let cid = [
//   ["PENNY", 0.01], 
//   ["NICKEL", 0], 
//   ["DIME", 0], 
//   ["QUARTER", 0], 
//   ["ONE", 1], 
//   ["FIVE", 0], 
//   ["TEN", 0], 
//   ["TWENTY", 0], 
//   ["ONE HUNDRED", 0]
//   ];


const cash = document.getElementById("cash");
const cost = document.getElementById("price");
const purchaseBtn = document.getElementById("purchase-btn");
const registerDisplay = document.getElementById("change-due");
const drawer = document.getElementById("cid");
const menuBtns = document.querySelectorAll("#menu button");
cost.textContent = `$${price.toFixed(2)}`;
drawer.innerHTML = cid.map(([name, value]) => `<span>${name}: <strong>${value.toFixed(2)}</strong> </span>`).reverse().join("");


const drawerLogic = () => { 
  let reverseCid = [...cid].reverse();
  let totalCid = reverseCid.reduce((sum, coin) => sum + coin[1], 0);
  let cashValue = +(+cash.value).toFixed(2);
  let changeDue = +(cashValue - price).toFixed(2);
  let changeDisplay = [];
  let status = "";
  let values = [100, 20, 10, 5, 1, .25, .1, .05, .01];
   
   console.log("cash",cashValue);
   console.log("typecash", typeof(cashValue));
  if (cashValue < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cashValue === price) {
    registerDisplay.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
    return;
  }
  
  if (totalCid < changeDue) {
    registerDisplay.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
    return;
  }

  let gotChange = (changeDue) => {
    for (let i = 0; i < reverseCid.length; i++) {
      const coinValue = values[i];
      let coinAmount = reverseCid[i][1];

      while (changeDue >= coinValue && coinAmount > 0) {
        changeDue -= coinValue;
        changeDue = +changeDue.toFixed(2);
        coinAmount -= coinValue;
      }
    }
    return changeDue === 0;
  }

  if (!gotChange(changeDue)) {
    registerDisplay.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
    return;
  }


  for (let i = 0; i < reverseCid.length; i++) {
    const coinName = reverseCid[i][0];
    let coinValue = values[i];
    let coinAmount = reverseCid[i][1];
    
    let changeGiven = 0; 

    while (changeDue >= coinValue && coinAmount > 0) {
      changeDue -= coinValue;
      changeDue = +changeDue.toFixed(2);
      coinAmount -= coinValue;
      changeGiven += coinValue;
    }

    if (changeGiven > 0) {
      changeDisplay.push([coinName, +changeGiven.toFixed(2)]);
      reverseCid[i][1] = coinAmount;
    }
  }

  for (let i = 0; i < reverseCid.length; i++) {
    reverseCid[i][1] = Math.max(0, reverseCid[i][1]);
  }

  let totalReturnedChange = changeDisplay.reduce((sum, coin) => sum + parseFloat(coin[1]), 0);
  let totalCidAvailable = totalCid;
  
  if (totalReturnedChange < changeDue) {
    status = "INSUFFICIENT_FUNDS";
  } else {
    if (totalCidAvailable === 0 || (totalCidAvailable === totalCid && totalReturnedChange >= totalCid)) {
      status = "CLOSED";
    } else {
      status = "OPEN";
    }
  }
  
  drawer.innerHTML = reverseCid.map(([name, value]) => `<span>${name}: <strong>${value.toFixed(2)}</strong></span>`).join("");
  if (cashValue <= 0) {
      return;
  }
  
  let display = {};
  
  for (let i = 0; i < changeDisplay.length; i++) {
    let coin = changeDisplay[i][0];
    let value = changeDisplay[i][1];

    if (!display[coin]) {
      display[coin] = 0;
    }
    display[coin] += +value;
  }

 if (status === "INSUFFICIENT_FUNDS") {
   registerDisplay.innerHTML += `<p>Status: ${status}</p>`;
 } else if (status && cashValue !== price) {
   registerDisplay.innerHTML += `<p>Status: ${status} ${Object.keys(display).map(coin => `${coin}: $${display[coin]}`).join(" ")}</p>`;
 }
 cash.value = "";
 display = {};
}

const cashRegister = () => {
  registerDisplay.innerHTML = "";
  drawerLogic();
}

menuBtns.forEach(button => {
    button.addEventListener("click", () => {
        cost.textContent = "";
        price = parseFloat(button.value);
        cost.textContent = `$${price.toFixed(2)}`
    });
});

purchaseBtn.addEventListener("click", cashRegister);
cash.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    cashRegister();
  }
})