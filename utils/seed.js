const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');
const { getRandomUserName, getRandomFriends, getRandomArrItem, getRandomThoughts } = require('./data');


connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing users
  await User.deleteMany({});

  // Drop existing Thoughts
  await Thought.deleteMany({});

  // Create empty array to hold the users
  const users = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data

    let userName = getRandomUserName();
    let email = `${userName}@mail.com`;
    for (let i=0 ; i< users.length; i++) {
      while(users[i].userName === userName) {
        userName = getRandomUserName();
        email = `${userName}@mail.com`;
      }
    }

    users.push({
      userName,
      email
    });
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);
  // Get users
  const usersID = await User.find({});
  // Add friends to the users
  for(i=0;i<usersID.length;i++) {
    await User.findByIdAndUpdate({_id: usersID[i]._id},
      { $addToSet: { friends: getRandomFriends(3,usersID[i]._id,usersID) } },
      { new: true }
    );
  };
  // Get some random thoughts objects using a helper function that we imported from ./data
  const thoughts = getRandomThoughts (20,2,users);
  // console.log(thoughts);
  // Add thoughts to the collection and await the results
  await Thought.collection.insertMany(thoughts);
  // Get thoughts from DB
  const thoughtsID = await Thought.find({});
  console.log(thoughtsID);
  // let userNameThought;
  // Assign usernames to each Thought and Add those thoughts to each user
  for (let i = 0; i < thoughtsID.length; i++) {
    // userNameThought = getRandomArrItem(usersID)
    // await Thought.findByIdAndUpdate({ _id: thoughtsID[i]._id },
    //   { $set: { username: userNameThought.userName } },
    //   { new: true }
    // );
    await User.findOneAndUpdate({ userName: thoughtsID[i].username },
      { $addToSet: { thoughts: thoughtsID[i]._id } },
      { new: true }
    );
  }
  // for (let i = 0; i < thoughtsID.length; i++) {
  //   await Thought.findByIdAndUpdate({ _id: thoughtsID[i]._id },
  //     { $addToSet: { reactions: getRandomReactions(2,usersID) } },
  //     { new: true }
  //   );
  // }
  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
