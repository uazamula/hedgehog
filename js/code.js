window.onerror = function (message, url, line) {
    alert(`Error: ${message}\n${url}: ${line}`);
};
init();
function init() {}

const FW = "ВПЕРЕД";
const LEFT = "ПОВЕРНУТИ ВЛІВО";
const RIGHT = "ПОВЕРНУТИ ВПРАВО";
const REPEAT = "ПОВТОРИТИ";
const ENDBLOCK = "КІНЕЦЬ БЛОКУ";
const PICK_UP = "ПІДНЯТИ";
const UP = "Вгору";
const DOWN = "Вниз";
const APPLE = "Яблуко";
const STONE = "Камінь";
const NO_STONE = "Немає каменю";
const IF = "ЯКЩО";
const END_IF = "КІНЕЦЬ ЯКЩО";
const IF_CASE1 = 45;

const settings = [
    {
        solution: [FW, FW, FW],
        squares: [11, 12, 13, 14],
        startAt: 11,
        appleAt: undefined,
        stoneAt: undefined,
        questionAt: undefined,
        doorAt: [15],
        degrees: 0,
        ifCase: 0,
        help: 'Використовуй команду "Вперед", стільки скільки потрібно, щоб дістатися дверей.<br><br> Для цього просто натисни на неї у <span style="background-color:green; color:yellow">зеленому</span> полі, <br> і ця команда зʼявиться у <span style="background-color:blue; color:yellow">синьому</span> полі.<br><br> Їжачок має зупинитися біля дверей, а не врізатися в них.<br><br> Запускай код кнопкою ▶ <br><br> Якщо додав зайву команду, то її можна видалити кнопкою ⌫<br><br> Увесь код можна очистити за допомогою кнопки 🗑',
    },

    {
        solution: [FW, FW, RIGHT, FW, FW],
        squares: [47, 38, 29, 30, 31],
        startAt: 47,
        appleAt: undefined,
        stoneAt: undefined,
        questionAt: undefined,
        doorAt: [32],
        degrees: -90,
        ifCase: 0,
        help: 'Використовуй команди "Вперед" та "Повернути вправо", щоб дістатися дверей',
    },

    {
        solution: [FW, FW, RIGHT, FW, LEFT, FW],
        squares: [47, 38, 29, 30, 21],
        startAt: 47,
        appleAt: undefined,
        stoneAt: undefined,
        questionAt: undefined,
        doorAt: [12],
        degrees: -90,
        ifCase: 0,
        help: 'Використовуй команди "Вперед" та "Повернути вправо", щоб дістатися дверей, рухаючись по траві',
    },

    {
        solution: [FW, FW, PICK_UP, FW, LEFT, FW],
        squares: [24, 23, 22, 21, 30],
        startAt: 24,
        appleAt: 22,
        stoneAt: undefined,
        questionAt: undefined,
        doorAt: [39],
        degrees: 180,
        ifCase: 0,
        help: 'Використовуй попередні команди і нову команду  "Підняти", щоб підняти яблуко і доставити до дверей',
    },

    {
        solution: [FW, RIGHT, FW, LEFT, FW, FW, LEFT, FW, RIGHT, FW],
        squares: [10, 11, 12, 13, 14, 20, 21, 22],
        startAt: 10,
        appleAt: undefined,
        stoneAt: 12,
        questionAt: undefined,
        doorAt: [15],
        degrees: 0,
        ifCase: 0,
        help: "Допоможи їжачку дістатися дверей, оминаючи камінь.Рухатися по траві.",
    },

    {
        solution: [REPEAT + " 5", FW, ENDBLOCK],
        squares: [11, 12, 13, 14, 15, 16],
        startAt: 11,
        appleAt: undefined,
        stoneAt: undefined,
        questionAt: undefined,
        doorAt: [17],
        degrees: 0,
        ifCase: 0,
        help: 'Використовуй команду "Повторити", щоб зробити код коротшим. Після цієї команди використай команду "Вперед". Вибери потрібну кількість повторень.І не забудь в кінці поставити команду "Кінець блоку"',
    },

    {
        solution: [REPEAT + " 5", FW, ENDBLOCK, RIGHT, FW],
        squares: [11, 12, 13, 14, 15, 16, 25],
        startAt: 11,
        appleAt: undefined,
        stoneAt: undefined,
        questionAt: undefined,
        doorAt: [34],
        degrees: 0,
        ifCase: 0,
        help: 'Використовуй команду "Повторити", щоб зробити код коротшим. Після цієї команди використай команду "Вперед". Вибери потрібну кількість повторень.І не забудь після команди "Кінець блоку" додати ще потрібні команди',
    },

    {
        solution: [REPEAT + " 3", FW, RIGHT, FW, LEFT, ENDBLOCK, FW],
        squares: [11, 12, 21, 22, 31, 32, 41, 42],
        startAt: 11,
        appleAt: undefined,
        stoneAt: undefined,
        questionAt: undefined,
        doorAt: [43],
        degrees: 0,
        ifCase: 0,
        help: 'Використовуй команду "Повторити", щоб зробити код коротшим. Всередині блоку повторення має бути вже декілька команд',
    },

    {
        solution: [
            REPEAT + " 8",
            FW,
            ENDBLOCK,
            RIGHT,
            FW,
            FW,
            RIGHT,
            REPEAT + " 4",
            FW,
            ENDBLOCK,
        ],
        squares: [10, 11, 12, 13, 14, 15, 16, 17, 18, 27, 36, 35, 34, 33, 32],
        startAt: 10,
        appleAt: undefined,
        stoneAt: undefined,
        questionAt: undefined,
        doorAt: [31],
        degrees: 0,
        ifCase: 0,
        help: 'Використовуй команду "Повторити" двічі. Всередині кожного блоку повторення лише одна команда "Вперед"',
    },

    {
        solution: [
            REPEAT + " 3",
            FW,
            LEFT,
            FW,
            RIGHT,
            ENDBLOCK,
            REPEAT + " 3",
            FW,
            RIGHT,
            FW,
            LEFT,
            ENDBLOCK,
        ],
        squares: [37, 38, 29, 30, 21, 22, 13, 14, 23, 24, 33, 34, 43],
        startAt: 37,
        appleAt: undefined,
        stoneAt: undefined,
        questionAt: undefined,
        doorAt: [44],
        degrees: 0,
        ifCase: 0,
        help: "Тут мають бути два цикли. <br><br>За їх межами жодних команд",
    },

    {
        solution: [REPEAT + " 3", REPEAT + " 7", FW, ENDBLOCK, RIGHT, ENDBLOCK],
        squares: [
            1, 2, 3, 4, 5, 6, 7, 8, 17, 26, 35, 44, 53, 62, 71, 70, 69, 68, 67,
            66, 65, 64,
        ],
        startAt: 1,
        appleAt: undefined,
        stoneAt: undefined,
        questionAt: undefined,
        doorAt: [55],
        degrees: 0,
        ifCase: 0,
        help: "В блоці з повторенням всередині має бути ще один блок повторення і після цього вкладеного блоку ще одна команда. ",
    },

    {
        solution: [
            REPEAT + " 2",
            REPEAT + " 7",
            FW,
            ENDBLOCK,
            RIGHT,
            ENDBLOCK,
            FW,
        ],
        squares: [1, 2, 3, 4, 5, 6, 7, 8, 17, 26, 35, 44, 53, 62, 71, 70],
        startAt: 1,
        appleAt: undefined,
        stoneAt: undefined,
        questionAt: undefined,
        doorAt: [69],
        degrees: 0,
        ifCase: 0,
        help: "Після зовнішнього блоку ще одна команда. ",
    },

    {
        solution: [
            REPEAT + " 3",
            REPEAT + " 7",
            FW,
            ENDBLOCK,
            RIGHT,
            ENDBLOCK,
            REPEAT + " 2",
            REPEAT + " 4",
            FW,
            ENDBLOCK,
            RIGHT,
            ENDBLOCK,
        ],
        squares: [
            1, 2, 3, 4, 5, 6, 7, 8, 17, 26, 35, 44, 53, 62, 71, 70, 69, 68, 67,
            66, 65, 64, 55, 46, 37, 28, 29, 30, 31, 32,
        ],
        startAt: 1,
        appleAt: undefined,
        stoneAt: undefined,
        questionAt: undefined,
        doorAt: [41],
        degrees: 0,
        ifCase: 0,
        help: "Два вкладених цикли",
    },

    {
        solution: [
            REPEAT + " 2",
            REPEAT + " 6",
            FW,
            ENDBLOCK,
            RIGHT,
            FW,
            FW,
            RIGHT,
            REPEAT + " 6",
            FW,
            ENDBLOCK,
            LEFT,
            FW,
            FW,
            LEFT,
            ENDBLOCK,
        ],
        squares: [
            2, 3, 4, 5, 6, 7, 8, 17, 26, 25, 24, 23, 22, 21, 20, 29, 38, 39, 40,
            41, 42, 43, 44, 53, 62, 61, 60, 59, 58, 57, 56, 65, 74,
        ],
        startAt: 2,
        appleAt: undefined,
        stoneAt: undefined,
        questionAt: undefined,
        doorAt: [75],
        degrees: 0,
        ifCase: 0,
        help: "У одному зовнішньому циклі два внутрішніх цикли.",
    },

    {
        solution: [
            REPEAT + " 2",
            REPEAT + " 4",
            FW,
            FW,
            FW,
            LEFT,
            ENDBLOCK,
            LEFT,
            LEFT,
            ENDBLOCK,
        ],
        squares: [
            5, 6, 7, 8, 17, 26, 35, 34, 33, 32, 31, 30, 29, 38, 47, 56, 57, 58,
            59, 50, 41, 23, 14,
        ],
        startAt: 32,
        appleAt: undefined,
        stoneAt: undefined,
        questionAt: undefined,
        doorAt: [1],
        degrees: 0,
        ifCase: 0,
        help: 'Обійти всі зелені квадратики і повернутися у вихідне положення. <br><br>Використовуй не більше одного вкладеного циклу.<br><br> Не використовуй команду "Повернути вправо".',
    },

    {
        solution: [FW, IF + " " + APPLE, PICK_UP, END_IF, FW],
        squares: [14, 23, 32],
        startAt: 14,
        appleAt: undefined,
        stoneAt: undefined,
        questionAt: 23,
        doorAt: [41],
        degrees: 90,
        ifCase: 1,
        help: 'На шляху їжачка може лежати яблуко. Використовуй команду "Підняти" лише у випадку, якщо яблуко дійсно лежить на полі, позначеному знаком "?" Для цього тицяй на "Якщо" і обирай "Яблуко". <br><br>Не забудь закрити блок команд (команду) з "Якщо" командою "Кінець Якщо". <br><br>Повторення не використовуй. ',
    },

    {
        solution: [
            REPEAT + " 6",
            FW,
            IF + " " + APPLE,
            PICK_UP,
            END_IF,
            ENDBLOCK,
        ],
        squares: [11, 12, 13, 14, 15, 16, 17],
        startAt: 11,
        appleAt: undefined,
        stoneAt: undefined,
        questionAt: 14,
        doorAt: [18],
        degrees: 0,
        ifCase: 1,
        help: "На шляху їжачка може лежати яблуко.Використовуй умову, яку вкладено у повторення",
    },

    {
        solution: [
            IF + " " + STONE,
            RIGHT,
            FW,
            FW,
            LEFT,
            END_IF,
            IF + " " + NO_STONE,
            FW,
            FW,
            END_IF,
        ],
        squares: [2, 3, 4, 11, 20],
        startAt: 2,
        appleAt: undefined,
        stoneAt: undefined,
        questionAt: 3,
        doorAt: [5, 21],
        degrees: 0,
        ifCase: 2,
        help: 'На шляху їжачка може лежати камінь. Використовуй умову "Якщо". Спочатку розглянь випадок, коли камінь є, а потім коли його немає.<br><br> Не використовуй повторення.<br><br> Їжачок має бути розвернутий у бік дверей',
    },

    {
        solution: [
            IF + " " + STONE,
            RIGHT,
            REPEAT + " 3",
            FW,
            FW,
            LEFT,
            ENDBLOCK,
            LEFT,
            LEFT,
            FW,
            FW,
            END_IF,
            IF + " " + NO_STONE,
            REPEAT + " 4",
            FW,
            ENDBLOCK,
            END_IF,
        ],
        squares: [2, 3, 4, 5, 6, 11, 20, 21, 22, 13],
        startAt: 2,
        appleAt: undefined,
        stoneAt: undefined,
        questionAt: 3,
        doorAt: [7],
        degrees: 0,
        ifCase: 2,
        help: 'На коротшому шляху їжачка може лежати камінь. Використовуй умову "Якщо". Спочатку розглянь випадок, коли камінь є, а потім коли його немає.<br><br> Використовуй повторення для мінімізації кількості рядків коду.<br><br> Розворот виконуй вліво. <br><br> Має бути 17 рядків коду',
    },

    {
        solution: [
            IF + " " + STONE,
            RIGHT,
            FW,
            FW,
            LEFT,
            END_IF,
            REPEAT + " 5",
            FW,
            ENDBLOCK,
        ],
        squares: [2, 3, 4, 5, 6, 7, 11, 20, 21, 22, 23, 24, 25],
        startAt: 2,
        appleAt: undefined,
        stoneAt: undefined,
        questionAt: 3,
        doorAt: [8, 26],
        degrees: 0,
        ifCase: 2,
        help: "На коротшому шляху їжачка може лежати камінь. Використувуй лише одну умову - якщо є камінь.<br><br> Використовуй повторення.",
    },
];

