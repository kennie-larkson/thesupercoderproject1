const bcrypt = require('bcrypt');
const { User } = require("./user");
//code for performing validation of user
User.statics.findByCredentials = async (user_email, user_password) => {
    try {
        const user = await User.findOne({ user_email });
        const isMatch = await bcrypt.compare(user_password, user.user_password);
        return user;
    }
    catch (err) {
        console.error(`Unable to login, please enter correct login details: ${err.message}`);
    }
};
