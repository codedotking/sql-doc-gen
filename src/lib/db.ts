import mysql from 'mysql2/promise';


interface IConnect {
    host: string;
    port: number;
    database?: string;
    user: string;
    password: string;
}

export const connect = async (connectInfo:IConnect) => {
    const connect = await mysql.createConnection({
        host: "150.158.95.91",
        port: 3306,
        database: "v3bms",
        user: "root",
        password: "he..123456"
    });
    return connect;
}

