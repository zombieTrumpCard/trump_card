let users = [
  {
    id: 1,
    username: "jiyoung",
    rooms: [
      { title: "room1", messages: [{ sender: "user1", message: "hello" }] },
      {
        title: "room3",
        messages: [
          { sender: "user1", message: "hello" },
          { sender: "user2", message: "yeah" },
        ],
      },
    ],
  },
  {
    id: 2,
    username: "user2",
    rooms: [
      { title: "room1", messages: [{ sender: "user1", message: "hello" }] },
      {
        title: "room3",
        messages: [
          { sender: "user1", message: "hello" },
          { sender: "user2", message: "yeah" },
        ],
      },
    ],
  },
];

async function getUser(username) {
  const finduser = users.find((user) => user.username === username);
  return finduser;
}
function getUsers() {
  console.log("getusers");
  return users;
}

function signUp(username) {
  const exsitedUser = users.find((user) => user.username === username);

  if (!exsitedUser) {
    users.push({ id: Date.now(), username, rooms: [] });
  }
}

async function joinRoom(username, title) {
  const user = await getUser(username);
  user.rooms.push({ title, messages: [] });
  return user.rooms;
}

function roomsByUser(username) {
  let myRoomList;
  if (users) {
    const user = users.find((user) => user.username === username);
    if (user && user.rooms) {
      myRoomList = user.rooms;
    }
  }

  return myRoomList;
}

async function addMessage(username, title, message) {
  users.forEach((user) => {
    if (user.username === username) {
      user.rooms.forEach((room) => {
        if (room.title === title) {
          room.messages.push(message);
        }
      });
    }
  });

  return message;
}

module.exports = {getUser, getUsers, signUp, joinRoom, roomsByUser, addMessage};