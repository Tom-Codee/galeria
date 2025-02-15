require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors()); // Permitir CORS
app.use(express.json());

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

// ✅ Endpoint para obtener imágenes de Cloudinary con la etiqueta "drawings"
app.get("/api/images", async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/image/tags/drawings`,
            {
                auth: {
                    username: CLOUDINARY_API_KEY,
                    password: CLOUDINARY_API_SECRET
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("❌ Error al obtener imágenes:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
