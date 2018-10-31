
DROP TABLE IF EXISTS `todo`;
CREATE TABLE IF NOT EXISTS `todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `position` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6;

INSERT INTO `todo` (`id`, `position`, `name`) VALUES
(1, 0, 'Breakfast'),
(2, 0, 'Work'),
(3, 0, 'Shower'),
(4, 0, 'Relax'),
(5, 0, 'Wake Up');