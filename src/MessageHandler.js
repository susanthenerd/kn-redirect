export default class MessageHandler {
    constructor(urlHandler) {
        this.urlHandler = urlHandler;
        this.bypassTabs = {};

        browser.runtime.onMessage.addListener(this.handleMessage.bind(this));
    }

    handleCheckURL(message, sendResponse) {
        const matchingURL = this.urlHandler.getRedirectURL(message.checkURL);
        const problemID = this.urlHandler.getRedirectID(message.checkURL)
        sendResponse({matchingURL, problemID});
    }

    handleBypassRedirect(sender, sendResponse) {
        console.log("Added");
        this.bypassTabs[sender.tab.id] = true;
        const added = true;
        sendResponse({added})
    }

    handleMessage(message, sender, sendResponse) {
        if (message.checkURL) {
            this.handleCheckURL(message, sendResponse);
        } else if (message.bypassRedirect) {
            this.handleBypassRedirect(sender, sendResponse);
        }

        return true;
    }

    shouldBypassTab(tabId) {
        return !!this.bypassTabs[tabId];
    }

    clearBypassForTab(tabId) {
        console.log("Deleted");
        delete this.bypassTabs[tabId];
    }
}
