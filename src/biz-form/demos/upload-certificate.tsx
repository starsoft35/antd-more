import React from 'react';
import { Col, Row } from 'antd';
import { BizForm, BizFormItem } from 'antd-more';
import ItemUploadCertificate from './components/ItemUploadCertificate';
import styles from './upload-certificate.less';
import { uploadFile } from './services';

function Demo() {
  return (
    <BizForm
      labelWidth={98}
      initialValues={{
        socialCreditCard2: [{
          uid: '-xxx',
          percent: 50,
          name: 'image.png',
          status: 'uploading',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }],
        socialCreditCard3: [{
          uid: '-3',
          name: 'image.png',
          status: 'success',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          response: {
            fssId: '132435-1lakjfa'
          }
        }],
        socialCreditCard4: [{
          uid: '-4',
          name: 'image.png',
          status: 'error',
          // url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          error: {
            message: '上传失败'
          }
        }],
      }}
      onFinish={values => {
        console.log(values);
      }}
    >
      <h3>默认</h3>
      <ItemUploadCertificate
        label='营业执照'
        name='socialCreditCard'
        idType='businessLicense'
        onUpload={uploadFile}
      />
      <ItemUploadCertificate
        label='商业登记证BR'
        name='businessRegistry'
        idType='businessRegistry'
        onUpload={uploadFile}
      />
      <BizFormItem label='身份证' style={{ marginBottom: 0 }}>
        <Row gutter={24}>
          <Col span={12}>
            <ItemUploadCertificate
              label='身份证人像面'
              hideLabel
              name='idcardFront'
              idType='idCardFront'
              onUpload={uploadFile}
            />
          </Col>
          <Col span={12}>
            <ItemUploadCertificate
              label='身份证国徽面'
              hideLabel
              name='idcardBack'
              idType='idCardBack'
              onUpload={uploadFile}
            />
          </Col>
        </Row>
      </BizFormItem>
      <ItemUploadCertificate
        label='护照'
        name='passport'
        idType='passport'
        onUpload={uploadFile}
      />
      <ItemUploadCertificate
        label='授权书'
        name='authorization'
        idType='authorization'
        onUpload={uploadFile}
        className={styles.itemUploadWidth}
        tooltip='自定义宽度'
      />
      <h3>上传中</h3>
      <ItemUploadCertificate
        label='营业执照'
        name='socialCreditCard2'
        idType='businessLicense'
        onUpload={uploadFile}
      />
      <h3>上传成功</h3>
      <ItemUploadCertificate
        label='营业执照'
        name='socialCreditCard3'
        idType='businessLicense'
        onUpload={uploadFile}
      />
      <h3>上传失败</h3>
      <ItemUploadCertificate
        label='营业执照'
        name='socialCreditCard4'
        idType='businessLicense'
        onUpload={uploadFile}
      />
    </BizForm>
  );
}

export default Demo;