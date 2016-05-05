var User = require('./models/user');
module.exports = function(app, passport){
	app.get('/', function(req, res){
		res.render('index.ejs');
	});

	app.get('/login', function(req, res){
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.get('/signup', function(req, res){
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});


	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	}));

    //app.get('/profile', isLoggedIn, function(req, res){
    //console.log('req');
    //console.log({user: req.user});
    //console.log(req.user.name);
    //console.log(req.user);

  //});

	app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

	//app.get('/auth/facebook/callback',
	//  passport.authenticate('facebook', { successRedirect: '/profile',
	//                                      failureRedirect: '/' }));

  app.get('/auth/facebook/callback', function(req, res, next) {
    console.log('made it');
    passport.authenticate('facebook', function(err, user, info) {
      console.log('err',err);
      console.log('user',user);
      console.log('info',info);
      // req.login() will save user object to session
      req.login(user, function(error) {
        if (error) {
        console.log('error login', error);
        res.redirect('/')
      } else {
        console.log('login success', user.displayName);
          res.redirect('http://localhost:8100/#/tab/account?=loggedin&user='+user.displayName);
      }
    });

  })(req, res, next);
});
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	})
};

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}

	res.redirect('/login');
}
