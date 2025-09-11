const Category = require("../models/categoriesModal");
const MvCategory = require("../models/mvCableModal");
const mongoose = require("mongoose");

exports.getProjectsNearDeadline = async (req, res) => {
  const userId = req.params.userId;

  try {
    const now = new Date();
    const threeDaysLater = new Date();
    threeDaysLater.setDate(now.getDate() + 3);

    const [categories, mvCategories] = await Promise.all([
      Category.find({
        userId: new mongoose.Types.ObjectId(userId),
        deadline: { $gte: now, $lte: threeDaysLater },
      }).sort({ deadline: 1 }),

      MvCategory.find({
        userId: new mongoose.Types.ObjectId(userId),
        deadline: { $gte: now, $lte: threeDaysLater },
      }).sort({ deadline: 1 }),
    ]);

    res.status(200).json({
      isSuccess: true,
      responseData: {
        total: categories.length + mvCategories.length,
        categories,
        mvCategories,
      },
    });
  } catch (err) {
    console.error("Error in getProjectsNearDeadline:", err);
    res.status(500).json({
      isSuccess: false,
      message: "Failed to fetch projects near deadline",
      error: err.message,
    });
  }
};

exports.getCategoryStats = async (req, res, next) => {
  const userId = req.params.userId;
  const { createdFrom, createdTo, deadlineFrom, deadlineTo } = req.query;

  try {
    const matchStage = {
      userId: new mongoose.Types.ObjectId(userId),
    };

    if (createdFrom || createdTo) {
      matchStage.createdAt = {};
      if (createdFrom) matchStage.createdAt.$gte = new Date(createdFrom);
      if (createdTo) matchStage.createdAt.$lte = new Date(createdTo);
    }

    if (deadlineFrom || deadlineTo) {
      matchStage.deadline = {};
      if (deadlineFrom) matchStage.deadline.$gte = new Date(deadlineFrom);
      if (deadlineTo) matchStage.deadline.$lte = new Date(deadlineTo);
    }

    const stats = await Category.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const totalCategories = stats.reduce((acc, item) => acc + item.count, 0);

    // Initialize with 0 for all statuses
    const statusCounts = { pending: 0, inProgress: 0, completed: 0 };
    const statusPercentages = { pending: 0, inProgress: 0, completed: 0 };

    stats.forEach((item) => {
      const count = item.count;
      const key =
        item._id === 1
          ? "pending"
          : item._id === 2
          ? "inProgress"
          : "completed";

      statusCounts[key] = count;
      statusPercentages[key] =
        totalCategories === 0
          ? 0
          : ((count / totalCategories) * 100).toFixed(2);
    });

    res.status(200).json({
      status: "success",
      data: {
        totalCategories,
        statusCounts,
        statusPercentages,
      },
    });
  } catch (err) {
    console.error("Error in getCategoryStats:", err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getMvCategoryStats = async (req, res, next) => {
  const userId = req.params.userId;
  const { createdFrom, createdTo, deadlineFrom, deadlineTo } = req.query;

  try {
    const matchStage = {
      userId: new mongoose.Types.ObjectId(userId),
    };

    if (createdFrom || createdTo) {
      matchStage.createdAt = {};
      if (createdFrom) matchStage.createdAt.$gte = new Date(createdFrom);
      if (createdTo) matchStage.createdAt.$lte = new Date(createdTo);
    }

    if (deadlineFrom || deadlineTo) {
      matchStage.deadline = {};
      if (deadlineFrom) matchStage.deadline.$gte = new Date(deadlineFrom);
      if (deadlineTo) matchStage.deadline.$lte = new Date(deadlineTo);
    }

    const stats = await MvCategory.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const totalCategories = stats.reduce((acc, item) => acc + item.count, 0);

    // Initialize with 0 for all statuses
    const statusCounts = { pending: 0, inProgress: 0, completed: 0 };
    const statusPercentages = { pending: 0, inProgress: 0, completed: 0 };

    stats.forEach((item) => {
      const count = item.count;
      const key =
        item._id === 1
          ? "pending"
          : item._id === 2
          ? "inProgress"
          : "completed";

      statusCounts[key] = count;
      statusPercentages[key] =
        totalCategories === 0
          ? 0
          : ((count / totalCategories) * 100).toFixed(2);
    });

    res.status(200).json({
      status: "success",
      data: {
        totalCategories,
        statusCounts,
        statusPercentages,
      },
    });
  } catch (err) {
    console.error("Error in getMvCategoryStats:", err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getProjectsByYear = async (req, res) => {
  try {
    const userId = req?.params?.userId;
    const year = parseInt(req?.query?.year) || new Date().getFullYear(); // 👈 default to current year

    if (!userId) {
      return res
        .status(400)
        .json({ status: "error", message: "UserId is required" });
    }

    const projectsByMonth = await Category.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          totalProjects: { $sum: 1 },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    // Normalize: make sure all 12 months appear (0 if empty)
    const months = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      totalProjects: 0,
    }));

    projectsByMonth.forEach((item) => {
      months[item._id.month - 1].totalProjects = item.totalProjects;
    });

    res.status(200).json({
      responseData: {
        status: "success",
        year,
        items: months,
      },
    });
  } catch (err) {
    console.error("Error in getProjectsByYear:", err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getMvProjectsByYear = async (req, res) => {
  try {
    const userId = req?.params?.userId;
    const year = parseInt(req?.query?.year) || new Date().getFullYear();

    if (!userId) {
      return res
        .status(400)
        .json({ status: "error", message: "UserId is required" });
    }

    const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

    const projectsByMonth = await MvCategory.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          totalProjects: { $sum: 1 },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    // normalize 12 months
    const months = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      totalProjects: 0,
    }));

    projectsByMonth.forEach((item) => {
      months[item._id.month - 1].totalProjects = item.totalProjects;
    });

    res.status(200).json({
      responseData: {
        status: "success",
        year,
        items: months,
      },
    });
  } catch (err) {
    console.error("Error in getMvProjectsByYear:", err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getLatestProjects = async (req, res) => {
  try {
    const userId = req.params.userId;
    const limit = parseInt(req.query.limit) || 4; // default return 5 latest

    // ✅ Fetch PV projects
    const pvProjects = await Category.find({
      userId: new mongoose.Types.ObjectId(userId),
    })
      .select("_id name status deadline createdAt")
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    // ✅ Fetch MV projects
    const mvProjects = await MvCategory.find({
      userId: new mongoose.Types.ObjectId(userId),
    })
      .select("_id name status deadline createdAt")
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    // ✅ Add type field
    const pvFormatted = pvProjects.map((p) => ({
      id: p._id,
      name: p.name,
      type: "pv",
      status: p.status,
      deadline: p.deadline,
      createdAt: p.createdAt,
    }));

    const mvFormatted = mvProjects.map((m) => ({
      id: m._id,
      name: m.name,
      type: "mv",
      status: m.status,
      deadline: m.deadline,
      createdAt: m.createdAt,
    }));

    // ✅ Merge and sort by latest createdAt
    const allProjects = [...pvFormatted, ...mvFormatted].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.status(200).json({
      status: "success",
      responseData: {
        total: allProjects.length,
        items: allProjects.slice(0, limit), // final limit
      },
    });
  } catch (err) {
    console.error("Error in getLatestProjects:", err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
