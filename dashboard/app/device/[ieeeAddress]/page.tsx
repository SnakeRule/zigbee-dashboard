import DeviceScreen from "@/components/deviceScreen/deviceScreen";

type DevicePageProps = {
  params: Promise<{ ieeeAddress: string }>;
};

export default async function DevicePage({ params }: DevicePageProps) {
  const { ieeeAddress } = await params;

  return <DeviceScreen ieeeAddress={ieeeAddress} />;
}
