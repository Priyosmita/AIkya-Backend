const { User } = require('../models');
const cloudinary = require('../config/cloudinary');



exports.uploadProfilePicture = async (req, res) => {
  try {
    const file = req.files.profilePicture; // Assuming you're using `express-fileupload` or a similar middleware

    const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: 'ProfilePics', // Folder in Cloudinary
      public_id: `${Date.now()}_${file.name}`, // Optional public ID format
      overwrite: true, // Optional: allows overwriting with the same public ID
    });

    const imageUrl = result.secure_url;

    // Assuming user is authenticated and `req.user` holds user information
    const user = await User.findByIdAndUpdate(req.user.id, {
      'profile.profilePicture': imageUrl,
    }, { new: true });

    res.status(200).json({ message: 'Profile picture uploaded successfully', user });
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'User created successfully.', user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({ message: 'User updated successfully.', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
