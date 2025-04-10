const { users, sales, addUser, authenticateUser, addSale, getSales } = require('./data.js');

exports.handler = async (event) => {
    const { pathname } = new URL(event.headers['x-forwarded-proto'] + '://' + event.headers['x-forwarded-host'] + event.path);
    
    if (pathname === '/api/register' && event.httpMethod === 'POST') {
        const { username, password } = JSON.parse(event.body);
        if (addUser(username, password)) {
            return {
                statusCode: 201,
                body: JSON.stringify({ message: 'Usuario creado' }),
                headers: { 'Content-Type': 'application/json' }
            };
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Usuario ya existe' }),
                headers: { 'Content-Type': 'application/json' }
            };
        }
    } else if (pathname === '/api/login' && event.httpMethod === 'POST') {
        const { username, password } = JSON.parse(event.body);
        if (authenticateUser(username, password)) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Login exitoso' }),
                headers: { 'Content-Type': 'application/json' }
            };
        } else {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: 'Credenciales incorrectas' }),
                headers: { 'Content-Type': 'application/json' }
            };
        }
    } else if (pathname === '/api/sales' && event.httpMethod === 'POST') {
        const { product, price, quantity } = JSON.parse(event.body);
        addSale(product, price, quantity);
        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'Venta registrada' }),
            headers: { 'Content-Type': 'application/json' }
        };
    } else if (pathname === '/api/sales' && event.httpMethod === 'GET') {
        return {
            statusCode: 200,
            body: JSON.stringify(getSales()),
            headers: { 'Content-Type': 'application/json' }
        };
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: 'Ruta no encontrada' }),
            headers: { 'Content-Type': 'application/json' }
        };
    }
};