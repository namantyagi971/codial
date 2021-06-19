const development = {
    name : 'development',
    asset_path : '/assets',
    session_cookie_key : 'blahsomething',
    db : 'codial_development',
    smtp : {
        service : 'gmail',
        host : 'gmail.smtp.com',
        port : 587,
        secure: false,
        auth : {
            user : 'namantyagi15062000@gmail.com',
            pass : 'Sync@654321'
        }
    },
    google_client_id : "193102948087-h08qf8u76of9m1dbslbv0eqi4vm99mc6.apps.googleusercontent.com",
    google_client_secret : "JugpAQ8iUvigRXgk_2WdcICw",
    google_call_back_url : "http://localhost:8000/users/auth/google/callback",
    jwt_secret : 'codial'
}
const production = {
    name : 'production',
    asset_path : process.env.CODIAL_ASSET_PATH,
    session_cookie_key : process.env.CODIAL_SESSION_COOKIE_KEY,
    db : process.env.CODIAL_DB,
    smtp : {
        service : 'gmail',
        host : 'gmail.smtp.com',
        port : 587,
        secure: false,
        auth : {
            user : process.env.CODIAL_GMAIL_USERNAME,
            pass : process.env.CODIAL_GMAIL_PASSWORD
        }
    },
    google_client_id : process.env.CODIAL_GOOGLE_CLIENT_ID,
    google_client_secret : process.env.CODIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url : process.env.CODIAL_GOOGLE_CALLBACK_URL,
    jwt_secret : process.env.CODIAL_JWT_SECRET

}
module.exports = eval(process.env.CODIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODIAL_ENVIRONMENT);;