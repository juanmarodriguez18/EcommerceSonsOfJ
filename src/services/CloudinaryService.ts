// src/services/CloudinaryService.js

import axios from 'axios';

const uploadImage = async (file: string | Blob) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default'); // Ajustar según tu configuración en Cloudinary

    try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dqb1586ud/image/upload', formData);
        return response.data.secure_url;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export default uploadImage;
