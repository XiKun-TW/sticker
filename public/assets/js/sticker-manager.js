export default class StickerManager {

    constructor(
        { 
            onStickerChanged, 
            onStickerAdded, 
            onStickerRemoved,
            stickerSelector, 
            stickerCreatorSelector, 
            stickerEditTextSelector,
            stickerRemoveSelector
        }) {
        this.stickerTemplate = `<div class="sticker ${stickerSelector}" id="#{id}">
                <content class="sticker-text ${stickerEditTextSelector}" contenteditable>
                    #{content}
                </content>
                <div class="toolbar">
                    <i class="js-edit-ticket toolbar-icon icon icon-edit"></i>
                    <i class="${stickerRemoveSelector} toolbar-icon icon icon-remove"></i>
                </div>
            </div>`;
        this.stickerCreateTemplate = `<div class="sticker-create ${stickerCreatorSelector}"></div>`;   

        this.stickerSelector = stickerSelector;
        this.stickerCreatorSelector = stickerCreatorSelector;
        this.stickerEditTextSelector = stickerEditTextSelector;
        this.stickerRemoveSelector = stickerRemoveSelector;

        this.onStickerAdded = onStickerAdded;
        this.onStickerChanged = onStickerChanged;
        this.onStickerRemoved = onStickerRemoved;
    }

    addSticker(element, currentStorageData) {
        if (!currentStorageData.stickers) { 
            currentStorageData.stickers = [];
        }
        currentStorageData.stickers.push({
            id: new Date().getTime(),
            content: '点击输入内容'
        });
        return currentStorageData;
    }

    loadAllSticker(element, currentStorageData) {
        if (element) {
            let html = '';
            if (currentStorageData.stickers) {
                currentStorageData.stickers.forEach((item) => {
                    html += this.stickerTemplate
                        .replace('#{id}', item.id)
                        .replace('#{content}', item.content);
                });
                html += this.stickerCreateTemplate;
            } else {
                html = this.stickerCreateTemplate;
            }
            element.innerHTML = html;
            this.bindEvents(element);
        }
    }

    getAllStickerData(element) {
        let result = {};
        if (element) {
            result.stickers = [];
            element.forEach((item) => {
                let editTextElement = item.querySelector(`.${this.stickerEditTextSelector}`);
                result.stickers.push({
                    id: item.id,
                    content: editTextElement.innerText
                });
            });
        }
        return result;
    }

    bindEvents (element) {
        let stickersElements = element.querySelectorAll(`.${this.stickerSelector}`);
        let stickerCreatorElement = element.querySelector(`.${this.stickerCreatorSelector}`);

        //bind stickers change events
        if (stickersElements.length) {
            stickersElements.forEach((item) => {
                let editTextElement = item.querySelector(`.${this.stickerEditTextSelector}`);
                if(editTextElement) {
                    if(typeof this.onStickerChanged === 'function') {
                        editTextElement.onblur = () => {
                            let allData = this.getAllStickerData(stickersElements);
                            this.onStickerChanged(allData);
                        }
                    }
                }
                let stickerRemoveElement = item.querySelector(`.${this.stickerRemoveSelector}`);
                if (stickerRemoveElement) {
                    if(typeof this.onStickerRemoved === 'function') {
                        stickerRemoveElement.onclick = () => {
                            let currentData = this.getAllStickerData(stickersElements);
                            let newData = Object.assign({}, currentData);
                            newData.stickers = [];

                            currentData.stickers.forEach((singleItem) => {
                                if(singleItem.id !== item.id) {
                                    newData.stickers.push(singleItem);
                                }
                            });
        
                            this.onStickerRemoved(newData);
                        }
                    }
                }
            });
        }
        if (stickerCreatorElement) {
            stickerCreatorElement.onclick = this.onStickerAdded;
        }
    }
}