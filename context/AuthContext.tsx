'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any; data: any }>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapSupabaseUser(sbUser: any): User {
  const metadataName = sbUser.user_metadata?.full_name || sbUser.user_metadata?.name;
  const emailName = sbUser.email ? sbUser.email.split('@')[0] : 'Học viên';
  const name = metadataName || emailName;

  const emailLower = (sbUser.email || '').toLowerCase();
  const isUserAdmin =
    emailLower === 'phatwibuu@gmail.com' ||
    emailLower === 'admin@mos1000.vn' ||
    sbUser.user_metadata?.role === 'admin';

  return {
    id: sbUser.id,
    name: name,
    email: sbUser.email || '',
    role: isUserAdmin ? 'admin' : 'student',
  };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const supabase = createClient();

  useEffect(() => {
    // 1. Initial User Fetch
    supabase.auth.getUser().then(({ data: { user: sbUser } }) => {
      if (sbUser) {
        setUser(mapSupabaseUser(sbUser));
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // 2. Auth State Change Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(mapSupabaseUser(session.user));
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });
    if (!error && data?.user) {
      setUser(mapSupabaseUser(data.user));
    }
    return { error };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: {
          full_name: fullName,
          role: 'student', // Default role is student (khách / học viên)
        },
      },
    });
    if (!error && data?.user) {
      setUser(mapSupabaseUser(data.user));
    }
    return { data, error };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
