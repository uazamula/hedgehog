const textBehind = document.getElementById("text-behind");
const textFront = document.getElementById("text-front");
const textBehindBlur = document.getElementById("text-behind-blur");
const canvasRect = document.getElementById("canvas");

const parallaxScaling1 = 0.002;
const parallaxScaling2 = 0.001;
const parallaxScaling3 = 0.000001;

let currentScroll = 0;
let targetScroll = 0;
let ease = 0.001;

let theta1 = 0;

function updateScale() {
    let rect = canvasRect.getBoundingClientRect();

    let startScrollPosition = window.scrollY + rect.top;
    let endScrollPosition = window.scrollY + rect.bottom;

    if (
        targetScroll + window.innerHeight < startScrollPosition ||
        targetScroll > endScrollPosition
    ) {
        return;
    }

    currentScroll += (targetScroll - currentScroll) * ease;

    let scaleValue1 = 1 + currentScroll * parallaxScaling1;
    let scaleValue2 = 1 + currentScroll * parallaxScaling2;

    textBehind.style.transform = `scale(${scaleValue1})`;
    textFront.style.transform = `scale(${scaleValue1})`;
    textBehindBlur.style.transform = `scale(${scaleValue1})`;
    canvasRect.style.transform = `scale(${scaleValue2})`;

    theta1 += currentScroll * parallaxScaling3;

    setTimeout(updateScale, 1500 / 60);
}

window.addEventListener("scroll", () => {
    targetScroll = window.scrollY;
    updateScale();
});

updateScale();
