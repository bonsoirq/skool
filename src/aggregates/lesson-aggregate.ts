import { AdvancementLevel } from "../entities/advancement-level";
import { Group } from "../entities/group";
import { UUIDv4 } from "../values/uuid";

export type LessonAggregate = {
  id: UUIDv4;
  topic: string;
  advancementLevel: AdvancementLevel;
  group: Group;
  createdAt: Date;
}
