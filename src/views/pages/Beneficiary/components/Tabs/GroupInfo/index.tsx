import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCards } from "swiper/modules";
import { Box } from "@mui/material";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cards";

import { useData } from "../../../data";

import { SingleBeneficiary } from "src/types/data/SingleBeneficiary";
import { GroupCard } from "../../GroupCard";

type Props = {
  beneficiary: SingleBeneficiary;
};

export function GroupInfo({ beneficiary }: Props) {
  const { groups } = useData(beneficiary.id);
  const orderedGroups = groups.sort((e1, e2) =>
    e1.id === beneficiary.group.id ? -1 : e2.id === beneficiary.group.id ? 1 : 0
  );

  return (
    <Box overflow={"hidden"} height={"100%"} pt={3}>
      <Swiper
        dir="rtl"
        spaceBetween={25}
        slidesPerView={3}
        modules={[Navigation, EffectCards]}
        navigation
        effect={"cards"}
        noSwiping
        noSwipingClass={"swiper"}
        cardsEffect={{
          perSlideOffset: 110,
          slideShadows: false,
          rotate: false,
        }}
      >
        {orderedGroups.map((group) => (
          <SwiperSlide
            key={group.id}
            style={{ filter: "drop-shadow(0 10px 5px #222)" }}
          >
            <GroupCard
              group={group}
              isActive={group.id === beneficiary.group.id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
