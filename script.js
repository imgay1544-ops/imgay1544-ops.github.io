const form = document.getElementById('chat-form');
const input = document.getElementById('chat-input');
const chatWindow = document.getElementById('chat-window');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const userMessage = input.value.trim();
    if(!userMessage) return;

    addMessage(userMessage, 'user');
    input.value = '';

    // Simulate AI response
    setTimeout(() => {
        const aiMessage = `AI says: ${userMessage.split('').reverse().join('')}`;
        addMessage(aiMessage, 'ai');
    }, 500);
});

function addMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);
    messageDiv.textContent = message;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
