import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/styles';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  catInfo: document.querySelector('.cat-info'),
};
const { select, loader, catInfo } = elements;

const slim = new SlimSelect({
  select: document.querySelector('.breed-select'),

  events: {
    afterClose: () => {
      togleHidden(select, true);
      afterCloseSelect(slim.getSelected());
    },
  },
});

fetchBreeds()
  .then(data => {
    slim.setData(
      data.map(({ id, name }) => {
        return {
          text: name,
          value: id,
        };
      })
    );
    togleHidden(select, false);
    togleHidden(loader, true);
  })

  .catch(err => {
    togleHidden(loader, true);
    callError();
  });

function afterCloseSelect(element) {
  togleHidden(loader, false);
  togleHidden(catInfo, true);
  fetchCatByBreed(element)
    .then(data => {
      const { url, breeds } = data[0];
      const { temperament, name, description } = breeds[0];
      togleHidden(loader, true);
      togleHidden(catInfo, false);
      togleHidden(select, false);
      //   togleHidden(select, false);
      catInfo.innerHTML = `<img src="${url}" width="300" alt="${name}" />
          <div>
            <h2>${name}</h2>
            <p>${description}</p>
            <p><span class="bold-text">Temperament: </span>${temperament}</p>
          </div>`;
    })
    .catch(err => {
      togleHidden(loader, true);
      callError();
      console.log(err);
    });
}
// function for change visible of elements
function togleHidden({ classList }, value) {
  value ? classList.add('hidden') : classList.remove('hidden');
}

function callError() {
  iziToast.error({
    message: 'Oops! Something went wrong! Try reloading the page!',
    position: 'center',
  });
}
