'use strict';

const checkDrawSleep = 'draw(); \nawait sleep(300);\n';

Blockly.JavaScript['moveRight'] = function (block) {
  return 'if (rx < w - 1)  rx = rx + 1;\n' + checkDrawSleep;
};

Blockly.JavaScript['moveLeft'] = function (block) {
  return 'if (rx > 0) rx = rx - 1;\n' + checkDrawSleep;
};

Blockly.JavaScript['moveUp'] = function (block) {
  return 'if (ry > 0) ry = ry - 1;\n' + checkDrawSleep;
};

Blockly.JavaScript['moveDown'] = function (block) {
  return 'if (ry < h - 1) ry = ry + 1;\n' + checkDrawSleep;
};

Blockly.JavaScript['program'] = function (block) {
  return ''; // nothing to declare
};