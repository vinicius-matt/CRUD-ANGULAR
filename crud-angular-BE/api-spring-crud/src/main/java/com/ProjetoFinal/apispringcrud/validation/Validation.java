package com.ProjetoFinal.apispringcrud.validation;

public class Validation extends RuntimeException {
    //classe para validar se os dados ja existem no banco
    public  Validation(long id){
        super ("Nenhum cliente com o id correspondente:" + id);
    }
}
