// Function to insert the pbinfo link
function insertPbinfoLink(pbinfoURL, pbinfoID) {
    // Find the element using the provided CSS selector
    let idElement = document.querySelector('body > div.c-container.mb-2 > div.page-holder > div.page-sidebar > div > div > p:nth-child(1)');

    // Check if we found the element
    if (idElement) {
        let linkElement = document.createElement('a');
        linkElement.textContent = `ID PBINFO: ${pbinfoID}`;
        linkElement.href = pbinfoURL;

        linkElement.addEventListener('click', function (event) {
            event.preventDefault();

            browser.runtime.sendMessage({bypassRedirect: true}).then(response => {
                if (response.action === 'confirmBypassAdded' && response.value) {
                    window.location.href = pbinfoURL;
                }
            });
        });

        idElement.parentNode.insertBefore(linkElement, idElement.nextSibling);
    }
}

browser.runtime.sendMessage({checkURL: window.location.href}).then(response => {
    if (response.action === 'provideMatchingURL') {
        const {matchingURL, problemID} = response.value;
        insertPbinfoLink(matchingURL, problemID);
    }
});
