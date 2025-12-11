import express from "express"
import authsRoutes from './routers/authsRoutes.js'
import flashcardRoutes from "./routers/flashcardsRoutes.js"

const PORT = process.env.PORT || 3000; // 3000 si le port n'est pas défini 

const app = express();

app.use(express.json());

app.use('/auth', authsRoutes)
app.use("/flashcards", flashcardRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});