/* eslint-disable no-console */
/* global Autodesk */
import Client from 'src/api/authBim';
import { isEmpty } from './lodash';

const getToken = { accessToken: Client.getAccesstoken() };
let viewer;

export const getTokenFunc = () => getToken.accessToken.then((token) => {
  console.log(token.access_token);
});

function launchViewer(div, urn) {
  getToken.accessToken.then((token) => {
    const options = {
      env: 'AutodeskProduction',
      accessToken: token.access_token,
      language: 'ru',
    };

    Autodesk.Viewing.Initializer(options, () => {
      const htmlDiv = document.getElementById(div);
      viewer = new Autodesk.Viewing.GuiViewer3D(htmlDiv);

      const startedCode = viewer.start();

      if (startedCode > 0) {
        console.error('Ошибка загрузки: WebGL не поддерживается.');
        return;
      }

      console.log('Загрузка BIM модели...');
    });

    const documentId = urn;
    Autodesk.Viewing.Document.load(
      documentId,
      onDocumentLoadSuccess,
      onDocumentLoadFailure,
    );

    viewer.addEventListener(
      Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
      onGeometryLoaded,
    );

    function onDocumentLoadSuccess(viewerDocument) {
      const defaultModel = viewerDocument.getRoot().getDefaultGeometry();
      viewer.loadDocumentNode(viewerDocument, defaultModel);
    }

    // eslint-disable-next-line unicorn/consistent-function-scoping
    function onDocumentLoadFailure() {}
  });
}

function onGeometryLoaded(event) {
  const viewerTarget = event.target;

  viewerTarget.removeEventListener(
    Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
    onGeometryLoaded,
  );

  viewerTarget.fitToView();
}

const deleteViewer = (viewerRef) => {
  const childrens = [];

  if (!isEmpty(viewerRef)
  && !isEmpty(viewerRef.current)
  && viewerRef.current.children.length > 1) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < viewerRef.current.children.length; i++) {
      if (viewerRef.current.children[i].classList[0] === 'adsk-viewing-viewer') {
        childrens.push(i);
      }
    }
  }

  childrens.forEach((children) => {
    viewerRef.current.children[children].remove();
  });
};

export { launchViewer, deleteViewer };
