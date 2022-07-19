USE spookydb;
DELIMITER //
CREATE PROCEDURE Usuario_SP
(
	IN pOpcion VARCHAR(30),
	IN pUser VARCHAR(30),
	IN pPass VARCHAR(55),
    IN pScore MEDIUMINT,
    OUT vAnswer BOOLEAN
)
BEGIN 
	DECLARE HIGHSCOREPLACES TINYINT DEFAULT 10;
    
	DECLARE userCount TINYINT(10) DEFAULT 0;
    DECLARE userKeepInfo TINYINT(10) DEFAULT 0;
    DECLARE getHighID TINYINT DEFAULT 0;
    DECLARE isActive BOOLEAN DEFAULT FALSE;
    DECLARE getHighscore MEDIUMINT DEFAULT 0;
    
    SET vAnswer=FALSE;
    
    IF pOpcion='SIGNUP-CHECKUSER' /*Checo si no hay ningún usuario con el mismo nombre*/
    THEN
		SELECT EXISTS(SELECT 1=1 FROM Usuario WHERE pUser = usuarioUser) INTO userCount;
        IF userCount <=0
        THEN
			SET vAnswer=TRUE;
        END IF;
    END IF;
    
    IF pOpcion='SIGNUP-ADDUSER'
    THEN
		INSERT INTO Usuario (
        usuarioUser,
        usuarioPass,
        usuarioHighscore
        )
        VALUES (
		pUser,
		pPass,
        0
        );
		SET vAnswer=TRUE;
    END IF;
    
    IF pOpcion='LOGIN-CHECKUSER'/*Checo usuario y contraseña*/
    THEN
		SELECT EXISTS(SELECT 1=1 FROM Usuario WHERE pUser = usuarioUser AND pPass = usuarioPass) INTO userCount;
        IF userCount > 0
        THEN
            SET vAnswer=TRUE;
        END IF;
    END IF;
    
	IF pOpcion='LOGIN-BRINGDATA' /*Me traigo los datos*/
    THEN
		SELECT EXISTS(SELECT 1=1 FROM Usuario WHERE pUser = usuarioUser AND pPass = usuarioPass) INTO userCount;
        IF userCount > 0
        THEN
			SELECT
			usuarioUser AS 'user',
            usuarioHighscore AS 'score'
            FROM Usuario
			WHERE pUser=usuarioUser;
            SET vAnswer=TRUE;
        END IF;
    END IF;
    
    IF pOpcion="SCORE-ISNEWSCORE"
    THEN
		SELECT usuarioHighscore INTO getHighscore FROM Usuario WHERE pUser= usuarioUser;
        IF pScore > getHighScore
        THEN
			UPDATE Usuario
			SET usuarioHighscore=pScore WHERE pUser=usuarioUser;
            SET vAnswer=TRUE;
        END IF;
    END IF;
                
	IF pOpcion="SCORE-ISGLOBALRECORD"
    THEN		
        SELECT COUNT(*) INTO userCount FROM TopUsuario;
        IF userCount > 0
        THEN

			SELECT EXISTS(
			SELECT 1=1 FROM TopUsuario AS TU INNER JOIN Usuario AS U 
			ON TU.usuarioID=U.usuarioID 
			WHERE pUser = U.usuarioUser
			) INTO userKeepInfo;
			IF userKeepInfo <= 0
			THEN
				IF userCount = HIGHSCOREPLACES
				THEN
					SELECT usuarioHighscore INTO getHighscore FROM Usuario WHERE pUser= usuarioUser;
					SELECT COUNT(*) INTO userKeepInfo FROM TopUsuario AS TU INNER JOIN Usuario AS U
					ON TU.usuarioID = U.usuarioID 
					WHERE U.usuarioHighscore < getHighscore;
                    
					if userKeepInfo > 0
					THEN
						SELECT TU.usuarioID INTO getHighID  FROM TopUsuario AS TU INNER JOIN Usuario AS U 
						ON TU.usuarioID = U.usuarioID
						WHERE
						U.usuarioHighScore = (
						SELECT MIN(usuarioHighscore) FROM TopUsuario AS TU INNER JOIN Usuario AS U 
						ON TU.usuarioID = U.usuarioID);
						DELETE FROM TopUsuario WHERE usuarioID = getHighID;
                        SELECT usuarioID INTO getHighID FROM Usuario WHERE pUser= usuarioUser;
						INSERT INTO TopUsuario (usuarioID) VALUES(getHighID);
						SET vAnswer=TRUE;
					END IF;
                ELSE
					SELECT usuarioID INTO getHighID FROM Usuario WHERE pUser= usuarioUser;
					INSERT INTO TopUsuario (usuarioID) VALUES(getHighID);
					SET vAnswer=TRUE;
				END IF;
			END IF;

        ELSE
			SELECT usuarioID INTO getHighID FROM Usuario WHERE pUser= usuarioUser;
			INSERT INTO TopUsuario (usuarioID) VALUES(getHighID);
			SET vAnswer=TRUE;
        END IF;
    END IF;
    
    IF pOpcion="SCORE-GETGLOBALRECORDS"
    THEN
		SELECT usuarioUser AS 'user', usuarioHighscore AS 'score' FROM Usuario AS U INNER JOIN TopUsuario AS TU
        ON U.usuarioID = TU.usuarioID
        ORDER BY usuarioHighscore DESC 
        LIMIT HIGHSCOREPLACES;
        SET vAnswer=TRUE;
    END IF;
END//
DELIMITER ;