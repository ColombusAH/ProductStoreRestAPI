import { Router } from "express";
const productRoutes = require("./products");
const router = Router();

router.use("/products", productRoutes);
module.exports = router;
