This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started

0. You need to get your own API_KEY from [weatherapi](https://www.weatherapi.com/).

1. Create `.env` file in the root folder of your project, paste your api key there as `REACT_APP_API_KEY=your-api-key` 

2. Install dependencies:

```sh
yarn
```

3. Run the project:

```sh
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to deploy my app to GitHub Pages?

1. Create your own GitHub repository for the project.

2. Change a `homepage` property in the `package.json` file. Add `homepage` `property in this format*: https://{username}.github.io/{repo-name}`

3. Add a "remote" that points to the GitHub repository `$ git remote add origin https://github.com/{username}/{repo-name}.git`

4. Deploy the React app to GitHub Pages:

```sh
yarn deploy
```
