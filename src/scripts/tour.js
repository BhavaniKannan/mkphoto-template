import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

const tour = new Shepherd.Tour({
    defaultStepOptions: {
        scrollTo: true,
        classes: 'shepherd-theme-arrows'
    }
});

tour.addStep({
    id: 'welcome',
    text:  `
    <div style="display: flex; align-items: center;">
      <img src="/images/character.png" alt="Guide" style="width: 60px; height: auto; margin-right: 1rem;" />
      <div>
        <strong>Hi! I’m your guide.</strong><br/>
        Let me show you around ✨
      </div>
    </div>
  `,
    attachTo: {
        element: '#hero',
        on: 'bottom'
    },
    buttons: [
        { text: 'Next', action: tour.next }
    ]
});

tour.addStep({
    id: 'portfolio',
    text: `
    <div style="display: flex; align-items: center;">
      <img src="/images/character.png" alt="Guide" style="width: 60px; height: auto; margin-right: 1rem;" />
      <div>
       This is our portfolio. Check out our favorite clicks 📸
      </div>
    </div>
  `,
    attachTo: {
        element: '#portfolio',
        on: 'top'
    },
    buttons: [
        { text: 'Back', action: tour.back },
        { text: 'Next', action: tour.next }
    ]
});

tour.addStep({
    id: 'contact',
    text: `
    <div style="display: flex; align-items: center;">
      <img src="/images/character.png" alt="Guide" style="width: 60px; height: auto; margin-right: 1rem;" />
      <div>
       Want to talk? Reach us via email or phone or social 💌
      </div>
    </div>
  `,
    attachTo: {
        element: '#contact',
        on: 'top'
    },
    buttons: [
        { text: 'Finish', action: tour.complete }
    ]
});

// 🟡 Move character near the highlighted element
tour.on('show', () => {
    const step = tour.currentStep;
    const attach = step?.options.attachTo;

    if (!attach?.element) return;

    const target = document.querySelector(attach.element);
    const guide = document.getElementById('guide-character');
    if (!target || !guide) return;

    const rect = target.getBoundingClientRect();

    // Offset guide to appear slightly left of the step
    let top = rect.top + window.scrollY + rect.height / 2 - guide.offsetHeight / 2;
    let left = rect.left + window.scrollX - guide.offsetWidth - 10;

    // Ensure it's within screen bounds
    if (top < 0) top = 10;
    if (left < 0) left = rect.right + 10;

    guide.style.position = 'absolute';
    guide.style.top = `${top}px`;
    guide.style.left = `${left}px`;
});


// Start after page load
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        tour.start();
    }, 800);
});
