# Image Labeler App

Supervised machine learning (ML) projects rely heavily on annotated datasets. Tools can be developed to facilitate and make the task of annotation / labeling more efficient and scalable.

This project consists of a simple android app that can be used to label images into binary classes. The app is built using [React Native](https://facebook.github.io/react-native/).

An implementation for an image server API is also available (`image_server/image-server.py`) from which the app will connect to to serve images that need to be annotated.

The server requires the following modules:
- flask
- flask_restful
- pandas

Steps needed during development:
- Run `image-server.py <path-to-data>`.
- Run `python -m SimpleHTTPServer 8800` in the image directory (`<path-to-data>/img`).
- Run `npm start` in the project root directory.
- Run an Android Emulator or connect an android device.
- Open another terminal in the project root directory and run `react-native run-android`. Alternatively, Android Studio can be used to build and install the app to the emulator or device.

Screenshots for car labeler:
![Car](https://github.com/avsolatorio/image-labeler/blob/master/screenshot-car.png)

![Not car](https://github.com/avsolatorio/image-labeler/blob/master/screenshot-not-car.png)
