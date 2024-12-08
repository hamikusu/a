const emoji = document.getElementById('emoji');
const emojisContainer = document.getElementById('emojis');
const emojis = ['😳', '🔥', '🥵'];

emoji.addEventListener('click', () => {
    emoji.style.transform = 'scale(1.1)';
    setTimeout(() => {
        emoji.style.transform = 'scale(1)';
    }, 200);

    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const newEmoji = document.createElement('div');
    newEmoji.textContent = randomEmoji;
    emojisContainer.appendChild(newEmoji);
});
