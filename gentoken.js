const { User } = require("./user");
//code for generating JWT Token
User.methods.generateAuthToken = async () => {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'SomeExposedSecretKey');
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};
