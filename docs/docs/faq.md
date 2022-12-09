---
order: 3
---

# 常见问题

## 如何关闭表单自动填充

> 参考：
>
> - [如何关闭表单自动填充](https://developer.mozilla.org/zh-CN/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion)

通常设置 `autocomplete="off"` 并不能阻止 Chrome 中的自动填充，需要设置成 `autocomplete="new-password"` 才生效。

可以在 `BizForm` 中添加下面代码：

```typescript
{/* <!-- 阻止浏览器的自动填充 --> */}
<input
  type="text"
  name="_prevent_auto_complete_name"
  autoComplete="off"
  readOnly={true}
  style={{ display: 'none' }}
/>
<input
  type="password"
  name="_prevent_auto_complete_pass"
  autoComplete="new-password"
  readOnly={true}
  style={{ display: 'none' }}
/>
{/* <!-- End 阻止浏览器的自动填充 --> */}
```
