//Current wind
// Hai di lao
// Hua shang
// Qiang gang 
// 7 dui zi zimo → tai
// 7 dui zi feed → tai 

// Compute tai
// Compute by combinations (fixed set)
// Ping hu
// Cou ping hu
// Pong pong hu
// 13 yao
// 7 dui zi
// Qing yi se
// Ban se
// Da si xi
// Xiao si xi
// Siao san yuan
// Da san yuan 
// 1 9
// ½ 1 9 -> 4 tai
// SIAO SAN GONG/ZA HU(FAIL)
// Show breakdown -> which tiles give which tai
// const alltiles = ["t1","t2","t3","t4","t5","t6","t7","t8","t9","w1","w2","w3","w4","w5","w6","w7","w8","w9","b1","b2","b3","b4","b5","b6","b7","b8","b9","f1","f2","f3","f4","f5","f6","f7","f8","dong","nan","xi","bei","zhong","fa","bb","a1","a2","a3","a4"];
let currenttiles = ["dong","xi","xi","xi","dong","dong","a1","a4","fa","fa","fa","nan","f4","f2","f3","f1"];
let currentwind = 1;
let ownwind = 3;
let haidilao = true;
let huashang = true;
let zimo = true;
let qg = true;
let sevenzimo = 5;
let sevenshoot = 2;

function countOccurence(tile,currenttiles){
  let count = 0;
  let pinghustate = true;

  for(let i =0; i<currenttiles.length; i++){
    let currenttile = currenttiles[i];
    if(currenttile == tile){
      count +=1;
    }
  }

  return count;
}

