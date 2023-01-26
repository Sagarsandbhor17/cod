const express = require("express");
const dotenv=require("dotenv");
var bodyParser = require("body-parser");
const cors=require("cors");
const dbConnect=require('./config/db');

const dashboard=require('./dash/dash.router');
const user=require("./users/users.router");
const banking=require("./banking/banking.router");

dotenv.config();
let PORT =process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.json());

app.use("/data",dashboard);
app.use("/users",user);
app.use("/kelp",banking)

app.get('/' , (req , res) => {
  res.send("<div>Welcome to dashboard backend.</div>")
})

app.listen(PORT||8080, async () => {
  await dbConnect();
  console.log(`Listening on http://localhost:${PORT}`);
});
