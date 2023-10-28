const BASE_URL = "https://raw.githubusercontent.com/susanthenerd/kn-redirect/master/maps/";

export default class MapManager {
    constructor(mapName, updateInterval = 3600000) { // default interval: 1 hour in milliseconds
        this.mapName = mapName;
        this.data = {};
        this.updateInterval = updateInterval;
        this.init();
    }

    getFetchURL() {
        return localStorage.getItem('localLoad') === 'true' ? browser.runtime.getURL(`maps/${this.mapName}`) : `${BASE_URL}${this.mapName}`;
    }

    cacheData() {
        localStorage.setItem(this.mapName, JSON.stringify(this.data));
    }

    loadDataFromCache() {
        const cachedData = localStorage.getItem(this.mapName);
        if (cachedData) {
            this.data = JSON.parse(cachedData);
        }
    }

    fetchDataAndUpdate() {
        fetch(this.getFetchURL())
            .then(response => response.json())
            .then(data => {
                const content = data.files ? data.files[this.mapName].content : data;

                if (JSON.stringify(this.data) !== JSON.stringify(content)) {
                    this.data = content;
                    this.cacheData();
                }
            });
    }

    getValue(key) {
        return this.data[key];
    }

    update() {
        this.loadDataFromCache();
        this.fetchDataAndUpdate();
    }

    startRegularUpdates() {
        setInterval(() => {
            this.update();
        }, this.updateInterval);
    }

    init() {
        this.update();
        this.startRegularUpdates();
    }
}

// Example usage:
// const pbinfoToKilonovaMapManager = new MapManager('pbinfo_to_kilonova.json');
