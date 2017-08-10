module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "globals": {
    "jQuery": true,
    "Vue": true,
    "Vuex": true,
    "VueRouter": true,
    "$": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 2017,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  "plugins": [
    "html"
  ],
  "rules": {
    "no-empty": "warn",
    "no-unreachable": "warn",
    "no-unused-vars": "warn",
    "no-fallthrough": "warn",
    "no-useless-escape": "warn",
    "no-debugger": "off",
    "no-extra-semi": "off",
    "no-mixed-spaces-and-tabs": "off",
    "no-inner-declarations": "off",
    "no-cond-assign": "off",
    "no-console": "off",
    "no-cond-assign": "off",
    "no-constant-condition": "off",
    "no-unsafe-negation": "off",
    "no-extra-boolean-cast": "off",
    "no-irregular-whitespace": "off",
    "no-duplicate-case": "off",
    "no-sparse-arrays": "off"
  }
}
