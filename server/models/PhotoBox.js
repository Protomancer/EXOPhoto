const mongoose = require('mongoose');
const Comments = require('./Comments');
const User = require('./User');

const { Schema } = mongoose;

const photoBoxSchema = new Schema({
    image: {
        type: Image,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 25, 
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 500,
    },
    comment: [Comments.schema],
    user: [User.schema]
});

const PhotoBox = mongoose.model('PhotoBox',photoBoxSchema);

module.exports = PhotoBox;