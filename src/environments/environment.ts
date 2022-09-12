// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// // import firebase from "firebase/compat";
// import initializeApp = firebase.initializeApp;
// import {getAnalytics} from "@angular/cli/src/analytics/analytics";
// import app = firebase.app;

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBPCNwWMYbilgbAd2TtLbVbIhxqzJFJkOE",
    authDomain: "uploadfile-54c70.firebaseapp.com",
    databaseURL : "https://uploadfile-54c70-default-rtdb.firebaseio.com/",
    projectId: "uploadfile-54c70",
    storageBucket: "uploadfile-54c70.appspot.com",
    messagingSenderId: "187372209197",
    appId: "1:187372209197:web:08bd0606897537d56424a4",
    measurementId: "G-ZQ9R4E68NS"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
