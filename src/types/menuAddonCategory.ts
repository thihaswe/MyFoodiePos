import { MenuAddonCategory } from "@prisma/client";

export interface MenuAddonCategoryInitialState {
  items: MenuAddonCategory[];
  isLoading: boolean;
  error: Error | null;
}
