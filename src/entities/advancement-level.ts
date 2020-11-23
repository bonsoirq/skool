import { now } from "../util/date";
import { UUID, UUIDv4 } from "../values/uuid";

export interface IAdvancementLevel extends IAdvancementLevelProps {
  id: UUIDv4;
  name: string;
  createdAt: Date;
}

interface IAdvancementLevelProps {
  id?: UUIDv4;
  name: string;
  createdAt?: Date;
}

export function AdvancementLevel({
  id = UUID(),
  name,
  createdAt = now(),
}: IAdvancementLevelProps): IAdvancementLevel {
  return {
    id,
    name,
    createdAt,
  }
}
