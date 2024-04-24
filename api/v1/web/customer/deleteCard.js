import { Router } from 'express';
import commonResolver from '../../../../utilities/commonResolver'
import { deleteCardDetails } from "../../../../services/customer/customer";
import { decodeJwtTokenFn } from '../../../../utilities/universal';
const router = new Router();

/**
* @swagger
* /api/v1/customer/deletecard:
*  delete:
*   tags: ["Customer"]
*   summary: Delete customer card information.
*   description: api used for Delete customer card information.
*   parameters:
*      - in: body
*        name: lead
*        description: Delete customer card information.
*        schema:
*         type: object
*         properties:
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


router.delete('/deletecard', decodeJwtTokenFn, commonResolver.bind({ modelService: deleteCardDetails, isRequestValidateRequired: false }))




export default router;
