
export interface Issue {
  id: string;
  title: string;
  reportedBy: IssueUser;
  description: string;
  latitude: string;
  longitude: string;
  dateReported: string;
  status: string,
  issueImages: string[];
}

interface IssueUser {
  userUUID?: string;
  fullName?: string;
  username?: string;
}