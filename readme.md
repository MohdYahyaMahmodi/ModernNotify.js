# ModernNotify.js

[![npm version](https://img.shields.io/npm/v/modernnotify.svg)](https://www.npmjs.com/package/modernnotify)
[![npm downloads](https://img.shields.io/npm/dw/modernnotify.svg)](https://www.npmjs.com/package/modernnotify)
[![license](https://img.shields.io/npm/l/modernnotify.svg)](https://opensource.org/licenses/MIT)
[![bundle size](https://img.shields.io/bundlephobia/minzip/modernnotify)](https://bundlephobia.com/package/modernnotify)

A notification library for the web. Toasts, alerts, and inline messages with
themes, animations, progress bars, action buttons, and no dependencies.

Built and maintained by [Mohd Mahmodi](https://mohdmahmodi.com).

```bash
npm install modernnotify
```

```js
import ModernNotify from "modernnotify";

ModernNotify.init({ position: "top-right", theme: "dark" });
ModernNotify.success("Saved.");
```

## Why this one

Most notification libraries either pull in a framework or give you one style of
toast and nothing else. ModernNotify is plain JavaScript, works in any project,
and covers the cases you actually hit: a message that needs a button on it, a
job with a progress bar, a queue of duplicate errors that should collapse into
one, a right-to-left layout.

- **No dependencies.** Drop it into anything.
- **Four types** out of the box: success, error, warning, info.
- **Nine positions**, four animation styles.
- **Themes**, including light, dark, and your own.
- **Action buttons** so a notification can do something.
- **Grouping**, so ten identical errors become one with a count.
- **Persistent notifications** that wait for the user.
- **Progress bars** for long-running work.
- **Sound**, optional and off by default.
- **RTL support.**
- **Accessible.** ARIA live regions, keyboard dismissal, respects
  `prefers-reduced-motion`.
- **TypeScript types** included.

## Install

### npm

```bash
npm install modernnotify
```

### CDN

UMD:

```html
<script src="https://cdn.jsdelivr.net/npm/modernnotify@1/dist/modernnotify.min.js"></script>
```

ESM:

```html
<script type="module">
  import ModernNotify from "https://cdn.jsdelivr.net/npm/modernnotify@1/dist/modernnotify.esm.js";
  ModernNotify.init();
  ModernNotify.success("Hello");
</script>
```

Pin a major version in production. `@latest` can pull in breaking changes.

## Usage

### Initialise once

```js
ModernNotify.init({
  position: "top-right",
  theme: "light",
  duration: 4000,
  animation: "slide",
  maxVisible: 4,
  rtl: false,
  sound: false,
});
```

### Show a notification

```js
ModernNotify.success("Changes saved.");
ModernNotify.error("Could not reach the server.");
ModernNotify.warning("Your session expires in 5 minutes.");
ModernNotify.info("A new version is available.");
```

### With a title and options

```js
ModernNotify.error("Upload failed", {
  title: "Network error",
  duration: 0, // 0 stays until dismissed
  actions: [
    { label: "Retry", onClick: () => upload() },
    { label: "Dismiss", onClick: (n) => n.close() },
  ],
});
```

### Progress

```js
const n = ModernNotify.info("Uploading", { progress: 0, duration: 0 });

xhr.upload.onprogress = (e) => n.setProgress(e.loaded / e.total);
xhr.onload = () => n.update("Uploaded", { type: "success", duration: 3000 });
```

### Grouping

```js
ModernNotify.error("Request failed", { group: "api-error" });
```

Repeated notifications sharing a `group` collapse into one with a counter
instead of stacking.

### Dismissing

```js
const n = ModernNotify.info("Working");
n.close();

ModernNotify.closeAll();
```

## API

### `ModernNotify.init(options)`

| Option         | Type    | Default       | Description                                                                                                                           |
| -------------- | ------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `position`     | string  | `"top-right"` | `top-left`, `top-center`, `top-right`, `middle-left`, `middle-center`, `middle-right`, `bottom-left`, `bottom-center`, `bottom-right` |
| `theme`        | string  | `"light"`     | `light`, `dark`, or a custom theme name                                                                                               |
| `duration`     | number  | `4000`        | Milliseconds before auto-dismiss. `0` disables it                                                                                     |
| `animation`    | string  | `"slide"`     | `slide`, `fade`, `scale`, `none`                                                                                                      |
| `maxVisible`   | number  | `5`           | Notifications shown at once. The rest queue                                                                                           |
| `rtl`          | boolean | `false`       | Right-to-left layout                                                                                                                  |
| `sound`        | boolean | `false`       | Play a sound on show                                                                                                                  |
| `pauseOnHover` | boolean | `true`        | Pause the dismiss timer on hover                                                                                                      |

### Notification methods

| Method                       | Returns      | Description                             |
| ---------------------------- | ------------ | --------------------------------------- |
| `success(message, options?)` | Notification | Success notification                    |
| `error(message, options?)`   | Notification | Error notification                      |
| `warning(message, options?)` | Notification | Warning notification                    |
| `info(message, options?)`    | Notification | Info notification                       |
| `closeAll()`                 | void         | Dismiss everything, including the queue |

### Per-notification options

| Option     | Type     | Description                        |
| ---------- | -------- | ---------------------------------- |
| `title`    | string   | Bold line above the message        |
| `duration` | number   | Overrides the global duration      |
| `progress` | number   | `0` to `1`. Shows a progress bar   |
| `actions`  | array    | `{ label, onClick }` buttons       |
| `group`    | string   | Collapse duplicates under this key |
| `onClose`  | function | Called when dismissed              |
| `icon`     | string   | Custom icon markup                 |

### Notification instance

| Method                      | Description                         |
| --------------------------- | ----------------------------------- |
| `close()`                   | Dismiss this notification           |
| `update(message, options?)` | Change it in place                  |
| `setProgress(value)`        | Update the progress bar, `0` to `1` |

## Custom themes

```js
ModernNotify.registerTheme("terminal", {
  background: "#0b0b0b",
  text: "#e6e6e6",
  success: "#2ea043",
  error: "#e5484d",
  warning: "#d29922",
  info: "#3178c6",
  radius: "2px",
  font: "'JetBrains Mono', monospace",
});

ModernNotify.init({ theme: "terminal" });
```

## TypeScript

Types ship with the package, no `@types` install needed.

```ts
import ModernNotify, { NotifyOptions } from "modernnotify";

const opts: NotifyOptions = { title: "Done", duration: 2000 };
ModernNotify.success("Saved", opts);
```

## Browser support

Chrome, Edge, Firefox, and Safari, current and previous major versions.
No polyfills required.

## Contributing

Pull requests are welcome if they fix a bug or add something broadly useful.
Open against `develop`, keep the existing tests passing, and add tests for
anything new.

## License

MIT.

## Author

Built by **Mohd Mahmodi**, a software engineer in San Francisco who builds web
apps, iOS apps, and real-time systems.

- Site: [mohdmahmodi.com](https://mohdmahmodi.com)
- GitHub: [@mohdmahmodi](https://github.com/mohdmahmodi)
- X: [@mohdmahmodi](https://x.com/mohdmahmodi)

Other packages: [`@mohdmahmodi/p2p-net`](https://www.npmjs.com/package/@mohdmahmodi/p2p-net),
zero-config peer-to-peer networking with end-to-end encryption over WebRTC.
