

## Table of Contents

1. [Introduction](#1-introduction)
2. [Installation](#2-installation)
3. [Initialization](#3-initialization)
4. [Basic Usage](#4-basic-usage)
5. [Notification Types](#5-notification-types)
6. [Configuration Options](#6-configuration-options)
7. [Methods](#7-methods)
8. [Customization](#8-customization)
   - [Custom Icons](#custom-icons)
   - [Custom Themes](#custom-themes)
   - [Custom Templates](#custom-templates)
   - [Custom Animations](#custom-animations)
9. [Advanced Features](#9-advanced-features)
   - [Action Buttons](#action-buttons)
   - [Grouping Notifications](#grouping-notifications)
   - [Persistent Notifications](#persistent-notifications)
   - [Sound Notifications](#sound-notifications)
   - [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
10. [Accessibility](#10-accessibility)
11. [Responsive Design](#11-responsive-design)
12. [Best Practices](#12-best-practices)
13. [Troubleshooting](#13-troubleshooting)
14. [API Reference](#14-api-reference)

## 1. Introduction

ModernNotify.js is a versatile and customizable notification library for web applications. It provides an easy way to create and manage various types of notifications with features like customizable styles, animations, sound effects, and more. This library is designed to be lightweight, flexible, and easy to integrate into any web project.

## 2. Installation

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

### Manual Installation

Alternatively, you can download the library files and include them in your project:

- For standard usage: `dist/modernnotify.js`
- For ES6 modules: `dist/modernnotify.esm.js`
- For minimized browser version: `dist/modernnotify.min.js`

## 3. Initialization

Before using ModernNotify, you need to initialize it with your desired global options:

```javascript
ModernNotify.init({
  // Global options here
  position: 'top-right',
  theme: 'light',
  maxNotifications: 5,
  duration: 5000
});
```

This initialization sets up the default behavior for all notifications. You can override these options for individual notifications when creating them.

## 4. Basic Usage

To create a basic notification, use one of the following methods:

```javascript
ModernNotify.success('Operation completed successfully!');
ModernNotify.error('An error occurred. Please try again.');
ModernNotify.warning('Warning: Low disk space.');
ModernNotify.info('New update available.');
```

These methods create notifications with pre-defined styles and icons for each type.

## 5. Notification Types

ModernNotify supports four types of notifications:

1. **Success**: Use for positive messages or successful operations. Default color: Green.
2. **Error**: Use for error messages or failed operations. Default color: Red.
3. **Warning**: Use for warning messages or potential issues. Default color: Orange.
4. **Info**: Use for general information or neutral messages. Default color: Blue.

Each type has its own default icon and color scheme, which can be customized.

## 6. Configuration Options

ModernNotify offers a wide range of configuration options. Here's a comprehensive list with detailed descriptions:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| position | string | 'top-right' | Position of the notification container. Options: 'top-right', 'top-left', 'bottom-right', 'bottom-left'. |
| animationStyle | string | 'slide' | Animation style for showing/hiding notifications. Options: 'slide', 'fade'. |
| slideDirection | string | 'right' | Direction for sliding animations. Options: 'right', 'left', 'top', 'bottom'. |
| maxNotifications | number | 3 | Maximum number of notifications shown simultaneously. |
| allowHtml | boolean | false | Whether to allow HTML content in notifications. |
| theme | string | 'light' | Default theme. Options: 'light', 'dark'. |
| showProgressBar | boolean | true | Display a progress bar at the bottom of the notification. |
| closeOnClick | boolean | true | Close the notification when clicked anywhere on it. |
| pauseOnHover | boolean | true | Pause the notification's progress when hovered over. |
| width | string | '300px' | Width of the notification. |
| duration | number | 3000 | Duration the notification is displayed (in milliseconds). |
| iconSvg | object | {...} | SVG icons for different notification types. |
| titles | object | {...} | Default titles for each notification type. |
| onShow | function | null | Callback function executed when a notification is shown. |
| onClose | function | null | Callback function executed when a notification is closed. |
| onClick | function | null | Callback function executed when a notification is clicked. |
| template | function | null | Custom HTML template for notifications. |
| sound | string | null | URL of a sound file to play when the notification is shown. |
| rtl | boolean | false | Right-to-left text direction. |
| grouping | boolean | false | Group identical notifications together. |
| maxGroupSize | number | 5 | Maximum number of notifications in a group. |
| persist | boolean | false | Whether the notification persists until manually closed. |
| actions | array | [] | Array of action buttons to display in the notification. |
| customAnimations | object | null | Custom animations for showing and hiding notifications. |
| customIcons | object | null | Custom icons for notifications. |
| customTheme | object | null | Custom theme settings. |

Example of using options when creating a notification:

```javascript
ModernNotify.info('New message received', {
  duration: 5000,
  position: 'bottom-left',
  theme: 'dark',
  sound: 'path/to/notification-sound.mp3',
  onClick: () => console.log('Notification clicked'),
  actions: [
    {
      text: 'View',
      onClick: (notification) => {
        console.log('View clicked');
        notification.close();
      }
    }
  ]
});
```

## 7. Methods

ModernNotify provides several methods for managing notifications:

- `ModernNotify.init(options)`: Initialize the library with global options.
- `ModernNotify.success(message, options)`: Create a success notification.
- `ModernNotify.error(message, options)`: Create an error notification.
- `ModernNotify.warning(message, options)`: Create a warning notification.
- `ModernNotify.info(message, options)`: Create an info notification.
- `ModernNotify.dismissAll()`: Dismiss all active notifications immediately.
- `ModernNotify.setGlobalOption(key, value)`: Set a global option.
- `ModernNotify.getGlobalOption(key)`: Get the current value of a global option.

Examples:

```javascript
// Initialize with custom global options
ModernNotify.init({
  theme: 'dark',
  position: 'bottom-right',
  duration: 5000
});

// Create a success notification
ModernNotify.success('Your profile has been updated successfully!');

// Create an error notification with custom options
ModernNotify.error('Failed to save changes', {
  duration: 10000,
  persist: true
});

// Set a global option
ModernNotify.setGlobalOption('maxNotifications', 5);

// Get a global option
const currentTheme = ModernNotify.getGlobalOption('theme');
console.log(currentTheme); // 'dark'

// Dismiss all notifications
ModernNotify.dismissAll();
```

## 8. Customization

### Custom Icons

You can provide custom icons for each notification type:

```javascript
ModernNotify.init({
  customIcons: {
    success: '<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>',
    error: '<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',
    warning: '<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',
    info: '<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>'
  }
});
```

### Custom Themes

Create a custom theme by specifying colors:

```javascript
ModernNotify.init({
  customTheme: {
    backgroundColor: '#f0f0f0',
    textColor: '#333333',
    progressBarColor: '#4CAF50',
    titleColor: '#1E88E5'
  }
});
```

This allows you to match the notification style to your application's design.

### Custom Templates

Provide a custom template function for complete control over notification structure:

```javascript
ModernNotify.init({
  template: (message, type, options) => `
    <div class="custom-notification ${type}">
      <div class="icon">${options.iconSvg[type]}</div>
      <div class="content">
        <h3>${options.title}</h3>
        <p>${message}</p>
      </div>
      ${options.closeButton ? '<button class="close-btn">×</button>' : ''}
    </div>
  `
});
```

This function receives the message, notification type, and options, and should return an HTML string.

### Custom Animations

Define custom show and hide animations:

```javascript
ModernNotify.init({
  customAnimations: {
    show: 'slideInRight 0.5s ease',
    hide: 'slideOutRight 0.5s ease'
  }
});
```

These animations should be defined in your CSS. The library will apply them when showing or hiding notifications.

## 9. Advanced Features

### Action Buttons

Add action buttons to notifications for user interaction:

```javascript
ModernNotify.info('Do you want to proceed?', {
  actions: [
    {
      text: 'Yes',
      onClick: (notification) => {
        console.log('Yes clicked');
        notification.close();
      }
    },
    {
      text: 'No',
      onClick: (notification) => {
        console.log('No clicked');
        notification.close();
      }
    }
  ]
});
```

Each action button can have its own click handler, allowing for complex interactions directly from the notification.

### Grouping Notifications

Enable grouping for similar notifications to reduce clutter:

```javascript
ModernNotify.init({
  grouping: true,
  maxGroupSize: 3
});

// These will be grouped if they occur within the notification lifetime
ModernNotify.info('New message from John');
ModernNotify.info('New message from John');
ModernNotify.info('New message from John');
```

When grouping is enabled, identical notifications are combined with a count indicator.

### Persistent Notifications

Create notifications that don't auto-dismiss, requiring user interaction:

```javascript
ModernNotify.warning('Your session will expire soon', {
  persist: true
});
```

Persistent notifications remain visible until manually closed or dismissed programmatically.

### Sound Notifications

Add sound effects to notifications for auditory feedback:

```javascript
ModernNotify.success('Task completed', {
  sound: 'path/to/success-sound.mp3'
});
```

This plays the specified sound file when the notification appears.

### Right-to-Left (RTL) Support

Enable RTL support for languages that read right-to-left:

```javascript
ModernNotify.init({
  rtl: true
});

ModernNotify.info('مرحبا بالعالم'); // "Hello World" in Arabic
```

This adjusts the layout and text direction for RTL languages.

## 10. Accessibility

ModernNotify includes basic accessibility features to ensure notifications are usable by all users:

- Notifications have `role="alert"` and `aria-live="assertive"` attributes, ensuring screen readers announce them immediately.
- Close buttons have `aria-label="Close notification"` for clear purpose identification.
- The library uses semantic HTML structure for better navigation with assistive technologies.
- Color contrasts are designed to meet WCAG guidelines for readability.

Ensure your custom content and templates maintain these accessibility standards.

## 11. Responsive Design

ModernNotify is designed to be responsive across different device sizes:

- On small screens (width <= 480px), notifications will span the full width of the screen for better readability.
- The library automatically adjusts the layout and positioning for different screen sizes.
- Font sizes and padding are set using relative units for consistent appearance across devices.

## 12. Best Practices

1. Use appropriate notification types for different scenarios.
2. Keep messages concise and clear to avoid overwhelming users.
3. Avoid overusing notifications to prevent user fatigue.
4. Use persistent notifications sparingly for important messages only.
5. Test notifications on different devices and screen sizes.
6. Ensure custom templates maintain accessibility features.
7. Use sound effects judiciously.
8. Consider the context of your application when choosing notification duration and position.
9. Implement error handling in custom callbacks.
10. Use grouping for repetitive notifications to avoid cluttering the user interface.
11. Customize the appearance of notifications to match your application's design language.
12. Provide clear and actionable information in notification messages.
13. Use RTL support when your application caters to languages that read right-to-left.
14. Regularly review and update your notification strategy based on user feedback and usage analytics.

## 13. Troubleshooting

If you encounter issues while using ModernNotify, consider the following troubleshooting steps:

1. **Notifications don't appear:**
   - Ensure `ModernNotify.init()` has been called before creating notifications.
   - Check if the `maxNotifications` limit has been reached.
   - Verify that the notification container is not hidden by other elements.

2. **Custom icons or sounds don't work:**
   - Double-check the file paths for custom icons and sounds.
   - Ensure the server is correctly serving these files.
   - Check the browser console for any 404 (Not Found) errors.

3. **Animations not working:**
   - Verify that the `animationStyle` option is set correctly.
   - If using custom animations, ensure the CSS animations are properly defined.
   - Check if there are any CSS conflicts in your application.

4. **Notifications not closing automatically:**
   - Check if the `persist` option is set to `true`.
   - Verify that the `duration` option is set to a positive number.
   - Ensure that `pauseOnHover` is not interfering with the closing behavior.

5. **Grouping not working as expected:**
   - Confirm that the `grouping` option is set to `true`.
   - Check if the notifications are identical (same type and message).
   - Verify that the notifications are created within the grouping time window.

6. **RTL layout issues:**
   - Ensure the `rtl` option is set to `true` for RTL languages.
   - Check if your custom CSS is compatible with RTL layouts.

7. **Performance issues:**
   - Reduce the `maxNotifications` value if too many notifications are slowing down the page.
   - Optimize custom templates and animations for better performance.

8. **Accessibility problems:**
   - Ensure custom templates maintain the necessary ARIA attributes.
   - Test with screen readers to verify that notifications are properly announced.

If problems persist after trying these troubleshooting steps, check the browser console for any JavaScript errors, and ensure you're using the latest version of ModernNotify.

## 14. API Reference

### ModernNotify Object

The main `ModernNotify` object exposes the following methods:

#### `ModernNotify.init(options)`
Initializes the library with global options.
- `options`: An object containing configuration options.

#### `ModernNotify.success(message, options)`
Creates a success notification.
- `message`: The notification message (string).
- `options`: (Optional) An object with notification-specific options.

#### `ModernNotify.error(message, options)`
Creates an error notification.
- `message`: The notification message (string).
- `options`: (Optional) An object with notification-specific options.

#### `ModernNotify.warning(message, options)`
Creates a warning notification.
- `message`: The notification message (string).
- `options`: (Optional) An object with notification-specific options.

#### `ModernNotify.info(message, options)`
Creates an info notification.
- `message`: The notification message (string).
- `options`: (Optional) An object with notification-specific options.

#### `ModernNotify.dismissAll()`
Dismisses all active notifications.

#### `ModernNotify.setGlobalOption(key, value)`
Sets a global option.
- `key`: The option name (string).
- `value`: The option value.

#### `ModernNotify.getGlobalOption(key)`
Gets the value of a global option.
- `key`: The option name (string).
- Returns: The current value of the specified option.

### Notification Object

Each created notification is an instance of the `Notification` class, which has the following methods:

#### `notification.show()`
Displays the notification.

#### `notification.close()`
Closes the notification.

#### `notification.pause()`
Pauses the notification's timer (if it's not persistent).

#### `notification.resume()`
Resumes the notification's timer after being paused.

#### `notification.increaseGroupCount()`
Increases the group count for grouped notifications.

### Events

ModernNotify provides several event callbacks that can be set in the options:

- `onShow`: Called when a notification is shown.
- `onClose`: Called when a notification is closed.
- `onClick`: Called when a notification is clicked.

Each of these callbacks receives the notification object as an argument.

This comprehensive API reference should help developers fully leverage the capabilities of ModernNotify in their projects. Remember to consult the earlier sections of the documentation for detailed explanations and examples of each feature.