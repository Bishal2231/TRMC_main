import { User } from "../models/user.model.js";


async function checkAdmin(req, res, next) {
    try {
        // Example: Assuming user ID is stored in req.session.userId
        const userId = req.user;

        if (!userId) {
            // If userId is not in the session, redirect to home
            return res.redirect('/');
        }

        // Fetch the user from the database using the user ID
        const user = await User.findById(userId);

        if ( user.isAdmin) {
            // If the user is found and is an admin, allow the request to proceed
            return next();
        } else {
            // If the user is not an admin, redirect to the home page
            return res.redirect('/');
        }
    } catch (err) {
        const error={
            heading:err ,
            paragraph:" some thing went wrong" 
        }

        return res.render("errorM.ejs",{error})
    }
}
export {checkAdmin}