const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const leftPupil = document.querySelector('.left-pupil');
const rightPupil = document.querySelector('.right-pupil');
const mouth = document.getElementById('mouth');

// Email টাইপ করার সাথে সাথে Pupil বা চোখের মণি ডানে-বামে মুভ করার জন্য
emailInput.addEventListener('input', (e) => {
  const length = e.target.value.length;
  const moveX = Math.min(Math.max((length - 10) * 0.8, -10), 10);
  
  leftPupil.style.transform = `translateX(${moveX}px) translateY(2px)`;
  rightPupil.style.transform = `translateX(${moveX}px) translateY(2px)`;
  
  // স্মাইল মাউথ
  mouth.setAttribute('d', 'M 70 125 Q 100 145 130 125');
});

// Password ফিল্ডে ফোকাস করলে মুখ বা চোখ লুকিয়ে ফেলা (Interactive Shy Effect)
passwordInput.addEventListener('focus', () => {
  leftPupil.style.transform = 'translateY(-12px)';
  rightPupil.style.transform = 'translateY(-12px)';
  // মুখ সোজা বা বন্ধ করার অনুভূতি দেওয়া
  mouth.setAttribute('d', 'M 70 130 Q 100 130 130 130');
});

// Password ফিল্ড থেকে ফোকাস চলে গেলে নরমাল করা
passwordInput.addEventListener('blur', () => {
  leftPupil.style.transform = 'translate(0, 0)';
  rightPupil.style.transform = 'translate(0, 0)';
  mouth.setAttribute('d', 'M 70 125 Q 100 145 130 125');
});
