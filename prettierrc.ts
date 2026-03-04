import { type Config } from "prettier";

const config: Config = {
  // overrides: [
  //   {
  //     files: ["*.prisma"],
  //     options: {
  //       parser: "prettier-plugin-prisma",
  //     },
  //   },
  // ],
  plugins: ["prettier-plugin-prisma"],
};

export default config;
