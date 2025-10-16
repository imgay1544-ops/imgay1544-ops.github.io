const form = document.getElementById('chat-form');
const input = document.getElementById('chat-input');
const chatWindow = document.getElementById('chat-window');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userMessage = input.value.trim();
    if(!userMessage) return;

    addMessage(userMessage, 'user');
    input.value = '';

    // Show typing animation
    const typingMessage = addMessage("AI is typing...", 'ai');

    try {
        const res = await fetch('/.netlify/functions/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage })
        });
        const data = await res.json();
        typingMessage.textContent = data.message; // Replace typing text with actual AI response
    } catch (err) {
        typingMessage.textContent = "Error: Unable to get response";
    }
});

function addMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);
    messageDiv.textContent = message;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    return messageDiv;
}
