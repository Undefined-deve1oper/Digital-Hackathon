const express = require("express");
const router = express.Router({ mergeParams: true });
const userRouter = require("./user.routes");
const authRouter = require("./auth.routes");
const postRouter = require("./post.routes");
const schedulerRouter = require("./scheduler.routes");

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/posts", postRouter);
router.use("/schedulers", schedulerRouter);

module.exports = router;
