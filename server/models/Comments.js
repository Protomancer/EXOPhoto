const mongoose = require('mongoose');

const { Schema } = mongoose; 

const commentsSchema = new Schema({
    username: {
        type: String,
        minLength: 1,
        maxLength: 50,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    body: {
        type: String,
        required: true,
        maxLength: 150
    }
});

const Comments = mongoose.model('Comments',commentsSchema);

module.exports = Comments;