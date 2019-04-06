const cors = require('cors')
const createError = require('http-errors');

const allowedOrigins = ['http://localhost:3000']
module.exports = cors({
  origin: (origin, next) => {
    const isAllowed = !origin || allowedOrigins.indexOf(origin) !== -1;
    if(isAllowed) {
      next(null,isAllowed);
    } else {
      next(createError(401, "Not allowed by CORS"))
    }
  },
  credentials: true
})