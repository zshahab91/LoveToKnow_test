import React, { useEffect, useState } from 'react';
import cs from 'classnames';
import MainLayout from '@components/MainLayout';
import s from './styles.module.scss';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [urls, setUrls] = useState([]);

  const handleFileRead = async (content, file_name) => {
    let arrayContent = content.split('\n');
    let has_file,
      final_obj = null;
    let is_txt_index = arrayContent.findIndex((element) => element.includes('.txt'));
    console.group('file');
    console.log('file_name', file_name);
    console.log('arrayContent', arrayContent);
    console.log('is_txt_index', is_txt_index);
    console.groupEnd();

    // for (const inx in arrayContent) {
    if (is_txt_index !== -1) {
      const item = arrayContent[is_txt_index];
      has_file = item;
      let file = urls.find((url) => url.name === item);
      if (file) {
        new Blob([file]).text().then(async (x) => {
          const res = await handleFileRead(x, item);
          if (res) {
            arrayContent[is_txt_index] = res?.sum;
            console.log('arrayContent after', arrayContent);
            final_obj = {
              sum: arrayContent.reduce((partial_sum, a) => parseFloat(partial_sum) + parseFloat(a), 0),
              has_file: has_file,
              file_name: file_name,
            };
            setData((data) => [...data, final_obj]);
            return final_obj;
          }
        });
      } else {
        final_obj = {
          sum: arrayContent.reduce(
            (partial_sum, a) => parseFloat(partial_sum) + (Number.isNaN(parseFloat(a)) ? 0 : parseFloat(a)),
            0
          ),
          has_file: has_file,
          file_name: file_name,
        };
        setData((data) => [...data, final_obj]);
        return final_obj;
      }
    }
    final_obj = {
      sum: arrayContent.reduce(
        (partial_sum, a) => parseFloat(partial_sum) + (Number.isNaN(parseFloat(a)) ? 0 : parseFloat(a)),
        0
      ),
      has_file: has_file,
      file_name: file_name,
    };
    setData((data) => [...data, final_obj]);
    return final_obj;
  };
  // const readyContent = async (file) => {
  //   URL.createObjectURL(file);
  //   fileReader = new FileReader();
  //   fileReader.readAsText(file);
  //   fileReader.onloadend = handleFileRead;
  // };

  const handleFileChosen = (files) => {
    for (const file of files) {
      setUrls((urls) => [...urls, file]);
    }
  };
  const test = async (data) => {
    console.log('data', data);
    for (const i in data) {
      if (typeof data[i] !== 'number') {
        const t = await test(data[i]);
        data[i] = t;
        return data.reduce((target, item) => item + target, 0);
      }
    }
    return data.reduce((target, item) => item + target, 0);
  };
  const z = async (data) => {
    const r = await test([1, 2, 3, [5, 7, [6, 10, 2, [3, 0]]], 1]);
    console.log('r', r);
    new Blob([data]).text().then(async (x) => {
      await handleFileRead(x, data.name);
    });
  };
  useEffect(() => {
    if (urls.length > 0) {
      new Blob([urls[0]]).text().then(async (x) => {
        z(urls[0]);
      });
    }
  }, [urls]);
  console.log('allData', data);
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
                  multiple
                  className="input-file"
                  accept=".txt"
                  onChange={(e) => handleFileChosen(e.target.files)}
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
