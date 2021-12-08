import { Session, User as SupaBaseUser } from "@supabase/supabase-js";

export interface User extends SupaBaseUser {
  username: string;
}
export type AuthContextType = {
  session: Session;
  user: User;
  loadingUser: boolean;
  loginEmail: boolean;
  login: () => void;
};
