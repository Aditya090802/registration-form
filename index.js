const express = require("express")
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");


const app = express();
dotenv.config();

const port = process.env.PORT || 3000;
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;


mongoose.connect(`mongodb+srv://adityaverma090802${username}:${password}@cluster0.7v0mvxe.mongodb.net/registrationFormDB`,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
});

// registration Schema
const registrationSchema = new mongoose.Schema({
    name : string,
    email : string,
    password : string
});

// mode of registration schema
const registration = mongoose.model("Registration", registrationSchema);

app.use(bodyParser.urlencoded ({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(_dirname + "/pages/index.html");
});

app.post("/register", async (req, res) => {
    try{
        const { name, email, password } = req.body;

        const existingUser = await registration.findOne({ email : email });
        // check for existing User

        if(!existingUser) {
            const registrationData = new registration({
                name,
                email,
                password,
            });
            await registrationData.save();
            res.redirect("/success");
        }

        else{
         console.log("User already exist");
         res.redirect("/error");
        }

    } catch (error) {
        console.log(error);
        res.redirect("error");

    }
});

app.get("/success", (req, res) => {
    res.sendFile (_dirname + "/pages/success.html");
});
app.get("/error", (req, res)=>{
    res.sendFile (_dirname+"/pages/success.html");
});

app.listen(port, ()=>{
    console.log(`sever is running on port ${port}`);
});

