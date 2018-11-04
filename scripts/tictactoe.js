var Grid = Vue.component('grid', {
    template: '#grid',
    data: function() {
        return {
            rows: [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ],
            next: 'x',
            finished: false,
            stalemate: false
        };
    },
    methods: {
        tap: function(e) {
            if (!this.finished && e.target.innerText == '') {
                var rows = this.rows;
                rows[e.target.attributes['data-row'].value][e.target.attributes['data-column'].value] = this.next;
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
        restart: function(e) {
            this.rows = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ];
            this.finished = false;
            this.stalemate = false;
            this.nextPlayer();
        },
        nextPlayer: function() {
            this.next = (this.next == 'x' ? 'o' : 'x');
        },
        checkStalemate: function() {
            return !this.finished &&
                (this.checkValuesPresent(this.rows[0]) &&
                    this.checkValuesPresent(this.rows[1]) &&
                    this.checkValuesPresent(this.rows[2]));
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
                this.checkValues([this.rows[0][2], this.rows[1][1], this.rows[2][0]]));
        },
        checkValues: function(values) {
            return this.checkValuesPresent(values) && this.checkValuesMatch(values);
        },
        checkValuesPresent: function(values) {
            return (values[0] != '' && values[1] != '' && values[2] != '');
        },
        checkValuesMatch: function(values) {
            return (values[0] === values[1]) && (values[1] === values[2]);
        }
    }
});

var App = new Vue({
    el: '#app',
    components: {
        grid: {
            template: '#grid'
        }
    },
    render: function(createElement) {
        return createElement(Grid);
    }
});