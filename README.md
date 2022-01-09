# MERN-Redux-Testing-Template

Reusable MERN + Redux setup w/ Nginx Reverse Proxy and API Endpoint Testing with Supertest. Full CI/CD pipeline using
GitHub actions and deployment to AWS ElasticBeanstalk via Docker.

Live site: http://mern-template-app-environment.eba-judyf6mf.us-east-1.elasticbeanstalk.com/

## Components

This repository consists of several modular components that can be leveraged to build a robust, production-grade web
application. The end-to-end development flow can be run either with/without Docker containers. The production flow runs
in a Docker environment in AWS ElasticBeanstalk - as such, each component comes with development and production-grade
Dockerfiles.

1. Client
    1. This is a React-Redux application, with the directory and component structure fully set up and configured for an
       extensible, modular frontend app, along with testing.
    2. A sample frontend has been configured with a CRUD-based UI to allow for quick testing and extendability.
    3. It also contains a development proxy server to route requests to the API, which is expected to be running on port
        5000. Nothing needs to be done with regard to the development proxy, it is integrated with react scripts.
    4. It contains ESLint configured with AirBnB's style guide.
    5. An `nginx` subdirectory exists for production.
        1. This is a very simple webserver responsible for serving the built client in the production Docker container.
2. API
    1. An Express API implemented in Node, this component is configured with the `mongoose` ODM to interact with Mongo
       databases.
    2. Sample RESTful endpoints (routes + middleware + controllers) have been implemented to allow for easy extension.
    3. Logging is configured using `winston`.
    4. Sample integration/endpoint tests have been implemented using `supertest`.
    5. It contains ESLint configured with AirBnB's style guide.

3. Nginx
    1. A simple reverse proxy responsible for proxying requests to either the API or the nginx webserver that serves the
       built client, depending on the request location. This is the public-facing component in production.

## DevOps and Deployment Components

1. GitHub Actions
    1. A full-fledged CI/CD pipeline is set up that runs two workflows: the main workflow and a CodeQL workflow for
       security analysis.
    2. The main workflow consists of four jobs:
        1. Static Analysis, which runs ESLint to validate changes
        2. Test, which runs configured Client and API tests
        3. Publish, which builds and publishes production Docker images to DockerHub
        4. Deploy, which deploys the application configuration defined in `docker-compose.yml` to AWS ElasticBeanstalk
            1. This configuration looks for the published images

   *NOTE: for the CI/CD pipeline to work, it makes use of GitHub Actions secret environment variables. Ensure you
   configure the following secrets in your repository: `DOCKER_HUB_USERNAME`, `DOCKER_HUB_ACCESS_TOKEN`
   , `AWS_ACCESS_KEY_ID`
   , `AWS_SECRET_ACCESS_KEY`, `AWS_EB_APP_NAME`, and`AWS_EB_ENV_NAME`.*

2. AWS
    1. A CloudFormation configuration that sets up the necessary AWS resources for deployment.
    2. Consult the [README](./aws/README.md) in the `aws/` directory for more details.

## Preparation

There are a few preparation steps to be completed:

1. First, create a MongoDB database, either use a local database or Atlas.
    1. Then create an `.env` file in the root of `api` folder and supply the environment variable `DB_CONNECTION_URI`
       with the value to set to a MongoDB connection URI.
    2. If you want to run the API endpoint tests, ensure you have a local installation of MongoDB as well; consult
       the `api/test` [README](./api/test/README.md) file for more details.
2. Install the prerequisite software tools to support development and building:
    1. Node & NPM
    2. Docker & Docker Compose
    3. AWS CLI
3. Follow the steps outlined the `aws/` directory to set up the production environment (OPTIONAL).

## Installation

Use the package manager [npm](https://www.npmjs.com/get-npm) to install all required components.

```bash
# to install backend packages
cd api
npm install

# to install frontend packages
cd client
npm install
```

To build Docker images in a single line using [docker-compose](https://docs.docker.com/compose/reference/build/):

```bash
# in root project directory
docker-compose -f docker-compose-dev.yml build
```

## Usage

Run the _api_ and _client_ using `npm`.

```bash
# to run backend
cd api
npm start

# to run frontend
cd client
npm start
```

Or via [docker-compose](https://docs.docker.com/compose/reference/build/):

```bash
# in root project directory
docker-compose -f docker-compose-dev.yml up
```

## Making Changes

Each component is modular, so start anywhere you feel comfortable!
A good starting point for extending the API is to add additional models and endpoints, and supporting authentication. To
extend the client, you may wish to add additional UI components and corresponding Redux logic. To enhance the Nginx
configuration, a good starting point is to support HTTPS traffic (currently, it only works with HTTP). If you'd like,
you can change-up/upgrade the AWS deployment to use more heavyweight EC2 instances or configure Load Balancing. Add more
stages to the GitHub Actions CI/CD pipeline if you wish!

| :memo:        | Credit to the [Researchify](https://github.com/Researchify/Researchify) project for helping inform the end-to-end design!       |
|---------------|:------------------------|

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
