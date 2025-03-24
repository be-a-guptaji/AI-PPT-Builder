import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen w-screen grid place-content-center">
      {children}
    </div>
  );
};

export default Layout;
