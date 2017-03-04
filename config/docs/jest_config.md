## JEST CONFIGURATION

### install libraries

npm install --save-dev jest jest-cli babel-plugin-transform-async-to-generator react-test-renderer


### add test command

- startServer command : node config/server/start.js 3000
- startJest command : jest --config config/jest.json
- kill server command: killall node config/server/start.js

Test Command : 

```
// package.json -> script
"test": "node config/server/start.js 3000 & jest --config config/jest.json && killall node config/server/start.js",
```

### add *  "plugins": ["transform-async-to-generator"] to **.babel** file.

add plugin to .babelrc.

```json
{
  ...
  "plugins": ["transform-async-to-generator"]
}
```

```json
{
  "presets": [
     "react",
     "es2015",
     "stage-0"
  ],
  "plugins": ["transform-async-to-generator"]
}
```


### add jest json configuration file.

```json
// config/jest.json
{
  "automock": false,
  "bail": true,
  "testRegex": "/__test__/.*\\.spec\\.jsx?$",
  "setupTestFrameworkScriptFile": "<rootDir>/config/jest.setup.jasmine.js",
  "modulePaths": [
    "src"
  ],
  "moduleFileExtensions": [
    "js",
    "jsx"
  ],
  "moduleDirectories": [
    "node_modules",
    "bower_components"
  ]
}
```

### add jasmine configuration


```javascript
//config/jest.setup.jasmine.js
/**
 * Add custom settings to Jasmine.
 */

/*globals jasmine*/

jasmine.VERBOSE = true;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
```

### add *asynIt* method to **TestUtils**


```javascript
const asyncIt = (name: string, callback) => {
    it(name, async () => {
        let prom = new Promise((resolve: Function, reject: Function) => {
            callback((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        await prom.then(() => {
            console.log(`${name} done.`);
        }).catch((e) => {
            throw e;
        });
    });
};
```

