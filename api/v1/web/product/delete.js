import { Router } from 'express';
import commonResolver from '../../../../utilities/commonResolver'
import { deleteproduct } from "../../../../services/product/product";
const router = new Router();


/**
 * @swagger
 * /api/v1/product/delete:
 *  delete:
 *   tags: ["Product"]
 *   summary: delete Product information.
 *   description: api used for delete Product information.
 *   parameters:
 *      - in: body
 *        name: lead
 *        description: delete Product information.
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

 router.delete('/delete', commonResolver.bind({ modelService: deleteproduct, isRequestValidateRequired: false, }))

export default router;
