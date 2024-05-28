const fs = require('fs');

function logReqRes() {
    return (req, res, next) => {
        fs.appendFile(
            "requests.log",
            `\n${new Date()}: ${req.ip} ${req.method}: ${req.path}\n`,
            (err, data) => {
                next();
            }
        );
    }
}

function logError(error, requestMethod, requestURL) {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    if (!fs.existsSync("./logs")) {
        fs.mkdirSync("./logs");
    }

    fs.appendFileSync(
        `./logs/error-${day}-${month}-${year}.log`,
        `${JSON.stringify(error)},\n{Method: ${requestMethod}, Request: ${requestURL}}\n\n\n`,
    );
}

module.exports = { logReqRes, logError }