const connectToMongo = require("./Database/db");
const express = require("express");
const app = express();
const path = require("path")
connectToMongo();
const port = 5000 || process.env.PORT;
var cors = require("cors");

app.use(cors({
  origin: process.env.FRONTEND_API_LINK
}));
app.use(express.json()); //to convert request data to json

app.use('/media', express.static(path.join(__dirname, 'media')));


// Credential Apis
app.use("/api/user/auth", require("./routes/User Api/credential.route"));
app.use("/api/employee/auth", require("./routes/Employee Api/credential.route"));
app.use("/api/admin/auth", require("./routes/Admin Api/credential.route"));
// Details Apis
app.use("/api/user/details", require("./routes/User Api/details.route"));
app.use("/api/employee/details", require("./routes/Employee Api/details.route"));
app.use("/api/admin/details", require("./routes/Admin Api/details.route"));
// Other Apis
app.use("/api/material", require("./routes/Other Api/material.route"));
app.use("/api/notice", require("./routes/Other Api/notice.route"));
app.use("/api/utility", require("./routes/Other Api/utility.route"));
app.use("/api/bills", require("./routes/Other Api/bills.route"));
app.use("/api/category", require("./routes/Other Api/category.route"));

app.listen(port, () => {
  console.log(`Server Listening On http://localhost:${port}`);
});
