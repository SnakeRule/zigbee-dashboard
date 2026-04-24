import { useMutation } from "@tanstack/react-query";

type useRenameDeviceProps = {
  friendlyName: string;
};

export function useRenameDevice({ friendlyName }: useRenameDeviceProps) {
  const renameMutation = useMutation({
    mutationFn: async (newName: string) => {
      const res = await fetch(
        `/api/v1/zigbee/device/name/${encodeURIComponent(friendlyName)}`,
        {
          body: JSON.stringify({
            name: newName,
          }),
          method: "PATCH",
        },
      );
      if (res.ok) {
        return Promise.resolve();
      }
      return Promise.reject();
    },
  });

  return {
    renameMutation,
  };
}
