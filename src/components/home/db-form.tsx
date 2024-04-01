"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type IConnect } from "@/lib/db";
import { useImmer } from "use-immer"

const handleSubmit = async (dataForm: IConnect) => {
  const res = await fetch("/api/db", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForm),
  });
  const data = await res.json();
  console.log(data);
};

export default function DBForm() {
  const [dbForm, setDbForm] = useImmer<IConnect>({
    host: "xxxxxxxxxxx",
    port: 3306,
    database: "v3bms",
    user: "root",
    password: "xxxxxxxxxxxxx",
  });


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{

    console.log(event.target);
    
    setDbForm((draft) => {
      // draft[event]
    })
  }

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-2xl">数据库连接信息</CardTitle>
        <CardDescription>不会保存任何数据库信息</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="host">数据库链接</Label>
            <Input
              id="host"
              type="text"
              placeholder="数据库链接"
              value={dbForm.host}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="port">端口</Label>
            <Input
              id="port"
              type="number"
              placeholder="端口"
              value={dbForm.port}
              onChange={(e) => {
                dbForm.port = Number(e.target.value);
              }}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="database">数据库</Label>
            <Input
              id="database"
              type="text"
              placeholder="数据库"
              value={dbForm.database}
              onChange={(e) => {
                dbForm.database = e.target.value;
              }}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="user">用户名</Label>
            <Input
              id="user"
              type="text"
              placeholder="数据库用户名"
              value={dbForm.user}
              onChange={(e) => {
                dbForm.user = e.target.value;
              }}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">密码</Label>
            <Input
              id="password"
              type="password"
              placeholder="数据库密码"
              value={dbForm.password}
              onChange={(e) => {
                dbForm.password = e.target.value;
              }}
              required
            />
          </div>
          <Button
            onClick={() => handleSubmit(dbForm)}
            type="submit"
            className="w-full">
            生成
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
