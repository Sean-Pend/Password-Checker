// Packages imported
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Variables created
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
var userIsAuthorised = false;

// Body Parser used
app.use(bodyParser.urlencoded({ extended: true }));

// Password Checker Function
function passwordCheck(req, res, next){
    const password = req.body["password"];
    if (password === "ILoveProgramming") {
        userIsAuthorised = true;
    }
    next();
}

// Password Checker Function Used
app.use(passwordCheck);

// Get the index.html
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
});

// If user is authorized send secret.html otherwise send index.html
app.post("/check", (req, res) => {
    if (userIsAuthorised === true) {
        res.sendFile(__dirname + "/public/secret.html");
    } else {
        res.sendFile(__dirname + "/public/index.html");
    }
});

// Log the port being used in node
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});