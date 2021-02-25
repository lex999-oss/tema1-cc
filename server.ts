import * as fs from "fs";
import { ILogObject, ISettingsParam, Logger } from 'tslog';
import { Http2ServerRequest, Http2ServerResponse } from "http2";
import * as path from "path";
const config = require("./config/config.js")
const http = require('http');
const fetch = require("node-fetch");

const logger_settings: ISettingsParam = {
    displayInstanceName: false,
    displayFilePath: "hidden",
    displayFunctionName: true,

}

const logger: Logger = new Logger(logger_settings);
logger.attachTransport(
    {
        silly: logToTransport1,
        debug: logToTransport1,
        trace: logToTransport1,
        info: logToTransport1,
        warn: logToTransport1,
        error: logToTransport1,
        fatal: logToTransport1,
    },
    "debug"
);
fs.writeFileSync('./log/logs.txt', "LOG FILE\n");

http.createServer(async function (request: Http2ServerRequest, response: Http2ServerResponse) {
    logger.info('request ' + request.url);

    var filePath = '.' + request.url;
    if (filePath == './') {
        filePath = './index.html';
    }

    if (filePath == './metrics') {
        filePath = './metrics.html';
    }

    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes: { [id: string]: string; } = {};
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

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    if (filePath == "./image") {
        response.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Method': 'GET',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        });
        var data: string = await getGoogleImage();
        response.end(data, 'utf-8');
    } else if (filePath == "./metrics.html") {
        fs.readFile(filePath, function (error: any, content: string | Uint8Array) {
            if (error) {
                if (error.code == 'ENOENT') {
                    fs.readFile('./404.html', function (_error: any, content: string | Uint8Array) {
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

    }
     else if (filePath == "./metrics_api") {
        response.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Method': 'GET',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        });
        var data = [await countTimeVApi(), await countTimeCApi()].toString();
        response.end(data, 'utf-8');

    }
    else {
        fs.readFile(filePath, function (error: any, content: string | Uint8Array) {
            if (error) {
                if (error.code == 'ENOENT') {
                    fs.readFile('./404.html', function (_error: any, content: string | Uint8Array) {
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
    }

}).listen(8125);
logger.debug('Server running at http://127.0.0.1:8125/');

async function getGoogleImage() {
    const googleApiKey = config.Google_key;
    const cxKey = config.cx_key;
    var car = await getRandCar();
    var color = await getRandColor();
    var start_time = new Date().getTime();
    var response = await fetch('https://www.googleapis.com/customsearch/v1?cx=' + cxKey + '&imgSize=SMALL&num=1' + '&q=' + car + ' ' + color + '&searchtype=image&start=1' + '&key=' + googleApiKey);
    logger.info("google response { status: " + response.status + " " + response.statusText + " latency: " + (new Date().getTime() - start_time) + " ms }");
    var data = await response.json();
    var item = data.items[0];
    var img_url: string = "https://api.time.com/wp-content/uploads/2018/09/apology-sorry.jpg?quality=85&w=1200&h=628&crop=1";
    if (item.pagemap.cse_image)
        img_url = JSON.stringify(item.pagemap.cse_image[0].src);
    return img_url;
}

async function getRandCar() {
    var start_time = new Date().getTime();
    var car_response = await fetch('https://random-data-api.com/api/vehicle/random_vehicle');
    logger.info("vehicle response { status: " + car_response.status + " " + car_response.statusText + " latency: " + (new Date().getTime() - start_time) + " ms }");
    var car_data = await car_response.json();
    if (car_response.ok) {
        var make_and_model = car_data['make_and_model'];
        var make_and_model_str = JSON.stringify(make_and_model);
        if (make_and_model_str)
            return make_and_model_str;
        else
            return Promise.reject(new Error(`No color returned"`));
    }
}

async function getRandColor() {
    var start_time = new Date().getTime();
    const color_response = await fetch('https://random-data-api.com/api/color/random_color');
    logger.info("color response { status: " + color_response.status + " " + color_response.statusText + " latency: " + (new Date().getTime() - start_time) + " ms }");
    var color_data = await color_response.json();
    if (color_response.ok) {
        var color = color_data['color_name'];
        var color_str = JSON.stringify(color);
        if (color_str)
            return color_str;
        else
            return Promise.reject(new Error(`No color returned"`));
    } else {

        // handle the API errors

        const error = new Error('unknown');
        return Promise.reject(error);
    }
}
function logToTransport1(logObject: ILogObject) {
    fs.appendFileSync("./log/logs.txt", JSON.stringify(logObject) + "\n");
}

//metrics

async function countTimeVApi() {
    var ret_val = 0;
    var avg_time = 0;
    for (var i = 0; i < 10; i++) {
        var start_time: number = new Date().getTime();
        var response = await Promise.all([fetch("https://random-data-api.com/api/vehicle/random_vehicle"),
        fetch("https://random-data-api.com/api/vehicle/random_vehicle"),
        fetch("https://random-data-api.com/api/vehicle/random_vehicle"),
        fetch("https://random-data-api.com/api/vehicle/random_vehicle"),
        fetch("https://random-data-api.com/api/vehicle/random_vehicle"),
        fetch("https://random-data-api.com/api/vehicle/random_vehicle")]);
        ret_val = new Date().getTime() - start_time;
        response.forEach(element => {
            logger.info("{ Vechicle api response: status:" + element.status + " " + element.statusText + " latency: " + ret_val + " ms }");
        });
        avg_time += ret_val;
    }
    return avg_time / 10;
}

async function countTimeCApi() {
    var ret_val = 0;
    var avg_time = 0;
    for (var i = 0; i < 10; i++) {
        var start_time: number = new Date().getTime();
        var response = await Promise.all([fetch("https://random-data-api.com/api/color/random_color"),
        fetch("https://random-data-api.com/api/color/random_color"),
        fetch("https://random-data-api.com/api/color/random_color"),
        fetch("https://random-data-api.com/api/color/random_color"),
        fetch("https://random-data-api.com/api/color/random_color"),
        fetch("https://random-data-api.com/api/color/random_color")]);
        ret_val = new Date().getTime() - start_time;
        response.forEach(element => {
            logger.info("{ Color api response: status:" + element.status + " " + element.statusText + " latency: " + ret_val + " ms }");
        });
        avg_time += ret_val;
    }
    return avg_time / 10;
}
