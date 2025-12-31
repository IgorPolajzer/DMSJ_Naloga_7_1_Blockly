'use strict';

const checkDrawSleep = 'draw(); \nawait sleep(300);\n';

Blockly.JavaScript['moveRight'] = function (block) {
  return 'if (santaX < w - 1)  santaX = santaX + 1;\n' + checkDrawSleep;
};

Blockly.JavaScript['moveLeft'] = function (block) {
  return 'if (santaX > 0) santaX = santaX - 1;\n' + checkDrawSleep;
};

Blockly.JavaScript['moveUp'] = function (block) {
  return 'if (santaY > 0) santaY = santaY - 1;\n' + checkDrawSleep;
};

Blockly.JavaScript['moveDown'] = function (block) {
  return 'if (santaY < h - 1) santaY = santaY + 1;\n' + checkDrawSleep;
};

Blockly.JavaScript['pickup'] = function (block) {
  return 'pickupPresent();';
};


Blockly.JavaScript['program'] = function (block) {
  return 'if (blocks.length > 0 && blocks[0].type === \'program\') { startedWithProgram = true; }\n';
};