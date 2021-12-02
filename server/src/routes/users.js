const express = require("express");
const router = express.Router();
const User = require("../models/user");

/**
 * @route GET /users/me
 * @desc Get current user
 * @access Private
 */
router.get("/me", async (req, res) => {
    if (!req.user)
        return res.status(401).send({ error: "You must be logged in" });
    const user = await User.findById(req.user.id);
    res.json(user);
});

/**
 * @route PUT /users/me
 * @desc Update current user
 * @access Private
 */
router.put("/me", async (req, res) => {
    if (!req.user)
        return res.status(401).send({ error: "You must be logged in" });
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true,
    });
    res.json(user);
});

module.exports = router;
