import partners from "../../../import.json";

import { PartnerSchema } from "../../models/partners.js";

export default (): PartnerSchema[] => {
  return partners as PartnerSchema[];
};
