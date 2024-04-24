import { Router } from "express";
const app = Router();

import { decodeJwtTokenFn } from '../../../utilities/universal';
import customer from "./customer";
import stripe from "./stripe";

import product from "./product";

/*********** Combine all Routes ********************/
app.use("/product", decodeJwtTokenFn,  product);
app.use("/customer", customer);
app.use("/stripe", stripe);


export default app;
