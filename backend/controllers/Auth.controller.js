import User from "../models/user.model.js";
import { handleError } from "../error/handleError.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const Register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const checkuser = await User.findOne({ email });
    if (checkuser) {
      // Kullanıcı zaten Kayıtlı mı ?
      next(handleError(409, "Kullanıcı zaten kayıtlı."));
    }

    const hashedPassword = bcryptjs.hashSync(password);
    // Kullanıcı Kayıtı
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    res.status(200).json({
      succes: true,
      message: "Kullanıcı başarıyla oluşturuldu ",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      next(handleError(404, "Geçersiz giriş bilgileri"));
    }
    const hashedPassword = user.password;

    const comparePassword = bcryptjs.compare(password, hashedPassword);
    if (!comparePassword) {
      next(handleError(404, "Geçersiz giriş bilgileri"));
    }

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    const newUser = user.toObject({ getters: true });
    delete newUser.password;

    res.status(200).json({
      succes: true,
      user: newUser,
      message: "Giriş başarılı! Hoşgeldiniz",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const GoogleLogin = async (req, res, next) => {
  try {
    const { name, email, avatar } = req.body;
    let user;
    user = await User.findOne({ email });
    if (!user) {
      const password = Math.random().toString();
      const hashedPassword = bcryptjs.hashSync(password);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        avatar,
      });
      user = await newUser.save();
    }
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    const newUser = user.toObject({ getters: true });
    delete newUser.password;

    res.status(200).json({
      succes: true,
      user: newUser,
      message: "Giriş başarılı! Hoşgeldiniz",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};



export const Logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Başarıyla çıkış yaptınız.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
