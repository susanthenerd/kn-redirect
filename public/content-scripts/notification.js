let isInitialized = false;
let notificationContainer;
let progressBar;
let goBackBtn;
let closeNotificationBtn;

browser.runtime.onMessage.addListener((message) => {
    console.log(message);
    if (message.action === "showNotification") {
        showNotification(message.result);
    }
});

document.addEventListener("DOMContentLoaded", initialize);

async function initialize() {
    console.log("Initializing...");
    if (isInitialized) return;

    await injectHTML();
    await injectCSS();

    notificationContainer = document.getElementById('customNotification');
    progressBar = document.getElementById('progressBar');
    goBackBtn = document.getElementById('goBackBtn');
    closeNotificationBtn = document.getElementById('closeNotificationBtn');

    attachEventListeners();

    isInitialized = true;
}

async function injectHTML() {
    const response = await fetch(browser.runtime.getURL("content-scripts/notification.html"));
    const data = await response.text();
    document.body.insertAdjacentHTML('beforeend', data);
}

async function injectCSS() {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = browser.runtime.getURL("content-scripts/notification.css");
    document.head.appendChild(style);
}

function attachEventListeners() {
    goBackBtn.addEventListener('click', () => {
        sessionStorage.setItem('bypassRedirect', 'true');
        window.history.go();
    });

    closeNotificationBtn.addEventListener('click', () => {
        hideNotification();
    });
}

function showNotification(message) {
    if (!isInitialized) {
        initialize().then(() => {
            _displayNotification(message);
        });
    } else {
        _displayNotification(message);
    }
}

function _displayNotification(message) {
    console.log("Displaying notification...");
    document.getElementById('notificationText').innerText = message;
    notificationContainer.classList.remove('hidden');
    animateProgressBar();
}

function animateProgressBar() {
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            hideNotification();
        } else {
            width++;
            progressBar.style.width = width + '%';
        }
    }, 100);
}

function hideNotification() {
    notificationContainer.classList.add('hidden');
}
