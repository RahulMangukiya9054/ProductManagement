import { Router } from 'express';
import commonResolver from '../../../../utilities/commonResolver'
import { getCustomer } from "../../../../services/customer/customer";
import { decodeJwtTokenFn } from '../../../../utilities/universal';
const router = new Router();


/**
 * @swagger
 * /api/v1/customer/getcustomer:
 *  get:
 *   tags: ["Customer"]
 *   summary: get customer information.
 *   description: api used for get customer information.
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 *   security:
 *      - bearerAuth: [] 
 */

router.get('/getCustomer', decodeJwtTokenFn, commonResolver.bind({ modelService: getCustomer, isRequestValidateRequired: false, schemaValidate: {} }))



export default router;
