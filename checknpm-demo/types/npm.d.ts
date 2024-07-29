export interface Npm {
  packageName: string;
  isDangerous: boolean;
  vulnerabilities: string[];
  description: string;
  // 其他属性...
}
