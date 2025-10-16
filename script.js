// script.js login
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("https://your-backend-url/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (data.success) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "panel.html";
  } else {
    errorMsg.textContent = data.error;
  }
});
