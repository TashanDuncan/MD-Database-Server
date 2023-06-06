import PropertyModel from './property.model';
import Property from './property.interface';
import propertyModel from './property.model';

export const create = async (propertyDetails: Property) => {
  try {
    return await PropertyModel.create(propertyDetails);
  } catch (error) {
    throw new Error('Unable to create new Property');
  }
};

export const createMany = async (propertyDetails: Property[]) => {
  try {
    return await PropertyModel.insertMany(propertyDetails);
  } catch (error) {
    throw new Error(`Unable to create new Properties: ${error}`);
  }
};

export const getAll = async () => {
  try {
    return await PropertyModel.find({});
  } catch (error) {
    throw new Error(`Unable to retrieve all properties: ${error}`);
  }
};

export const update = async (id: string, propertyDetails: Property) => {
  try {
    const property = await getPropertyById(id);

    property.overwrite(propertyDetails);
    return await property.save();
  } catch (error) {
    throw new Error(`Unable to update property matching ID ${id}: ${error}`);
  }
};

export const getPropertyById = async (id: string) => {
  try {
    const propertyFound = await PropertyModel.findById(id);

    if (!propertyFound) {
      throw new Error(`Unable to update property matching ID ${id}`);
    }

    return propertyFound;
  } catch (error) {
    throw new Error(`Unable to update property matching ID ${id}: ${error}`);
  }
};

export const remove = async (id: string) => {
  try {
    const property = await getPropertyById(id);

    return await propertyModel.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Unable to update property matching ID ${id}: ${error}`);
  }
};
