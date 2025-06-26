export type RefundItemProps = {
  id: string;
  name: string;
  description: string;
  amount: string;
  categoryImg: string;
}

type Props = React.ComponentProps<"a"> & {
  item: RefundItemProps;
}
export function RefundItem({ item, ...rest }: Props) {
  return(
    <a 
      className="flex items-center gap-3 cursor-pointer p-2 rounded-md hover:bg-green-100/50"
      {...rest}
    >
      <img 
        src={item.categoryImg} 
        alt="Ícone da categoria"
        className="w-8 h-8" 
      />

      <div 
        className="flex flex-col flex-1"
      >
        <strong className="flex-1 text-sm text-gray-100">
          {item.name}
        </strong>
        <span className="text-xs text-gray-200">
          {item.description}
        </span>
      </div>

      <span className="text-sm text-gray-100 font-semibold">
        <small className="font-normal text-gray-200">R$</small>
        {item.amount}
      </span>
    </a>
  )
}