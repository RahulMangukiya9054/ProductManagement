import { Router } from 'express';
import commonResolver from '../../../../utilities/commonResolver'
import { deleteCustomer } from "../../../../services/customer/customer";
import { decodeJwtTokenFn } from '../../../../utilities/universal';
const router = new Router();


/**
* @swagger
* /api/v1/customer/delete:
*  delete:
*   tags: ["Customer"]
*   summary: delete customer information.
*   description: api used for delete customer information.
*   parameters:
*      - in: body
*        name: lead
*        description: delete customer information.
*        schema:
*         type: object
*         properties:
*           
*   responses:
*    "200":
*     description: success
*    "400":
*     description: fail
*   security:
*      - bearerAuth: [] 
*/

router.delete('/delete', decodeJwtTokenFn, commonResolver.bind({ modelService: deleteCustomer, isRequestValidateRequired: false }))



export default router;
