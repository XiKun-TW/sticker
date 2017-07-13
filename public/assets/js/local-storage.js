export default class LocalStorage {
    constructor () {
        if(typeof(Storage) !== 'undefined') {
            this.storage = localStorage;
        } else {
            let getItem = ()=> ({});
            let setItem = f=>f;
            this.storage = { getItem, setItem };
        }
    }

    getCurrentStroage() {
        let data =  this.storage.getItem("sticker-data") 
        
        return data === null ? {} : JSON.parse(data);
    }

    setCurrentStroage(data) {
        if(data) {
            data = JSON.stringify(data);
        }
        return this.storage.setItem("sticker-data", data);
    }
}