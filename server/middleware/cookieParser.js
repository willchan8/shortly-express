const parseCookies = (req, res, next) => {
  var cookiesObj = {};
  if (req.get('Cookie')) {
    var cookiesArr = req.get('Cookie').split(';');
    for (let i = 0; i < cookiesArr.length; i++) {
      var cookie = cookiesArr[i].split('='); //[' otherCookie', 18ea4fb6ab3178092ce936c591ddbb90c99c9f66]
      cookiesObj[cookie[0].trim()] = cookie[1].trim();
    }
  }
  req.cookies = cookiesObj;
  next();
};

module.exports = parseCookies;