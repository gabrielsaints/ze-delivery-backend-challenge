import { Document, model, Model, Schema } from "mongoose";
import { calculateDistance } from "../helpers/distance";

export interface GeolocationCoverageArea {
  type: "MultiPolygon";
  coordinates: [[[[number, number]]]];
}

export interface GeolocationAddress {
  type: "Point";
  coordinates: [number, number];
}

export interface PartnerSchema {
  tradingName: string;
  ownerName: string;
  document: string;
  coverageArea?: GeolocationCoverageArea;
  address?: GeolocationAddress;
}

export interface PartnerSerialized extends PartnerSchema {
  _id: string;
}

export interface PartnerDocument extends Document {
  _id: string;
  tradingName: string;
  ownerName: string;
  document: string;
  coverageArea: GeolocationCoverageArea;
  address: GeolocationAddress;
  serialize: () => Promise<PartnerSerialized>;
  distanceBetween: (latitude: number, longitude: number) => number;
}

type PartnerModel = Model<PartnerDocument>;

const partnerSchema = new Schema({
  tradingName: {
    type: String,
    required: true
  },
  ownerName: {
    type: String,
    required: true
  },
  document: {
    type: String,
    required: true,
    unique: true
  },
  coverageArea: {
    type: {
      type: String,
      enum: ["MultiPolygon"],
      required: true
    },
    coordinates: {
      type: [[[[Number]]]],
      required: true
    }
  },
  address: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

partnerSchema.methods.serialize = async function(): Promise<PartnerSerialized> {
  const partner: PartnerSerialized = {
    _id: this.id,
    address: this.address,
    coverageArea: this.coverageArea,
    document: this.document,
    ownerName: this.ownerName,
    tradingName: this.tradingName
  };

  return partner;
};

// Used to calculate the distance between a given location to address location
partnerSchema.methods.distanceBetween = function distanceBetween(
  longitude: number,
  latitude: number
): number {
  return calculateDistance({
    from: { longitude, latitude },
    to: {
      latitude: this.address.coordinates[1],
      longitude: this.address.coordinates[0]
    }
  });
};

partnerSchema.pre<PartnerDocument>("save", function(next) {
  this.document = this.document.replace(/[^\d]/g, "");
  next();
});

export const isPartner = (
  partner: PartnerSerialized
): partner is PartnerSerialized => {
  return !!(partner && partner._id);
};

const Partner: PartnerModel = model<PartnerDocument, PartnerModel>(
  "Partner",
  partnerSchema
);

export default Partner;
