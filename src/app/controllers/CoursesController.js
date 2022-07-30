const {
    mongooseToObject,
    mutipleMongooseToObject,
} = require("../../util/mongoose");
const Course = require("../models/Course");

class CoursesController {
    // GET /courses/show
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) =>
                res.render("courses/show", {
                    course: mongooseToObject(course),
                })
            )
            .catch(next);
    }

    // GET /courses/create
    create(req, res, next) {
        res.render("courses/create");
    }

    // POST /courses/store
    store(req, res, next) {
        const formData = req.body;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect("/"))
            .catch(next);
    }

    // GET /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render("courses/edit", {
                    course: mongooseToObject(course),
                })
            )
            .catch(next);
    }

    // PUT /courses/store
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                res.redirect("/");
            })
            .catch(next);
    }

    // DELETE /courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    // DELETE /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    // PATCH /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    // POST /courses/handle-form-actions
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case "delete":
                Course.delete({ _id: { $in: req.body.idCourses } })
                    .then(() => res.redirect("back"))
                    .catch(next);
                break;
            default:
                res.json({ message: "Action is invalid" });
        }
    }



}

module.exports = new CoursesController();
