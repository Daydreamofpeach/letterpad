import { Controller, useFormContext } from "react-hook-form";

import NavigationBuilder from "@/components/navigation-builder";

import { Navigation } from "@/__generated__/__types__";

const NavigationPanel = () => {
  const { control, setValue, watch, getValues } = useFormContext();

  const updateMenu = (menu: Navigation[]) => {
    if (
      menu &&
      menu.filter((m) => m.slug === "" || m.label === "").length === 0
    ) {
      setValue("menu", menu, { shouldDirty: true });
    }
  };
  return (
    <>
      <Controller
        name="menu"
        control={control}
        render={() => (
          <NavigationBuilder
            menuData={watch("menu") ?? []}
            updateOption={updateMenu}
          />
        )}
      />
    </>
  );
};
export default NavigationPanel;
