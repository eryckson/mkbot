import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import { Grommet } from "grommet";

import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
// import NavBar from "./components/NavBar";

import NavBar2 from "./components/grommet/NavBar";

import Footer from "./components/Footer";
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";

import Message from "./components/Message";
import Home from "./views/Home";
import Bot from "./views/Bot";
import Artisan from "./views/Artisan";
import Artisans from "./views/Artisans";
import Catalogs from "./views/Catalogs";
import Catalog from "./views/Catalog";
import Dashboard from "./views/Dashboard";
import Submission from "./views/Submission";
import Profile from "./views/Profile";
import Review from "./views/Review";
import MyArtisans from "./views/MyArtisans";
import PublicList from "./views/PublicList";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
import WishList from "./views/WishList";
initFontAwesome();

const App = () => {
  const { loading, user } = useAuth0();

  const theme = {
    global: {
      font: {
        family: "Raleway",
        size: "16px",
        height: "20px"
      },
      focus: {
        border: {
          color: "none"
        }
      }
    },
    anchor: {
      hover: {
        textDecoration: "none",
        fontWeight: 500
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  const roles = user ? user["http://a.mrkeebs.com/roles"] : [];
  return (
    <Router history={history}>
      <Grommet theme={theme}>
        <div id="app" className="d-flex flex-column h-100">
          {/* <NavBar /> */}
          <NavBar2 />
          <Container className="flex-grow-1 mt-5">
            <Message />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/bot" exact component={Bot} />
              <Route path="/artisans/:id" exact component={Artisan} />
              <Route path="/artisans" exact component={Artisans} />
              <Route path="/catalogs/:slug/:sculpt?" component={Catalog} />
              <Route path="/catalogs" component={Catalogs} />
              <PrivateRoute path="/dashboard" exact component={Dashboard} />
              <PrivateRoute path="/submit" exact component={Submission} />
              <PrivateRoute path="/my-artisans" exact component={MyArtisans} />
              <PrivateRoute path="/wishlist" exact component={WishList} />
              <PrivateRoute path="/profile" component={Profile} />
              {roles.includes("reviewer") && (
                <PrivateRoute path="/review" component={Review} />
              )}
              <Route path="/u/:slug/:listType" component={PublicList} />
            </Switch>
          </Container>
          <Footer />
        </div>
      </Grommet>
    </Router>
  );
};

export default App;
