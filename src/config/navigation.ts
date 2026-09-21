export interface NavigationItem {
  key: string;
  path: string;
  icon?: any;
  isContentType?: boolean;
}

export const NAVIGATION_CONFIG: readonly NavigationItem[] = [];

export const CONTENT_TYPES: readonly string[] = [];
