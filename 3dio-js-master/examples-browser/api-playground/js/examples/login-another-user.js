// Login another user

var user1 = {email: 'gertrud', password: 'afgshgrtecsru6ez5dt'}
var user2 = {email: 'bernhard', password: '6FYUGiF4ZMwt7fEoqLid'}

io3d.configs({
  logLevel: 'debug'
})

io3d.auth.logIn(user1).then(function () {

  return io3d.auth.logIn(user2)

}).then(function () {

  return io3d.auth.getSession()

})