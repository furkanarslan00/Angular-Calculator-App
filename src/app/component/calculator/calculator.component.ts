import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})

/*******************************************************************************************/
export class CalculatorComponent {
  title = 'Hesap Makinesi';
  currentInput: string = '';
  displayOperation: string = '';
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
    this.currentInput += num.toString();
    this.displayOperation += num.toString();
  }

  setOperator(op: string) {
    if (this.currentInput.endsWith(' ') && this.currentInput.length > 2) {
      this.currentInput = this.currentInput.slice(0, -3); 
      this.displayOperation = this.displayOperation.slice(0, -3); 
    }
    
    let displayOp = op;
    if (op === '/') {
      displayOp = '÷';
    } else if (op === '*') {
      displayOp = '×';
    }
  
    if (this.currentInput.endsWith(' + ') || this.currentInput.endsWith(' - ') ||
        this.currentInput.endsWith(' * ') || this.currentInput.endsWith(' / ')) {
      this.currentInput = this.currentInput.slice(0, -3) + ` ${op} `;
      this.displayOperation = this.displayOperation.slice(0, -3) + ` ${displayOp} `;
    } else if (this.currentInput !== '') {
      this.currentInput += ` ${op} `;
      this.displayOperation += ` ${displayOp} `;
    }
  }
  

  clear() {
    this.currentInput = '';
    this.displayOperation = '';
    this.result = null;
  }

  toggleSign() {
    if (this.currentInput !== '') {
      let num = parseFloat(this.currentInput);
      this.currentInput = String(-num);
      this.displayOperation = this.currentInput;
    }
  }

  percentage() {
    if (this.currentInput !== '') {
      let num = parseFloat(this.currentInput);
      this.currentInput = String(num / 100);
      this.displayOperation = this.currentInput;
    }
  }

  calculate() {
    if (this.currentInput !== '') {
      try {
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
