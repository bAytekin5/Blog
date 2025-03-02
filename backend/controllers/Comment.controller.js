import { handleError } from "../error/handleError.js";
import Comment from "../models/comment.model.js";

export const addComment = async (req, res, next) => {
  try {
    const { user, blogid, comment } = req.body;
    const newComment = new Comment({
      user: user,
      blogid: blogid,
      comment: comment,
    });

    await newComment.save();
    res.status(200).json({
      success: true,
      message: "Yorum gönderildi.",
      comment: newComment,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getComments = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const comments = await Comment.find({ blogid })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res.status(200).json({
      comments,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const commentCount = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const commentCount = await Comment.countDocuments({ blogid });

    res.status(200).json({
      commentCount,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getAllComments = async (req, res, next) => {
  try {
    const user = req.user;
    let comments;
    if (user.role === "admin") {
      comments = await Comment.find()
        .populate("blogid", "title")
        .populate("user", "name");
    } else {
      comments = await Comment.find({ user: user._id })
        .populate("blogid", "title")
        .populate("user", "name");
    }

    res.status(200).json({
      comments,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const { commentid } = req.params;
    await Comment.findByIdAndDelete(commentid);

    res.status(200).json({
      succes: true,
      message: "Yorum başarıyla silindi",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
