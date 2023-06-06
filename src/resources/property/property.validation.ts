import Joi from 'joi';

const propertyStructure = {
  city: Joi.string().required(),
  country: Joi.string().required(),
  description: Joi.string().required(),
  heroImg: Joi.string().required(),
  caption: Joi.string().required(),
  rating: Joi.number().required(),
  numVotes: Joi.number().required(),
  totalPrice: Joi.number().required(),
  dateFrom: Joi.string().required(),
  dateTo: Joi.string().required(),
  numRooms: Joi.number().required(),
  numBeds: Joi.number().required(),
  numToilets: Joi.number().required(),
  sharedProperty: Joi.boolean().required(),
  images: Joi.array().items(Joi.string()).empty(Joi.array().length(0)),
};

const create = [
  Joi.object(propertyStructure),
  Joi.array().items(propertyStructure),
];

const update = [Joi.object(propertyStructure)];

export default { create, update };
