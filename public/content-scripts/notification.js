let notificationContainer;
let progressBar;
let goBackBtn;
let closeNotificationBtn;

function injectHTML() {
    return fetch(browser.runtime.getURL("content-scripts/notification.html"))
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
        });
}

function initializeElements() {
    notificationContainer = document.getElementById('customNotification');
    progressBar = document.getElementById('progressBar');
    goBackBtn = document.getElementById('goBackBtn');
    closeNotificationBtn = document.getElementById('closeNotificationBtn');
}

function attachEventListeners() {
    goBackBtn.addEventListener('click', () => {
        sessionStorage.setItem('bypassRedirect', 'true');
        window.history.go(); // go back two pages to bypass the automated redirect
    });

    closeNotificationBtn.addEventListener('click', () => {
        hideNotification();
    });
}

function showNotification(message) {
    injectHTML().then(() => {
        initializeElements();
        attachEventListeners();
    });

    document.getElementById('notificationText').innerText = message;

    notificationContainer.classList.remove('hidden');

    // Progress bar animation
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            hideNotification();
        } else {
            width++;
            progressBar.style.width = width + '%';
        }
    }, 100)
}

function hideNotification() {
    if (notificationContainer) {
        notificationContainer.classList.add('hidden');
    }
}
