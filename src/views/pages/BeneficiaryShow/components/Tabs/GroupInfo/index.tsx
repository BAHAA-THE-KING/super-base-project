import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Control, useWatch } from "react-hook-form";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCards } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cards";

import { GroupCard } from "../..";

import { useBeneficiaryGroupsData } from "src/views/data";

import { SingleBeneficiary } from "src/types/data/SingleBeneficiary";

type Props = {
  control: Control<SingleBeneficiary>;
  requestMode: boolean;
};

export function GroupInfo({ control, requestMode }: Props) {
  const { id, group } = useWatch({ control });
  const {
    groups,
    changeBeneficiaryGroup,
    changeGroupLoading,
    getGroupsLoading,
  } = useBeneficiaryGroupsData(id as number, requestMode);
  const orderedGroups = groups.sort((e1, e2) =>
    e1.id === group?.id ? -1 : e2.id === group?.id ? 1 : 0
  );

  const [selectedGroupId, setSelectedGroupId] = useState(0);

  useEffect(() => {
    setSelectedGroupId((group?.id as number) ?? 0);
  }, [group?.id]);

  return (
    <Box overflow={"hidden"} width={"1100px"} height={"500px"} pt={3}>
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
              isActive={orderedGroup.id === selectedGroupId}
              onClick={() => {
                if (requestMode) {
                  setSelectedGroupId(Number(orderedGroup.id));
                  changeBeneficiaryGroup(Number(orderedGroup.id));
                }
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
