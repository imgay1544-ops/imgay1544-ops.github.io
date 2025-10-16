// Simple login (replace with backend later)
const loginForm = document.getElementById('login-form');
const errorMsg = document.getElementById('error-msg');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple frontend check (for testing)
        if(username === "admin" && password === "password") {
            localStorage.setItem("loggedIn", "true");
            window.location.href = "panel.html";
        } else {
            errorMsg.textContent = "Invalid credentials!";
        }
    });
}

// Protect panel
if (window.location.pathname.includes("panel.html")) {
    if(localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "index.html";
    }

    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("loggedIn");
        window.location.href = "index.html";
    });
}
