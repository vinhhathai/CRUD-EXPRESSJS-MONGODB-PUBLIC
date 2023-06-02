const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

// Kết nối đến cơ sở dữ liệu
mongoose.connect("mongodb://localhost:27017/Movies", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Đổi tên collection
async function renameCollection(oldName = "Movies", newName = "movies") {
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db("Movies");
    await db.collection(oldName).rename(newName);

    console.log(
      `Đổi tên collection từ "${oldName}" thành "${newName}" thành công.`
    );

    client.close();
  } catch (error) {
    console.error("Đổi tên collection thất bại:", error);
  } finally {
    mongoose.disconnect();
  }
}

// Sử dụng hàm renameCollection
renameCollection("Movies", "movies");
