import { Connection } from "typeorm"
import { AdvancementLevel } from "../entities/advancement-level"
import { AdvancementLevelsRepo } from "../repos/advancement-levels-repo"
import { last } from "../util/array"
import { copy } from "../util/object"

export const sortAdvancementLevels = async (connection: Connection, advancementLevels: AdvancementLevel[]) => {
  const repo = new AdvancementLevelsRepo(connection)
  const copies = advancementLevels.map(copy)

  console.table(copies)

  for (const copy of copies) {
    const index = copies.indexOf(copy)
    copy.position = index
    if (copy === last(copies)) {
      copy.nextLevelId = null
      await repo.save(copy)
      continue
    }
    copy.nextLevelId = copies[index + 1]?.id || null
    await repo.save(copy)
  }
}
