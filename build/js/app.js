/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);
__webpack_require__(3);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _localStorage = __webpack_require__(2);

var _localStorage2 = _interopRequireDefault(_localStorage);

var _stickerManager = __webpack_require__(8);

var _stickerManager2 = _interopRequireDefault(_stickerManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootElement = void 0;
var currentStroage = void 0;
var currentstickerManager = void 0;

var reloadDataFromDataStorage = function reloadDataFromDataStorage(newData) {
    currentStroage.setCurrentStroage(newData);

    if (currentstickerManager && rootElement) {
        currentstickerManager.loadAllSticker(rootElement, newData);
    }
};

var onStickerRemoved = function onStickerRemoved(newData) {
    reloadDataFromDataStorage(newData);
};

var onStickerChanged = function onStickerChanged(newData) {
    reloadDataFromDataStorage(newData);
};

var onStickerAdded = function onStickerAdded() {
    var currentData = currentStroage.getCurrentStroage();
    currentData = currentstickerManager.addSticker(rootElement, currentData);
    currentStroage.setCurrentStroage(currentData);
    currentstickerManager.loadAllSticker(rootElement, currentData);
};

window.onload = function () {
    rootElement = document.getElementById('container');
    currentStroage = new _localStorage2.default();
    currentstickerManager = new _stickerManager2.default({
        onStickerChanged: onStickerChanged,
        onStickerAdded: onStickerAdded,
        onStickerRemoved: onStickerRemoved,
        stickerSelector: 'js-sticker',
        stickerCreatorSelector: 'js-add-sticker',
        editTextSelector: 'js-edit-text',
        stickerRemoveSelector: 'js-remove-sticker'
    });

    var currentStroageData = currentStroage.getCurrentStroage();
    currentstickerManager.loadAllSticker(rootElement, currentStroageData);
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LocalStorage = function () {
    function LocalStorage() {
        _classCallCheck(this, LocalStorage);

        if (typeof Storage !== 'undefined') {
            this.storage = localStorage;
        } else {
            var getItem = function getItem() {
                return {};
            };
            var setItem = function setItem(f) {
                return f;
            };
            this.storage = { getItem: getItem, setItem: setItem };
        }
    }

    _createClass(LocalStorage, [{
        key: "getCurrentStroage",
        value: function getCurrentStroage() {
            var data = this.storage.getItem("sticker-data");

            return data === null ? {} : JSON.parse(data);
        }
    }, {
        key: "setCurrentStroage",
        value: function setCurrentStroage(data) {
            if (data) {
                data = JSON.stringify(data);
            }
            return this.storage.setItem("sticker-data", data);
        }
    }]);

    return LocalStorage;
}();

exports.default = LocalStorage;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StickerManager = function () {
    function StickerManager(_ref) {
        var onStickerChanged = _ref.onStickerChanged,
            onStickerAdded = _ref.onStickerAdded,
            onStickerRemoved = _ref.onStickerRemoved,
            stickerSelector = _ref.stickerSelector,
            stickerCreatorSelector = _ref.stickerCreatorSelector,
            stickerEditTextSelector = _ref.stickerEditTextSelector,
            stickerRemoveSelector = _ref.stickerRemoveSelector;

        _classCallCheck(this, StickerManager);

        this.stickerTemplate = '<div class="sticker ' + stickerSelector + '" id="#{id}">\n                <content class="sticker-text ' + stickerEditTextSelector + '" contenteditable>\n                    #{content}\n                </content>\n                <div class="toolbar">\n                    <i class="js-edit-ticket toolbar-icon icon icon-edit"></i>\n                    <i class="' + stickerRemoveSelector + ' toolbar-icon icon icon-remove"></i>\n                </div>\n            </div>';
        this.stickerCreateTemplate = '<div class="sticker-create ' + stickerCreatorSelector + '"></div>';

        this.stickerSelector = stickerSelector;
        this.stickerCreatorSelector = stickerCreatorSelector;
        this.stickerEditTextSelector = stickerEditTextSelector;
        this.stickerRemoveSelector = stickerRemoveSelector;

        this.onStickerAdded = onStickerAdded;
        this.onStickerChanged = onStickerChanged;
        this.onStickerRemoved = onStickerRemoved;
    }

    _createClass(StickerManager, [{
        key: 'addSticker',
        value: function addSticker(element, currentStorageData) {
            if (!currentStorageData.stickers) {
                currentStorageData.stickers = [];
            }
            currentStorageData.stickers.push({
                id: new Date().getTime(),
                content: '点击输入内容'
            });
            return currentStorageData;
        }
    }, {
        key: 'loadAllSticker',
        value: function loadAllSticker(element, currentStorageData) {
            var _this = this;

            if (element) {
                var html = '';
                if (currentStorageData.stickers) {
                    currentStorageData.stickers.forEach(function (item) {
                        html += _this.stickerTemplate.replace('#{id}', item.id).replace('#{content}', item.content);
                    });
                    html += this.stickerCreateTemplate;
                } else {
                    html = this.stickerCreateTemplate;
                }
                element.innerHTML = html;
                this.bindEvents(element);
            }
        }
    }, {
        key: 'getAllStickerData',
        value: function getAllStickerData(element) {
            var _this2 = this;

            var result = {};
            if (element) {
                result.stickers = [];
                element.forEach(function (item) {
                    var editTextElement = item.querySelector('.' + _this2.stickerEditTextSelector);
                    result.stickers.push({
                        id: item.id,
                        content: editTextElement.innerText
                    });
                });
            }
            return result;
        }
    }, {
        key: 'bindEvents',
        value: function bindEvents(element) {
            var _this3 = this;

            var stickersElements = element.querySelectorAll('.' + this.stickerSelector);
            var stickerCreatorElement = element.querySelector('.' + this.stickerCreatorSelector);

            //bind stickers change events
            if (stickersElements.length) {
                stickersElements.forEach(function (item) {
                    var editTextElement = item.querySelector('.' + _this3.stickerEditTextSelector);
                    if (editTextElement) {
                        if (typeof _this3.onStickerChanged === 'function') {
                            editTextElement.onblur = function () {
                                var allData = _this3.getAllStickerData(stickersElements);
                                _this3.onStickerChanged(allData);
                            };
                        }
                    }
                    var stickerRemoveElement = item.querySelector('.' + _this3.stickerRemoveSelector);
                    if (stickerRemoveElement) {
                        if (typeof _this3.onStickerRemoved === 'function') {
                            stickerRemoveElement.onclick = function () {
                                var currentData = _this3.getAllStickerData(stickersElements);
                                var newData = Object.assign({}, currentData);
                                newData.stickers = [];

                                currentData.stickers.forEach(function (singleItem) {
                                    if (singleItem.id !== item.id) {
                                        newData.stickers.push(singleItem);
                                    }
                                });

                                _this3.onStickerRemoved(newData);
                            };
                        }
                    }
                });
            }
            if (stickerCreatorElement) {
                stickerCreatorElement.onclick = this.onStickerAdded;
            }
        }
    }]);

    return StickerManager;
}();

exports.default = StickerManager;

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map