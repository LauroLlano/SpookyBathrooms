class User{

	constructor(name, score)
	{
		this.name=name;
		this.highscore=score;
	}

	isNewScore(newScore)
	{
		if(newScore>this.highscore)
			return true;
		else
			return false;
	}

	getScore()
	{
		return this.highscore;
	}

	setScore(newScore){
		this.highscore=newScore;
	}

	getUser()
	{
		return this.name;
	}
}