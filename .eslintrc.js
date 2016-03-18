module.exports = {
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "globals": {
    "angular": true,
    "_": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "no-console": 0,
    "no-debugger": 0,

    "prefer-template": 1,
    "constructor-super": 2,
    "no-shadow": 2,
    "no-use-before-define": 2,
    "no-else-return": 2,
    "no-unused-expressions": [2, { "allowShortCircuit": true }],
    "no-unused-vars": [2, {"args": "after-used", "varsIgnorePattern": "^_", "argsIgnorePattern": "^_"}],
    "no-const-assign": 2,
    "no-dupe-class-members": 2,
    "no-this-before-super": 2,

    "arrow-spacing": 2,
    "brace-style": [2, "1tbs", { "allowSingleLine": true }],
    "curly": 2,
    "key-spacing": 2,
    "eol-last": 2,
    "object-curly-spacing": [2, "always"],
    "quote-props": [2, "as-needed"],
    "padded-blocks": [2, "never"],
    "semi": [2, "always"],
    "space-in-parens": [2, "never"],
    "space-infix-ops": 2,
    "object-shorthand": [2, "always"],
    "no-var": 2,
    "no-extra-parens": 2,
    "no-multi-spaces": 2,
    "no-mixed-spaces-and-tabs": 2,
    "no-multiple-empty-lines": [2, { "max": 2 }],
    "no-negated-condition": 2,
    "no-trailing-spaces": 2,
    "no-underscore-dangle": 2
  }
}
