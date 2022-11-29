"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeltaTime = exports.counter = void 0;
var setCellBusy = function (board, x, y, busy) { board.children[y].children[x].setAttribute("data-busy", busy); };
var getCell = function (board, x, y) { return board.children[y].children[x]; };
var countdownScene = function (board, ct) {
    board.children[0];
    // setAttribute("data-busy", true);
};
var accDeltaTime = 0;
var acc = 0;
var counter = function (dt, max, slow) {
    if (max === void 0) { max = 10; }
    if (slow === void 0) { slow = .6; }
    accDeltaTime += dt;
    if (Math.trunc(accDeltaTime) > 1 * slow) {
        accDeltaTime = 0;
        ++acc;
    }
    if (acc > max)
        acc = 0;
    return acc;
};
exports.counter = counter;
var tick = 0;
var lastFrame = 0;
var getDeltaTime = function (timestamp) {
    var dt = (timestamp - lastFrame) / 1000;
    lastFrame = timestamp;
    return dt;
};
exports.getDeltaTime = getDeltaTime;
