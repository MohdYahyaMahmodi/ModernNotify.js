// ModernNotify.js - NPM Version

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.ModernNotify = factory());
}(this, (function () { 'use strict';

const defaultOptions = {
  position: 'top-right',
  animationStyle: 'slide',
  slideDirection: 'right',
  maxNotifications: 3,
  allowHtml: false,
  theme: 'light',
  showProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  width: '300px',
  duration: 3000,
  iconSvg: {
      success: '<svg width="24" height="24" fill="green"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"/></svg>',
      error: '<svg width="24" height="24" fill="red"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>',
      warning: '<svg width="24" height="24" fill="orange"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',
      info: '<svg width="24" height="24" fill="blue"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2V7zm0 4h2v6h-2v-6z"/></svg>'
  },
  titles: {
      success: 'Success',
      error: 'Error',
      warning: 'Warning',
      info: 'Info'
  },
  onShow: null,
  onClose: null,
  onClick: null,
  template: null,
  sound: null,
  rtl: false,
  grouping: false,
  maxGroupSize: 5,
  persist: false,
  actions: [],
  customAnimations: null,
  customIcons: null,
  customTheme: null
};

const styles = `
  .modern-notify-container {
      position: fixed;
      z-index: 9999;
      pointer-events: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 10px;
      box-sizing: border-box;
  }
  .modern-notify-container.top-right { top: 0; right: 0; align-items: flex-end; }
  .modern-notify-container.top-left { top: 0; left: 0; align-items: flex-start; }
  .modern-notify-container.bottom-right { bottom: 0; right: 0; align-items: flex-end; flex-direction: column-reverse; }
  .modern-notify-container.bottom-left { bottom: 0; left: 0; align-items: flex-start; flex-direction: column-reverse; }
  
  .modern-notify {
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      flex-direction: column;
      opacity: 0;
      transition: all 0.3s ease-in-out;
      pointer-events: auto;
      position: relative;
      overflow: hidden;
      max-width: 100%;
      width: 300px;
  }

  .modern-notify-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
  }

  .modern-notify-icon-title {
      display: flex;
      align-items: center;
  }

  .modern-notify-icon {
      width: 24px;
      height: 24px;
      display: inline-flex;
      margin-right: 10px;
  }

  .modern-notify[dir="rtl"] .modern-notify-icon {
      margin-left: 10px;
      margin-right: 0;
  }

  .modern-notify.slide { transform: translateX(0); }
  .modern-notify.slide.from-right { transform: translateX(120%); }
  .modern-notify.slide.from-left { transform: translateX(-120%); }
  .modern-notify.slide.from-top { transform: translateY(-120%); }
  .modern-notify.slide.from-bottom { transform: translateY(120%); }
  .modern-notify.fade { opacity: 0; }
  .modern-notify.show {
      opacity: 1;
      transform: translate(0, 0) !important;
  }

  .modern-notify-content { flex-grow: 1; }

  .modern-notify-close {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 18px;
      opacity: 0.7;
      transition: opacity 0.2s;
      color: inherit;
      padding: 0;
      margin-left: 10px;
  }
  .modern-notify-close:hover { opacity: 1; }

  .modern-notify-progress-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      transform-origin: left;
      transform: scaleX(0);
      transition: transform linear;
  }

  .modern-notify-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
  }

  .modern-notify-action-btn {
      margin-left: 10px;
      padding: 5px 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
  }

  .modern-notify-group-count {
      margin-left: 5px;
      font-size: 0.9em;
      opacity: 0.7;
  }

  .modern-notify.theme-light { 
      --notify-bg-color: #ffffff;
      --notify-text-color: #333333;
      --notify-success-color: #28a745;
      --notify-error-color: #dc3545;
      --notify-warning-color: #ffc107;
      --notify-info-color: #17a2b8;
      --notify-action-bg-color: #f8f9fa;
      --notify-action-text-color: #333333;
  }

  .modern-notify.theme-dark {
      --notify-bg-color: #333333;
      --notify-text-color: #ffffff;
      --notify-success-color: #5cb85c;
      --notify-error-color: #d9534f;
      --notify-warning-color: #f0ad4e;
      --notify-info-color: #5bc0de;
      --notify-action-bg-color: #555555;
      --notify-action-text-color: #ffffff;
  }

  .modern-notify { 
      background-color: var(--notify-bg-color); 
      color: var(--notify-text-color);
  }
  .modern-notify-success { border-left: 4px solid var(--notify-success-color); }
  .modern-notify-error { border-left: 4px solid var(--notify-error-color); }
  .modern-notify-warning { border-left: 4px solid var(--notify-warning-color); }
  .modern-notify-info { border-left: 4px solid var(--notify-info-color); }

  .modern-notify-success .modern-notify-progress-bar { background-color: var(--notify-success-color); }
  .modern-notify-error .modern-notify-progress-bar { background-color: var(--notify-error-color); }
  .modern-notify-warning .modern-notify-progress-bar { background-color: var(--notify-warning-color); }
  .modern-notify-info .modern-notify-progress-bar { background-color: var(--notify-info-color); }

  .modern-notify-action-btn {
      background-color: var(--notify-action-bg-color);
      color: var(--notify-action-text-color);
  }
  .modern-notify-action-btn:hover {
      background-color: var(--notify-text-color);
      color: var(--notify-bg-color);
  }

  @media (max-width: 480px) {
      .modern-notify-container {
          left: 0 !important;
          right: 0 !important;
          width: 100% !important;
      }
      .modern-notify {
          width: 100% !important;
      }
  }
`;

class Notification {
  constructor(message, type, options) {
      this.message = message;
      this.type = type;
      this.options = { ...defaultOptions, ...options };
      this.title = this.options.title || this.options.titles[type] || type.charAt(0).toUpperCase() + type.slice(1);
      this.element = null;
      this.progressBar = null;
      this.remainingTime = this.options.duration;
      this.startTime = null;
      this.animationFrame = null;
      this.groupCount = 1;
      this.isPersistent = this.options.persist;
      this.isPaused = false;
      this.progress = 0;
      this.pausedAt = null;
  }

  create() {
      this.element = document.createElement('div');
      this.element.className = `modern-notify modern-notify-${this.type} ${this.options.animationStyle} from-${this.options.slideDirection} theme-${this.options.theme}`;
      this.element.setAttribute('role', 'alert');
      this.element.setAttribute('aria-live', 'assertive');
      this.element.style.width = this.options.width;
      
      if (this.options.rtl) {
          this.element.setAttribute('dir', 'rtl');
      }

      if (this.options.customTheme) {
          this.applyCustomTheme();
      }

      const iconContent = this.options.customIcons?.[this.type] || this.options.iconSvg[this.type];
      
      if (this.options.template) {
          this.element.innerHTML = this.options.template(this.message, this.type, this.options);
      } else {
          this.element.innerHTML = `
              <div class="modern-notify-header">
                  <div class="modern-notify-icon-title">
                      <div class="modern-notify-icon">${iconContent}</div>
                      <div class="modern-notify-title" style="color: var(--notify-title-color, inherit);">${this.title}</div>
                      <span class="modern-notify-group-count" style="display: none;"></span>
                  </div>
                  ${!this.isPersistent ? '<button class="modern-notify-close" aria-label="Close notification">&times;</button>' : ''}
              </div>
              <div class="modern-notify-content">${this.options.allowHtml ? this.message : this.escapeHtml(this.message)}</div>
              ${this.options.actions.length > 0 ? '<div class="modern-notify-actions"></div>' : ''}
              ${this.options.showProgressBar && !this.isPersistent ? '<div class="modern-notify-progress-bar"></div>' : ''}
          `;

          if (this.options.actions.length > 0) {
              const actionsContainer = this.element.querySelector('.modern-notify-actions');
              this.options.actions.forEach(action => {
                  const button = document.createElement('button');
                  button.className = 'modern-notify-action-btn';
                  button.textContent = action.text;
                  button.addEventListener('click', (e) => {
                      e.stopPropagation();
                      action.onClick(this);
                  });
                  actionsContainer.appendChild(button);
              });
          }
      }
      
      if (this.options.showProgressBar && !this.isPersistent) {
          this.progressBar = this.element.querySelector('.modern-notify-progress-bar');
      }

      if (this.options.closeOnClick && !this.isPersistent) {
          this.element.addEventListener('click', (e) => {
              if (e.target.className !== 'modern-notify-close' && e.target.className !== 'modern-notify-action-btn') {
                  this.close();
                  if (typeof this.options.onClick === 'function') {
                      this.options.onClick(this);
                  }
              }
          });
      }

      const closeButton = this.element.querySelector('.modern-notify-close');
      if (closeButton) {
          closeButton.addEventListener('click', () => this.close());
      }

      if (this.options.pauseOnHover && !this.isPersistent) {
          this.element.addEventListener('mouseenter', () => this.pause());
          this.element.addEventListener('mouseleave', () => this.resume());
      }

      return this;
  }

  applyCustomTheme() {
      if (this.options.customTheme.backgroundColor) {
          this.element.style.setProperty('--notify-bg-color', this.options.customTheme.backgroundColor);
      }
      if (this.options.customTheme.textColor) {
          this.element.style.setProperty('--notify-text-color', this.options.customTheme.textColor);
      }
      if (this.options.customTheme.progressBarColor) {
          this.element.style.setProperty(`--notify-${this.type}-color`, this.options.customTheme.progressBarColor);
      }
      if (this.options.customTheme.titleColor) {
          this.element.style.setProperty('--notify-title-color', this.options.customTheme.titleColor);
      }
  }

  show() {
      requestAnimationFrame(() => {
          this.element.classList.add('show');
          this.startTime = performance.now();
          if (!this.isPersistent) {
              this.animate();
          }
          if (typeof this.options.onShow === 'function') {
              this.options.onShow(this);
          }
          if (this.options.sound) {
              this.playSound();
          }
      });
  }

  animate() {
    const now = performance.now();
    const elapsed = this.isPaused ? this.pausedAt - this.startTime : now - this.startTime;
    this.progress = Math.min(elapsed / this.options.duration, 1);
    
    if (this.progress < 1) {
        if (this.progressBar) {
            this.progressBar.style.transform = `scaleX(${this.progress})`;
        }
        if (!this.isPaused) {
            this.animationFrame = requestAnimationFrame(() => this.animate());
        }
    } else {
        this.close();
    }
}

pause() {
    if (!this.isPaused && this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
        this.animationFrame = null;
        this.pausedAt = performance.now();
        this.isPaused = true;
    }
}

resume() {
    if (this.isPaused && !this.isPersistent) {
        const pauseDuration = performance.now() - this.pausedAt;
        this.startTime += pauseDuration;
        this.isPaused = false;
        this.animate();
    }
}

close() {
    this.element.classList.remove('show');
    if (this.options.customAnimations && this.options.customAnimations.hide) {
        this.element.style.animation = this.options.customAnimations.hide;
    }
    this.element.addEventListener('transitionend', () => {
        ModernNotify.removeNotification(this);
        if (typeof this.options.onClose === 'function') {
            this.options.onClose(this);
        }
    }, { once: true });
}

escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

playSound() {
    const audio = new Audio(this.options.sound);
    audio.play().catch(error => console.warn('Failed to play notification sound:', error));
}

increaseGroupCount() {
    this.groupCount++;
    const countElement = this.element.querySelector('.modern-notify-group-count');
    if (countElement) {
        countElement.textContent = `(${this.groupCount})`;
        countElement.style.display = 'inline';
    }
}
}

const ModernNotify = {
containers: {},
notifications: {},
persistentNotifications: {},
groupedNotifications: {},

init(options = {}) {
    this.globalOptions = { ...defaultOptions, ...options };
    this._injectStyles();
},

_createContainer(position) {
    if (!this.containers[position]) {
        const container = document.createElement('div');
        container.className = `modern-notify-container ${position}`;
        document.body.appendChild(container);
        this.containers[position] = container;
        this.notifications[position] = [];
        this.persistentNotifications[position] = [];
    }
    return this.containers[position];
},

_injectStyles() {
    if (!document.getElementById('modern-notify-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'modern-notify-styles';
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }
},

_createNotification(message, type, options = {}) {
    const notificationOptions = { ...this.globalOptions, ...options };
    const position = notificationOptions.position;
    const container = this._createContainer(position);
    
    if (notificationOptions.grouping && !notificationOptions.persist) {
        const existingNotification = this._findExistingNotification(message, type, notificationOptions.title, position);
        if (existingNotification) {
            existingNotification.increaseGroupCount();
            return existingNotification;
        }
    }

    const notification = new Notification(message, type, notificationOptions).create();
    
    if (notification.isPersistent) {
        this.persistentNotifications[position].push(notification);
    } else {
        while (this.notifications[position].length >= notificationOptions.maxNotifications) {
            const oldestNotification = this.notifications[position].shift();
            oldestNotification.close();
        }
        this.notifications[position].push(notification);
    }
    
    this._addNotificationToContainer(notification, container, position);
    notification.show();

    return notification;
},

_addNotificationToContainer(notification, container, position) {
    const isBottom = position.startsWith('bottom');
    if (isBottom) {
        container.insertBefore(notification.element, container.firstChild);
    } else {
        container.appendChild(notification.element);
    }
},

_findExistingNotification(message, type, title, position) {
    const key = `${position}:${type}:${message}:${title || ''}`;
    return this.groupedNotifications[key];
},

removeNotification(notification) {
    const position = notification.options.position;
    let index;
    if (notification.isPersistent) {
        index = this.persistentNotifications[position].indexOf(notification);
        if (index !== -1) {
            this.persistentNotifications[position].splice(index, 1);
        }
    } else {
        index = this.notifications[position].indexOf(notification);
        if (index !== -1) {
            this.notifications[position].splice(index, 1);
        }
    }
    if (notification.options.grouping) {
        const key = `${position}:${notification.type}:${notification.message}:${notification.title}`;
        delete this.groupedNotifications[key];
    }
    
    notification.element.remove();
},

success(message, options = {}) {
    return this._createNotification(message, 'success', options);
},

error(message, options = {}) {
    return this._createNotification(message, 'error', options);
},

warning(message, options = {}) {
    return this._createNotification(message, 'warning', options);
},

info(message, options = {}) {
    return this._createNotification(message, 'info', options);
},

dismissAll() {
    Object.keys(this.containers).forEach(position => {
        [...this.notifications[position], ...this.persistentNotifications[position]].forEach(notification => notification.close());
        this.notifications[position] = [];
        this.persistentNotifications[position] = [];
    });
    this.groupedNotifications = {};
},

setGlobalOption(key, value) {
    if (key in this.globalOptions) {
        this.globalOptions[key] = value;
    }
},

getGlobalOption(key) {
    return this.globalOptions[key];
}
};

// Return ModernNotify at the end of the factory function
return ModernNotify;

})));