<template>
    <div class="container">
        <div class="wrapper">

            <div v-if="!finished" class="player">
                <div>Next player: <span class="actual">{{next}}</span></div>
            </div>

            <div v-if="finished" class="status">
                <div v-if="stalemate" class="result stale">It's a draw!<br>Stalemate!</div>
                <div v-else class="result">Finished!<br><span class="winner">{{next}}</span> wins!</div>
            </div>

            <div class="grid">
                <div class="row" v-for="(row, row_index) in rows" :key="row_index">
                    <div class="column" v-for="(column, column_index) in row" v-on:click="tap" :data-row="row_index" :data-column="column_index" :key="column_index">
                        {{column}}
                    </div>
                </div>

            </div>

            <div class="footer">
                <a v-if="finished" v-on:click="restart" class="restart">New game</a>
            </div>

        </div>
    </div>
</template>

<script>
export default {
  name: "Grid",
  data: function() {
    return {
      rows: [["", "", ""], ["", "", ""], ["", "", ""]],
      next: "x",
      finished: false,
      stalemate: false
    };
  },
  methods: {
    tap: function(e) {
      if (!this.finished && e.target.innerText === "") {
        let rows = this.rows;
        rows[e.target.attributes["data-row"].value][
          e.target.attributes["data-column"].value
        ] = this.next;
        this.rows = rows.slice(0);

        if (this.checkWinner()) {
          this.finished = true;
        } else if (this.checkStalemate()) {
          this.stalemate = true;
          this.finished = true;
        } else {
          this.nextPlayer();
        }
      }
    },
    restart: function() {
      this.rows = [["", "", ""], ["", "", ""], ["", "", ""]];
      this.finished = false;
      this.stalemate = false;
      this.nextPlayer();
    },
    nextPlayer: function() {
      this.next = this.next === "x" ? "o" : "x";
    },
    checkStalemate: function() {
      return (
        !this.finished &&
        this.checkValuesPresent(this.rows[0]) &&
        this.checkValuesPresent(this.rows[1]) &&
        this.checkValuesPresent(this.rows[2])
      );
    },
    checkWinner: function() {
      return (
        this.checkValues(this.rows[0]) ||
        this.checkValues(this.rows[1]) ||
        this.checkValues(this.rows[2]) ||
        this.checkValues([this.rows[0][0], this.rows[1][0], this.rows[2][0]]) ||
        this.checkValues([this.rows[0][1], this.rows[1][1], this.rows[2][1]]) ||
        this.checkValues([this.rows[0][2], this.rows[1][2], this.rows[2][2]]) ||
        this.checkValues([this.rows[0][0], this.rows[1][1], this.rows[2][2]]) ||
        this.checkValues([this.rows[0][2], this.rows[1][1], this.rows[2][0]])
      );
    },
    checkValues: function(values) {
      return this.checkValuesPresent(values) && this.checkValuesMatch(values);
    },
    checkValuesPresent: function(values) {
      return values[0] !== "" && values[1] !== "" && values[2] !== "";
    },
    checkValuesMatch: function(values) {
      return values[0] === values[1] && values[1] === values[2];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
/*@import 'https://fonts.googleapis.com/css?family=Oswald';*/

body {
  font-family: "Oswald", Arial, Tahoma, Verdana, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
  border: 0;
}

.container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.wrapper {
  width: 90%;
  margin: 0 auto;
}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.player {
  text-align: center;
  font-size: 30px;
  line-height: 110px;
  margin: 20px 0 20px;
  height: 120px;
}

.player .actual {
  color: #fe6700;
  font-weight: bold;
  text-transform: uppercase;
  display: inline-block;
  width: 30px;
}

.status {
  text-align: center;
  font-size: 40px;
  line-height: 60px;
  margin: 20px 0 20px;
  height: 120px;
}

.status .result .winner {
  text-transform: uppercase;
  color: #00ff00;
}

.grid {
  text-align: center;
  margin: 0 auto;
}

.row {
  clear: both;
}

.column {
  width: 100px;
  height: 100px;
  text-align: center;
  vertical-align: middle;
  font-size: 100px;
  line-height: 70px;
  display: inline-block;
  border-left: 1px solid #000;
  border-top: 1px solid #000;
  user-select: none;
}

.column:hover {
  cursor: pointer;
}

.column:last-child {
  border-right: 1px solid #000;
}

.row:last-child .column {
  border-bottom: 1px solid #000;
}

.footer {
  text-align: center;
  font-size: 40px;
  line-height: 55px;
  margin: 20px 0 0;
  height: 60px;
}

.footer .restart {
  display: block;
  background: #ccc;
  line-height: 55px;
  height: 60px;
}

.footer .restart:hover {
  cursor: pointer;
  color: #fe6700;
}
</style>
