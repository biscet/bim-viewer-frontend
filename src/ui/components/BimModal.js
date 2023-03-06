/* eslint-disable max-len */
import React, { useCallback } from 'react';
import { useForm } from 'effector-forms';
import { useUnit } from 'effector-react';
import { formatISODate } from 'src/lib/date';
import { Input, Select, Button } from 'src/ui/components/Form';
import { useDropzone } from 'react-dropzone';
import {
  $modalBucket,
  engineeringForm,
  setModalBucketFn,
  $menuBucketDetail,
  setUploadFileFn,
  $uploadFile,
  postModelFn,
  $loaderUpload,
} from 'src/models/Engineering';
import { getPropsField, onSubmit } from 'src/lib/form';
import { isEmpty } from 'src/lib/lodash';
import { styles, options } from 'src/config/constants';

const closeModal = () => {
  setModalBucketFn('');
};

const postObjectFile = () => {
  postModelFn();
};

export default function BimModal() {
  const [
    opened, {
      bucketName, createdDate, policyKey, items,
    }, uploadFile, loader,
  ] = useUnit([$modalBucket, $menuBucketDetail, $uploadFile, $loaderUpload]);

  const { submit, ...restProps } = useForm(engineeringForm);

  const date = formatISODate(createdDate);
  const policy = options.find((item) => item.value === policyKey);

  if (opened === 'uploadModel') {
    return (
      <div className="bim-modal">
        <div className="bim-modal__area" onClick={closeModal} />
        <div className="bim-modal__window">
          <div className="bim-modal__header">
            Загрузка новой модели
            <Close />
          </div>

          {loader ? (
            <div className="lds-ring">
              <div />
              <div />
              <div />
              <div />
            </div>
          ) : null}

          <Dropzone />
          <Button
            className="bim-modal__button"
            type="button"
            onClick={postObjectFile}
            disabled={isEmpty(uploadFile)}
          >
            Загрузить модель
          </Button>

          <button type="button" className="bim-modal__cancel" onClick={closeModal}>
            Отмена
          </button>
        </div>
      </div>
    );
  }

  if (opened === 'bucketDetail') {
    return (
      <div className="bim-modal">
        <div className="bim-modal__area" onClick={closeModal} />
        <div className="bim-modal__window">
          <div className="bim-modal__header">
            Детальная информация
            <Close />
          </div>

          <div className="task-view--text">
            <p className="view-title">Название Бакета</p>
            <p className="view-text">{bucketName}</p>
          </div>

          <div className="task-view--text">
            <p className="view-title">Срок жизни моделей</p>
            <p className="view-text">{policy.label}</p>
          </div>

          <div className="task-view--text">
            <p className="view-title">Количество моделей</p>
            <p className="view-text">{items}</p>
          </div>

          <div className="task-view--text">
            <p className="view-title">Время создания Бакета</p>
            <p className="view-text">{date}</p>
          </div>
        </div>
      </div>
    );
  }

  if (opened === 'createBucket') {
    return (
      <div className="bim-modal">
        <div className="bim-modal__area" onClick={closeModal} />
        <div className="bim-modal__window">
          <div className="bim-modal__header">
            Создание нового Бакета
            <Close />
          </div>

          <form onSubmit={onSubmit(submit)}>
            <div className="input-group">
              <Input
                label="Название Бакета"
                placeholder="Введите название Бакета"
                name="bucketKey"
                style={styles.input}
                {...getPropsField({
                  fieldName: 'bucketKey',
                  props: restProps,
                })}
                required
              />
            </div>

            <div className="input-group">
              <Select
                label="Срок жизни моделей"
                defaultValue={options[1]}
                options={options}
                name="policyKey"
                variant="modal"
                {...getPropsField({
                  fieldName: 'policyKey',
                  props: restProps,
                })}
                required
              />
            </div>

            <Button className="bim-modal__button" type="submit">
              Создать Бакет
            </Button>
          </form>

          <button type="button" className="bim-modal__cancel" onClick={closeModal}>
            Отмена
          </button>
        </div>
      </div>
    );
  }

  return null;
}

