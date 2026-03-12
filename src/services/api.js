import axios from 'axios';

//Utilizei a biblioteca axios para fazer requisições HTTP, ele quem vai até a api e coleta os dados em JSON e traz para o vue renderizar
// assim vamos utilizar apenas api.get('/products'), deixando o codigo limpo.

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // URL do backend Laravel
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;