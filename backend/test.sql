SELECT
    `student`.`studentId`,
    `student`.`email`,
    `student`.`createdAt`,
    `student`.`updatedAt`,
    `teachers`.`teacherId` AS `teachers.teacherId`,
    `teachers`.`email` AS `teachers.email`,
    `teachers`.`createdAt` AS `teachers.createdAt`,
    `teachers`.`updatedAt` AS `teachers.updatedAt`,
    `teachers->class`.`classId` AS `teachers.class.classId`,
    `teachers->class`.`teacherId` AS `teachers.class.teacherId`,
    `teachers->class`.`studentId` AS `teachers.class.studentId`,
    `teachers->class`.`createdAt` AS `teachers.class.createdAt`,
    `teachers->class`.`updatedAt` AS `teachers.class.updatedAt`
FROM 
    `student` AS `student`
INNER JOIN 
    `class` AS `teachers->class` ON `student`.`studentId` = `teachers->class`.`studentId`
INNER JOIN
    `teacher` AS `teachers` ON `teachers`.`teacherId` = `teachers->class`.`teacherId` AND `teachers`.`email` IN ('teacher1@gmail.com');