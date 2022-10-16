interface IStatusCardProps {
  label: any;
  value: any;
}
export default function StatusCard({ label, value }: IStatusCardProps) {
  return (
    <div className="w-full h-28 rounded-3xl p-5 flex flex-col justify-between bg-white text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-lg capitalize">{label}</div>
    </div>
  );
}
