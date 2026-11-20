const pool = require("../db/pool")

exports.serializaeUser = function (user, done) {
  done(null, user.id);
};

exports.deserializeUser = async  function (id, done) {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
  } catch(err) {
    done(err);
  }
}