import { Router } from 'express';
import commonResolver from '../../../../utilities/commonResolver'
import { addProduct } from "../../../../services/product/saveproduct";
const router = new Router();



/**
 * @swagger
 * /api/v1/product/add:
 *  post:
 *   tags: ["Product"]
 *   summary: Save Product information.
 *   description: api used for Save Product information.
 *   parameters:
 *      - in: body
 *        name: lead
 *        description: Save Product information.
 *        schema:
 *         type: object
 *         properties:
 *           productName:
 *             type: string
 *           productSKU:
 *             type: string
 *           productType: 
 *             type: string
 *           companyName:
 *             type: string
 *           productPrice:
 *             type: number
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 *   security:
 *      - bearerAuth: [] 
 */

router.post('/add', commonResolver.bind({ modelService: addProduct, isRequestValidateRequired: false, }))

export default router;
