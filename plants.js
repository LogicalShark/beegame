slnecnica=function(x,y)
{
	this.x=Math.floor(x/lawn.rectWidth)*lawn.rectWidth;
	this.y=Math.floor(y/lawn.rectHeight)*lawn.rectHeight;
	this.start=Date.now();
	this.healt=6;
	slnk-=this.cost;
	this.honeys=50;
	this.lasthoney=Date.now();
	this.image = new Image();
	this.image.src="images/honeyflowerHD.png";
};
slnecnica.prototype=
{
	cost:25,
	draw:function()
	{
		context.drawImage(this.image,this.x,this.y,lawn.rectWidth,lawn.rectHeight);
	},
	checkGetinghoney:function()
	{
		if(Date.now()-this.lasthoney>=10000)
		{
			honeys.push(new honey(this.x,this.y,this.honeys));
			this.lasthoney=Date.now();
		};
	}
};
larva=function(x,y)
{
	this.x=Math.floor(x/lawn.rectWidth)*lawn.rectWidth;
	this.y=Math.floor(y/lawn.rectHeight)*lawn.rectHeight;
	this.start=Date.now();
	this.healt=10;
	this.attack=1;
	this.lastShot=Date.now();
	slnk-=this.cost;
	this.image = new Image();
	this.image.src="images/PeashooterHD.png";
};
larva.prototype=
{
	cost:50,
	draw:function()
	{
		context.drawImage(this.image,this.x,this.y,lawn.rectWidth,lawn.rectHeight);
	},
	checkShot:function()
	{
		if(Date.now()-this.lastShot>=5000){	
			for( var j in zombies )
			{
				if(zombies[j].y==this.y){	
					shots.push(new Shot(this.x+2*lawn.rectWidth/2,this.y+lawn.rectHeight/2-16,5,0,this.attack));
					this.lastShot=Date.now();
					break;
				}
			}
		}
	}
};
walker=function(x,y)
{
	this.healt=3;
	this.x=x;
	this.y=y;
	this.dx=-0.5;
	this.dy=0;
	this.lastAttack=false;
	this.attack=1;
	this.image = new Image();
	this.image.src="images/ZombieHD.png";
};
walker.prototype=
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
			for(i in plants)
			{
				var curr=plants[i];
				if(curr.y==this.y){					
					if(Math.floor(curr.x/40)==Math.floor(this.x/40))
					{
						if(this.lastAttack==false)
						{
							this.lastAttack=Date.now()-1000;
						}
						if(Date.now()-this.lastAttack>=1000)
						{
							curr.healt-=this.attack;
							this.lastAttack=Date.now();
							this.dx=0;
							if(curr.healt<=0)
							{
								plants.splice(i,1);
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
	this.radius=5;
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
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		context.fillStyle = 'yellow';
		context.fill();
	},
	move:function()
	{
		this.x+=this.dx;
		this.y+=this.dy;
	},
	checkColision:function()
	{
		for(j in zombies)
		{
			var curr=zombies[j];
			if((this.y-lawn.rectHeight/2+16)==curr.y)
			{
				if((this.x+this.radius-16)>=curr.x)
				{
					console.log("náraz!!");
					curr.healt-=this.attack;
					this.attack=0;
					if(curr.healt<=0)
					{
						zombies.splice(j,1);
					}
					return true;
				}
			}
		}
		return false;
	}
};
honey=function(x,y,honeyS)
{
	this.honeys=honeyS;
	this.radius=20;
	this.x=(x+lawn.rectWidth/2);
	this.y=(y+this.radius);
	this.dx=Math.random()*1-0.5;
	this.dy=Math.random()*1-0.5;
	this.startTime=Date.now();
	this.image = new Image();
	this.image.src="images/honeyHD.png";
	this.rotation=0;
};
honey.prototype=
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
	checkLife:function()
	{
		if(Date.now()-this.startTime>=8000)
		{
			return true;
		}
		return false;
	}
};
honeybee=function(x,y)
{
	this.x=Math.floor(x/lawn.rectWidth)*lawn.rectWidth;
	this.y=Math.floor(y/lawn.rectHeight)*lawn.rectHeight;
	this.start=Date.now();
	this.healt=10;
	this.attack=1;
	this.lastShot=Date.now();
	slnk-=this.cost;
	this.image = new Image();
	this.image.src="images/KernelPultHD.png";
};
honeybee.prototype=
{
	cost:100,
	draw:function()
	{
		context.drawImage(this.image,this.x,this.y,lawn.rectWidth,lawn.rectHeight);
	},
	checkShot:function()
	{
		for( var i in zombies)
		{
			var curr = zombies[i];
			if(curr.y==this.y)
			{
				if(Date.now()-this.lastShot>7000)
				{
					shots.push(new Shot2(this.x,this.y,curr,this.attack));
					this.lastShot=Date.now();
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
	this.radius=5;
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
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		context.fillStyle = 'black';
		context.fill();
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
