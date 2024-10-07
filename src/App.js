import React , { lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { PublicRoute, PrivateRoute } from "@app/helper/route";

// Pages
import Login from "@app/pages/Login";
import LayoutWebContainer from "./containers/Layout/LayoutWeb";
import { customerActions } from "./stores/customer/customerActions";
import NotFound from "@app/pages/NotFound";
import { routes } from "./routes";
const DashboardScreen = lazy(() => import("@app/pages/Dashboard"));
const UserManagementScreen = lazy(() => import("@app/pages/UserManagement"));
const JobManagementScreen = lazy(() => import("@app/pages/JobManagement"));
const ProfileScreen = lazy(() => import("@app/pages/Profile"));
const ViewVendorUserScreen = lazy(() => import("@app/pages/ViewVendorUser"));
const EditVendorUserScreen = lazy(() => import("@app/pages/EditVendorUser"));
const AddVendorUserScreen = lazy(() => import("@app/pages/AddVendorUser"));
const JobDetailsScreen = lazy(() => import("@app/pages/JobDetails"));
const AppliedJobsScreen = lazy(() => import("@app/pages/AppliedJobs"));
const AppliedJobDetailsScreen = lazy(() => import("@app/pages/AppliedJobDetails"));
const EarningsScreen = lazy(() => import("@app/pages/Earnings"));
const FaqsScreen = lazy(() => import("@app/pages/Faqs"));
const ReportsScreen = lazy(() => import("@app/pages/Reports"));
const MyWorkScreen = lazy(() => import("@app/pages/MyWork"));
const WorkDetailsScreen = lazy(() => import("@app/pages/WorkDetails"));
const RaiseDisputeScreen = lazy(() => import("@app/pages/RaiseDispute"));
const AskUsScreen = lazy(() => import("@app/pages/AskUs"));

const ModuleManagementScreen = lazy(()=>import ('@app/pages/ModuleManagement'))
const NextWorkflowScreen = lazy(()=>import ('@app/FormElements/app/views/WorkflowScreen/WorkflowScreen'))
const EditWorkflowScreen = lazy(()=>import ('@app/FormElements/app/views/WorkflowScreen/WorkflowScreen'))

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.customer);

  React.useEffect(() => {
    if(!Object.keys(auth.profile).length && auth.isAuthenticated) dispatch(customerActions.getProfile())
  },[])

  const nonAuthenticatedRoutes = [
    {
      path: routes.login,
      component: Login,
      exact: true,
      auth,
      redirectTo: routes.dashboard
    }
  ]
  const authenticatedRoutes = [
    {
      path: routes.profile,
      component: ProfileScreen,
      exact: true,
      auth
    },
    {
      path: routes.dashboard,
      component: DashboardScreen,
      exact: true,
      auth
    },
    {
      path: routes.userManagement,
      component: UserManagementScreen,
      exact: true,
      auth
    },
    {
      path: routes.userManagementAddVendorUser,
      component: AddVendorUserScreen,
      exact: true,
      auth
    },
    {
      path: routes.userManagementEditVendorUser,
      component: EditVendorUserScreen,
      exact: true,
      auth
    },
    {
      path: routes.userManagementViewVenderUser,
      component: ViewVendorUserScreen,
      exact: true,
      auth
    },
    {
      path: routes.jobManagement,
      component: JobManagementScreen,
      exact: true,
      auth
    },
    {
      path: routes.jobManagementDetails,
      component: JobDetailsScreen,
      exact: true,
      auth
    },
    {
      path: routes.appliedJobs,
      component: AppliedJobsScreen,
      exact: true,
      auth
    },
    {
      path: routes.appliedJobsDetails,
      component: AppliedJobDetailsScreen,
      exact: true,
      auth
    },
    {
      path: routes.myWork,
      component: MyWorkScreen,
      exact: true,
      auth
    },
    {
      path: routes.myWorkDetails,
      component: WorkDetailsScreen,
      exact: true,
      auth
    },
    {
      path: routes.reports,
      component: ReportsScreen,
      exact: true,
      auth
    },
    {
      path: routes.earnings,
      component: EarningsScreen,
      exact: true,
      auth
    },
    {
      path: routes.faq,
      component: FaqsScreen,
      exact: true,
      auth
    },
    {
      path: routes.raiseDispute,
      component: RaiseDisputeScreen,
      exact: true,
      auth
    },
    {
      path: routes.askUs,
      component: AskUsScreen,
      exact: true,
      auth
    },
    {
      path: routes.subModule,
      component: ModuleManagementScreen,
      exact: true,
      auth
    },
    {
      path: routes.workFlow,
      component: NextWorkflowScreen,
      exact: true,
      auth
    },
    {
      path: routes.editWorkFlow,
      component: EditWorkflowScreen,
      exact: true,
      auth
    }
  ]

  return (
    <div className="App">
      <Switch>
        <Redirect exact from="/" to="/login" />
        {
          nonAuthenticatedRoutes.map(route => {
            return(
              <PublicRoute
              exact={route.exact}
              path={route.path}
              component={route.component}
              auth={route.auth}
              redirectTo={routes.dashboard}
            />
            )
          })
        }
        <Route
          path="/not-found"
          component={NotFound}
          exact
        />
        <LayoutWebContainer>
          <Switch>
            {
              authenticatedRoutes.map(route => {
                return(
                  <PrivateRoute
                    path={route.path}
                    exact={route.exact}
                    auth={route.auth}
                    component={route.component}
                  />
                )
              })
            }
            <Redirect to={`/not-found`} />
          </Switch>
        </LayoutWebContainer>
      </Switch>
    </div>
  );
}

export default App;
