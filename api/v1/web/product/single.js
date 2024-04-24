import { Router } from 'express';
import commonResolver from '../../../../utilities/commonResolver'
import { getProductwithid } from "../../../../services/product/product";
const router = new Router();

/**
 * @swagger
 * /api/v1/product/getproductwithids:
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
 *           id:
 *             type: string
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 *   security:
 *      - bearerAuth: [] 
 */

router.post('/getproductwithids', commonResolver.bind({ modelService: getProductwithid, isRequestValidateRequired: false, }))
export default router;
