const port = 300
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(`mongodb+srv://laiza7:admin1234@cluster0.l7gorr8.mongodb.net/vehiculo_db?retryWrites=true&w=majority`, { useNewUrlParser: true })

const db = mongoose.connection;

const crossOriginIsolated = {
  error: (error) => {
    console.error("Database error:", error);
  },
};

db.on("error", (error) => crossOriginIsolated.error(error));
db.once("open", () => console.log("System connected to MongoDB Database"));

app.use(express.json());

const vehiculoRouter = require("./routes/vehiculoRoutes");
app.use("/autos", vehiculoRouter);


app.listen(port, () => console.log('Server is running  on port --> ' + port));
