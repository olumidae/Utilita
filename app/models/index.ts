export interface MeterData{
    id: string; 
    timestamp: Date;
    reading: number;
}
  
export interface BillingRates {
    peakRate: number;
    offPeakRate: number;
}
  