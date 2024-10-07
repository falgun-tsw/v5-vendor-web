import React, { Component } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Accordion from "@app/component/common/Accordion";
import Stack from "@app/component/common/Stack";
import Card from "@app/component/common/Card";
import Text from "@app/component/common/Text";

export default class FaqsContainer extends Component {

  componentDidMount() {
    this.props.getFaqsList();
  }

  render() {
    const { faqsList = [], faqsLoading } = this.props;
    if (faqsLoading) {
      return (
        <Stack
          sx={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress style={{ color: "lightgrey" }} size={50} />
        </Stack>
      );
    }
    return (
      <>
        <Stack mt={2}>
          <Card sx={{ padding: "1rem", textAlign: "center" }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text sx={{ fontSize: "2rem" }}>FAQ'S</Text>
            </Stack>
          </Card>
          <Stack spacing={1} pt={2}>
            {faqsList.map((item, index) => {
              return (
                <Accordion title={item.faqcategoryName} renderChildren key={item.id}>
                  <Stack spacing={1}>
                    {item.faqs.map((subItem = [], i) => {
                      return (
                        <Accordion
                        key={item.id}
                          title={subItem.faqTitle}
                          data={subItem.faqDescription}
                        />
                      );
                    })}
                  </Stack>
                </Accordion>
              );
            })}
          </Stack>
        </Stack>
      </>
    );
  }
}
