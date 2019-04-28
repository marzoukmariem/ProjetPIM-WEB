// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: 'AIzaSyCH6nnPvkhLvSNyzH988cIiPPprst482RQ',
    authDomain: 'projetpim-web.firebaseapp.com',
    databaseURL: 'https://projetpim-web.firebaseio.com',
    projectId: 'projetpim-web',
    storageBucket: 'projetpim-web.appspot.com',
    messagingSenderId: '990597631882'
  },
  apiURL : 'http://79.137.75.40:8000/kidspay',
  mapbox:{
    accessToken:'pk.eyJ1IjoieHBlZWRodW50ZXIiLCJhIjoiY2p1ZzAyYWl5MGd0eTQzczBiMjR5cXVhNiJ9.FDe2N1Dxzt9kf4qoSgsyiA'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
