import { Router } from 'express';
import commonResolver from '../../../../utilities/commonResolver'
import { chargeCustomer } from "../../../../services/customer/customer";
import { decodeJwtTokenFn } from '../../../../utilities/universal';
const router = new Router();

/**
* @swagger
* /api/v1/customer/chargecustomer:
*  post:
*   tags: ["Customer"]
*   summary: Charge a Customer.
*   description: api used for charge a customer.
*   parameters:
*      - in: body
*        name: lead
*        description: Charge a customer.
*        schema:
*         type: object
*         properties:
*           amount:
*             type: number
*           currency:
*             type: string
*           cardId:
*             type: string
*   responses:
*    "200":
*     description: success
*    "400":
*     description: fail
*   security:
*      - bearerAuth: []
*/


router.post('/chargecustomer', decodeJwtTokenFn, commonResolver.bind({ modelService: chargeCustomer, isRequestValidateRequired: false }))




export default router;
