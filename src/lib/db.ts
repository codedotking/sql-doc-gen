import mysql from 'mysql2/promise';


export type IConnect = {
    host: string;
    port: number;
    database?: string;
    user: string;
    password: string;
}


/**
 * 连接数据库
 * @param connectInfo 
 * @returns 
 */
export const connect = async (connectInfo: IConnect): Promise<mysql.Connection> => {
    const connect = await mysql.createConnection({
        host: connectInfo.host,
        port: connectInfo.port,
        database: connectInfo.database,
        user: connectInfo.user,
        password: connectInfo.password
    });
    return connect;
}

