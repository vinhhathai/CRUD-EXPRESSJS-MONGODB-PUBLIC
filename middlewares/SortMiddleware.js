module.exports = function SortMiddleWare(req, res, next) {
  res.locals._sort = {
    sorted: false,
    type: "default",
  };
  if (req.query.hasOwnProperty("_sort")) {
    res.locals._sort.sorted = true;
    res.locals._sort.type = req.query.type;
    res.locals._sort.column = req.query.name;
  }
  next();
};
