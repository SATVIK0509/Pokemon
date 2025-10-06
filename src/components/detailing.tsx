interface DetailingProps {
  detail: string;
  data: string | number;
}

export default function Detailing({ detail, data }: DetailingProps) {
  return (
    <span className="bg-green-300 text-sm rounded-2xl p-1 ">
      {detail} : {data}
    </span>
  );
}
