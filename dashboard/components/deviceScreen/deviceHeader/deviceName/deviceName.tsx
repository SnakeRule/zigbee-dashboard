import { Text } from "@/components/text/text";
import styles from "./deviceName.module.css";
import { Check, Edit } from "lucide-react";
import { useState } from "react";
import { useRenameDevice } from "@/hooks/useRenameDevice";
import { LoadingSpinner } from "@/components/loadingSpinner/loadingSpinner";
import { Button } from "@/components/button/button";

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
      {renameMutation.status === "pending" ? (
        <LoadingSpinner />
      ) : (
        <>
          {renaming ? (
            <input
              className={styles["device-name-input"]}
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
            <Button onClick={onSave}>
              <Check size={18} />
            </Button>
          ) : (
            <Button
              className={styles["device-rename-button"]}
              onClick={() => setRenaming(true)}
            >
              <Edit size={18} />
            </Button>
          )}
        </>
      )}
    </div>
  );
}
