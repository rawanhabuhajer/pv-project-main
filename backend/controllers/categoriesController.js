const Category = require("../models/categoriesModal");
const User = require("../models/userModel");
const Sub = require("../models/subCategoryModel");
const mongoose = require("mongoose");

exports.getAllCategories = async (req, res, next) => {
  const userId = req?.params?.userId;
  const page = parseInt(req?.query?.pageNumber) || 1;
  const limit = parseInt(req?.query?.pageSize) || 10;
  const sortBy = req?.query?.sortBy || "updatedAt";
  const order = req?.query?.order === "asc" ? 1 : -1;
  const search = req?.query?.search || "";
  const status = req?.query?.status;

  try {
    const skip = (page - 1) * limit;

    // Build match filter
    const matchFilter = {
      userId: new mongoose.Types.ObjectId(userId),
      name: { $regex: search, $options: "i" },
    };

    if (status) {
      matchFilter.status = parseInt(status);
    }

    // Step 1: Count for pagination
    const totalCategories = await Category.countDocuments(matchFilter);

    // Step 2: Aggregation pipeline
    const categories = await Category.aggregate([
      { $match: matchFilter },
      { $sort: { [sortBy]: order } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "subcategories",
          localField: "subcategories",
          foreignField: "_id",
          as: "subcategoriesDetails",
        },
      },
      {
        $addFields: {
          subcategoryStatus3Count: {
            $size: {
              $filter: {
                input: "$subcategoriesDetails",
                as: "sub",
                cond: { $eq: ["$$sub.status", 3] },
              },
            },
          },
        },
      },
      {
        $project: {
          subcategoriesDetails: 0,
        },
      },
    ]);

    // Step 3: Send response
    res.status(200).json({
      responseData: {
        isSuccess: true,
        count: categories.length,
        pageIndex: page,
        pageSize: limit,
        totalPages: Math.ceil(totalCategories / limit),
        totalCategories,
        items: categories,
      },
    });
  } catch (err) {
    console.error("Error in getAllCategories:", err);
    res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.getCategory = async (req, res, next) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return next(new AppError("No category found with that ID", 404)); // If no category is found
    }

    res.status(200).json({
      isSuccess: true,
      responseData: {
        category,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name, description, subcategories, deadline, status } = req.body;
    const userId = req.params.userId;

    const newCategory = await Category.create({
      name,
      description,
      userId: userId,
      subcategories,
      deadline,
      status,
    });

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { categories: newCategory._id } },
      { new: true }
    );

    res.status(201).json({
      isSuccess: true,
      responseData: {
        category: newCategory,
        user: user,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      isSuccess: false,
      message: "Error creating category",
      error: err.message,
    });
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res
        .status(404)
        .json({ error: "Category not found or access denied" });
    }

    res.status(200).json({
      isSuccess: true,
      responseData: { category },
    });
  } catch (err) {
    console.error("Error updating category:", err);
    res.status(500).json({ error: "Error updating category" });
  }
};

exports.deleteCategory = async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    throw Error("No category found with that ID", 404);
  }

  res.status(200).json({
    isSuccess: true,
    responseData: {},
    message: "Deleted successfully",
  });
};
