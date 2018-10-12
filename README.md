Image processing application written in React.

# Stack
* Based on create-react-app
* React 16
* React Redux
* React Saga
* React Thunk
* Redux Worker

# Implemented features
* Grayscale
* Histogram
* Negative with threshold
* Solarisation
* Contrast increasing/decreasing
* Blur convolution filter, median convolution filter

# Folder structure
```
image-processing/
  src/
    action_creators
    components
    helpers
    lib - all filtering logic are stored here
    reducers
    sagas
    selectors
  ...
````

# Commands
To start app:
```npm start```
To test app:
```npm test```
To create compiled bundle:
```npm build```

# Deployment
Automated via Travis CI private build
