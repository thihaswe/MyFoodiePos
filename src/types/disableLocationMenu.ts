import { DisableLocationMenu } from "@prisma/client";

export interface disableLocationMenuInitialState {
  items: DisableLocationMenu[];
  isLoading: boolean;
  error: Error | null;
}
