import { NextRequest, NextResponse } from "next/server";
import { IConnect, connect } from "@/lib/db";
export async function GET(req: NextRequest) {
    try {
        const db = await connect({
            host: "xxxxxxxxxxxxxxxx",
            port: 3306,
            database: "v3bms",
            user: "root",
            password: "xxxxxxxxxx"
        });
        const [result] = await db.execute("show databases;");
        const [tables] = await db.execute("show tables");
        // SELECT * FROM INFORMATION_SCHEMA.COLUMNS where table_schema = 'v3bms';
        await db.end();
        return NextResponse.json({
            message: "Hello World", tables: tables,
            databases: result
        });
    } catch (e) {
        return NextResponse.json({ message: "Hello World", e: String(e) });
    }
}


export async function POST(req: NextRequest) {
    try {
        const t: IConnect = await req.json();
        console.log(t);
        const db = await connect({
            host: t.host,
            port: t.port,
            database: t.database,
            user: t.user,
            password: t.password
        });
        const [result] = await db.execute("show databases;");
        const [tables] = await db.execute("show tables");
        // SELECT * FROM INFORMATION_SCHEMA.COLUMNS where table_schema = 'v3bms';
        await db.end();
        return NextResponse.json({
            message: "Hello World", tables: tables,
            databases: result
        });
    } catch (e) {
        return NextResponse.json({ message: "Hello World", e: String(e) });
    }
}