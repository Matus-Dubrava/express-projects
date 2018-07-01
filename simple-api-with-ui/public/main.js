// module responsible for handling form and result
(function getRandomModule() {
  const $min = document.querySelector('#min'),
        $max = document.querySelector('#max'),
        $result = document.querySelector('#result'),
        $form = document.querySelector('form');

  // on form submit, send ajax request instead of normal one
  $form.addEventListener('submit', event => {
    const minVal = $min.value,
          maxVal = $max.value;

    event.preventDefault();

    // validate inputs
    if (isNaN(minVal) || isNaN(maxVal)) {
      $result.textContent = 'incorrect input';
    } else {
      fetch(`http://localhost:4000/apis/random/${minVal}-${maxVal}`)
        .then(v => v.json())
        .then(data => {
          $result.textContent = data.result;
        })
        .catch(console.log);
    }
  }, false);
})();
