/* eslint-disable no-unused-vars */
function convertToStr(hex) {
    try {
        hex = hex.toString();
        let str = '';
        for (let i = 0; i < hex.length; i += 2) {
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        return str;
    } catch (e) {
        return null;
    }

}

function convertToHex(str) {
    try {
        let hex = '';
        for (let i = 0; i < str.length; i++) {
            hex += str.charCodeAt(i).toString(16);
        }
        return hex;
    } catch (e) {
        return null;
    }
}

const etcToken = true;