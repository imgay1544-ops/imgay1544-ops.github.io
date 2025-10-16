const form = document.getElementById("register-form");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if(data.success){
            message.textContent = `Registered! Your key: ${data.key}`;
        } else {
            message.textContent = data.error;
        }
    } catch (err) {
        message.textContent = "Error connecting to server";
    }
});
