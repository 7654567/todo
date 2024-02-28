// import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { AddItemForm } from "../AddItemForm";

export default {
  title: "AddItemForm Component base example",
  component: AddItemForm,
};

const callback = action("buttom add was pressed inside form");

export const AddItemFormBaseExample = (props: any) => {
  return <AddItemForm addItem={callback} />;
};
