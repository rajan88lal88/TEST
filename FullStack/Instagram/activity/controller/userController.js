let userDB = require("../model/user.json");
let userModel = require("../model/userModel");
let userFollowerModel = require("../model/userFollowerModel");
async function createUser(req, res) {
    try {
        let ndbuser = await userModel.create(req.body);

        res.status(201).json({
            success: "successfull",
            user: ndbuser,
        });
        //    res status code server send
    } catch (err) {
        res.status(500).json({
            success: "unsuccessfull",
            message: err.message,
        });
    }
}
async function getUser(req, res) {
    try {
        let { user_id } = req.params;
        let user = await userModel.getById(user_id);
        if (user == undefined) {
            return res.status(404).json({
                status: "failure",
                message: "user not found",
            });
        }

        res.status(200).json({
            status: "success",
            user: user,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message,
            status: "failure",
        });
    }
}
async function getAllUsers(req, res) {
    try {
        let user = await userModel.getAllUsers();
        if (user.length == 0) {
            return res.status(404).json({
                status: "failure",
                message: "no user found",
            });
        }
        res.status(200).json({
            status: "success",
            user: user,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message,
            status: "failure",
        });
    }
}
async function updateUser(req, res) {
    try {
        let { user_id } = req.params;
        // {user_id:12345}
        let data = req.body;
        let user = await userModel.updateById(user_id, data);
        let updated = await userModel.getById(user_id);

        res.status(200).json({
            status: "success",
            message: updated,
        });
    } catch (err) {
        return res.status(404).json({
            status: "failure",
            message: "not updated",
        });
    }
}
async function deleteUser(req, res) {
    let { user_id } = req.params;
    // {user_id:12345}
    try {
        let user = await userModel.getById(user_id);
        await userModel.deleteById(user_id);
        res.status(200).json({
            status: "success",
            message: user,
        });
    } catch (err) {
        res.status(500).json({
            status: "failure",
            message: err.message,
        });
    }
}
async function handleRequest(req, res) {
    try {
        let reqObj = req.body;
        let { is_public } = await userModel.getById(reqObj.user_id);
        if (is_public == true) {
            reqObj.is_pending = false;
            let data = await userFollowerModel.createRequest(reqObj);
            return res.status(201).json({
                status: "accepted",
                request: reqObj,
                message: "your request has been accepted",
            });
        }
        let mappingObj = await userFollowerModel.createRequest(reqObj);
        return res.status(201).json({
            status: "pending",
            request: reqObj,
            message: "your request is pending user will accept it ",
        });
    } catch (err) {
        res.status(500).json({
            success: "failure",
            message: err.message,
        });
    }
}
async function acceptRequest(req, res) {
    try {
        // user_id=> public/private
        let { user_id, follower_id } = req.params;
        await userFollowerModel.acceptRequestQ(user_id, follower_id);
        let { handle } = await userModel.getById(follower_id);
        res.status(201).json({
            success: "successfull",
            message: `${handle} started following you`
        })
    } catch (err) {
        res.status(500).json({
            success: "failure",
            "message": err.message
        })
    }
}
async function rejectRequest(req, res) {
    try {
        // user_id=> public/private
        let { user_id, follower_id } = req.params;
        await userFollowerModel.rejectRequestQ(user_id, follower_id);
        let { handle } = await userModel.getById(follower_id);
        res.status(201).json({
            success: "successfull",
            message: `${handle} rejected`
        })
    } catch (err) {
        res.status(500).json({
            success: "failure",
            "message": err.message
        })
    }
}
async function getAllFollowers(req, res) {
    try {
        // user_id=> public/private
        let { user_id } = req.params;
        // user_id, follower_id,is_pending ,
        let UfollResult = await userFollowerModel.getAllFolId(user_id);
        if (UfollResult.length > 0) {
            async function helper(userfollowObj) {
                let { follower_id, is_pending } = userfollowObj;
                // user table
                let { handle, p_img_url } = await userModel.getById(follower_id);
                console.log(handle);

                return { handle, p_img_url, is_pending };
            }
            let newArr = [];
            for (let i = 0; i < UfollResult.length; i++) {
                newArr.push(helper(UfollResult[i]));
                
            }
            let pArray=UfollResult.map(helper);
            let folImgHandArr=await Promise.all(pArray);
            
            res.status(201).json({
                success: "successfull",
                message: folImgHandArr
            })
        } 
        else {
            res.status(201).json({
                success: "successfull",
                message: `no user found`
            })
        }
        // 1. image_url
        // 2. handle

        // res.status(201).json({
        //     success: "successfull",
        //     message: `${handle} rejected`
        // })
    } catch (err) {
        res.status(500).json({
            success: "failure",
            "message": err.message
        })
    }
}
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.getUser = getUser;
module.exports.getAllUsers = getAllUsers;
module.exports.handleRequest = handleRequest;
module.exports.acceptRequest=acceptRequest;
module.exports.rejectRequest=rejectRequest;
module.exports.getAllFollowers=getAllFollowers;