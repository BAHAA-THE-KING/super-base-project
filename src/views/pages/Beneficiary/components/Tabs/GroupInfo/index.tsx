import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCards } from "swiper/modules";
import { Box } from "@mui/material";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cards";

import { useBeneficiaryData } from "src/views/data/useBeneficiaryData";

import { SingleBeneficiary } from "src/types/data/SingleBeneficiary";
import { GroupCard } from "../../GroupCard";
import { Control, useWatch } from "react-hook-form";

type Props = {
  control: Control<SingleBeneficiary>;
};

export function GroupInfo({ control }: Props) {
  const { id, group } = useWatch({ control });
  const { groups } = useBeneficiaryData(id!);
  const orderedGroups = groups.sort((e1, e2) =>
    e1.id === group?.id ? -1 : e2.id === group?.id ? 1 : 0
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
        {orderedGroups.map((orderedGroup) => (
          <SwiperSlide
            key={orderedGroup.id}
            style={{ filter: "drop-shadow(0 10px 5px #222)" }}
          >
            <GroupCard
              group={orderedGroup}
              isActive={orderedGroup.id === group?.id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
