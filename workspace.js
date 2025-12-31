var w = 10;
var h = 10;
var santaX = 0;
var santaY = 0;
var startedWithProgram = false;
var presents = {};
var startSantaX = 0;
var startSantaY = 0;
var field = new Array(h);
const PRESENT_NUMBER = 2;
const SANTA_SLED = 'santa-sled';
const PRESENT = 'present';

function exportCode() {
    alert("XML izpisan v konzoli");
    console.log(Blockly.Xml.workspaceToDom(demoWorkspace));
}

function importCode() {
    Blockly.Xml.clearWorkspaceAndLoadFromXml(
        Blockly.Xml.textToDom(document.getElementById("textinput").value),
        demoWorkspace
    );
}

function startAgain() {
    santaY = startSantaY;
    santaX = startSantaX;
    draw();
}

function showCode() {
    // Generate JavaScript code and display it.
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    var code = 'var w = 10;\nvar h = 10;\nvar santaX=0;\nvar santaY=0;\nvar started_with_program = false;\nvar presents = {};\n';
    code += Blockly.JavaScript.workspaceToCode(demoWorkspace);
    alert(code);
}

function runCode() {
    const blocks = demoWorkspace.getTopBlocks(true);
    window.LoopTrap = 1000;
    var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    code += "window.alert(`${isSuccess() ? 'Correct!' : 'Incorrect!'}`);";
    try {
        eval("(async () => {" + code + "})()");
    } catch (e) {
        alert(e);
    }
}

function draw() {
    let table = document.getElementById('field');
    table.innerHTML = ''; // Clear children
    for (let y = 0; y < h; ++y) {
        let row = document.createElement('tr');
        for (let x = 0; x < w; ++x) {
            let col = document.createElement('td');
            let tile = document.createElement('img');
            if (field[y][x] === SANTA_SLED)
                tile.src = 'assets/santa-claus-sled.png';
            else if (field[y][x] === PRESENT)
                tile.src = 'assets/present.png';
            else
                tile.src = 'assets/tile.png';
            col.appendChild(tile)

            if (y === santaY && x === santaX) {
                let robot = document.createElement('img');
                robot.src = `assets/santa.png`;
                col.appendChild(robot);
            }
            row.appendChild(col);
        }
        table.appendChild(row);
    }
}

function init() {
    // Create field matrix.
    field = new Array(h);
    for (let row = 0; row < h; ++row) {
        field[row] = new Array(w).fill(0);
    }

    santaY = Math.floor(Math.random() * h);
    santaX = Math.floor(Math.random() * w);
    startSantaY = santaY;
    startSantaX = santaX;

    let sledY, sledX;
    do {
        sledY = Math.floor(Math.random() * h);
        sledX = Math.floor(Math.random() * w);
    } while (sledY === santaY && sledX === santaX);

    field[sledY][sledX] = SANTA_SLED;

    for (let i = 0; i < PRESENT_NUMBER; ++i) {
        let presentY = Math.floor(Math.random() * h);
        let presentX = Math.floor(Math.random() * w);

        if (field[presentY][presentX] === 0 && !(presentY === santaY && presentX === santaX)) {
            field[presentY][presentX] = PRESENT;
            presents[`${presentY},${presentX}`] = true;
        }
    }

    draw();
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function pickupPresent() {
    if (presents[`${santaY},${santaX}`]) {
        let table = document.getElementById('field');

        for (let y = 0; y < h; ++y) {
            let row = document.createElement('tr');
            for (let x = 0; x < w; ++x) {
                let col = document.createElement('td');
                let tile = document.createElement('img');

                tile.src = 'assets/tile.png';
                col.appendChild(tile);
                row.appendChild(col);
            }
            table.appendChild(row);
        }

        delete presents[`${santaY},${santaX}`];
        field[santaY][santaX] = 0;
    }
}

function isSuccess() {
    if (!startedWithProgram || Object.keys(presents).length !== 0) return false;

    for (let i = 0; i < h; ++i) {
        for (let j = 0; j < w; ++j) {
            if (field[i][j] === SANTA_SLED && i === santaY && j === santaX) return true;
        }
    }
    return false;
}

document.onload = init();

