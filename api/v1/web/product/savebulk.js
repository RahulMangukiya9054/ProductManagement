import { Router } from 'express';
import commonResolver from '../../../../utilities/commonResolver'
import { handleCsv } from '../../../../utilities/handleCsv';
import { addbulkProduct } from '../../../../services/product/saveproduct';
const router = new Router();


/**
* @swagger
* /api/v1/product/addbulk:
*  post:
*   tags: ["Product"]
*   summary: Save bulk Product.
*   description: api used for add bulk product.
*   consumes:
*     - multipart/form-data
*   parameters:
*      - in: formData
*        name: csvFile
*        type: file
*        description: The csv file to upload.
*   responses:
*    "200":
*     description: success
*    "400":
*     description: fail
*   security:
*      - bearerAuth: [] 
*/


router.post('/addbulk', handleCsv, commonResolver.bind({ modelService: addbulkProduct, isRequestValidateRequired: false }))


export default router;