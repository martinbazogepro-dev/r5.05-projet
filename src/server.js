import express from "express"
import authsRoutes from './routers/authsRoutes.js'
import flashcardRoutes from "./routers/flashcardsRoutes.js"
import adminsRoutes from './routers/adminsRoutes.js'
import collectionRoutes from './routers/collectionRouters.js'
import revisionRoutes from './routers/revisionRoutes.js'
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";


const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/auth', authsRoutes)
app.use("/flashcards", flashcardRoutes)
app.use('/admin', adminsRoutes)
app.use('/collections', collectionRoutes)
app.use('/revision', revisionRoutes)

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
