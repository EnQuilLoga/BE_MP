require("dotenv").config();
const express = require("express");
const fs = require("fs");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const cors = require("cors");

const connectDB = require("./config/MongoDb");
const authRouter = require("./routes/user");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");

const Products = require("./models/Product");
const Users = require("./models/User");

const app = express();

connectDB();

const specs = require("./swagger.json");

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(express.json()); // doc bat cu du lieu trong body
app.use(cors());

app.use("/api/users", authRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
});

//from here
const dataProducts = JSON.parse(
    fs.readFileSync("./data/products.json", "utf-8")
);

const dataUser = JSON.parse(
    fs.readFileSync("./data/user.json", "utf-8")
);

const importData = async () => {
    try {
        await Products.create(dataProducts);
        // await Users.create(dataUser);
        console.log("data successfully imported");
        
        // to exit the proces
        process.exit();
    } catch (error) {
        console.log("error", error);
    }
};

importData(); //Import data product vào mongoDB

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
