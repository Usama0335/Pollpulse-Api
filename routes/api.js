import express from 'express';
import authRouter from './auth.js';
import pollRouter from './polls.js';

// app is a singleton, ie same for all
const app = express();
// No router here, use chain them

app.use("/auth/", authRouter);
app.use("/polls", pollRouter);

// If needed
export default app;
