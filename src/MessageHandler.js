import BypassTabsInstance from './BypassTabsControler.js';

export default class MessageHandler {
    constructor(urlHandler) {
        this.urlHandler = urlHandler;

        browser.runtime.onMessage.addListener(this.handleMessage.bind(this));
    }

    handleCheckURL(message, sendResponse) {
        const matchingURL = this.urlHandler.getRedirectURL(message.checkURL);
        const problemID = this.urlHandler.getRedirectID(message.checkURL);
        sendResponse({
            action: 'provideMatchingURL', value: {matchingURL, problemID}
        });
    }

    handleBypassRedirect(sender, sendResponse) {
        BypassTabsInstance.setBypass(sender.tab.id);
        sendResponse({
            action: 'confirmBypassAdded', value: true
        });
    }

    handleMessage(message, sender, sendResponse) {
        if (message.checkURL) {
            this.handleCheckURL(message, sendResponse);
        } else if (message.bypassRedirect) {
            this.handleBypassRedirect(sender, sendResponse);
        }

        return true;
    }

    sendNotificationToTab(tabId, messageText) {
        browser.tabs.sendMessage(tabId, {
            action: "showNotification", result: messageText
        }).then(response => {
            console.log("Notified tab");
        });
    }
}
