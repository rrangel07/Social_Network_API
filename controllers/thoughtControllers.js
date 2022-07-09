const Thought = require('../models/Thought')
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
}