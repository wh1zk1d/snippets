const isAuthorized = (req, res, next) => {
  let token = req.headers['authorization']

  if (!token) {
    return next(new Error('missing token'))
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length)
  } else {
    return next(new Error('bad token format'))
  }

  if (token === process.env.BEARER) {
    return next()
  } else {
    return next(new Error('invalid token'))
  }
}

module.exports = isAuthorized
