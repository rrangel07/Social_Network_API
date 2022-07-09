const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');
const { getRandomUserName, getRandomFriends, getRandomArrItem } = require('./data');

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

    const userName = getRandomUserName();
    const email = `${userName}@mail.com`;

    users.push({
      userName,
      email
    });
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  const usersID = await User.find({});
  for(i=0;i<1;i++){
    await User.findByIdAndUpdate({_id: usersID[i]._id},
      { $addToSet: { friends: getRandomFriends(3,usersID[i]._id,usersID) } },
      { new: true }
    );
  }
  console.log(await User.find({}))
// console.log(await User.findById(usersID[2]._id))

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
