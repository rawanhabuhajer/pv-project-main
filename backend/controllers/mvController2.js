const MvCategory = require("../models/mvCableModal");
const User = require("../models/userModel");

exports.getAllMvCategories = async (req, res, next) => {
  const userId = req.params.userId;
  const page = parseInt(req.query.pageNumber) || 1;
  const limit = parseInt(req.query.pageSize) || 10;
  const sortBy = req.query.sortBy || "updatedAt";
  const order = req.query.order === "asc" ? 1 : -1;
  const search = req.query.search || "";
  const status = parseInt(req.query.status); // 👈 optional status filter

  try {
    const skip = (page - 1) * limit;

    const searchCondition = {
      userId,
      name: { $regex: search, $options: "i" },
    };

    // 👇 Add status filter if provided and valid (1, 2, or 3)
    if ([1, 2, 3].includes(status)) {
      searchCondition.status = status;
    }

    const totalCategories = await MvCategory.countDocuments(searchCondition);

    const Mvcategories = await MvCategory.find(searchCondition)
      .select("createdAt description name updatedAt status deadline")
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      status: "success",
      responseData: {
        result: Mvcategories?.length,
        count: totalCategories,
        pageSize: limit,
        pageIndex: page,
        items: Mvcategories,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getMvCategory = async (req, res, next) => {
  const categoryId = req.params.id;

  try {
    console.log("Fetching category with ID:", categoryId); // Debugging

    const categoryMv = await MvCategory.findById(categoryId);

    if (!categoryMv) {
      return res.status(404).json({
        status: "error",
        message: "No category found with that ID",
      });
    }

    res.status(200).json({
      status: "success",
      responseData: {
        category: categoryMv,
      },
    });
  } catch (err) {
    console.error("Error fetching category:", err); // Debugging
    res.status(500).json({
      status: "error",
      message: "Error retrieving the category",
    });
  }
};
exports.createMvCategory = async (req, res, next) => {
  try {
    const { name, description, deadline, status } = req.body;
    const userId = req.params.userId;

    const newMvCategory = await MvCategory.create({
      name,
      description,
      userId: userId,
      deadline,
      status,
    });

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { categories: newMvCategory._id } },
      { new: true }
    );

    res.status(201).json({
      isSuccess: true,
      message: "created successfully",
      responseData: {},
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      isSuccess: false,
      message: "Error creating MvCategory",
      error: err.message,
    });
  }
};

exports.updateMvCategory = async (req, res, next) => {
  const categoryId = req.params.id;

  try {
    const { name, description, status, deadline } = req.body;
    const updatedCategory = await MvCategory.findByIdAndUpdate(
      categoryId,
      { name, description, status, deadline },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return next(new AppError("No category found with that ID", 404));
    }
    res.status(200).json({
      isSuccess: true,
      responseData: {
        category: updatedCategory,
      },
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      message: "Error updating MvCategory",
      error: err.message,
    });
  }
};

exports.deleteMvCategory = async (req, res, next) => {
  const category = await MvCategory.findByIdAndDelete(req.params.id);
  if (!category) {
    throw Error("No category found with that ID", 404);
  }

  res.status(200).json({
    isSuccess: true,
    responseData: {},
    message: "Deleted successfully",
  });
};
