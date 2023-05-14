import { User } from "./user";

export interface FixedData {
    expenditure_amount: number,
    expenditure_date: string,
    fixed_expenditure: string,
    idx: number,
    user: User,
    user_idx: number
}