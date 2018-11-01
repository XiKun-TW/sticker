import localStorage from './local-storage.js';
import stickerManager from './sticker-manager.js';

let rootElement;
let currentStroage;
let currentstickerManager;

const reloadDataFromDataStorage = (newData)=> {
    currentStroage.setCurrentStroage(newData);

    if (currentstickerManager && rootElement) {
        currentstickerManager.loadAllSticker(rootElement, newData);
    }
};

const onStickerRemoved = (newData) => {
    reloadDataFromDataStorage(newData);
};

const onStickerChanged = (newData) => {
    reloadDataFromDataStorage(newData);
};

const onStickerAdded = () => {
    let currentData = currentStroage.getCurrentStroage();
    currentData = currentstickerManager.addSticker(rootElement, currentData);
    currentStroage.setCurrentStroage(currentData);
    currentstickerManager.loadAllSticker(rootElement, currentData);
    window.location.hash = 'click';
};

window.onload = () => {
    rootElement = document.getElementById('container');
    currentStroage = new localStorage();
    currentstickerManager = new stickerManager({
        onStickerChanged, 
        onStickerAdded,
        onStickerRemoved,
        stickerSelector: 'js-sticker', 
        stickerCreatorSelector: 'js-add-sticker',
        stickerEditTextSelector: 'js-edit-text',
        stickerRemoveSelector: 'js-remove-sticker'
    });

    setTimeout(() => {
        window.location.hash = 'home';
    }, 60000);

    let currentStroageData = currentStroage.getCurrentStroage();
    currentstickerManager.loadAllSticker(rootElement, currentStroageData);
};