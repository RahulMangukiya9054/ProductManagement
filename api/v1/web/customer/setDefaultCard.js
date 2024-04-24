import { Router } from 'express';
import commonResolver from '../../../../utilities/commonResolver'
import { setDefaultCardDetails } from "../../../../services/customer/customer";
import { decodeJwtTokenFn } from '../../../../utilities/universal';
const router = new Router();

/**
* @swagger
* /api/v1/customer/setdefaultcard:
*  patch:
*   tags: ["Customer"]
*   summary: Set default card information.
*   description: api used for Set default card information.
*   parameters:
*      - in: body
*        name: lead
*        description: Set default card information.
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


router.patch('/setdefaultcard', decodeJwtTokenFn, commonResolver.bind({ modelService: setDefaultCardDetails, isRequestValidateRequired: false }))




export default router;
