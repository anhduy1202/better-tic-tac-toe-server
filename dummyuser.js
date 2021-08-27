const c_users = [];
let roomList = [];
let allUserName =[];

// joins the user to the specific chatroom

function join_User(id, username, room) {
  const p_user = { id, username, room };
  c_users.push(p_user);
  return p_user;

}



// Gets a particular user id to return the current user
function get_Current_User(id) {
  return c_users.find((p_user) => p_user.id === id);
}

// called when the user leaves the chat and its user object deleted from array
function user_Disconnect(id) {
  const index = c_users.findIndex((p_user) => p_user.id === id);

  if (index !== -1) {
    allUserName.splice(index,1)[0];
    console.log(allUserName);
    return c_users.splice(index, 1)[0];

  }
}

function getUserList(room) { 
  let users = c_users.filter((user) => user.room === room);
  let namesArray = users.map((user) => user.username);
  return namesArray;
}


function getRoomList () {
  roomList = c_users.map((user) => user.room );
  return roomList;
}

module.exports = {
  join_User,
  get_Current_User,
  user_Disconnect,
  getUserList,
  getRoomList
 
};