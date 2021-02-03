import { UploadImageResponseDTO } from '../utils/app.model';
export declare class UploadService {
    constructor();
    uploadImage(file: any, type: string): Promise<UploadImageResponseDTO>;
    uploadImages(files: any, type: string): Promise<Array<UploadImageResponseDTO>>;
    uploadBase64(base64Data: any, fileName: string): Promise<UploadImageResponseDTO>;
    deleteImage(imageId: string): Promise<any>;
}