export function calculateTai(currenttiles, currentwind, haidilao, huashang, qg, sevenzimo, sevenshoot, pinghustate) {
  let tai = 0;
  //check animals
  for(let i =0; i<currenttiles.length; i++){
    let currenttile = currenttiles[i];
    if(currenttile.charAt(0) == 'a'){
      tai += 1;
      pinghustate = false;
    }
  }
  //check flowers 
  let tempflower = [];
  let temp = ownwind + 4;
  for(let i =0; i<currenttiles.length; i++){
    let currenttile = currenttiles[i];
    if(currenttile.charAt(0) == 'f' && currenttile != 'fa'){
      tempflower.push(currenttile);
      pinghustate = false;
      if(currenttile.charAt(1) == ownwind || currenttile.charAt(1) == temp){
        tai+= 1;
      }
    }
  }
  let flower1 = ["f1","f2","f3","f4"];
  let flower2 = ["f5","f6","f7","f8"];
  console.log(tempflower);
  function checkAllFlowers(ownflowers, flowerarray){
    let state = true;
    for(let i =0; i<flowerarray.length; i++){
      if(!ownflowers.includes(flowerarray[i])){
        state = false;
      }
    }
    return state;
  }
  if(checkAllFlowers(tempflower,flower1)){
    tai+= 1;
  }
  if(checkAllFlowers(tempflower,flower2)){
    tai+= 1;
  }

  //check big tiles
  if(countOccurence("zhong",currenttiles) >= 3){
    tai+= 1;
  }
  if(countOccurence("bb",currenttiles) >= 3){
    tai+= 1;
  }
  if(countOccurence("fa",currenttiles) >= 3){
    tai+= 1;
  }

  switch(currentwind) {
    case 1:
      if(countOccurence("dong",currenttiles) >= 3){
        tai+= 1;
      }
      break;
    case 2:
      if(countOccurence("nan",currenttiles) >= 3){
        tai+= 1;
      }
      // code block
      break;
    case 3:
      if(countOccurence("xi",currenttiles) >= 3){
        tai+= 1;
      }
      break;
    case 4:
      if(countOccurence("bei",currenttiles) >= 3){
        tai+= 1;
      }
      break;
  }
  
  //check own feng
  switch(ownwind){
    case 1:
      if(countOccurence("dong",currenttiles) >= 3){
        tai+= 1;
      }
      break;
    case 2:
      if(countOccurence("nan",currenttiles) >= 3){
        tai+= 1;
      }
      // code block
      break;
    case 3:
      if(countOccurence("xi",currenttiles) >= 3){
        tai+= 1;
      }
      break;
    case 4:
      if(countOccurence("bei",currenttiles) >= 3){
        tai+= 1;
      }
      break;
  }

  // Ping hu
  // Cou ping hu
  // Pong pong hu
  // 13 yao
  // 7 dui zi
  // Qing yi se
  // Ban se
  // Da si xi
  // Xiao si xi
  // Siao san yuan
  // Da san yuan 
  // 1 9
  // ½ 1 9 -> 4 tai
  // SIAO SAN GONG/ZA HU(FAIL)

  // Ping hu
  let isPingHu = true;
  //check whether there's >= 3 of same tiles.
  const consecutiveTiles = ["t1","t2","t3","t4","t5","t6","t7","t8","t9","w1","w2","w3","w4","w5","w6","w7","w8","w9","b1","b2","b3","b4","b5","b6","b7","b8","b9"];
  for(let i =0; i<currenttiles.length; i++){
    let currenttile = currenttiles[i];
    if(countOccurence(currenttile,currenttiles) >= 3){
      isPingHu = false;
      break;
    }
  }
  function removeTile(tile, currenttiles){
    let index = currenttiles.indexOf(tile);
    if (index >= 0) {
      currenttiles.splice( index, 1 );
    }
  }
  // if no, check consecutive
  // if(isPingHu){
  //   let currenttilescopy = [];
  //   for(let i =0; i<currenttiles.length; i++){
  //     currenttilescopy[i]=currenttiles[i];
  //   }
  //   for(let i =0; i<currenttilescopy.length; i++){
  //     let currenttile = currenttilescopy[i];
  //     if(consecutiveTiles.includes(currenttile)){
  //       if(currenttile == "t1"){
  //         if(consecutiveTiles.includes("t2") && consecutiveTiles.includes("t3")){
  //           removeTile("t1",currenttilescopy);
  //           removeTile("t2",currenttilescopy);
  //           removeTile("t3",currenttilescopy);
  //         }
  //       }
  //     }  
  //   }
  //   for(let i =0; i<currenttilescopy.length; i++){
  //     let currenttile = currenttilescopy[i];
  //     if(consecutiveTiles.includes(currenttile)){
  //       if(currenttile == "t9"){
  //         if(consecutiveTiles.includes("t8") && consecutiveTiles.includes("t7")){
  //           removeTile("t7",currenttilescopy);
  //           removeTile("t8",currenttilescopy);
  //           removeTile("t9",currenttilescopy);
  //         }
  //       }
  //     }  
  //   }
  //   for(let i =0; i<currenttilescopy.length; i++){
  //     let currenttile = currenttilescopy[i];
  //     if(consecutiveTiles.includes(currenttile)){
  //       if(currenttile == "w1"){
  //         if(consecutiveTiles.includes("w2") && consecutiveTiles.includes("w3")){
  //           removeTile("w1",currenttilescopy);
  //           removeTile("w2",currenttilescopy);
  //           removeTile("w3",currenttilescopy);
  //         }
  //       }
  //     }  
  //   }
  //   for(let i =0; i<currenttilescopy.length; i++){
  //     let currenttile = currenttilescopy[i];
  //     if(consecutiveTiles.includes(currenttile)){
  //       if(currenttile == "w9"){
  //         if(consecutiveTiles.includes("w8") && consecutiveTiles.includes("w7")){
  //           removeTile("w7",currenttilescopy);
  //           removeTile("w8",currenttilescopy);
  //           removeTile("w9",currenttilescopy);
  //         }
  //       }
  //     }  
  //   }

  //   for(let i =0; i<currenttilescopy.length; i++){
  //     let currenttile = currenttilescopy[i];
  //     if(consecutiveTiles.includes(currenttile)){
  //       if(currenttile == "b1"){
  //         if(consecutiveTiles.includes("b2") && consecutiveTiles.includes("b3")){
  //           removeTile("b1",currenttilescopy);
  //           removeTile("b2",currenttilescopy);
  //           removeTile("b3",currenttilescopy);
  //         }
  //       }
  //     }  
  //   }
  //   for(let i =0; i<currenttilescopy.length; i++){
  //     let currenttile = currenttilescopy[i];
  //     if(consecutiveTiles.includes(currenttile)){
  //       if(currenttile == "b9"){
  //         if(consecutiveTiles.includes("b8") && consecutiveTiles.includes("b7")){
  //           removeTile("b7",currenttilescopy);
  //           removeTile("b8",currenttilescopy);
  //           removeTile("b9",currenttilescopy);
  //         }
  //       }
  //     }  
  //   }


  // }







  return tai;
}

console.log(calculateTai(currenttiles, currentwind, haidilao, huashang, qg, sevenzimo, sevenshoot));