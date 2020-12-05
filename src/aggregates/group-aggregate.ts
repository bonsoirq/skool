import { AdvancementLevel } from "../entities/advancement-level";
import { UUIDv4 } from "../values/uuid";

export type GroupAggregate = {
  id: UUIDv4;
  name: string;
  advancementLevel: AdvancementLevel;
  createdAt: Date;
}
