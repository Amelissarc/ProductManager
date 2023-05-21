function middlewareEjemplo(req, res, next) {
    if(req.header.authorization) {
        next()
    } else {
        res.send({status: 'usted no ha iniciado sesion'});
    }
}