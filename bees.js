honeycomb=function(x,y)
{
	this.x=Math.floor(x/lawn.rectWidth)*lawn.rectWidth;
	this.y=Math.floor(y/lawn.rectHeight)*lawn.rectHeight;
	this.start=Date.now();
	this.health=6;
	honey-=this.cost;
	this.honeyVal=50;
	this.lasthoneys=Date.now();
	this.image = new Image();
	this.image.src="images/honeycomb.png";
};
honeycomb.prototype=
{
	cost:25,
	draw:function()
	{
		context.drawImage(this.image,this.x,this.y,lawn.rectWidth,lawn.rectHeight);
	},
	checkGetinghoneys:function()
	{
		if(Date.now()-this.lasthoneys>=10000)
		{
			honeys.push(new honeyDrop(this.x,this.y,this.honeyVal));
			this.lasthoneys=Date.now();
		};
	}
};
honeybee=function(x,y)
{
	this.x=Math.floor(x/lawn.rectWidth)*lawn.rectWidth;
	this.y=Math.floor(y/lawn.rectHeight)*lawn.rectHeight;
	this.start=Date.now();
	this.health=10;
	this.attack=1;
	this.lastShot=Date.now();
	honey-=this.cost;
	this.image = new Image();
	this.image.src="images/honeybee.png";
};
honeybee.prototype=
{
	cost:50,
	draw:function()
	{
		context.drawImage(this.image,this.x,this.y,lawn.rectWidth,lawn.rectHeight);
	},
	checkShot:function()
	{
		if(Date.now()-this.lastShot>=5000){	
			for( var j in humans )
			{
				if(humans[j].y==this.y){	
					shots.push(new Shot(this.x+2*lawn.rectWidth/2,this.y+lawn.rectHeight/2-16,5,0,this.attack));
					this.lastShot=Date.now();
					break;
				}
			}
		}
	}
};
caveman=function(x,y)
{
	this.health=3;
	this.x=x;
	this.y=y;
	this.dx=-0.5;
	this.dy=0;
	this.lastAttack=false;
	this.attack=1;
	this.image = new Image();
	this.image.src="images/caveman.png";
};
caveman.prototype=
{
	draw:function()
	{
		context.drawImage(this.image,this.x,this.y,lawn.rectWidth,lawn.rectHeight);
	},
	move:function()
	{
		this.x+=this.dx;
		this.y+=this.dy;
	},
	checkBite:function()
	{
		if(lawn.lawn[Math.floor(this.y/lawn.rectHeight)][Math.floor(this.x/lawn.rectWidth)]!=0)
		{
			for(i in bees)
			{
				var curr=bees[i];
				if(curr.y==this.y){					
					if(Math.floor(curr.x/40)==Math.floor(this.x/40))
					{
						if(this.lastAttack==false)
						{
							this.lastAttack=Date.now()-1000;
						}
						if(Date.now()-this.lastAttack>=1000)
						{
							curr.health-=this.attack;
							this.lastAttack=Date.now();
							this.dx=0;
							if(curr.health<=0)
							{
								bees.splice(i,1);
								this.lastAttack=false;
								this.dx=-0.5;
							}
						}
					}
				}
			}
		}
	}
};
roman=function(x,y)
{
	this.health=4;
	this.x=x;
	this.y=y;
	this.dx=-0.5;
	this.dy=0;
	this.lastAttack=false;
	this.attack=2;
	this.image = new Image();
	this.image.src="images/roman.png";
};
roman.prototype=
{
	draw:function()
	{
		context.drawImage(this.image,this.x,this.y,lawn.rectWidth,lawn.rectHeight);
	},
	move:function()
	{
		this.x+=this.dx;
		this.y+=this.dy;
	},
	checkBite:function()
	{
		if(lawn.lawn[Math.floor(this.y/lawn.rectHeight)][Math.floor(this.x/lawn.rectWidth)]!=0)
		{
			for(i in bees)
			{
				var curr=bees[i];
				if(curr.y==this.y){					
					if(Math.floor(curr.x/40)==Math.floor(this.x/40))
					{
						if(this.lastAttack==false)
						{
							this.lastAttack=Date.now()-1000;
						}
						if(Date.now()-this.lastAttack>=1000)
						{
							curr.health-=this.attack;
							this.lastAttack=Date.now();
							this.dx=0;
							if(curr.health<=0)
							{
								bees.splice(i,1);
								this.lastAttack=false;
								this.dx=-0.5;
							}
						}
					}
				}
			}
		}
	}
};
Shot=function(x,y,dx,dy,attack)
{
	this.image=new Image();
	this.image.src="images/stinger.png"
	this.x=x;
	this.y=y;
	this.dx=dx;
	this.dy=dy;
	this.attack=attack;	

};
Shot.prototype=
{
	draw:function()
	{
		context.drawImage(this.image,this.x,this.y,lawn.rectWidth,lawn.rectHeight);
	},
	move:function()
	{
		this.x+=this.dx;
		this.y+=this.dy;
	},
	checkColision:function()
	{
		for(j in humans)
		{
			var curr=humans[j];
			if((this.y-lawn.rectHeight/2+16)==curr.y)
			{
				if((this.x+this.radius-16)>=curr.x)
				{
					console.log("AHHH!!");
					curr.health-=this.attack;
					this.attack=0;
					if(curr.health<=0)
					{
						humans.splice(j,1);
					}
					return true;
				}
			}
		}
		return false;
	}
};
honeyDrop=function(x,y,honeyValue)
{
	this.honeyVal=honeyValue;
	this.radius=20;
	this.x=(x+lawn.rectWidth/2);
	this.y=(y+this.radius);
	this.dx=Math.random()*1-0.5;
	this.dy=Math.random()*1-0.5;
	this.startTime=Date.now();
	this.image = new Image();
	this.image.src="images/honey.png";
	this.rotation=0;
};
honeyDrop.prototype=
{
	draw:function()
	{
	 	//context.save();
		//context.rotate(this.rotation);
		//context.translate((this.x+this.radius), (this.y+this.radius));
		context.drawImage(this.image,this.x,this.y,this.radius*2,this.radius*2);
		//context.restore();
		
	},
	move:function()
	{
		var xSos=this.x;
		var ySos=this.y;
		this.x+=this.dx;
		this.rotation+=1/Math.PI;
		this.y+=this.dy;
		if(this.x-this.radius<0)
		{
			this.dx*=-1;
			this.x=this.radius;
		}
		if((this.x+this.radius>canvas.width))
		{
			this.dx*=-1;
			this.x=canvas.width-this.radius;
		}
		if(this.y-this.radius<0)
		{
			this.dy*=-1;
			this.y=this.radius;
		}
		if(this.y+this.radius>canvas.height)
		{
			this.dy*=-1;
			this.y=canvas.height-this.radius;
		}
		this.dy-=this.dy*Math.random()/100;
		this.dx-=this.dx*Math.random()/100;
	},
	checkTime:function()
	{
		if(Date.now()-this.startTime>=8000)
		{
			return true;
		}
		return false;
	}
};
swarm=function(x,y)
{
	this.x=Math.floor(x/lawn.rectWidth)*lawn.rectWidth;
	this.y=Math.floor(y/lawn.rectHeight)*lawn.rectHeight;
	this.start=Date.now();
	this.health=10;
	this.attack=1;
	this.lastShot=Date.now();
	this.rapidFire=3;
	honey-=this.cost;
	this.image = new Image();
	this.image.src="images/swarm.png";
};
swarm.prototype=
{
	cost:100,
	draw:function()
	{
		context.drawImage(this.image,this.x,this.y,lawn.rectWidth,lawn.rectHeight);
	},
	checkShot:function()
	{
		for(var i in humans)
		{
			var curr = humans[i];
			if(curr.y==this.y)
			{
				if(!this.rapidFire && Date.now()-this.lastShot>7000)
				{
					shots.push(new Shot2(this.x,this.y,curr,this.attack));
					this.lastShot=Date.now();
					this.rapidFire = 0;
					break;
				}
				else if(this.rapidFire<3)
				{
					rapidFire+=1;
					shots.push(new Shot2(this.x,this.y,curr,this.attack));
					break;
				}
			}
		}
	}
};
Shot2=function(x,y,t,attack)
{
	this.x=x;
	this.y=y;
	this.target=t;
	this.attack=attack;
	this.tx=t.x+t.dx*this.steps;
	this.image="images/stinger.png";
	this.ty=t.y;
	this.life=this.steps;
	this.dy=-this.steps/2+1;//dy;
	this.dx=(t.x-x-20)/this.steps;
	
};
Shot2.prototype=
{
	steps:40,
	draw:function()
	{
		context.drawImage(this.image,this.x,this.y,lawn.rectWidth,lawn.rectHeight);
	},
	move:function()
	{
		this.x+=this.dx;
		this.y+=this.dy;
		this.dy++;
		this.life--;
		console.log(this.life);
	},
};
bumblebee=function(x,y)
{
	this.x=Math.floor(x/lawn.rectWidth)*lawn.rectWidth;
	this.y=Math.floor(y/lawn.rectHeight)*lawn.rectHeight;
	this.start=Date.now();
	this.health=50;
	this.attack=0;
	this.lastShot=Date.now();
	honey-=this.cost;
	this.image = new Image();
	this.image.src="images/bumblebee.png";
};
bumblebee.prototype=
{
	cost:50,
	draw:function()
	{
		context.drawImage(this.image,this.x,this.y,lawn.rectWidth,lawn.rectHeight);
	},
	checkShot:function()
	{
		// if(Date.now()-this.lastShot>=5000){	
		// 	for( var j in humans )
		// 	{
		// 		if(humans[j].y==this.y){	
		// 			shots.push(new Shot(this.x+2*lawn.rectWidth/2,this.y+lawn.rectHeight/2-16,5,0,this.attack));
		// 			this.lastShot=Date.now();
		// 			break;
		// 		}
		// 	}
		// }
	}
};