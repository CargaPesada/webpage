const axios = require('axios');

const ENDPOINT_ADDRESS = "http://localhost:5000"

class FirebaseHandler {

    /**
     * Método para tentar realizar um novo registro de usuário.
     */
    tryToRegister = async (user) => {

        let wasSuccessful = false;

        let jsonToSend = {
            nome: user.nome,
            cargo: 1,
            email: user.email,
            senha: user.senha,
            //rg: "38.733.798-x",
            cpf: user.cpf,
            endereco: [{ cidade: user.cidade, estado: user.estado }],
            tipocnh: user.tipocnh,
            ddn: user.ddn,
            sexo: user.sexo,
            nomepai: user.nomepai,
            nomemae: user.nomemae,
            dependentes: user.dependentes,
            ocorrencias: []
        };

        // Acionando promisses para o endpoint
        await axios.post(ENDPOINT_ADDRESS + '/users/register', jsonToSend)
            .then((res) => {
                wasSuccessful = true;
            })

        return wasSuccessful;
    }


    /**
     * Método para tentar realizar login.
     */
    tryToLogin = async (email) => {

        let dataExists = false

        // Acionando promisses para o endpoint
        await axios.get(ENDPOINT_ADDRESS + '/users/' + email)
            .then((res) => {

                // Verificando se existe um campo "data"
                try {
                    let jsonReceived = res["data"]

                    if (jsonReceived["data"] != null) {
                        dataExists = true
                    }
                }
                catch (e) { }

            })

        return dataExists


    }

}

export default FirebaseHandler;