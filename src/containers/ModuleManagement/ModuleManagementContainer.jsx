import React, { Component } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EmptyView from "@app/component/common/EmptyView";
import MTab from "@app/component/common/Tab"
import ModuleManagement from "./components/ModuleManagement";
import Text from "@app/component/common/Text";
import Stack from "@app/component/common/Stack";
import IconButton from "@app/component/common/IconButton";
import Card from "@app/component/common/Card";
class ModuleManagementContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSubModules: "",
    };
  }
  componentDidMount = () => {
    const { state } = this.props.location;
    const { subModules } = state;
    this.setState({ activeSubModules: subModules[0] });
  };

  handleBack = () => {
    this.props.history.goBack();
  };

  getActiveSubModulesById = (id) => {
    const { state } = this.props.location;
    const { subModules } = state;
    this.setState({ activeSubModules: subModules[id] });
  };

  render() {
    const { activeSubModules } = this.state;
    const { state } = this.props.location;
    const { mid, name, subModules } = state;
    return (
      <>
        <Stack direction="row" alignItems="center" pt={2}>
          <IconButton onClick={this.handleBack}>
            <ArrowBackIcon />
          </IconButton>
          <Text sx={{ color: "#0000008a", fontWeight: "500 !important" }}>
            {name}
          </Text>
        </Stack>
        <Card
          sx={{
            padding: "1rem",
            marginTop: "1rem",
          }}
        >
          <Stack>
            {subModules && subModules.length ? (
              <MTab
                value={activeSubModules}
                tabs={subModules}
                onChange={(index) => this.getActiveSubModulesById(index)}
              />
            ) : (
              <EmptyView
                Imgsrc="/assets/images/No Data Illustration-3.svg"
                Title="No Submodules Available."
              />
            )}
          </Stack>
          <Stack mt={1}>
              <ModuleManagement
                mid={mid}
                smid={activeSubModules?.id}
                wid={activeSubModules?.workFlowId}
                mBy={activeSubModules?.mappedBy}
              />
          </Stack>
        </Card>
      </>
    );
  }
}

export default ModuleManagementContainer;
