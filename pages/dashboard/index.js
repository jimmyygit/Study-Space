import Sidebar from "../../components/Dashboard/Sidebar";
import DashboardContainer from "../../components/Dashboard/DashboardContainer";
import {Grid} from "@material-ui/core";

export default function Dashboard() {
  return (

    <Grid container>
      <Grid item xs={3}>
        <Sidebar/>
      </Grid>
      <Grid item xs={3}>
        <DashboardContainer/>
      </Grid>
    </Grid>
  );
}