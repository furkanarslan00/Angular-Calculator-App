import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
  title = 'Hesap Makinesi';
  currentInput: string = '0';
  displayOperation: string = '0';
  result: number | null = null;
  history: string[] = [];
  showHistory: boolean = false;
  isDarkMode: boolean = false;

  get displayValue() {
    if (this.result !== null) {
      const resultString = String(this.result);
      const maxSpaces = 28; 
      const length = resultString.length;
      
      const spacesNeeded = Math.max(maxSpaces - 2 * (length - 1), 0);
      
      const spaces = ' '.repeat(spacesNeeded);
      return `=${spaces}${this.result}`;
    }
    return '';
  }

  appendNumber(num: number | string) {
    if (this.currentInput === '0') {
      if (num === '.') {
        this.currentInput = '0.';
        this.displayOperation = '0.';
      } else if (num === '00') {
        return; 
      } else {
        this.currentInput = num.toString();
        this.displayOperation = num.toString();
      }
    } else {
      this.currentInput += num.toString();
      this.displayOperation += num.toString();
    }
  }

  setOperator(op: string) {
    let displayOp = op;
    if (op === '/') {
      displayOp = '÷';
    } else if (op === '*') {
      displayOp = '×';
    }

    if (this.currentInput !== '' && !this.currentInput.endsWith(' ')) {
      this.currentInput += ` ${op} `;
      this.displayOperation += ` ${displayOp} `;
    }
  }

  clear() {
    this.currentInput = '0';
    this.displayOperation = '0';
    this.result = null;
  }

  toggleSign() {
    if (this.currentInput !== '' && this.currentInput !== '0') {
      let num = parseFloat(this.currentInput);
      this.currentInput = String(-num);
      this.displayOperation = this.currentInput;
    }
  }

  percentage() {
    if (this.currentInput !== '' && this.currentInput !== '0') {
      let num = parseFloat(this.currentInput);
      this.currentInput = String(num / 100);
      this.displayOperation = this.currentInput;
    }
  }

  calculate() {
    if (this.currentInput !== '') {
      try {
        if (this.currentInput.includes('/ 0')) {
          console.error('Division by zero is not allowed');
          return; 
        }

        const result = eval(this.currentInput);
        if (typeof result === 'number' && !isNaN(result)) {
          this.result = result;
          this.history.unshift(`${this.displayOperation} = ${this.result}`);
          this.history = this.history.slice(0, 3);
        } else {
          console.error('Invalid expression');
        }
      } catch (error) {
        console.error('Invalid expression', error);
      }
    }
  }

  toggleHistoryPanel() {
    this.showHistory = !this.showHistory;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }
}
