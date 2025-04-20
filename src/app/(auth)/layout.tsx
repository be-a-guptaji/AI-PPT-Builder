import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="grid h-screen w-screen place-content-center">
      {children}
    </div>
  );
};

export default Layout;
