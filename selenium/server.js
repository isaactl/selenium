var express = require("express");
var app = express();

app.get('/url', (req, res, next) => {
    res.json(["a", "b"]);
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})