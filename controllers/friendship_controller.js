const Friendship = require('../modals/friendship');
const User = require('../modals/user');
module.exports.toggleFriends = async function(req,res){
    try{
        let from_id = req.user._id;
        let to_id = req.params.id;
        // $ or is used to perform logical or operation
        let existing_friendship = await Friendship.findOne({$or : [{from_user : from_id,to_user : to_id},{from_user : to_id,to_user : from_id}]});
        if(existing_friendship)
        {
            // both are friends from past, now want to end their friendship

            // updating the user database by pulling friendship id from both user
           let data = await User.findByIdAndUpdate(from_id,{$pull : {friendships : existing_friendship._id}});
           console.log("friendship data : ",data);
           await User.findByIdAndUpdate(to_id ,{$pull : {friendships : existing_friendship._id}});

           // updating the friendship database
           await Friendship.deleteOne({$or : [{from_user:from_id,to_user:to_id},{from_user:to_id,to_user:from_id}]});
        }
        else
        {
           // they are becoming friends for first time 
           // updating the friendship database
           let new_friendship = await Friendship.create({from_user : from_id,to_user : to_id});
           new_friendship.save();
           
           // updating the user database
           await User.findByIdAndUpdate(from_id,{$pull : {friendships : new_friendship._id}});
           await User.findByIdAndUpdate(to_id,{$pull : {friendships : new_friendship._id}});
         
        }


    }catch(err){
        console.log("Error in Friendship controllers");
        return res.json(500,{
            message : "Internal Server Error"
        });
    }
}