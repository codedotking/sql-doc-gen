import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
export async function GET(req: NextRequest) {
    try {
        const conn = await connect({
            host: "xxxxxxxxxxxx",
            port: 3306,
            database: "v3bms",
            user: "root",
            password: "xxxxxxxxxxxxx"
        });
        const [result] = await conn.execute("show databases;");
        const [tables] = await conn.execute("show tables");
        const tableDicts = {}
        for (const table of tables as any[]) {
            const [columns] = await conn.execute(`show columns from ${table};`);
        }
        // SELECT * FROM INFORMATION_SCHEMA.COLUMNS where table_schema = 'v3bms';
        await conn.end();
        return NextResponse.json({
            message: "Hello World", tables: tables,
            databases: result
        });
    } catch (e) {
        return NextResponse.json({ message: "Hello World", e: String(e) });
    }
}