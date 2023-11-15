import { Table } from "@prisma/client";

export interface TableInitialState {
  items: Table[];
  isLoading: boolean;
  error: Error | null;
}
