const Friendship = require('../modals/friendship');
const User = require('../modals/user');
module.exports.toggle_friend = async function(req,res){
    try{
        let from_id = req.user._id;
        let to_id = req.params.id;
        // $ or is used to perform logical or operation
        let existing_friendship = await Friendship.findOne({$or : [{from_user : from_id,to_user : to_id},{from_user : to_id,to_user : from_id}]});
        if(existing_friendship)
        {
            // both are friends from past, now want to end their friendship
            console.log("*** now they are no longer friends");

            // updating the user database by pulling friendship id from both user
           let data1 = await User.findByIdAndUpdate(from_id,{$pull : {friendships : existing_friendship._id}},{new : true});
           console.log("User1 data,after they end their friendship : ",data1);

           let data2 = await User.findByIdAndUpdate(to_id ,{$pull : {friendships : existing_friendship._id}},{new:true});
           console.log("User2 data, after they end their friendship : ",data2);

           // updating the friendship database
           let no_friendship = await Friendship.deleteOne({$or : [{from_user:from_id,to_user:to_id},{from_user:to_id,to_user:from_id}]});
           console.log("friendship schema after they end their friendship : ",no_friendship);
        }
        else
        {
           // they are becoming friends for first time 
           // updating the friendship database
           console.log("***** they are friends now");

           // creating friendship in database
           let new_friendship = await Friendship.create({from_user : from_id,to_user : to_id});
           new_friendship.save();
           console.log("friendship schema after becoming friend : ",new_friendship);
           
           // updating the user database
           let data1 = await User.findByIdAndUpdate(from_id,{$push : {friendships : new_friendship._id}},{new : true});
           let data2 = await User.findByIdAndUpdate(to_id,{$push : {friendships : new_friendship._id}},{new :true});

           console.log("User1 data, after they become friends: ",data1);
           console.log("User2 data, after they become friends: ",data2);
        }
        return res.redirect('back');
    }catch(err){
        console.log("Error in Friendship controllers",err);
        return res.json(500,{
            message : "Internal Server Error"
        });
    }
}