const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
              return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    thoughts: {
        // array of _id values references thoughts array
    },
    friends: {
        // array of _id values references friends array
    }
})

UserSchema.plugin(uniqueValidator);

const User = model('User', UserSchema)

module.exports = User;