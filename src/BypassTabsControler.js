class BypassTabsController {
    constructor() {
        if (BypassTabsController.instance) {
            return BypassTabsController.instance;
        }

        this.bypassTabs = {};
        BypassTabsController.instance = this;
    }

    setBypass(tabId) {
        this.bypassTabs[tabId] = true;
    }

    shouldBypass(tabId) {
        return !!this.bypassTabs[tabId];
    }

    clearBypass(tabId) {
        delete this.bypassTabs[tabId];
    }
}

const BypassTabsInstance = new BypassTabsController();
export default BypassTabsInstance;
