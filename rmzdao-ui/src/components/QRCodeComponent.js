import React from "react";
import QRCode from "qrcode.react";

const QRCodeComponent = ({ value }) => {
  return (
    <div>
      <p>Escanea este código QR con tu billetera Paytaca:</p>
      <QRCode value={value} />
    </div>
  );
};

export default QRCodeComponent;
