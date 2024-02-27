let animationPaused = true;
let balls = [];
let court;
let ballNumSelect;
let speedRadios;
let messageSpan;
let animationSpeed = 1; 
const courtLeft = 10;
const courtTop = 110;
const courtWidth = 1000;
const courtHeight = 600;

function initialize() {
  court = document.getElementById('court');
  ballNumSelect = document.getElementById('ballNums');
  speedRadios = document.getElementsByName('speed');
  messageSpan = document.getElementById('message');
  setNumberOfBalls();
  court.addEventListener('click', toggleAnimation);
  ballNumSelect.addEventListener('change', setNumberOfBalls);
  speedRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      setSpeed(radio.value);
      setNumberOfBalls();
    });
  });
  animate();
}

function setNumberOfBalls() {
    if (balls.length > 0) {
      balls.forEach(ball => court.removeChild(ball));
      balls = [];
    }
    const numBalls = parseInt(ballNumSelect.value, 10);
    for (let i = 0; i < numBalls; i++) {
      if (i === 0) {
        createBall(animationSpeed);
      } else {
        createBall(balls[0].speed);
      }
    }
  }

function createBall(speedValue) {
    const ball = document.createElement('div');
    ball.classList.add('ball');
    ball.style.left = getRandomPosition(courtWidth - 40) + courtLeft + 'px';
    ball.style.top = getRandomPosition(courtHeight - 40) + courtTop + 'px';
    ball.speed = speedValue;
    ball.vx = (Math.random() - 0.5) * ball.speed;
    ball.vy = (Math.random() - 0.5) * ball.speed;
    court.appendChild(ball);
    balls.push(ball);
  }

function getRandomPosition(max) {
  return Math.floor(Math.random() * max);
}

function toggleAnimation() {
  animationPaused = !animationPaused;
  if (animationPaused) {
    messageSpan.textContent = 'Animation Suspended';
  } else {
    messageSpan.textContent = 'Animation Resumed';
    setNumberOfBalls();
  }
}

function setSpeed(speedValue) {
    switch (speedValue) {
      case 'slow': 
        animationSpeed = 1;
        break;
      case 'medium': 
        animationSpeed = 2; 
        break;
      case 'fast': 
        animationSpeed = 3; 
        break;
      default:
        animationSpeed = 1; 
    }
  }


  function update() {
    if (!animationPaused) {
      const dt = 20;
      balls.forEach((ball1, index1) => {
        const newX1 = ball1.offsetLeft + ball1.vx * dt;
        const newY1 = ball1.offsetTop + ball1.vy * dt;
  
        
        if (newX1 <= courtLeft || newX1 + ball1.clientWidth >= courtLeft + courtWidth) {
          ball1.vx = -ball1.vx; 
        }
  
        
        if (newY1 <= courtTop || newY1 + ball1.clientHeight >= courtTop + courtHeight) {
          ball1.vy = -ball1.vy; 
        }
  
       
        const adjustedX1 = Math.min(Math.max(newX1, courtLeft), courtLeft + courtWidth - ball1.clientWidth);
        const adjustedY1 = Math.min(Math.max(newY1, courtTop), courtTop + courtHeight - ball1.clientHeight);
  
        balls.forEach((ball2, index2) => {
          if (index1 !== index2) {
            const dx = adjustedX1 - ball2.offsetLeft;
            const dy = adjustedY1 - ball2.offsetTop;
            const distance = Math.sqrt(dx * dx + dy * dy);
  
           
            if (distance < 42) {
              
              const angle = Math.atan2(dy, dx);
              const speed1 = Math.sqrt(ball1.vx * ball1.vx + ball1.vy * ball1.vy);
              const speed2 = Math.sqrt(ball2.vx * ball2.vx + ball2.vy * ball2.vy);
  
              const direction1 = Math.atan2(ball1.vy, ball1.vx);
              const direction2 = Math.atan2(ball2.vy, ball2.vx);
  
              ball1.vx = speed1 * Math.cos(direction1 - angle);
              ball1.vy = speed1 * Math.sin(direction1 - angle);
              ball2.vx = speed2 * Math.cos(direction2 - angle);
              ball2.vy = speed2 * Math.sin(direction2 - angle);
            }
          }
        });
  
        ball1.style.left = adjustedX1 + 'px';
        ball1.style.top = adjustedY1 + 'px';
      });
    }
  }
  
  
  
  
  
  

function animate() {
  if (!animationPaused) {
    update();
  }
  requestAnimationFrame(animate);
}

initialize();
