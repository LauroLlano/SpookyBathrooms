class Game
{
	constructor(player1, player2)
	{
		this.clock=60.0;
		this.difficulty=0;
		this.highScore1=0;
		this.player1=0;
		this.player2=0;
		this.hasShieldUp=false;
		this.isShieldGettingUp=false;
		this.isShieldGettingDown=false;
		this.timeShield=0;
		this.playerLife=3;

		this.player1Placed=false;
		this.player2Placed=false;
	
		if(player1){
			this.player1=0;
			this.player1Placed=true;
		}
		
		if(player2)
		{
			this.player2=0;
			this.player2Placed=true;
			this.difficulty=4;

		}			
	}

	setDifficulty(difficulty){
		if(this.difficulty==0)
			this.difficulty=difficulty;
	}

	getDifficulty(){
		return this.difficulty
	}

	reduceTime(timeFrame){
		this.clock-=timeFrame;
	}

	getTime(){
		return this.clock;
	}

	getPlayerPosition(playerControl){
		if(playerControl==1)
			return this.player1;
		if(playerControl==2)
			return this.player2;
	}

	changingPlace(playerControl){
		if(playerControl==1)
			this.player1Placed=false;
		if(playerControl==2)
			this.player2Placed=false;	
	}

	setPlaced(playerControl){
		if(playerControl==1)
			this.player1Placed=true;
		if(playerControl==2)
			this.player2Placed=true;
	}

	isPlayerStill(playerControl){
		if(playerControl==1)
			return this.player1Placed;
		if(playerControl==2)
			return this.player2Placed;
	}

	moveLeft(playerControl){
		if(playerControl==1){
			if(this.player1!=0&&this.player1!=4&&this.player1!=8&&this.player1!=12)
				this.player1-=1;
			else
				this.player1+=3;
		}
		if(playerControl==2){
			if(this.player2!=0&&this.player2!=4&&this.player2!=8&&this.player2!=12)
				this.player2-=1;
			else
				this.player2+=3;
		}
	}

	moveRight(playerControl){
		if(playerControl==1){
			if(this.player1!=3&&this.player1!=7&&this.player1!=11&&this.player1!=15)
				this.player1+=1;
			else
				this.player1-=3;
		}
		if(playerControl==2){
			if(this.player2!=3&&this.player2!=7&&this.player2!=11&&this.player2!=15)
				this.player2+=1;
			else
				this.player2-=3;
		}
	}

	moveUp(playerControl){
		if(playerControl==1){
			if(this.player1!=0&&this.player1!=1&&this.player1!=2&&this.player1!=3)
				this.player1-=4;
			else
				this.player1+=12;
		}
		if(playerControl==2){
			if(this.player2!=0&&this.player2!=1&&this.player2!=2&&this.player2!=3)
				this.player2-=4;
			else
				this.player2+=12;
		}
	}

	moveDown(playerControl){
		if(playerControl==1){
			if(this.player1!=12&&this.player1!=13&&this.player1!=14&&this.player1!=15)
				this.player1+=4;
			else
				this.player1-=12;
		}
		if(playerControl==2){
			if(this.player2!=12&&this.player2!=13&&this.player2!=14&&this.player2!=15)
				this.player2+=4;
			else
				this.player2-=12;
		}
	}

	playerClosedDoor(){
		if(this.difficulty==1)
			this.highScore1+=10;
		if(this.difficulty==2)
			this.highScore1+=15;
		if(this.difficulty==3)
			this.highScore1+=25;
		if(this.difficulty==4)
			this.highScore1+=30;
	}

	checkScore(){
		return this.highScore1;
	}

	getHit()
	{
		if(this.difficulty==1){

			this.highScore1-=5;
			if(this.highScore1<0)
				this.highScore1=0;
		}
		if(this.difficulty==2){
			this.playerLife-=1;

			this.highScore1-=10;
			if(this.highScore1<0)
				this.highScore1=0;
		}
		if(this.difficulty==3){
			this.playerLife-=1;

			this.highScore1-=15;
			if(this.highScore1<0)
				this.highScore1=0;
		}
		if(this.difficulty==4){
			this.playerLife-=1;

			this.highScore1-=20;
			if(this.highScore1<0)
				this.highScore1=0;
		}
	}

	getShieldInfo()
	{
		return {
			gettingUp: this.isShieldGettingUp, 
			isUp: this.hasShieldUp, 
			gettingDown: this.isShieldGettingDown}
	}

	gettingShieldUp()
	{
		this.isShieldGettingUp=true;
	}

	putShieldUp(){
		this.isShieldGettingUp=false;
		this.hasShieldUp=true;
		this.timeShield=2;
	}

	putShieldDown()
	{
		this.isShieldGettingUp=false;
		this.hasShieldUp=false;
		this.isShieldGettingDown=false;
	}

	gettingShieldDown()
	{
		this.hasShieldUp=false;
		this.isShieldGettingDown=true;
	}

	subtractTimeShield(timeFrame)
	{
		if(this.timeShield>0){
			this.timeShield-=timeFrame;
		}
		else
		{
			this.gettingShieldDown();
		}
	}


	checkHealth()
	{
		return this.playerLife;
	}

}