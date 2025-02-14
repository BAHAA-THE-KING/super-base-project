import { Divider, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useGetAPI, usePostAPI } from "src/APIs";
import { BaseButton } from "src/components/Base";

export const Home = ({ Component }: { Component: React.FC }) => {
  const { data } = useGetAPI<{ id: string; age: string }[]>("/all", {
    defaultData: [],
  });

  const { mutateAsync: addItem } = usePostAPI("/create", {
    invalidateKeys: ["/all"],
  });

  const queryClient = useQueryClient();
  console.log(
    "Query Success, Current Cache:",
    queryClient.getQueryCache().findAll()
  );
  return (
    <>
      {data?.map((e) => {
        const entries = Object.entries(e);
        return entries.map(([k, v]) => (
          <React.Fragment key={k}>
            <Typography variant="h4">{k}: </Typography>
            <Typography>{v}</Typography>
            <Divider />
          </React.Fragment>
        ));
      })}
      <BaseButton
        variant="contained"
        color={"error"}
        startIcon={<Component />}
        animations={{
          gestures: "wiggle",
        }}
        onClick={() => {
          addItem({ id: "name", age: "male" });
        }}
      >
        click me
      </BaseButton>
    </>
  );
};
