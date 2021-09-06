import React, { useEffect, useState } from 'react';
import cs from 'classnames';
import MainLayout from '@components/MainLayout';
import s from './styles.module.scss';
import { Button, Card, Col, Collapse, message, Row, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface FileObjectInterface {
  sum: number;
  valid_has_file: boolean;
  name_has_file: string;
  file_name: string;
  contents: string[];
}
const HomePage = () => {
  const [data, setData] = useState<FileObjectInterface[]>([]);
  const [urls, setUrls] = useState([]);
  const [finished, setFinished] = useState(false);
  const [loadings, setLoadings] = useState(false);
  const [showContents, setShowContents] = useState<string[]>([]);
  const handleFileRead = async (content, file_name) => {
    let arrayContent = content.split('\n');
    let has_file,
      file,
      final_obj: FileObjectInterface = null;
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
      contents: arrayContent,
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
    setData(oldData.reverse());
    setLoadings(false);
  };

  const handleFileChosen = ({ file, fileList }) => {
    if (file.status !== 'uploading') {
      setUrls(fileList);
    }
    if (file.status === 'done') {
      message.success(`${file.name} file uploaded successfully`);
    } else if (file.status === 'error') {
      message.error(`${file.name} file upload failed.`);
    }
  };

  const startProgress = async () => {
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
  return (
    <div className="container-fluid no_padding">
      <MainLayout title="main-page">
        <div className={cs('container', s.main_page)}>
          <div className="row">
            <div className="col-12">
              <Card title="Please Upload your files" className={s.upload}>
                <Upload
                  progress={{ strokeWidth: 2, showInfo: true }}
                  multiple
                  showUploadList={{ showRemoveIcon: true }}
                  accept=".txt"
                  onRemove={(e) => setUrls(urls.filter((item) => item.name !== e.name))}
                  onChange={(e) => handleFileChosen(e)}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
                <Button
                  type="primary"
                  style={{ margin: '20px auto' }}
                  loading={loadings}
                  onClick={() => startProgress()}
                  disabled={urls.length === 0}
                >
                  Start Read Files
                </Button>
              </Card>
              <Row gutter={16}>
                {data.map((file, inx) => {
                  return (
                    <Col span={8} key={inx}>
                      <Card title={file.file_name} bordered={false} className={cs(s.card)}>
                        Sum of this file is: <b>{file.sum}</b>
                        {file.name_has_file && (
                          <>
                            <p>
                              This file includes:
                              <b> {file.name_has_file} </b>
                            </p>
                          </>
                        )}
                        <Collapse
                          className={s.content}
                          onChange={() =>
                            showContents.includes(file.file_name)
                              ? setShowContents(showContents.filter((item) => item !== file.file_name))
                              : setShowContents([...showContents, file.file_name])
                          }
                        >
                          <Collapse.Panel
                            header={showContents.includes(file.file_name) ? 'Hide Content' : 'Show Content'}
                            key={inx}
                          >
                            {showContents.includes(file.file_name) &&
                              file.contents.map((content, index) => {
                                return <p key={index}>{content}</p>;
                              })}
                          </Collapse.Panel>
                        </Collapse>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default HomePage;
