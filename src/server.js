import app from "./app.js";
import dotenv from "dotenv";

const PORT = process.env.PORT || 3000;

const blueText = "\x1b[34m";
const resetText = "\x1b[0m";

dotenv.config();

app.listen(PORT, () => {
    console.log(`Server is running on ${blueText}http://localhost:${PORT}${resetText}`);
});
