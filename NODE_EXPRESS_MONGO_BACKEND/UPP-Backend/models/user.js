const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const role = process.env.roles;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true, unique: true},
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {type: String, required: true},
    roles: [
        {
            type: String, validate: function (value) {
                return role.includes(value);
            }
        }
    ]
});

module.exports = mongoose.model('user', userSchema, 'user')
