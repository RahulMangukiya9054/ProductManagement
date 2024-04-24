import { Router } from 'express';
import commonResolver from '../../../../utilities/commonResolver'
import { recurringChargeCustomer } from "../../../../services/customer/customer";
import { decodeJwtTokenFn } from '../../../../utilities/universal';
const router = new Router();

/**
* @swagger
* /api/v1/customer/subscription:
*  post:
*   tags: ["Customer"]
*   summary: Recurring Charge a Customer.
*   description: api used for Recurring charge a customer.
*   parameters:
*      - in: body
*        name: lead
*        description: Recurring Charge a customer.
*        schema:
*         type: object
*         properties:
*           productName:
*             type: string
*           amount:
*             type: number
*           interval:
*             type: string
*   responses:
*    "200":
*     description: success
*    "400":
*     description: fail
*   security:
*      - bearerAuth: []
*/


router.post('/subscription', decodeJwtTokenFn, commonResolver.bind({ modelService: recurringChargeCustomer, isRequestValidateRequired: false }))




export default router;
