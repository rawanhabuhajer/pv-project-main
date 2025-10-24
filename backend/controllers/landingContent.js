const LandingContent = require("../models/landingContent");
// GET all sections
exports.getAllSections = async (req, res) => {
  try {
    const sections = await LandingContent.find();
    res.status(200).json({ isSuccess: true, sections });
  } catch (err) {
    console.error(err);
    res.status(500).json({ isSuccess: false, error: err.message });
  }
};

// ADD a new section مع items
exports.addSection = async (req, res) => {
  try {
    const section = new LandingContent(req.body);
    await section.save();
    res.status(201).json({ isSuccess: true, section });
  } catch (err) {
    console.error(err);
    res.status(500).json({ isSuccess: false, error: err.message });
  }
};

// UPDATE a section مع items
exports.updateSection = async (req, res) => {
  try {
    const { sectionId } = req.params;

    // تحديث كامل للـ section، بما في ذلك items
    const section = await LandingContent.findByIdAndUpdate(
      sectionId,
      req.body, // body يحتوي على items المعدلة أو الجديدة
      { new: true, runValidators: true }
    );

    if (!section) {
      return res
        .status(404)
        .json({ isSuccess: false, message: "Section not found" });
    }

    res.status(200).json({ isSuccess: true, section });
  } catch (err) {
    console.error(err);
    res.status(500).json({ isSuccess: false, error: err.message });
  }
};

exports.getSectionBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const section = await LandingContent.findOne({ slug }).lean();

    if (!section) {
      return res.status(404).json({
        isSuccess: false,
        message: `Section with slug '${slug}' not found`,
      });
    }

    res.status(200).json({
      isSuccess: true,
      section,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      isSuccess: false,
      message: "Error fetching section",
      details: error.message,
    });
  }
};
