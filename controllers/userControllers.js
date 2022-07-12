const User = require('../models/User');
const Thought = require('../models/Thought');

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
      res.status(404).json({ message: 'Nothing found' });
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
      res.status(404).json({ message: 'No user associated to that ID' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async createUser (req,res) {
    try {
      const userData = await User.create(req.body);
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
      const userData = await User.findByIdAndUpdate(req.params.userId,{ $set: req.body },
      { new: true, runValidators: true });
      if (userData) {
        res.status(200).json(userData);
        return;
      }
      res.status(404).json({ message: 'No user associated to that ID' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async deleteUser (req,res) {
    try {
      const userData = await User.findByIdAndDelete(req.params.userId);
      if (userData) {
        await Thought.deleteMany({ username: userData.userName });
        res.status(200).json(userData);
        return;
      }
      res.status(404).json({ message: 'No user associated to that ID' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async newFriend (req,res) {
    try {
      //Add friend 'friendId' to 'userId'
      const userData1 = await User.findByIdAndUpdate(req.params.userId,
        { $addToSet: { friends: req.params.friendId }},
        { new: true, runValidators: true });
      //Add friend 'userId' to 'friendId'
        const userData2 = await User.findByIdAndUpdate(req.params.friendId,
          { $addToSet: { friends: req.params.userId }},
          { new: true, runValidators: true });
      if (userData1 && userData1) {
        res.status(200).json([userData1,userData2]);
        return;
      }
      res.status(404).json({ message: 'No user associated to that ID' });
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
      res.status(404).json({ message: 'No user associated to that ID' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
 }
