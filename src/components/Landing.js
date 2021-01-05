import React from "react";

import { Panel } from "./Panel";
import UsersList from "./UsersList";

export default function Landing() {
  return (
    <div className="Landing">
      <Panel />
      <UsersList />
    </div>
  );
}
