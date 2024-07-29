"use client";
import { Npm } from "@/types/npm";
import { useState, useEffect } from "react";
import NpmdemoList from "../npms/NpmdemoList";
import Mock from 'mockjs';

interface Props {
  npms: Npm[];
}

/**
 * mock 数据
 */
function data(length: number = 10) {
  const data = Mock.mock({
    [`data|${length}`]: [
      {
        packageName: '@ctitle(10)',
        isDangerous() {
          return Boolean(Math.round(Math.random()))
        },
        vulnerabilities: ["信息泄露", "隐蔽传输"],
        description: '@csentence(15)'
      }
    ]
  }) as { data: Npm[] }

  return data.data
}

const initialMockData: Npm[] = [
  {
    packageName: "zilliqa-testing-library-99.10.9",
    isDangerous: true,
    vulnerabilities: ["信息泄露", "隐蔽传输"],
    description:
      "该包使用 DNS 查询和 HTTPS 请求将收集到的系统和用户信息泄露到外部服务器",
  },
  {
    packageName: "zvulnerabilityscanner-1.0.0",
    isDangerous: true,
    vulnerabilities: ["命令执行"],
    description:
      "该代码使用 curl 命令从外部 URL 下载可执行文件 (a_1.exe)，并在下载完成后立即执行此文件 (a.exe)",
  },
  {
    packageName: "tslib",
    isDangerous: false,
    vulnerabilities: [],
    description: "",
  },
  // 添加更多的mock数据...
];

export default function Index({ npms }: Props) {
  const [npmList, setNpmList] = useState<Npm[]>([]);
  const [dangerCount, setDangerCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const count = npmList.filter(item => item.isDangerous).length;
      setDangerCount(count);
    }
  }, [npmList, isRunning]);

  const handleAddNpm = (newNpm: Npm) => {
    setNpmList([...npmList, newNpm]);
  };

  const handleStart = () => {
    setNpmList([...initialMockData, ...data()]);
    setIsRunning(true);
  };

  return (
    <div className="mt-[-50px]">
      <section>
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24">
          <div className="mb-8 text-center md:mb-12 ">
            <h2 className="text-3xl font-bold md:text-5xl text-primary">
              已检测的软件包列表
            </h2>
            {!isRunning && (
              <button 
                onClick={handleStart} 
                className="mt-4 px-4 py-2 bg-[hsl(var(--primary))] rounded-[1vw] text-white rounded"
              >
                开始运行
              </button>
            )}
            {isRunning && (
              <>
                <p className="mt-4 text-[#636262] sm:text-sm md:text-base">
                  以下列出了已检测的软件包，包括它们的安全状态和漏洞信息。
                </p>
                <p className="mt-2 text-[#ff0000]">
                  恶意包数量: {dangerCount}
                </p>
                <NpmdemoList  npms={npmList} onAddNpm={handleAddNpm} />
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
