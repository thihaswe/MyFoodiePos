import { MenuCategory } from "@prisma/client";

export interface MenuCategoryInitialState {
  items: MenuCategory[];
  isLoading: boolean;
  error: Error | null;
}
