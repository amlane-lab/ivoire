"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const ImageKit = require("imagekit");
let imagekit;
let UploadService = class UploadService {
    constructor() {
        if (process.env.IMAGEKIT_PUBLIC_KEY && process.env.IMAGEKIT_PRIVATE_KEY && process.env.IMAGEKIT_URL) {
            imagekit = new ImageKit({
                publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
                privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
                urlEndpoint: process.env.IMAGEKIT_URL
            });
        }
        else {
            console.log("IMAGEKIT_PUBLIC_KEY or  IMAGEKIT_PRIVATE_KEY or IMAGEKIT_URL not set.");
        }
    }
    async uploadImage(file, type) {
        try {
            let buff = new Buffer(file.buffer);
            let base64Data = buff.toString('base64');
            let fileName = Date.now() + '_original_' + file.originalname;
            let imageUrl = await imagekit.upload({
                file: base64Data,
                fileName: fileName,
            });
            const resData = {
                url: `${process.env.IMAGEKIT_URL}tr:dpr-auto,tr:w-auto${imageUrl.filePath}`,
                key: imageUrl.fileId,
                filePath: imageUrl.filePath
            };
            return resData;
        }
        catch (e) {
        }
    }
    async uploadImages(files, type) {
        try {
            let resData = [];
            for (var i = 0; i < files.length; i++) {
                let buff = new Buffer(files[i].buffer);
                let base64Data = buff.toString('base64');
                let fileName = Date.now() + '_original_' + files[i].originalname;
                let imageUrl = await imagekit.upload({
                    file: base64Data,
                    fileName: fileName,
                });
                resData.push({
                    url: `${process.env.IMAGEKIT_URL}tr:dpr-auto,tr:w-auto${imageUrl.filePath}`,
                    key: imageUrl.fileId,
                    filePath: imageUrl.filePath
                });
            }
            return resData;
        }
        catch (e) {
        }
    }
    async uploadBase64(base64Data, fileName) {
        let imageRes = await imagekit.upload({
            file: base64Data,
            fileName: fileName,
        });
        return {
            url: imageRes.url,
            key: imageRes.fileId,
            filePath: imageRes.filePath
        };
    }
    async deleteImage(imageId) {
        try {
            await imagekit.deleteFile(imageId);
            return true;
        }
        catch (e) {
            return false;
        }
    }
};
UploadService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map