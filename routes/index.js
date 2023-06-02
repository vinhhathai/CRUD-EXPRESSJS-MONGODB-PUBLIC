var express = require("express");
var router = express.Router();
var Movies = require("../models/Movies");

//Handle actions with checkbox
router.post("/movie/update/handler-actions", function (req, res, next) {
  switch (req.body.action) {
    case "delete":
      Movies.deleteMany({
        _id: { $in: req.body.id },
        /// lọc thêm các movie bị xóa mềm vì find() mặc định không trả về các bản ghi đã bị xóa mềm
      })
        .then((data) => {
          res.redirect("back");
        })
        .catch(() => {
          res.send("An error was happend");
        });
      break;
    case "restore":
      Movies.restore({
        _id: { $in: req.body.id },
        /// lọc thêm các movie bị xóa mềm vì find() mặc định không trả về các bản ghi đã bị xóa mềm
      })
        .then((data) => {
          res.redirect("back");
        })
        .catch(() => {
          res.send("An error was happend");
        });
      break;
    default:
      res.send("An error happend! Please try again!");
      break;
  }
});

//Handle restore deleted movie
router.post("/movie/update/restore/:id", function (req, res, next) {
  Movies.restore({ _id: req.params.id })
    .then(() => {
      res.redirect("back");
    })
    .catch(() => {
      res.send("Error while restore!!!");
    });
});
//Restore movies deleted view
router.get("/movie/update/restore", function (req, res, next) {
  Movies.findDeleted({})
    .then((data) => {
      res.render("restore", { data });
    })
    .catch(() => {
      res.send("Error while render view!!!");
    });
});

//UPDATE from delete movie (soft delete)
router.delete("/movie/update/delete/:id", function (req, res, next) {
  Movies.delete({ _id: req.params.id })
    .then(() => {
      res.redirect("back");
    })
    .catch(() => {
      res.send("Error while deleting!!!");
    });
});
//UPDATE from delete movie (DELETE FOREVER)
router.delete("/movie/update/delete/sure/:id", function (req, res, next) {
  Movies.deleteOne({ _id: req.params.id })
    .then((id) => {
      res.redirect("back");
    })
    .catch(() => {
      res.send("Error while deleting!!!");
    });
});

//UPDATE from edit MOVIE
//store after updating
router.put("/movie/store/:id", function (req, res, next) {
  Movies.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch(() => {
      res.send("Error while updating!!!");
    });
});

//editing - render form
router.get("/movie/update/edit/:id", function (req, res, next) {
  Movies.findById({ _id: req.params.id })
    .then((data) => {
      res.render("edit", { data: data });
    })
    .catch(() => {
      "Error while getting data!";
    });
});
// Route render movie list
router.get("/movie/update", function (req, res, next) {
  let deletedLength = 0;
  Movies.findDeleted({})
    .then((data) => {
      deletedLength = data.length;
    })
    .catch(console.error("Error while getting"));
  Movies.find({})
    .sort({ [req.query.column]: req.query.type })
    .then((data) => {
      res.render("update", { data: data, deletedLength });
    })
    .catch(() => {
      res.send("Error!!!");
    });
});

/*Create new movie*/
router.post("/movie/store", function (req, res, next) {
  Movies.create({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    video: req.body.video,
  })
    .then(() => {
      res.redirect("/");
    })
    .catch(() => {
      res.send("Error while creating!!!");
    });
});
router.get("/movie/create", function (req, res, next) {
  res.render("create");
});

/* Watches/:slug*/
router.get("/watches/:slug", function (req, res, next) {
  Movies.findOne({ slug: req.params.slug })
    .then((data) => {
      res.render("watches", { data: data });
    })
    .catch(() => {
      res.send("Lỗi khi load phim");
    });
});

/* GET home page. */
router.get("/", function (req, res, next) {
  Movies.find({})
    .then((data) => {
      res.render("index", { data: data });
    })
    .catch(() => {
      res.send("Lỗi khi lấy dữ liệu phim");
    });
});

module.exports = router;
