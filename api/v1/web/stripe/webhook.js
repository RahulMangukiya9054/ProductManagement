import { Router } from 'express';
import commonResolver from '../../../../utilities/commonResolver'
import { webhook } from "../../../../services/stripe/webhook";
const router = new Router();

/**
* @swagger
* /api/v1/stripe/webhook:
*  post:
*   tags: ["Stripe"]
*   summary: Save customer card information.
*   description: api used for Save customer card information.
*   parameters:
*      - in: body
*        name: lead
*        description: Save customer card information.
*        schema:
*         type: object
*         properties:
*   responses:
*    "200":
*     description: success
*    "400":
*     description: fail
*   security:
*      - bearerAuth: []
*/


router.post('/webhook', commonResolver.bind({ modelService: webhook, isRequestValidateRequired: false }))




export default router;
