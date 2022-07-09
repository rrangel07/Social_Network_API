const names = [
  'Aaran',
  'Aaren',
  'Aarez',
  'Aarman',
  'Aaron',
  'Aaron-James',
  'Aarron',
  'Aaryan',
  'Aaryn',
  'Aayan',
  'Aazaan',
  'Abaan',
  'Abbas',
  'Abdallah',
  'Abdalroof',
  'Abdihakim',
  'Abdirahman',
  'Abdisalam',
  'Abdul',
  'Abdul-Aziz',
  'Abdulbasir',
  'Abdulkadir',
  'Abdulkarem',
  'Smith',
  'Jones',
  'Coollastname',
  'Ze',
  'Zechariah',
  'Zeek',
  'Zeeshan',
  'Zeid',
  'Zein',
  'Zen',
  'Zendel',
  'Zenith',
  'Zennon',
  'Zeph',
  'Zerah',
  'Zhen',
  'Zhi',
  'Zhong',
  'Zhuo',
  'Zi',
  'Zidane',
  'Zijie',
  'Zinedine',
  'Zion',
  'Zishan',
  'Ziya',
  'Ziyaan',
  'Zohaib',
  'Zohair',
  'Zoubaeir',
  'Zubair',
  'Zubayr',
  'Zuriel',
  'Xander',
  'Jared',
  'Courtney',
  'Gillian',
  'Clark',
  'Jared',
  'Grace',
  'Kelsey',
  'Tamar',
  'Alex',
  'Mark',
  'Tamar',
  'Farish',
  'Sarah',
  'Nathaniel',
  'Parker',
];

const possibleReactions = [
  'I disagree!',
  'I tried your algorithm, here were the results',
  'This was awesome',
  'Thank you for the great content',
  'Please check out my video response',
  'Like and subscribe to my channel please',
  'Reply: The side effects of in app purchases on digital marketplaces',
  'Video provides a powerful way to help you prove your point',
  'Reading is easier, too, in the new Reading view',
  'To change the way a picture fits in your document, click it and a button for layout options appears next to it.'
];

const possibleThoughts = [
  'One for all and all for one, Muskehounds are always ready. One for all and all for one, helping everybody. One for all and all for one, it\'s a pretty story. Sharing everything with fun, that\'s the way to be. One for all and all for one, Muskehounds are always ready. One for all and all for one, helping everybody. One for all and all for one, can sound pretty corny. If you\'ve got a problem chum, think how it could be.',
  'Children of the sun, see your time has just begun, searching for your ways, through adventures every day. Every day and night, with the condor in flight, with all your friends in tow, you search for the Cities of Gold.',
  'I never spend much time in school but I taught ladies plenty. It\'s true I hire my body out for pay, hey hey',
  'Top Cat! The most effectual Top Cat! Who\'s intellectual close friends get to call him T.C., providing it\'s with dignity',
  'Knight Rider, a shadowy flight into the dangerous world of a man who does not exist',
  'Michael Knight, a young loner on a crusade to champion the cause of the innocent, the helpless in a world of criminals who operate above the law.',
  '80 days around the world, we\'ll find a pot of gold just sitting where the rainbow\'s ending. Time — we\'ll fight against the time, and we\'ll fly on the white wings of the wind',
  'This is my boss, Jonathan Hart, a self-made millionaire, he\'s quite a guy.',
  'This is Mrs H., she\'s gorgeous, she\'s one lady who knows how to take care of herself.',
  'Barnaby The Bear\'s my name, never call me Jack or James, I will sing my way to fame, Barnaby the Bear\'s my name.',
  'There\'s a voice that keeps on calling me. Down the road, that\'s where I\'ll always be.',
  'Mutley, you snickering, floppy eared hound. When courage is needed, you\'re never around.',
  'Thundercats are on the move, Thundercats are loose. Feel the magic, hear the roar, Thundercats are loose.'
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random username
const getRandomUserName = () =>
  `${getRandomArrItem(names).toLowerCase()}_${getRandomArrItem(names).toLowerCase()}`;

// Function to generate random friends array that we can add to user object.
// n = amount of friends, currentUserId so we can identify if we get the same user as their own friend and avoid it, userId is the array with all the users IDs
const getRandomFriends = (n,currentUserId,userId) => {
  let friends = [];
  let _id;
  for (let i = 0; i<n; i++){
    _id = getRandomArrItem(userId);
    //_id === currentUserId checks if the user is adding themself as a friend and friends.includes(_id) checks if the random friend is already in the array
    while (_id === currentUserId || friends.includes(_id)) {
      _id = getRandomArrItem(userId);
    };
    friends.push(_id);
  }
  return friends;
}

const getRandomThoughts = (m,n) => {
  let thoughts=[];
  for (let i = 0; i < m; i++) {
    const thoughtText = getRandomArrItem(possibleThoughts);
    let reactions = [];
    for (let j = 0; j < n; j++) {
  let reactions =[];
      const reactionBody = getRandomArrItem(possibleReactions);
      reactions.push({reactionBody});
    }
    thoughts.push({
      thoughtText,
      reactions
    })
  }
  return thoughts;
}
// Export the functions for use in seed.js
module.exports = { getRandomUserName, getRandomFriends, getRandomArrItem, getRandomThoughts };
