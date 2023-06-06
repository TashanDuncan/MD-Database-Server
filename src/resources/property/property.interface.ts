import { Document } from 'mongoose';

export default interface Property extends Document {
  city: string;
  country: string;
  description: string;
  heroImg: string;
  caption: string;
  rating: number;
  numVotes: number;
  totalPrice: number;
  dateFrom: string;
  dateTo: string;
  numRooms: number;
  numBeds: number;
  numToilets: number;
  sharedProperty: boolean;
  images: string[];
}
