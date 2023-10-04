export interface MenuPayload {
  name: string;
  price: number;
}

export interface Menu extends MenuPayload {
  id: number;
  isArchived: boolean;
  assertUrl?: string;
}

export interface MenuState {
  items: Menu[];
  isLoading: boolean;
  error: Error | null;
}
