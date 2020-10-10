// Wolfram Elementary Cellulr Automata/
import { getRule } from '../utils/getRule';
// Following Nature of Code https://www.youtube.com/watch?v=W1zKu3fDQR8 ported to js
// As baseline: https://reference.wolfram.com/language/ref/CellularAutomaton.html

// Notes
// withHistory

class ElementaryCA {
	cells;

	ruleset;

	currentGeneration;

	arrayWidth;

	initialCells;

	totalGenerations = 10;

	constructor(rule, width = 20, { instant = false, startArr = undefined }) {
		this.ruleset = getRule(rule);
		this.arrayWidth = width;

		this.cells = new Array(width);

		this.restartEvolution();

		if (instant) {
			while (this.currentGeneration < this.totalGenerations) {
				this.generateNextGeneration();
				console.log(this.cells);
			}
		}
	}

	setRandomRuleSet = () => {
		for (let index = 0; index < 8; index++) {
			this.ruleset[index] = Math.floor(Math.random() * 2);
		}
	};

	generateNextGeneration() {
		// Empty array to store new gen
		const nextGenCells = new Array(this.cells.length);

		// Determine new state by checking current of self and neighbours'
		// should you ignore the first and last edges
		for (let index = 0; index < this.cells.length; index++) {
			const left = this.cells[index - 1];
			const self = this.cells[index];
			const right = this.cells[index + 1];

			nextGenCells[index] = this.nextCell(left, self, right);
		}

		this.cells = nextGenCells;

		this.currentGeneration++;
	}

	// Grab the right rule based on current states
	nextCell = (a, b, c) => {
		if (a === 1 && b === 1 && c === 1) return this.ruleset[0];
		if (a === 1 && b === 1 && c === 0) return this.ruleset[1];
		if (a === 1 && b === 0 && c === 1) return this.ruleset[2];
		if (a === 1 && b === 0 && c === 0) return this.ruleset[3];
		if (a === 0 && b === 1 && c === 1) return this.ruleset[4];
		if (a === 0 && b === 1 && c === 0) return this.ruleset[5];
		if (a === 0 && b === 0 && c === 1) return this.ruleset[6];
		if (a === 0 && b === 0 && c === 0) return this.ruleset[7];
		return 0;
	};

	// Reset to gen 0
	restartEvolution = () => {
		if (this.initialCells) {
			this.cells = this.initialCells;
		} else {
			// Set the middlecell as 1
			for (let index = 0; index < this.cells.length; index++) {
				this.cells[index] = 0;
			}

			this.cells[Math.floor(this.cells.length / 2)] = 1;
		}

		this.currentGeneration = 0;
	};
}

export default ElementaryCA;
