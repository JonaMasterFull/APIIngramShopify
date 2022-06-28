const axios = require('axios');
const fs = require('fs');
require('dotenv').config()

class Token {
    ruta = '../.env'
    url = 'https://api.ingrammicro.com:443/oauth/oauth20/token';


    get paramsToken() {
        return {
            'grant_type': 'client_credentials',
            'client_id': process.env.CLIENT_ID,
            'client_secret': process.env.CLIENT_SECRET
        }
    }


    async obtenerToken() {
        try {
            const resp = await axios.get(this.url, { params: this.paramsToken });
            const data = resp.data.access_token;
            return data;
        } catch (error) {
            throw error;
        }
    }
}

const token = new Token();

const tokens = async() =>{
    const nuevo = await token.obtenerToken();
    console.log(nuevo);
}

tokens();