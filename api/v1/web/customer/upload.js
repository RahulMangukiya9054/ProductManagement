import { Router } from 'express';
import commonResolver from '../../../../utilities/commonResolver'
import { uploadProfile } from "../../../../services/customer/customer";
import { decodeJwtTokenFn } from '../../../../utilities/universal';
import { imgUpload } from '../../../../utilities/imgUpload';
const router = new Router();


/**
* @swagger
* /api/v1/customer/upload:
*  post:
*   tags: ["Customer"]
*   summary: upload customer profile.
*   description: api used for upload customer profile.
*   consumes:
*     - multipart/form-data
*   parameters:
*      - in: formData
*        name: profileImage
*        type: file
*        description: The image file to upload.
*   responses:
*    "200":
*     description: success
*    "400":
*     description: fail
*   security:
*      - bearerAuth: [] 
*/


router.post('/upload', decodeJwtTokenFn, imgUpload, commonResolver.bind({ modelService: uploadProfile, isRequestValidateRequired: false }))


export default router;