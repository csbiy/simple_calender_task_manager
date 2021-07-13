drop table if exists user;
-- 회원정보테이블 
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(200) NOT NULL,
  `name` varchar(10) NOT NULL,
  `password` varchar(500) NOT NULL,
   `year` smallint NOT NULL,
  `month` tinyint NOT NULL,
  `day` tinyint NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `gender` char(1) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `user_chk_1` CHECK ((`gender` in (_utf8mb4'M',_utf8mb4'F')))
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
drop table if exists schedule;
-- 일정테이블 
create table `schedule`(
    `id` int not null auto_increment,
   `year` smallint NOT NULL,
  `month` tinyint NOT NULL,
  `day` tinyint NOT NULL,
  `from` tinyint not null,
  `to` tinyint not null,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `user_id` int NOT null,
	foreign key(`user_id`) references `user`(`user_id`) on delete cascade,
    primary key(`id`)
  )
  