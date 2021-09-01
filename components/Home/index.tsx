import React from 'react';
import cs from 'classnames';
import MainLayout from '@components/MainLayout';
import s from './styles.module.scss';

const url = require('@services/mockData/C.txt');
const HomePage = () => {
  let fileReader;

  const handleFileRead = (e) => {
    const content = fileReader.result;
    const arrayContent = content.split('\n');
    let sum = 0;
    console.log('content:', typeof content, content, content.split('\n'));
    for (const item of arrayContent) {
      console.log('item66', parseFloat(item), Number.isNaN(parseFloat(item)));
      if (Number.isNaN(parseFloat(item))) {
        console.log("url33", url)
        fetch(url)
          .then((response) => {
            const data = response.text();
            console.log('data', data);
          })
          .then((text) => console.log('text', text))
          .catch((err) => console.log('err', err));
      }
    }
  };

  const handleFileChosen = (file) => {
    var tmppath = URL.createObjectURL(file);
    console.log('file', file, tmppath);
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };
  return (
    <div className="container-fluid no_padding">
      <MainLayout title="main-page">
        <div className={cs('container', s.main_page)}>
          <div className="row">
            <div className="col-12">
              <div className="upload-expense">
                select a file:
                <input
                  type="file"
                  id="file"
                  className="input-file"
                  accept=".txt"
                  onChange={(e) => handleFileChosen(e.target.files[0])}
                />
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default HomePage;
