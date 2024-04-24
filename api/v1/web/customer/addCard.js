import { Router } from 'express';
import commonResolver from '../../../../utilities/commonResolver'
import { addCardDetails } from "../../../../services/customer/customer";
import { decodeJwtTokenFn } from '../../../../utilities/universal';
const router = new Router();

/**
* @swagger
* /api/v1/customer/addcard:
*  post:
*   tags: ["Customer"]
*   summary: Save customer card information.
*   description: api used for Save customer card information.
*   parameters:
*      - in: body
*        name: lead
*        description: Save customer card information.
*        schema:
*         type: object
*         properties:
*           cardToken:
*             type: string
*   responses:
*    "200":
*     description: success
*    "400":
*     description: fail
*   security:
*      - bearerAuth: []
*/


router.post('/addcard', decodeJwtTokenFn, commonResolver.bind({ modelService: addCardDetails, isRequestValidateRequired: false }))




export default router;
