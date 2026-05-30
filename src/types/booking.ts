export interface BookingService {
  id: string;
  name: string;
  description: string;
  startingPrice?: string;
  durationHint?: string;
}

export interface BookingInquiryData {
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  dateLocation?: string;
  budget?: string;
  message: string;
}
