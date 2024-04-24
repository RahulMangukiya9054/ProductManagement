import { Joi } from '../../../../utilities/schemaValidate'
import { Router } from 'express';
import commonResolver from '../../../../utilities/commonResolver'
import { addCustomer } from "../../../../services/customer/customer";
const router = new Router();

/**
 * @swagger
 * /api/v1/customer/add:
 *  post:
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
 *           email:
 *             type: string
 *           password:
 *             type: string
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 */

const dataSchema = Joi.object({
  firstName: Joi.string().required().label("firstName"),
  lastName: Joi.string().required("lastName"),
  companyName: Joi.string().default(1).required("companyName"),
  phone: Joi.string().required().label("phone"),
  email: Joi.string().required().label("email"),
  password: Joi.string().required().label("password"),
});

router.post('/add', commonResolver.bind({ modelService: addCustomer, isRequestValidateRequired: true, schemaValidate: dataSchema }))




export default router;
