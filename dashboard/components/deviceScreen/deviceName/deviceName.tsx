import { Text } from "@/components/text/text";
import styles from "./deviceName.module.css";
import { Edit } from "lucide-react";
import { useState } from "react";
import { useRenameDevice } from "@/hooks/useRenameDevice";

type DeviceNameProps = {
  friendlyName: string;
};

export default function DeviceName({ friendlyName }: DeviceNameProps) {
  const [renaming, setRenaming] = useState(false);
  const [newName, setNewName] = useState<string>("");
  const { renameMutation } = useRenameDevice({ friendlyName });

  const onSave = async () => {
    await renameMutation.mutateAsync(newName);
    setRenaming(false);
  };

  return (
    <div className={styles["device-name-container"]}>
      {renaming ? (
        <input
          type="text"
          placeholder={friendlyName}
          onChange={(e) => setNewName(e.currentTarget.value)}
        />
      ) : (
        <Text tag="h1" variant="text-xl">
          {friendlyName}
        </Text>
      )}
      {renaming ? (
        <button onClick={onSave}>Save</button>
      ) : (
        <button
          className={styles["device-rename-button"]}
          onClick={() => setRenaming(true)}
        >
          <Edit />
        </button>
      )}
    </div>
  );
}
