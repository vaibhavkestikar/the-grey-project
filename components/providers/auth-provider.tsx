"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { User } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/client";
import { mergeGuestProgressOnSignIn } from "@/lib/learning/merge-guest-progress";

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function initAuth() {
      const {
        data: { user: initialUser },
      } = await supabase.auth.getUser();

      setUser(initialUser);
      setLoading(false);

      if (initialUser) {
        void mergeGuestProgressOnSignIn();
      }
    }

    void initAuth();

    const {
      data: authListener,
    } = supabase.auth.onAuthStateChange((event, session) => {
      const nextUser = session?.user ?? null;
      setUser(nextUser);
      setLoading(false);

      if (event === "SIGNED_IN" && nextUser) {
        void mergeGuestProgressOnSignIn();
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
