import typescript from "rollup-plugin-typescript";

export default {
  input: "./frontend_tests/main.ts",
  plugins: [typescript()],
  output: {
    file: "frontend_tests/build.js",
    format: "cjs"
  }
};
