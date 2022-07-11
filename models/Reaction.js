const { Schema, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema ({
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    userName: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: val => moment(val).format('L [@] LT'),
    }
  },
  {
    toJSON: {
      getters: true,
    },
});

module.exports = reactionSchema;