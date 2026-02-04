let map = [
  ['┌', '―', '┐', '┌', 'D', 'G'],
  ['S', '┌', '┘', '│'],
  ['└', '┼', '┬', '┤', 'S', '┐'],
  [' ', '├', '┴', '┼', '―', '┤'],
  ['S', '┴', 'K', '┘', ' ', 'S'],
];

let images = {
  '┐': 'left_down',
  '―': 'left_right',
  '┬': 'left_right_down',
  '┘': 'left_up',
  '┴': 'left_up_right',
  '┤': 'left_up_down',
  '┼': 'left_up_right_down',
  '┌': 'right_down',
  '│': 'up_down',
  '└': 'up_right',
  '├': 'up_right_down',
  'G': 'goal',
  'S': 'deadend',
  'K': 'ket',
  'D': 'door',
}

let x = 2;
let y = 3;

let keyflag = false;