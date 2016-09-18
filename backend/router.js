const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const externalSearch = require('./controllers/external_search');

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'Super secret code is ABC123' });
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
  app.post('/api/youtube/search', externalSearch.searchYoutube);
  app.get('/api/youtube/data/:id', externalSearch.loadYoutubeVideoData);
  app.get('/api/youtube/wave/:id', externalSearch.loadYoutubeWave);
  app.post('/api/beatport/search', externalSearch.searchBeatport);
}
