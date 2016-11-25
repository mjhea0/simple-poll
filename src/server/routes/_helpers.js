function createCookie(req, pollID) {
  let cookie = req.cookies.straw;
  if (cookie)  cookie += `,${pollID}`;
  else cookie = pollID;
  return cookie;
}

module.exports = {
  createCookie
};
