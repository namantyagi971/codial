// export to other files
module.exports.home = function(req,res){
    // printing the cookie coming from browser side
    console.log(req.cookies);
    // changing the cookie at server side
    res.cookie('user_id',25);
    return res.render('home',{
        title :'home',
    });
}
