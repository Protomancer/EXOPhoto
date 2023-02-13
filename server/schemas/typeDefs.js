const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    token: String
    password: String
    comments: [Comment]!
}

type Auth {
    token: ID!
    user: User
}

type Comment {
    _id: ID
    username: String
    createdAt: String
    body: String
}

type PhotoBox {
    _id: ID!
    image: String
    title: String
    description: String
    comments: [Comment]
}

type Query {
    users: [User]
    user(username: String!): User
    getComments: [Comment]
    getComment(commentId: ID!): Comment
    photoBox(username: String): [PhotoBox]
    photoBox(postId: ID!): PhotoBox
}

type Mutation {
    addUser(
        username: String!
        email: String!
        password: String!
    ): Auth
    login(username: String!,password: String!): Auth
    createComment(postId: String!,body: String!): PhotoBox
    deleteComment(postId: ID!, commentId: ID!): PhotoBox
}
`;

module.exports = typeDefs;
