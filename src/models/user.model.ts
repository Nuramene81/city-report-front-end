export interface User {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
}

export interface currentUser {
  userUUID: string;
  fullName: string;
  username: string;
  profileImageURL: string;
}