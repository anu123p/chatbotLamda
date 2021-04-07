'use strict';
const axios = require("axios");

module.exports.getInfo = async (event) => {


    const state = event.currentIntent.slots["state"];
    //const url = "https://api.covid19api.com/summary";
    const url = "https://api.covid19api.com/country/:state?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z";

    try {
        const response = await axios.get(url);
        const data = response.data;
        console.log(data);

        const answer = "Total New Confirmed cases are  " + data.Global.NewConfirmed +
                        " Total Confirmed cases are " + data.Global.TotalConfirmed +
                        " New Deaths are  " + data.Global.NewDeaths +
                        " Total Deaths are " + data.Global.TotalDeaths +
                        " New Recovered Cases are " + data.Global.NewRecovered +
                        "Total Recovered cases are " + data.Global.TotalRecovered ;
        console.log(answer);

        return {
            "sessionAttributes": {},
            "dialogAction": {
                "type": "Close",
                "fulfillmentState": "Fulfilled",
                "message": {
                    "contentType": "PlainText",
                    "content": answer
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
};
