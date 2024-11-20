import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  // Generate JWT
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d", // Token expires in 15 days
  });

  // Configure cookie options
  const cookieOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000, // Expiry time in milliseconds (15 days)
    httpOnly: true, // Prevent access to cookie via JavaScript (mitigates XSS)
    sameSite: "Strict", // Mitigate CSRF attacks
    secure: process.env.NODE_ENV === "production", // Use secure cookies only in production (HTTPS)
  };

  // Set JWT token in the cookie
  res.cookie("jwt", token, cookieOptions);
};

export default generateTokenAndSetCookie;
