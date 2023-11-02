import { Company } from "@prisma/client";

export interface companyInitialState {
  items: Company[];
  isloading: false;
  error: Error | null;
}
