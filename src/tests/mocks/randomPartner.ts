import { PartnerSchema } from "../../models/partners";

import partners from "../../../import.json";
import chance from "../utils/chance";

export default (): PartnerSchema => {
  const [max, min] = [partners.length - 1, 0];

  return partners[chance.integer({ max, min })] as PartnerSchema;
};
