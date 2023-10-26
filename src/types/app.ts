export interface BaseOptions {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface AppInitialState {
  init: boolean;
  isLoading: boolean;
  error: Error | null;
}

export interface FetchDataOptions extends BaseOptions {}
