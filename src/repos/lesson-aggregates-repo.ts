import { Connection } from "typeorm";
import { LessonAggregate } from "../aggregates/lesson-aggregate";
import { head, isEmptyArray } from "../util/array";
import { map } from "../util/promise";
import { AdvancementLevelsRepo } from "./advancement-levels-repo";
import { GroupsRepo } from "./groups-repo";
import { LessonsRepo } from "./lessons-repo";

export class LessonAggregatesRepo {
  _lessonsRepo = new LessonsRepo(this.connection)
  _levelsRepo = new AdvancementLevelsRepo(this.connection)
  _groupsRepo = new GroupsRepo(this.connection)
  constructor(private connection: Connection) {
  }

  async find(criteria = {}): Promise<LessonAggregate[]> {
    const lessons = await this._lessonsRepo.find(criteria)
    if (isEmptyArray(lessons)) return []


    const aggregates: LessonAggregate[] = await map(lessons, async x => {
      const advancementLevel = head(await this._levelsRepo.find({ id: x.advancementLevelId.toString() }))
      if (advancementLevel === null) {
        throw Error(`Advancement Level for Lesson ${x.id.toString()} not found`)
      }
      const group = head(await this._groupsRepo.find({ 'Groups.id': x.groupId.toString() }))
      if (group === null) {
        throw Error(`Group for Lesson ${x.id.toString()} not found`)
      }

      const { id, createdAt, topic } = x
      const aggregate: LessonAggregate = {
        id,
        topic,
        createdAt,
        advancementLevel,
        group,
      }
      return aggregate
    })
    return aggregates
  }
}
