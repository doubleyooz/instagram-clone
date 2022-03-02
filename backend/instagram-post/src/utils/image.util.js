import sharp from 'sharp';

export const treatImage = async (image, width, height) => {
    return await sharp(image)
        .resize(width ? width : null, height ? height : null)
        .sharpen()
        .png({ quality: 80 })
        .toBuffer();
};
export const upload = async (fileName, fileBuffer) => {
    // Covert buffer to Readable Stream
    const readablePhotoStream = new Readable();
    readablePhotoStream.push(fileBuffer);
    readablePhotoStream.push(null);

    let bucket = new mongodb.GridFSBucket(db, {
        bucketName: 'photos',
    });

    let uploadStream = bucket.openUploadStream(fileName);
    let _id = uploadStream.id;
    readablePhotoStream.pipe(uploadStream);

    uploadStream.on('error', () => {
        return { message: 'Error uploading file' };
    });

    uploadStream.on('finish', () => {
        return {
            message: 'File uploaded successfully',
            _id: _id,
        };
    });
};
