$(document).ready(function(){

    var playerEl = document.getElementById("player");
    playerEl.addEventListener('collide', function (e) {
        
        console.log('Player has collided with body #' + e.detail.body.id);
        if(e.detail.body.id == 2){
            alert("Winner");
        }

      e.detail.target.el;  // Original entity (playerEl).
      e.detail.body.el;    // Other entity, which playerEl touched.
      e.detail.contact;    // Stats about the collision (CANNON.ContactEquation).
      e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).
    });
    var size = 30;
    var cells = [];
    var newCells = [];
    var wasHere = [];
    var alive = true;
    var runs = 100;
    var multiplier = 5;
    for (var a = 0; a < size; a++){
        cells[a]= [];
        wasHere[a]= [];
        for (var b = 0; b < size; b++){
          cells[a][b]= false;
           wasHere[a][b]= false;

        }
    }

    
    var startX1 = Math.floor(Math.random() * size);
    var startY1 = 0;
    var endX1 = Math.floor(Math.random() * size);
    var endY1 = size-1;
    
    while (endX1 == 0 || endX1 == size - 1 || endX1 == size){
      endX1 = Math.floor(Math.random() * size);
    } 
    
    
    for (var e = 0; e < size; e++){
      newCells[e]= [];
      for (var f = 0; f < size; f++){
        newCells[e][f]=false;
      }
    }  
    
    function createMaze(){
      startingAlive();
  

      for(var i = 0; i < runs; i++){
        makeMaze();
        cells[startY1][startX1] = true;
        cells[endY1][endX1] = true;
      }
      
      while(solutionExists(startY1, startX1) === false){
      
        for(var i = 0; i < runs; i++){
          makeMaze();
          cells[startY1][startX1] = true;
          cells[endY1][endX1] = true;
        }
      }  
      
      
      for(var g = 0; g < size; g++){
        for(var h = 0; h < size; h++){
          if(h == startY1 && g != startX1){
            cells[h][g] = false;
          }
          if(h == endY1 && g != endX1){
            cells[h][g] = false;
          }
          if(g == 0 || g == (size -1)){
            cells[h][g] = false;
          }
          
        }
      }  
      cells[startY1][startX1] = true;
      
      cells[endY1][endX1] = true; 
        
        

    

        for(var m = 0; m < size; m++){
            for(var n = 0; n < size; n++){
                
                if(cells[m][n] === false){
                    
                  
                  var startX= m * multiplier;
                  var startZ= n * multiplier;
                  var endX= (m + 1) * multiplier;
                  var endZ= (n + 1) * multiplier;
                  var depth = Math.abs(endZ - startZ);
                  if(depth == 0){
                      depth = multiplier;
                  }
                  var width = Math.abs(endX - startX) ;
                  
                  if(m == startY1){
                    width = .2;
                  }else if(width == 0){
                    width = multiplier;
                  }
                  var height = 2;
                  var centerX = (startX + endX)/2;
                  var centerZ = (startZ + endZ)/2;
                  var centerY = 1;
                  var radius = .2;
                  $("#maze1").append('<a-box src="#marble" static-body color="white" width="'+ width + '" height="'+ height  + '" depth="'+ depth  + '" position="'+ centerX +' '+ centerY +' '+ centerZ  +'" ></a-box>');
                }
                
                
                }
                
            }
            $("#maze1").append('<a-box src="#marble" static-body color="white" width="'+ 3 + '" height="'+ 2  + '" depth="'+ .2  + '" position="'+ (multiplier - 1.5) +' '+ 1 +' '+ 0.01  +'" ></a-box>');
            $("#maze1").append('<a-box src="#marble" static-body color="white" width="'+ 3 + '" height="'+ 2  + '" depth="'+ .2  + '" position="'+ (multiplier - 1.5) +' '+ 1 +' '+ (size * multiplier)  +'" ></a-box>');
            
        }    
    
    
    function makeMaze(){
    
      
        for(var x = 0; x < size; x++){
            for (var y = 0; y < size; y++) {
              
                var neighbors = findNeighbors(x, y);
                if(cells[x][y] == alive && (neighbors >= 1 && neighbors <= 4)){
                    newCells[x][y] = cells[x][y];
                }else if(cells[x][y] != alive && neighbors == 3){
                    makeCellAlive(x, y);  
                }
            }
               
        }
        cells = newCells;
        return cells;
    }
    
    function findNeighbors(x, y){
          var neighbors = 0;
            if(x === 0){
              if(y > 0 && cells[x][y-1] == alive){
                neighbors++;
              }
              if(y < (size - 1) && cells[x][y+1] == alive){
                neighbors++;
              }
              if(x < (size - 1) && y > 0 && cells[x+1][y-1] == alive){
                neighbors++;
              }
              if(x < (size - 1) && cells[x+1][y] == alive){
                neighbors++;
              }
              if(x < (size - 1) && y < (size - 1) && cells[x+1][y+1] == alive){
                neighbors++;
              }
            }
            if(x == size){
              if(x > 0 && y > 0 && cells[x-1][y-1] == alive){
                neighbors++;
              }
              if(x > 0 && cells[x-1][y] == alive){
                neighbors++;
              }
              if(x > 0 && y < (size - 1) && cells[x-1][y+1] == alive){
                neighbors++;
              }
              if(y > 0 && cells[x][y-1] == alive){
                neighbors++;
              }
              if(y > (size - 1) && cells[x][y+1] == alive){
                neighbors++;
              }
            }
            if(y === 0){
              if(x > 0 && cells[x-1][y] == alive){
                neighbors++;
              }
              if(x < (size - 1) && cells[x+1][y] == alive){
                neighbors++;
              }
              if(x > 0 && y < (size - 1) && cells[x-1][y+1] == alive){
                neighbors++;
              }
              if(y < (size - 1) && cells[x][y+1] == alive){
                neighbors++;
              }
              if(x < (size - 1) && y < (size - 1) && cells[x+1][y+1] == alive){
                neighbors++;
              }
            }
            if(y == size){
              if(x > 0 && y > 0 && cells[x-1][y-1] == alive){
                neighbors++;
              }
              if(y > 0 && cells[x][y-1] == alive){
                neighbors++;
              }
              if(x < (size - 1) && y > 0 && cells[x+1][y-1] == alive){
                neighbors++;
              }
              if(x > 0 && cells[x-1][y] == alive){
                neighbors++;
              }
              if(x < (size - 1) && cells[x+1][y] == alive){
                neighbors++;
              }
            }
            else if (x !== 0 && x!= size && y!== 0 && y!= size){
              if(x > 0 && y > 0 && cells[x-1][y-1] == alive){
                neighbors++;
              }
              if(y > 0 && cells[x][y-1] == alive){
                neighbors++;
              }
              if(y > 0 && x < (size - 1) && cells[x+1][y-1] == alive){
                neighbors++;
              }
              if(x > 0 && cells[x-1][y] == alive){
                neighbors++;
              }
              if(x < (size - 1) && cells[x+1][y] == alive){
                neighbors++;
              }
              if(x > 0 && y < (size - 1) && cells[x-1][y+1] == alive){
                neighbors++;
              }
              if(y < (size - 1) && cells[x][y+1] == alive){
                neighbors++;
              }
              if(x < (size - 1) && y < (size - 1) && cells[x+1][y+1] == alive){
                neighbors++;
              }
            }
        return neighbors;
    }

    function makeCellAlive(x, y){
        newCells[x][y] = alive;
    }
    
    function startingAlive(){
      
      for(var i = 0; i < size; i++){
        for(var j = 0; j < size; j++){
            
            cells[i][j] = Math.random() >= 0.8;
        }
      }
      cells[startY1][startX1] = true;
      cells[endY1][endX1] = true;
    }
    
    
    function solutionExists(x,y) {
      if (x == endX1 && y == endY1){
        return true;
      }  
      if (cells[x][y] == false || wasHere[x][y]){
        return false;
      }   
      
      wasHere[x][y] = true;
      
      if (x != 0){ 
          if (solutionExists(x-1, y) === true) { 
              return true;
          }
      }    
      if (x != size - 1){ 
          if (solutionExists(x+1, y) === true) { 
              return true;
          }
      }    
      if (y != 0){  
          if (solutionExists(x, y-1) === true) { 
              return true;
          }
      }    
      if (y != size - 1){ 
          if (solutionExists(x, y+1) === true) { 
              return true;
          }
      }    
      return false;
    }
    
    
     $("#goal").append('<a-sphere static-body color ="black" radius=".5" position="'+ ((endY1 * multiplier)) +' '+ .5 +' '+ ((endX1 * multiplier) + 2)  +'" ></a-sphere>');
    createMaze();
   
                 
    // position="'+ (endX1 * multiplier) +' '+ .5 +' '+ (endY1 * multiplier)  +'"
    
});    