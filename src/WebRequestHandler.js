import BypassTabsInstance from './BypassTabsControler.js';

export default class WebRequestHandler {
    constructor(urlHandler, redirectStat, backStat) {
        this.urlHandler = urlHandler;
        this.redirectStat = redirectStat;
        this.backStat = backStat;
        this.registerWebRequestListener();
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
}
