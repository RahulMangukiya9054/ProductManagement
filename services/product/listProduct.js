const ObjectId = require("mongodb").ObjectId;
import dbService from "../../utilities/dbService";
import { paginationFn } from "../../utilities/pagination";

/*************************** listProduct ***************************/
export const listProduct = async (req) => {
  // console.log("req.body;=>", req.body);

  let { page = 1, limit = 0 } = req.body;

  const { docLimit, noOfDocSkip } = paginationFn({ page, limit });
  // let skip = page * limit - limit;

  let where = {
    mainUserId: ObjectId(req.user.userId),
    isDeleted: false,
  };

  let count = await dbService.recordsCount("productModel", where);

  let productData = await dbService.findManyRecordsWithPagination(
    "productModel",
    where,
    { sort: { productName: 1 }, limit: docLimit, skip: noOfDocSkip },
    {
      productName: 1,
      productSKU: 1,
      productType: 1,
      companyName: 1,
      productPrice: 1
    }
  );
  // console.log('productData', productData)
  if (productData.length == 0) {
    return "No products found!"
  }
  else{
    return { productData, page: page, limit: limit, count: count };
  }
};