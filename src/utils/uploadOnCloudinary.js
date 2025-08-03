import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

const uploadImageOnCloudinary = async(localFilePath)=>{
    
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key:process.env.CLOUDINARY_API_KEY, 
        api_secret:process.env.CLOUDINARY_API_SECRET
    });

    try { 
        if(!localFilePath){
            throw new ApiError(400,"Image is required")
        }

        const uploadResult = await cloudinary.uploader.upload(localFilePath)
        if(!uploadResult){
            throw new ApiError(400,"Image not uploaded on cloudinary")
        }

        fs.unlinkSync(localFilePath)
        return uploadResult

    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.error("Error: While uploading image on cloudinary",error?.message)
    }
    
};


export default uploadImageOnCloudinary