Use cinedesweb2;
CREATE TABLE IF NOT EXISTS usuarios(id INT AUTO_INCREMENT PRIMARY KEY
, nome VARCHAR(20) NOT NULL
, login VARCHAR(10) NOT NULL
, senha VARCHAR(64) NOT NULL
, UNIQUE INDEX idx_usuarios__login(login)
)ENGINE=INNODB;

-- senha 123456 hash com sha256
INSERT INTO usuarios VALUES(1,'Rafael','rafael','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');
-- senha 123457 hash com sha256
INSERT INTO usuarios VALUES(2,'Renata','renata','54b688a517f7654563a6c64d945a3670880a4c602ec67a065bbebbcd2b22edd5');
-- senha 123458 hash com sha256
INSERT INTO usuarios VALUES(3,'Fulano','fulano','e6757959da8eff84c42d4df125b44eb40143dff452afd56aea5cfa058f245028');