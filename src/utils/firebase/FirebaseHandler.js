const axios = require('axios');

const ENDPOINT_ADDRESS = "https://carga-pesada-d933f.appspot.com"

class FirebaseHandler {

    /**
     * Método para tentar realizar um novo registro de usuário.
     */
    tryToRegister = async (user) => {

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

        console.log(jsonToSend)

        // await axios.post('https://carga-pesada-d933f.appspot.com/users/register', jsonToSend)
        //     .then((res) => {
        //         console.log("Funcionou");
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });

        await axios.post('http://127.0.0.1:5000/users/register', jsonToSend)
            .then((res) => {
                console.log("Funcionou");
            })
            .catch((err) => {
                console.log(err);
            });

    }


    /**
     * Método para tentar realizar login.
     */
    tryToLogin = async (email) => {

        let dataExists = false

        await axios.get('http://127.0.0.1:5000/users/' + email)
            .then((res) => {

                try {
                    let jsonReceived = res["data"]

                    if (jsonReceived["data"] == true) {
                        dataExists = true
                    }
                }
                catch (e) { }

            })

        return dataExists


    }

}

export default FirebaseHandler;