import MapManager from './MapManager.js';
import URLHandler from './URLHandler.js';
import WebRequestHandler from './WebRequestHandler.js';
import StatsManager from "./StatsManager.js";
import MessageHandler from "./MessageHandler.js";

const redirectStat = new StatsManager("redirectStat");
const backStat = new StatsManager("backStat");

const pbinfoToKilonovaMapManager = new MapManager('pbinfo_to_kilonova.json');
const kilonovaToPbinfoMapManager = new MapManager('kilonova_to_pbinfo.json');

const pbinfoToKilonovaURLHandler = new URLHandler(
    "*://www.pbinfo.ro/probleme/*",
    /\/probleme\/(\d+)(\/|$)/,
    'https://kilonova.ro/problems/',
    pbinfoToKilonovaMapManager
);

const kilonovaToPbinfoURLHandler = new URLHandler(
    "*://kilonova.ro/problems/*",
    /\/problems\/(\d+)(\/|$)/,
    'https://www.pbinfo.ro/probleme/',
    kilonovaToPbinfoMapManager
);

const messageHandlerKilonova = new MessageHandler(kilonovaToPbinfoURLHandler);

// Initialize and register web request handlers
const pbinfoHandler = new WebRequestHandler(pbinfoToKilonovaURLHandler, redirectStat, backStat, messageHandlerKilonova);

// Expose URL handlers for access from popup.js
window.pbinfoToKilonovaURLHandler = pbinfoToKilonovaURLHandler;
window.kilonovaToPbinfoURLHandler = kilonovaToPbinfoURLHandler;