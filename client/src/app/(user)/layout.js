import { SocialMediaSidebarComponent } from "@/components/social-media-sidebar";
import React from "react";

const UserLayout = ({ children }) => {
  return (
    <div className="flex gap-2 w-screen">
      <SocialMediaSidebarComponent />
      {children}
    </div>
  );
};

export default UserLayout;
