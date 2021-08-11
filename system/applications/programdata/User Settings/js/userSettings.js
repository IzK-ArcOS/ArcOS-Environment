function changePassword(user, oldpswd, newpswd, confirmnewpswd) {
    let userData = JSON.parse(localStorage.getItem(user));

    if (userData.pswd) {
        if (userData.pswd == oldpswd) {
            if (newpswd == confirmnewpswd) {
                if (newpswd == "") {
                    userData.pswd = "";
                } else {
                    userData.pswd = newpswd;
                }
                new ErrorLogic().sendError("Password Manager", "Your password has been updated.");
            } else {
                new ErrorLogic().sendError("Password Manager", "The two new passwords don't match. Please retype each of them and try again.");
            }
        } else {
            new ErrorLogic().sendError("Password Manager", "The old password is incorrect. Please retype the old password and try again.");
        }
    } else {
        if (newpswd == confirmnewpswd) {
            if (newpswd == "") {
                userData.pswd = "";
            } else {
                userData.pswd = newpswd;
            }
            new ErrorLogic().sendError("Password Manager", "Your password has been updated.");
        } else {
            new ErrorLogic().sendError("Password Manager", "The two new passwords don't match. Please retype each of them and try again.");
        }
    }

    localStorage.setItem(user,JSON.stringify(userData));
}