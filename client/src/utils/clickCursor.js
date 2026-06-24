// Toggle a class on the root element during mouse/touch press
function addClickCursorFallback() {
  const root = document.documentElement;
  const onDown = () => root.classList.add('mouse-down');
  const onUp = () => root.classList.remove('mouse-down');
  document.addEventListener('mousedown', onDown, { passive: true });
  document.addEventListener('mouseup', onUp, { passive: true });
  document.addEventListener('touchstart', onDown, { passive: true });
  document.addEventListener('touchend', onUp, { passive: true });
}

// Run automatically when imported
if (typeof window !== 'undefined') addClickCursorFallback();

export default addClickCursorFallback;
