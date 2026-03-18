// Multiple Employees
const employees = [
  { username: "admin", password: "1234" },
  { username: "emp1", password: "1111" },
  { username: "emp2", password: "2222" }
];

let attempts = 0;

function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  let validUser = employees.find(emp => emp.username === user && emp.password === pass);

  if (validUser) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", user);
    localStorage.setItem("loginTime", new Date().toLocaleString());

    window.location.href = "dashboard.html";
  } else {
    attempts++;
    document.getElementById("error").innerText = "Invalid login! Attempts: " + attempts;

    if (attempts >= 3) {
      alert("Too many attempts! Try later.");
      document.querySelector("button").disabled = true;
    }
  }
}

// Show/Hide Password
function togglePassword() {
  let passField = document.getElementById("password");
  passField.type = passField.type === "password" ? "text" : "password";
}
