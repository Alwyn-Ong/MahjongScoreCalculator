import React, { useState, useEffect } from "react";
import {
  Grid,
  GridList,
  GridListTile,
  Button,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexGrow: 1,
    // justifyContent: "space-around",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "wrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    imgFullHeight: "true",
    justifyContent: "center",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  buttonContainer: {
    // margin: theme.spacing(1),
    alignContent: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  container: {
    paddingLeft: 50,
    paddingRight: 50,
    flexGrow: 1,
  },
}));

// Generates tilesData

function populateTiles() {
  const tilesData = [];
  // var types = ["bamboo","tong","wan"]
  var types = ["t", "b", "w"];
  types.forEach((element) => {
    for (var i = 1; i <= 9; i++) {
      var obj = {};
      obj["img"] = "assets/" + element + i + ".png";
      obj["id"] = element + i;
      tilesData.push(obj);
    }
  });
  // for (var i = 0; i < 30; i++) {
  //   var obj = {};
  //   obj["img"] = "assets/t1.png";
  //   obj["id"] = "t1";
  //   tilesData.push(obj);
  // }
  var others = ["dong", "nan", "xi", "bei", "zhong", "fa", "baiban"];
  others.forEach((element) => {
    var obj = {};
    obj["img"] = "assets/" + element + ".png";
    obj["id"] = element;
    tilesData.push(obj);
  });
  return tilesData;
}

function populateFlowers() {
  const tilesData = [];
  for (var i = 1; i <= 8; i++) {
    var obj = {};
    obj["img"] = "assets/" + "f" + i + ".png";
    obj["id"] = "f" + i;
    tilesData.push(obj);
  }

  for (var i = 1; i <= 4; i++) {
    var obj = {};
    obj["img"] = "assets/" + "a" + i + ".png";
    obj["id"] = "f" + i;
    tilesData.push(obj);
  }

  return tilesData;
}

// function populateCurrentTiles(numTiles, defaultElement) {
//   var tiles = [];
//   for (var i = 0; i < numTiles; i++) {
//     tiles.push(defaultElement);
//   }
//   return tiles;
// }

export default function TileGrid() {
  const styles = useStyles;
  const tilesData = populateTiles();
  const [tilesCurrent, setTiles] = useState([]);
  const flowersData = populateFlowers();
  const [flowersCurrent, setFlowers] = useState([]);

  function updateTiles(tilesCurrent, current) {
    if (tilesCurrent.length > 13) {
      alert("Maximum tiles reached!");
      return;
    }
    setTiles((state) => {
      return [...state, current];
    });
  }

  // Resets tiles
  function resetTiles(tilesCurrent, current) {
    // let tiles = populateCurrentTiles(13, "");
    var tiles = [];
    setTiles(tiles);
  }

  // Updates flowers
  function updateFlowers(flowersCurrent, current) {
    setFlowers((state) => {
      return [...state, current];
    });
  }

  // Resets tiles
  function resetFlowers(flowersCurrent, current) {
    var tiles = [];
    setFlowers(tiles);
  }

  return (
    <>
      <Container maxWidth={"md"} alignContent={"centre"} display={"flex"}>
        {/* For tiles */}
        <h1 style={{ color: "black" }}>Select your tiles:</h1>
        <GridList cellHeight={"auto"} cols={9} style={styles.gridList}>
          {tilesData.map((tile) => (
            <GridListTile>
              <Button
                key={tile.id}
                variant="outlined"
                className={styles.margin}
                onClick={() => updateTiles(tilesCurrent, tile)}
              >
                <img src={tile.img} />
              </Button>
            </GridListTile>
          ))}
        </GridList>

        {/* For flowers */}
        <GridList cellHeight={"auto"} cols={8} style={styles.gridList}>
          {flowersData.map((tile) => (
            <GridListTile>
              <Button
                key={tile.id}
                variant="outlined"
                className={styles.margin}
                onClick={() => updateFlowers(flowersCurrent, tile)}
              >
                <img src={tile.img} />
              </Button>
            </GridListTile>
          ))}
        </GridList>
        <br></br>

        {/* Display tiles */}
        <h1 style={{ color: "black" }}>Current tiles:</h1>
        <Grid container className={styles.root} spacing={2}>
          <Grid item xs={12}>
            {console.log(tilesCurrent)}
            <Grid container justify="center" spacing={2}>
              {tilesCurrent.map((tile) => (
                <Grid key={tile} item>
                  {/* refer to index of list to fetch image*/}
                  {tile == "" ? (
                    <img src="assets/default.png" alt="" />
                  ) : (
                    <img src={tile.img} />
                  )}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <br></br>
        <Grid container className={styles.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              <Grid item>
                <Button variant="outlined" onClick={() => resetTiles()}>
                  Clear
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Display flowers */}
        <Grid container className={styles.root} spacing={2}>
          <Grid item xs={12}>
            {console.log(tilesCurrent)}
            <Grid container justify="center" spacing={2}>
              {flowersCurrent.map((tile) => (
                <Grid key={tile} item>
                  {/* refer to index of list to fetch image*/}
                  {tile == "" ? (
                    <img src="assets/default.png" alt="" />
                  ) : (
                    <img src={tile.img} />
                  )}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <br></br>
        <Grid container className={styles.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              <Grid item>
                <Button variant="outlined" onClick={() => resetFlowers()}>
                  Clear
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" onClick={() => resetFlowers()}>
                  Calculate
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
// export default function TileGrid() {
//   const classes = useStyles;
//   var tilesData = populateTiles();
//   return (
//     <Grid container className={classes.root} spacing={2} justify="center">
//       <Grid item xs={12}>
//         <Grid container  spacing={2}>
//           {tilesData.map((tile, index) => (
//             <Grid key={tile.id} item>
//               <Button
//                 key={tile.id}
//                 cols={index % 9}
//                 variant="outlined"
//                 className={classes.margin}
//                 onClick={() => {
//                   alert(tile.id);
//                 }}
//               >
//                 <img src={tile.img} />
//               </Button>
//             </Grid>
//           ))}
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// }
