# Getting Started

MadeByStudios is an exploration into a creative showcase built with React and ThreeJS, designed to showcase fiber arts created by my friends and I with a premium, animated user experience. In addition, we incoporated Stripe so we may sell our crochet patterns.

The home screen features images of recent project with a distortion effect applied, creating an ever-evolving wave pattern that will continue to match our recent projects. 
![Home page - Animated gif demo](demo/HomeScreen.gif)

## Technologies used:
Frontend: TypeScript, [React](https://react.dev/), [Framer Motion](https://motion.dev/), [Tailwind CSS](https://tailwindcss.com/), [ThreeJS](https://threejs.org/), [React Three Fiber](https://r3f.docs.pmnd.rs/), [Lenis smooth scroll
](https://github.com/darkroomengineering/lenis)\
Backend: Python ([FastAPI](https://fastapi.tiangolo.com/)), [Stripe](https://docs.stripe.com/sdks/stripejs-react)

## Client requirements 

In the `client` directory, create a `.env` file and add your Web3Form access key and Stripe publishable key. These are required before running the app.

## Run client
Assumes local instal of [Node.js](https://nodejs.org/en)

In the client directory, you can run:
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Server

To start the server, begin by creating a virutal environment

### 1. Create/start virual environment
Mac/Linux:

`python3 -m venv venv`

`source venv/bin/activate`

Windows:

`python -m venv venv`

`.\venv\Scripts\Activate.ps1`

### 2. Install requirements
`pip install -r requirements.txt`

In the `server` directory, create a `.env` file and add the Stripe secret key. This is required before running the server.

### 3. Start server
It's recommended to have 2 terminals open, one running the client and one running the server.
Once running, the server will be available at http://localhost:4242.

`uvicorn main:app --reload --port 4242`