const Dropzone = () => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      // eslint-disable-next-line no-console
      reader.addEventListener('abort', () => console.log('file reading was aborted'));
      // eslint-disable-next-line no-console
      reader.addEventListener('error', () => console.log('file reading has failed'));
      reader.addEventListener('load', () => {
        setUploadFileFn(file);
      });

      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxFiles: 1,
  });

  return (
    <div className="dropzone-custom" {...getRootProps()}>
      <input {...getInputProps()} name="uploadToFile" id="uploadToFile" />
      <Upload />
      {isDragActive ? (
        <p>Оставьте файл тут</p>
      ) : (
        <p>
          Перетащите файл в формате ... сюда или
          {' '}
          <span
            style={{
              textDecorationLine: 'underline',
              color: '#d89216',
            }}
          >
            Загрузите файл
          </span>
        </p>
      )}
    </div>
  );
};

const Close = () => (
  <div className="bim-modal__close" onClick={closeModal}>
    <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12.2227" y="11.3076" width="24" height="2" transform="rotate(45 12.2227 11.3076)" fill="#007BFF" />
      <rect
        width="24"
        height="2"
        transform="matrix(-0.707107 0.707107 0.707107 0.707107 27.7773 11.3066)"
        fill="#007BFF"
      />
    </svg>
  </div>
);

const Upload = () => (
  <svg
    className="dropzone-custom-icon"
    width="55"
    height="55"
    viewBox="0 0 55 55"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M27.5006 38.9584C28.15 38.9584 28.6946 38.7384 29.1346 38.2984C29.5731 37.8599 29.7923 37.3161 29.7923 36.6667V29.3334L31.8548 31.3959C32.084 31.6251 32.3322 31.787 32.5996 31.8817C32.867 31.978 33.1534 32.0261 33.459 32.0261C33.7645 32.0261 34.051 31.978 34.3184 31.8817C34.5857 31.787 34.834 31.6251 35.0631 31.3959C35.4833 30.9758 35.6934 30.4411 35.6934 29.7917C35.6934 29.1424 35.4833 28.6077 35.0631 28.1876L29.1048 22.2292C28.6465 21.7709 28.1118 21.5417 27.5006 21.5417C26.8895 21.5417 26.3548 21.7709 25.8965 22.2292L19.9381 28.1876C19.518 28.6077 19.3079 29.1424 19.3079 29.7917C19.3079 30.4411 19.518 30.9758 19.9381 31.3959C20.3583 31.8161 20.893 32.0261 21.5423 32.0261C22.1916 32.0261 22.7263 31.8161 23.1465 31.3959L25.209 29.3334V36.6667C25.209 37.3161 25.429 37.8599 25.869 38.2984C26.3075 38.7384 26.8513 38.9584 27.5006 38.9584ZM9.16732 45.8334C7.9069 45.8334 6.82829 45.385 5.93148 44.4882C5.03315 43.5899 4.58398 42.5105 4.58398 41.2501V13.7501C4.58398 12.4897 5.03315 11.4111 5.93148 10.5142C6.82829 9.61591 7.9069 9.16675 9.16732 9.16675H21.0267C21.6378 9.16675 22.2206 9.28133 22.7752 9.5105C23.3283 9.73966 23.8149 10.0643 24.235 10.4845L27.5006 13.7501H45.834C47.0944 13.7501 48.1738 14.1992 49.0721 15.0976C49.9689 15.9944 50.4173 17.073 50.4173 18.3334V41.2501C50.4173 42.5105 49.9689 43.5899 49.0721 44.4882C48.1738 45.385 47.0944 45.8334 45.834 45.8334H9.16732ZM9.16732 13.7501V41.2501H45.834V18.3334H25.61L21.0267 13.7501H9.16732ZM9.16732 13.7501V41.2501V13.7501Z" />
  </svg>
);
