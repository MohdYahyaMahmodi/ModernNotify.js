# ModernNotify.js

ModernNotify.js is a versatile and customizable notification library for web applications. It provides an easy way to create and manage various types of notifications with features like customizable styles, animations, sound effects, and more.

## Features

- Multiple notification types: success, error, warning, info
- Customizable positions
- Animation styles
- Progress bar
- Themes (light, dark, custom)
- RTL support
- Sound notifications
- Grouping of similar notifications
- Persistent notifications
- Action buttons
- Accessibility features
- Responsive design

## Demo

Check out the [ModernNotify.js Demo](https://mohdyahyamahmodi.github.io/ModernNotify.js) to see the library in action.

## Documentation

  For detailed usage instructions and API reference, please refer to our [Documentation](https://mohdyahyamahmodi.github.io/ModernNotify.js/doc.html).
## Installation

### npm

You can install ModernNotify via npm:

```bash
npm install modernnotify
```

### CDN

Or include it via CDN:

#### UMD (Universal Module Definition)

```html
<script src="https://cdn.jsdelivr.net/npm/modernnotify@latest/dist/modernnotify.min.js"></script>
```

#### ESM (ECMAScript Module)

```html
<script type="module">
  import ModernNotify from 'https://cdn.jsdelivr.net/npm/modernnotify@latest/dist/ModernNotify.esm.js';
  
  // Initialize ModernNotify
  ModernNotify.init();
  
  // Now you can use ModernNotify
  ModernNotify.success('Hello, World!');
</script>
```

#### TypeScript Usage

If you're using TypeScript, you can import ModernNotify like this:

```typescript
import ModernNotify from 'modernnotify';

// Initialize ModernNotify
ModernNotify.init();

// Now you can use ModernNotify
ModernNotify.success('Hello, TypeScript!');
```

Note: Using `@latest` will always fetch the most recent version. While this ensures you have the latest features, it may introduce breaking changes in your project. For production environments, consider specifying a fixed version number.

## Basic Usage

```javascript
// Initialize ModernNotify
ModernNotify.init({
  position: 'top-right',
  theme: 'light'
});

// Create a notification
ModernNotify.success('Operation completed successfully!');
```

## Contributing

We welcome contributions to ModernNotify.js! Please read our contribution guidelines:

- For a pull request to be considered it must resolve a bug, or add a feature which is beneficial to a large audience.
- Pull requests must pass existing unit tests, CI processes, and add additional tests to indicate successful operation of a new feature, or the resolution of an identified bug.
- Requests must be made against the `develop` branch. Pull requests submitted against the `master` branch will not be considered.
- All pull requests are subject to approval by the repository owners, who have sole discretion over acceptance or denial.

## License

ModernNotify.js is open-source software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Author

ModernNotify.js is created and maintained by Mohd Mahmodi. 

Follow Mohd on Twitter: [@mohdmahmodi](https://twitter.com/mohdmahmodi)

## Copyright

Copyright © 2024 Mohd Mahmodi. All rights reserved.