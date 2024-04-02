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
import { useImmer } from "use-immer";
import { ReloadIcon } from "@radix-ui/react-icons";


export default function DBForm({ setDbList }: { setDbList: Function }) {
  const [dbForm, setDbForm] = useImmer<IConnect>({
    host: "xxxxxxxxxxxx",
    port: 3306,
    database: "xxxxxxxxxxxxx",
    user: "root",
    password: "xxxxxxxxxxxxxxxxx",
  });

  const [connectStatus, setConnectStatus] = useImmer(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = event.target;
    setDbForm((draft: any) => {
      draft[name] = name === "port" ? Number(value) : value;
    });
  };

  const handleSubmit = async (dataForm: IConnect) => {
    const res = await fetch("/api/db", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForm),
    });
    const {
      data: { databases = [] },
      code = 200,
    } = await res.json();
    setDbList((draft: any) => {
      draft.splice(0, draft.length);
      draft.push(...databases);
    });
    setConnectStatus(false);
  };

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
              name="host"
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
              name="port"
              onChange={handleChange}
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
              name="database"
              onChange={handleChange}
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
              name="user"
              onChange={handleChange}
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
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <Button
            onClick={() => {
              setConnectStatus(true);
              handleSubmit(dbForm)
            }}
            disabled={connectStatus}
            type="submit"
            className="w-full">
            {connectStatus ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <></>
            )}
            测试连接
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
