import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

import { Popup } from "src/components";
import { AvailableAid } from "src/types/data/AvailableAid";

type Props = {
  open: boolean;
  close: () => void;
  data: AvailableAid | null;
};

export function ReadQRPopup({ open, close, data }: Props) {
  const [scannedData, setScannedData] = useState(""); // Store the scanned QR code value

  return (
    <Popup open={open} close={close}>
      <Scanner onScan={(result) => setScannedData(result[0].rawValue)} />
      <p>{scannedData}</p>
    </Popup>
  );
}
