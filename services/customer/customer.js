const ObjectId = require("mongodb").ObjectId;
import dbService from "../../utilities/dbService";
import {
  encryptpassword,
  decryptPassword,
  generateJwtTokenFn,
} from "../../utilities/universal";
import {
  addCardOnStripe,
  createUserOnStripe,
  updateCardOnStripe,
  deleteCardOnStripe,
  setDefaultCardOnStripe,
  chargeCustomerOnStripe,
  createProductOnStripe,
  createPriceOnStripe,
  createSubscriptionOnStripe
} from "./stripe";

const nodemailer = require('nodemailer');

/*************************** addCustomer ***************************/
export const addCustomer = async (req) => {

  try {
    const user = req.body
    const { email } = user;

    let customerData = await dbService.findOneRecord("customerModel", {
      email: email,
    });

    if (customerData) {
      return "Email Address Already Exists!";
    }
    else {
      let stripeDetail = await createUserOnStripe(user);
      if (stripeDetail.status) {
        req.body.stripeId = stripeDetail.customer?.id;
        let password = await encryptpassword(req.body.password);
        req.body.password = password;
        let result = await dbService.createOneRecord("customerModel", req.body);
        return result;
      }
      else {
        return "User not created!";
      }
    }
  }
  catch (error) {
    throw new Error("error creating a new user!")
  }
};

/*************************** loginCustomer ***************************/
export const onLogin = async (req, res, next) => {
  const payload = req.body;
  console.log("payload==>", payload);
  let userData = await dbService.findOneRecord("customerModel", {
    email: payload.email.toLowerCase(),
    isDeleted: false,
  });
  console.log("userData==>", userData);
  if (!userData) throw new Error("Email not exists");

  let match = await decryptPassword(payload.password, userData.password);
  if (!match) throw new Error("Password Invalid");
  if (userData.isMailVerified == false) throw new Error("Please verify email");

  if (userData?.loginToken) {
    if (userData?.loginToken?.length >= 5) {
      let rr = await dbService.findOneAndUpdateRecord(
        "customerModel",
        { _id: userData._id },
        {
          $pop: { loginToken: -1 },
        },
        { new: true }
      );
    }
  }

  let token = await generateJwtTokenFn({ userId: userData._id });
  let updateData = {
    $push: {
      loginToken: {
        token: token,
      },
    },
    lastLoginDate: Date.now(),
  };

  let data = await dbService.findOneAndUpdateRecord(
    "customerModel",
    { _id: userData._id },
    updateData,
    { new: true }
  );

  // res.setHeader("Access-Control-Expose-Headers", "token");
  // res.setHeader("token", data.loginToken[data.loginToken.length - 1].token);

  return {
    email: data.email,
    lastLogin: data.lastLoginDate,
    token: token,
  };
};

/*************************** getCustomer ***************************/
export const getCustomer = async (req) => {
  console.log("req=>", req);
  let { userId } = req.user
  // let { user: { userId },  } = req
  console.log("userId=>", userId);

  let customerData = await dbService.findAllRecords("customerModel", {
    _id: userId,
    isDeleted: false
  });
  if (customerData.length === 0) {
    return "User not found"
  }
  else {
    return customerData;
  }

};

/*************************** deleteCustomer ***************************/
export const deleteCustomer = async (req) => {
  try {
    let where = {
      _id: ObjectId(req.user.userId)
    }

    let customerData = await dbService.findOneAndUpdateRecord(
      "customerModel",
      where,
      { isDeleted: true },
      { new: true }
    )
    console.log('customerData====>', customerData.isDeleted)
    if (customerData.isDeleted) {
      return "Customer Deleted Successfully";
    }
    else {
      return "Customer not Deleted!"
    }
  } catch (error) {
    return error
  }
};

/*************************** updateCustomer ***************************/
export const updateCustomer = async (req) => {
  try {
    let where = {
      _id: ObjectId(req.user.userId)
    }
    console.log('where====>', where)
    let customerData = await dbService.findOneRecord("customerModel", where);
    if (customerData) {
      let password = await encryptpassword(req.body.password);
      req.body.password = password;
      console.log('req.body====>', req.body)
      let result = await dbService.findOneAndUpdateRecord("customerModel", where, req.body, { new: true });

      return result;
    }
    else {
      throw new Error("User does not Exists!");
    }
  } catch (error) {
    return error
  }
};

/*************************** uploadProfile ***************************/
export const uploadProfile = async (req) => {
  try {
    let where = {
      _id: ObjectId(req.user.userId)
    }

    let result = await dbService.findOneAndUpdateRecord(
      "customerModel",
      where,
      { image: req.body.image },
      {
        new: true
      }
    )

    if (result) {
      return {
        image: result.image
      };
    }
    else {
      throw new Error("Something wents wrong!")
    }
  } catch (error) {
    return error
  }
};