let commands = [];
settings.forEach((e) => commands.push([]));
if (typeof localStorage.commands !== "undefined")
    if (JSON.parse(localStorage.commands).length < settings.length) {
        localStorage.commands = JSON.stringify(commands);
    }

let success = [];
settings.forEach((e) => success.push(""));
if (typeof localStorage.success !== "undefined")
    if (JSON.parse(localStorage.success).length < settings.length) {
        localStorage.success = JSON.stringify(success);
    }

getSuccess();

let levelIndex = 0;
let isBlock = 0;
let door;
let door2;

let divCode = document.querySelector("#codeList");
const divWrapper = document.querySelector("#wrapper");
const divMenu = document.querySelector("#menu");

let btn;

function getData() {
    if (typeof localStorage.commands !== "undefined") {
        commands = JSON.parse(localStorage.commands);
        onReopen();
    }
}

function onReopen() {
    commands[levelIndex].forEach((command) => {
        insertCommand(command);
        btn.textContent = command;
    });
}
function insertCommand(command) {
    btn = document.createElement("button");
    if (command === ENDBLOCK || command === END_IF) {
        if (isBlock > 0) isBlock -= 1;
    }

    btn.style.marginLeft = 5 + isBlock * 20 + "px";

    let br = document.createElement("br");
    divCode.insertAdjacentElement("beforeend", btn);
    divCode.insertAdjacentElement("beforeend", br);

    if (command.includes(REPEAT) || command.slice(0, 4) === IF) {
        isBlock += 1;
    }
}

