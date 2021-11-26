module.exports = function loggedIn(session) {
  let username = 'none';
  if (session.loggedIn) {
    username = session.username;
  }
  return username;
};
