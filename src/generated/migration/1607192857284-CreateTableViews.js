"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.CreateTableViews1607192857284 = void 0;
var CreateTableViews1607192857284 = /** @class */ (function () {
    function CreateTableViews1607192857284() {
    }
    CreateTableViews1607192857284.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                queryRunner.query("\n      CREATE VIEW AdmissionCardsView AS SELECT\n      AdmissionCards.number, AdmissionCards.createdAt, AdmissionCards.studentId,\n      Students.name AS studentName, Students.lastName AS studentLastName,\n      Students.phoneNo AS studentPhoneNo, Students.gender AS studentGender\n      FROM AdmissionCards\n      JOIN Students ON Students.id = AdmissionCards.studentId;\n    ");
                queryRunner.query("\n      CREATE VIEW GroupsView AS SELECT\n      Groups.id, Groups.advancementLevelId, Groups.name, Groups.createdAt,\n      AdvancementLevels.courseId, AdvancementLevels.name AS advancementLevelName,\n      Courses.name AS courseName\n      FROM Groups\n      JOIN AdvancementLevels ON AdvancementLevels.id = Groups.advancementLevelId\n      JOIN Courses ON Courses.id = AdvancementLevels.courseId;\n    ");
                queryRunner.query("\n      CREATE VIEW PresenceView AS SELECT\n      Presence.admissionCardNumber, Presence.createdAt, Presence.lessonId,\n      Lessons.topic AS lessonTopic, Lessons.groupId, Lessons.advancementLevelId,\n      AdmissionCards.studentId,\n      Students.name AS studentName, Students.lastName AS studentLastName,\n      Students.phoneNo AS studentPhoneNo, Students.gender AS studentGender,\n      Groups.name AS groupName,\n      AdvancementLevels.name AS advancementLevelName,\n      Courses.name AS courseName\n      FROM Presence\n      JOIN Lessons ON Lessons.id = Presence.lessonId\n      JOIN AdmissionCards ON AdmissionCards.number = Presence.admissionCardNumber\n      JOIN Students ON Students.id = AdmissionCards.studentId\n      JOIN Groups ON Groups.id = Lessons.groupId\n      JOIN AdvancementLevels ON AdvancementLevels.id = Lessons.advancementLevelId\n      JOIN Courses ON Courses.id = AdvancementLevels.courseId\n    ");
                queryRunner.query("\n      CREATE VIEW CourseProgressView AS SELECT\n      CourseProgress.admissionCardNumber, CourseProgress.createdAt,\n      CourseProgress.advancementLevelId, CourseProgress.groupId,\n      CourseProgress.courseId,\n      AdmissionCards.studentId,\n      Students.name AS studentName, Students.lastName AS studentLastName,\n      Students.phoneNo AS studentPhoneNo, Students.gender AS studentGender,\n      Groups.name AS groupName,\n      AdvancementLevels.name AS advancementLevelName,\n      Courses.name AS courseName\n      FROM CourseProgress\n      JOIN AdmissionCards ON AdmissionCards.number = CourseProgress.admissionCardNumber\n      JOIN Students ON Students.id = AdmissionCards.studentId\n      JOIN Groups ON Groups.id = CourseProgress.groupId\n      JOIN AdvancementLevels ON AdvancementLevels.id = CourseProgress.advancementLevelId\n      JOIN Courses ON Courses.id = CourseProgress.courseId\n    ");
                queryRunner.query("\n    CREATE VIEW LessonsView AS SELECT\n    Lessons.id, Lessons.topic, Lessons.groupId, Lessons.advancementLevelId, Lessons.createdAt,\n    Groups.name AS groupName,\n    AdvancementLevels.name AS advancementLevelName, AdvancementLevels.courseId,\n    Courses.name AS courseName\n    FROM Lessons\n    JOIN Groups ON Groups.id = Lessons.groupId\n    JOIN AdvancementLevels ON AdvancementLevels.id = Lessons.advancementLevelId\n    JOIN Courses ON Courses.id = AdvancementLevels.courseId\n    ");
                return [2 /*return*/];
            });
        });
    };
    CreateTableViews1607192857284.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                queryRunner.query("DROP VIEW IF EXISTS AdmissionCardsView");
                queryRunner.query("DROP VIEW IF EXISTS PresenceView");
                queryRunner.query("DROP VIEW IF EXISTS GroupsView");
                queryRunner.query("DROP VIEW IF EXISTS CourseProgressView");
                queryRunner.query("DROP VIEW IF EXISTS LessonsView");
                return [2 /*return*/];
            });
        });
    };
    return CreateTableViews1607192857284;
}());
exports.CreateTableViews1607192857284 = CreateTableViews1607192857284;
