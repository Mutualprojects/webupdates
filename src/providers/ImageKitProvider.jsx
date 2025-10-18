import React from "react";
import { IKContext } from "imagekitio-react";

export default function ImageKitProvider({ children }) {
  const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;
  const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;

  return (
    <IKContext
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      transformationPosition="path"
    >
      {children}
    </IKContext>
  );
}
