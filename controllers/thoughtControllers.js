const Thought = require('../models/Thought')
const User = require('../models/User')
 module.exports = {
   async getThoughts (req,res) {
    try {
      const thoughtData = await Thought.find({});
      if (thoughtData) {
        res.status(200).json(thoughtData);
        return;
      }
      res.status(400);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async getSingleThought (req,res) {
    try {
      const thoughtData = await Thought.findOne({ _id: req.params.thoughtId}).populate('reactions');
      if (thoughtData) {
        res.status(200).json(thoughtData);
        return;
      }
      res.status(404);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async createThought (req,res) {
    try {
      const thoughtData = await Thought.create(req.body)
      if (thoughtData) {
        res.status(200).json(thoughtData);
        return;
      }
      res.status(400);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async updateThought (req,res) {
    try {
      const thoughtData = await Thought.findByIdAndUpdate(req.params.userId,{ $set: req.body },{ new: true, runValidators: true });
      if (thoughtData) {
        res.status(200).json(thoughtData);
        return;
      }
      res.status(400);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async deleteThought (req,res) {
    try {
      const thoughtData = await Thought.findByIdAndDelete(req.params.userId);
      if (thoughtData) {
        res.status(200).json(thoughtData);
        return;
      }
      res.status(400);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async newReaction (req,res) {
    try {
      const thoughtData = await Thought.findByIdAndUpdate(req.params.userId,
        { $addToSet: { friends: req.params.friendId }},
        { new: true, runValidators: true });
      if (thoughtData) {
        res.status(200).json(thoughtData);
        return;
      }
      res.status(400);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async deleteReaction (req,res) {
    try {
      const thoughtData = await Thought.findByIdAndUpdate(req.params.userId,
        { $pull: { friends: req.params.friendId }},
        { new: true, runValidators: true });
      if (thoughtData) {
        res.status(200).json(thoughtData);
        return;
      }
      res.status(400);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
