const { Router } = require("express");

const UserAuth = Router();

UserAuth.use((req, res, next) => {
  const { user } = req.session
  if (user) next()
  else res.status(401).json({ wsMessage: "Non autorisé" })
})

module.exports = UserAuth
