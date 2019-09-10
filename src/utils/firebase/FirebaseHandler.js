const axios = require('axios');

class FirebaseHandler {

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

        await axios.post('https://carga-pesada-d933f.appspot.com/users/register', jsonToSend)
            .then((res) => {
                console.log("Funcionou");
            })
            .catch((err) => {
                console.log(err);
            });

    }

}

export default FirebaseHandler;