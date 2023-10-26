import { AddonCategory } from "@prisma/client";

export interface AddonCategoryInitialState {
  items: AddonCategory[];
  isLoading: boolean;
  error: Error | null;
}
