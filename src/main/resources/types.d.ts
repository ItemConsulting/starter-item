declare const resolve: (path: string) => import("@enonic-types/core").ResourceKey;

declare const app: {
  /**
   * The name of the application.
   */
  name: "no.item.starter";

  /**
   * Version of the application.
   */
  version: string;

  /**
   * Values from the application’s configuration file.
   * This can be set using $XP_HOME/config/<app.name>.cfg.
   * Every time the configuration is changed the app is restarted.
   */
  config: Record<string, string | undefined>;
};

declare const log: {
  /**
   * Log debug message.
   */
  debug: (...args: unknown[]) => void;

  /**
   * Log info message.
   */
  info: (...args: unknown[]) => void;

  /**
   * Log warning message.
   */
  warning: (...args: unknown[]) => void;

  /**
   * Log error message.
   */
  error: (...args: unknown[]) => void;
};
