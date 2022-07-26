const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, maxLength: 250 },
        description: { type: String, maxLength: 250 },
        idVideo: { type: String, maxLength: 250 },
        slug: { type: String, slug: "name", unique: true },
    },
    {
        timestamps: true,
    }
);

mongoose.plugin(slug);
Course.plugin(mongooseDelete, { overrideMethods: "all", deleteAt: true   });

module.exports = mongoose.model("Course", Course);
