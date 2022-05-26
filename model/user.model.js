import mongoose from "mongoose";

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "First Name is required"],
    },
    lastname: {
        type: String,
        required: [true, "Last Name is required"],
    },
    email: {
        type: String,
        trim: true,
        unique: [true, 'Email address should be unique'],
        validate: [ validateEmail, 'Email address should be valid'],
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password should be minimum length of 6"]
    },
    role: {
        type: String,
        default: "subscriber",
        enum: ["admin", "subscriber"]
    }
})

export default mongoose.model("User", userSchema);