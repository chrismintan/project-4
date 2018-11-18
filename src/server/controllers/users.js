var sha256 = require('sha256');
const SALT = 'fxchange';

module.exports = (db) => {
  const login = (request, response) => {
    db.user.login(request.body, (error, result) => {
      //console.log(request.body);
      console.log('result controller: ', result.rows);
      if (error) {
        console.error('Query error', error);
      } else if (result.rows[0] != undefined) {
        let user_id = result.rows[0].id;

        if (sha256(request.body.password) === result.rows[0].password) {
          response.cookie('logged_in', sha256(SALT + user_id));
          response.cookie('username', request.body.name);
          response.cookie('user_id', user_id);
          response.status(200).redirect(`/users/${user_id}`);
        } else {
          response.send('wrong password');
        }
      } else {
        response.send('no such user');
      }
    });
  };

  return {
    login
  };
};
