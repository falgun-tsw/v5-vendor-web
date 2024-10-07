const injectHelper = {};

injectHelper.script = ({ src }) =>
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve();
    };
    script.onerror = () => {
      reject();
    };
    document.body.appendChild(script);
  });

injectHelper.link = ({ href, rel, type }) =>
  new Promise((resolve) => {
    const link = document.createElement("link");
    link.href = href;
    if (link.rel) {
      link.rel = rel;
    }
    if (link.type) {
      link.type = type;
    }
    document.head.appendChild(link);
    resolve();
  });

export { injectHelper };
