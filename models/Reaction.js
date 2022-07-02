const { Schema, Types } = require('mongoose');

const reactionSchema = new Section ({
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: val => moment(val).format('L [@] LT'),
    }
  },
  {
    toJSON: {
      getters: true,
    },
});

module.exports = reactionSchema;