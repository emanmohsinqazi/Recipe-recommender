const express = require("express");

const authRouter = express.Router();
const validator = require("validator");
const { validateSignup } = require("../utilis/helper.js");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");
const nodemailer=require("nodemailer");

authRouter.post("/login", async (req, res) => {
  try {
    // console.log("Request body:", req.body); // Log request body
    const { email: userEmail, password: userEnteredPassword } = req.body;

    if (!validator.isEmail(userEmail)) {
      throw new Error("Invalid email format");
    }

    const userData = await User.findOne({ email: userEmail });
    if (!userData) {
      throw new Error("User not found");
    }

    const isPasswordValid = await userData.validatePassword(
      userEnteredPassword
    );
    if (isPasswordValid) {
      const token = await userData.getJwt();
      res.cookie("token", token, { expires: new Date(Date.now() + 900000) });
      res.send(userData);
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    console.error("Error:", err.message); // Log the error
    res.status(500).send("Error: " + err.message);
  }
});

authRouter.post("/signup", async (req, res) => {
  // const user = new User({
  //   firstName: "M.Usman",
  //   lastName: "Ramzan",
  //   email: "usman123@gmail.com",
  //   password: "23423424",

  // });

  // console.log(req.body);

  try {
    /// validate the data
    validateSignup(req);
    ///encrypt the password

    const { firstName, lastName, email, password } = req.body;

    const encryptPassword = await bycrypt.hash(password, 10);
    // console.log(encryptPassword);
    // store the data in the db Now

    const user = new User({
      firstName,
      lastName,
      email,
      password: encryptPassword,
    });

    // const user = new User(req.body);

    const savedUser = await user.save();
    // console.log("data saved");
    const token = await savedUser.getJwt();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.json({ message: "User Added successfully!", data: savedUser });

    // res.send("User is created Successfully");
  } catch (err) {
    res.status(400).send("Error Saving the User" + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout successfully............");
});

// authRouter.post("/forgot-password", (req, res) => {
//   const { email: userEmail } = req.body;
//   User.findOne({ email: userEmail }).then((user) => {
//     if (!user) {
//       return res.send({ Status: "User not existed" });
//     }
//     const token = jwt.sign({ _id: user._id }, "Store@586", {
//       expiresIn: "1day",
//     });
//     var transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "muhammadusman01645@gmail.com",
//         pass: "lupxovkiwozuehfa",
//       },
//     });

//     var mailOptions = {
//       from: "muhammadusman01645@gmail.com",
//       to: "muhammadusman01645@gmail.com",
//       subject: "Reset Password Link",
//       text: `http://localhost:5173/reset_password/${user._id}/${token}`,
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         return res.send({ Status: "Success" });
//       }
//     });
//   });
// });

authRouter.post("/forgot-password", (req, res) => {
  const { email: userEmail } = req.body;

  User.findOne({ email: userEmail }).then((user) => {
    if (!user) {
      return res.send({ Status: "User not existed" });
    }
    const token = jwt.sign({ _id: user._id }, "Store@586", {
      expiresIn: "1day",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "muhammadusman01645@gmail.com",
        pass: "lupxovkiwozuehfa",
      },
    });

    const mailOptions = {
      from: "muhammadusman01645@gmail.com",
      to: userEmail, // Use the user-provided email
      subject: "Reset Password Link",
      text: `http://localhost:5173/reset_password/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).send({ Status: "Error", Message: "Email not sent" });
      }
      return res.send({ Status: "Success" });
    });
  });
});



// authRouter.post("/reset-password/:id/:token", (req, res) => {
//   const { id, token } = req.params;
//   const { password } = req.body;

//   jwt.verify(token, "Store@586", (err, decoded) => {
//     if (err) {
//       return res.json({ Status: "Error with token" });
//     } else {
//       bcrypt
//         .hash(password, 10)
//         .then((hash) => {
//           User.findByIdAndUpdate({ _id: id }, { password: hash })
//             .then((u) => res.send({ Status: "Success" }))
//             .catch((err) => res.send({ Status: err }));
//         })
//         .catch((err) => res.send({ Status: err }));
//     }
//   });
// });

authRouter.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    // Log input data for debugging
    console.log("Request Params:", { id, token });
    console.log("Request Body:", { password });

    // Verify token
    jwt.verify(token, "Store@586", async (err, decoded) => {
      if (err) {
        console.error("Token verification error:", err);
        return res.status(401).json({ Status: "Error with token", Message: "Invalid or expired token." });
      }

      try {
        // Hash the password
        const hash = await bycrypt.hash(password, 10);
        console.log("Password hash generated:", hash);

        // Update the user's password
        const updatedUser = await User.findByIdAndUpdate(id, { password: hash });
        if (!updatedUser) {
          console.error("User not found with ID:", id);
          return res.status(404).json({ Status: "Error", Message: "User not found." });
        }

        res.status(200).json({ Status: "Success" });
      } catch (hashError) {
        console.error("Error hashing password or updating user:", hashError);
        res.status(500).json({ Status: "Error", Message: "Internal server error." });
      }
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ Status: "Error", Message: "Internal server error." });
  }
});





module.exports = {
  authRouter,
};
