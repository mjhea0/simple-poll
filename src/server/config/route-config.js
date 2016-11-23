(function(routeConfig) {

  routeConfig.init = (app) => {

    // *** routes *** //
    const routes = require('../routes/index');
    const pollRoutes = require('../routes/polls');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/api/v1/polls', pollRoutes);

  };

})(module.exports);
