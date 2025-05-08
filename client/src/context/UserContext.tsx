import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  id: number;
  name: string;
  level: string;
  credits: number;
  current_courses: number;
  saved_courses: number;
  rating: number;
};

type UserContextType = {
  user: User | null;
  switchUser: (user: User) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const switchUser = (newUser: User) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, switchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
