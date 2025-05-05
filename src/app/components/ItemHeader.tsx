interface ItemHeaderProps {
    label: string;
    title: string;
}
  
export default function ItemHeader({ label, title }: ItemHeaderProps) {
return (
    <div className="space-y-10">
    <div className="flex items-center space-x-4">
        <div className="w-5 h-10 bg-red-500 rounded"></div>
        <span className="text-red-500 font-bold text-lg">{label}</span>
    </div>
    <h1 className="text-3xl font-bold mt-2">{title}</h1>
    </div>
);
}
  