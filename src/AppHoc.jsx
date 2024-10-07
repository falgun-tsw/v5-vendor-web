import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, useLocation } from "react-router-dom";
import { CssBaseline } from "@mui/material";

// Common Components
import PrimaryTheme from "./theme/primaryTheme";
import Loader from "@app/component/common/Loader";
import Snackbar from "@app/component/common/Snackbar";
import { commonActions } from "@app/stores/common/commonActions";

const AppHOC = (props) => {
  const dispatch = useDispatch();
  const toastData = useSelector((state) => state.common.toast);
  const globalLoader = useSelector(
    (state) => state.common.loading.globalLoader
  );
  const ScrollToTop = (props) => {
    const location = useLocation();
    React.useEffect(() => {
      window.scroll({ top: 0, behavior: "smooth" });
    }, [location]);
    return props.children;
  };

  return (
    <BrowserRouter basename="/">
      <PrimaryTheme>
        <Loader position="fixed" loading={globalLoader} />
        <CssBaseline />
        <Snackbar
          open={toastData.open}
          onClose={() => dispatch(commonActions.resetToast())}
          message={toastData.message}
          autoHideDuration={toastData.timeout}
        />
        <ScrollToTop>{props.children}</ScrollToTop>
      </PrimaryTheme>
    </BrowserRouter>
  );
};
export default AppHOC;
