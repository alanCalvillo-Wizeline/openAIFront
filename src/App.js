import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [originalPhrase, setOroginalPhrase] = useState('')
  const [lang, setLang] = useState('es')
  const [result, setResult] = useState('')

  const onTranslateHandler = event => {
    setOroginalPhrase(event.target.value);
  };

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    console.log(originalPhrase)
    console.log(lang)

    const form = new FormData();
    form.append('phrase', originalPhrase);
    form.append('lang', lang);


    //consider that this should be using the port that you have in your local env. 
    axios.post('http://127.0.0.1:8000/translate', form)
      .then(async (response) => {
        console.log(response.data.final_translation);
        setResult(response.data.final_translation)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <form method="post" onSubmit={handleSubmit}>
        <label>
          Text to Translate: <input name="translate" onChange={onTranslateHandler} value={originalPhrase} />
        </label>


        <p>
          Choose language to be used:
          <label><input type="radio" name="myRadio" value="en" onClick={() => setLang('en')} /> English</label>
          <label><input type="radio" name="myRadio" value="es" defaultChecked={true} onClick={() => setLang('es')} /> Spanish</label>
          <label><input type="radio" name="myRadio" value="bg" onClick={() => setLang('bg')} /> Bulgarian</label>
        </p>

        <button type="submit">Submit form</button>

        <p>
          {result}
        </p>


      </form>
    </div>
  );
}

export default App;
