const homeRouter = require("./home");
const coursesRouter = require("./courses");
const meRouter = require("./me");

function route(app) {

    app.use("/courses", coursesRouter);
    app.use("/me", meRouter);
    app.use("/", homeRouter);

}

module.exports = route;