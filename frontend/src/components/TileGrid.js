import React, { useState, useEffect } from "react";
import {
  Grid,
  GridList,
  GridListTile,
  Button,
  Container,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { calculateTai } from "../helper/calculator.js";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexGrow: 1,
    // justifyContent: "space-around",
    justifyContent: "center",
    alignContent: "center",
    width: "100vh",
    height: "100vh",
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
  form: {
    alignContent: "center",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "center",
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
    obj["id"] = "a" + i;
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

  // State for tiles
  const tilesData = populateTiles();
  const [tilesCurrent, setTiles] = useState([]);

  // State for flowers
  const flowersData = populateFlowers();
  const [flowersCurrent, setFlowers] = useState([]);

  // State for conditionals
  const [conditions, setConditions] = useState({
    ownwind: "1",
    currentwind: "1",
    haidilao: false,
    huashang: false,
    qg: false,
    sevenzimo: false,
    sevenshoot: false,
    pinghustate: false,
  });

  // For checkbox
  const handleChange = (event) => {
    setConditions({ ...conditions, [event.target.name]: event.target.checked });
  };

  const handleRadioChange = (event) => {
    // console.log(event);
    setConditions({ ...conditions, [event.target.name]: event.target.value });
  };

  function updateTiles(tilesCurrent, current) {
    // Validate less than 13 tiles
    if (tilesCurrent.length > 13) {
      alert("Maximum tiles reached!");
      return;
    }

    // Validate max of 4 for that tile
    var count = 0;
    for (var i = 0; i < tilesCurrent.length; i++) {
      if (tilesCurrent[i].id == current.id) {
        count++;
      }
    }
    if (count === 3) {
      alert("You have already added 3 of these tiles, do not add GANG!");
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
    for (var i = 0; i < flowersCurrent.length; i++) {
      if (flowersCurrent[i].id === current.id) {
        alert("You have already added this flower!");
        return;
      }
    }

    setFlowers((state) => {
      return [...state, current];
    });
  }

  // Resets flowers
  function resetFlowers(flowersCurrent, current) {
    var tiles = [];
    setFlowers(tiles);
  }

  function handleSubmit() {
    var tilesList = [];
    tilesCurrent.forEach((element) => {
      tilesList.push(element.id);
    })
    var tai = calculateTai(
      tilesList,
      conditions.currentwind,
      conditions.haidilao,
      conditions.qg,
      conditions.sevenzimo,
      conditions.sevenshoot,
      conditions.pinghustate
    );
    alert("Congratulations! you have " +tai + "tai");
  }

  return (
    <>
      <Container maxWidth={"md"} alignContent={"centre"} display={"flex"}>
        {/* For tiles */}
        <h2>Select your tiles:</h2>
        <h3>
          <i>Note: Do not enter your Gang(s) - four of a kind.</i>
        </h3>
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
        <h2>Current tiles:</h2>
        <Grid container className={styles.root} spacing={2}>
          <Grid item xs={12}>
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
            </Grid>
          </Grid>
        </Grid>
        {/* Conditionals */}
        {console.log(conditions)}
        <h2>Select your conditions:</h2>
        <div className={"form"}>
          <form>
            <FormControl component="fieldset">
              <FormLabel component="legend">Current Wind:</FormLabel>
              <RadioGroup
                row
                aria-label="currentwind"
                name="currentwind"
                value={conditions.currentwind}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio color="primary" />}
                  label={<img src={"assets/dong.png"} />}
                  onChange={handleRadioChange}
                />
                <FormControlLabel
                  value="2"
                  control={<Radio color="primary" />}
                  label={<img src={"assets/nan.png"} />}
                  onChange={handleRadioChange}
                />
                <FormControlLabel
                  value="3"
                  control={<Radio color="primary" />}
                  label={<img src={"assets/xi.png"} />}
                  onChange={handleRadioChange}
                />
                <FormControlLabel
                  value="4"
                  control={<Radio color="primary" />}
                  label={<img src={"assets/bei.png"} />}
                  onChange={handleRadioChange}
                />
              </RadioGroup>
              <FormLabel component="legend">Individual Wind:</FormLabel>
              <RadioGroup
                row
                aria-label="position"
                name="ownwind"
                value={conditions.ownwind}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio color="primary" />}
                  label={<img src={"assets/dong.png"} />}
                  onChange={handleRadioChange}
                />
                <FormControlLabel
                  value="2"
                  control={<Radio color="primary" />}
                  label={<img src={"assets/nan.png"} />}
                  onChange={handleRadioChange}
                />
                <FormControlLabel
                  value="3"
                  control={<Radio color="primary" />}
                  label={<img src={"assets/xi.png"} />}
                  onChange={handleRadioChange}
                />
                <FormControlLabel
                  value="4"
                  control={<Radio color="primary" />}
                  label={<img src={"assets/bei.png"} />}
                  onChange={handleRadioChange}
                />
              </RadioGroup>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={conditions.haidilao}
                    onChange={handleChange}
                    name="haidilao"
                    color="primary"
                  />
                }
                label="Hai Di Lao (Winning off a tile in the last 4 tiles):"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={conditions.huashang}
                    onChange={handleChange}
                    name="huashang"
                    color="primary"
                  />
                }
                label="Hua Shang (Winning off a tile gotten from a flower):"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={conditions.qg}
                    onChange={handleChange}
                    name="qg"
                    color="primary"
                  />
                }
                label="Qiang Gang (Winning off a tile someone else self Gang):"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={conditions.sevenzimo}
                    onChange={handleChange}
                    name="sevenzimo"
                    color="primary"
                  />
                }
                label="Seven pairs (self-draw)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={conditions.sevenshoot}
                    onChange={handleChange}
                    name="sevenshoot"
                    color="primary"
                  />
                }
                label="Seven pairs (winning of other's tile)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={conditions.pinghustate}
                    onChange={handleChange}
                    name="pinghustate"
                    color="primary"
                  />
                }
                label="Pinghu"
              />
              <Button variant="outlined" onClick={() => handleSubmit()}>
                Calculate
              </Button>
            </FormControl>
          </form>
        </div>
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
