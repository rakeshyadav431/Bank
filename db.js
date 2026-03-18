<!DOCTYPE html>
<html>
<head>
  <title>Bank System</title>

  <!-- Firebase -->
  <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"></script>

  <!-- Charts + PDF -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

  <link rel="stylesheet" href="css/style.css">
</head>

<body>

<div id="login">
  <h2>Login</h2>
  <input id="email" placeholder="Email">
  <input id="password" type="password" placeholder="Password">
  <button onclick="login()">Login</button>
</div>

<div id="app" style="display:none">
  <h2>🏦 Bank Dashboard</h2>

  <input id="name" placeholder="Name">
  <button onclick="createAccount()">Create Account</button>

  <input id="acc" placeholder="Account No">
  <input id="amt" placeholder="Amount">

  <button onclick="deposit()">Deposit</button>
  <button onclick="withdraw()">Withdraw</button>

  <button onclick="loadTransactions()">Transactions</button>
  <button onclick="downloadPDF()">Download PDF</button>

  <canvas id="chart"></canvas>

  <button onclick="logout()">Logout</button>
</div>

<script src="js/db.js"></script>
<script src="js/auth.js"></script>
<script src="js/app.js"></script>

</body>
</html>
