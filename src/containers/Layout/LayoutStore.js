import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

const LayoutStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);
export default LayoutStore;
