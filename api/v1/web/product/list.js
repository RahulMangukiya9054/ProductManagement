import { Router } from 'express';
import commonResolver from '../../../../utilities/commonResolver'
import { listProduct } from "../../../../services/product/listProduct";
const router = new Router();

/**
 * @swagger
 * /api/v1/product/listProduct:
 *  post:
 *   tags: ["Product"]
 *   summary: get Product information.
 *   description: api used for get Product information.
 *   parameters:
 *      - in: body
 *        name: lead
 *        description: get Product information.
 *        schema:
 *         type: object
 *         properties:
 *           page:
 *             type: string
 *           limit:
 *             type: string
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 *   security:
 *      - bearerAuth: [] 
 */

router.post('/listProduct', commonResolver.bind({ modelService: listProduct, isRequestValidateRequired: false, }))




export default router;
