const User = require('../manager/user');
const _ = require('underscore');

exports.register = async (req, res) => {
    debugger
    try {
        if (_.isEmpty(req.body.payload)) {
            return res.status(406).json({ Success: false, message: "Required data is missing" });
        }
        const params = req.body.payload;
        let payload = {
            userName: params.userName,
            password: params.password
        }
        await User.registerData(payload);
        return res.status(201).json({ Success: true, message: "User registered Successfully" })
    } catch (err) {
        res.status(409).json({ Success: false, message: err.message });
    }
}

exports.login = async (req, res) => {
    try {
        if (_.isEmpty(req.body.payload)) {
            return res.status(406).json({ Success: false, message: 'Required data is missing' })
        }
        let params = req.body.payload;
        let payload = {
            userName: params.userName,
            password: params.password
        }
        await User.loginUser(payload);
        res.status(200).json({Success: true, message: 'User logged in successfully'});

    } catch (err) {
        console.log(err)
        res.status(409).json({Success: false, message: err.message});
    }
}

exports.delete = async(req, res) => {
    console.log("params", req.query.id);
    debugger
    try {
        if(_.isEmpty(req.query.id)) {
            return res.status(406).json({success: false, message: "Required data is missing"});
        }
        let params = req.query.id;
        await User.deleteUser(params);
        res.status(200).json({success: true, message: "User deleted"});

    } catch(err) {
        console.log(err);
        res.status(409).json({Success: false, message: err.message});
    }
}

exports.find = async(req, res) => {
    try {
        if(_.isEmpty(req.query.id)){
            return res.status(406).json({success: false, message: "Required data missing"});
        }
        let query = req.query.id;
        let data = await User.findUserRecord(query);
        let userData = {
            id: data._id,
            userName: data.userName
        } 
        res.status(200).json({success: true, data: userData, message: "User Found"});
    } catch(err) {
        console.log(err);
        res.status(406).json({Success: true, message: err.message});
    }
}

exports.findAll = async(req, res) => {
    try{
        let data = await User.findAllData();
        res.status(200).json({success: true, data: data, message: "Userdata Found"})
    } catch(err) {
        console.log(err);
        res.status(406).json({Success: true, message: err.message})
    }
}
