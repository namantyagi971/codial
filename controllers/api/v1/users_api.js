const jwt = require('jsonwebtoken');
const User = require('../../../modals/user');
const env = require('../../../config/environment');

module.exports.createSession = async function(req,res){
    try{
        let user = await User.findOne({email : req.body.email});
        if(!user||req.body.password!=user.password)
        {
            return res.json(401,{
                message : 'Invalid Username or Password'
            })
        }
        else
        {
            return res.json(200,{
                message : 'Sign in successfully, here is your token, keep it safe!!',
                data : {
                    token : jwt.sign(user.toJSON(),env.jwt_secret,{expiresIn : '1000000'})
                }
            })
        }

    }catch(err){
        console.log("********err in user api",err);
        return res.json(500,{
            message : "Internal Server Error"
        }); 
    }

}