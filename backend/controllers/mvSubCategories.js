const Subcategory = require("../models/mvSubcategoriesModel");
const Category = require("../models/mvCableModal");

exports.createSubcategory = async (req, res, next) => {
  try {
    const { name, description, details, tableData } = req.body;
    const categoryId = req.params.id;

    const newSubcategory = await Subcategory.create({
      name,
      description,
      details,
      tableData,
      category: categoryId,
    });

    await Category.findByIdAndUpdate(
      categoryId,
      { $push: { subcategories: newSubcategory._id } },
      { new: true }
    );

    res.status(201).json({
      isSuccess: true,
      responseData: {
        subcategory: newSubcategory,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      isSuccess: false,
      message: "Error creating subcategory",
      error: err.message,
    });
  }
};

exports.getSubcategoriesByCategory = async (req, res, next) => {
  const categoryId = req.params.id;
  const page = parseInt(req.query.pageNumber) || 1;
  const limit = parseInt(req.query.pageSize) || 10;
  const sortBy = req.query.sortBy || "updatedAt";
  const order = req.query.order === "asc" ? 1 : -1;
  const search = req.query.search || "";
  const status = req.query.status;

  try {
    const skip = (page - 1) * limit;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        isSuccess: false,
        message: "Category not found",
      });
    }

    const subcategoryFilter = {
      category: categoryId,
      name: { $regex: search, $options: "i" },
    };

    if (status) {
      subcategoryFilter.status = parseInt(status);
    }

    const totalSubcategories = await Subcategory.countDocuments(
      subcategoryFilter
    );

    const subcategories = await Subcategory.find(subcategoryFilter)
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      isSuccess: true,
      responseData: {
        categoryName: category.name,
        count: subcategories?.length,
        pageIndex: page,
        pageSize: limit,
        totalPages: Math.ceil(totalSubcategories / limit),
        totalSubcategories,
        items: subcategories,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      isSuccess: false,
      message: "Error getting subcategories",
      error: err.message,
    });
  }
};

exports.getSubCategoryById = async (req, res, next) => {
  try {
    const subcategoryId = req.params.subcategoryId;
    const CategoryName = await Subcategory.findById(subcategoryId).populate(
      "category"
    );
    const subcategory = await Subcategory.findById(subcategoryId);

    if (!subcategory) {
      return res.status(404).json({
        isSuccess: false,
        message: "Subcategory not found",
      });
    }

    res.status(200).json({
      isSuccess: true,
      responseData: {
        subcategory,
        categoryName: CategoryName.category?.name || null,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      isSuccess: false,
      message: "Error getting subcategory",
      error: err.message,
    });
  }
};

exports.updateSubcategory = async (req, res, next) => {
  try {
    const subcategoryId = req.params.subcategoryId;
    const { details } = req.body; // Assuming the request body contains the updated 'data' field

    // Update the 'data' field of the subcategory by its ID
    const subcategory = await Subcategory.findByIdAndUpdate(
      subcategoryId,
      { details },
      { new: true }
    );

    // Check if the subcategory exists
    if (!subcategory) {
      return res.status(404).json({
        isSuccess: false,
        message: "Subcategory not found",
      });
    }

    res.status(200).json({
      isSuccess: true,
      responseData: {
        details,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      isSuccess: false,
      message: "Error updating subcategory",
      error: err.message,
    });
  }
};

exports.updateSubcategoryInfo = async (req, res, next) => {
  try {
    const subcategoryId = req.params.subcategoryId;
    const { name, description, status } = req.body;
    if (!name && !description && !status) {
      return res.status(400).json({
        isSuccess: false,
        message: "you have to edit one thing at least",
      });
    }
    const updateFields = {};
    if (name) {
      updateFields.name = name;
    }
    if (description) {
      updateFields.description = description;
    }
    if (status !== undefined) {
      updateFields.status = status;
    }
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      subcategoryId,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedSubcategory) {
      return res.status(404).json({
        isSuccess: false,
        message: "Subcategory not found",
      });
    }

    res.status(200).json({
      isSuccess: true,
      responseData: updatedSubcategory,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      isSuccess: false,
      message: "Error updating subcategory",
      error: err.message,
    });
  }
};

exports.deleteSubcategory = async (req, res, next) => {
  try {
    const subcategoryId = req.params.subcategoryId;

    const subcategory = await Subcategory.findById(subcategoryId);

    if (!subcategory) {
      return res.status(404).json({
        isSuccess: false,
        message: "Subcategory not found",
      });
    }

    const categoryId = subcategory.category;

    // Delete the subcategory
    await Subcategory.findByIdAndDelete(subcategoryId);

    // Pull subcategory ID from category.subcategories
    await Category.findByIdAndUpdate(categoryId, {
      $pull: { subcategories: subcategoryId },
    });

    res.status(200).json({
      isSuccess: true,
      message: "Subcategory deleted and removed from category",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      isSuccess: false,
      message: "Error deleting subcategory",
      error: err.message,
    });
  }
};
