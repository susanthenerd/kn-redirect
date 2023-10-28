export default class StatsManager {
    constructor(storageKey) {
        this.storageKey = storageKey;
        this.initializeStat();
    }

    initializeStat() {
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, '0');
        }
    }

    incrementStat() {
        let stat = parseInt(localStorage.getItem(this.storageKey)) || 0;
        stat++;
        localStorage.setItem(this.storageKey, stat);
        return stat;
    }

    getStat() {
        return parseInt(localStorage.getItem(this.storageKey)) || 0;
    }
}
