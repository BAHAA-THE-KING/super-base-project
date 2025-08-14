import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

import { Popup } from "src/components";

type Props = {
  open: boolean;
  close: () => void;
  planId: number;
};

export function ReadQRPopup({ open, close, planId }: Props) {
  const [scannedData, setScannedData] = useState(""); // Store the scanned QR code value

  return (
    <Popup open={open} close={close}>
      <Scanner onScan={(result) => setScannedData(result[0].rawValue)} />
      <p>{scannedData}</p>
    </Popup>
  );
}
