import { BillingRates } from "../models";

export function isPeakHour(timestamp:Date) {
    const hour = new Date(timestamp).getHours();
    return hour >= 7 && hour < 24;
}

export function getRate(timestamp:Date, rate: BillingRates) {
    if (isPeakHour(timestamp)) {
      return rate.peakRate; 
    } else {
      return rate.offPeakRate;
    }
}