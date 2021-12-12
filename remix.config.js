/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: "client",
  browserBuildDirectory: "public/build",
  publicPath: "/build/", // https://esbuild.github.io/api/#public-path
  serverBuildDirectory: "build",
  devServerPort: 8002
};
