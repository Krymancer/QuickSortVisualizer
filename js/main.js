const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Canvas control
const WIDTH = window.innerWidth; // TOTAL WIDHT OF SCREEN
const HEIGHT = window.innerHeight; // TOTAL HEIGHT OF SCREEN
canvas.width = WIDTH;
canvas.height = HEIGHT;

// QuickSort
let data = []; // Array to sort
const arraySize = 20; // Array size

// Setup
function init() {
    for (let i = 0; i < arraySize; i++) {
        data.push(rand(1, HEIGHT - 10));
    }
}

// Show
function show(show) {
    if (!show) return; // ONly show if pass non falsy argument for debug purposes
    context.clearRect(0, 0, WIDTH, HEIGHT);
    for (let i = 0; i < arraySize; i++) {
        drawBar(data, i)
    }
}

function drawBar(array, index) {
    const offset = (WIDTH / arraySize);
    const barWidth = (WIDTH / arraySize) - 1;

    context.fillStyle = 'white';
    context.fillRect(index * offset, 0, barWidth, array[index]);
}

/* Return a random number between min and max */
function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function swap(array, leftIndex, rightIndex) {
    let temp = array[leftIndex];
    array[leftIndex] = array[rightIndex];
    array[rightIndex] = temp;
}

function partition(array, left, right) {
    let pivot = array[Math.floor((right + left) / 2)], //middle element
        i = left, //left pointer
        j = right; //right pointer
    while (i <= j) {
        while (array[i] < pivot) {
            i++;
        }
        while (array[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(array, i, j);
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(array, left, right) {
    let index;
    if (array.length > 1) {
        index = partition(array, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(array, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(array, index, right);
        }
    }
    return array;
}


init();
quickSort(data, 0, data.length - 1);
show(true);