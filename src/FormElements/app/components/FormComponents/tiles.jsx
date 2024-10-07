import React from 'react';
import { Grid, Card, CardContent } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const V5Tiles = (props) => {
    const {
        data,
        formik
    } = props;

    const TilesThemeColorEnum = {
        CUSTOM: "custom",
        WHITE: "white",
        RED: "red",
        BLUE: "blue"
    }

    let arrCards = [];
    const { formId } = useParams();
    if (data.customOptions.columns > 1) {
        let cols = 12 / data.customOptions.columns;
        for (let index = 0; index < data.customOptions.columns; index++) {
            arrCards.push({
                xs: '12', sm: cols * 2, md: cols
            });
        }
    } else {
        arrCards.push({
            xs: '12', sm: '12', md: '12'
        });
    }
    return (
        <Grid mt={3}>
            <Grid container spacing={data.customOptions.spacing || 2}>
                {
                    arrCards.map((c, i) => (
                        <Grid item xs={c.xs || 12} sm={c.sm || 12} md={c.md || 12} lg={c.lg || 6}>
                            <Card elevation={0} style={{
                                backgroundColor: `${data
                                    && data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.RED ?
                                    "rgb(216, 67, 21)" :
                                    data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.BLUE ? "rgb(30, 136, 229)" :
                                        data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.CUSTOM ? data.customOptions.tileProperties[i].tilesRandomColor :
                                            "#ffffff"}`,
                                border: "2px solid #D5D5D5"
                            }}>
                                <CardContent>
                                    <Grid container direction="column" alignItems="center"
                                        style={{
                                            borderRadius: '5px',
                                        }}
                                    >
                                        <Grid item className="pt-3">
                                            <h6 style={{
                                                color: `${data
                                                    && (data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.RED
                                                        || data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.BLUE
                                                        || data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.CUSTOM) ?
                                                    "#ffffff" : "#9f9f9f"}`
                                            }}>{`${data.customOptions.tileProperties[i].title ? data.customOptions.tileProperties[i].title : "Title Text"}`}</h6>
                                        </Grid>
                                        <Grid item>
                                            <h3 style={{
                                                color: `${data
                                                    && (data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.RED
                                                        || data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.BLUE
                                                        || data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.CUSTOM) ?
                                                    "#ffffff" : "#212121"}`
                                            }}>
                                                {/* {`${this.props.data.customOptions.tileProperties[i].rule === "static" ?
                                                        this.props.data.customOptions.tileProperties[i].textRule === "number" ?
                                                            (this.props.data.customOptions.tileProperties[i].numberTextValue || 0) :
                                                            this.props.data.customOptions.tileProperties[i].textRule === "text" ?
                                                                this.props.data.customOptions.tileProperties[i].shortTextValue : "Text" : "Text"}`} */}
                                                {data.customOptions.tileProperties[i].text ? data.customOptions.tileProperties[i].text : "Text"}
                                            </h3>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </Grid>
    );
}

export default V5Tiles;