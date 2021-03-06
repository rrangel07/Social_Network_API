const { Schema, model } = require('mongoose');
const moment = require('moment');
const reaction = require('./Reaction');

const thoughtSchema = new Schema ({
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: val => moment(val).format('L [@] LT'),
    },
    username: {
      type: String,
      require: true,
    },
    reactions: [reaction],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
});

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought',thoughtSchema);

module.exports = Thought;