function onBtnFw(e, text = REPEAT + " ") {
    const className = e.target.className;
    if (className === "repeat") {
        text = REPEAT + " ";
    }
    if (className === "ifOperator") {
        text = IF + " ";
    }

    const command = text + e.target.innerText;
    insertCommand(command);
    btn.textContent = command;
    commands[levelIndex].push(btn.textContent);
    localStorage.commands = JSON.stringify(commands);

}

document.querySelectorAll(".repeat").forEach((a) => {
    a.onclick = onBtnFw;
});

document.querySelectorAll(".ifOperator").forEach((a) => {
    a.onclick = onBtnFw;
});
document.querySelectorAll(".levelBtn").forEach((e, i) => {
    e.onclick = function () {
        divWrapper.style.display = "block";
        divMenu.style.display = "none";
        let grid = document.querySelectorAll(".grid-item");
        levelIndex = i;

        let hh = document.createElement("img");
        hh.setAttribute("src", "images/hedgehog_small.png");
        hh.setAttribute("id", "hh");

        let apple = document.createElement("img");
        apple.setAttribute("src", "images/apple.png");
        apple.setAttribute("id", "apple");

        let stone = document.createElement("img");
        stone.setAttribute("src", "images/stone.png");
        stone.setAttribute("id", "stone");

        door = document.createElement("img");
        door.setAttribute("src", "images/door.png");
        door.setAttribute("id", "door");

        if (settings[levelIndex]["doorAt"].length === 2) {
            door2 = document.createElement("img");
            door2.setAttribute("src", "images/door.png");
            door2.setAttribute("id", "door2");
        }

        if (settings[levelIndex]["appleAt"] === undefined) {
            document
                .querySelector("#dashBoard")
                .insertAdjacentElement("beforeend", apple);
            apple.style.opacity = 0;
        }

        if (settings[levelIndex]["stoneAt"] === undefined) {
            document
                .querySelector("#dashBoard")
                .insertAdjacentElement("beforeend", stone);
            stone.style.opacity = 0;
        }
        getData();
        grid.forEach((e, i) => {
            if (settings[levelIndex]["squares"].includes(i + 1)) {
                e.classList.add("grass");
            }
            if (i === settings[levelIndex]["startAt"] - 1) {
                e.appendChild(hh);
                hh.style.transform =
                    "rotate(" + settings[levelIndex]["degrees"] + "deg)";
            }
            if (i === settings[levelIndex]["appleAt"] - 1) {
                e.appendChild(apple);
            }
            if (i === settings[levelIndex]["stoneAt"] - 1) {
                e.appendChild(stone);
            }
            if (i === settings[levelIndex]["questionAt"] - 1) {
                e.innerHTML = "?";
                e.setAttribute("id", "question");
            }
            if (i === settings[levelIndex]["doorAt"][0] - 1) {
                e.appendChild(door);
            }
            if (settings[levelIndex]["doorAt"].length === 2) {
                if (i === settings[levelIndex]["doorAt"][1] - 1) {
                    e.appendChild(door2);
                }
            }
        });
        document.querySelector("#level").innerHTML =
            "Рівень " + (levelIndex + 1);
    };
});

