import jwt, { verify } from 'jsonwebtoken';



const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          res.status(403).json("token is not valid")
        }
        req.user = user;
        next();
      });

    } else {
      res.status(401).json("you are not auth")
    }
  },
  verifyTokenAdmin: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.id == req.param.id || req.user.id === '2') {
        next();
      }
      else {
        res.status(403).json("You are not admin ")
      }
    })
  }
}

module.exports = middlewareController;