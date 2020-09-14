let express=require("express")
const userRouter = new express.Router();
let { createUser, updateUser, deleteUser, getUser, getAllUsers,handleRequest,acceptRequest,rejectRequest ,getAllFollowers} = require("../controller/userController");

// user routes
// /:user_id
// read  => GET ONE 

userRouter.route("/").post( createUser).get(getAllUsers)
userRouter.route("/fr").post(handleRequest)
userRouter.route("/fr/:user_id/:follower_id").patch(acceptRequest).delete(rejectRequest)
userRouter.route("/fr/:user_id").get(getAllFollowers)
userRouter.route("/:user_id").get(getUser).patch(updateUser).delete(deleteUser);
module.exports = userRouter