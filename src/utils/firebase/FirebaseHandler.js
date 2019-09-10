const axios = require('axios');

class FirebaseHandler {

    tryToRegister = () => {

        axios.post('https://carga-pesada-d933f.appspot.com/users/register', {
            nome: "Vinícius Higa",
            cargo: 4,
            email: "vinicius.hh@apple.com",
            senha: "swiftmelhorquekotlin",
            rg: "38.733.798-x",
            cpf: "448.892.118-xy",
            endereco: [{ "cidade": "Campinas", "estado": "SP" }],
            tipocnh: ["C", "D"],
            ddn: "1997-06-10",
            sexo: "masculino",
            nomepai: "Eduardo Higa",
            nomemae: "Samantha Zani",
            dependentes: [{
                nome: "Lucas Higa",
                tipodependencia: "Irmão",
                rg: "12345",
                cpf: "67890",
                ddn: "2000-07-10",
                sexo: "masculino",
                endereco: [{ "cidade": "Campinas", "estado": "SP" }]
            }],
            ocorrencias: []
        })
            .then((res) => {
                console.log("Funcionou");
            })
            .catch((err) => {
                console.log(err);
            });

    }

}

export default FirebaseHandler;