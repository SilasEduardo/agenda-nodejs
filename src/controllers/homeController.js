exports.paginaInicial = (req, res) => {
    res.render('index', {
      title: 'ESTE É O TITULO',
      numbers: [1,2,3,4,5,6,7,8,9]
    });
    return;
  };
  
  exports.trataPost = (req, res) => {
    res.send(req.body);
    return;
  };