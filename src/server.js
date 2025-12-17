import express from "express"
import authsRoutes from './routers/authsRoutes.js'
import adminRoutes from './routers/adminsRoutes.js'

const PORT = process.env.PORT || 3000; // 3000 si le port n'est pas défini 

const app = express();

app.use(express.json());

app.use('/auth', authsRoutes)
app.use('/admin', adminRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});