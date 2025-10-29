import React from "react";
import { withRouter } from "react-router-dom";

const Dashboard = (props) => {
  return (
    <div>
      <main>
        {props.content}
      </main>
    </div>
  );
};

export default withRouter(Dashboard);
