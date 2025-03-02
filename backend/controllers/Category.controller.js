import { handleError } from "../error/handleError.js";
import Category from "../models/category.model.js";

export const addCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body;

    const existingCategory = await Category.findOne({ slug });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message:
          "Bu bağlandı adı zaten kullanılıyor. Lütfen farklı bir ad girin!",
      });
    }

    const category = new Category({
      name,
      slug,
    });
    await category.save();
    res.status(200).json({
      success: true,
      message: "Kategori başarıyla eklendi 👍​",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const showCategory = async (req, res, next) => {
  try {
    const { categoryid } = req.params;
    const category = await Category.findById(categoryid);
    if (!category) {
      next(handleError(404, "Veri bulunamadı"));
    }
    res.status(200).json({
      category,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body;
    const { categoryid } = req.params;
    const category = await Category.findByIdAndUpdate(
      categoryid,
      {
        name,
        slug,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Kategori başarıyla güncellendi",
      category,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { categoryid } = req.params;
    await Category.findByIdAndDelete(categoryid);

    res.status(200).json({
      success: true,
      message: "Kategori başarıyla silindi",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getAllCategory = async (req, res, next) => {
  try {
    const category = await Category.find().sort({ name: 1 }).lean().exec();

    res.status(200).json({
      category,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
