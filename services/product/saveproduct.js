/**
* This is for Contain function layer for contractor service.
* @author Sandip Vaghasiya
*
*/

const ObjectId = require("mongodb").ObjectId;
import dbService from "../../utilities/dbService";

/*************************** addProduct ***************************/
export const addProduct = async (req) => {
   console.log("req service =>", req.body);

   const { productName } = req.body;

   let existingProducts = await dbService.findAllRecords("productModel", {
      mainUserId: ObjectId(req.user.userId),
      isDeleted: false
   }, { _id: 0, productName: 1 });

   let existingProductNames = existingProducts.map(item => item.productName.toLowerCase());

   if (existingProductNames.includes(productName.toLowerCase())) {
      throw new Error("Product Name Already Exists!");
   }
   else {

      req.body.mainUserId = req.user?.userId;
      req.body.createdBy = req.user?.userId;

      let project = await dbService.createOneRecord("productModel", req.body);
      return project;
   }
};

/*************************** addbulkProduct ***************************/
export const addbulkProduct = async (req) => {
   // console.log("req service ====>", req.body);

   try {
      let products = req.body
      // console.log('Beforeproducts====>', products)

      let existingProducts = await dbService.findAllRecords("productModel", {
         mainUserId: ObjectId(req.user.userId),
         isDeleted: false
      }, { _id: 0, productName: 1 });

      let existingProductNames = existingProducts.map(item => item.productName.toLowerCase());
      
      let uniqueProducts = products.filter((product) => {
         const lowercaseName = product.productName.toLowerCase();
         return !existingProductNames.includes(lowercaseName)
      });

      // console.log('uniqueProductsLength====>', uniqueProducts.length)

      let result = await dbService.createManyRecords("productModel", uniqueProducts);
      
      if (result.length === 0) return "No new products to add in the file.";
      else return "Products added Successfully!"

   } catch (error) {
      console.error("Error adding bulk products:", error);
      throw new Error("Failed to add bulk products.");
   }
};
