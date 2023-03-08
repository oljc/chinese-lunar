> [English](./CONTRIBUTING.EN.md) | 简体中文
> 
# 贡献指南

感谢你的宝贵时间。你的贡献将使这个项目变得更好！在提交贡献之前，请务必花点时间阅读下面的入门指南。

## 行为准则

该项目有一份 [行为准则](./CODE_OF_CONDUCT.md)，希望参与项目的贡献者都能严格遵守。

## 透明的开发

所有工作都直接透明地在 GitHub 上进行。核心团队成员和外部贡献者的 pull requests 都需要经过相同的 review 流程。

## 语义化版本

该项目遵循语义化版本。我们对重要的漏洞修复发布修订号，对新特性或不重要的变更发布次版本号，对重大且不兼容的变更发布主版本号。

每个重大更改都将记录在 changelog 中。

## 报告 Issues

我们使用 [Github issues](https://github.com/LIjiAngChen8/chinese-lunar/issues) 进行 bug 报告和新 feature 建议。在报告 bug 之前，请确保已经搜索过类似的 [问题](https://github.com/LIjiAngChen8/chinese-lunar/issues)，因为它们可能已经得到解答或正在被修复。对于 bug 报告，请包含可用于重现问题的代码。对于新 feature 建议，请指出你想要的更改以及期望的行为。

## 提交 Pull Request

1. Fork [此仓库](https://github.com/LIjiAngChen8/chinese-lunar)，从 `main` 创建分支。
2. 确保您已经安装了yarn包管理工具，执行 `yarn install` 安装项目依赖。
3. 做出您的修改。
4. 执行 `yarn lint-staged` 检查并修复代码.
5. 对代码库进行更改。如果适用的话，请确保写了相应的测试。
6. 确认代码格式以及所有的测试都是通过的。
7. 提交 git commit, 请同时遵守 [Commit 规范](#commit-指南)。
8. 提交 pull request, 如果有对应的 issue，请进行[关联](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword)。

## Commit 指南

Commit messages 请遵循[conventional-changelog 标准](https://www.conventionalcommits.org/en/v1.0.0/)：

```bash
<类型>[可选 范围]: <描述>

[可选 正文]

[可选 脚注]
```

### Commit 类型

以下是 commit 类型列表:

- feat: 新特性或功能
- fix: 缺陷修复
- docs: 文档更新
- style: 代码风格或者组件样式更新
- refactor: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）
- perf: 性能优化
- test: 单元测试
- build: 影响项目构建或依赖项修改
- revert: 恢复上一次提交
- ci: 持续集成相关文件修改
- chore: 其他修改（不在上述类型中的修改）
- workflow: 工作流相关文件修改


## 项目结构目录

```
├── dist (注意：不用编辑该文件夹下的文件，它是由rollup打包生成的)
├── example (演示)
│   └── xxx
│
├── docs (官方文档网站)
│   │
│   │── .vitepress (工具配置文件)
│   └──  ...md（Markdown文件）
│
├── src (项目)
│   │
│   │── constant.ts (常量)
│   │── index.ts（主入口）
│   └── utils.ts（工具）
│
├── test
│   ├── demo.test.js (快照测试)
│   └── utils.test.js (单元测试)
│ 
└── ....（项目相关配置文件）

```

请注意: 如果进行了影响整体项目的破坏性变更(例如 rollup)，请确保经过全方面的测试无误后提交。

## License

[MIT 协议](./LICENSE).
