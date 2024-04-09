const User = require('../models/user');
const bcrypt = require('bcryptjs');

const registerData = async(userData) => {
    let newUser = new User(userData);
    newUser = await newUser.save();
    return newUser;
}

const loginUser = async(params) => {
    return new Promise(async (resolve, reject) => {
        let userName = params.userName
        const user = await User.findOne({userName})
        if(!user || !await bcrypt.compare(params.password, user.password))
        {
            reject({ message: 'Authentication failed' });
    
        }
        resolve(user);
    })
}

const deleteUser = async(query) => {
    return new Promise(async(resolve, reject) => {
        let _id = query;
        const user = await User.findOne({_id});
        if(!user) 
        {
            reject({message: "User not found"});
        }
        await User.deleteOne({_id});
        resolve(user);
    })
}

const findUserRecord = (searchQuery) => {
    return new Promise(async(resolve, reject) => {
        User.findOne({_id: searchQuery})
        .then((result) => {
            resolve(JSON.parse(JSON.stringify(result)))
        }) .catch((err) => {
            console.log(err)
            reject(err)
        })
    })
}

const findAllData = () => {
    return new Promise(async(resolve,reject) => {
        User.find({})
        .then((result) => {
            resolve(JSON.parse(JSON.stringify(result)));
        }) .catch((err) => {
            console.log(err);
            reject(err);
        })
    })
}

module.exports = {registerData, loginUser, deleteUser, findUserRecord, findAllData}