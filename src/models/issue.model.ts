import { User } from "./user.model";

export interface Issue {
  id: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  dateReported: string;
  reportedBy: User;
  status: string
}