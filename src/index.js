const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const morgan = require("morgan");
const path = require("path");
const methodOverride = require('method-override')
const route = require("./routes");
const sortMiddleware = require("./app/middlewares/SortMiddleware");

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

// Custom Middleware
app.use(sortMiddleware);

// Template Engine
app.engine("hbs", handlebars.engine({
    extname: ".hbs",
    helpers: {
        sum: (a, b) => a+b,
        sortable: (field, sort) => {
            const sortType = field === sort.column ? sort.type : 'default'

            const icons = {
                default: 'oi oi-elevator',
                asc: "oi oi-sort-ascending",
                desc: "oi oi-sort-descending",
            }
            const types = {
                default: 'desc',
                asc: 'desc',
                desc: 'asc'
            }

            const icon = icons[sortType];
            const type = types[sortType];


            return `<a href="?_sort&column=${field}&type=${type}">
                <span class="${icon}"></span>
            </a>`
        }
    }
}))
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

route(app);

app.listen(port, () => {
    console.log(`Example app listening as https://localhost:${port}`);
})