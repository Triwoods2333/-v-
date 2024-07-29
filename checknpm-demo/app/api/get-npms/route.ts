import npms from "@/components/npms";
import { Npm } from "@/types/npm";

export function GET(req: Request) {
  const mockNpms: Npm[] = [
    {
      packageName: "package1",
      isDangerous: true,
      vulnerabilities: ["vuln1", "vuln2"],
      description: "This is package 1",
    },
    {
      packageName: "package2",
      isDangerous: false,
      vulnerabilities: ["vuln3"],
      description: "This is package 2",
    },
    // 添加更多的mock数据...
  ];
  return Response.json({
    code: 0,
    message: "ok",
    data: mockNpms,
  });
}
