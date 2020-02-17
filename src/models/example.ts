import { Document, model, Model, Schema } from "mongoose";

interface ModelExampleSchema {
  name?: string;
}

interface ModelExampleSerialized extends ModelExampleSchema {
  _id: string;
}

interface ModelExampleDocument extends Document {
  _id: string;
  name: string;
  serialize: () => ModelExampleSerialized;
}

type ModelExampleModel = Model<ModelExampleDocument>;

const modelExampleSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

modelExampleSchema.methods.serialize = function(): ModelExampleSerialized {
  const modelExample: ModelExampleSerialized = {
    _id: this.id,
    name: this.name
  };

  return modelExample;
};

const isModelExample = (
  modelExample: ModelExampleSerialized
): modelExample is ModelExampleSerialized => {
  return !!(modelExample && modelExample.name && modelExample._id);
};

export {
  ModelExampleDocument,
  isModelExample,
  ModelExampleSerialized,
  ModelExampleSchema
};

const modelExampleModel: ModelExampleModel = model<
  ModelExampleDocument,
  ModelExampleModel
>("ModelExample", modelExampleSchema);

export default modelExampleModel;
