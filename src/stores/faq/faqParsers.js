import _get from "lodash.get";

const faqParsers = {};

faqParsers.faqsList = (res) => {
  if (res && res.response) {
    res = res.response;
  }

  if (!res) {
    return [];
  }
  const handleFaqsData = (data) => {
    if (data.length) {
      return data.map((item) => {
        return {
          id: _get(item, "id", null),
          faqTitle: _get(item, "faqTitle", ""),
          faqDescription: _get(item, "faqDescription", ""),
        };
      });
    }
    return [];
  };
  const data = res.map((faq, i) => {
    return {
      id: _get(faq, "id", ""),
      faqcategoryName: _get(faq, "faqcategoryName", ""),
      faqs: handleFaqsData(_get(faq, "faqs", [])),
    };
  });
  return data;
};

export { faqParsers };
