import React, { useContext, useEffect, useState } from 'react';
import Footer from './components/footer';
import { BrowserRouter as Router } from "react-router-dom";
import Switcher from './components/switcher';
import { observer } from 'mobx-react-lite';
import { check } from './http/userApi';
import { Spinner } from 'react-bootstrap';
import { Context } from './index.js';

const App = observer(() => {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(Context);

  useEffect(() => {
    check().then(data => {
      if (!data) {
        user.setUser(null);
        user.setIsAuth(false);
      } else {
        user.setUser(data);
        user.setIsAuth(true);
      }
    }).finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return <Spinner className="container" animation={"grow"} />;
  }

  return (
    <>
      <Router>
        <Switcher />
      </Router>
      <Footer />
    </>
  );
});

export default App;