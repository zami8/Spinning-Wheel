const spinBtn = document.getElementById('spin-btn');
const wheel = document.querySelector('.wheel');

let spinning = false;
let segments = document.querySelectorAll('.segment');
let numSegments = segments.length;
let currentRotation = 0;

// Adjust these probabilities as needed (should sum up to 1)
const probabilities = [0.01, 0.01, 0.95, 0.01, 0.01, 0.01];

spinBtn.addEventListener('click', () => {
    if (!spinning) {
        spinning = true;
        let spinAngle = 360 * Math.random();
        let targetSegment = selectSegment(probabilities);
        let targetRotation = 360 * targetSegment + (360 / numSegments) / 2 - spinAngle;

        wheel.style.transform = `rotate(${currentRotation + targetRotation}deg)`;

        setTimeout(() => {
            spinning = false;
            currentRotation += targetRotation;
            alert(`You won: ${segments[targetSegment].textContent}`);
        }, 3000);
    }
});

function selectSegment(probabilities) {
    const rand = Math.random();
    let cumulativeProb = 0;
    for (let i = 0; i < probabilities.length; i++) {
        cumulativeProb += probabilities[i];
        if (rand <= cumulativeProb) {
            return i;
        }
    }
}
