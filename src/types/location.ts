import { Location } from "@prisma/client";

export interface LocationInitialState {
  items: Location[];
  isLoading: boolean;
  error: Error | null;
}
