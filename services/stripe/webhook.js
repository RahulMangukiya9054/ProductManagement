import { nodeMailer } from "../../utilities/nodeMailer";
import dbService from '../../utilities/dbService'
const stripe = require("stripe")(process.env.STRIPE_SK);


export const webhook = async (req) => {
    let event;
    let email;
    let mailInfo;

    try {
        // let event =  stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        event = req.body;
        // console.log('event====>', event)
        switch (event.type) {
            case 'charge.succeeded':
                const chargeSucceeded = event.data.object;
                email = await dbService.findOneRecord("customerModel", {
                    stripeId: chargeSucceeded.customer,
                },
                    {
                        _id: 0,
                        email: 1,
                    }
                );
                mailInfo = {
                    mailId: email,
                    sub: "Charged",
                    txt: "Charged Successfully, Thank you!",
                    html: "<b>Charged Successfully, Thank you!</b>"
                }
                // console.log('mailInfo====>', mailInfo)
                nodeMailer(mailInfo)
                break;

            case 'customer.subscription.created':
                const customerSubscriptionCreated = event.data.object;
                email = await dbService.findOneRecord("customerModel", {
                    stripeId: customerSubscriptionCreated.customer,
                },
                    {
                        _id: 0,
                        email: 1,
                    }
                );
                mailInfo = {
                    mailId: email,
                    sub: "Subcsription created",
                    txt: "Subcsription created Successfully, Thank you!",
                    html: "<b>Subcsription created Successfully, Thank you!</b>"
                }
                // console.log('mailInfo====>', mailInfo)
                nodeMailer(mailInfo)
                break;
                
            default:
                console.log(`Unhandled event type ${event.type}`);
                break;
        }
        return "Success!"
    }
    catch (error) {
        return error
    }

};
