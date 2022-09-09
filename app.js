const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const path = require("path");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, (err) => {
  if (!err) console.log("DB connected");
});

app.use(cors({ origin: true, credentials: true }));
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}


app.listen(process.env.PORT || 5000, () => {
  console.log(`server running on port ${process.env.PORT || 5000}`);
});
