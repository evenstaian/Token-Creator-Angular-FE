// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl:  `https://criptolab-auth-service-dot-pandapay.rj.r.appspot.com`, //`http://localhost:8082`, //`https://criptolab-auth-service-prod-dot-pandapay.rj.r.appspot.com`,
  apiTokenUrl: `http://localhost:8081`, // `https://criptolab-token-api-prod-dot-pandapay.rj.r.appspot.com`,
  // apiTokenUrl: `https://criptolab-token-api-dot-pandapay.rj.r.appspot.com`,
  apiEventsUrl: `https://events.coins-external.com:8088`,
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
