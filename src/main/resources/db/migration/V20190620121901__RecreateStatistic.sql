DROP TABLE statistic;

CREATE TABLE statistic (
    id INT(11) NOT NULL AUTO_INCREMENT,
    uid VARCHAR(64),
    times_used INT(11),
    PRIMARY KEY(id)
);