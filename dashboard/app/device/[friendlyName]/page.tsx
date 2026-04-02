import { Text } from "@/components/text/text";

type DevicePageProps = {
  params: Promise<{ friendlyName: string }>;
};

export default async function DevicePage({ params }: DevicePageProps) {
  const { friendlyName } = await params;

  return (
    <div>
      <Text tag="h1" variant="text-xl">
        {friendlyName}
      </Text>
    </div>
  );
}
