import { MenuCategoryMenu } from "@prisma/client";

export interface MenuCategoryMenuInitialState {
  items: MenuCategoryMenu[];
  isLoading: boolean;
  error: Error | null;
}
