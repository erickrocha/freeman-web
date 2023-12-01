import React, { Component, Suspense } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Chart } from 'react-chartjs-2';

import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';
import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Spinner from './components/UI/Spinner/Spinner';
import ErrorBoundary from './hoc/ErrorBoundary/ErrorBoundary';
import MainLayout from './layouts/Main/Main';
import * as events from './store/events/user/index';
import Print from 'layouts/Print';

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

const Dashboard = React.lazy(() => import('./container/Dashboard'));
const TimeReport = React.lazy(() => import('./container/Report/TimeReport/TimeReport'));
const ProjectReport = React.lazy(() => import('./container/Report/ProjectReport'));
const ManagerDashboard = React.lazy(() => import('./container/Management/Dashboard/Dashboard'));
const Entries = React.lazy(() => import('./container/Management/Entry'));
const Project = React.lazy(() => import('./container/Management/Project/Project'));
const AddProject = React.lazy(() => import('./container/Management/Project/AddProject'));

const Team = React.lazy(() => import('./container/Management/Team/Team'));
const AddTeam = React.lazy(() => import('./container/Management/Team/AddTeam'));
const Account = React.lazy(() => import('./container/Security/Account/Account'));
const Settings = React.lazy(() => import('./container/Security/Settings/Settings'));
const Users = React.lazy(() => import('./container/Security/Users/Users'));
const AddUser = React.lazy(() => import('./container/Security/Users/AddUser'));

const SignIn = React.lazy(() => import('./container/Security/SignIn/SignIn'));
const SignUp = React.lazy(() => import('./container/Security/SignUp/SignUp'));
const Logout = React.lazy(() => import('./container/Security/Logout/Logout'));
const NotFound = React.lazy(() => import('./container/NotFound/NotFound'));
const Orders = React.lazy(() => import('./container/Financial/Orders'));
const Payments = React.lazy(() => import('./container/Financial/Payments'));
const Supplier = React.lazy(() => import('./container/Supplier/Supplier'));
const ManageSupplier = React.lazy(() => import('./container/Supplier/ManageSupplier'));
const AddSupplier = React.lazy(() => import('./container/Supplier/AddSupplier'));
const Customer = React.lazy(() => import('./container/Customer/Customer'));
const AddCustomer = React.lazy(() => import('./container/Customer/AddCustomer'));
const SampleDashboard = React.lazy(() => import('./container/SampleDashboard'));
const Playground = React.lazy(() => import('./container/Playground'));

const TimeReportPrint = React.lazy(() => import('./container/Report/TimeReport/TimeReportPrint'));

class App extends Component {
  componentDidMount() {
    this.props.onAutoLogin();
    if (this.props.isAuthenticated) {
      this.props.onLoadUser();
    }
  }

  render() {
    if (this.props.isAuthenticated) {
      return (
        <Suspense fallback={<Spinner />}>
          <ErrorBoundary>
            <ThemeProvider theme={theme}>
              {!this.props.location.pathname.startsWith('/print') ? (
                <MainLayout>
                  <Switch>
                    <Route component={Dashboard} exact path="/dashboard" />
                    <Route component={ManagerDashboard} exact path="/management/dashboard" />
                    <Route component={Entries} exact path="/management/entries" />
                    <Route component={Project} exact path="/management/project" />
                    <Route component={AddProject} exact path="/management/project/new" />
                    <Route component={AddProject} exact path="/management/project/edit/:id" />
                    <Route component={Team} exact path="/management/team" />
                    <Route component={AddTeam} exact path="/management/team/new" />
                    <Route component={AddTeam} exact path="/management/team/edit/:id" />
                    <Route component={Orders} exact path="/financial/order" />
                    <Route component={Payments} exact path="/financial/payment" />
                    <Route component={TimeReport} exact path="/reports/time" />
                    <Route component={ProjectReport} path="/reports/projects" />
                    <Route component={Users} exact path="/security/users" />
                    <Route component={AddUser} exact path="/security/users/new" />
                    <Route component={AddUser} exact path="/security/users/edit/:id" />
                    <Route component={Account} exact path="/security/account" />
                    <Route component={Settings} exact path="/security/settings" />
                    <Route component={SignUp} exact path="/sign-up" />
                    <Route component={Logout} exact path="/Logout" />
                    <Route component={Customer} exact path="/customer" />
                    <Route component={AddCustomer} exact path="/customer/new" />
                    <Route component={AddCustomer} exact path="/customer/edit/:id" />
                    <Route component={Supplier} exact path="/supplier" />
                    <Route component={AddSupplier} exact path="/supplier/new" />
                    <Route component={ManageSupplier} exact path="/supplier/manage/:id" />
                    <Route component={AddSupplier} exact path="/supplier/edit/:id" />
                    <Route component={SampleDashboard} exact path="/samples" />
                    <Route component={Playground} exact path="/play" />
                    <Route component={NotFound} exact path="/not-found" />
                    <Redirect to="/dashboard" />
                  </Switch>
                </MainLayout>
              ) : (
                  <Print>
                    <Route component={TimeReportPrint} exact path="/print/reports/time/print" />
                  </Print>
                )}
            </ThemeProvider>
          </ErrorBoundary>
        </Suspense>
      );
    } else {
      return (
        <Suspense fallback={<Spinner />}>
          <ErrorBoundary>
            <ThemeProvider theme={theme}>
              <SignIn />
            </ThemeProvider>
          </ErrorBoundary>
        </Suspense>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.token !== null,
    loading: state.user.loading,
    print: state.app.print
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAutoLogin: () => dispatch(events.isAlreadyLogged()),
    onLoadUser: () => dispatch(events.loadUser())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
