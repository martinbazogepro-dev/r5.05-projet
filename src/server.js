import express from "express"

const PORT = process.env.PORT || 3000; // 3000 si le port n'est pas défini 

const app = express();

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});