const ObjectId = require("mongodb").ObjectId;
import dbService from "../../utilities/dbService";


/*************************** addContractor ***************************/
export const addContractor = async (req, mainUserId, createdBy) => {
  const { email } = req.body;

    let contractorData = await dbService.findOneRecord("contractorModel",{ email: email });
    if (contractorData) {
      throw new Error("Email Address Already Exists!");
    } else {

      req.body.mainUserId = req.user?.userId;
      req.body.createdBy = req.user?.userId;

      let project = await dbService.createOneRecord("contractorModel",req.body);
     
      return "data inserted";
    }
  
};

/*************************** getcontractors ***************************/
export const getcontractor = async (req, mainUserId, createdBy) => {
  let postData = req.body;
  let { page = 1, limit = 0 } = req.body;
  let skiprecord = limit * page - limit;
  let ctype = postData.contractorType;
  let where = {
    mainUserId: ObjectId(req.user.userId),
    isDeleted: false,
  };
  // console.log('ctype===>', ctype)
  if (ctype && ctype.length) {
    where["contractorType"] = { $in: ctype };
  }

  if (postData.searchText) {
    // where["firstName"] = { $regex: postData.searchText, $options: "i" };
    //where["lastName"] =  { $regex: postData.searchText, $options: "i" };
    where = {
      ...where,
      ...{
        $or: [
          { firstName: { $regex: postData.searchText, $options: "i" } },
          { lastName: { $regex: postData.searchText, $options: "i" } },
          { companyName: { $regex: postData.searchText, $options: "i" } },
        ],
      },
    };
  }

  let sort = {};

  if (postData.sortBy && postData.sortMode) {
    if (postData.sortBy == 'fullName') {
      sort["firstName"] = postData.sortMode;
    }
    else {
      sort[postData.sortBy] = postData.sortMode;
    }
  } else {
    sort["createdAt"] = -1;
  }

 let totalrecord = await dbService.recordsCount("contractorModel",where);
  var results = await dbService.findAllRecords("contractorModel",
    where,
    {},
    sort,
    skiprecord,
    limit  
  );

  var result = JSON.parse(JSON.stringify(results));
  if (result.length !== 0) {
    for (let i = 0; i < result.length; i++) {
      result[i].fullName = `${result[i].firstName} ${result[i].lastName}`;
      console.log('result[i].fullName====>', result[i].fullName)
    }
  }
  else {
    throw new Error("Contractor Not found");
  }
  return {
    status: "Success",
    message: "all Contractor fetched successfully.",
    items: result,
    page: page,
    limit: limit,
    totalrecords: totalrecord,
  };
};

/*************************** getcontractorwithid ***************************/
export const getcontractorwithid = async (req, mainUserId, createdBy) => {
  let fileCount = 0;
  let where = {
    _id: req.body.id,
    mainUserId: ObjectId(req.user.userId),
    isDeleted: false,
  };
  console.log("where=====>",where)
  let result = await dbService.findOneRecord("contractorModel",where);
  console.log("Result=====>",result)
  if (result) {
    let folderAggregateQuery = [
      { $match: { isDeleted: false, subModuleId: result._id } },
      // {
      //   $lookup: {
      //     from: "files",
      //     let: { folderId: "$_id" },
      //     pipeline: [
      //       {
      //         $match: {
      //           $expr: { $eq: ["$folderId", "$$folderId"] },
      //           isDeleted: false,
      //         },
      //       },
      //     ],
      //     as: "fileData",
      //   },
      // },
      // {
      //   $group: {
      //     _id: null,
      //     fileCount: {
      //       $sum: {
      //         $size: "$fileData",
      //       },
      //     },
      //   },
      // },
    ];
    // [[{ fileCount = 0 } = {}]] = await Promise.all([
    //   await FolderModel.aggregateData(folderAggregateQuery),
    // ]);
    return { result, fileCount };
  } else {
    return { result, fileCount };

  }

};

/*************************** deletecontractor ***************************/
export const deletecontractor = async (req, mainUserId, createdBy) => {
    let where = {
      _id: req.body.id,
      mainUserId: ObjectId(req.user.userId),
    };
    // console.log("where====>",where);
    let contractordata = await dbService.findOneAndUpdateRecord("contractorModel", where, {
      isDeleted: true,
    });
    if (contractordata) {
      return "contractor deleted";
    }
    else {
      throw new Error("Contractor Not found");
    }
};

/*************************** updatecontractor ***************************/
export const updatecontractor = async (req, mainUserId, createdBy) => {
  req.body["updatedAt"] = new Date();

  // console.log("body====>",req.body);
  if (req.body.email == "" || !req.body.email) {
    let project = await dbService.findOneAndUpdateRecord("contractorModel",
      { _id: ObjectId(req.body.id) },
      req.body
    );
    return "data updated";
  } else {
    let contractorData = await dbService.findOneRecord("contractorModel",{
      _id: { $ne: ObjectId(req.body.id) },
      email: req.body.email,
    });
    if (contractorData) {
      throw new Error("Email Address Already Exists!");
    } else {
      let project = await dbService.findOneAndUpdateRecord("contractorModel",
        { _id: ObjectId(req.body.id) },
        req.body,
        {new: true}
      );
      return project;
    }
  }
};
