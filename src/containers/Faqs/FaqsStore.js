import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { faqActions } from "@app/stores/faq/faqActions";
const mapStateToProps = (state) => {
  return {
    faqsList: state.faq.faqsList,
    faqsLoading: state.faq.loading.faqs,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getFaqsList: faqActions.getFaqsList,
    },
    dispatch
  );

const FaqsStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);
export default FaqsStore;
