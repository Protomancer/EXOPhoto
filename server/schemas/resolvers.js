const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { User, Comments, PhotoBox } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find({}).populate('comments');
        },
        user: async (parent, { username }) => {
            return User.findById({ username }).populate('comments');
        },
        getComments: async () => {
            try {
                const comments = await Comments.find().sort({ createdAt: -1});
                return comments
            } catch (err) {
                throw new Error(err);
            }
        },
        getComment: async (parent, {commentId}) => {
            try {
                const comment = await Comments.findById(commentId);
                if (comment) {
                    return comment;
                } else {
                    throw new Error('Invalid Comment');
                }
            } catch(err) {
                throw new Error(err);
            }
        },
        PhotoBoxs: async () => {
            return PhotoBox.find({}).populate('comments');
        },
        PhotoBox: async (parent, { postId }) =>
        PhotoBox.findById({ _id: postId}),
    },

    Mutation: {
        addUser: async (parent, {username,email,password}) => {
            const user = await User.create({ username, email, password});
            const token = signToken(user);
            return { token, user };
        },
        createComment: async (parent, { postId, body }) => {
            const {username} = signToken(context);
            if (body.trim() === '') {
                throw new UserInputError('No Text!', {
                    errors: { message: 'Comment Must Contain Text!'}
                });
            }
                const PhotoBox = await PhotoBox.findById(postId);
                if (PhotoBox) {
                    PhotoBox.comments.unshift({
                        body,
                        username,
                        createdAt: new Date().toISOString()
                    });
                    await PhotoBox.save();
                    return PhotoBox;
                } else throw new UserInputError('Invalid Comment');
        },
        deleteComment: async (parent, { postId, commentId }, context) => {
            const { username } = signToken(context);
            const PhotoBox = await PhotoBox.findById(postId);
            if (PhotoBox) {
                const commentIndex = post.comments.findIndex((comment) => comment.id === commentId);
                if (PhotoBox.comments[commentIndex].username === username) {
                    PhotoBox.comments.splice(commentIndex, 1);
                    await post.save();
                    return PhotoBox;
                } else {
                    throw new AuthenticationError(' Please Log In. ')
                }
            } else {
                throw new UserInputError('Invalid Comment')
            }
        },
        login: async (parent, { username, password }) => {
            const user = await User.findOne({username});

            if (!user) {
                throw new AuthenticationError('Invalid Username!')
            }
            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw new AuthenticationError('Wrong Email or Password.');    
            }
            
            const token = signToken(user);

            return { token, user };
        },
    },
};

module.exports = resolvers;