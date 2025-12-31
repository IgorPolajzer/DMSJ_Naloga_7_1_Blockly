
var demoWorkspace = Blockly.inject('blocklyDiv',
    {
        media: 'https://blockly-demo.appspot.com/static/media/',
        toolbox: document.getElementById('toolbox')
    });
Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'),
    demoWorkspace);

function exportCode() {
    alert("XML izpisan v konzoli");
    console.log(Blockly.Xml.workspaceToDom(demoWorkspace));
}

function importCode() {
    Blockly.Xml.clearWorkspaceAndLoadFromXml(
        Blockly.utils.xml.textToDom(document.getElementById("textinput").value),
        demoWorkspace
    );
}

function startAgain() {
    ry = starty;
    rx = startx;
    draw();
}

function showCode() {
    // Generate JavaScript code and display it.
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    var code = 'var w = 10;\nvar h = 10;\nvar rx=0;\nvar ry=0;\n';
    code += Blockly.JavaScript.workspaceToCode(demoWorkspace);
    alert(code);
}

function runCode() {
    window.LoopTrap = 1000;
    var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    code += "window.alert(`${isSuccess() ? 'Pravilno!' : 'Nepravilno!'}`);";
    try {
        eval("(async () => {" + code + "})()");
    } catch (e) {
        alert(e);
    }
}

var w = 10;
var h = 10;
var rx = 0;
var ry = 0;
var startx = 0;
var starty = 0;
var field = new Array(h);

function draw() {
    let table = document.getElementById('field');
    table.innerHTML = ''; // Clear children
    for (let y = 0; y < h; ++y) {
        let row = document.createElement('tr');
        for (let x = 0; x < w; ++x) {
            let col = document.createElement('td');
            let tile = document.createElement('img');
            if (field[y][x] == 1)
                tile.src = 'house.png';
            else
                tile.src = 'tile.png';
            col.appendChild(tile)
            if (y == ry && x == rx) {
                let robot = document.createElement('img');
                robot.src = `robot.png`;
                col.appendChild(robot);
            }
            row.appendChild(col);
        }
        table.appendChild(row);
    }
}

function init() {
    field = new Array(h);
    for (let i = 0; i < h; ++i) {
        field[i] = new Array(w);
        for (let j = 0; j < w; ++j) field[i][j] = 0;
    }

    ry = Math.floor(Math.random() * h);
    rx = Math.floor(Math.random() * w);
    field[ry][rx] = 1;
    while (field[ry][rx] !== 0) {
        starty = ry = Math.floor(Math.random() * h);
        startx = rx = Math.floor(Math.random() * w);
    }

    draw();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function isSuccess() {
    for (let i = 0; i < h; ++i) {
        for (let j = 0; j < w; ++j) {
            //if (field[i][j] == 1) {
            //  console.log(`House position i: ${i}  j: ${j}`);
            //  console.log(`Robot position rx: ${rx}  ry: ${ry}`);
            //}
            if (field[i][j] === 1 && i === ry && j === rx) return true;
        }
    }
    return false;
}

document.onload = init();

