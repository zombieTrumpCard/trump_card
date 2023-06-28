let Rooms = [
  {
    room_id: 1,
    title: "room1",
    users: ["jiyoung", "user1"],
  },
  {
    room_id: 2,
    title: "room3",
    users: ["jiyoung", "user2"],
  },
];

function setMessage(title, user, message) {
  Rooms.forEach((room) => {
    if (room.title === title) {
      room.messages.push({ user, message });
    }
  });
  return { user, message };
}

function getRooms() {
  return Rooms;
}

async function getRoom(title) {
  const room = Rooms.find((room) => room.title === title);
  return room;
}
async function getRoomById(id) {
  const filterd = Rooms.find((room) => room.id === id);

  return filterd;
}

async function addUserToRoom(username, title) {
  let alreadyIn = false;
  const room = Rooms.find((room) => room.title === title);
  if (room) {
    room.users.forEach((user) => {
      if (user === username) alreadyIn = true;
    });
    if (!alreadyIn) room.users.push(username);
  }
  return room;
}
async function createRoom(title, user) {
  Rooms = [
    ...Rooms,
    {
      title,
      users: [user],
      id: Date.now(),
    },
  ];
  return Rooms;
}

module.exports = {setMessage, getRooms, getRoom, getRoomById, addUserToRoom, createRoom};