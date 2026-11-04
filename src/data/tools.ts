// 做项目顺手沉淀下来的 AI 工具：开源项目、给编码代理用的技能、还在探索的方向。
// since 取自各仓库首次提交；只有公开仓库才放链接。

export interface Tool {
  id: string;
  name: string;
  kind: '开源' | '技能' | '探索';
  since?: string; // YYYY-MM
  text: string;
  link?: string;
}

export const tools: Tool[] = [
  {
    id: 'autoforge',
    name: 'AutoForge',
    kind: '开源',
    since: '2026-05',
    text: '人在闸门上签字放行的自主软件产线：一个人管一支 AI 工厂，判断力只花在关键决策上。',
    link: 'https://github.com/vima-tech/AutoForge',
  },
  {
    id: 'innate',
    name: 'Innate',
    kind: '开源',
    since: '2026-06',
    text: '给 AI 代理用的程序性知识层：在 token 预算内装配最相关的做法，规则靠实际结果自我修正。',
    link: 'https://github.com/vima-tech/Innate',
  },
  {
    id: 'telos',
    name: 'Telos',
    kind: '探索',
    since: '2026-05',
    text: '跑在 Claude Code 里的个人能力系统：有收获的对话提炼成技能，下次同类话题自动加载。',
  },
  {
    id: 'steward',
    name: 'Steward',
    kind: '探索',
    since: '2026-09',
    text: '项目排期与 Agent 协作工作台：多条线的任务排期、执行器和通知渠道，给一人公司当调度台。',
  },
  {
    id: 'demo-video',
    name: '操作演示视频',
    kind: '技能',
    text: '给任何 Web 系统录演示视频：真实账号走完流程、逐帧录制、配音与逐句字幕自动合成，顺带出带账号标注的人工走查图。',
  },
  {
    id: 'api-spec',
    name: '接口对接文档',
    kind: '技能',
    text: '把接口资料整理成实施方直接能看懂的正式对接文档：固定章节顺序、纯黑白 Word 样式，用于 HIS 与院内系统对接。',
  },
  {
    id: 'quant',
    name: '量化交易',
    kind: '探索',
    since: '2026-05',
    text: 'BTC/ETH/SOL 现货趋势跟随策略：双周期均线判断行情状态，驱动四档目标仓位，带崩盘熔断；Rust 回测引擎。',
  },
];
