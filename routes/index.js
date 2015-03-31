module.exports = function (app) {

  app.get('/',function(req,res){
    res.send('the rutles /');

  });


  app.get('/client',function(req,res){
    res.send('the client function /');

  });


  app.get('/server',function(req,res){
    res.send('the server functioin /');

  });


  app.get('/backstage',function(req,res){
    res.send('the backstage /');

  });


  app.get('/reception',function(req,res){
    res.send('the reception /');

  });




}
