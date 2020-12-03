import { Connection } from "typeorm";
import { GroupAggregate } from "../aggregates/group-aggregate";
import { head, isEmptyArray } from "../util/array";
import { map } from "../util/promise";
import { AdvancementLevelsRepo } from "./advancement-levels-repo";
import { GroupsRepo } from "./groups-repo";

export class GroupAggregatesRepo {
  _groupsRepo = new GroupsRepo(this.connection)
  _levelsRepo = new AdvancementLevelsRepo(this.connection)
  constructor(private connection: Connection) {
  }

  async find(criteria = {}): Promise<GroupAggregate[]> {
    const groups = await this._groupsRepo.find(criteria)
    if (isEmptyArray(groups)) return []


    const aggregates: GroupAggregate[] = await map(groups, async x => {
      const advancementLevel = head(await this._levelsRepo.find({ id: x.advancementLevelId.toString() }))
      if (advancementLevel === null) {
        throw Error(`Advancement Level for Group ${x.id.toString()} not found`)
      }

      const { id, createdAt, name } = x
      const aggregate: GroupAggregate = {
        id,
        name,
        createdAt,
        advancementLevel: advancementLevel,
      }
      return aggregate
    })
    return aggregates
  }
}
