import dotenv from "dotenv";
import { app } from "./app";

dotenv.config();
const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});