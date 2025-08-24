import { useEffect, useState } from "react";
import { Box, Stack, SvgIcon } from "@mui/material";

import { FaBoxOpen, FaStoreAlt } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa6";
import { PiStudent } from "react-icons/pi";
import { AiFillMedicineBox } from "react-icons/ai";

import { BButton, BCard, BTypography } from "src/components/Base";
import { useBaseTranslation } from "src/hooks";
import { Link } from "react-router";

const i18ns = [
  "services",
  "services_description",
  "storage",
  "storage_description",
  "clinic",
  "clinic_description",
  "education",
  "education_description",
  "accountant",
  "accountant_description",
];
export function Home() {
  const [
    ServicesText,
    ServicesDescriptionText,
    StorageText,
    StorageDescriptionText,
    ClinicText,
    ClinicDescriptionText,
    EducationText,
    EducationDescriptionText,
    AccountantText,
    AccountantDescriptionText,
  ] = useBaseTranslation(i18ns);

  const [type, setType] = useState("");
  useEffect(() => {
    window.cookieStore
      .get({ name: "type" })
      .then((type) => setType(type as string));
  }, []);

  const sections = [
    {
      name: ServicesText,
      icon: (
        <SvgIcon sx={{ color: "white" }}>
          <FaBoxOpen />
        </SvgIcon>
      ),
      color: "primary",
      description: ServicesDescriptionText,
      roles: "",
      url: "/services",
    },
    {
      name: StorageText,
      icon: (
        <SvgIcon sx={{ color: "white" }}>
          <FaStoreAlt />
        </SvgIcon>
      ),
      color: "secondary",
      description: StorageDescriptionText,
      roles: "",
      url: "/storage",
    },
    {
      name: ClinicText,
      icon: (
        <SvgIcon sx={{ color: "white" }}>
          <AiFillMedicineBox />
        </SvgIcon>
      ),
      color: "info",
      description: ClinicDescriptionText,
      roles: "",
      url: "/clinic",
    },
    {
      name: EducationText,
      icon: (
        <SvgIcon sx={{ color: "white" }}>
          <PiStudent />
        </SvgIcon>
      ),
      color: "success",
      description: EducationDescriptionText,
      roles: "",
      url: "/education",
    },
    {
      name: AccountantText,
      icon: (
        <SvgIcon sx={{ color: "white" }}>
          <FaMoneyBillWave />
        </SvgIcon>
      ),
      color: "warning",
      description: AccountantDescriptionText,
      roles: "",
      url: "/accountant",
    },
  ];

  return (
    <Stack
      width={"100%"}
      mt={20}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack width={"80%"} flexDirection={"row"} flexWrap={"wrap"}>
        {sections.map((section) => (
          <Box key={section.name} width={"50%"} p={2}>
            <Link to={section.url}>
              <BCard
                sx={{
                  height: "100%",
                  p: 3,
                  paddingBlockEnd: 5,
                  paddingInlineEnd: 5,
                  cursor: "pointer",
                }}
                animations={{
                  transitions: "slideInBottom",
                  gestures: "scaleSmaller",
                }}
                color={section.color}
              >
                <Stack flexDirection={"row"} gap={5}>
                  <Box>
                    <BButton
                      icon={section.icon}
                      variant="contained"
                      size="small"
                      color={section.color}
                    />
                  </Box>
                  <Box>
                    <BTypography variant="h6" fontWeight={"bold"}>
                      {section.name}
                    </BTypography>
                    <BTypography>{section.description}</BTypography>
                  </Box>
                </Stack>
              </BCard>
            </Link>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}
