import { DisableLocationMenuCategory } from "@prisma/client";

export interface disableLocationMenuCategoryInitialState {
  items: DisableLocationMenuCategory[];
  isLoading: boolean;
  error: Error | null;
}
