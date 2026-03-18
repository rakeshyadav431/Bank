let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
let chart;

// Generate Account Number
function generateAccNo() {
  return "ACC" + Math.floor(100000 + Math.random() * 900000);
}

// Create Account
function createAccount() {
  let name = document.getElementById("name").value;

  if (name === "") {
    alert("Enter name");
    return;
  }

  let accNo = generateAccNo();

  let account = {
    name: name,
    accNo: accNo,
    balance: 0,
    transactions: []
  };

  accounts.push(account);
  updateStorage();

  alert("Account Created: " + accNo);
}

// Search Account
function searchAccount() {
  let accNo = document.getElementById("searchAcc").value;
  let account = accounts.find(acc => acc.accNo === accNo);

  if (!account) {
    document.getElementById("result").innerHTML = "Account not found";
    return;
  }

  displayAccount(account);
}

// Display Account
function displayAccount(account) {
  let html = `
    <h3>${account.name}</h3>
    <p>Account No: ${account.accNo}</p>
    <p>Balance: ₹${account.balance}</p>

    <input type="number" id="amount" placeholder="Amount">

    <button onclick="deposit('${account.accNo}')">Deposit</button>
    <button onclick="withdraw('${account.accNo}')">Withdraw</button>
    <button onclick="deleteAccount('${account.accNo}')">Delete</button>

    <h4>Transactions</h4>
    <ul>
      ${account.transactions.map(t => `<li>${t}</li>`).join("")}
    </ul>
  `;

  document.getElementById("result").innerHTML = html;

  showGraph(account);
}

// Deposit
function deposit(accNo) {
  let amount = parseInt(document.getElementById("amount").value);

  if (!amount || amount <= 0) {
    alert("Enter valid amount");
    return;
  }

  let account = accounts.find(acc => acc.accNo === accNo);
  account.balance += amount;
  account.transactions.push("Deposited ₹" + amount);

  updateStorage();
  displayAccount(account);
}

// Withdraw
function withdraw(accNo) {
  let amount = parseInt(document.getElementById("amount").value);

  let account = accounts.find(acc => acc.accNo === accNo);

  if (!amount || amount <= 0) {
    alert("Enter valid amount");
    return;
  }

  if (amount > account.balance) {
    alert("Insufficient balance");
    return;
  }

  account.balance -= amount;
  account.transactions.push("Withdrew ₹" + amount);

  updateStorage();
  displayAccount(account);
}

// Delete
function deleteAccount(accNo) {
  accounts = accounts.filter(acc => acc.accNo !== accNo);
  updateStorage();
  document.getElementById("result").innerHTML = "Account deleted";
}

// Update storage
function updateStorage() {
  localStorage.setItem("accounts", JSON.stringify(accounts));
}

// Graph
function showGraph(account) {
  let deposits = 0;
  let withdraws = 0;

  account.transactions.forEach(t => {
    if (t.includes("Deposited")) deposits++;
    if (t.includes("Withdrew")) withdraws++;
  });

  let ctx = document.getElementById("myChart").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Deposits", "Withdrawals"],
      datasets: [{
        label: "Transactions",
        data: [deposits, withdraws],
        backgroundColor: ["green", "red"]
      }]
    }
  });
}
