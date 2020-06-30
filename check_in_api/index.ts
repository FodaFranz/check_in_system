import express from "express";
import mongoose from "mongoose";
import dbConfig from "./config/db.json";
import checkinRoutes from "./routes/checkinRoutes";

const app = express();
const port: number = 8080;

const dbUrl: string = `mongodb+srv://${dbConfig.username}:${dbConfig.password}@checkincluster-6ixv2.mongodb.net/test?retryWrites=true&w=majority`
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use("/api", checkinRoutes);

app.listen(port, () => {
    console.log( `server listening on: ${port}` );
});