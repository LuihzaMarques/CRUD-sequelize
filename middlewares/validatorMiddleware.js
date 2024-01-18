class ValidatorMiddlware {
    validateInput(request, response, next){

        const {nome, idade} = request.body;
            if(typeof(nome) !== 'string'){
              return response.status(500).json({description:`Payload contem tipos errados: Parametro errado: ${typeof(none) !== 'string' ? "Nome" :"Idade"}`})
            } else {}
           
        next()    
        console.log(request.body);
    }
}

module.exports = new ValidatorMiddlware()