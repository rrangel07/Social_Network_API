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
      res.status(404).json({ message: 'No thought associated to that ID' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async createThought (req,res) {
    try {
      const thoughtData = await Thought.create(req.body);
      if (thoughtData) {
        await User.findByIdAndUpdate({_id: req.body.userId},
        { $addToSet: { thoughts: thoughtData._id }});
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
      const thoughtData = await Thought.findByIdAndUpdate(req.params.thoughtId,{ $set: req.body },{ new: true, runValidators: true });
      if (thoughtData) {
        res.status(200).json(thoughtData);
        return;
      }
      res.status(404).json({ message: 'No thought associated to that ID' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async deleteThought (req,res) {
    try {
      const thoughtData = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (thoughtData) {
        res.status(200).json(thoughtData);
        return;
      }
      res.status(404).json({ message: 'No thought associated to that ID' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async newReaction (req,res) {
    try {
      const thoughtData = await Thought.findByIdAndUpdate(req.params.thoughtId,
        { $addToSet: { reactions: req.body }},
        { new: true, runValidators: true });
      if (thoughtData) {
        res.status(200).json(thoughtData);
        return;
      }
      res.status(404).json({ message: 'No thought associated to that ID' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async deleteReaction (req,res) {
    try {
      const thoughtData = await Thought.findByIdAndUpdate(req.params.thoughtId,
        { $pull: { reactions: req.body }},
        { new: true, runValidators: true });
      if (thoughtData) {
        res.status(200).json(thoughtData);
        return;
      }
      res.status(404).json({ message: 'No thought associated to that ID' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
