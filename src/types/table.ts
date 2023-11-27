import { Table } from "@prisma/client";
import { BaseOptions } from "./menu";

export interface TableInitialState {
  items: Table[];
  isLoading: boolean;
  error: Error | null;
}

export interface CreateTableOptions extends BaseOptions {
  name: string;
  locationId: number;
}

export interface UpdateTableOptions extends BaseOptions {
  name: string;
  id: number;
}

export interface DeleteTableOptions extends BaseOptions {
  id: number;
}
