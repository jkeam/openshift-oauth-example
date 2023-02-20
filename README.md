# OpenShift OAuth Example

This app demonstrates how to use OpenShift OAuth to authenticate your application.

## Prequisites

1. Node v18+
2. Yarn v1.22+
3. Running OpenShift 4+ cluster

## Setup

1. Install dependencies.

```shell
yarn install
```

2. Install OAuth client, replace redirect URI
with where this node app will run

```shell
oc create -f <(echo '
kind: OAuthClient
apiVersion: oauth.openshift.io/v1
metadata:
 name: demo
grantMethod: prompt
redirectURIs:
 - "http://localhost:3000"
')
```

3. Create `.env` file that looks like this,
but with your values.

```shell
REACT_APP_CLUSTER_NAME=cluster-7wbqv.7wbqv.sandbox1249.opentlc.com
REACT_APP_APP_URL=http://localhost:3000
```

## Running

```shell
yarn start
```
