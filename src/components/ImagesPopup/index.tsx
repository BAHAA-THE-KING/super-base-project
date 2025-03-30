import { useEffect, useState } from "react";
import { Modal, Stack } from "@mui/material";
import {
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

import { BaseIconButton } from "./Base";

type Props = {
  open: boolean;
  close: () => void;
  images: string[];
  defaultIndex?: number;
};

export function ImagesPopup({ open, close, images, defaultIndex = 0 }: Props) {
  const isDefaultIndexVerified =
    defaultIndex >= 0 && defaultIndex < images.length;
  const [imageIndex, setImageIndex] = useState(
    isDefaultIndexVerified ? defaultIndex : 0
  );
  useEffect(() => {
    setImageIndex(isDefaultIndexVerified ? defaultIndex : 0);
  }, [open, images, defaultIndex, isDefaultIndexVerified]);

  return (
    <Modal open={open} onClose={close}>
      <>
        <Stack
          width={"90%"}
          height={"90%"}
          position={"absolute"}
          top={"50%"}
          left={"50%"}
          sx={{ transform: "translate(-50%,-50%)" }}
          justifyContent={"center"}
          alignItems={"stretch"}
        >
          <img
            src={images[imageIndex]}
            style={{
              height: "100%",
              maxWidth: "100%",
              aspectRatio: 1,
              objectFit: "cover",
            }}
          />
        </Stack>
        <Stack
          width={"100%"}
          position={"absolute"}
          top={"50%"}
          left={0}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <BaseIconButton
            disabled={imageIndex === images.length - 1}
            onClick={() => setImageIndex(imageIndex + 1)}
          >
            <ArrowForwardIcon />
          </BaseIconButton>
          <BaseIconButton
            disabled={imageIndex === 0}
            onClick={() => setImageIndex(imageIndex - 1)}
          >
            <ArrowBackIcon />
          </BaseIconButton>
        </Stack>
        <Stack
          width={"100%"}
          position={"absolute"}
          top={0}
          left={0}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
        >
          <BaseIconButton onClick={close}>
            <CloseIcon />
          </BaseIconButton>
        </Stack>
      </>
    </Modal>
  );
}
