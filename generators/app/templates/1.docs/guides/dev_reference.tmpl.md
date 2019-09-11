## Development reference

### Node.JS相关

以下功能均基于Node.JS，使用前请先确保安装了[Node.JS](https://nodejs.org/zh-cn/download/)并在项目根目录下执行`npm install`。

- 通过 `commitlint` + `husky` 自动控制commit规范（安装husky会修改githook，因此需要确保已经执行`git init`）
- 使用 `npm run commit` 通过交互模式提交代码
- 使用 `npm run release` 根据提交记录自动调整版本并生成相应的CHANGELOG
