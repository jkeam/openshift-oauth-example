import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import "./App.css";

function App({ clusterName, appUrl }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [scope, setScope] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);
  const [tokenType, setTokenType] = useState(null);

  useEffect(() => {
    const paramString = window.location.href.split('#')[1];
    if (paramString) {
      const params = new URLSearchParams(paramString);
      setToken(params.get('access_token'));
      setScope(params.get('scope'));
      setExpiresIn(params.get('expires_in'));
      setTokenType(params.get('token_type'));
      setLoggedIn(true);
    }
  }, [setToken, setLoggedIn, setScope, setExpiresIn, setTokenType]);

  return (
    <div className="App text-center container-fluid">
      {!loggedIn ? (
        <>
          <img
            className="mb-4"
            src="/openshift.png"
            width="150"
            alt="openshift"
          ></img>
          <h1 className="h3 mb-3 font-weight-normal">Sign in with OpenShift</h1>
          <Button
            variant="primary"
            size="lg"
            href={`https://oauth-openshift.apps.${clusterName}/oauth/authorize?client_id=demo&redirect_uri=${appUrl}&response_type=token`}
          >
            Sign in
          </Button>
        </>
      ) : (
        <>
          <h1>Welcome</h1>
          <p>
            You are logged in!
          </p>
          <Card style={{ maxWidth: "100%", margin: "auto", marginBottom: '1rem' }}>
            <Card.Body>
              <Card.Title>Token Info</Card.Title>
              <Card.Text>Token Type: {tokenType}</Card.Text>
              <Card.Text>Scope: {scope}</Card.Text>
              <Card.Text>Expires in: {expiresIn}</Card.Text>
              <Card.Text>Access Token: {token}</Card.Text>
              <Card.Text>
                Example usage:
                <br />
                <code>
                curl -H "Authorization: Bearer {token}" "https://api.{clusterName}:6443/apis/user.openshift.io/v1/users/~"
                </code>
              </Card.Text>
            </Card.Body>
          </Card>
          <Button
            variant="outline-secondary"
            size="lg"
            href="/"
          >
            Sign out 
          </Button>
        </>
      )}
    </div>
  );
}

export default App;
