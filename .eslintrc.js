module.exports = {
  "extends": [
    "prettier",
    "prettier/react"
  ],

  "plugins": [
    "prettier"
  ],
  "parserOptions": {
    "ecmaVersion": 2016,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    }
  },
  "env": {
    "es6": true,
    "node": true
  },
  "rules": {
    "prettier/prettier": ["error", {
      "singleQuote": true,
      "trailingComma": "es5",
      "semi": false,
      "printWidth": 70,
    }],
  }
}