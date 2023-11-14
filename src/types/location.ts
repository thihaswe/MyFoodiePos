import { Location } from "@prisma/client";
import { BaseOptions } from "./menu";

export interface LocationInitialState {
  items: Location[];
  isLoading: boolean;
  error: Error | null;
}

export interface CreateLocationOptions extends BaseOptions {
  name: string;
  companyId: number;
}

export interface UpdateLocationOptions extends BaseOptions {
  id: number;
  name: string;
}
export interface DeleteLocationOptions extends BaseOptions {
  id: number;
}
