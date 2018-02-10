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
							var audio = new Audio('sounds/chewing.mp3');
							audio.play();
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
	},
	toggle:function()
	{
		if(Date.now()%20==0)
		{
			if(this.image.src=="images/caveman.png")
			{				
				this.image = new Image();
				this.image.src="images/caveman2.png";
			}
			else
			{				
				this.image = new Image();
				this.image.src="images/caveman2.png";
			}
			this.draw()
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
							var audio = new Audio('sounds/fight.mp3');
							audio.play();
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
	},
	toggle:function()
	{
		if(Date.now()%20==0)
		{
			if(this.image.src=="images/roman.png")
			{				
				this.image = new Image();
				this.image.src="images/roman2.png";
			}
			else
			{				
				this.image = new Image();
				this.image.src="images/roman.png";
			}
			this.draw()
		}
	}
};
modernhuman=function(x,y)
{
	this.health=10;
	this.x=x;
	this.y=y;
	this.dx=-0.5;
	this.dy=0;
	this.lastAttack=false;
	this.attack=5;
	this.image = new Image();
	this.image.src="images/modernhuman.png";
};
modernhuman.prototype=
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
				if(curr.hascollision)
				{
					if(curr.y==this.y)
					{				
						if(Math.floor(curr.x/40)==Math.floor(this.x/40))
						{
							if(this.lastAttack==false)
							{
								this.lastAttack=Date.now()-1000;
							}
							if(Date.now()-this.lastAttack>=1000)
							{
								var audio = new Audio('sounds/fight.mp3');
								audio.play();
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
	},
	toggle:function()
	{
		if(Date.now()%20==0)
		{
			if(this.image.src=="images/modernhuman.png")
			{				
				this.image = new Image();
				this.image.src="images/modernhuman2.png";
			}
			else
			{				
				this.image = new Image();
				this.image.src="images/modernhuman.png";
			}
			this.draw()
		}
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
	this.startLife=Date.now();
	this.image = new Image();
	this.image.src="images/honey.png";
	this.rotation=0;
};
honeyDrop.prototype=
{
	draw:function()
	{
		context.drawImage(this.image,this.x,this.y,this.radius*2,this.radius*2);
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
	checkLife:function()
	{
		if(Date.now()-this.startLife>=8000)
		{
			return true;
		}
		return false;
	}
};
Shot=function(x,y,dx,dy,attack)
{
	this.radius=5;
	this.image=new Image();
	this.image.src="images/stinger.png";
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
	checkCollision:function()
	{
		for(j in humans)
		{
			var curr=humans[j];
			if((this.y-lawn.rectHeight/2+16)==curr.y)
			{
				if((this.x+this.radius-16)>=curr.x)
				{
					var audio = new Audio('sounds/ouch1.wav');
					audio.play();
					curr.health-=this.attack;
					this.attack=0;
					if(curr.health<=0)
					{
						var audio = new Audio('sounds/oof.mp3');
						audio.play();
						humans.splice(j,1);
					}
					return true;
				}
			}
		}
		return false;
	}
};
Shot2=function(x,y,t,attack)
{
	this.x=x;
	this.y=y;
	this.target=t;
	this.attack=attack;
	this.tx=t.x+t.dx*this.steps;
	this.radius=5;
	this.image=new Image();
	this.image.src="images/stinger.png";
	this.ty=t.y;
	this.life=this.steps;
	this.dy=-this.steps/2+1;
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
	},
	checkCollision:function()
	{
		for(j in humans)
		{
			var curr=humans[j];
			if((this.y-lawn.rectHeight/2+16)==curr.y)
			{
				if((this.x+this.radius-16)>=curr.x)
				{
					var audio = new Audio('sounds/ouch1.wav');
					audio.play();
					curr.health-=this.attack;
					this.attack=0;
					if(curr.health<=0)
					{
						var audio = new Audio('sounds/oof.mp3');
						audio.play();
						humans.splice(j,1);
					}
					return true;
				}
			}
		}
		return false;
	}
};
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
	checkGettingHoneys:function()
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
	this.hascollision=true;
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
			for(var j in humans)
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
miningbee=function(x,y)
{
	this.x=Math.floor(x/lawn.rectWidth)*lawn.rectWidth;
	this.y=Math.floor(y/lawn.rectHeight)*lawn.rectHeight;
	this.start=Date.now();
	this.health=10;
	this.attack=1;
	this.lastShot=Date.now();
	this.hascollision=false;
	honey-=this.cost;
	this.image = new Image();
	this.image.src="images/miningbee.png";
};
miningbee.prototype=
{
	cost:25,
	draw:function()
	{
		context.drawImage(this.image,this.x,this.y,lawn.rectWidth,lawn.rectHeight);
	},
	checkShot:function()
	{
		if(Date.now()-this.lastShot>=5000){	
			for(var j in humans)
			{
				if(humans[j].y==this.y && Math.abs(humans[j].x-this.x)<=2*lawn.rectWidth)
				{	
					shots.push(new Shot2(this.x+2*lawn.rectWidth/2,this.y+lawn.rectHeight/2-16,5,0,this.attack));
					this.lastShot=Date.now();
					break;
				}
			}
		}
	}
};
swarm=function(x,y)
{
	this.x=Math.floor(x/lawn.rectWidth)*lawn.rectWidth;
	this.y=Math.floor(y/lawn.rectHeight)*lawn.rectHeight;
	this.start=Date.now();
	this.health=20;
	this.attack=1;
	this.lastShot=Date.now();
	honey-=this.cost;
	this.image = new Image();
	this.image.src="images/swarm.png";
	this.hascollision=true;
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
			if((curr.y==this.y) || (curr.y==this.y+lawn.rectHeight) || (curr.y==this.y-lawn.rectHeight))
			{
				if(Date.now()-this.lastShot>5000)
				{
					shots.push(new Shot(this.x+2*lawn.rectWidth/2,this.y+lawn.rectHeight/2-16,5,0,this.attack));
					shots.push(new Shot(this.x+2*lawn.rectWidth/2,this.y+lawn.rectHeight/2-16+lawn.rectHeight,5,0,this.attack));
					shots.push(new Shot(this.x+2*lawn.rectWidth/2,this.y+lawn.rectHeight/2-16-lawn.rectHeight,5,0,this.attack));
					this.lastShot=Date.now();
					break;
				}
			}
		}
	}
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
	this.hascollision=true;
};
bumblebee.prototype=
{
	cost:50,
	draw:function()
	{
		context.drawImage(this.image,this.x,this.y,lawn.rectWidth,lawn.rectHeight);
	},
};
