import { Router } from 'express';
import commonResolver from '../../../../utilities/commonResolver'
import { getProductsCsv } from '../../../../services/product/product';
const router = new Router();


/**
* @swagger
* /api/v1/product/getproductscsv:
*  get:
*   tags: ["Product"]
*   summary: Get CSV file of all Products.
*   description: API used to get a CSV file of products.
*   produces:
*     - text/csv
*   responses:
*    "200":
*     description: Success
*    "400":
*     description: Fail
*   security:
*      - bearerAuth: [] 
*/



router.get('/getproductscsv', commonResolver.bind({ modelService: getProductsCsv, isRequestValidateRequired: false }))


export default router;