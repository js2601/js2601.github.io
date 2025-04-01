import express from "express";
import serverless from "serverless-http";

const app = express();

const usersRoute = require('./routes/user')

app.use('/users', usersRoute)

export const handler = serverless(app)