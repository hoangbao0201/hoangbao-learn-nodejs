const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const morgan = require("morgan");
const path = require("path");
const methodOverride = require('method-override')
const route = require("./routes");

const port = 3000;

const db = require("./config/db");

// Connect to DB
db.connect();

app.use(morgan("combined"));    
app.use(methodOverride("__method"));

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

//Http logger
app.use(express.static(path.join(__dirname, "public")));

// Template Engine
app.engine("hbs", handlebars.engine({
    extname: ".hbs"
}))
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

route(app);

app.listen(port, () => {
    console.log(`Example app listening as https://localhost:${port}`);
})