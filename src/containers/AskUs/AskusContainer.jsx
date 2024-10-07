import React, { Component } from "react";
import Stack from "@app/component/common/Stack";
import RenderForm from "@app/component/common/RenderForm";
import { validationHelper } from "@app/helper/validation";
import { askUsApi } from "@app/stores/askUs/askUsApi";
import Text from "@app/component/common/Text";
import Grid from "@app/component/common/Grid";
import Image from "@app/component/common/Image";
import Button from "@app/component/common/Button";
import Card from '@app/component/common/Card';

class AskUsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        qestion: "",
        description: "",
      },
      formError: {
        qestion: "",
        description: "",
      },
      isLoading: 0,
    };
  }

  componentDidMount(){
    console.log("this.preops",this.props)
  }

  resetForm = () => {
    this.setState({
      form: {
        qestion: "",
        description: "",
      },
      formError: {
        qestion: "",
        description: "",
      },
    });
  };

  handleFormChange = (key, value) => {
    const { form } = this.state;
    form[key] = value;
    this.setState({ form });
  };

  handleValidation = () => {
    const { form, formError } = this.state;
    let errorCount = 0;
    let qestion = validationHelper.required(form.qestion);
    let description = validationHelper.required(form.description);
    if (!qestion.isValid) {
      errorCount++;
      formError.qestion = qestion.message;
    } else {
      formError.qestion = "";
    }
    if (!description.isValid) {
      errorCount++;
      formError.description = description.message;
    } else {
      formError.description = "";
    }
    this.setState({ formError });
    return errorCount;
  };

  handleFormSubmit = async () => {
    const { form } = this.state;
    if (this.handleValidation() > 0) {
      return;
    }
    this.setState({ isLoading: 1 });
    try {
      const payload = {
        askTitle: form.qestion,
        askUsDescription: form.description,
      };
      const res = await askUsApi.askUs(payload);
      if (res) {
        this.props.setToast({ message: res.message });
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      this.setState({ isLoading: 0 });
      this.resetForm();
    }
  };

  render() {
    const { form, formError, isLoading } = this.state;
    const formData = [
      {
        fullWidth: true,
        label: "Title of your question",
        value: form.qestion,
        gridSize: { xs: 12, sm: 12, md: 12 },
        onChange: (e) => this.handleFormChange("qestion", e.target.value),
        error: formError.qestion,
        helperText: formError.qestion,
      },
      {
        fullWidth: true,
        label: "Description",
        value: form.description,
        gridSize: { xs: 12, sm: 12, md: 12 },
        onChange: (e) => this.handleFormChange("description", e.target.value),
        multiline: true,
        rows: 4,
        error: formError.description,
        helperText: formError.description,
      },
    ];
    return (
      <Card sx={{ marginTop: "1rem" }}>
        <Grid container spacing={2}>
          <Grid items sm={4} md={5} sx={{ display: { xs: "none", sm: "block" } }}>
            <Image
              alt="Raise Dispute"
              imgStyle={{ objectFit: "cover", height: "600px" }}
              src="/images/askUs.jpeg"
            />
          </Grid>
          <Grid item xs={12} sm={4} md={7}>
            <Stack p={2}>
              <Text textAlign="center" pb={2} sx={{ color: "#206BCD", fontSize: "1.5rem" }}>Ask us</Text>
              <RenderForm data={formData} />
              <Stack pt={2} direction="row" justifyContent="center">
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  loading={isLoading}
                  onClick={() => this.handleFormSubmit()}
                  sx={{ width: "10rem", height: "2.5rem" }}
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

export default AskUsContainer;
