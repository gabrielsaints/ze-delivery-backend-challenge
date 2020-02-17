import Chance from "chance";
import { Types } from "mongoose";

class ExtendedChance extends Chance {
  public int(): number {
    return super.integer({ min: -2147483648, max: 2147483647 });
  }

  public identity(): number {
    return super.integer({ min: 1, max: 214748 });
  }

  public objectId(): any {
    return Types.ObjectId();
  }
}

export default new ExtendedChance();
