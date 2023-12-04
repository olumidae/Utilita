import { ErrorResponse, SucessResponse } from "../utility/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { BillingRates, MeterData } from "../models/index";
import AWS, { SQS } from 'aws-sdk';
import { getRate,} from "../utility/utils";

export class BillService {
    constructor(){
    }

    async CalculateBill(meterReadings: MeterData[], rates: BillingRates) {
        let billingDetails = [];
        let totalCost = 0;
        for (const meterReading of meterReadings) {
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



