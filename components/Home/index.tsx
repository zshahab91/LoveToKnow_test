import React, { useEffect, useState } from 'react';
import cs from 'classnames';
import MainLayout from '@components/MainLayout';
import s from './styles.module.scss';
import { Button, Card, Col, message, Row, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const HomePage = () => {
  const [data, setData] = useState([]);
  const [urls, setUrls] = useState([]);
  const [finished, setFinished] = useState(false);
  const [loadings, setLoadings] = useState(false);
  const handleFileReadOld = async (content, file_name) => {
    let arrayContent = content.split('\n');
    let has_file,
      final_obj = null;
    let is_txt_index = arrayContent.findIndex((element) => element.includes('.txt'));
    console.group('file');
    console.log('file_name', file_name);
    console.log('arrayContent', arrayContent);
    console.log('is_txt_index', is_txt_index);
    console.groupEnd();
    if (is_txt_index !== -1) {
      const item = arrayContent[is_txt_index];
      has_file = item;
      let file = urls.find((url) => url.name === item);
      if (file) {
        new Blob([file]).text().then(async (x) => {
          const res = await handleFileRead(x, item);
          console.log('res', res);
          if (res) {
            arrayContent[is_txt_index] = res?.sum;
            final_obj = {
              sum: arrayContent.reduce((partial_sum, a) => parseFloat(partial_sum) + parseFloat(a), 0),
              has_file: has_file,
              file_name: file_name,
            };
            console.log('final_obj has file is:', final_obj);

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
        console.log('final_obj is not file:', final_obj);
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
    return final_obj;
  };
  const handleFileRead = async (content, file_name) => {
    let arrayContent = content.split('\n');
    let has_file,
      file,
      final_obj = null;
    let is_txt_index = arrayContent.findIndex((element) => element.includes('.txt'));
    if (is_txt_index !== -1) {
      const item = arrayContent[is_txt_index];
      has_file = item;
      file = urls.find((url) => url.name === item);
      file &&
        new Blob([file.originFileObj]).text().then(async (x) => {
          await handleFileRead(x, item);
        });
    }
    final_obj = {
      sum: arrayContent.reduce(
        (partial_sum, a) => parseFloat(partial_sum) + (Number.isNaN(parseFloat(a)) ? 0 : parseFloat(a)),
        0
      ),
      valid_has_file: !!file,
      name_has_file: has_file,
      file_name: file_name,
    };
    setData((data) => [...data, final_obj]);
    setFinished(!file);
    return final_obj;
  };
  const calcSum = () => {
    let oldData = data;
    let currentObj = oldData.filter((item) => !item.valid_has_file)[0];
    for (const item of oldData.reverse()) {
      if (currentObj.file_name !== item.file_name) {
        item.sum += currentObj.sum;
        currentObj = item;
      }
    }
    setData(oldData);
    setLoadings(false);
  };
  // const readyContent = async (file) => {
  //   URL.createObjectURL(file);
  //   fileReader = new FileReader();
  //   fileReader.readAsText(file);
  //   fileReader.onloadend = handleFileRead;
  // };

  const handleFileChosen = ({ file, fileList }) => {
    console.log('file', fileList);
    if (file.status !== 'uploading') {
      // for (const file of fileList) {
      setUrls(fileList);
      // }
    }
    if (file.status === 'done') {
      message.success(`${file.name} file uploaded successfully`);
    } else if (file.status === 'error') {
      message.error(`${file.name} file upload failed.`);
    }
  };
  // const test = async (data) => {
  //   console.log('data', data);
  //   for (const i in data) {
  //     if (typeof data[i] !== 'number') {
  //       const t = await test(data[i]);
  //       data[i] = t;
  //       return data.reduce((target, item) => item + target, 0);
  //     }
  //   }
  //   return data.reduce((target, item) => item + target, 0);
  // };
  const startProgress = async () => {
    //  const r = await test([1, 2, 3, [5, 7, [6, 10, 2, [3, 0]]], 1]);
    //  console.log('r', r);
    setLoadings(true);
    setTimeout(() => {
      new Blob([urls[0].originFileObj]).text().then(async (x) => {
        await handleFileRead(x, urls[0].name);
      });
    }, 500);
  };
  useEffect(() => {
    if (finished) {
      calcSum();
    }
  }, [finished]);
  // useEffect(() => {
  //   if (urls.length > 0) {
  //     new Blob([urls[0]]).text().then(async (x) => {
  //       startProgress(urls[0]);
  //     });
  //   }
  // }, [urls]);
  console.log('allData', data);
  return (
    <div className="container-fluid no_padding">
      <MainLayout title="main-page">
        <div className={cs('container', s.main_page)}>
          <div className="row">
            <div className="col-12">
              <Card title="Please Upload your files" style={{ width: '50%', margin: '10px auto', textAlign: 'center' }}>
                <Upload multiple accept=".txt" onChange={(e) => handleFileChosen(e)}>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
                <Button
                  type="primary"
                  style={{ margin: '20px auto' }}
                  loading={loadings}
                  onClick={() => startProgress()}
                >
                  Start Read Files
                </Button>
              </Card>
              <Row gutter={16}>
                {data.map((file, inx) => {
                  return (
                    <Col span={8}>
                      <Card title={file.file_name} bordered={false} key={inx}>
                        Sum of this file is: <b>{file.sum}</b>
                        {file.name_has_file && (
                          <>
                            <p>
                              This file includes:
                              <b> {file.name_has_file} </b>
                            </p>
                          </>
                        )}
                      </Card>
                    </Col>
                  );
                })}
              </Row>
              {/* <div className="upload-expense">
                <label htmlFor="file">Please Upload your files:</label>
                <input
                  type="file"
                  id="file"
                  multiple
                  className="input-file"
                  accept=".txt"
                  onChange={(e) => handleFileChosen(e.target.files)}
                />
                <button>Start Calc</button>
              </div> */}
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default HomePage;