function getSuccess() {
    if (typeof localStorage.success !== "undefined") {
        success = JSON.parse(localStorage.success);
    }

    document.querySelectorAll(".levelBtn").forEach((levelBtn, index) => {
        levelBtn.innerHTML = "Рівень" + " " + (index + 1) + success[index];
    });
}

function menu() {
    divWrapper.style.display = "none";
    divMenu.style.display = "block";

    getSuccess();

    document.getElementById("hh").remove();
    if (document.getElementById("apple") !== null)
        document.getElementById("apple").remove();
    if (document.getElementById("stone") !== null)
        document.getElementById("stone").remove();
    if (document.getElementById("question") !== null)
        document.getElementById("question").innerHTML = "";
    document.getElementById("door").remove();
    if (settings[levelIndex]["doorAt"].length === 2) {
        document.getElementById("door2").remove();
    }

    let grid = document.querySelectorAll(".grass");
    grid.forEach((e, i) => {
        e.classList.remove("grass");
    });

    let list = document.querySelector("#codeList");
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
    isBlock = 0;
}

function deleteCommand() {
    const command = commands[levelIndex].pop();
    let commandList = document.querySelector("#codeList");
    if (commandList.hasChildNodes()) {
        commandList.removeChild(commandList.lastChild);
    }
    if (commandList.hasChildNodes()) {
        commandList.removeChild(commandList.lastChild);
    }
    localStorage.commands = JSON.stringify(commands);

    if (command === ENDBLOCK || command === END_IF) {
        isBlock += 1;
    }
    if (command.includes(REPEAT) || command.slice(0, 4) === IF) {
        if (isBlock > 0) isBlock -= 1;
    }
}

