const User = require('../models/User')
 module.exports = {
   async getUsers (req,res) {
    try {
      const userData = await User.find({}).populate([
        {path: 'friends'},
        {path: 'thoughts'}]);
      if (userData) {
        res.status(200).json(userData);
        return;
      }
      res.status(404);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async getSingleUser (req,res) {
    try {
      const userData = await User.findOne({ _id: req.params.userId }).populate([
        {path: 'friends'},
        {path: 'thoughts'}]);
      if (userData) {
        res.status(200).json(userData);
        return;
      }
      res.status(404);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async createUser (req,res) {
    try {
      const userData = await User.create(req.body)
      if (userData) {
        res.status(200).json(userData);
        return;
      }
      res.status(400);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async updateUser (req,res) {
    try {
      const userData = await User.findByIdAndUpdate(req.params.userId,{ $set: req.body },{ new: true, runValidators: true });
      if (userData) {
        res.status(200).json(userData);
        return;
      }
      res.status(400);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async deleteUser (req,res) {
    try {
      const userData = await User.findByIdAndDelete(req.params.userId);
      if (userData) {
        res.status(200).json(userData);
        return;
      }
      res.status(400);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async newFriend (req,res) {
    try {
      const userData = await User.findByIdAndUpdate(req.params.userId,
        { $addToSet: { friends: req.params.friendId }},
        { new: true, runValidators: true });
      if (userData) {
        res.status(200).json(userData);
        return;
      }
      res.status(400);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async deleteFriend (req,res) {
    try {
      const userData = await User.findByIdAndUpdate(req.params.userId,
        { $pull: { friends: req.params.friendId }},
        { new: true, runValidators: true });
      if (userData) {
        res.status(200).json(userData);
        return;
      }
      res.status(400);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
 }
