import { NextRequest, NextResponse } from "next/server";
import { IConnect, connect } from "@/lib/db";

/**
 * POST 请求处理函数
 *
 * @param req NextRequest 对象，表示 HTTP 请求
 * @returns 返回 NextResponse 对象，表示 HTTP 响应
 */
export async function POST(req: NextRequest) {
    try {
        // 解析请求体中的 JSON 数据
        const t: IConnect = await req.json();

        // 连接数据库
        const db = await connect({
            host: t.host,
            port: t.port,
            database: t.database,
            user: t.user,
            password: t.password
        });

        // 执行 SQL 查询，获取所有数据库列表
        const [databases] = await db.execute("show tables;");

        // 关闭数据库连接
        // SELECT * FROM INFORMATION_SCHEMA.COLUMNS where table_schema = 'v3bms';
        await db.end();

        // 返回响应
        return NextResponse.json({
            message: "Hello World",
            data: {
                databases
            },
            code: 200
        });
    } catch (e) {
        // 发生错误时返回错误消息和状态码
        return NextResponse.json({ message: String(e), code: 500 });
    }
}