        // red dot
        var canvas = document.querySelector('canvas')
        var context = canvas.getContext('2d')
        var count = 0;
        var grid = 16;
        var score = 0;
        var span = document.querySelector('span')

        var apple = {
            x: 0,
            y: 0
        }

        // snake
        var snake = {
            x: 160,
            y: 160,
            // speed, how many pixels in time
            // dx, dy tells where to move 
            dx: 16,
            dy: 0,
            cells: [],
            maxCells: 4
        }

        // context.fillStyle = 'red'
        // context.fillReact(0, 0, 15, 15) x, y, width, height

        function getRandomInt(min, max){
            return Math.floor(Math.random() * (max - min)) + min;
        }

        function generateCell(x, y, color){
            context.fillStyle = color
            context.fillRect(x, y, 15, 15)
        }

        function lose(){
            snake.x = 160
            snake.y = 160
            snake.cells = []
            // change max
            snake.maxCells = 4
            snake.dx = grid
            snake.dy = 0

            apple.x = getRandomInt(0, 25)*grid
            apple.y = getRandomInt(0, 25)*grid
            score = 0
            span.innerHTML = score;
        }

        function loop(){
            requestAnimationFrame(loop)
            if(++count < 10){
                return;
            }
            // after setting count = 0, 
            count = 0
            context.clearRect(0, 0, 400, 400)
            snake.x += snake.dx
            snake.y += snake.dy

            if(snake.x > 400){
                snake.x = 0
            }

            else if (snake.x < 0){
                snake.x = 400
            }
            
            else if (snake.y > 400){
                snake.y = 0
            }

            else if (snake.y < 0){
                snake.y = 400
            }

            document.addEventListener('keydown', function(e){
                
                // left arrow key
                if (e.which === 37 && snake.dx === 0){
                    snake.dx = -grid;
                    snake.dy = 0;
                }
                // up arrow key
                else if (e.which === 38 && snake.dy === 0){
                    snake.dy = -grid;
                    snake.dx = 0;
                }
                // right arrow key
                else if (e.which === 39 && snake.dx === 0){
                    snake.dx = grid;
                    snake.dy = 0;
                }
                // down arrow key 
                else if (e.which === 40 && snake.dy === 0){
                    snake.dy = grid;
                    snake.dx = 0;
                }
            })

            // add new element to massive 
            snake.cells.unshift(
                {x: snake.x, y: snake.y}
            )

            if(snake.cells.length > snake.maxCells){
                snake.cells.pop()
            }
            generateCell(apple.x, apple.y, 'red')
            snake.cells.forEach((cell, index)  => {
                generateCell(cell.x, cell.y, 'green')
                if(cell.x == apple.x && cell.y == apple.y){
                    // alert()
                    snake.maxCells++;
                    score++
                    apple.x = getRandomInt(0, 25)*16
                    apple.y = getRandomInt(0, 25)*16
                    // change text inside html/css
                    span.innerHTML = score;
                }
                for(var i = index + 1; i < snake.cells.length; i++){
                    if (cell.x == snake.cells[i].x && cell.y == snake.cells[i].y){
                        lose()
                    }
                }
            })

            // context.clearRect(0, 0, 400, 400)
            // var x = getRandomInt(0, 25)*16   // 0 16 32 48 64 128 
            // var y = getRandomInt(0, 25)*16
            // generateApple(x, y)
        }

        requestAnimationFrame(loop)

