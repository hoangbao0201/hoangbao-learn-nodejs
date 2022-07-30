const express = require("express");
const router = express.Router();

const CoursesController = require("../app/controllers/CoursesController");

router.get("/create", CoursesController.create);



router.get(
    "/middleware",

    function (req, res, next) {
        if(["hoangbao"].includes(req.query.ve)) {
            // req.face = "Nguyen Hoang Bao"
            return next()
        }

        res.status(403).json({
            message: "error",
        })
    },

    function (req, res) {
        res.json({
            message: "Successfully",
            face: req.face
        });
    }
);


router.get("/destroy", CoursesController.destroy);
router.post("/store", CoursesController.store);
router.post("/handle-form-actions", CoursesController.handleFormAction);
router.get("/:id/edit", CoursesController.edit);
router.put("/:id", CoursesController.update);
router.patch("/:id/restore", CoursesController.restore);
router.delete("/:id", CoursesController.destroy);
router.delete("/:id/force", CoursesController.forceDestroy);
router.get("/:slug", CoursesController.show);

module.exports = router;
