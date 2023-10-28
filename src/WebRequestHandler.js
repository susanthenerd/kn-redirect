import BypassTabsInstance from './BypassTabsControler.js';

export default class WebRequestHandler {
    constructor(urlHandler, redirectStat, backStat, messageHandler) {
        this.urlHandler = urlHandler;
        this.redirectStat = redirectStat;
        this.backStat = backStat;
        this.messageHandler = messageHandler;
        this.awaitingTabs = new Set(); // Use a Set to track multiple awaiting tabs
        this.registerWebRequestListener();
        this.registerOnCompletedListener();
    }

    handleRedirect(details) {
        if (BypassTabsInstance.shouldBypass(details.tabId)) {
            BypassTabsInstance.clearBypass(details.tabId);
            return;
        }
        const url = details.url;
        const redirectTo = this.urlHandler.getRedirectURL(url);

        if (redirectTo) {
            this.redirectStat.incrementStat();
            this.awaitingTabs.add(details.tabId); // Add the tabId to the set of awaiting tabs

            return {
                redirectUrl: redirectTo
            };
        }
    }

    registerWebRequestListener() {
        const pattern = this.urlHandler.getListenerPattern();
        browser.webRequest.onBeforeRequest.addListener(
            this.handleRedirect.bind(this),
            {urls: [pattern]},
            ["blocking"]
        );
    }

    handleOnCompleted(details) {
        if (this.awaitingTabs.has(details.tabId)) {
            console.log("Hey")
            this.messageHandler.sendNotificationToTab(details.tabId, `Successfully redirected! Te-am salvat de Silviu de k ori. K = ${this.redirectStat.getStat()}`);
            this.awaitingTabs.delete(details.tabId); // Remove the tabId from the awaiting set
        }
    }

    registerOnCompletedListener() {
        browser.webRequest.onCompleted.addListener(
            this.handleOnCompleted.bind(this),
            {urls: ["<all_urls>"]}
        );
    }
}
