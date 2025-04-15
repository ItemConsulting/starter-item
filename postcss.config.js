const path = require("path");

module.exports = (ctx) => ({
  map: ctx.options.map,
  plugins: {
    "postcss-import": {
      root: ctx.file.dirname,
      path: [path.join(process.cwd(), "node_modules")],
    },
    "postcss-url": {
      url: "copy",
    },
    "postcss-reporter": {
      clearReportedMessages: true,
    },
    "postcss-normalize": {},
    "postcss-nesting": {},
    autoprefixer: {},
    cssnano: {},
  },
});
