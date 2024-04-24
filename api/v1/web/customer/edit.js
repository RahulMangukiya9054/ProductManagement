import { Joi } from '../../../../utilities/schemaValidate'
import { Router } from 'express';
import commonResolver from '../../../../utilities/commonResolver'
import { updateCustomer } from "../../../../services/customer/customer";
import { decodeJwtTokenFn } from '../../../../utilities/universal';
const router = new Router();

/**
* @swagger
* /api/v1/customer/update:
*  patch:
*   tags: ["Customer"]
*   summary: Save customer information.
*   description: api used for Save customer information.
*   parameters:
*      - in: body
*        name: lead
*        description: Save customer information.
*        schema:
*         type: object
*         properties:
*           firstName:
*             type: string
*           lastName:
*             type: string
*           companyName:
*             type: string
*           phone:
*             type: string
*           password:
*             type: string
*   responses:
*    "200":
*     description: success
*    "400":
*     description: fail
*   security:
*      - bearerAuth: [] 
*/

const dataSchema = Joi.object({
 firstName: Joi.string().required().label("firstName"),
 lastName: Joi.string().required("lastName"),
 companyName: Joi.string().default(1).required("companyName"),
 phone: Joi.string().required().label("phone"),
 password: Joi.string().required().label("password"),
});

router.patch('/update', decodeJwtTokenFn, commonResolver.bind({ modelService: updateCustomer, isRequestValidateRequired: true, schemaValidate: dataSchema }))


export default router;
