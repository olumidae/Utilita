import {APIGatewayProxyEventV2} from "aws-lambda";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { BillService } from "app/service/billService";

const service = new BillService();
export const CalculateBill = middy((event: APIGatewayProxyEventV2) => {
    return service.CalculateBill(event);
}).use(jsonBodyParser());