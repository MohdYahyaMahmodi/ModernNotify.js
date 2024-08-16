declare module 'modernnotify' {
  interface NotifyOptions {
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    animationStyle?: 'slide' | 'fade';
    slideDirection?: 'right' | 'left' | 'top' | 'bottom';
    maxNotifications?: number;
    allowHtml?: boolean;
    theme?: 'light' | 'dark';
    showProgressBar?: boolean;
    closeOnClick?: boolean;
    pauseOnHover?: boolean;
    width?: string;
    duration?: number;
    iconSvg?: {
      success?: string;
      error?: string;
      warning?: string;
      info?: string;
    };
    titles?: {
      success?: string;
      error?: string;
      warning?: string;
      info?: string;
    };
    onShow?: (notification: Notification) => void;
    onClose?: (notification: Notification) => void;
    onClick?: (notification: Notification) => void;
    template?: (message: string, type: string, options: NotifyOptions) => string;
    sound?: string;
    rtl?: boolean;
    grouping?: boolean;
    maxGroupSize?: number;
    persist?: boolean;
    actions?: Array<{
      text: string;
      onClick: (notification: Notification) => void;
    }>;
    customAnimations?: {
      show?: string;
      hide?: string;
    };
    customIcons?: {
      [key: string]: string;
    };
    customTheme?: {
      backgroundColor?: string;
      textColor?: string;
      progressBarColor?: string;
      titleColor?: string;
    };
  }

  interface Notification {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    options: NotifyOptions;
    title: string;
    element: HTMLElement | null;
    progressBar: HTMLElement | null;
    remainingTime: number;
    startTime: number | null;
    animationFrame: number | null;
    groupCount: number;
    isPersistent: boolean;
    isPaused: boolean;
    progress: number;
    pausedAt: number | null;

    create(): Notification;
    show(): void;
    animate(): void;
    pause(): void;
    resume(): void;
    close(): void;
    escapeHtml(unsafe: string): string;
    playSound(): void;
    increaseGroupCount(): void;
  }

  interface ModernNotify {
    init(options?: NotifyOptions): void;
    success(message: string, options?: NotifyOptions): Notification;
    error(message: string, options?: NotifyOptions): Notification;
    warning(message: string, options?: NotifyOptions): Notification;
    info(message: string, options?: NotifyOptions): Notification;
    dismissAll(): void;
    setGlobalOption(key: keyof NotifyOptions, value: any): void;
    getGlobalOption(key: keyof NotifyOptions): any;
    removeNotification(notification: Notification): void;
  }

  const ModernNotify: ModernNotify;
  export default ModernNotify;
}