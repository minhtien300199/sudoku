var cellNumberClass = ' cell-number';
var maxCellStack = 1;
var selectedCell = [];
var maxUndoStack = 100;
var undoStack = [];
var solveStack = [];
var sudokuStack = [];
var redoStack = [];
var max = 9;
var cell = [];
var n = 9;
var solveSudokuArr = [[], [], [], [], [], [], [], [], []];
var undoSelectedCell = []; // biến xóa giao diện.
var redoSelectedCell = []; // biến redo giao diện
var markDraftsCell = []; // lấy địa chỉ của ghi nháp.
var level=0;  // biến chọn level
var playerName; // biến lưu tên người chơi
var sudokuArray2 = [
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
];
var sudokuArray = [
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
];
// tạo 1 object chứa dòng cột giá trị ô đó.
function StackNode(row, col, val) {
  return {
    curRow: row,
    curCol: col,
    value: val,
  };
}
