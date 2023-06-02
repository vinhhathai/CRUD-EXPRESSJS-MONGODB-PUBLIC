require("dotenv").config();
const mongoose = require("mongoose");
var slug = require("mongoose-slug-updater");
var mongoose_delete = require("mongoose-delete");
mongoose.plugin(slug);

mongoose
  .connect(process.env.DATABASE || "mongodb+srv://sangtaotrehtv:777744441111@vinhdev29.allfguh.mongodb.net/Movies?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect succesfully!");
  })
  .catch((error) => {
    console.log("Connect failed!", error);
  });

const movieSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    image: String,
    slug: { type: String, slug: "name", unique: true },
    video: String,
  },
  {
    collection: "movies",
  }
);

movieSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const Movies = mongoose.model("movies", movieSchema);

module.exports = Movies;
