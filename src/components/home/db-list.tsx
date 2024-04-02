import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";

export default function DBList({ dbList = [] }) {
  return (
    <div className="lg:col-span-2 flex gap-4 flex-col">
      <div className="flex gap-4 items-center">
        <Label htmlFor="databases">数据库</Label>
        <Select id="databases">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="请选择导出的数据库" />
          </SelectTrigger>
          <SelectContent>
            {dbList.length > 0 ? (
              dbList.map(({ Database = "" }, index) => {
                return (
                  <SelectItem key={index} value={Database} className=" cursor-pointer">
                    {Database}
                  </SelectItem>
                );
              })
            ) : (
              <SelectItem value="no" className=" text-center">暂无数据</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
      <Card>
        <CardHeader className="px-7">
          <CardTitle>数据模型列表（Table）</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>表名</TableHead>
                <TableHead className="hidden sm:table-cell">引擎</TableHead>
                <TableHead className="hidden sm:table-cell">创建时间</TableHead>
                <TableHead className="hidden md:table-cell">更新时间</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dbList.map((item, index) => {
                return (
                  <TableRow key={index} className="bg-accent">
                    <TableCell>
                      <div className="font-medium">Liam Johnson</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        liam@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">Sale</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="text-xs" variant="secondary">
                        Fulfilled
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      2023-06-23
                    </TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
