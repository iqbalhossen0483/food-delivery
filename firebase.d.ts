import { DbUser } from "./common";
import { User } from "firebase/auth";

export interface FirebaseShema {
  loginWithGoogle(): Promise<UserCredential>;
  singUpWithEmail(
    email: string,
    password: string,
    name: string
  ): Promise<UserCredential>;
  loginWithEmail: (email: string, password: string) => Promise<UserCredential>;
  logOUt: () => void;
  user: DbUser | null;
  loading: boolean;
  addUserName: (name: string) => void;
  getUserFromDb: (email: string | null) => void;
  makeUser(user: User): void;
}
