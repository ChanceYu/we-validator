# Changelog

> 更新日志（推荐使用最新版本）

## Released


### [v2.1.16](https://github.com/ChanceYu/we-validator/releases/tag/v2.1.16)
- 修复：错误 message 的显示优化[pull](https://github.com/ChanceYu/we-validator/pull/16)
- 修复：修改空指针和语法修改[pull](https://github.com/ChanceYu/we-validator/pull/17)
- 修复：required: false 不进行“必须”验证[pull](https://github.com/ChanceYu/we-validator/pull/18)


### [v2.1.15](https://github.com/ChanceYu/we-validator/releases/tag/v2.1.15)
- 修复：部分ts定义错误[issue](https://github.com/ChanceYu/we-validator/issues/15)


### [v2.1.14](https://github.com/ChanceYu/we-validator/releases/tag/v2.1.14)
- 新增：添加ts的定义文件[merge](https://github.com/ChanceYu/we-validator/pull/14)


### [v2.1.11](https://github.com/ChanceYu/we-validator/releases/tag/v2.1.11)
- 修复：手机号以 `16` 开头的校验问题[issue](https://github.com/ChanceYu/we-validator/issues/12)


### [v2.1.10](https://github.com/ChanceYu/we-validator/releases/tag/v2.1.10)
- 新增：`.checkFields` 方法，可校验对应的字段，[参考](./README.md#checkfieldsdata-fields-onmessage)
- 修改：`.isValid` 方法，可校验对应的字段，[参考](./README.md#isvaliddata-fields)


### [v2.1.9](https://github.com/ChanceYu/we-validator/releases/tag/v2.1.9)
- 优化：部分规则
- 补充文档和增加动态字段校验使用示例


### [v2.1.8](https://github.com/ChanceYu/we-validator/releases/tag/v2.1.8)
- 修复：中文校验规则
- 修复：多个实例参数覆盖问题


### [v2.1.7](https://github.com/ChanceYu/we-validator/releases/tag/v2.1.7)
- 优化：校验逻辑


### [v2.1.6](https://github.com/ChanceYu/we-validator/releases/tag/v2.1.6)
- 修复：`WeValidator.checkValue` 校验空字段不符合预期
- 优化：`multiCheck` 为 `true` 时错误显示


### [v2.1.5](https://github.com/ChanceYu/we-validator/releases/tag/v2.1.5)
- 修改：通用正则校验
```diff
- regex
+ pattern
```
- 增加：1.x 到 2.x [升级指南](./UPGRADE.md)


### [v2.1.4](https://github.com/ChanceYu/we-validator/releases/tag/v2.1.4)
- 优化：自定义规则添加方式


### [v2.1.2](https://github.com/ChanceYu/we-validator/releases/tag/v2.1.2)
- 修改：静态方法 `WeValidator.checkValue`
```diff
- WeValidator.checkField
+ WeValidator.checkValue
```
- 修改文档


### [v2.1.1](https://github.com/ChanceYu/we-validator/releases/tag/v2.1.1)
- 新增：规则：`notEqualTo、notContains、integer、ipv4、ipv6`
- 新增：示例：[复杂的校验案例-自定义规则](./example/complex/index.html)


### [v2.1.0](https://github.com/ChanceYu/we-validator/releases/tag/v2.1.0)
- 重构：核心方法
- 重写：核心校验规则和默认提供的自定义规则
- 单独校验字段方法修改


### [v1](https://github.com/ChanceYu/we-validator/releases/tag/v1)（v1.0.0 - v1.4.3）
- v1 版本 `we-validator`