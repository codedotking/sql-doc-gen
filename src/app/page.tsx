"use client";
import DBForm from "@/components/home/db-form";
import DBList from "@/components/home/db-list";
import { useImmer } from "use-immer";

export default function HomePage() {
  const [dbList, setDbList] = useImmer([]);

  return (
    <div className="flex min-h-screen w-full flex-col sm:gap-4 sm:py-4 bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <div className="relative ml-auto flex-1">数据库文档生成</div>
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1  static  top-4 sm:sticky">
          <DBForm setDbList={setDbList} />
        </div>
        <DBList dbList={dbList} />
      </main>
    </div>
  );
}
