"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var f = __importStar(require("./functions"));
var board;
var MAX_X = 10;
var MAX_Y = 17;
function update(dt) {
    var ct = f.counter(dt, 10, .6);
}
var render = function () {
    for (var y = 0; y < MAX_Y; ++y) {
        var row = board.children[y];
        for (var x = 0; x < MAX_X; ++x) {
            var cell = board.children[y].children[x];
            if (cell.getAttribute("data-busy") === "true")
                cell.classList.add("busy");
        }
    }
};
var loopGame = function (timestamp) {
    var dt = f.getDeltaTime(timestamp);
    update(dt);
    render();
    window.requestAnimationFrame(loopGame);
};
var loadGame = function () {
    board = document.getElementById('board') || new HTMLElement();
    for (var y = 0; y < MAX_Y; ++y) {
        var row = document.createElement('div');
        row.className = "row";
        for (var x = 0; x < MAX_X; ++x) {
            var index = parseInt(y.toString() + x.toString());
            var cell = document.createElement('div');
            cell.className = "cell";
            cell.setAttribute("data-busy", "false");
            cell.setAttribute("data-id", index.toString());
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
    loopGame(0);
};
//
window.addEventListener('load', loadGame);
