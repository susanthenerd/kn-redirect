export default class WebRequestHandler {
    constructor(urlHandler, redirectStat, backStat, messageHandler) {
        this.urlHandler = urlHandler;
        this.redirectStat = redirectStat;
        this.backStat = backStat;
        this.messageHandler = messageHandler;
        this.registerWebRequestListener();
    }

    handleRedirect(details) {
        if (this.messageHandler.shouldBypassTab(details.tabId)) {
            this.messageHandler.clearBypassForTab(details.tabId);
            return;
        }
        const url = details.url;
        const redirectTo = this.urlHandler.getRedirectURL(url);

        if (redirectTo) {
            this.redirectStat.incrementStat();

            return {
                redirectUrl: redirectTo
            };
        }
    }


    registerWebRequestListener() {
        const pattern = this.urlHandler.getListenerPattern();
        browser.webRequest.onBeforeRequest.addListener(
            this.handleRedirect.bind(this), // Bind to retain the context
            {urls: [pattern]},
            ["blocking"]
        );
    }
}
