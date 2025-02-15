import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="h-screen w-screen grid place-content-center">
      {children}
    </div>
  );
};

export default Layout;
