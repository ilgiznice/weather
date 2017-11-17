module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "env": {
        "browser": true,
    },
    "rules": {
        "semi": [2, "never"],
        "camelcase": [0, { properties: 'never' }],
        "import/extensions": [0, "never"],
        "import/prefer-default-export": "off",
        "jsx-a11y/click-events-have-key-events": "off"
    }
};