const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

const router = express.Router();

const Profiles = require("../models/profilesModel");
const User = require("../models/User");

// Route to get the user all profiles from db   login required : done by fetch user (middleware) by checking token given by user and taking out the User id from token
router.get("/fetchprofiles", fetchUser, async (req, res) => {
  try {
    const profile = await Profiles.find({ user: req.id });
    res.send(profile);
  } catch (error) {
    res.status(501).send("error  in fetchprofiles");
  }
});

// Router to create profile  http://localhost:3000/api/profiles/createprofile  :: login required
router.post(
  "/createprofile",
  fetchUser,
  [
    body("discription", "Enter disription mininmum 3 character").isLength({
      min: 3,
    }),
    body("title", "Enter title properly").isLength({ min: 3 }),
    body("game", "Enter the game name properly").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const profile = await Profiles.create({
        user: req.id, // To uniquly add game profile  of a particular user
        game: req.body.game,
        discription: req.body.discription,
        title: req.body.title,
      });

      res.json(profile);
    } catch (error) {
      res.status(501).send("Error in create");
    }
  }
);

// Route to update profile http://localhost:3000/api/profiles/updateprofile :: login required

router.put("/updateprofile/:id", fetchUser, async (req, res) => {
  try {
    const { discription, title, game } = req.body;
    const updatedProfile = {};
    if (discription) {
      updatedProfile.discription = discription;
    }
    if (title) {
      updatedProfile.title = title;
    }
    if (game) {
      updatedProfile.game = game;
    }

    // find profile in the database using unique prfile id
    let profile = await Profiles.findById(req.params.id);
    if (!profile) {
      return res.send("profile not present ");
    }

    // check if the profile belong to same user using user id and profile id
    if (profile.user.toString() !== req.id) {
      return res.send("permission not given");
    }

    profile = await Profiles.findByIdAndUpdate(
      req.params.id,
      { $set: updatedProfile },
      { new: true }
    );

    res.send("profile is updated succesfully");
  } catch (error) {
    res.status(501).send("Error in update ");
  }
});

// Route to delete a profile login required

router.delete("/deleteprofile/:id", fetchUser, async (req, res) => {
  try {
    // find profile in the database using unique prfile id
    let profile = await Profiles.findById(req.params.id);
    if (!profile) {
      return res.send("profile is not available ");
    }

    // check if the profile belong to same user
    if (profile.user.toString() !== req.id) {
      return res.send("wrong delete request");
    }

    let ans = await Profiles.findByIdAndRemove(req.params.id);
    res.send("deleted successfully");
  } catch (error) {
    res.status(501).send("Error in delete ");
  }
});

module.exports = router;
