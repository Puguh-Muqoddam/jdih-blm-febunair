import nextConfig from "eslint-config-next";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      ".open-next/**",
      "dist/**",
      "node_modules/**",
      "src/generated/**",
    ],
  },
  ...nextConfig,
  {
    rules: {
      "import/no-anonymous-default-export": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default eslintConfig;
