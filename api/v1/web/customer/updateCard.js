import { Router } from 'express';
import commonResolver from '../../../../utilities/commonResolver'
import { updateCardDetails } from "../../../../services/customer/customer";
import { decodeJwtTokenFn } from '../../../../utilities/universal';
const router = new Router();

/**
* @swagger
* /api/v1/customer/updatecard:
*  patch:
*   tags: ["Customer"]
*   summary: Update customer card information.
*   description: api used for Update customer card information.
*   parameters:
*      - in: body
*        name: lead
*        description: Update customer card information.
*        schema:
*         type: object
*         properties:
*           cardId:
*             type: string
*           name:
*             type: string
*           address:
*             type: string
*           expMonth:
*             type: string
*           expYear:
*             type: string
*   responses:
*    "200":
*     description: success
*    "400":
*     description: fail
*   security:
*      - bearerAuth: []
*/


router.patch('/updatecard', decodeJwtTokenFn, commonResolver.bind({ modelService: updateCardDetails, isRequestValidateRequired: false }))




export default router;
