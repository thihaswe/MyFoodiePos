import { Addon } from "@prisma/client";

export interface AddonInitialState {
  items: Addon[];
  isLoading: boolean;
  error: Error | null;
}