/*************************** addCardDetails ***************************/
export const addCardDetails = async (req) => {

  try {
    const payload = req.body

    let customerData = await dbService.findOneRecord("customerModel", {
      _id: ObjectId(req.user.userId),
    },
      {
        stripeId: 1,
      }
    );

    if (customerData) {
      payload.stripeId = customerData.stripeId
      let result = await addCardOnStripe(payload)
      // console.log('card====>', card)
      if (result.status) {
        return result
      }
      else {
        throw new Error("error adding a card!")
      }
    }
    else {
      return "User not found!";
    }
  }
  catch (error) {
    return error
  }
};

/*************************** updateCardDetails ***************************/
export const updateCardDetails = async (req) => {

  try {
    const payload = req.body

    let customerData = await dbService.findOneRecord("customerModel", {
      _id: ObjectId(req.user.userId),
    },
      {
        stripeId: 1,
      }
    );

    if (customerData) {
      payload.stripeId = customerData.stripeId
      let result = await updateCardOnStripe(payload)
      // console.log('card====>', card)
      if (result.status) {
        return result
      }
      else {
        throw new Error("error adding a card!")
      }
    }
    else {
      return "User not found!";
    }
  }
  catch (error) {
    return error
  }
};

/*************************** deleteCardDetails ***************************/
export const deleteCardDetails = async (req) => {

  try {
    const payload = req.body

    let customerData = await dbService.findOneRecord("customerModel", {
      _id: ObjectId(req.user.userId),
    },
      {
        stripeId: 1,
      }
    );

    if (customerData) {
      payload.stripeId = customerData.stripeId
      let result = await deleteCardOnStripe(payload)
      // console.log('card====>', card)
      if (result.status) {
        return result
      }
      else {
        throw new Error("error adding a card!")
      }
    }
    else {
      return "User not found!";
    }
  }
  catch (error) {
    return error
  }
};

/*************************** setDefaultCardDetails ***************************/
export const setDefaultCardDetails = async (req) => {

  try {
    const payload = req.body

    let customerData = await dbService.findOneRecord("customerModel", {
      _id: ObjectId(req.user.userId),
    },
      {
        stripeId: 1,
      }
    );

    if (customerData) {
      payload.stripeId = customerData.stripeId
      let result = await setDefaultCardOnStripe(payload)
      // console.log('card====>', card)
      if (result.status) {
        return result
      }
      else {
        throw new Error("error adding a card!")
      }
    }
    else {
      return "User not found!";
    }
  }
  catch (error) {
    return error
  }
};

/*************************** chargeCustomer ***************************/
export const chargeCustomer = async (req) => {

  try {
    const payload = req.body

    let customerData = await dbService.findOneRecord("customerModel", {
      _id: ObjectId(req.user.userId),
    },
      {
        stripeId: 1,
      }
    );

    if (customerData) {
      payload.stripeId = customerData.stripeId
      let result = await chargeCustomerOnStripe(payload)
      // console.log('card====>', card)
      if (result.status) {
        return result
      }
      else {
        throw new Error("error adding a card!")
      }
    }
    else {
      return "User not found!";
    }
  }
  catch (error) {
    return error
  }
};

/*************************** recurringChargeCustomer ***************************/
export const recurringChargeCustomer = async (req) => {

  try {
    const payload = req.body

    let customerData = await dbService.findOneRecord("customerModel", {
      _id: ObjectId(req.user.userId),
    },
      {
        stripeId: 1,
      }
    );

    if (customerData) {
      payload.stripeId = customerData.stripeId

      let product = await createPriceOnStripe(payload)
      // console.log('product====>', product)

      if (product.status) {

        payload.priceId = product.price.id
        let result = await createSubscriptionOnStripe(payload)

        if (result.status) {

          payload.subscriptionId = result.subscription.id
          payload.mainUserId = req.user.userId
          payload.createdBy = req.user.userId

          let subscription = await dbService.createOneRecord("subscriptionModel", payload)
          // if (subscription) {
          //   let transporter = nodemailer.createTransport({
          //     host: 'smtp.gmail.com',
          //     port: 465, // Secure port, alternatively use 587 for non-secure (with secure: false)
          //     secure: true, // true for 465, false for other ports
          //     auth: {
          //       user: 'rahulmangukiya7990@gmail.com', // Your Gmail address
          //       pass: 'cbsn mbzx nmuw nqae' // Your Gmail "App Password"
          //     }
          //   });
          //   let mailOptions = {
          //     from: 'rahulmangukiya7990@gmail.com',
          //     to: 'vipima1514@artgulin.com',
          //     subject: 'Hello ✔',
          //     text: 'Hello, your subscription is successfully created',
          //     html: '<b>subscription is successfull</b>'
          //   };
          //   console.log('mailOptions====>', mailOptions)
          //   transporter.sendMail(mailOptions, (error, info) => {
          //     if (error) {
          //       return console.log(error);
          //     }
          //     console.log('Message sent: %s', info.messageId);
          //   });

          // }

          return result
        }
        else {
          throw new Error("error creating a subscription!")
        }

      }
      else {
        throw new Error("error creating a product!")
      }

    }
    else {
      return "User not found!";
    }
  }
  catch (error) {
    return error
  }
};
