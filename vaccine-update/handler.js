'use strict';
const axios = require("axios");

// module.exports.getUpdates = async (event) => {
//     //const city = event.currentIntent.slots["city"];
//     const url = "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/news/get-vaccine-news/0";
//
//     try {
//         const response = await axios.get(url,{headers: {"x-rapidapi-key": "d16f4c3296mshd9fad1e455aec14p1bc570jsn4fca7a099e27",
//                 "x-rapidapi-host": "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
//                 "useQueryString" : true}});
//         const data = response.data;
//         console.log(data);
//
//         const answer = "News: " + data.news[0].title + " Link :  "  +  data.news[0].link  + " URLTOImage " + data.news[0].urlToImage;
//
//         return {
//             "sessionAttributes": {},
//             "dialogAction": {
//                 "type": "Close",
//                 "fulfillmentState": "Fulfilled",
//                 "message": {
//                     "contentType": "PlainText",
//                     "content": answer
//                 }
//             }
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };

// Close dialog with the customer, reporting fulfillmentState of Failed or Fulfilled ("Thanks, your pizza will arrive in 20 minutes")
function close(sessionAttributes, fulfillmentState, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
        },
    };
}

// --------------- Events -----------------------

async function getUpdates(intentRequest, callback) {
    console.log(`request received for userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
    const sessionAttributes = intentRequest.sessionAttributes;
    const intent = intentRequest.currentIntent.name;
    const slots = intentRequest.currentIntent.slots;
    //const crust = slots.crust;
    //const size = slots.size;
    // const pizzaKind = slots.pizzaKind;

    if (intent === 'VaccineInfo') {
        const url = "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/news/get-vaccine-news/0";
        const response = await axios.get(url, {
            headers: {
                "x-rapidapi-key": "d16f4c3296mshd9fad1e455aec14p1bc570jsn4fca7a099e27",
                "x-rapidapi-host": "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
                "useQueryString": true
            }
        });
        const data = response.data;
        console.log(data);

        const answer = "News: " + data.news[0].title + " Link :  " + data.news[0].link + " URLTOImage " + data.news[0].urlToImage;

        // return {
        //     "sessionAttributes": {},
        //     "dialogAction": {
        //         "type": "Close",
        //         "fulfillmentState": "Fulfilled",
        //         "message": {
        //             "contentType": "PlainText",
        //             "content": answer
        //         }
        //     }
        // }

        callback(close(sessionAttributes, 'Fulfilled',
            {'contentType': 'PlainText', 'content': answer}));

    }

// --------------- Main handler -----------------------

// Route the incoming request based on intent.
// The JSON body of the request is provided in the event slot.
    exports.handler = (event, context, callback) => {
        try {
            getUpdates(event,
                (response) => {
                    callback(null, response);
                });
        } catch (err) {
            callback(err);
        }
    };
}
