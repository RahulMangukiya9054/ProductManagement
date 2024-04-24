import multer from 'multer';
import csvtojson from 'csvtojson';

const handleMultipartData = multer({ limits: { fileSize: 1000000 * 5 } }).single("csvFile"); // ==> name ("csvFile") will be same as name specify in swaggerui configuration

export const handleCsv = async (req, res, next) => {
    handleMultipartData(req, res, async (err) => {
        if (err) {
            res.json({ msgs: err.message });
        } else {
            const fileBuffer = req.file.buffer;

            if (!fileBuffer) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            // console.log('fileBuffer.toString()====>', fileBuffer.toString())

            // Convert CSV buffer to JSON
            csvtojson().fromString(fileBuffer.toString())
                .then(async (jsonArray) => {

                    let uniqueProducts = [];
                    let productName = [];

                    jsonArray.map((item) => {
                        // If the product name is not already in the Array, push it to the Array and push the product to the uniqueProducts array
                        const lowercaseName = item.productName.toLowerCase(); // Convert product name to lowercase
                        if (!productName.includes(lowercaseName)) {
                            productName.push(lowercaseName);
                            uniqueProducts.push(item);
                        }
                    });

                    uniqueProducts.map((e) => {
                        e.productPrice = parseFloat(e.productPrice);
                        e.mainUserId = req.user.userId;
                        e.createdBy = req.user.userId;
                    })

                    req.body = uniqueProducts;
                    // console.log('req.body====>', req.body);
                    // res.json(uniqueProducts);
                    next()
                })
                .catch((error) => {
                    res.status(500).json({ error: 'Error converting CSV to JSON' });
                });
        }
    });
};
