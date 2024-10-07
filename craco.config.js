const path = require('path');

module.exports = {
  webpack: {
    alias: {
      "@app/component": path.resolve(__dirname, 'src/components'),
      "@app/config": path.resolve(__dirname, "src/config"),
      "@app/container": path.resolve(__dirname, "src/containers"),
      "@app/helper": path.resolve(__dirname, "src/helper"),
      "@app/pages": path.resolve(__dirname, "src/pages"),
      "@app/stores": path.resolve(__dirname, "src/stores"),
      "@app/navigator": path.resolve(__dirname, "src/navigator"),
      "@app/util": path.resolve(__dirname, "src/util"),
      "@app/FormElements": path.resolve(__dirname, "src/FormElements"),
      "app": path.resolve(__dirname, "src/FormElements/app")
    },
  },
};
