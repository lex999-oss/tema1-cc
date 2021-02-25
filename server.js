"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs");
var tslog_1 = require("tslog");
var path = require("path");
var config = require("./config/config.js");
var http = require('http');
var fetch = require("node-fetch");
var logger_settings = {
    displayInstanceName: false,
    displayFilePath: "hidden",
    displayFunctionName: true
};
var logger = new tslog_1.Logger(logger_settings);
logger.attachTransport({
    silly: logToTransport1,
    debug: logToTransport1,
    trace: logToTransport1,
    info: logToTransport1,
    warn: logToTransport1,
    error: logToTransport1,
    fatal: logToTransport1
}, "debug");
fs.writeFileSync('./log/logs.txt', "LOG FILE\n");
http.createServer(function (request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var filePath, extname, mimeTypes, contentType, data, data, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    logger.info('request ' + request.url);
                    filePath = '.' + request.url;
                    if (filePath == './') {
                        filePath = './index.html';
                    }
                    if (filePath == './metrics') {
                        filePath = './metrics.html';
                    }
                    extname = String(path.extname(filePath)).toLowerCase();
                    mimeTypes = {};
                    mimeTypes = {
                        '.html': 'text/html',
                        '.js': 'text/javascript',
                        '.css': 'text/css',
                        '.json': 'application/json',
                        '.png': 'image/png',
                        '.jpg': 'image/jpg',
                        '.gif': 'image/gif',
                        '.svg': 'image/svg+xml',
                        '.wav': 'audio/wav',
                        '.mp4': 'video/mp4',
                        '.woff': 'application/font-woff',
                        '.ttf': 'application/font-ttf',
                        '.eot': 'application/vnd.ms-fontobject',
                        '.otf': 'application/font-otf',
                        '.wasm': 'application/wasm'
                    };
                    contentType = mimeTypes[extname] || 'application/octet-stream';
                    if (!(filePath == "./image")) return [3 /*break*/, 2];
                    response.writeHead(200, {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Method': 'GET',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    });
                    return [4 /*yield*/, getGoogleImage()];
                case 1:
                    data = _b.sent();
                    response.end(data, 'utf-8');
                    return [3 /*break*/, 8];
                case 2:
                    if (!(filePath == "./metrics.html")) return [3 /*break*/, 3];
                    fs.readFile(filePath, function (error, content) {
                        if (error) {
                            if (error.code == 'ENOENT') {
                                fs.readFile('./404.html', function (_error, content) {
                                    response.writeHead(404, { 'Content-Type': 'text/html' });
                                    response.end(content, 'utf-8');
                                });
                            }
                            else {
                                response.writeHead(500);
                                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                            }
                        }
                        else {
                            response.writeHead(200, { 'Content-Type': contentType });
                            response.end(content, 'utf-8');
                        }
                    });
                    return [3 /*break*/, 8];
                case 3:
                    if (!(filePath == "./favicon.ico")) return [3 /*break*/, 4];
                    fs.readFile(filePath, function (error, content) {
                        if (error) {
                            if (error.code == 'ENOENT') {
                                fs.readFile('./404.html', function (_error, content) {
                                    response.writeHead(404, { 'Content-Type': 'text/html' });
                                    response.end(content, 'utf-8');
                                });
                            }
                            else {
                                response.writeHead(500);
                                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                            }
                        }
                        else {
                            response.writeHead(200, { 'Content-Type': contentType });
                            response.end(content, 'binary');
                        }
                    });
                    return [3 /*break*/, 8];
                case 4:
                    if (!(filePath == "./metrics_api")) return [3 /*break*/, 7];
                    response.writeHead(200, {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Method': 'GET',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    });
                    return [4 /*yield*/, countTimeVApi()];
                case 5:
                    _a = [_b.sent()];
                    return [4 /*yield*/, countTimeCApi()];
                case 6:
                    data = _a.concat([_b.sent()]).toString();
                    response.end(data, 'utf-8');
                    return [3 /*break*/, 8];
                case 7:
                    fs.readFile(filePath, function (error, content) {
                        if (error) {
                            if (error.code == 'ENOENT') {
                                fs.readFile('./404.html', function (_error, content) {
                                    response.writeHead(404, { 'Content-Type': 'text/html' });
                                    response.end(content, 'utf-8');
                                });
                            }
                            else {
                                response.writeHead(500);
                                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                            }
                        }
                        else {
                            response.writeHead(200, { 'Content-Type': contentType });
                            response.end(content, 'utf-8');
                        }
                    });
                    _b.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}).listen(8125);
logger.debug('Server running at http://127.0.0.1:8125/');
function getGoogleImage() {
    return __awaiter(this, void 0, void 0, function () {
        var googleApiKey, cxKey, car, color, start_time, response, data, item, img_url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    googleApiKey = config.Google_key;
                    cxKey = config.cx_key;
                    return [4 /*yield*/, getRandCar()];
                case 1:
                    car = _a.sent();
                    return [4 /*yield*/, getRandColor()];
                case 2:
                    color = _a.sent();
                    start_time = new Date().getTime();
                    return [4 /*yield*/, fetch('https://www.googleapis.com/customsearch/v1?cx=' + cxKey + '&imgSize=SMALL&num=1' + '&q=' + car + ' ' + color + '&searchtype=image&start=1' + '&key=' + googleApiKey)];
                case 3:
                    response = _a.sent();
                    logger.info("google response { status: " + response.status + " " + response.statusText + " latency: " + (new Date().getTime() - start_time) + " ms }");
                    return [4 /*yield*/, response.json()];
                case 4:
                    data = _a.sent();
                    item = data.items[0];
                    img_url = "https://api.time.com/wp-content/uploads/2018/09/apology-sorry.jpg?quality=85&w=1200&h=628&crop=1";
                    if (item.pagemap.cse_image)
                        img_url = JSON.stringify(item.pagemap.cse_image[0].src);
                    return [2 /*return*/, img_url];
            }
        });
    });
}
function getRandCar() {
    return __awaiter(this, void 0, void 0, function () {
        var start_time, car_response, car_data, make_and_model, make_and_model_str;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    start_time = new Date().getTime();
                    return [4 /*yield*/, fetch('https://random-data-api.com/api/vehicle/random_vehicle')];
                case 1:
                    car_response = _a.sent();
                    logger.info("vehicle response { status: " + car_response.status + " " + car_response.statusText + " latency: " + (new Date().getTime() - start_time) + " ms }");
                    return [4 /*yield*/, car_response.json()];
                case 2:
                    car_data = _a.sent();
                    if (car_response.ok) {
                        make_and_model = car_data['make_and_model'];
                        make_and_model_str = JSON.stringify(make_and_model);
                        if (make_and_model_str)
                            return [2 /*return*/, make_and_model_str];
                        else
                            return [2 /*return*/, Promise.reject(new Error("No color returned\""))];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getRandColor() {
    return __awaiter(this, void 0, void 0, function () {
        var start_time, color_response, color_data, color, color_str, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    start_time = new Date().getTime();
                    return [4 /*yield*/, fetch('https://random-data-api.com/api/color/random_color')];
                case 1:
                    color_response = _a.sent();
                    logger.info("color response { status: " + color_response.status + " " + color_response.statusText + " latency: " + (new Date().getTime() - start_time) + " ms }");
                    return [4 /*yield*/, color_response.json()];
                case 2:
                    color_data = _a.sent();
                    if (color_response.ok) {
                        color = color_data['color_name'];
                        color_str = JSON.stringify(color);
                        if (color_str)
                            return [2 /*return*/, color_str];
                        else
                            return [2 /*return*/, Promise.reject(new Error("No color returned\""))];
                    }
                    else {
                        error = new Error('unknown');
                        return [2 /*return*/, Promise.reject(error)];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function logToTransport1(logObject) {
    fs.appendFileSync("./log/logs.txt", JSON.stringify(logObject) + "\n");
}
//metrics
function countTimeVApi() {
    return __awaiter(this, void 0, void 0, function () {
        var ret_val, avg_time, i, start_time, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ret_val = 0;
                    avg_time = 0;
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 10)) return [3 /*break*/, 4];
                    start_time = new Date().getTime();
                    return [4 /*yield*/, Promise.all([fetch("https://random-data-api.com/api/vehicle/random_vehicle"),
                            fetch("https://random-data-api.com/api/vehicle/random_vehicle"),
                            fetch("https://random-data-api.com/api/vehicle/random_vehicle"),
                            fetch("https://random-data-api.com/api/vehicle/random_vehicle"),
                            fetch("https://random-data-api.com/api/vehicle/random_vehicle"),
                            fetch("https://random-data-api.com/api/vehicle/random_vehicle")])];
                case 2:
                    response = _a.sent();
                    ret_val = new Date().getTime() - start_time;
                    response.forEach(function (element) {
                        logger.info("{ Vechicle api response: status:" + element.status + " " + element.statusText + " latency: " + ret_val + " ms }");
                    });
                    avg_time += ret_val;
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, avg_time / 10];
            }
        });
    });
}
function countTimeCApi() {
    return __awaiter(this, void 0, void 0, function () {
        var ret_val, avg_time, i, start_time, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ret_val = 0;
                    avg_time = 0;
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 10)) return [3 /*break*/, 4];
                    start_time = new Date().getTime();
                    return [4 /*yield*/, Promise.all([fetch("https://random-data-api.com/api/color/random_color"),
                            fetch("https://random-data-api.com/api/color/random_color"),
                            fetch("https://random-data-api.com/api/color/random_color"),
                            fetch("https://random-data-api.com/api/color/random_color"),
                            fetch("https://random-data-api.com/api/color/random_color"),
                            fetch("https://random-data-api.com/api/color/random_color")])];
                case 2:
                    response = _a.sent();
                    ret_val = new Date().getTime() - start_time;
                    response.forEach(function (element) {
                        logger.info("{ Color api response: status:" + element.status + " " + element.statusText + " latency: " + ret_val + " ms }");
                    });
                    avg_time += ret_val;
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, avg_time / 10];
            }
        });
    });
}
