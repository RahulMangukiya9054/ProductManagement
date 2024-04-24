const ObjectId = require("mongodb").ObjectId;
import dbService from "../../utilities/dbService";
const { Parser } = require("json2csv");


/*************************** getProductWithId ***************************/
export const getProductwithid = async (req) => {
    let where = {
        _id: req.body.id,
        mainUserId: ObjectId(req.user.userId),
        isDeleted: false
    }
    let productData = await dbService.findOneRecord("productModel", where);
    if (productData) {
        return productData;
    }
    else {
        throw new Error("Product Not found");
    }

};

/*************************** deleteProduct ***************************/
export const deleteproduct = async (req) => {
    let where = {
        _id: req.body.id,
        mainUserId: ObjectId(req.user.userId),
        isDeleted: false
    }
    let deleteProduct = await dbService.findOneAndUpdateRecord("productModel", where, { isDeleted: true });
    if (deleteProduct) {
        return "product deleted";
    }
    else {
        throw new Error("Product Not found");
    }
}

/*************************** updateProduct ***************************/
export const updateproduct = async (req) => {
    req.body["updatedAt"] = new Date();
    req.body["isUpdated"] = true;
    let where = {
        _id: req.body.id,
        mainUserId: ObjectId(req.user.userId),
        isDeleted: false
    }

    let updateProduct = await dbService.findOneAndUpdateRecord("productModel", where, req.body, { new: true })
    if (updateProduct) {
        return updateProduct;
    }
    else {
        throw new Error("Product Not found");
    }
}

/*************************** getProductsCsv ***************************/
export const getProductsCsv = async (req) => {
    let where = {
        mainUserId: ObjectId(req.user.userId),
        isDeleted: false
    }

    let productData = await dbService.findAllRecords(
        "productModel",
        where,
        {
            _id: 0,
            productName: 1,
            productSKU: 1,
            productType: 1,
            companyName: 1,
            productPrice: 1
        }
    );

    const productsField = [
        {
          label: "Product Name",
          value: "productName",
        },
        {
          label: "Product SKU",
          value: "productSKU",
        },
        {
          label: "Product Type",
          value: "productType",
        },
        {
          label: "Company Name",
          value: "companyName",
        },
        {
          label: "Product Price",
          value: "productPrice",
        }
      ];

    if (productData && productData.length > 0) {
        const json2csvParser = new Parser({
            fields: productsField,
        });
        const csv = json2csvParser.parse(productData);
        // console.log('csv====>', csv);
        return {
            csvFile: csv,
            headers: {
                'ContentType': 'text/csv'
            }
        }
    }
    else {
        throw new Error("Product Not found");
    }
}