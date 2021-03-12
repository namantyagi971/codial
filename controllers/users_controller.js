// 
module.exports.profile = function(req,res){
    return res.render('users',{
        title: "Coding Ninjas Courses",
    });
}

module.exports.coder = function(req,res){
    return res.end('<h1> Naman Tyagi is hiring top Coder. Wanna join him ?  </h1>');
}