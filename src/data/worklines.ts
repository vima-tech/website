// 首页与「工作」页的多线时间轴数据。
// 日期取自各项目仓库的提交记录；对外只写到产品层面，不写客户与现场细节。

export interface Station {
  date: string; // YYYY-MM-DD
  text: string;
  major?: boolean;
}

export interface WorkLine {
  id: string;
  name: string;
  short: string; // 线路图上的线名
  color: string; // CSS 变量名
  group: 'product' | 'medatlas';
  summary: string;
  status: string;
  link?: { href: string; label: string };
  // 从另一条线分出（画成弯道）
  branchFrom?: string;
  // 计划归集到另一条线（画成虚线连接）
  mergesInto?: string;
  stations: Station[];
}

// 时间轴起点固定；「今天」每次请求按北京时间现取，右端留出 6 天空白
export const RANGE_START = '2026-08-24';
const TAIL_DAYS = 6;

export function today() {
  // en-CA 的日期格式正好是 YYYY-MM-DD
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai' }).format(new Date());
}

export function timelineRange() {
  const t = today();
  const end = new Date(Date.parse(t) + TAIL_DAYS * 86400000).toISOString().slice(0, 10);
  return { start: RANGE_START, today: t, end };
}

export const worklines: WorkLine[] = [
  {
    id: 'factory',
    name: '河北工厂网',
    short: '河北工厂网',
    color: '--line-factory',
    group: 'product',
    summary:
      '河北源头工厂名录。按「产品 → 产业 → 产地 → 厂家」组织全省 167 个区县的产业数据，采购商可以直接找到厂家谈批量和长期合作。',
    status: '网站 2.0 与采购工作台稳定运行，持续维护企业名录；网站 3.0 方案设计中。',
    link: { href: 'https://hebeigongchang.cn', label: 'hebeigongchang.cn' },
    stations: [
      { date: '2026-09-04', text: '立项，整理全省 167 个区县、495 条区县产业', major: true },
      { date: '2026-09-22', text: '180 家企业入驻上线，企业库到 14,809 家' },
      { date: '2026-10-09', text: '正式域名 hebeigongchang.cn 启用', major: true },
      { date: '2026-10-19', text: '统一账号，小程序 v2 本地完成' },
      { date: '2026-10-26', text: '工厂目录、私密采购与企业自助维护' },
      { date: '2026-10-31', text: '网站 2.0 与采购工作台', major: true },
      { date: '2026-11-04', text: '网站 2.0 收口，启动 3.0 方案设计' },
      { date: '2026-11-12', text: '入驻邮箱退信核查，失效企业批量下线' },
    ],
  },
  {
    id: 'uniform',
    name: '校服SHOP',
    short: '校服SHOP',
    color: '--line-uniform',
    group: 'product',
    summary:
      '校服直售小程序和后台。家长零售、学校集中采购、供应商备货代发走同一套订单；已导入石家庄 1,859 条学校与学段资料。',
    status: '本地实现 96 项功能，正在接真实微信支付与物流，未上线。',
    stations: [
      { date: '2026-10-11', text: '需求与原型启动，评审基线 79 项功能', major: true },
      { date: '2026-10-17', text: '可交互 H5 预览' },
      { date: '2026-10-20', text: '供应协同：买断、代发、寄售、按单生产、学校集采', major: true },
    ],
  },
  {
    id: 'medatlas',
    name: 'MedAtlas 医院产品框架',
    short: 'MedAtlas',
    color: '--line-medatlas',
    group: 'medatlas',
    summary:
      '和 HIS 厂商一起开发的医院周边系统底座。营养、输血、审方、随访这些专业产品共用一套权限、审计、打印和交付打包，可以单独装，也可以组合装。',
    status: '审方、营养、输血、随访已在框架上组合装配，完成旧系统切换与回滚演练，正在逐项确认上线前事项。',
    stations: [
      { date: '2026-10-03', text: '框架立项', major: true },
      { date: '2026-10-05', text: '模块化脚手架与按权限导航' },
      { date: '2026-10-17', text: '多系统工作台与单系统独享模式' },
      { date: '2026-10-31', text: '医院脚手架差距复核，按等保三级定目标' },
      { date: '2026-11-02', text: '统一 UI 组件库、平台与上线部署控制台', major: true },
      { date: '2026-11-14', text: '组合装配切换演练、回滚演练与上线前确认清单', major: true },
    ],
  },
  {
    id: 'rx',
    name: '审方 · 处方智能审查',
    short: '审方',
    color: '--line-rx',
    group: 'medatlas',
    mergesInto: 'medatlas',
    summary: '医院内网的处方审查系统：医生开方时同步审方，药师在工作台处理，规则来自药学知识包。',
    status: '医生端 SDK 与 HIS 对接持续调整，功能逐项归集到 MedAtlas。',
    stations: [
      { date: '2026-08-31', text: '开工', major: true },
      { date: '2026-09-30', text: 'v2.0 区域审方中心与药师工作台' },
      { date: '2026-10-30', text: '处方整组审查、药品专项审查与调用审计' },
      { date: '2026-11-03', text: '离线上线包与现场一键部署', major: true },
      { date: '2026-11-09', text: '医生端 SDK 2.4.5 兼容旧内核浏览器，药品说明书库并入部署' },
      { date: '2026-11-14', text: '归集 MedAtlas：接单科室、目录批量导入、医生端 SDK 2.5.0' },
    ],
  },
  {
    id: 'nutrition',
    name: '营养 · 院外营养管理',
    short: '营养',
    color: '--line-nutrition',
    group: 'medatlas',
    mergesInto: 'medatlas',
    summary: '患者出院后的营养随访与健康管理，医生端和患者端两头用。',
    status: '需求变更已实现并验收，功能正在归集到 MedAtlas，新增智能营养辅助诊疗。',
    stations: [
      { date: '2026-09-25', text: '首版导入，上线前两轮问题扫描', major: true },
      { date: '2026-10-20', text: '操作演示视频' },
      { date: '2026-10-25', text: '管理功能与需求变更方案' },
      { date: '2026-11-04', text: '需求变更实现与验收，更新演示视频', major: true },
      { date: '2026-11-14', text: '智能营养辅助诊疗：指南共识库与规则草案' },
    ],
  },
  {
    id: 'transfusion',
    name: '输血 · 临床输血闭环',
    short: '输血',
    color: '--line-transfusion',
    group: 'medatlas',
    mergesInto: 'medatlas',
    summary: '从用血申请、分级审批、配血发血，到床旁输注、效果评价和血袋回收，每一步留痕可追溯。',
    status: '院内运行中，按使用反馈迭代；已对接省级血站平台。',
    stations: [
      { date: '2026-09-25', text: '开工', major: true },
      { date: '2026-09-28', text: '用血主流程安全拦截，ABO 相容规则与腕带核对' },
      { date: '2026-10-11', text: '对接 HIS 平台接口' },
      { date: '2026-10-31', text: 'HIS 嵌入接入与系统安全' },
      { date: '2026-11-03', text: '院内上线交付', major: true },
      { date: '2026-11-09', text: '接通 HIS 输血网关，患者资料自动带出，诊断手术编码联想录入' },
      { date: '2026-11-13', text: '对接省级血站与省级平台', major: true },
    ],
  },
  {
    id: 'followup',
    name: '随访 · 出院回访',
    short: '随访',
    color: '--line-followup',
    group: 'medatlas',
    branchFrom: 'medatlas',
    summary: '第一个直接在 MedAtlas 上长出来的专业产品：回访任务、通话记录、问卷和统计报表。',
    status: '11.15 与医院 HIS 测试环境联调接口，11.16 到医院现场测试随访硬件设备。',
    stations: [
      { date: '2026-10-20', text: '回访产品预研', major: true },
      { date: '2026-10-23', text: '阶段 1～2 功能切片' },
      { date: '2026-10-31', text: '通话、统计与报表导出' },
      { date: '2026-11-01', text: '回访问卷与本地验收', major: true },
      { date: '2026-11-14', text: '短信、患者端网页、群发关怀与复诊提醒' },
      { date: '2026-11-15', text: 'HIS 测试环境接口联调，发布对接规范 V1.4', major: true },
    ],
  },
];

export function lineById(id: string) {
  return worklines.find((l) => l.id === id);
}

export function formatDate(d: string) {
  const [, m, day] = d.split('-');
  return `${Number(m)}.${Number(day)}`;
}
