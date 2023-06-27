## 开发阶段

1. 先做出页面整体 Layout 和 Router 结构，实现基础的数据填充
2. 用 Node 搭建一个模拟后端，模拟数据读取和登录情况
3. 联合建立 Flask 接口
4. 对样式和动画进行调整

## 分区 TODO

### 样式想法

- [ ] 下拉选框动画
- [ ] 卡片半透明背景
- [ ] 页面整体采用 CSS 动画作为背景
- [ ] 支持自动/手动暗黑模式切换

### 模型选择

- [ ] 将选框做成下拉式的

### 模型训练

- [ ] 训练模型单独做成一页，内容包括数据上传、效果预览
- [ ] 包含 Console（可选打开），通过 WebSocket 实时获取线上 Log
- [ ] 效果预览是折线图上绘制出预测曲线和实际曲线的对比

### 模型应用

- [ ] 提供表格数据预览功能
- [ ] 添加文件后自动校验，校验中边框为蓝色滚动，校验合并完成后为绿色常显，校验失败为红色常显
- [ ] 包含 Console（可选打开），通过 WebSocket 实时获取线上 Log

### 运行结果

- [ ] 折线图预测部分突出显示，超长部分作采样
- [ ] 折线图支持拖动和放大
- [ ] 下方添加预测部分单独大图
- [ ] 上方添加数据后下方的折线图就立刻刷新显示
- [ ] 添加预测结果数据下载入口