function clearAll() {
    let list = document.querySelector("#codeList");
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
    commands[levelIndex] = [];
    localStorage.commands = JSON.stringify(commands);
    isBlock = 0;
}

function isCollide(big, small) {
    return (
        big.left < small.left &&
        big.right > small.right &&
        big.top < small.top &&
        big.bottom > small.bottom
    );
}
function resetImg(object, object_str) {
    document.querySelectorAll(".grid-item").forEach((e, i) => {
        if (i === settings[levelIndex]["questionAt"] - 1) {
            document.getElementById(`${object_str}`).remove();
            object = document.createElement("img");
            object.setAttribute("src", `images/${object_str}.png`);
            object.setAttribute("id", `${object_str}`);
            e.appendChild(object);
            object.style.opacity = 1;
        }
    });
}
let hedgehog = document.getElementById("hh");
let apple;
let stone;

function setDefaultPositions(save_pos_x, save_pos_y) {
    hedgehog.style.left = save_pos_x + "px";
    hedgehog.style.top = save_pos_y + "px";
    hedgehog.setAttribute("src", "images/hedgehog_small.png");
    if (settings[levelIndex]["appleAt"] !== undefined) {
        apple.style.opacity = 1;
    }

    if (settings[levelIndex]["stoneAt"] !== undefined) {
        stone.style.opacity = 1;
    }
    if (settings[levelIndex]["questionAt"] !== undefined) {
        document.getElementById("question").style.color = "Black";
    }

    if (settings[levelIndex]["ifCase"] === 1) {
        apple.style.opacity = 0;
        apple.style.left = 0;
    }
    if (settings[levelIndex]["ifCase"] === 2) {
        stone.style.opacity = 0;
        stone.style.left = 0;
    }
    hedgehog.style.transform =
        "rotate(" + settings[levelIndex]["degrees"] + "deg)";
}

