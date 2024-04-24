const stripe = require("stripe")(process.env.STRIPE_SK); // Use secret key here
// let stripe_sk = process.env.STRIPE_SK;

// Create customer on stripe
export const createUserOnStripe = async (payload) => {
    // console.log('payload====>', payload)

    return new Promise((resolve, reject) => {
        stripe.customers
            .create({
                email: payload.email,
                name: payload.firstName + " " + payload.lastName,
                phone: payload.phone
            })
            .then((customer) => {
                // console.log('customer====>', customer)
                resolve({ status: true, customer });
            })
            .catch((error) => {
                reject({ status: false, error });
            });
    });
}


// Add card on stripe
export const addCardOnStripe = async (payload) => {
    // console.log('payload====>', payload)

    try {
        return new Promise((resolve, reject) => {
            stripe.customers
                .createSource(
                    payload.stripeId,
                    { source: payload.cardToken }
                )
                .then((card) => {
                    // console.log('card====>', card)
                    resolve({ status: true, card });
                })
                .catch((error) => {
                    reject({ status: false, error });
                });
        })
    } catch (error) {
        console.log('error====>', error)
    }
}

// Update card on stripe
export const updateCardOnStripe = async (payload) => {
    // console.log('payload====>', payload)
    const { name, address, expMonth, expYear } = payload

    try {
        return new Promise((resolve, reject) => {
            stripe.customers
                .updateSource(
                    payload.stripeId,
                    payload.cardId,
                    {
                        name: name,
                        address_zip: address,
                        exp_month: expMonth,
                        exp_year: expYear,
                    }
                )
                .then((card) => {
                    // console.log('card====>', card)
                    resolve({ status: true, card });
                })
                .catch((error) => {
                    reject({ status: false, error });
                });
        })
    } catch (error) {
        console.log('error====>', error)
    }
}

// Delete card on stripe
export const deleteCardOnStripe = async (payload) => {
    // console.log('payload====>', payload)

    try {
        return new Promise((resolve, reject) => {
            stripe.customers
                .deleteSource(
                    payload.stripeId,
                    payload.cardId
                )
                .then((card) => {
                    // console.log('card====>', card)
                    resolve({ status: true, card });
                })
                .catch((error) => {
                    reject({ status: false, error });
                });
        })
    } catch (error) {
        console.log('error====>', error)
    }
}

// Set default card on stripe
export const setDefaultCardOnStripe = async (payload) => {
    // console.log('payload====>', payload)

    try {
        return new Promise((resolve, reject) => {
            stripe.customers
                .update(
                    payload.stripeId,
                    { default_source: payload.cardId }
                )
                .then((card) => {
                    // console.log('card====>', card)
                    resolve({ status: true, card });
                })
                .catch((error) => {
                    reject({ status: false, error });
                });
        })
    } catch (error) {
        console.log('error====>', error)
    }
}

// Charge a customer on stripe
export const chargeCustomerOnStripe = async (payload) => {
    // console.log('payload====>', payload)

    try {
        return new Promise((resolve, reject) => {
            stripe.charges
                .create({
                    amount: payload.amount * 100,
                    currency: payload.currency,
                    source: payload.cardId,
                    customer: payload.stripeId
                })
                .then((charge) => {
                    // console.log('charge====>', charge)
                    resolve({ status: true, charge });
                })
                .catch((error) => {
                    reject({ status: false, error });
                });
        })
    } catch (error) {
        console.log('error====>', error)
    }
}

// // Create a Product on stripe
// export const createProductOnStripe = async (payload) => {
//     // console.log('createProductOnStripe====>', payload)

//     try {
//         return new Promise((resolve, reject) => {
//             stripe.products
//                 .create({
//                     name: payload.productName
//                 })
//                 .then((product) => {
//                     // console.log('product====>', product)
//                     resolve({ status: true, product });
//                 })
//                 .catch((error) => {
//                     reject({ status: false, error });
//                 });
//         })
//     } catch (error) {
//         console.log('error====>', error)
//     }
// }

// Create a Price on stripe
export const createPriceOnStripe = async (payload) => {
    // console.log('createPriceOnStripe====>', payload)

    const { amount, interval, productName } = payload

    try {
        return new Promise((resolve, reject) => {
            stripe.prices
                .create({
                    currency: "usd",
                    unit_amount: amount,
                    recurring: {
                        interval: interval,
                    },
                    product_data: {
                        name: productName
                    },
                })
                .then((price) => {
                    // console.log('price====>', price)
                    resolve({ status: true, price });
                })
                .catch((error) => {
                    reject({ status: false, error });
                });
        })
    } catch (error) {
        console.log('error====>', error)
    }
}

// Create a Price on stripe
export const createSubscriptionOnStripe = async (payload) => {
    // console.log('createSubscriptionOnStripe====>', payload)

    const { stripeId, priceId } = payload

    try {
        return new Promise((resolve, reject) => {
            stripe.subscriptions
                .create({
                    customer: stripeId,
                    items: [
                        {
                            price: priceId,
                        },
                    ],
                })
                .then((subscription) => {
                    // console.log('subscription====>', subscription)
                    resolve({ status: true, subscription });
                })
                .catch((error) => {
                    reject({ status: false, error });
                });
        })
    } catch (error) {
        console.log('error====>', error)
    }
}
