const localLoadCheckbox = document.getElementById('localLoad');
localLoadCheckbox.checked = localStorage.getItem('localLoad') === 'true';
localLoadCheckbox.addEventListener('change', () => {
    localStorage.setItem('localLoad', localLoadCheckbox.checked);
});