function ifCase(index, condition, caseNo, ifIsTrue) {
    let command = commands[levelIndex][index];
    if (command === condition && settings[levelIndex]["ifCase"] === caseNo) {
        if (ifIsTrue) {
            index++;
            command = commands[levelIndex][index];
        } else {
            while (command !== END_IF) {
                index++;
                command = commands[levelIndex][index];

                if (index === commands[levelIndex].length - 1) {
                    break;
                }
            }
        }
    }
    return index;
}

function myMove() {
    let id = null;
    hedgehog = document.querySelector("#hh");
    apple = document.querySelector("#apple");
    stone = document.querySelector("#stone");
    let ifIsTrue = false;

    if (settings[levelIndex]["ifCase"] === 1) {
        ifIsTrue = Math.floor(Math.random() * 2) + 1 === 1;
        if (ifIsTrue) {
            resetImg(apple, "apple");
            apple = document.querySelector("#apple");
        } else {
            document.getElementById("question").style.color = "rgb(0 0 0 / 0)";
        }
    }

    if (settings[levelIndex]["ifCase"] === 2) {
        ifIsTrue = Math.floor(Math.random() * 2) + 1 === 1;
        if (ifIsTrue) {
            resetImg(stone, "stone");
            stone = document.querySelector("#stone");
        } else {
            document.getElementById("question").style.color = "rgb(0 0 0 / 0)";
        }
    }

    let apple_pos = apple.getBoundingClientRect();
    let stone_pos = stone.getBoundingClientRect();
    hedgehog.style.transform = "rotate(0deg)";
    let pos_x = hedgehog.getBoundingClientRect().left;
    let pos_y = hedgehog.getBoundingClientRect().top;
    hedgehog.style.transform =
        "rotate(" + settings[levelIndex]["degrees"] + "deg)";

    let save_pos_x = pos_x;
    let save_pos_y = pos_y;
    let degree = settings[levelIndex]["degrees"];
    let index = 0;
    const wait_seconds = 0.5;
    let wait = 0;
    let loop = [1, 1];
    let startBlockIndex = [-1, -1];
    let countRepeat = 0;
    let countEndBlock = 0;
    let maxLoopLevel = 0;

    const delay = 400;

    clearInterval(id);
    id = setInterval(frame, delay);
    function frame() {
        let command = commands[levelIndex][index];
        let hh_pos = hedgehog.getBoundingClientRect();

        if (
            commands[levelIndex].length === index ||
            isCollide(hh_pos, stone_pos)
        ) {
            if (wait >= wait_seconds) {
                setDefaultPositions(save_pos_x, save_pos_y);
                let message;
                if (
                    JSON.stringify(settings[levelIndex]["solution"]) ===
                    JSON.stringify(commands[levelIndex])
                ) {
                    message = "Вітаю! \u{1F603}";
                    success[levelIndex] = "\u{1F603}";
                    localStorage.success = JSON.stringify(success);
                } else {
                    message =
                        "Треба покращити код, або ж з кодом все гаразд, але не по інструкції. \u{1F928} ";
                }
                alert(message);
                clearInterval(id);
            } else {
                wait += delay / 1000;
            }
        } else {
            index = ifCase(index, IF + " " + APPLE, 1, ifIsTrue);

            index = ifCase(index, IF + " " + STONE, 2, ifIsTrue);

            index = ifCase(index, IF + " " + NO_STONE, 2, !ifIsTrue);
            command = commands[levelIndex][index];

            if (command === PICK_UP) {
                if (isCollide(hh_pos, apple_pos)) {

                    hedgehog.setAttribute("src", "images/hh_apple.png");
                    apple.style.opacity = 0;
                    if (settings[levelIndex]["questionAt"] !== undefined) {
                        document.getElementById("question").style.color =
                            "rgb(0 0 0 / 0)";
                    }
                }
            }
            if (command === LEFT) {
                degree -= 90;
            }
            if (command === RIGHT) {
                degree += 90;
            }
            hedgehog.style.transform = "rotate(" + degree + "deg)";
            if (degree ** 2 === 360 ** 2) {
                degree = 0;
            }
            if (command === FW) {
                pos_x += 50 * Math.cos((degree * Math.PI) / 180);
                pos_y += 52 * Math.sin((degree * Math.PI) / 180);

                hedgehog.style.left = pos_x + "px";
                hedgehog.style.top = pos_y + "px";
            }
            if (command.includes(REPEAT)) {
                if (countRepeat === 0) {
                    loop[0] = command.slice(-1);
                    startBlockIndex[0] = index;
                    countRepeat++;
                } else {
                    loop[1] = command.slice(-1);
                    startBlockIndex[1] = index;
                }
                if (maxLoopLevel < 2) {
                    maxLoopLevel++;
                }
            }
            index++;
            if (command === ENDBLOCK) {
                if (loop[1] > 1) {
                    loop[1]--;
                    index = startBlockIndex[1] + 1;
                    countEndBlock = 0;
                } else {
                    countEndBlock++;
                    if (countEndBlock >= maxLoopLevel) {
                        if (loop[0] > 1) {
                            loop[0]--;
                            index = startBlockIndex[0] + 1;
                        } else {
                            countRepeat = 0;
                            maxLoopLevel = 0;
                        }
                        countEndBlock = 0;
                    }
                }
            }
        }
    }
}

function myFunction() {
    document.querySelector("#myDropdown").classList.toggle("show");
}

function myFunctionIf() {
    document.querySelector("#myDropdownIf").classList.toggle("show");
}
window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
            }
        }
    }
};
