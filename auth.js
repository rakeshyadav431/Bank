// Protect Page
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html";
}

// Show user info
document.addEventListener("DOMContentLoaded", () => {
  let user = localStorage.getItem("currentUser");
  let time = localStorage.getItem("loginTime");

  document.getElementById("welcome").innerText = "Welcome " + user + " 👨‍💼";
  document.getElementById("lastLogin").innerText = "Last Login: " + time;
});

// Logout
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

// Auto Logout after 2 minutes (demo)
setTimeout(() => {
  alert("Session expired! Login again.");
  logout();
}, 120000);
