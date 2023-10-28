export default class URLHandler {
    constructor(listenerPattern, sourcePattern, redirectBaseUrl, sourceToRedirectMap) {
        this.listenerPattern = listenerPattern;
        this.sourcePattern = sourcePattern;  // Pattern to extract ID
        this.redirectBaseUrl = redirectBaseUrl;
        this.sourceToRedirectMap = sourceToRedirectMap;
    }

    extractIdFromUrl(url) {
        const matches = url.match(this.sourcePattern);
        return matches ? matches[1] : null;
    }

    getRedirectURL(url) {
        const id = this.extractIdFromUrl(url);
        const mappedId = this.sourceToRedirectMap.getValue(id);
        return mappedId ? `${this.redirectBaseUrl}${mappedId}` : null;
    }

    getRedirectID(url) {
        const id = this.extractIdFromUrl(url);
        const mappedId = this.sourceToRedirectMap.getValue(id);
        return mappedId ? `${mappedId}` : null;
    }

    getListenerPattern() {
        return this.listenerPattern;
    }
}