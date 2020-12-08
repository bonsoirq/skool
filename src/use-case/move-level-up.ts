import { Connection } from "typeorm"
import { AdvancementLevel } from "../entities/advancement-level"
import { AdvancementLevelsRepo } from "../repos/advancement-levels-repo"
import { sortAdvancementLevels } from "./sort-advancement-levels"

export const moveLevelUp = async (connection: Connection, advancementLevel: AdvancementLevel) => {
  const repo = new AdvancementLevelsRepo(connection)
  const levels = await repo.find({ courseId: advancementLevel.courseId.toString() })
  const copy = levels.find(x => x.id.equals(advancementLevel.id))

  const precedingLevels = levels.slice(0, levels.indexOf(copy!) - 1)
  const followingLevels = levels.slice(levels.indexOf(copy!) - 1, levels.length).filter(x => x !== copy)
  await sortAdvancementLevels(connection, [...precedingLevels, copy!, ...followingLevels])
}
