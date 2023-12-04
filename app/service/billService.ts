import { ErrorResponse, SucessResponse } from "../utility/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { BillingRates, MeterData } from "../models/index";
import { plainToClass } from "class-transformer";
import AWS, { SQS } from 'aws-sdk';
import { getRate,} from "../utility/utils";

export class BillService {
    constructor(){
    }

    async CalculateBill(event: APIGatewayProxyEventV2, meterReadings?: MeterData[]) {
        let billingDetails = [];
        let totalCost = 0;
        // input rate passed in to the system
        const rates: BillingRates = JSON.parse(event.body);
        
        // assuming data from meter is not empty and its new
        for (const meterReading of meterReadings) {

            // get rate that will based on 
          let ratePerUnit = getRate(meterReading.timestamp, rates);
          let readingCost = ratePerUnit * meterReading.reading;
          totalCost += readingCost;
        
            billingDetails.push({
                householdID: meterReading.id,
                timestamp: meterReading.timestamp,
                reading: meterReading.reading,
                rate: ratePerUnit,
                totalCost
            })
        
        }
    
        const params = {
            Message: JSON.stringify(billingDetails),
            TopicArn: process.env.SNS_TOPIC,
            MessageAttributes: {
              actionType: {
                DataType: "String",
                StringValue: "calculate_bill",
              },
            },
        };
        const sns = new AWS.SNS();
        const response = await sns.publish(params).promise();
        return SucessResponse({ msg: "Bills Processed...", response });
    }

    async ResponseWithError(event: APIGatewayProxyEventV2) {
        return ErrorResponse(404, "requested method is not supported!");
    }
    
}



